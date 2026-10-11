/* ================================================================== */
/* DEVSLIBRARY — LAB RUNTIME                                            */
/* Shared helpers for running user code inside sandboxed iframes.       */
/* ================================================================== */

/* ---------------------- serialization ---------------------- */

const MAX_DEPTH = 4;
const MAX_ITEMS = 100;
const MAX_KEYS = 50;
const MAX_STRING = 2000;

export function safeSerialize(value, depth = 0, seen = new WeakSet()) {
  if (depth > MAX_DEPTH) return { t: 'truncated' };
  if (value === null) return { t: 'null' };
  if (value === undefined) return { t: 'undefined' };

  const type = typeof value;

  if (type === 'string') {
    const s = value.length > MAX_STRING ? value.slice(0, MAX_STRING) + '…' : value;
    return { t: 'string', v: s, truncated: value.length > MAX_STRING };
  }
  if (type === 'number') {
    if (Number.isNaN(value)) return { t: 'number', v: 'NaN' };
    if (!Number.isFinite(value)) return { t: 'number', v: value > 0 ? 'Infinity' : '-Infinity' };
    return { t: 'number', v: value };
  }
  if (type === 'boolean') return { t: 'boolean', v: value };
  if (type === 'bigint') return { t: 'bigint', v: value.toString() };
  if (type === 'symbol') return { t: 'symbol', v: value.toString() };
  if (type === 'function') return { t: 'function', v: value.name || '(anonymous)' };

  if (seen.has(value)) return { t: 'circular' };
  seen.add(value);

  try {
    if (typeof Node !== 'undefined' && value instanceof Node) {
      return {
        t: 'dom',
        v: value.nodeName.toLowerCase(),
        attrs: value.attributes
          ? Array.from(value.attributes).slice(0, 5).map((a) => [a.name, a.value])
          : [],
      };
    }
  } catch {}

  if (value instanceof Date) return { t: 'date', v: value.toISOString() };
  if (value instanceof RegExp) return { t: 'regexp', v: value.toString() };
  if (value instanceof Error) {
    return { t: 'error', v: value.message, stack: value.stack };
  }

  if (Array.isArray(value)) {
    const items = [];
    const len = Math.min(value.length, MAX_ITEMS);
    for (let i = 0; i < len; i++) items.push(safeSerialize(value[i], depth + 1, seen));
    return { t: 'array', v: items, length: value.length, truncated: value.length > MAX_ITEMS };
  }

  if (value instanceof Map) {
    const entries = [];
    let i = 0;
    for (const [k, v] of value) {
      if (i >= MAX_ITEMS) break;
      entries.push([safeSerialize(k, depth + 1, seen), safeSerialize(v, depth + 1, seen)]);
      i++;
    }
    return { t: 'map', v: entries, size: value.size };
  }

  if (value instanceof Set) {
    const items = [];
    let i = 0;
    for (const v of value) {
      if (i >= MAX_ITEMS) break;
      items.push(safeSerialize(v, depth + 1, seen));
      i++;
    }
    return { t: 'set', v: items, size: value.size };
  }

  const keys = Object.keys(value).slice(0, MAX_KEYS);
  const entries = keys.map((k) => [k, safeSerialize(value[k], depth + 1, seen)]);
  return {
    t: 'object',
    v: entries,
    keys: Object.keys(value).length,
    ctor: value.constructor && value.constructor.name !== 'Object' ? value.constructor.name : null,
    truncated: Object.keys(value).length > MAX_KEYS,
  };
}

/* ---------------------- library loader ---------------------- */
/* Fetches plain-text JS files once, caches them in memory.    */

const libCache = {};

export async function loadLibText(path) {
  if (libCache[path]) return libCache[path];
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
  const text = await res.text();
  libCache[path] = text;
  return text;
}

export async function loadReactBabel() {
  const [react, reactDom, babel] = await Promise.all([
    loadLibText('/lib/react.js'),
    loadLibText('/lib/react-dom.js'),
    loadLibText('/lib/babel.js'),
  ]);
  return { react, reactDom, babel };
}

/* ---------------------- message listener ---------------------- */

export function attachLabListener(handler) {
  const onMessage = (e) => {
    const d = e.data;
    if (!d || typeof d !== 'object' || !d.__dsl) return;
    handler(d);
  };
  window.addEventListener('message', onMessage);
  return () => window.removeEventListener('message', onMessage);
}

/* ---------------------- JS runner ---------------------- */

