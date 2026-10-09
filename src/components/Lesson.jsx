import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  getBook,
  getLesson,
  getLessonNeighbours,
  estimateReadTime,
} from '../lib/content.js';
import {
  getLastRead,
  saveLastRead,
  updateLastReadScroll,
  markLessonRead,
  unmarkLessonRead,
  isLessonRead,
  pushRecentRead,
  getHighlights,
  addHighlight,
} from '../lib/storage.js';

/* ------------------------------------------------------------ */
/* Anchor IDs must match what the drawer uses                   */
/* ------------------------------------------------------------ */
function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^\w]+/g, '-')
    .replace(/^-|-$/g, '');
}

function flatten(children) {
  if (Array.isArray(children)) return children.map(flatten).join('');
  if (typeof children === 'string') return children;
  if (children && children.props && children.props.children) {
    return flatten(children.props.children);
  }
  return '';
}

/* ------------------------------------------------------------ */
/* Copy button — small icon that flips to a check on success    */
/* ------------------------------------------------------------ */
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // fallback for insecure contexts
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch {}
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <button
      className={`code-copy ${copied ? 'is-copied' : ''}`}
      onClick={onCopy}
      aria-label={copied ? 'Copied' : 'Copy code'}
      type="button"
    >
      {copied ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2.4"
             strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 12 10 18 20 6" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="1.8"
             strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="12" height="12" rx="2" />
          <path d="M5 15V5a2 2 0 0 1 2-2h10" />
        </svg>
      )}
    </button>
  );
}

/* ------------------------------------------------------------ */
/* Markdown components                                          */
/* ------------------------------------------------------------ */
function buildMarkdownComponents() {
  const h = (level) => ({ children }) => {
    const text = flatten(children);
    const id = slugify(text);
    const Tag = `h${level}`;
    return <Tag id={id}>{children}</Tag>;
  };

  return {
    h1: h(1),
    h2: h(2),
    h3: h(3),
    h4: h(4),

    code({ inline, className, children, ...props }) {
      const lang = /language-(\w+)/.exec(className || '');
      const raw = String(children).replace(/\n$/, '');
      if (inline) {
        return <code className="inline-code">{children}</code>;
      }
      return (
        <div className="code-wrap">
          <div className="code-head">
            {lang ? <span className="code-lang">{lang[1]}</span> : <span />}
            <CopyButton text={raw} />
          </div>
          <pre className="code-block">
            <code className={className} {...props}>{children}</code>
          </pre>
        </div>
      );
    },

    a({ href, children, ...props }) {
      const external = /^https?:\/\//.test(href || '');
      if (external) {
        return <a href={href} target="_blank" rel="noreferrer" {...props}>{children}</a>;
      }
      return <Link to={href} {...props}>{children}</Link>;
    },

    table({ children }) {
      return (
        <div className="table-wrap">
          <table>{children}</table>
        </div>
      );
    },
  };
}

/* ------------------------------------------------------------ */
/* Lesson                                                       */
/* ------------------------------------------------------------ */

