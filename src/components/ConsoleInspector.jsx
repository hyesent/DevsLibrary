import { useState } from 'react';

/* Simple renderer for the serialized values produced by safeSerialize */

function Value({ node, depth = 0 }) {
  const [open, setOpen] = useState(depth < 1);

  if (!node || typeof node !== 'object') {
    return <span className="ci-null">undefined</span>;
  }

  switch (node.t) {
    case 'null':
      return <span className="ci-null">null</span>;
    case 'undefined':
      return <span className="ci-null">undefined</span>;
    case 'string':
      return (
        <span className="ci-string">
          "{node.v}"{node.truncated ? '…' : ''}
        </span>
      );
    case 'number':
      return <span className="ci-number">{node.v}</span>;
    case 'boolean':
      return <span className="ci-boolean">{String(node.v)}</span>;
    case 'bigint':
      return <span className="ci-number">{node.v}n</span>;
    case 'symbol':
      return <span className="ci-symbol">{node.v}</span>;
    case 'function':
      return <span className="ci-function">ƒ {node.v}()</span>;
    case 'circular':
      return <span className="ci-null">[Circular]</span>;
    case 'truncated':
      return <span className="ci-null">…</span>;
    case 'date':
      return <span className="ci-string">{node.v}</span>;
    case 'regexp':
      return <span className="ci-symbol">{node.v}</span>;
    case 'error':
      return (
        <span className="ci-error">
          {node.v}
          {node.stack && <span className="ci-stack"> {node.stack.split('\n')[0]}</span>}
        </span>
      );
    case 'dom':
      return (
        <span className="ci-dom">
          &lt;{node.v}
          {node.attrs.map(([k, v], i) => (
            <span key={i}> {k}="{v}"</span>
          ))}
          &gt;
        </span>
      );

    case 'array': {
      const items = node.v;
      return (
        <span className="ci-coll">
          <button
            className="ci-toggle"
            onClick={() => setOpen((o) => !o)}
            type="button"
            aria-label={open ? 'Collapse' : 'Expand'}
          >
            {open ? '▾' : '▸'}
          </button>
          <span className="ci-coll-open">
            [
            {open ? (
              <>
                {items.map((it, i) => (
                  <span key={i}>
                    <Value node={it} depth={depth + 1} />
                    {i < items.length - 1 ? ', ' : ''}
                  </span>
                ))}
                {node.truncated && <span className="ci-null">… {node.length - items.length} more</span>}
              </>
            ) : (
              <span className="ci-null">
                {node.length} item{node.length === 1 ? '' : 's'}
              </span>
            )}
            ]
          </span>
        </span>
      );
    }

    case 'object': {
      const entries = node.v;
      return (
        <span className="ci-coll">
          <button
            className="ci-toggle"
            onClick={() => setOpen((o) => !o)}
            type="button"
            aria-label={open ? 'Collapse' : 'Expand'}
          >
            {open ? '▾' : '▸'}
          </button>
          {node.ctor && <span className="ci-ctor">{node.ctor} </span>}
          <span className="ci-coll-open">
            {'{'}
            {open ? (
              <>
                {entries.map(([k, v], i) => (
                  <span key={i}>
                    {' '}
                    <span className="ci-key">{k}</span>: <Value node={v} depth={depth + 1} />
                    {i < entries.length - 1 ? ',' : ''}
                  </span>
                ))}
                {node.truncated && (
                  <span className="ci-null"> … {node.keys - entries.length} more</span>
                )}
              </>
            ) : (
              <span className="ci-null"> {node.keys} key{node.keys === 1 ? '' : 's'}</span>
            )}
            {'}'}
          </span>
        </span>
      );
    }

    case 'map': {
      return (
        <span className="ci-coll">
          <button className="ci-toggle" onClick={() => setOpen((o) => !o)} type="button">
            {open ? '▾' : '▸'}
          </button>
          <span className="ci-ctor">Map({node.size})</span>{' '}
          {open ? (
            <span className="ci-coll-open">
              {'{'}
              {node.v.map(([k, v], i) => (
                <span key={i}>
                  {' '}
                  <Value node={k} depth={depth + 1} /> =&gt;{' '}
                  <Value node={v} depth={depth + 1} />
                  {i < node.v.length - 1 ? ',' : ''}
                </span>
              ))}
              {'}'}
            </span>
          ) : (
            <span className="ci-coll-open">{'{…}'}</span>
          )}
        </span>
      );
    }

    case 'set': {
      return (
        <span className="ci-coll">
          <button className="ci-toggle" onClick={() => setOpen((o) => !o)} type="button">
            {open ? '▾' : '▸'}
          </button>
          <span className="ci-ctor">Set({node.size})</span>{' '}
          {open ? (
            <span className="ci-coll-open">
              {'{'}
              {node.v.map((v, i) => (
                <span key={i}>
                  {' '}
                  <Value node={v} depth={depth + 1} />
                  {i < node.v.length - 1 ? ',' : ''}
                </span>
              ))}
              {'}'}
            </span>
          ) : (
            <span className="ci-coll-open">{'{…}'}</span>
          )}
        </span>
      );
    }

    default:
      return <span className="ci-null">{String(node.v)}</span>;
  }
}

export default function ConsoleInspector({ nodes }) {
  return (
    <span className="ci-root">
      {nodes.map((n, i) => (
        <span key={i}>
          <Value node={n} />
          {i < nodes.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}