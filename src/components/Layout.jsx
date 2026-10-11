import { useState, useEffect, useRef } from 'react';
import {
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { getBook, getLesson } from '../lib/content.js';
import { searchBooks, searchLessons, searchText } from '../lib/search.js';
import {
  getTheme, setTheme, THEMES,
  getFontSize, setFontSize,
  getShowHighlights, setShowHighlights,
  getLabSettings, setLabSettings,
  hasItem, addNote, addBookmark, removeBookmark,
  addFavourite, removeFavourite, getItemsFor,
} from '../lib/storage.js';

const APP_NAME = 'DevsLibrary';

/* ============================================================ */
/* ICONS                                                        */
/* ============================================================ */

const S = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none',
            stroke: 'currentColor', strokeWidth: 1.8,
            strokeLinecap: 'round', strokeLinejoin: 'round' };

const IconMenu     = () => <svg {...S}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
const IconHome     = () => <svg {...S}><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5"/></svg>;
const IconSearch   = () => <svg {...S}><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg>;
const IconSettings = () => <svg {...S}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>;
const IconDots     = () => <svg {...S}><circle cx="12" cy="5" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="12" cy="19" r="1.4"/></svg>;
const IconClose    = () => <svg {...S}><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>;
const IconSort     = () => <svg {...S}><polyline points="8 9 12 5 16 9"/><polyline points="16 15 12 19 8 15"/></svg>;
const IconCheck    = () => <svg {...S}><polyline points="4 12 10 18 20 6"/></svg>;
const IconBack     = () => <svg {...S}><polyline points="15 18 9 12 15 6"/></svg>;
const IconFile     = () => <svg {...S}><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="14 3 14 9 20 9"/></svg>;
const IconHistory  = () => <svg {...S}><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>;

/* ============================================================ */
/* ROUTE HELPERS                                                */
/* ============================================================ */

function parseRoute(pathname) {
  const p = pathname.split('/').filter(Boolean);
  if (p.length === 0) return { kind: 'home' };
  if (p[0] === 'book' && p.length === 2) return { kind: 'book', bookId: p[1] };
  if (p[0] === 'book' && p.length === 3) return { kind: 'lesson', bookId: p[1], lessonId: p[2] };
  if (p[0] === 'favourites') return { kind: 'list', type: 'favourite' };
  if (p[0] === 'bookmarks') return { kind: 'list', type: 'bookmark' };
  if (p[0] === 'notes') return { kind: 'list', type: 'note' };
  if (p[0] === 'glossary') return { kind: 'glossary' };
  if (p[0] === 'lab') {
    if (p.length === 1) return { kind: 'lab-home' };
    if (p[1] === 'saved') return { kind: 'lab-saved' };
    if (p[1] === 'history') return { kind: 'lab-history' };
    return { kind: 'lab-mode', mode: p[1] };
  }
  return { kind: 'other' };
}

function getHeaderContent(route) {
  if (route.kind === 'book') {
    const book = getBook(route.bookId);
    return book ? book.title.toLowerCase() : '';
  }
  if (route.kind === 'lesson') {
    const book = getBook(route.bookId);
    const lesson = getLesson(route.bookId, route.lessonId);
    if (!book || !lesson) return '';
    return `${book.title.toLowerCase()}:${lesson.title.toLowerCase()}`;
  }
  if (route.kind === 'list') {
    const map = { favourite: 'favourites', bookmark: 'bookmarks', note: 'notes' };
    return map[route.type] || route.type;
  }
  if (route.kind === 'glossary') return 'glossary';
  if (route.kind === 'lab-home') return 'devs lab';
  if (route.kind === 'lab-saved') return 'devs lab: saved';
  if (route.kind === 'lab-history') return 'devs lab: history';
  if (route.kind === 'lab-mode') return `devs lab: ${route.mode}`;
  return '';
}