export default function Lesson() {
  const { bookId, lessonId } = useParams();
  const navigate = useNavigate();

  const book = getBook(bookId);
  const lesson = getLesson(bookId, lessonId);
  const { prev, next } = getLessonNeighbours(bookId, lessonId);

  const [read, setRead] = useState(() => isLessonRead(bookId, lessonId));
  const [highlights, setHighlights] = useState(() => getHighlights({ bookId, lessonId }));
  const [selection, setSelection] = useState(null); // { text, x, y }
  const bodyRef = useRef(null);
  const restoredRef = useRef(false);

  const components = useMemo(buildMarkdownComponents, []);

  /* ---------- reset state on lesson change ---------- */
  useEffect(() => {
    setRead(isLessonRead(bookId, lessonId));
    setHighlights(getHighlights({ bookId, lessonId }));
    restoredRef.current = false;
  }, [bookId, lessonId]);

  /* ---------- save last-read + push recent ---------- */
  useEffect(() => {
    if (!lesson) return;
    saveLastRead({ bookId, lessonId, scrollY: 0 });
    pushRecentRead({ bookId, lessonId });
  }, [bookId, lessonId, lesson]);

  /* ---------- restore scroll once ---------- */
  useEffect(() => {
    if (!lesson || restoredRef.current) return;
    const last = getLastRead();
    if (last && last.bookId === bookId && last.lessonId === lessonId && last.scrollY > 0) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: last.scrollY, behavior: 'instant' });
        restoredRef.current = true;
      });
    } else {
      window.scrollTo(0, 0);
      restoredRef.current = true;
    }
  }, [bookId, lessonId, lesson]);

  /* ---------- persist scroll ---------- */
  useEffect(() => {
    if (!lesson) return;
    let t = null;
    const onScroll = () => {
      clearTimeout(t);
      t = setTimeout(() => updateLastReadScroll(window.scrollY), 300);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
    };
  }, [bookId, lessonId, lesson]);

  /* ---------- auto mark-as-read near bottom ---------- */
  useEffect(() => {
    if (!lesson || read) return;
    let t = null;
    const onScroll = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const nearBottom =
          window.innerHeight + window.scrollY >= document.body.scrollHeight - 120;
        if (nearBottom) {
          markLessonRead(bookId, lessonId);
          setRead(true);
        }
      }, 200);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
    };
  }, [bookId, lessonId, lesson, read]);

  /* ---------- keyboard prev / next ---------- */
  useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' && next) navigate(`/book/${bookId}/${next.id}`);
      if (e.key === 'ArrowLeft' && prev) navigate(`/book/${bookId}/${prev.id}`);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [bookId, prev, next, navigate]);

  /* ---------- text selection → floating pill ---------- */
  useEffect(() => {
    if (!lesson) return;

    const onMouseUp = () => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed) return setSelection(null);

      const text = sel.toString().trim();
      if (text.length < 3) return setSelection(null);

      // must be inside the lesson body
      const anchor = sel.anchorNode;
      if (!anchor || !bodyRef.current || !bodyRef.current.contains(anchor)) {
        return setSelection(null);
      }

      const range = sel.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelection({
        text,
        x: rect.left + rect.width / 2,
        y: rect.top,
      });
    };

    const onDown = (e) => {
      // tap outside pill closes it
      if (e.target.closest && e.target.closest('.selection-pill')) return;
      setSelection(null);
    };

    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchend', onMouseUp);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown, { passive: true });
    return () => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchend', onMouseUp);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
    };
  }, [lesson]);

  const saveHighlight = () => {
    if (!selection) return;
    addHighlight({ bookId, lessonId, text: selection.text });
    setHighlights(getHighlights({ bookId, lessonId }));
    setSelection(null);
    window.getSelection()?.removeAllRanges();
  };

  if (!book || !lesson) {
    return (
      <div className="page">
        <p className="muted">Lesson not found.</p>
      </div>
    );
  }

  const readTime = estimateReadTime(lesson.body);
  const totalHeight = () => document.body.scrollHeight - window.innerHeight;

  return (
    <article className="lesson">
      <ProgressBar compute={totalHeight} />

      <div className="lesson-meta">
        <span className="muted small">~{readTime} min read</span>
        <button
          className={`mark-btn ${read ? 'is-read' : ''}`}
          onClick={() => {
            if (read) { unmarkLessonRead(bookId, lessonId); setRead(false); }
            else { markLessonRead(bookId, lessonId); setRead(true); }
          }}
        >
          {read ? 'Read' : 'Mark as read'}
        </button>
      </div>

      <div className="lesson-body" ref={bodyRef}>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {lesson.body}
        </ReactMarkdown>
      </div>

      {/* floating selection pill */}
      {selection && (
        <button
          className="selection-pill"
          style={{ left: selection.x, top: selection.y }}
          onClick={saveHighlight}
          type="button"
        >
          Highlight
        </button>
      )}

      <nav className="prevnext">
        {prev ? (
          <Link to={`/book/${bookId}/${prev.id}`} className="pn-btn">
            <span className="pn-label">Previous</span>
            <span className="pn-title">{prev.title}</span>
          </Link>
        ) : <span />}

        {next ? (
          <Link to={`/book/${bookId}/${next.id}`} className="pn-btn right">
            <span className="pn-label">Next</span>
            <span className="pn-title">{next.title}</span>
          </Link>
        ) : <span />}
      </nav>
    </article>
  );
}

/* ------------------------------------------------------------ */
/* Progress bar                                                 */
/* ------------------------------------------------------------ */

function ProgressBar({ compute }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = compute();
      if (h <= 0) return setPct(1);
      const p = Math.min(1, Math.max(0, window.scrollY / h));
      setPct(p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [compute]);

  return (
    <div className="progress-bar" aria-hidden="true">
      <div className="progress-fill" style={{ width: `${pct * 100}%` }} />
    </div>
  );
    }
