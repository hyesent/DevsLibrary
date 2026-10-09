import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  getAllBooks,
  getBook,
  getFirstLesson,
} from '../lib/content.js';
import {
  getLastRead,
  getRecentRead,
  getItemsByType,
  countReadInBook,
  isLessonRead,
} from '../lib/storage.js';

/* ------------------------------------------------------------ */
/* APP NAME                                                     */
/* ------------------------------------------------------------ */
const APP_NAME = 'DevsLibrary';

/* ------------------------------------------------------------ */
/* SMALL SVG ICONS                                              */
/* ------------------------------------------------------------ */
const S = {
  width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', strokeWidth: 1.8,
  strokeLinecap: 'round', strokeLinejoin: 'round',
};

const IconBook     = () => <svg {...S}><path d="M4 4h11a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3z"/><path d="M4 4v13"/></svg>;
const IconGlossary = () => <svg {...S}><path d="M4 5h7a3 3 0 0 1 3 3v11"/><path d="M20 5h-7a3 3 0 0 0-3 3v11"/></svg>;
const IconArrow    = () => <svg {...S}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/></svg>;

/* ------------------------------------------------------------ */
/* LOGO MARK — italic + subtle cut-through                      */
/* ------------------------------------------------------------ */
function Logo({ size = 'md' }) {
  return (
    <span className={`logo-mark logo-${size}`}>
      {APP_NAME}
    </span>
  );
}

/* ============================================================= */
/* HOME                                                          */
/* ============================================================= */