function extractHeadings(body) {
  const out = [];
  const re = /^(#{2,3})\s+(.+)$/gm;
  let m;
  while ((m = re.exec(body)) !== null) {
    const text = m[2].trim();
    out.push({
      level: m[1].length,
      text,
      id: text.toLowerCase().replace(/[^\w]+/g, '-').replace(/^-|-$/g, ''),
    });
  }
  return out;
}

/* ============================================================ */
/* LAYOUT                                                       */
/* ============================================================ */

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const route = parseRoute(location.pathname);

  const isHome = route.kind === 'home';
  const isLesson = route.kind === 'lesson';
  const isLab = route.kind.startsWith('lab-');
  const isSelecting = isLesson && searchParams.get('select') === '1';

  const [focusMode, setFocusMode] = useState(false);

  useEffect(() => {
    setFocusMode(false);
    if (!isLesson || isSelecting) return;
    const onScroll = () => {
      if (window.scrollY > 80) setFocusMode(true);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isLesson, location.pathname, isSelecting]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [dotsOpen, setDotsOpen] = useState(false);
  const [highlightsOpen, setHighlightsOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setSettingsOpen(false);
    setDotsOpen(false);
    setHighlightsOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setSearchOpen(false);
        setSettingsOpen(false);
        setDotsOpen(false);
        setHighlightsOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const showNav = !focusMode && !isSelecting;
  const showHome = !isHome;
  const showDots = !isHome && !isLab;

  const headerPath = getHeaderContent(route);
  const showHeader = !isHome && headerPath.length > 0 && !isSelecting;

  let lessonCounter = null;
  if (isLesson) {
    const book = getBook(route.bookId);
    if (book) {
      const idx = book.lessons.findIndex((l) => l.id === route.lessonId);
      if (idx !== -1) lessonCounter = `${idx + 1}/${book.lessons.length}`;
    }
  }

  const isActive = (name) => {
    if (name === 'home') return isHome;
    if (name === 'search') return searchOpen;
    if (name === 'settings') return settingsOpen;
    if (name === 'dots') return dotsOpen;
    if (name === 'menu') return menuOpen;
    if (name === 'saved') return route.kind === 'lab-saved';
    if (name === 'history') return route.kind === 'lab-history';
    return false;
  };

  const enterSelectMode = () => {
    setDotsOpen(false);
    navigate(`${location.pathname}?select=1`);
  };

  return (
    <>
      {showHeader && (
        <header className={`top-header ${focusMode ? 'top-header-hidden' : ''}`}>
          <span className="logo-mark logo-sm">{APP_NAME}</span>
          <span className="top-header-path">{headerPath}</span>
        </header>
      )}

      {showNav && !isLab && (
        <nav className="nav" aria-label="Primary">
          <button
            className={`nav-btn ${isActive('menu') ? 'active' : ''}`}
            onClick={() => setMenuOpen(true)}
            aria-label="Menu"
          >
            <IconMenu />
          </button>

          {showHome && (
            <button
              className={`nav-btn ${isActive('home') ? 'active' : ''}`}
              onClick={() => navigate('/')}
              aria-label="Home"
            >
              <IconHome />
            </button>
          )}

          <button
            className={`nav-btn ${isActive('search') ? 'active' : ''}`}
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
          >
            <IconSearch />
          </button>

          <button
            className={`nav-btn ${isActive('settings') ? 'active' : ''}`}
            onClick={() => setSettingsOpen(true)}
            aria-label="Settings"
          >
            <IconSettings />
          </button>

          {showDots && (
            <button
              className={`nav-btn ${isActive('dots') ? 'active' : ''}`}
              onClick={() => setDotsOpen(true)}
              aria-label="More"
            >
              <IconDots />
            </button>
          )}
        </nav>
      )}

      {showNav && isLab && (
        <nav className="nav nav-lab" aria-label="Lab navigation">
          <button
            className="nav-btn"
            onClick={() => navigate(-1)}
            aria-label="Back"
          >
            <IconBack />
          </button>
          <button
            className="nav-btn"
            onClick={() => navigate('/')}
            aria-label="Home"
          >
            <IconHome />
          </button>
          <button
            className={`nav-btn ${isActive('saved') ? 'active' : ''}`}
            onClick={() => navigate('/lab/saved')}
            aria-label="Saved"
          >
            <IconFile />
          </button>
          <button
            className={`nav-btn ${isActive('history') ? 'active' : ''}`}
            onClick={() => navigate('/lab/history')}
            aria-label="History"
          >
            <IconHistory />
          </button>
          <button
            className={`nav-btn ${isActive('dots') ? 'active' : ''}`}
            onClick={() => setDotsOpen(true)}
            aria-label="More"
          >
            <IconDots />
          </button>
        </nav>
      )}

      {focusMode && (
        <div className="focus-bar">
          {lessonCounter && (
            <span className="focus-counter">{lessonCounter}</span>
          )}
          <button
            className="focus-exit"
            onClick={() => {
              setFocusMode(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label="Exit focus mode"
          >
            <IconClose />
          </button>
        </div>
      )}

      <main className={`main ${showHeader ? 'has-top-header' : ''} ${isLab ? 'is-lab' : ''}`}>
        {children}
      </main>

      {menuOpen && (
        isHome
          ? <SquareModal onClose={() => setMenuOpen(false)} title="Menu">
              <button className="menu-row primary" onClick={() => { setMenuOpen(false); navigate('/lab'); }}>Devs Lab</button>
              <button className="menu-row" onClick={() => { setMenuOpen(false); navigate('/favourites'); }}>Favourites</button>
              <button className="menu-row" onClick={() => { setMenuOpen(false); navigate('/bookmarks'); }}>Bookmarks</button>
              <button className="menu-row" onClick={() => { setMenuOpen(false); navigate('/notes'); }}>Notes</button>
            </SquareModal>
          : <Drawer onClose={() => setMenuOpen(false)} route={route} />
      )}

      {searchOpen && (
        <SearchModal
          route={route}
          onClose={() => setSearchOpen(false)}
          onNavigate={(to) => { setSearchOpen(false); navigate(to); }}
        />
      )}

      {settingsOpen && <SettingsModal onClose={() => setSettingsOpen(false)} />}

      {dotsOpen && isLab && (
        <SquareModal onClose={() => setDotsOpen(false)} title="Lab tools">
          <button className="menu-row" onClick={() => { setDotsOpen(false); navigate('/lab'); }}>All modes</button>
          <button className="menu-row" onClick={() => { setDotsOpen(false); setSettingsOpen(true); }}>Settings</button>
        </SquareModal>
      )}

      {dotsOpen && !isLab && (
        <ThreeDotsModal
          route={route}
          onClose={() => setDotsOpen(false)}
          onViewNotes={() => { setDotsOpen(false); navigate('/notes'); }}
          onHighlightSection={enterSelectMode}
          onViewHighlights={() => { setDotsOpen(false); setHighlightsOpen(true); }}
        />
      )}

      {highlightsOpen && (
        <HighlightsModal
          bookId={route.bookId}
          lessonId={route.lessonId}
          onClose={() => setHighlightsOpen(false)}
        />
      )}
    </>
  );
}

/* ============================================================ */
/* MODALS                                                       */
/* ============================================================ */

function SquareModal({ title, onClose, children }) {
  return (
    <div className="backdrop" onClick={onClose}>
      <div className="square-modal" onClick={(e) => e.stopPropagation()}>
        <header className="square-modal-head">
          <span>{title}</span>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            <IconClose />
          </button>
        </header>
        <div className="square-modal-body">{children}</div>
      </div>
    </div>
  );
}

function Drawer({ onClose, route }) {
  const navigate = useNavigate();
  let items = [];
  let label = '';

  if (route.kind === 'book') {
    const book = getBook(route.bookId);
    label = book ? book.title : '';
    if (book) {
      items = book.lessons.map((l) => ({
        id: l.id,
        title: l.title,
        to: `/book/${book.id}/${l.id}`,
      }));
    }
  } else if (route.kind === 'lesson') {
    const lesson = getLesson(route.bookId, route.lessonId);
    label = lesson ? lesson.title : '';
    if (lesson) {
      items = extractHeadings(lesson.body).map((h) => ({
        id: h.id,
        title: h.text,
        indent: h.level === 3,
        anchor: h.id,
      }));
    }
  }

  return (
    <div className="backdrop" onClick={onClose}>
      <aside className="drawer" onClick={(e) => e.stopPropagation()}>
        <header className="drawer-head">
          <span>{label}</span>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            <IconClose />
          </button>
        </header>
        <nav className="drawer-body">
          {items.map((item) => (
            <button
              key={item.id}
              className={`drawer-row ${item.indent ? 'indent' : ''}`}
              onClick={() => {
                if (item.to) navigate(item.to);
                else if (item.anchor) {
                  const el = document.getElementById(item.anchor);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                onClose();
              }}
            >
              {item.title}
            </button>
          ))}
          {items.length === 0 && <p className="muted">Nothing here yet.</p>}
        </nav>
      </aside>
    </div>
  );
}

function SearchModal({ route, onClose, onNavigate }) {
  const [query, setQuery] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [scrolling, setScrolling] = useState(false);
  const scrollTimer = useRef(null);

  let results = [];
  let placeholder = '';

  if (route.kind === 'home') {
    placeholder = 'Search books…';
    results = searchBooks(query);
  } else if (route.kind === 'book') {
    placeholder = 'Search lessons…';
    results = searchLessons(route.bookId, query);
  } else if (route.kind === 'lesson') {
    placeholder = 'Search this lesson…';
    results = searchText(route.bookId, route.lessonId, query);
  } else {
    placeholder = 'Search…';
    results = searchBooks(query);
  }

  if (!sortAsc) results = [...results].reverse();

  const onScroll = () => {
    setScrolling(true);
    clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => setScrolling(false), 900);
  };

  const go = (r) => {
    if (route.kind === 'home') onNavigate(`/book/${r.bookId}`);
    else if (route.kind === 'book') onNavigate(`/book/${r.bookId}/${r.lessonId}`);
    else if (route.kind === 'lesson') onNavigate(`/book/${r.bookId}/${r.lessonId}`);
    else onNavigate(`/book/${r.bookId}`);
  };

  return (
    <div className="backdrop" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="icon-btn modal-x"
          onClick={onClose}
          aria-label="Close search"
          type="button"
        >
          <IconClose />
        </button>

        <div className="search-results" onScroll={onScroll}>
          {results.length === 0 && query && <p className="muted pad">No results.</p>}
          {results.map((r, i) => (
            <button key={i} className="search-row" onClick={() => go(r)}>
              <span className="search-row-title">{r.title || r.snippet || r.lessonId}</span>
              {r.bookId && r.lessonId && route.kind === 'lesson' && (
                <span className="muted small">…{r.snippet?.slice(0, 80)}…</span>
              )}
              {route.kind !== 'lesson' && r.tagline && (
                <span className="muted small">{r.tagline}</span>
              )}
            </button>
          ))}
          {scrolling && results.length > 6 && (
            <div className="scrubber" aria-hidden="true">
              <div className="scrubber-thumb" />
            </div>
          )}
        </div>

        <div className="search-pill">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="search-input"
          />
          {query && (
            <>
              <button className="pill-btn" onClick={() => setSortAsc((s) => !s)} aria-label="Sort">
                <IconSort />
              </button>
              <span className="pill-count">{results.length}</span>
            </>
          )}
          <button className="pill-btn" aria-label="Search">
            <IconSearch />
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingsModal({ onClose }) {
  const [theme, setThemeState] = useState(getTheme());
  const [size, setSizeState] = useState(getFontSize());
  const [showHL, setShowHL] = useState(getShowHighlights());
  const [labAutoSave, setLabAutoSave] = useState(() => getLabSettings().saveMode === 'auto');

  const pick = (t) => { setThemeState(t); setTheme(t); };
  const slide = (v) => { setSizeState(v); setFontSize(v); };
  const toggleHL = () => {
    const next = !showHL;
    setShowHL(next);
    setShowHighlights(next);
  };
  const toggleLabAutoSave = () => {
    const next = !labAutoSave;
    setLabAutoSave(next);
    setLabSettings({ saveMode: next ? 'auto' : 'manual' });
    window.dispatchEvent(new CustomEvent('dsl:lab-settings-changed'));
  };

  return (
    <div className="backdrop" onClick={onClose}>
      <div className="settings-blob-wrap" onClick={(e) => e.stopPropagation()}>
        <button
          className="icon-btn settings-x"
          onClick={onClose}
          aria-label="Close settings"
          type="button"
        >
          <IconClose />
        </button>

        <svg className="settings-blob" viewBox="0 0 640 260" preserveAspectRatio="none" aria-hidden="true">
          <path d="M 40 20 Q 320 -10 600 20 Q 640 40 620 90 Q 610 120 620 160 Q 640 210 610 230 Q 500 260 340 250 Q 180 245 60 235 Q 10 225 20 180 Q 30 120 20 80 Q 10 40 40 20 Z" />
        </svg>

        <div className="settings-body">
          <h3 className="settings-title">Settings</h3>

          <div className="theme-circles">
            {THEMES.map((t) => (
              <button
                key={t}
                className={`theme-circle theme-${t} ${theme === t ? 'selected' : ''}`}
                onClick={() => pick(t)}
                aria-label={t}
              >
                {theme === t && <span className="tick"><IconCheck /></span>}
              </button>
            ))}
          </div>

          <div className="font-slider">
            <span className="fs-label">S</span>
            <input
              type="range"
              min="0"
              max="100"
              value={size}
              onChange={(e) => slide(Number(e.target.value))}
              className="fs-range"
            />
            <span className="fs-label">L</span>
          </div>

          <div className="setting-row">
            <span className="setting-label">Show highlights in lessons</span>
            <button
              className={`toggle ${showHL ? 'on' : ''}`}
              onClick={toggleHL}
              aria-pressed={showHL}
              aria-label="Show highlights in lessons"
              type="button"
            >
              <span className="toggle-thumb" />
            </button>
          </div>

          <div className="setting-row">
            <span className="setting-label">Autosave lab snippets</span>
            <button
              className={`toggle ${labAutoSave ? 'on' : ''}`}
              onClick={toggleLabAutoSave}
              aria-pressed={labAutoSave}
              aria-label="Autosave lab snippets"
              type="button"
            >
              <span className="toggle-thumb" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ThreeDotsModal({ route, onClose, onViewNotes, onHighlightSection, onViewHighlights }) {
  const [noteText, setNoteText] = useState('');
  const [writing, setWriting] = useState(false);

  const bookId = route.bookId;
  const lessonId = route.lessonId;
  const scope = lessonId ? 'lesson' : 'book';
  const ref = { scope, bookId, lessonId };

  const bookmarked = hasItem({ type: 'bookmark', ...ref });
  const faved = hasItem({ type: 'favourite', ...ref });
  const notes = getItemsFor({ type: 'note', bookId, lessonId })
    .filter((n) => n.scope === scope);
  const isLesson = !!lessonId;

  return (
    <SquareModal onClose={onClose} title="Options">
      {writing ? (
        <>
          <textarea
            className="note-input"
            placeholder="Write a note…"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            autoFocus
          />
          <button
            className="menu-row primary"
            onClick={() => {
              addNote({ ...ref, text: noteText });
              setNoteText('');
              setWriting(false);
            }}
          >
            Save note
          </button>
          <button className="menu-row" onClick={() => setWriting(false)}>Cancel</button>
        </>
      ) : (
        <>
          <button className="menu-row" onClick={() => setWriting(true)}>Add note</button>
          <button
            className="menu-row"
            onClick={() => {
              if (bookmarked) removeBookmark(ref);
              else addBookmark(ref);
              onClose();
            }}
          >
            {bookmarked ? 'Remove bookmark' : 'Add bookmark'}
          </button>
          <button
            className="menu-row"
            onClick={() => {
              if (faved) removeFavourite(ref);
              else addFavourite(ref);
              onClose();
            }}
          >
            {faved ? 'Remove favourite' : 'Add to favourite'}
          </button>
          <button className="menu-row" onClick={onViewNotes}>
            View notes {notes.length > 0 && `(${notes.length})`}
          </button>
          {isLesson && (
            <>
              <button className="menu-row" onClick={onHighlightSection}>Highlight a section</button>
              <button className="menu-row" onClick={onViewHighlights}>View highlights</button>
            </>
          )}
        </>
      )}
    </SquareModal>
  );
}

function HighlightsModal({ bookId, lessonId, onClose }) {
  const [list] = useState(() => {
    try {
      const raw = localStorage.getItem('devslibrary:highlights');
      const all = raw ? JSON.parse(raw) : [];
      return all.filter((h) => h.bookId === bookId && h.lessonId === lessonId);
    } catch { return []; }
  });

  return (
    <SquareModal onClose={onClose} title="Highlights">
      {list.length === 0 ? (
        <p className="muted" style={{ padding: '20px 14px' }}>
          Nothing highlighted yet. Use ⋮ → Highlight a section.
        </p>
      ) : (
        list.map((h) => (
          <div key={h.id} className="highlight-row">
            <span className="highlight-text">{h.text}</span>
          </div>
        ))
      )}
    </SquareModal>
  );
}