import { useEffect, useMemo, useRef, useState } from 'react';
import {
  useParams,
  useNavigate,
  useSearchParams,
  Link,
} from 'react-router-dom';
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
  getShowHighlights,
} from '../lib/storage.js';

/* ------------------------------------------------------------ */
/* Helpers                                                      */
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

/* Strip code chrome (lang label, copy button) from textContent */
function blockText(el) {
  const clone = el.cloneNode(true);
  clone.querySelectorAll('.code-head, .code-copy, .code-lang')
    .forEach((n) => n.remove());
  return clone.textContent.trim();
}

/* ------------------------------------------------------------ */
/* Copy button                                                  */
/* ------------------------------------------------------------ */

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
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
/* Markdown                                                     */
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
        return (
          <a href={href} target="_blank" rel="noreferrer" {...props}>
            {children}
          </a>
        );
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
  const [searchParams, setSearchParams] = useSearchParams();

  const selectMode = searchParams.get('select') === '1';

  const book = getBook(bookId);
  const lesson = getLesson(bookId, lessonId);
  const { prev, next } = getLessonNeighbours(bookId, lessonId);

  const [read, setRead] = useState(() => isLessonRead(bookId, lessonId));
  const [highlights, setHighlights] = useState(() =>
    getHighlights({ bookId, lessonId })
  );
  const [showHighlights, setShowHighlightsState] = useState(() =>
    getShowHighlights()
  );
  const [selectedBlocks, setSelectedBlocks] = useState(() => new Set());

  const bodyRef = useRef(null);
  const restoredRef = useRef(false);

  const components = useMemo(buildMarkdownComponents, []);

  /* reset on lesson change */
  useEffect(() => {
    setRead(isLessonRead(bookId, lessonId));
    setHighlights(getHighlights({ bookId, lessonId }));
    setSelectedBlocks(new Set());
    restoredRef.current = false;
  }, [bookId, lessonId]);

  /* listen for showHighlights changes from settings */
  useEffect(() => {
    const onChange = () => setShowHighlightsState(getShowHighlights());
    window.addEventListener('dsl:show-highlights-changed', onChange);
    return () => window.removeEventListener('dsl:show-highlights-changed', onChange);
  }, []);

  /* save last-read + push recent */
  useEffect(() => {
    if (!lesson) return;
    saveLastRead({ bookId, lessonId, scrollY: 0 });
    pushRecentRead({ bookId, lessonId });
  }, [bookId, lessonId, lesson]);

  /* restore scroll once */
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

  /* persist scroll */
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

  /* auto mark-as-read */
  useEffect(() => {
    if (!lesson || read || selectMode) return;
    let t = null;
    const onScroll = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const nearBottom =
          window.innerHeight + window.scrollY >=
          document.body.scrollHeight - 120;
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
  }, [bookId, lessonId, lesson, read, selectMode]);

  /* keyboard prev / next (disabled in select mode) */
  useEffect(() => {
    if (selectMode) return;
    const onKey = (e) => {
      const tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' && next) navigate(`/book/${bookId}/${next.id}`);
      if (e.key === 'ArrowLeft' && prev) navigate(`/book/${bookId}/${prev.id}`);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [bookId, prev, next, navigate, selectMode]);

  /* ---------- render highlight classes on blocks ---------- */
  useEffect(() => {
    if (!bodyRef.current) return;
    const children = Array.from(bodyRef.current.children);
    const textSet = new Set(highlights.map((h) => h.text.trim()));
    children.forEach((child) => {
      const match =
        !selectMode &&
        showHighlights &&
        textSet.has(blockText(child));
      child.classList.toggle('lesson-block-highlighted', match);
    });
  }, [lesson, highlights, showHighlights, selectMode]);

  /* ---------- select mode: block taps ---------- */
  useEffect(() => {
    if (!selectMode || !bodyRef.current) return;
    const body = bodyRef.current;

    const handler = (e) => {
      // prevent link navigation in select mode
      if (e.target.closest && e.target.closest('a')) {
        e.preventDefault();
      }
      // find the direct child of .lesson-body
      let el = e.target;
      while (el && el.parentElement !== body) el = el.parentElement;
      if (!el || el.parentElement !== body) return;

      const idx = Array.from(body.children).indexOf(el);
      if (idx === -1) return;

      setSelectedBlocks((prev) => {
        const nextSet = new Set(prev);
        if (nextSet.has(idx)) nextSet.delete(idx);
        else nextSet.add(idx);
        return nextSet;
      });
    };

    body.addEventListener('click', handler);
    return () => body.removeEventListener('click', handler);
  }, [selectMode, lesson]);

  /* ---------- select mode: apply selected class ---------- */
  useEffect(() => {
    if (!bodyRef.current) return;
    const children = Array.from(bodyRef.current.children);
    children.forEach((child, i) => {
      child.classList.toggle('lesson-block-selected', selectedBlocks.has(i));
    });
  }, [selectedBlocks, lesson]);

  /* ---------- exit select mode when leaving the page ---------- */
  useEffect(() => {
    return () => {
      // nothing to clean up; query param clears on navigate
    };
  }, []);

  const exitSelect = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('select');
    setSearchParams(nextParams, { replace: true });
  };

  const saveSelection = () => {
    if (!bodyRef.current) return;
    const children = Array.from(bodyRef.current.children);
    selectedBlocks.forEach((idx) => {
      const el = children[idx];
      if (!el) return;
      const text = blockText(el);
      if (text) addHighlight({ bookId, lessonId, text });
    });
    setHighlights(getHighlights({ bookId, lessonId }));
    setSelectedBlocks(new Set());
    exitSelect();
  };

  const cancelSelection = () => {
    setSelectedBlocks(new Set());
    exitSelect();
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
    <article className={`lesson ${selectMode ? 'is-selecting' : ''}`}>
      {!selectMode && <ProgressBar compute={totalHeight} />}

      {selectMode && (
        <div className="select-banner">
          Tap sections to highlight. Tap again to remove.
        </div>
      )}

      <div className="lesson-meta">
        <span className="muted small">~{readTime} min read</span>
        {!selectMode && (
          <button
            className={`mark-btn ${read ? 'is-read' : ''}`}
            onClick={() => {
              if (read) { unmarkLessonRead(bookId, lessonId); setRead(false); }
              else { markLessonRead(bookId, lessonId); setRead(true); }
            }}
          >
            {read ? 'Read' : 'Mark as read'}
          </button>
        )}
      </div>

      <div className="lesson-body" ref={bodyRef}>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {lesson.body}
        </ReactMarkdown>
      </div>

      {selectMode && (
        <div className="select-bar">
          <span className="select-count">
            {selectedBlocks.size} selected
          </span>
          <button className="select-btn" onClick={cancelSelection} type="button">
            Cancel
          </button>
          <button
            className="select-btn primary"
            onClick={saveSelection}
            disabled={selectedBlocks.size === 0}
            type="button"
          >
            Save
          </button>
        </div>
      )}

      {!selectMode && (
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
      )}
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