export function Home() {
  const books = getAllBooks();
  const recent = getRecentRead();

  return (
    <div className="page">
      {/* ------------------- LOGO CARD ------------------- */}
      <header className="logo-card">
        <Logo size="lg" />
      </header>

      {/* ------------------- BOOKS (primary) ------------------- */}
      <section className="section books-section">
        <h2 className="section-title">Books</h2>
        <div className="book-grid">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
        {books.length === 0 && (
          <p className="muted pad">
            No books yet. Add .md files under <code>content/</code>.
          </p>
        )}
      </section>

      {/* ------------------- RECENTLY READ (empty state) ------------------- */}
      <section className="section recent-section">
        <h2 className="section-title">Recently read</h2>
        {recent.length === 0 ? (
          <div className="empty-state">
            <span className="empty-state-text">
              Nothing read yet. Pick a book above to start.
            </span>
          </div>
        ) : (
          <div className="recent-list">
            {recent.map((r, i) => {
              const book = getBook(r.bookId);
              const lesson = book?.lessons.find((l) => l.id === r.lessonId);
              if (!book || !lesson) return null;
              return (
                <Link
                  key={i}
                  to={`/book/${r.bookId}/${r.lessonId}`}
                  className="recent-row"
                >
                  <span className="recent-book">{book.title}</span>
                  <span className="recent-lesson">{lesson.title}</span>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* ------------------- GLOSSARY (tertiary) ------------------- */}
      <section className="section glossary-section">
        <Link to="/glossary" className="shortcut">
          <span className="shortcut-icon"><IconGlossary /></span>
          <span className="shortcut-label">Glossary</span>
          <span className="shortcut-arrow"><IconArrow /></span>
        </Link>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------ */
/* Book card                                                    */
/* ------------------------------------------------------------ */

function BookCard({ book }) {
  const { count, total } = countReadInBook(book.id, book.lessons.length);
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;

  return (
    <Link to={`/book/${book.id}`} className="book-card">
      <div className="book-card-icon"><IconBook /></div>
      <h3 className="book-card-title">{book.title}</h3>
      {book.tagline && (
        <p className="book-card-tagline">{book.tagline}</p>
      )}
      <div className="book-card-foot">
        <span className="muted small">
          {total} lesson{total === 1 ? '' : 's'}
        </span>
        {count > 0 && (
          <span className="muted small">{pct}%</span>
        )}
      </div>
      {count > 0 && (
        <div className="book-card-progress">
          <div style={{ width: `${pct}%` }} />
        </div>
      )}
    </Link>
  );
}

/* ============================================================= */
/* BOOK                                                          */
/* ============================================================= */

export function Book() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const book = getBook(bookId);

  if (!book) {
    return (
      <div className="page">
        <p className="muted">Book not found.</p>
      </div>
    );
  }

  const first = getFirstLesson(book.id);
  const lastRead = getLastRead();
  const isSameBook = lastRead && lastRead.bookId === book.id;
  const contLesson = isSameBook
    ? book.lessons.find((l) => l.id === lastRead.lessonId) || null
    : null;

  const cta = contLesson
    ? { to: `/book/${book.id}/${contLesson.id}`, label: 'Continue reading' }
    : first
      ? { to: `/book/${book.id}/${first.id}`, label: 'Start reading' }
      : null;

  const { count, total } = countReadInBook(book.id, book.lessons.length);
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;

  return (
    <div className="page">
      {/* ------------------- COVER ------------------- */}
      <section className="book-cover">
        <h1 className="book-title">{book.title}</h1>
        {book.summary && <p className="book-summary">{book.summary}</p>}

        {book.topics && book.topics.length > 0 && (
          <div className="topics">
            <h4 className="topics-label">Topics covered</h4>
            <ul className="topics-list">
              {book.topics.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>
        )}

        <div className="book-progress-line">
          <span className="muted small">{count} / {total} lessons read</span>
          <span className="muted small">{pct}%</span>
        </div>
        <div className="book-progress-bar">
          <div style={{ width: `${pct}%` }} />
        </div>

        {cta && (
          <button className="cta" onClick={() => navigate(cta.to)}>
            {cta.label}
          </button>
        )}
      </section>

      {/* ------------------- LESSON LIST ------------------- */}
      <section className="section">
        <h2 className="section-title">Lessons</h2>
        <ol className="lesson-list">
          {book.lessons.map((l, i) => {
            const read = isLessonRead(book.id, l.id);
            return (
              <li key={l.id} className="lesson-row">
                <Link to={`/book/${book.id}/${l.id}`} className="lesson-link">
                  <span className="lesson-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="lesson-name">{l.title}</span>
                  {read && <span className="lesson-read-dot" aria-label="Read" />}
                </Link>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}

/* ============================================================= */
/* LISTS — Favourites / Bookmarks / Notes                        */
/* ============================================================= */

export function Lists({ type }) {
  const navigate = useNavigate();
  const items = getItemsByType(type);

  const bookItems = items.filter((i) => i.scope === 'book');
  const lessonItems = items.filter((i) => i.scope === 'lesson');

  const lessonGroups = {};
  for (const item of lessonItems) {
    const key = `${item.bookId}/${item.lessonId}`;
    if (!lessonGroups[key]) {
      lessonGroups[key] = { bookId: item.bookId, lessonId: item.lessonId, items: [] };
    }
    lessonGroups[key].items.push(item);
  }

  const isEmpty = items.length === 0;

  return (
    <div className="page">
      {isEmpty && <p className="muted pad">Nothing here yet.</p>}

      {bookItems.length > 0 && (
        <section className="section">
          <h2 className="section-title">Books</h2>
          <div className="list-group">
            {bookItems.map((item) => {
              const book = getBook(item.bookId);
              if (!book) return null;
              return (
                <button
                  key={item.id}
                  className="list-row"
                  onClick={() => navigate(`/book/${book.id}`)}
                >
                  <span className="list-row-title">{book.title}</span>
                  {item.text && (
                    <span className="list-row-note">{item.text}</span>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {Object.values(lessonGroups).length > 0 && (
        <section className="section">
          <h2 className="section-title">Lessons</h2>
          <div className="list-group">
            {Object.values(lessonGroups).map((g) => {
              const book = getBook(g.bookId);
              const lesson = book?.lessons.find((l) => l.id === g.lessonId);
              if (!book || !lesson) return null;
              const noteCount = g.items.filter((i) => i.type === 'note').length;
              return (
                <button
                  key={`${g.bookId}/${g.lessonId}`}
                  className="list-row"
                  onClick={() => navigate(`/book/${g.bookId}/${g.lessonId}`)}
                >
                  <span className="list-row-title">{lesson.title}</span>
                  <span className="list-row-book muted small">{book.title}</span>
                  {g.items[0]?.text && (
                    <span className="list-row-note">
                      “{g.items[0].text}”
                      {noteCount > 1 && (
                        <span className="muted small"> ({noteCount} notes)</span>
                      )}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

/* ============================================================= */
/* GLOSSARY                                                      */
/* ============================================================= */

export function Glossary() {
  const terms = [
    { term: 'Element', definition: 'A complete HTML unit — opening tag, content, closing tag.' },
    { term: 'DOM', definition: 'Document Object Model — the tree the browser builds from HTML.' },
    { term: 'Selector', definition: 'A CSS pattern used to target elements for styling.' },
    { term: 'Closure', definition: 'A function that remembers the scope it was created in.' },
    { term: 'Hook', definition: 'A React function that lets you use state and lifecycle in components.' },
  ];

  const sorted = [...terms].sort((a, b) =>
    a.term.toLowerCase().localeCompare(b.term.toLowerCase())
  );

  return (
    <div className="page">
      <section className="section">
        <div className="glossary">
          {sorted.map((t, i) => (
            <div key={i} className="glossary-row">
              <h4 className="glossary-term">{t.term}</h4>
              <p className="glossary-def">{t.definition}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}