export function buildJsRunner(runner, options = {}) {
  const mode = options && options.mode ? options.mode : 'js';
  const prelude = mode === 'http' ? `
  var __routes = { '/api/users/1': { status: 200, body: { id: 1, name: 'Ada Lovelace', role: 'admin' } }, '/api/not-found': { status: 404, body: { error: 'Route not found' } } };
  window.fetch = async function(input, init) { var request = input instanceof Request ? input : new Request(new URL(String(input), 'https://offline.devslibrary.local'), init); var url = new URL(request.url); var method = request.method.toUpperCase(); var route = __routes[url.pathname]; var status = 200, body;
    if (url.pathname === '/api/users' && method === 'GET') body = [{ id: 1, name: 'Ada Lovelace' }, { id: 2, name: 'Grace Hopper' }];
    else if (url.pathname === '/api/users' && method === 'POST') { var raw = await request.text(); var payload = {}; try { payload = JSON.parse(raw || '{}'); } catch (_) { status = 400; } if (status !== 400) { status = 201; body = { id: 3, name: String(payload.name || 'Anonymous'), created: true }; } }
    else if (route) { status = route.status; body = route.body; }
    else { status = 404; body = { error: 'No offline route for ' + method + ' ' + url.pathname }; }
    var headers = new Headers({ 'content-type': 'application/json; charset=utf-8', 'x-devslibrary-router': 'offline' });
    return new Response(JSON.stringify(body === undefined ? null : body), { status: status, statusText: status === 201 ? 'Created' : status === 404 ? 'Not Found' : status === 400 ? 'Bad Request' : 'OK', headers: headers });
  };
  ` : (mode === 'testing' || mode === 'dsa') ? `
  window.createTestSuite = function() { var tests = []; var passed = 0; var failed = 0; function fail(message) { throw new Error(message); }
    var api = { test: function(name, fn) { tests.push({ name: name, fn: fn }); }, assert: function(value, message) { if (!value) fail(message || 'Expected a truthy value'); }, equal: function(actual, expected) { if (!Object.is(actual, expected)) fail('Expected ' + JSON.stringify(expected) + ', received ' + JSON.stringify(actual)); }, deepEqual: function(actual, expected) { if (JSON.stringify(actual) !== JSON.stringify(expected)) fail('Expected ' + JSON.stringify(expected) + ', received ' + JSON.stringify(actual)); }, throws: function(fn) { var didThrow = false; try { fn(); } catch (_) { didThrow = true; } if (!didThrow) fail('Expected function to throw'); }, runTests: async function() { console.log('Running ' + tests.length + ' tests…'); for (var t of tests) { try { await t.fn(); passed++; console.log('✓ PASS', t.name); } catch (e) { failed++; console.error('✗ FAIL', t.name + ': ' + (e && e.message || e)); } } console.log('Tests:', passed + ' passed, ' + failed + ' failed, ' + tests.length + ' total'); if (failed) console.warn('Fix the failing assertion(s), then run again.'); } }; return api; };
  ` : '';
  const safeRunner = String(runner || '').replace(/<\/script>/gi, '<\\/script>');
  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><style>html,body{margin:0;height:100%;background:#fff}</style></head>
<body>
<script>
(function(){
  var post = function(p){ try { parent.postMessage(p, '*'); } catch(e){} };
  var levelMap = { log:'log', warn:'warn', error:'error', info:'info', debug:'debug' };
  var orig = {};
  Object.keys(levelMap).forEach(function(k){
    orig[k] = console[k];
    console[k] = function(){
      var args = Array.prototype.slice.call(arguments);
      post({ __dsl:true, kind:'console', level:levelMap[k], args:args });
      try { orig[k].apply(console, args); } catch(e){}
    };
  });
  window.addEventListener('error', function(e){
    post({ __dsl:true, kind:'error', message:e.message||'Unknown error',
           line:e.lineno||null, col:e.colno||null,
           stack:e.error&&e.error.stack?String(e.error.stack):null });
  });
  window.addEventListener('unhandledrejection', function(e){
    var r = e.reason;
    post({ __dsl:true, kind:'error',
           message:r&&r.message?r.message:String(r),
           stack:r&&r.stack?String(r.stack):null });
  });
  try {
    ${prelude}
    (async function(){ ${safeRunner} })().then(function(){ post({ __dsl:true, kind:'done' }); }, function(err){ post({ __dsl:true, kind:'error', message:err&&err.message?err.message:String(err), stack:err&&err.stack?String(err.stack):null }); post({ __dsl:true, kind:'done' }); });
  } catch (err) {
    post({ __dsl:true, kind:'error',
           message:err&&err.message?err.message:String(err),
           stack:err&&err.stack?String(err.stack):null });
    post({ __dsl:true, kind:'done' });
  }
})();
</script>
</body>
</html>`;
}

/* ---------------------- JSX runner (inlined libs) ---------------------- */

export function buildJsxRunner({ jsxCode, cssCode, reactSrc, reactDomSrc, babelSrc }) {
  const jsx = typeof jsxCode === 'string' ? jsxCode : '';
  const css = typeof cssCode === 'string' ? cssCode : '';
  const rjs = typeof reactSrc === 'string' ? reactSrc : '';
  const rdom = typeof reactDomSrc === 'string' ? reactDomSrc : '';
  const babel = typeof babelSrc === 'string' ? babelSrc : '';

  /* escape closing tags so user code can't break out */
  const safeJsx = jsx.replace(/<\/script>/gi, '<\\/script>');
  const safeCss = css.replace(/<\/style>/gi, '<\\/style>');

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; }
  body { margin: 0; font-family: system-ui, sans-serif; }
  ${safeCss}
</style>
</head>
<body>
<div id="root"></div>

<script>${rjs}</script>
<script>${rdom}</script>
<script>${babel}</script>

<script type="text/plain" id="user-jsx">${safeJsx}</script>

<script>
(function(){
  var post = function(p){ try { parent.postMessage(p, '*'); } catch(e){} };

  window.addEventListener('error', function(e){
    post({ __dsl:true, kind:'compile-error',
           message:e.message||'Unknown error',
           line:e.lineno||null,
           stack:e.error&&e.error.stack?String(e.error.stack):null });
  });

  function boot(){
    try {
      if (!window.React || !window.ReactDOM || !window.Babel) {
        throw new Error('React, ReactDOM, or Babel failed to initialize.');
      }

      var src = document.getElementById('user-jsx').textContent;

      var result = Babel.transform(src, {
        presets: [['react', { runtime: 'classic' }]],
        filename: 'user.jsx',
      });

      post({ __dsl:true, kind:'ready' });

      var fn = new Function(
        'React','ReactDOM',
        'useState','useEffect','useRef','useMemo','useCallback',
        'useReducer','useContext','useLayoutEffect','useId',
        'useTransition','useDeferredValue','useImperativeHandle',
        'useSyncExternalStore','useInsertionEffect',
        'Fragment','StrictMode','Suspense','Profiler',
        'createContext','memo','forwardRef','lazy',
        'cloneElement','createElement','Children','isValidElement',
        result.code
      );

      fn.call(window,
        window.React, window.ReactDOM,
        window.React.useState, window.React.useEffect, window.React.useRef,
        window.React.useMemo, window.React.useCallback, window.React.useReducer,
        window.React.useContext, window.React.useLayoutEffect, window.React.useId,
        window.React.useTransition, window.React.useDeferredValue,
        window.React.useImperativeHandle, window.React.useSyncExternalStore,
        window.React.useInsertionEffect,
        window.React.Fragment, window.React.StrictMode, window.React.Suspense,
        window.React.Profiler, window.React.createContext,
        window.React.memo, window.React.forwardRef, window.React.lazy,
        window.React.cloneElement, window.React.createElement,
        window.React.Children, window.React.isValidElement);
    } catch (err) {
      var msg = err && err.message ? err.message : String(err);
      var stack = err && err.stack ? String(err.stack) : null;
      post({ __dsl:true, kind:'compile-error', message:msg, stack:stack, line:null });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
</script>
</body>
</html>`;
}

/* ---------------------- TypeScript runner (blob iframe) ---------------------- */

export function buildTsRunner(code) {
  const src = typeof code === 'string' ? code : '';
  const safeCode = src.replace(/<\/script>/gi, '<\\/script>');

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<base href="/">
<style>
  html, body { margin: 0; min-height: 100%; background: #ffffff; font-family: system-ui, sans-serif; }
  #output { padding: 16px; font-family: 'SF Mono', Menlo, Consolas, monospace; font-size: 13px; line-height: 1.6; white-space: pre-wrap; }
  .log { color: #222; } .warn { color: #b45309; } .error { color: #b91c1c; }
</style>
<script src="./lib/esbuild-browser.js"></script>
</head>
<body>
<div id="output"></div>
<script type="text/plain" id="user-code">${safeCode}</script>
<script>
(function(){
  const post = (p) => { try { parent.postMessage(p, '*'); } catch(e){} };
  const out = document.getElementById('output');
  const log = (cls, text) => { const div = document.createElement('div'); div.className = 'log ' + cls; div.textContent = text; out.appendChild(div); };
  const timeout = setTimeout(() => {
    const message = 'TypeScript runtime timed out while loading. Check that /lib/esbuild-browser.js and /lib/esbuild.wasm are included in the app build.';
    log('error', message); post({ __dsl:true, kind:'error', message }); post({ __dsl:true, kind:'done' });
  }, 45000);
  (async function(){
    try {
      const esbuild = window.esbuild;
      if (!esbuild || typeof esbuild.initialize !== 'function' || typeof esbuild.transform !== 'function') {
        throw new Error('TypeScript engine did not load. Check public/lib/esbuild-browser.js.');
      }
      const wasmURL = new URL('./lib/esbuild.wasm', document.baseURI).href;
      await esbuild.initialize({ wasmURL });
      const userCode = document.getElementById('user-code').textContent;
      const result = await esbuild.transform(userCode, { loader:'ts', target:'es2020', format:'iife' });
      post({ __dsl:true, kind:'ready' });
      const originalLog = console.log;
      const originalWarn = console.warn;
      const originalError = console.error;
      const forward = (level) => (...args) => {
        post({ __dsl:true, kind:'console', level, args: args.map(v => {
          try { return typeof v === 'string' ? v : JSON.parse(JSON.stringify(v)); } catch (_) { return String(v); }
        }) });
      };
      console.log = forward('log'); console.info = forward('info'); console.debug = forward('debug');
      console.warn = forward('warn'); console.error = forward('error');
      try { (new Function(result.code))(); }
      finally { console.log = originalLog; console.warn = originalWarn; console.error = originalError; }
      post({ __dsl:true, kind:'done' });
    } catch (err) {
      const message = err && err.message ? err.message : String(err);
      log('error', message);
      post({ __dsl:true, kind:'error', message, stack:err && err.stack ? String(err.stack) : null });
      post({ __dsl:true, kind:'done' });
    } finally { clearTimeout(timeout); }
  })();
})();
</script>
</body>
</html>`;
}

/* ---------------------- Python runner (app-relative assets) ---------------------- */

export function buildPyRunner(code) {
  const src = typeof code === 'string' ? code : '';
  const safeCode = src.replace(/<\/script>/gi, '<\\/script>');

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<base href="/">
<style>
  html, body { margin: 0; min-height: 100%; background: #ffffff; font-family: system-ui, sans-serif; }
  #output { padding: 16px; font-family: 'SF Mono', Menlo, Consolas, monospace; font-size: 13px; line-height: 1.6; white-space: pre-wrap; }
  .log { color: #222; } .error { color: #b91c1c; }
</style>
<script src="./lib/pyodide/pyodide.js"></script>
</head>
<body>
<div id="output"></div>
<script type="text/plain" id="user-code">${safeCode}</script>
<script>
(async function(){
  const post = (p) => { try { parent.postMessage(p, '*'); } catch(e){} };
  const out = document.getElementById('output');
  const emit = (cls, text) => {
    post({ __dsl:true, kind:'console', level:cls, args:[String(text)] });
    const div = document.createElement('div'); div.className = 'log ' + cls; div.textContent = String(text); out.appendChild(div);
  };
  let finished = false;
  const finish = () => { if (!finished) { finished = true; post({ __dsl:true, kind:'done' }); } };
  const timeout = setTimeout(() => {
    const message = 'Python runtime timed out while loading. Check that all files in public/lib/pyodide/ are packaged in the Android app.';
    emit('error', message); post({ __dsl:true, kind:'error', message }); finish();
  }, 90000);
  try {
    if (typeof window.loadPyodide !== 'function') throw new Error('Python engine did not load. Expected public/lib/pyodide/pyodide.js.');
    const indexURL = new URL('./lib/pyodide/', document.baseURI).href;
    const pyodide = await window.loadPyodide({
      indexURL,
      stdout: text => emit('log', text),
      stderr: text => emit('error', text)
    });
    post({ __dsl:true, kind:'ready' });
    const userCode = document.getElementById('user-code').textContent;
    await pyodide.runPythonAsync(userCode);
  } catch (err) {
    const message = err && err.message ? err.message : String(err);
    emit('error', message);
    post({ __dsl:true, kind:'error', message, stack:err && err.stack ? String(err.stack) : null });
  } finally { clearTimeout(timeout); finish(); }
})();
</script>
</body>
</html>`;
}

/* ---------------------- blob URL helper ---------------------- */

export function htmlToBlobUrl(html) {
  const blob = new Blob([html], { type: 'text/html' });
  return URL.createObjectURL(blob);
}