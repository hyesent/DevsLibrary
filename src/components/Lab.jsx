import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
  getLabDraft,
  setLabDraft,
  getLabSaves,
  getLabSave,
  addLabSave,
  updateLabSave,
  renameLabSave,
  deleteLabSave,
  getLabHistory,
  pushLabHistory,
  deleteLabHistory,
  getLabSettings,
  setLabSettings,
} from '../lib/storage.js';
import {
  safeSerialize,
  buildJsRunner,
  buildJsxRunner,
  buildTsRunner,
  buildPyRunner,
  loadReactBabel,
  attachLabListener,
} from '../lib/labRuntime.js';
import ConsoleInspector from './ConsoleInspector.jsx';
import ErrorOverlay from './ErrorOverlay.jsx';
import { sha3_256, keccak_256 } from '@noble/hashes/sha3.js';
import { secp256k1 } from '@noble/curves/secp256k1.js';
import { ed25519 } from '@noble/curves/ed25519.js';
import mlkem from 'mlkem-wasm';

/* ============================================================ */
/* MODE CATALOG                                                 */
/* ============================================================ */

const MODES = [
  { id: 'html', label: 'HTML', about: 'Structure and content for the web.', stub: false },
  { id: 'html-css', label: 'HTML + CSS', about: 'Structure plus styling, together.', stub: false, threeState: true, subkey: 'html-css' },
  { id: 'svg', label: 'SVG', about: 'Vector graphics you can draw and preview.', stub: false },
  { id: 'js', label: 'JavaScript', about: 'Logic, DOM, and console output.', stub: false, outputMode: true },
  { id: 'jsx', label: 'React / JSX', about: 'Components with JSX, live preview.', stub: false, threeState: true, subkey: 'jsx' },
  { id: 'typescript', label: 'TypeScript', about: 'Typed JavaScript, compiled in-browser.', stub: false, outputMode: true, engine: 'esbuild' },
  { id: 'sql', label: 'SQL', about: 'Query a real Postgres in the browser.', stub: false, outputMode: true, engine: 'pglite' },
  { id: 'python', label: 'Python', about: 'Real CPython, runs offline.', stub: false, outputMode: true, engine: 'pyodide' },
  { id: 'tailwind', label: 'Tailwind', about: 'Compose interfaces with offline utility classes.', stub: false },
  { id: 'http', label: 'HTTP & Web APIs', about: 'Requests, responses, headers, and an offline API.', stub: false, outputMode: true },
  { id: 'testing', label: 'Testing', about: 'Write assertions, suites, and useful failure messages.', stub: false, outputMode: true },
  { id: 'crypto', label: 'Crypto', about: 'Explore Web Crypto, elliptic curves, SHA-3, and post-quantum key exchange offline.', stub: false, outputMode: true },
  { id: 'dsa', label: 'DSA', about: 'Solve algorithm problems and inspect operations.', stub: false, outputMode: true },
];

const MODE_MAP = Object.fromEntries(MODES.map((m) => [m.id, m]));

const MAX_OUTPUT_ENTRIES = 500;

/* ============================================================ */
/* STARTERS                                                     */
/* ============================================================ */

const STARTERS = {
  html: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Playground</title>
  </head>
  <body>
    <h1>Hello, DevsLibrary</h1>
    <p>Edit the code. Preview updates live.</p>
    <ul>
      <li>Try adding a list item</li>
      <li>Or change the heading</li>
    </ul>
  </body>
</html>`,

  'html-css:html': `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Playground</title>
  </head>
  <body>
    <div class="card">
      <h1>Styled by you</h1>
      <p>Change the CSS. Watch it update.</p>
    </div>
  </body>
</html>`,

  'html-css:css': `body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #0b0f17;
  color: #eef4ff;
  font-family: system-ui, sans-serif;
}

.card {
  padding: 32px 40px;
  border-radius: 20px;
  background: #1a2233;
  border: 1px solid rgba(255,255,255,.08);
  box-shadow: 0 30px 60px -30px rgba(0,0,0,.8);
}

h1 {
  margin: 0 0 8px;
  color: #61dafb;
}`,

  svg: `<svg viewBox="0 0 200 200" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#61dafb" />
      <stop offset="1" stop-color="#ff7e5f" />
    </linearGradient>
  </defs>
  <circle cx="100" cy="100" r="80" fill="url(#g)" />
  <circle cx="100" cy="100" r="40" fill="#0b0f17" />
</svg>`,

  'jsx:jsx': `function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="card">
      <h1>Counter</h1>
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'jsx:css': `.card {
  padding: 32px 40px;
  border-radius: 20px;
  background: #1a2233;
  color: #eef4ff;
  font-family: system-ui, sans-serif;
  text-align: center;
}

.card h1 {
  margin: 0 0 8px;
  color: #61dafb;
}

.card button {
  margin-top: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 999px;
  background: #61dafb;
  color: #0b0f17;
  font-weight: 600;
  cursor: pointer;
}`,

  js: `console.log('Hello from the lab');

const nums = [1, 2, 3, 4, 5];
const doubled = nums.map(n => n * 2);
console.log('Doubled:', doubled);

console.log('Sum:', nums.reduce((a, b) => a + b, 0));

const user = { name: 'Ada', role: 'dev', tags: ['js', 'react'] };
console.log('User:', user);

console.warn('This is a warning');
console.error('This is an error');`,

  typescript: `type User = { name: string; age: number };

const users: User[] = [
  { name: 'Ada', age: 36 },
  { name: 'Grace', age: 45 },
];

users.forEach((u: User) => {
  console.log(\`\${u.name} is \${u.age}\`);
});

function double(n: number): number {
  return n * 2;
}

console.log('Double 21:', double(21));`,

  sql: `-- A fresh Postgres for every session.
-- Build a table, add rows, query it back.

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE
);

INSERT INTO users (name, email) VALUES
  ('Alice', 'alice@example.com'),
  ('Bob', 'bob@example.com'),
  ('Carol', 'carol@example.com');

SELECT id, name FROM users ORDER BY id;`,

  python: `print("Hello from Python")

nums = [1, 2, 3, 4, 5]
doubled = [n * 2 for n in nums]
print("Doubled:", doubled)

print("Sum:", sum(nums))

user = {"name": "Ada", "role": "dev", "tags": ["python", "js"]}
print("User:", user)

for i in range(3):
    print(f"Loop iteration {i}")`,

  tailwind: `<!doctype html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Tailwind Lab</title></head>
<body class="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
  <main class="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-xl">
    <p class="text-sm font-semibold uppercase tracking-wide text-cyan-400">DevsLibrary · Tailwind Lab</p>
    <h1 class="mt-3 text-3xl font-bold">Build with utilities.</h1>
    <p class="mt-3 text-slate-300">Change classes to see how utility-first styling composes an interface.</p>
    <button class="mt-6 rounded-lg bg-cyan-400 px-4 py-2 font-semibold text-slate-950">Explore</button>
  </main>
</body>
</html>`,

  http: `// Everything here runs offline. fetch() is routed to a local mock API.
const response = await fetch('/api/users/1');
console.log('Status:', response.status, response.statusText);
console.log('Content-Type:', response.headers.get('content-type'));
console.log('User:', await response.json());

const created = await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Grace' }),
});
console.log('Created:', created.status, await created.json());

const missing = await fetch('/api/not-found');
console.log('Missing route:', missing.status, await missing.json());`,

  testing: `// A tiny built-in test harness: no package install or network required.
const { test, assert, equal, deepEqual, throws, runTests } = createTestSuite();

test('addition returns the expected result', () => equal(add(2, 3), 5));
test('arrays can be compared structurally', () => deepEqual([1, 2], [1, 2]));
test('assertion reports a useful failure', () => throws(() => { throw new Error('expected'); }));
test('string equality passes when values match', () => equal('expected', 'expected')); 

function add(a, b) { return a + b; }
await runTests();`,

  crypto: `// Uses the browser's native Web Crypto API. No CDN or remote service.
const bytes = crypto.getRandomValues(new Uint8Array(16));
console.log('Random bytes:', Array.from(bytes));

const encoder = new TextEncoder();
const message = encoder.encode('DevsLibrary offline crypto lab');
const digest = await crypto.subtle.digest('SHA-256', message);
const hex = Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('');
console.log('SHA-256:', hex);

const key = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
const iv = crypto.getRandomValues(new Uint8Array(12));
const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoder.encode('secret note'));
const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, encrypted);
console.log('Decrypted:', new TextDecoder().decode(decrypted));`,

  dsa: `// DSA playground: solve the problem, then inspect operation counts.
function twoSum(nums, target) {
  const seen = new Map();
  let operations = 0;
  for (let i = 0; i < nums.length; i++) {
    operations++;
    const needed = target - nums[i];
    if (seen.has(needed)) return { indices: [seen.get(needed), i], operations };
    seen.set(nums[i], i);
  }
  return { indices: [], operations };
}

const sample = [2, 7, 11, 15];
const result = twoSum(sample, 9);
console.log('Input:', sample, 'target:', 9);
console.log('Result:', result.indices);
console.log('Loop operations:', result.operations);
console.log('Expected indices: [0, 1]');
const { test, deepEqual, runTests } = createTestSuite();
test('finds a pair that reaches the target', () => deepEqual(twoSum([2, 7, 11, 15], 9).indices, [0, 1]));
test('returns no pair when none exists', () => deepEqual(twoSum([1, 2, 3], 99).indices, []));
await runTests();`,
};

