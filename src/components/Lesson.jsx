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
      if (inline) {
        return <code className="inline-code">{children}</code>;
      }
      return (
        <pre className="code-block">
          {lang && <span className="code-lang">{lang[1]}</span>}
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
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

function flatten(children) {
  if (Array.isArray(children)) return children.map(flatten).join('');
  if (typeof children === 'string') return children;
  if (children && children.props && children.props.children) {
    return flatten(children.props.children);
  }
  return '';
}

/* ------------------------------------------------------------ */
/* LESSON                                                       */
/* ------------------------------------------------------------ */

export default function Lesson() {
  const { bookId, lessonId } = useParams();
  const navigate = useNavigate();

  const book = getBook(bookId);
  const lesson = getLesson(bookId, lessonId);
  const { prev, next } = getLessonNeighbours(bookId, lessonId);

  const [read, setRead] = useState(() => isLessonRead(bookId, lessonId));
  const restoredRef = useRef(false);

  const components = useMemo(buildMarkdownComponents, []);

  /* ---------- on lesson change: reset state ---------- */
  useEffect(() => {
    setRead(isLessonRead(bookId, lessonId));
    restoredRef.current = false;
  }, [bookId, lessonId]);

  /* ---------- save last-read + push recent ---------- */
  useEffect(() => {
    if (!lesson) return;
    saveLastRead({ bookId, lessonId, scrollY: 0 });
    pushRecentRead({ bookId, lessonId });
  }, [bookId, lessonId, lesson]);

  /* ---------- restore scroll position once ---------- */
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

  /* ---------- throttle: save scroll position ---------- */
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
  }, [bookId, lessonId, lesson, read]);

  /* ---------- keyboard prev / next ---------- */
  useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' && next) navigate(`/book/${bookId}/${next.id}`);
      if (e.key === 'ArrowLeft'  && prev) navigate(`/book/${bookId}/${prev.id}`);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [bookId, prev, next, navigate]);

  /* ---------- not found ---------- */
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
      {/* ------------------------- PROGRESS ----------------------- */}
      <ProgressBar compute={totalHeight} />

      {/* ------------------------- META --------------------------- */}
      <div className="lesson-meta">
        <span className="muted small">~{readTime} min read</span>
        <button
          className={`mark-btn ${read ? 'is-read' : ''}`}
          onClick={() => {
            if (read) { unmarkLessonRead(bookId, lessonId); setRead(false); }
            else      { markLessonRead(bookId, lessonId);   setRead(true);  }
          }}
        >
          {read ? 'Read' : 'Mark as read'}
        </button>
      </div>

      {/* ------------------------- BODY --------------------------- */}
      <div className="lesson-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {lesson.body}
        </ReactMarkdown>
      </div>

      {/* ------------------------- PREV / NEXT -------------------- */}
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
/* PROGRESS BAR — thin line at top of lesson                    */
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