/* ============================================================ */
/* HELPERS                                                      */
/* ============================================================ */

function wrapSvg(svgCode) {
  const s = typeof svgCode === 'string' ? svgCode : '';
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      html, body { height: 100%; margin: 0; }
      body { display: grid; place-items: center; background: #d5dae3; padding: 16px; }
      svg { max-width: 100%; height: auto; }
    </style>
  </head>
  <body>${s}</body>
</html>`;
}

function buildHtmlCssDoc(html, css) {
  const h = typeof html === 'string' ? html : '';
  const c = typeof css === 'string' ? css : '';
  const styleTag = `<style>\n${c}\n</style>`;
  if (h.includes('</head>')) return h.replace('</head>', styleTag + '\n</head>');
  if (/<body/i.test(h)) return h.replace(/<body([^>]*)>/i, `<head>${styleTag}</head>\n<body$1>`);
  return styleTag + '\n' + h;
}

function buildTailwindPreview(html) {
  const source = String(html || '');
  const localCompiler = '<script src="/lib/tailwind.js"></script>';

  if (/<head\b[^>]*>/i.test(source)) {
    return source.replace(/<head\b[^>]*>/i, (head) => `${head}\n${localCompiler}`);
  }

  if (/<html\b[^>]*>/i.test(source)) {
    return source.replace(/<html\b[^>]*>/i, (htmlTag) =>
      `${htmlTag}\n<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">${localCompiler}</head>`
    );
  }

  if (/<body\b[^>]*>/i.test(source)) {
    return `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">${localCompiler}</head>${source}</html>`;
  }

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  ${localCompiler}
</head>
<body>${source}</body>
</html>`;
}

function previewEmpty(doc) {
  if (!doc || typeof doc !== 'string') return true;
  const stripped = doc.replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, '').trim();
  return stripped.length === 0;
}

function formatDate(ts) {
  const d = new Date(ts);
  const diff = Date.now() - ts;
  if (diff < 60000) return 'just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return d.toLocaleDateString();
}

function initialStateFor(mode, meta, loadId) {
  if (loadId) {
    const save = getLabSave(loadId);
    if (save && save.mode === mode) {
      try {
        return { code: meta.threeState ? JSON.parse(save.code) : save.code, saveId: save.id };
      } catch {
        return { code: save.code, saveId: save.id };
      }
    }
  }
  if (meta.threeState) {
    const sub = meta.subkey || 'html-css';
    if (sub === 'jsx') {
      return {
        code: {
          jsx: getLabDraft('jsx:jsx') ?? STARTERS['jsx:jsx'],
          css: getLabDraft('jsx:css') ?? STARTERS['jsx:css'],
        },
        saveId: null,
      };
    }
    return {
      code: {
        html: getLabDraft('html-css:html') ?? STARTERS['html-css:html'],
        css: getLabDraft('html-css:css') ?? STARTERS['html-css:css'],
      },
      saveId: null,
    };
  }
  return { code: getLabDraft(mode) ?? STARTERS[mode], saveId: null };
}

/* ============================================================ */
/* ICONS                                                        */
/* ============================================================ */

const S = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none',
            stroke: 'currentColor', strokeWidth: 1.8,
            strokeLinecap: 'round', strokeLinejoin: 'round' };

const IconCode     = () => <svg {...S}><polyline points="8 7 3 12 8 17"/><polyline points="16 7 21 12 16 17"/><line x1="14" y1="5" x2="10" y2="19"/></svg>;
const IconExpand   = () => <svg {...S}><polyline points="4 9 4 4 9 4"/><polyline points="20 9 20 4 15 4"/><polyline points="4 15 4 20 9 20"/><polyline points="20 15 20 20 15 20"/></svg>;
const IconClose    = () => <svg {...S}><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>;
const IconUndo     = () => <svg {...S}><polyline points="9 14 4 9 9 4"/><path d="M4 9h11a5 5 0 0 1 0 10h-3"/></svg>;
const IconRedo     = () => <svg {...S}><polyline points="15 14 20 9 15 4"/><path d="M20 9H9a5 5 0 0 0 0 10h3"/></svg>;
const IconHistory  = () => <svg {...S}><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>;
const IconPlay     = () => <svg {...S}><polygon points="6 4 20 12 6 20 6 4"/></svg>;
const IconClear    = () => <svg {...S}><polyline points="3 6 5 6 21 6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>;

/* ============================================================ */
/* CUSTOM KEYBOARD — dual mode (symbols / letters+numbers)      */
/* ============================================================ */

const SYMBOL_ROWS = [
  ['<', '>', '=', '"', "'", '/', '\\', '{', '}', '(', ')'],
  ['[', ']', ';', ':', ',', '.', '!', '?', '#', '$', '%', '&'],
  ['Tab', '-', '_', '+', '*', '|', '^', '~', '@', '←', '→'],
  ['Space', 'Enter', 'Backspace', 'Done'],
];

const TEXT_ROWS = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
  ['Space', 'Enter', 'Backspace', 'Done'],
];

function CodeKeyboard({ onKey }) {
  const [mode, setMode] = useState('symbols');
  const ref = useRef(null);

  const rows = mode === 'symbols' ? SYMBOL_ROWS : TEXT_ROWS;
  const toggleLabel = mode === 'symbols' ? 'abc' : '#+=';

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const sync = () => {
      const h = el.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--lab-kb-height', `${h}px`);
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (!ref.current) return;
      const h = ref.current.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--lab-kb-height', `${h}px`);
    });
  }, [mode]);

  useEffect(() => {
    return () => {
      document.documentElement.style.removeProperty('--lab-kb-height');
    };
  }, []);

  return (
    <>
      <button
        type="button"
        className="lab-kb-toggle"
        onMouseDown={(e) => e.preventDefault()}
        onTouchStart={(e) => e.preventDefault()}
        onClick={() => setMode((m) => (m === 'symbols' ? 'text' : 'symbols'))}
        aria-label={mode === 'symbols' ? 'Switch to letters and numbers' : 'Switch to symbols'}
      >
        {toggleLabel}
      </button>

      <div className="lab-kb" ref={ref} role="group" aria-label="Coding keyboard">
        {rows.map((row, ri) => (
          <div className="lab-kb-row" key={ri}>
            {row.map((k) => {
              const special = ['Tab', 'Enter', 'Backspace', 'Space', 'Done'].includes(k);
              const label =
                k === 'Backspace' ? '⌫' :
                k === 'Enter' ? '↵' :
                k === 'Tab' ? '⇥' :
                k === 'Space' ? 'space' : k;
              return (
                <button
                  key={k}
                  type="button"
                  className={
                    'lab-kb-key' +
                    (special ? ' is-special' : '') +
                    (k === 'Space' ? ' is-wide' : '') +
                    (k === 'Done' ? ' is-done' : '')
                  }
                  onMouseDown={(e) => e.preventDefault()}
                  onTouchStart={(e) => e.preventDefault()}
                  onClick={() => onKey(k)}
                >
                  {label}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}

/* ============================================================ */
/* LANDING                                                      */
/* ============================================================ */

export function LabLanding() {
  return (
    <div className="lab-landing">
      <p className="lab-landing-intro">
        A small lab to write, run, and preview code — right here, offline.
        Pick a mode to start.
      </p>
      <div className="book-grid">
        {MODES.map((m) => (
          <Link key={m.id} to={`/lab/${m.id}`} className="book-card">
            <div className="book-card-icon"><IconCode /></div>
            <h3 className="book-card-title">{m.label}</h3>
            <p className="book-card-tagline">{m.about}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ============================================================ */
/* ROUTER                                                       */
/* ============================================================ */

export default function LabMode() {
  const { mode } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const meta = MODE_MAP[mode];
  const loadId = searchParams.get('load');

  if (!meta) {
    return (
      <div className="lab-stub">
        <div>
          <div className="lab-stub-title">Unknown mode</div>
          <div className="lab-stub-text">
            That lab mode doesn't exist. <Link to="/lab">Back to lab</Link>.
          </div>
        </div>
      </div>
    );
  }

  if (meta.stub) {
    return (
      <div className="lab-stub">
        <div>
          <div className="lab-stub-title">{meta.label} is coming soon</div>
        </div>
      </div>
    );
  }

  return (
    <LabEditor
      key={`${mode}:${loadId || 'new'}`}
      mode={mode}
      meta={meta}
      navigate={navigate}
      loadId={loadId}
    />
  );
}

function LabEditor({ mode, meta, navigate, loadId }) {
  if (meta.subkey === 'jsx') return <JsxLab key={mode} mode={mode} meta={meta} navigate={navigate} loadId={loadId} />;
  if (mode === 'crypto') return <CryptoWorkbench key={mode} mode={mode} navigate={navigate} />;
  if (meta.outputMode) return <OutputLab key={mode} mode={mode} meta={meta} navigate={navigate} loadId={loadId} />;
  if (meta.threeState) return <HtmlCssLab key={mode} mode={mode} meta={meta} navigate={navigate} loadId={loadId} />;
  return <SingleCodeLab key={mode} mode={mode} meta={meta} navigate={navigate} loadId={loadId} />;
}

/* ============================================================ */
/* Shared chrome                                                */
/* ============================================================ */

function ModeTabs({ mode, navigate }) {
  return (
    <div className="lab-tabs" role="tablist" aria-label="Lab mode">
      {MODES.map((m) => (
        <button
          key={m.id}
          role="tab"
          aria-selected={m.id === mode}
          className={`lab-tab ${m.id === mode ? 'is-active' : ''}`}
          onClick={() => navigate(`/lab/${m.id}`)}
          type="button"
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}

function HistoryCard({ onUndo, onRedo, onHistory }) {
  return (
    <div className="lab-history-card">
      <button className="lab-history-btn" onClick={onUndo} aria-label="Undo" type="button"><IconUndo /></button>
      <button className="lab-history-btn" onClick={onRedo} aria-label="Redo" type="button"><IconRedo /></button>
      <button className="lab-history-btn" onClick={onHistory} aria-label="History" type="button"><IconHistory /></button>
    </div>
  );
}

function LineNumbers({ text, linesRef }) {
  const count = (text || '').split('\n').length;
  const numbers = Array.from({ length: count }, (_, i) => i + 1).join('\n');
  return <div className="lab-lines" ref={linesRef} aria-hidden="true">{numbers}</div>;
}

/* Reads the current save mode setting once per mount. Updates in the
   settings modal dispatch a window event so the lab re-reads. */
function useSaveMode() {
  const [mode, setMode] = useState(() => getLabSettings().saveMode || 'manual');
  useEffect(() => {
    const onChange = () => {
      setMode(getLabSettings().saveMode || 'manual');
    };
    window.addEventListener('dsl:lab-settings-changed', onChange);
    return () => window.removeEventListener('dsl:lab-settings-changed', onChange);
  }, []);
  return mode;
}

function useDraftPersistence({ mode, code, saveId, threeState, subkey }) {
  const saveMode = useSaveMode();

  /* persist draft (always) */
  useEffect(() => {
    const t = setTimeout(() => {
      if (threeState) {
        if (subkey === 'jsx') {
          setLabDraft('jsx:jsx', code.jsx);
          setLabDraft('jsx:css', code.css);
        } else {
          setLabDraft('html-css:html', code.html);
          setLabDraft('html-css:css', code.css);
        }
      } else {
        setLabDraft(mode, code);
      }
    }, 400);
    return () => clearTimeout(t);
  }, [code, mode, threeState, subkey]);

  /* autosave only in 'auto' mode and only when a save is loaded */
  useEffect(() => {
    if (!saveId) return;
    if (saveMode !== 'auto') return;
    const t = setTimeout(() => {
      const value = threeState ? JSON.stringify(code) : String(code);
      updateLabSave(saveId, value);
    }, 1200);
    return () => clearTimeout(t);
  }, [code, saveId, threeState, saveMode]);
}

/* ============================================================ */
/* Single-code lab — HTML, SVG, Tailwind                        */
/* ============================================================ */

function SingleCodeLab({ mode, meta, navigate, loadId }) {
  const initial = useMemo(() => initialStateFor(mode, meta, loadId), [mode, meta, loadId]);
  const [code, setCode] = useState(initial.code);
  const [saveId, setSaveId] = useState(initial.saveId);
  const [view, setView] = useState('code');
  const [kbOpen, setKbOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [savePrompt, setSavePrompt] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [historyList, setHistoryList] = useState(() => getLabHistory(`mode:${mode}`));
  const [showHistory, setShowHistory] = useState(false);

  const taRef = useRef(null);
  const linesRef = useRef(null);

  useDraftPersistence({ mode, code, saveId, threeState: false });

  useEffect(() => {
    const t = setTimeout(() => {
      const entry = pushLabHistory({ mode, code: String(code) });
      if (entry) setHistoryList(getLabHistory(`mode:${mode}`));
    }, 2000);
    return () => clearTimeout(t);
  }, [code, mode]);

  const previewSrc = useMemo(
    () => mode === 'svg' ? wrapSvg(code)
        : mode === 'tailwind' ? buildTailwindPreview(code)
        : code,
    [mode, code]
  );
  const isEmptyPreview = useMemo(() => {
    if (mode === 'svg') return !/<[a-zA-Z][^>]*>/.test(code);
    return previewEmpty(code);
  }, [mode, code]);

  const syncLines = () => {
    if (taRef.current && linesRef.current) linesRef.current.scrollTop = taRef.current.scrollTop;
  };
  useEffect(() => { syncLines(); }, [code]);

  const applyKey = (k) => insertKey(k, taRef, code, setCode, setKbOpen);
  const doUndo = () => { taRef.current?.focus(); document.execCommand('undo'); };
  const doRedo = () => { taRef.current?.focus(); document.execCommand('redo'); };

  const commitSave = () => {
    const name = saveName.trim() || 'Untitled';
    const save = addLabSave({ name, mode, code });
    setSaveId(save.id);
    setSavePrompt(false);
    setSaveName('');
  };

  const doReset = () => {
    if (!window.confirm('Reset to starter code? Your current draft will be lost.')) return;
    setCode(STARTERS[mode]);
    setSaveId(null);
  };

  const showPreview = view === 'preview';

  return (
    <>
      <div className="lab">
        <div className="lab-top">
          <ModeTabs mode={mode} navigate={navigate} />
          <div className="lab-toggle" role="tablist">
            <button className={`lab-toggle-btn ${view === 'code' ? 'is-active' : ''}`} onClick={() => setView('code')} type="button">Code</button>
            <button className={`lab-toggle-btn ${view === 'preview' ? 'is-active' : ''}`} onClick={() => setView('preview')} type="button">Preview</button>
          </div>
        </div>
        <div className="lab-pane">
          {!showPreview && (
            <>
              <div className="lab-editor">
                <LineNumbers text={code} linesRef={linesRef} />
                <textarea
                  ref={taRef}
                  className="lab-textarea"
                  value={code}
                  spellCheck={false}
                  autoCorrect="off"
                  autoCapitalize="off"
                  autoComplete="off"
                  inputMode="none"
                  aria-label={`${meta.label} editor`}
                  onChange={(e) => setCode(e.target.value)}
                  onScroll={syncLines}
                  onFocus={() => setKbOpen(true)}
                />
              </div>
              <HistoryCard onUndo={doUndo} onRedo={doRedo} onHistory={() => setShowHistory(true)} />
            </>
          )}
          {showPreview && (
            <div className="lab-preview">
              <iframe
                key={previewSrc.length + '_' + Math.random().toString(36).slice(2, 6)}
                title="Live preview"
                sandbox="allow-scripts allow-modals"
                srcDoc={previewSrc}
              />
              {isEmptyPreview && <div className="lab-preview-empty">Nothing rendered yet. Write some HTML to see it here.</div>}
              {mode === 'tailwind' && (
                <div className="lab-engine-status" style={{ position: 'absolute', left: 8, bottom: 8, right: 8, fontSize: 11, pointerEvents: 'none' }}>
                  Offline utility preview · full Tailwind compiler bundled locally
                </div>
              )}
              <button className="lab-fs-btn" onClick={() => setFullscreen(true)} aria-label="Fullscreen preview" type="button"><IconExpand /></button>
            </div>
          )}
        </div>
      </div>

      {fullscreen && (
        <div className="lab-preview-fullscreen">
          <iframe title="Fullscreen preview" sandbox="allow-scripts allow-modals" srcDoc={previewSrc} />
          <button className="lab-fs-exit" onClick={() => setFullscreen(false)} aria-label="Exit fullscreen" type="button"><IconClose /></button>
        </div>
      )}

      {kbOpen && !showPreview && <CodeKeyboard onKey={applyKey} />}

      {!kbOpen && (
        <div className="select-bar" style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 76px)' }}>
          <button className="select-btn" onClick={doReset} type="button">Reset</button>
          <button className="select-btn primary" onClick={() => setSavePrompt(true)} type="button">Save</button>
        </div>
      )}

      <SavePrompt open={savePrompt} name={saveName} setName={setSaveName} onClose={() => setSavePrompt(false)} onSave={commitSave} />
      <HistoryPanel
        open={showHistory}
        list={historyList}
        onClose={() => setShowHistory(false)}
        onRestore={(h) => { setCode(h.code); setShowHistory(false); }}
        onDelete={(id) => { deleteLabHistory(id); setHistoryList(getLabHistory(`mode:${mode}`)); }}
      />
    </>
  );
}

/* ============================================================ */
/* HTML + CSS lab                                               */
/* ============================================================ */

function HtmlCssLab({ mode, meta, navigate, loadId }) {
  const initial = useMemo(() => initialStateFor(mode, meta, loadId), [mode, meta, loadId]);
  const [code, setCode] = useState(initial.code);
  const [saveId, setSaveId] = useState(initial.saveId);
  const [view, setView] = useState('html');
  const [kbOpen, setKbOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [savePrompt, setSavePrompt] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [historyList, setHistoryList] = useState(() => getLabHistory(`mode:${mode}`));
  const [showHistory, setShowHistory] = useState(false);

  const taRef = useRef(null);
  const linesRef = useRef(null);

  useDraftPersistence({ mode, code, saveId, threeState: true, subkey: 'html-css' });

  useEffect(() => {
    const t = setTimeout(() => {
      const entry = pushLabHistory({ mode, code: JSON.stringify(code) });
      if (entry) setHistoryList(getLabHistory(`mode:${mode}`));
    }, 2000);
    return () => clearTimeout(t);
  }, [code, mode]);

  const currentCode = view === 'css' ? code.css : code.html;
  const setCurrentCode = (val) => setCode((c) => ({ ...c, [view === 'css' ? 'css' : 'html']: val }));
  const previewSrc = useMemo(() => buildHtmlCssDoc(code.html, code.css), [code]);

  const syncLines = () => {
    if (taRef.current && linesRef.current) linesRef.current.scrollTop = taRef.current.scrollTop;
  };
  useEffect(() => { syncLines(); }, [view, currentCode]);

  const applyKey = (k) => insertKey(k, taRef, currentCode, setCurrentCode, setKbOpen);
  const doUndo = () => { taRef.current?.focus(); document.execCommand('undo'); };
  const doRedo = () => { taRef.current?.focus(); document.execCommand('redo'); };

  const commitSave = () => {
    const name = saveName.trim() || 'Untitled';
    const save = addLabSave({ name, mode, code: JSON.stringify(code) });
    setSaveId(save.id);
    setSavePrompt(false);
    setSaveName('');
  };

  const doReset = () => {
    if (!window.confirm('Reset to starter code? Your current draft will be lost.')) return;
    setCode({ html: STARTERS['html-css:html'], css: STARTERS['html-css:css'] });
    setSaveId(null);
  };

  const showPreview = view === 'preview';
  const showCss = view === 'css';

  return (
    <>
      <div className="lab">
        <div className="lab-top">
          <ModeTabs mode={mode} navigate={navigate} />
          <div className="lab-toggle" role="tablist">
            <button className={`lab-toggle-btn ${view === 'html' ? 'is-active' : ''}`} onClick={() => setView('html')} type="button">HTML</button>
            <button className={`lab-toggle-btn ${view === 'css' ? 'is-active' : ''}`} onClick={() => setView('css')} type="button">CSS</button>
            <button className={`lab-toggle-btn ${view === 'preview' ? 'is-active' : ''}`} onClick={() => setView('preview')} type="button">Preview</button>
          </div>
        </div>
        <div className="lab-pane">
          {!showPreview && (
            <>
              <div className="lab-editor">
                <LineNumbers text={currentCode} linesRef={linesRef} />
                <textarea
                  ref={taRef}
                  className="lab-textarea"
                  value={currentCode}
                  spellCheck={false}
                  autoCorrect="off"
                  autoCapitalize="off"
                  autoComplete="off"
                  inputMode="none"
                  aria-label={`${meta.label} ${showCss ? 'CSS' : 'HTML'} editor`}
                  onChange={(e) => setCurrentCode(e.target.value)}
                  onScroll={syncLines}
                  onFocus={() => setKbOpen(true)}
                />
              </div>
              <HistoryCard onUndo={doUndo} onRedo={doRedo} onHistory={() => setShowHistory(true)} />
            </>
          )}
          {showPreview && (
            <div className="lab-preview">
              <iframe
                key={previewSrc.length + '_' + Math.random().toString(36).slice(2, 6)}
                title="Live preview"
                sandbox="allow-scripts allow-modals"
                srcDoc={previewSrc}
              />
              <button className="lab-fs-btn" onClick={() => setFullscreen(true)} aria-label="Fullscreen preview" type="button"><IconExpand /></button>
            </div>
          )}
        </div>
      </div>

      {fullscreen && (
        <div className="lab-preview-fullscreen">
          <iframe title="Fullscreen preview" sandbox="allow-scripts allow-modals" srcDoc={previewSrc} />
          <button className="lab-fs-exit" onClick={() => setFullscreen(false)} aria-label="Exit fullscreen" type="button"><IconClose /></button>
        </div>
      )}

      {kbOpen && !showPreview && <CodeKeyboard onKey={applyKey} />}

      {!kbOpen && (
        <div className="select-bar" style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 76px)' }}>
          <button className="select-btn" onClick={doReset} type="button">Reset</button>
          <button className="select-btn primary" onClick={() => setSavePrompt(true)} type="button">Save</button>
        </div>
      )}

      <SavePrompt open={savePrompt} name={saveName} setName={setSaveName} onClose={() => setSavePrompt(false)} onSave={commitSave} />
      <HistoryPanel
        open={showHistory}
        list={historyList}
        onClose={() => setShowHistory(false)}
        onRestore={(h) => { try { setCode(JSON.parse(h.code)); } catch {} setShowHistory(false); }}
        onDelete={(id) => { deleteLabHistory(id); setHistoryList(getLabHistory(`mode:${mode}`)); }}
      />
    </>
  );
}

/* ============================================================ */
/* JSX lab (inline React + Babel)                               */
/* ============================================================ */

function JsxLab({ mode, meta, navigate, loadId }) {
  const initial = useMemo(() => initialStateFor(mode, meta, loadId), [mode, meta, loadId]);
  const [code, setCode] = useState(initial.code);
  const [saveId, setSaveId] = useState(initial.saveId);
  const [view, setView] = useState('jsx');
  const [kbOpen, setKbOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [savePrompt, setSavePrompt] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [historyList, setHistoryList] = useState(() => getLabHistory(`mode:${mode}`));
  const [showHistory, setShowHistory] = useState(false);
  const [compileError, setCompileError] = useState(null);
  const [libs, setLibs] = useState(null);
  const [libsError, setLibsError] = useState(null);

  const taRef = useRef(null);
  const linesRef = useRef(null);

  useDraftPersistence({ mode, code, saveId, threeState: true, subkey: 'jsx' });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { react, reactDom, babel } = await loadReactBabel();
        if (!cancelled) setLibs({ react, reactDom, babel });
      } catch (e) {
        if (!cancelled) setLibsError(e?.message || 'Failed to load React/Babel');
      }
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    return attachLabListener((msg) => {
      if (msg.kind === 'compile-error') {
        setCompileError({ message: msg.message, line: msg.line, stack: msg.stack });
      } else if (msg.kind === 'ready') {
        setCompileError(null);
      }
    });
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      const entry = pushLabHistory({ mode, code: JSON.stringify(code) });
      if (entry) setHistoryList(getLabHistory(`mode:${mode}`));
    }, 2000);
    return () => clearTimeout(t);
  }, [code, mode]);

  const currentCode = view === 'css' ? code.css : code.jsx;
  const setCurrentCode = (val) => setCode((c) => ({ ...c, [view === 'css' ? 'css' : 'jsx']: val }));

  const previewSrc = useMemo(() => {
    if (!libs) return '';
    return buildJsxRunner({
      jsxCode: code.jsx,
      cssCode: code.css,
      reactSrc: libs.react,
      reactDomSrc: libs.reactDom,
      babelSrc: libs.babel,
    });
  }, [code, libs]);

  const syncLines = () => {
    if (taRef.current && linesRef.current) linesRef.current.scrollTop = taRef.current.scrollTop;
  };
  useEffect(() => { syncLines(); }, [view, currentCode]);

  const applyKey = (k) => insertKey(k, taRef, currentCode, setCurrentCode, setKbOpen);
  const doUndo = () => { taRef.current?.focus(); document.execCommand('undo'); };
  const doRedo = () => { taRef.current?.focus(); document.execCommand('redo'); };

  const commitSave = () => {
    const name = saveName.trim() || 'Untitled';
    const save = addLabSave({ name, mode, code: JSON.stringify(code) });
    setSaveId(save.id);
    setSavePrompt(false);
    setSaveName('');
  };

  const doReset = () => {
    if (!window.confirm('Reset to starter code? Your current draft will be lost.')) return;
    setCode({ jsx: STARTERS['jsx:jsx'], css: STARTERS['jsx:css'] });
    setSaveId(null);
  };

  const showPreview = view === 'preview';
  const showCss = view === 'css';

  return (
    <>
      <div className="lab">
        <div className="lab-top">
          <ModeTabs mode={mode} navigate={navigate} />
          <div className="lab-toggle" role="tablist">
            <button className={`lab-toggle-btn ${view === 'jsx' ? 'is-active' : ''}`} onClick={() => setView('jsx')} type="button">Code</button>
            <button className={`lab-toggle-btn ${view === 'css' ? 'is-active' : ''}`} onClick={() => setView('css')} type="button">CSS</button>
            <button className={`lab-toggle-btn ${view === 'preview' ? 'is-active' : ''}`} onClick={() => setView('preview')} type="button">Preview</button>
          </div>
        </div>

        {!libs && !libsError && <div className="lab-engine-status">Loading React…</div>}
        {libsError && <div className="lab-engine-status lab-engine-error">Failed to load React: {libsError}</div>}

        <div className="lab-pane">
          {!showPreview && (
            <>
              <div className="lab-editor">
                <LineNumbers text={currentCode} linesRef={linesRef} />
                <textarea
                  ref={taRef}
                  className="lab-textarea"
                  value={currentCode}
                  spellCheck={false}
                  autoCorrect="off"
                  autoCapitalize="off"
                  autoComplete="off"
                  inputMode="none"
                  aria-label={`${meta.label} ${showCss ? 'CSS' : 'code'} editor`}
                  onChange={(e) => setCurrentCode(e.target.value)}
                  onScroll={syncLines}
                  onFocus={() => setKbOpen(true)}
                />
              </div>
              <HistoryCard onUndo={doUndo} onRedo={doRedo} onHistory={() => setShowHistory(true)} />
            </>
          )}
          {showPreview && libs && (
            <div className="lab-preview">
              <iframe
                key={previewSrc.length + '_' + Math.random().toString(36).slice(2, 6)}
                title="Live preview"
                sandbox="allow-scripts allow-modals"
                srcDoc={previewSrc}
              />
              <button className="lab-fs-btn" onClick={() => setFullscreen(true)} aria-label="Fullscreen preview" type="button"><IconExpand /></button>
            </div>
          )}
          {showPreview && !libs && (
            <div className="lab-preview">
              <div className="lab-preview-empty">
                {libsError ? 'React failed to load.' : 'Loading React…'}
              </div>
            </div>
          )}
        </div>
      </div>

      {fullscreen && libs && (
        <div className="lab-preview-fullscreen">
          <iframe title="Fullscreen preview" sandbox="allow-scripts allow-modals" srcDoc={previewSrc} />
          <button className="lab-fs-exit" onClick={() => setFullscreen(false)} aria-label="Exit fullscreen" type="button"><IconClose /></button>
        </div>
      )}

      {compileError && !showPreview && <ErrorOverlay error={compileError} onClose={() => setCompileError(null)} />}

      {kbOpen && !showPreview && <CodeKeyboard onKey={applyKey} />}

      {!kbOpen && (
        <div className="select-bar" style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 76px)' }}>
          <button className="select-btn" onClick={doReset} type="button">Reset</button>
          <button className="select-btn primary" onClick={() => setSavePrompt(true)} type="button">Save</button>
        </div>
      )}

      <SavePrompt open={savePrompt} name={saveName} setName={setSaveName} onClose={() => setSavePrompt(false)} onSave={commitSave} />
      <HistoryPanel
        open={showHistory}
        list={historyList}
        onClose={() => setShowHistory(false)}
        onRestore={(h) => { try { setCode(JSON.parse(h.code)); } catch {} setShowHistory(false); }}
        onDelete={(id) => { deleteLabHistory(id); setHistoryList(getLabHistory(`mode:${mode}`)); }}
      />
    </>
  );
}

/* ============================================================ */
/* Crypto workbench — themed with classes                       */
/* ============================================================ */

const cryptoHex = (value) => Array.from(new Uint8Array(value), (b) => b.toString(16).padStart(2, '0')).join('');
const cryptoBytesHex = (value) => Array.from(value instanceof Uint8Array ? value : new Uint8Array(value), (b) => b.toString(16).padStart(2, '0')).join('');
const cryptoB64 = (value) => {
  const bytes = value instanceof Uint8Array ? value : new Uint8Array(value);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(binary);
};
const cryptoText = (value) => new TextEncoder().encode(value);
const cryptoJwk = (value) => JSON.stringify(value, null, 2);

function CryptoWorkbench({ mode, navigate }) {
  const [tab, setTab] = useState('fundamentals');
  const [operation, setOperation] = useState('sha256');
  const [message, setMessage] = useState('DevsLibrary offline crypto lab');
  const [running, setRunning] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState([]);
  const [lastOperation, setLastOperation] = useState('Ready');

  const options = tab === 'fundamentals' ? [
    ['sha256', 'SHA-256 hash'], ['aes', 'AES-GCM encrypt / decrypt'], ['rsa', 'RSA-OAEP keygen + encrypt / decrypt'],
    ['hmac', 'HMAC sign / verify'], ['ecdsa', 'ECDSA P-256 sign / verify'],
  ] : [
    ['sha3', 'SHA3-256 hash'], ['keccak', 'Keccak-256 hash'], ['secp256k1', 'secp256k1 signature'],
    ['ed25519', 'Ed25519 signature'], ['ecdh', 'ECDH key exchange (P-256)'], ['mlkem', 'ML-KEM-768 encapsulation'],
  ];

  useEffect(() => { setOperation(tab === 'fundamentals' ? 'sha256' : 'sha3'); setResults([]); setError(''); }, [tab]);
  useEffect(() => { if (!options.some(([id]) => id === operation)) setOperation(options[0][0]); }, [options, operation]);

  const add = (label, value, tone = 'value') => ({
    label,
    value: typeof value === 'string' ? value : JSON.stringify(value, null, 2),
    tone,
  });

  const runCrypto = async () => {
    setRunning(true); setError(''); setResults([]);
    setLastOperation(options.find(([id]) => id === operation)?.[1] || operation);
    const output = [];
    try {
      const subtle = globalThis.crypto?.subtle;
      if (!subtle) throw new Error('Web Crypto is unavailable in this WebView. Use a secure app origin and update Android System WebView.');
      const data = cryptoText(message);
      if (operation === 'sha256') {
        output.push(add('Algorithm', 'SHA-256', 'meta'));
        output.push(add('Input bytes', data.length, 'meta'));
        output.push(add('Digest (hex)', cryptoHex(await subtle.digest('SHA-256', data)), 'success'));
      } else if (operation === 'aes') {
        const key = await subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const ciphertext = await subtle.encrypt({ name: 'AES-GCM', iv }, key, data);
        const decrypted = await subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext);
        output.push(add('Algorithm', 'AES-GCM · 256-bit key · 96-bit random IV', 'meta'));
        output.push(add('Key (hex, demo only)', cryptoHex(await subtle.exportKey('raw', key)), 'secret'));
        output.push(add('IV (hex)', cryptoBytesHex(iv), 'meta'));
        output.push(add('Ciphertext + authentication tag (Base64)', cryptoB64(ciphertext), 'success'));
        output.push(add('Decrypted plaintext', new TextDecoder().decode(decrypted), 'success'));
      } else if (operation === 'rsa') {
        const pair = await subtle.generateKey({ name: 'RSA-OAEP', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' }, true, ['encrypt', 'decrypt']);
        const ciphertext = await subtle.encrypt({ name: 'RSA-OAEP' }, pair.publicKey, data);
        const plaintext = await subtle.decrypt({ name: 'RSA-OAEP' }, pair.privateKey, ciphertext);
        output.push(add('Algorithm', 'RSA-OAEP · 2048-bit · SHA-256', 'meta'));
        output.push(add('Public key (JWK)', cryptoJwk(await subtle.exportKey('jwk', pair.publicKey)), 'success'));
        output.push(add('Private key (JWK, demo only)', cryptoJwk(await subtle.exportKey('jwk', pair.privateKey)), 'secret'));
        output.push(add('Ciphertext (Base64)', cryptoB64(ciphertext), 'value'));
        output.push(add('Decrypted plaintext', new TextDecoder().decode(plaintext), 'success'));
      } else if (operation === 'hmac') {
        const key = await subtle.generateKey({ name: 'HMAC', hash: 'SHA-256', length: 256 }, true, ['sign', 'verify']);
        const signature = await subtle.sign('HMAC', key, data);
        output.push(add('Algorithm', 'HMAC-SHA-256', 'meta'));
        output.push(add('Key (hex, demo only)', cryptoHex(await subtle.exportKey('raw', key)), 'secret'));
        output.push(add('MAC (hex)', cryptoHex(signature), 'success'));
        output.push(add('Verification', await subtle.verify('HMAC', key, signature, data) ? 'VALID — message and MAC match' : 'INVALID', 'success'));
      } else if (operation === 'ecdsa') {
        const pair = await subtle.generateKey({ name: 'ECDSA', namedCurve: 'P-256' }, true, ['sign', 'verify']);
        const signature = await subtle.sign({ name: 'ECDSA', hash: 'SHA-256' }, pair.privateKey, data);
        output.push(add('Algorithm', 'ECDSA · P-256 · SHA-256', 'meta'));
        output.push(add('Public key (JWK)', cryptoJwk(await subtle.exportKey('jwk', pair.publicKey)), 'success'));
        output.push(add('Private key (JWK, demo only)', cryptoJwk(await subtle.exportKey('jwk', pair.privateKey)), 'secret'));
        output.push(add('Signature (Base64)', cryptoB64(signature), 'value'));
        output.push(add('Verification', await subtle.verify({ name: 'ECDSA', hash: 'SHA-256' }, pair.publicKey, signature, data) ? 'VALID — signature verified' : 'INVALID', 'success'));
      } else if (operation === 'sha3') {
        output.push(add('Algorithm', 'SHA3-256 (FIPS 202)', 'meta'));
        output.push(add('Digest (hex)', cryptoBytesHex(sha3_256(data)), 'success'));
      } else if (operation === 'keccak') {
        output.push(add('Algorithm', 'Keccak-256 (not the same as SHA3-256)', 'meta'));
        output.push(add('Digest (hex)', cryptoBytesHex(keccak_256(data)), 'success'));
      } else if (operation === 'secp256k1') {
        const pair = secp256k1.keygen();
        const signature = secp256k1.sign(data, pair.secretKey);
        output.push(add('Algorithm', 'secp256k1 · ECDSA signature', 'meta'));
        output.push(add('Public key (hex)', cryptoBytesHex(pair.publicKey), 'success'));
        output.push(add('Private key (hex, demo only)', cryptoBytesHex(pair.secretKey), 'secret'));
        output.push(add('Signature (hex)', cryptoBytesHex(signature.toBytes ? signature.toBytes() : signature), 'value'));
        output.push(add('Verification', secp256k1.verify(signature, data, pair.publicKey) ? 'VALID — signature verified' : 'INVALID', 'success'));
      } else if (operation === 'ed25519') {
        const pair = ed25519.keygen();
        const signature = ed25519.sign(data, pair.secretKey);
        output.push(add('Algorithm', 'Ed25519 (EdDSA)', 'meta'));
        output.push(add('Public key (hex)', cryptoBytesHex(pair.publicKey), 'success'));
        output.push(add('Private key (hex, demo only)', cryptoBytesHex(pair.secretKey), 'secret'));
        output.push(add('Signature (hex)', cryptoBytesHex(signature), 'value'));
        output.push(add('Verification', ed25519.verify(signature, data, pair.publicKey) ? 'VALID — signature verified' : 'INVALID', 'success'));
      } else if (operation === 'ecdh') {
        const alice = await subtle.generateKey({ name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveBits']);
        const bob = await subtle.generateKey({ name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveBits']);
        const [aliceSecret, bobSecret] = await Promise.all([
          subtle.deriveBits({ name: 'ECDH', public: bob.publicKey }, alice.privateKey, 256),
          subtle.deriveBits({ name: 'ECDH', public: alice.publicKey }, bob.privateKey, 256),
        ]);
        output.push(add('Algorithm', 'ECDH · P-256 · 256-bit shared secret', 'meta'));
        output.push(add('Alice public key (JWK)', cryptoJwk(await subtle.exportKey('jwk', alice.publicKey)), 'success'));
        output.push(add('Bob public key (JWK)', cryptoJwk(await subtle.exportKey('jwk', bob.publicKey)), 'success'));
        output.push(add('Alice private key (JWK, demo only)', cryptoJwk(await subtle.exportKey('jwk', alice.privateKey)), 'secret'));
        output.push(add('Bob private key (JWK, demo only)', cryptoJwk(await subtle.exportKey('jwk', bob.privateKey)), 'secret'));
        output.push(add('Alice shared secret (hex)', cryptoHex(aliceSecret), 'value'));
        output.push(add('Bob shared secret (hex)', cryptoHex(bobSecret), 'value'));
        output.push(add('Agreement', cryptoBytesHex(aliceSecret) === cryptoBytesHex(bobSecret) ? 'MATCH — both parties derived the same secret' : 'MISMATCH', 'success'));
      } else if (operation === 'mlkem') {
        const pair = await mlkem.generateKey({ name: 'ML-KEM-768' }, true, ['encapsulateBits', 'decapsulateBits']);
        const encapsulated = await mlkem.encapsulateBits({ name: 'ML-KEM-768' }, pair.publicKey);
        const recovered = await mlkem.decapsulateBits({ name: 'ML-KEM-768' }, pair.privateKey, encapsulated.ciphertext);
        output.push(add('Algorithm', 'ML-KEM-768 · post-quantum key encapsulation', 'meta'));
        output.push(add('Public key (Base64)', cryptoB64(await mlkem.exportKey('raw-public', pair.publicKey)), 'success'));
        output.push(add('Private key seed (hex, demo only)', cryptoHex(await mlkem.exportKey('raw-seed', pair.privateKey)), 'secret'));
        output.push(add('Encapsulation ciphertext (Base64)', cryptoB64(encapsulated.ciphertext), 'value'));
        output.push(add('Encapsulated shared secret (hex)', cryptoHex(encapsulated.sharedKey), 'value'));
        output.push(add('Decapsulated shared secret (hex)', cryptoHex(recovered), 'value'));
        output.push(add('Agreement', cryptoBytesHex(encapsulated.sharedKey) === cryptoBytesHex(recovered) ? 'MATCH — encapsulation and decapsulation agree' : 'MISMATCH', 'success'));
        output.push(add('Caution', 'mlkem-wasm is a beta cryptography package; this is an educational demonstration, not a production protocol.', 'warning'));
      }
      setResults(output);
    } catch (e) {
      setError(e?.message || String(e));
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="lab crypto-workbench">
      <ModeTabs mode={mode} navigate={navigate} />

      <div className="crypto-section-tabs" role="tablist" aria-label="Crypto sections">
        <button
          type="button"
          onClick={() => setTab('fundamentals')}
          aria-selected={tab === 'fundamentals'}
          className={`lab-toggle-btn ${tab === 'fundamentals' ? 'is-active' : ''}`}
        >
          Fundamentals
        </button>
        <button
          type="button"
          onClick={() => setTab('advanced')}
          aria-selected={tab === 'advanced'}
          className={`lab-toggle-btn ${tab === 'advanced' ? 'is-active' : ''}`}
        >
          Advanced
        </button>
      </div>

      <div className="crypto-panel">
        <div>
          <label className="crypto-label" htmlFor="crypto-operation">Operation</label>
          <select
            id="crypto-operation"
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="crypto-field"
          >
            {options.map(([id, title]) => <option key={id} value={id}>{title}</option>)}
          </select>
        </div>

        <div>
          <label className="crypto-label" htmlFor="crypto-message">Message / plaintext</label>
          <textarea
            id="crypto-message"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="crypto-field"
            style={{ resize: 'vertical' }}
          />
        </div>

        <div className="crypto-actions">
          <button className="lab-run-btn" type="button" disabled={running} onClick={runCrypto}>
            {running ? 'Running…' : 'Run operation'}
          </button>
          <button
            className="lab-clear-btn"
            type="button"
            onClick={() => { setResults([]); setError(''); }}
            aria-label="Clear crypto output"
          >
            <IconClear />
          </button>
          <span className="crypto-hint">Local libraries · no runtime CDN requests</span>
        </div>

        <div className="crypto-hint">
          Learning sandbox only. Generated private and symmetric keys are displayed for inspection. Never paste real secrets or reuse these demo keys in production.
        </div>
      </div>

      <div className="crypto-panel">
        <div className="crypto-panel-head">
          <strong>Output inspector</strong>
          <span>{lastOperation}</span>
        </div>

        {error && <div className="crypto-error" role="alert">{error}</div>}
        {!error && results.length === 0 && (
          <div className="crypto-empty">Choose an operation and tap Run operation to inspect the results.</div>
        )}

        <div className="crypto-results">
          {results.map((item, index) => (
            <div key={`${item.label}-${index}`} className="crypto-result">
              <div className={`crypto-result-label tone-${item.tone}`}>{item.label}</div>
              <pre className="crypto-result-value">{item.value}</pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
/* Output lab — JS, TS, SQL, Python, HTTP, Testing, DSA          */
/* ============================================================ */

function OutputLab({ mode, meta, navigate, loadId }) {
  const isSql = mode === 'sql';
  const isTs = mode === 'typescript';
  const isPy = mode === 'python';
  const isHttp = mode === 'http';
  const isTesting = mode === 'testing';
  const isDsa = mode === 'dsa';
  const usesBlob = isTs || isPy;

  const initial = useMemo(() => initialStateFor(mode, meta, loadId), [mode, meta, loadId]);
  const [code, setCode] = useState(initial.code);
  const [saveId, setSaveId] = useState(initial.saveId);

  const [view, setView] = useState('code');
  const [kbOpen, setKbOpen] = useState(false);
  const [running, setRunning] = useState(false);
  const [engineReady, setEngineReady] = useState(!isSql && !isPy);
  const [engineError, setEngineError] = useState(null);
  const [truncated, setTruncated] = useState(false);

  const [entries, setEntries] = useState([]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [runKey, setRunKey] = useState(0);
  const [runnerDoc, setRunnerDoc] = useState('');

  const [savePrompt, setSavePrompt] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [historyList, setHistoryList] = useState(() => getLabHistory(`mode:${mode}`));
  const [showHistory, setShowHistory] = useState(false);

  const taRef = useRef(null);
  const linesRef = useRef(null);
  const outputRef = useRef(null);

  useDraftPersistence({ mode, code, saveId, threeState: false });

  useEffect(() => {
    const t = setTimeout(() => {
      const entry = pushLabHistory({ mode, code: String(code) });
      if (entry) setHistoryList(getLabHistory(`mode:${mode}`));
    }, 2000);
    return () => clearTimeout(t);
  }, [code, mode]);

  const syncLines = () => {
    if (taRef.current && linesRef.current) linesRef.current.scrollTop = taRef.current.scrollTop;
  };
  useEffect(() => { syncLines(); }, [code, view]);

  useEffect(() => {
    if (isSql) return;
    let receivedReady = false;
    return attachLabListener((msg) => {
      if (msg.kind === 'console') {
        setEntries((prev) => {
          if (prev.length >= MAX_OUTPUT_ENTRIES) { setTruncated(true); return prev; }
          return [...prev, {
            id: Math.random().toString(36).slice(2, 8),
            level: msg.level,
            values: msg.args.map((a) => safeSerialize(a)),
          }];
        });
      } else if (msg.kind === 'error') {
        if (isPy && !receivedReady) setEngineError(msg.message || 'Python runtime failed to initialize');
        setEntries((prev) => {
          if (prev.length >= MAX_OUTPUT_ENTRIES) return prev;
          return [...prev, {
            id: Math.random().toString(36).slice(2, 8),
            level: 'error',
            values: [{ t: 'error', v: msg.message, stack: msg.stack }],
          }];
        });
        setError({ message: msg.message, line: msg.line, stack: msg.stack });
      } else if (msg.kind === 'ready') {
        receivedReady = true;
        setEngineReady(true);
        setEngineError(null);
      } else if (msg.kind === 'done') {
        setRunning(false);
      }
    });
  }, [isSql, isPy]);

  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [entries, results]);

  const runJs = () => {
    setError(null);
    setEntries([]);
    setTruncated(false);
    setRunning(true);
    setView('output');
    setRunKey((k) => k + 1);
  };

  const runTs = () => {
    setError(null);
    setEntries([]);
    setTruncated(false);
    setEngineReady(false);
    setEngineError(null);
    setRunning(true);
    setView('output');
    setRunnerDoc(buildTsRunner(code));
    setRunKey((k) => k + 1);
  };

  const runPy = () => {
    setError(null);
    setEntries([]);
    setTruncated(false);
    setEngineReady(false);
    setEngineError(null);
    setRunning(true);
    setView('output');
    setRunnerDoc(buildPyRunner(code));
    setRunKey((k) => k + 1);
  };

  const runSql = async () => {
    setError(null);
    setResults([]);
    setRunning(true);
    setView('output');
    try {
      const { PGlite } = await import('@electric-sql/pglite');
      const db = new PGlite();
      await db.waitReady;
      setEngineReady(true);

      const statements = code
        .replace(/--[^\n]*/g, '')
        .split(/;\s*(?=(?:[^'"]*['"][^'"]*['"])*[^'"]*$)/)
        .map((s) => s.trim())
        .filter(Boolean);

      const out = [];
      for (const stmt of statements) {
        const res = await db.exec(stmt);
        for (const r of res) {
          out.push({
            id: Math.random().toString(36).slice(2, 8),
            sql: stmt,
            rows: r.rows || [],
            fields: r.fields || [],
            affected: r.affectedRows,
          });
        }
      }
      setResults(out);
      await db.close();
    } catch (err) {
      setError({
        message: err && err.message ? err.message : String(err),
        stack: err && err.stack ? String(err.stack) : null,
      });
    } finally {
      setRunning(false);
    }
  };

  const run = () => {
    if (isSql) return runSql();
    if (isTs) return runTs();
    if (isPy) return runPy();
    return runJs();
  };

  const clearOutput = () => {
    setEntries([]);
    setResults([]);
    setError(null);
    setTruncated(false);
  };

  const doUndo = () => { taRef.current?.focus(); document.execCommand('undo'); };
  const doRedo = () => { taRef.current?.focus(); document.execCommand('redo'); };

  const commitSave = () => {
    const name = saveName.trim() || 'Untitled';
    const save = addLabSave({ name, mode, code });
    setSaveId(save.id);
    setSavePrompt(false);
    setSaveName('');
  };

  const doReset = () => {
    if (!window.confirm('Reset to starter code? Your current draft will be lost.')) return;
    setCode(STARTERS[mode]);
    setSaveId(null);
  };

  const applyKey = (k) => insertKey(k, taRef, code, setCode, setKbOpen);
  const showOutput = view === 'output';

  useEffect(() => {
    if (!isSql) return;
    let cancelled = false;
    (async () => {
      try {
        await import('@electric-sql/pglite');
        if (!cancelled) setEngineReady(true);
      } catch (e) {
        if (!cancelled) setEngineError(e?.message || 'Failed to load Postgres');
      }
    })();
    return () => { cancelled = true; };
  }, [isSql]);

  const jsSrc = useMemo(() => {
    if (isSql || usesBlob) return '';
    return buildJsRunner(code, { mode });
  }, [isSql, usesBlob, code, runKey]);

  return (
    <>
      <div className="lab">
        <div className="lab-top">
          <ModeTabs mode={mode} navigate={navigate} />
          <div className="lab-toggle" role="tablist">
            <button className={`lab-toggle-btn ${view === 'code' ? 'is-active' : ''}`} onClick={() => setView('code')} type="button">Code</button>
            <button className={`lab-toggle-btn ${view === 'output' ? 'is-active' : ''}`} onClick={() => setView('output')} type="button">
              {isSql ? 'Results' : isTesting ? 'Test results' : isHttp ? 'Network log' : 'Output'}
            </button>
          </div>
        </div>

        {isHttp && <div className="lab-engine-status">Offline router · /api/users · /api/users/1 · /api/not-found</div>}
        {isTesting && <div className="lab-engine-status">Built-in assertions · async tests supported · no package install</div>}
        {isDsa && <div className="lab-engine-status">Algorithm workspace · instrument operations to reason about complexity</div>}
        {isSql && !engineReady && !engineError && <div className="lab-engine-status">Loading Postgres…</div>}
        {isSql && engineError && <div className="lab-engine-status lab-engine-error">Failed to load Postgres: {engineError}</div>}
        {isPy && showOutput && !engineReady && !engineError && <div className="lab-engine-status">Loading Python…</div>}

        <div className="lab-pane">
          {!showOutput && (
            <>
              <div className="lab-editor">
                <LineNumbers text={code} linesRef={linesRef} />
                <textarea
                  ref={taRef}
                  className="lab-textarea"
                  value={code}
                  spellCheck={false}
                  autoCorrect="off"
                  autoCapitalize="off"
                  autoComplete="off"
                  inputMode="none"
                  aria-label={`${meta.label} editor`}
                  onChange={(e) => setCode(e.target.value)}
                  onScroll={syncLines}
                  onFocus={() => setKbOpen(true)}
                />
              </div>
              <HistoryCard onUndo={doUndo} onRedo={doRedo} onHistory={() => setShowHistory(true)} />
            </>
          )}

          {showOutput && (
            <div className="lab-output" ref={outputRef}>
              {isSql ? (
                <SqlResults results={results} error={error} />
              ) : (
                <>
                  {entries.length === 0 && !error && !usesBlob && (
                    <p className="lab-output-empty">{running ? 'Running…' : 'Tap Run to see output.'}</p>
                  )}
                  {entries.map((e) => (
                    <div key={e.id} className={`lab-entry is-${e.level}`}>
                      <span className="lab-entry-dot" aria-hidden="true" />
                      <span className="lab-entry-body"><ConsoleInspector nodes={e.values} /></span>
                    </div>
                  ))}
                  {truncated && (
                    <p className="lab-output-empty">Output capped at {MAX_OUTPUT_ENTRIES} entries. Clear to continue.</p>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        <div className="lab-run-bar">
          <button className="lab-run-btn" onClick={run} disabled={running || (isSql && !engineReady)} type="button">
            <IconPlay />
            <span>{running ? 'Running…' : 'Run'}</span>
          </button>
          <button className="lab-clear-btn" onClick={clearOutput} type="button" aria-label="Clear output"><IconClear /></button>
        </div>
      </div>

      {!isSql && !usesBlob && running && (
        <iframe
          key={runKey}
          title="JS runner"
          sandbox="allow-scripts"
          srcDoc={jsSrc}
          style={{ display: 'none' }}
        />
      )}

      {usesBlob && runnerDoc && (
        <iframe
          key={runKey}
          title={`${mode} runner`}
          sandbox="allow-scripts allow-same-origin"
          srcDoc={runnerDoc}
          style={{ display: 'none' }}
        />
      )}

      {kbOpen && !showOutput && <CodeKeyboard onKey={applyKey} />}

      {!kbOpen && (
        <div className="select-bar" style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 76px)' }}>
          <button className="select-btn" onClick={doReset} type="button">Reset</button>
          <button className="select-btn primary" onClick={() => setSavePrompt(true)} type="button">Save</button>
        </div>
      )}

      {error && !showOutput && !isSql && <ErrorOverlay error={error} onClose={() => setError(null)} />}

      <SavePrompt open={savePrompt} name={saveName} setName={setSaveName} onClose={() => setSavePrompt(false)} onSave={commitSave} />
      <HistoryPanel
        open={showHistory}
        list={historyList}
        onClose={() => setShowHistory(false)}
        onRestore={(h) => { setCode(h.code); setShowHistory(false); }}
        onDelete={(id) => { deleteLabHistory(id); setHistoryList(getLabHistory(`mode:${mode}`)); }}
      />
    </>
  );
}

/* ============================================================ */
/* SQL results                                                  */
/* ============================================================ */

function SqlResults({ results, error }) {
  if (error) {
    return <div className="sql-error"><div className="lab-error-msg">{error.message}</div></div>;
  }
  if (results.length === 0) {
    return <p className="lab-output-empty">Tap Run to execute your queries.</p>;
  }
  return (
    <div className="sql-results">
      {results.map((r, i) => (
        <div key={r.id || i} className="sql-result">
          {r.rows && r.rows.length > 0 && r.fields && r.fields.length > 0 ? (
            <div className="sql-table-wrap">
              <table className="sql-table">
                <thead>
                  <tr>{r.fields.map((f, fi) => <th key={fi}>{f.name}</th>)}</tr>
                </thead>
                <tbody>
                  {r.rows.map((row, ri) => (
                    <tr key={ri}>
                      {r.fields.map((f, fi) => (
                        <td key={fi}>
                          {row[f.name] === null
                            ? <span className="ci-null">null</span>
                            : String(row[f.name])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="sql-note">
              {r.affected != null ? `Rows affected: ${r.affected}` : 'Command complete'}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ============================================================ */
/* insertKey                                                    */
/* ============================================================ */

function insertKey(key, taRef, code, setCode, setKbOpen) {
  const el = taRef.current;
  if (!el) return;

  const start = el.selectionStart ?? code.length;
  const end = el.selectionEnd ?? code.length;
  const before = code.slice(0, start);
  const after = code.slice(end);

  if (key === 'Done') { setKbOpen(false); el.blur(); return; }

  let insert = key;
  let cursorOffset = key.length;

  if (key === 'Enter') {
    const lineStart = before.lastIndexOf('\n') + 1;
    const line = before.slice(lineStart);
    const indent = (line.match(/^\s*/) || [''])[0];
    insert = '\n' + indent;
    cursorOffset = insert.length;
  } else if (key === 'Tab') {
    insert = '  ';
    cursorOffset = 2;
  } else if (key === 'Backspace') {
    if (start === end && start > 0) {
      setCode(before.slice(0, -1) + after);
      requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = start - 1; });
    } else if (start !== end) {
      setCode(before + after);
      requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = start; });
    }
    return;
  } else if (key === '←') {
    const next = Math.max(0, start - 1);
    requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = next; });
    return;
  } else if (key === '→') {
    const next = Math.min(code.length, start + 1);
    requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = next; });
    return;
  } else if (key === 'Space') {
    insert = ' ';
    cursorOffset = 1;
  }

  setCode(before + insert + after);
  requestAnimationFrame(() => {
    el.focus();
    el.selectionStart = el.selectionEnd = start + cursorOffset;
  });
}

/* ============================================================ */
/* Save prompt                                                  */
/* ============================================================ */

function SavePrompt({ open, name, setName, onClose, onSave }) {
  if (!open) return null;
  return (
    <div className="backdrop" onClick={onClose}>
      <div className="square-modal" onClick={(e) => e.stopPropagation()}>
        <header className="square-modal-head">
          <span>Save snippet</span>
          <button className="icon-btn" onClick={onClose} aria-label="Close" type="button"><IconClose /></button>
        </header>
        <div className="square-modal-body">
          <div className="lab-name-form">
            <input
              className="lab-name-input"
              placeholder="Name this snippet"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
            <div className="lab-name-actions">
              <button className="select-btn" onClick={onClose} type="button">Cancel</button>
              <button className="select-btn primary" onClick={onSave} type="button">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
/* History panel                                                */
/* ============================================================ */

function HistoryPanel({ open, list, onClose, onRestore, onDelete }) {
  if (!open) return null;
  return (
    <div className="backdrop" onClick={onClose}>
      <div className="square-modal" onClick={(e) => e.stopPropagation()}>
        <header className="square-modal-head">
          <span>History</span>
          <button className="icon-btn" onClick={onClose} aria-label="Close" type="button"><IconClose /></button>
        </header>
        <div className="square-modal-body">
          {list.length === 0 ? (
            <p className="muted" style={{ padding: '20px 12px' }}>No history yet — versions appear as you edit.</p>
          ) : (
            list.map((h) => (
              <div key={h.id} className="highlight-row">
                <div className="lab-list-meta" style={{ marginTop: 0 }}>
                  <span>{formatDate(h.createdAt)}</span>
                  <div className="lab-list-actions">
                    <button className="lab-action" onClick={() => onRestore(h)} type="button">Restore</button>
                    <button className="lab-action danger" onClick={() => onDelete(h.id)} type="button">Delete</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
/* SAVED                                                        */
/* ============================================================ */

export function LabSaved() {
  const navigate = useNavigate();
  const [saves, setSaves] = useState(() => getLabSaves());

  const grouped = useMemo(() => {
    const map = {};
    for (const s of saves) {
      if (!map[s.mode]) map[s.mode] = [];
      map[s.mode].push(s);
    }
    return map;
  }, [saves]);

  const refresh = () => setSaves(getLabSaves());

  const isEmpty = saves.length === 0;

  return (
    <div className="lab-page">
      <div className="lab-page-head">
        <h1 className="lab-page-title">Saved</h1>
        <span className="lab-page-sub">{saves.length} snippet{saves.length === 1 ? '' : 's'}</span>
      </div>

      {isEmpty && (
        <div className="empty-state">
          <span className="empty-state-text">Nothing saved yet. Open a lab mode and tap Save.</span>
        </div>
      )}

      {Object.entries(grouped).map(([modeId, list]) => {
        const meta = MODE_MAP[modeId];
        return (
          <section key={modeId} className="section">
            <h2 className="section-title">{meta ? meta.label : modeId}</h2>
            <div className="lab-list">
              {list.map((save) => (
                <div key={save.id} className="lab-list-row">
                  <div className="lab-list-title">{save.name}</div>
                  <div className="lab-list-preview">{String(save.code).slice(0, 80).replace(/\n/g, ' ')}…</div>
                  <div className="lab-list-meta">
                    <span>{formatDate(save.updatedAt)}</span>
                    <div className="lab-list-actions">
                      <button className="lab-action" onClick={() => navigate(`/lab/${save.mode}?load=${save.id}`)} type="button">Open</button>
                      <button className="lab-action" onClick={() => { const next = window.prompt('New name:', save.name); if (next && next.trim()) { renameLabSave(save.id, next.trim()); refresh(); } }} type="button">Rename</button>
                      <button className="lab-action" onClick={() => { addLabSave({ name: save.name + ' (copy)', mode: save.mode, code: save.code }); refresh(); }} type="button">Duplicate</button>
                      <button className="lab-action danger" onClick={() => { if (window.confirm('Delete this saved snippet?')) { deleteLabSave(save.id); refresh(); } }} type="button">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

/* ============================================================ */
/* HISTORY page                                                 */
/* ============================================================ */

export function LabHistory() {
  const [history, setHistory] = useState(() => getLabHistory());
  const refresh = () => setHistory(getLabHistory());

  const grouped = useMemo(() => {
    const map = {};
    for (const h of history) {
      const mode = h.mode || 'unknown';
      if (!map[mode]) map[mode] = [];
      map[mode].push(h);
    }
    return map;
  }, [history]);

  const isEmpty = history.length === 0;

  return (
    <div className="lab-page">
      <div className="lab-page-head">
        <h1 className="lab-page-title">History</h1>
        <span className="lab-page-sub">{history.length} version{history.length === 1 ? '' : 's'}</span>
      </div>

      {isEmpty && (
        <div className="empty-state">
          <span className="empty-state-text">Nothing here yet. Versions appear as you edit in the lab.</span>
        </div>
      )}

      {Object.entries(grouped).map(([modeId, list]) => {
        const meta = MODE_MAP[modeId];
        return (
          <section key={modeId} className="section">
            <h2 className="section-title">{meta ? meta.label : modeId}</h2>
            <div className="lab-list">
              {list.map((h) => (
                <div key={h.id} className="lab-list-row">
                  <div className="lab-list-preview">{String(h.code).slice(0, 80).replace(/\n/g, ' ')}…</div>
                  <div className="lab-list-meta">
                    <span>{formatDate(h.createdAt)}</span>
                    <div className="lab-list-actions">
                      <button className="lab-action danger" onClick={() => { deleteLabHistory(h.id); refresh(); }} type="button">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}