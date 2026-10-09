/* ================================================================== */
/* DevsLibrary — CONTENT                                                    */
/* Loads every .md file at build time via Vite's import.meta.glob.      */
/* Parses frontmatter. Builds the book/lesson tree. Exposes helpers.    */
/* ================================================================== */

/* ----------------------- frontmatter parser ----------------------- */

function parseFrontmatter(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) return { data: {}, body: raw };

  const data = {};
  match[1].split(/\r?\n/).forEach((line) => {
    const idx = line.indexOf(':');
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
    if (!key) return;
    data[key] = value;
  });

  return { data, body: raw.slice(match[0].length) };
}

/* ------------------------ load all content ------------------------ */

const mdModules = import.meta.glob('/content/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const metaModules = import.meta.glob('/content/*/_meta.json', {
  eager: true,
  import: 'default',
});

/* ------------------------ build the tree -------------------------- */

function fileNameToOrder(name) {
  const m = /^(\d+)/.exec(name);
  return m ? parseInt(m[1], 10) : 9999;
}

function fileNameToId(path) {
  const file = path.split('/').pop().replace(/\.md$/, '');
  return file.replace(/^\d+-/, '');
}

function build() {
  const books = {};   // bookId -> book object

  /* 1. seed books from _meta.json */
  for (const [path, meta] of Object.entries(metaModules)) {
    const bookId = path.split('/').slice(-2, -1)[0];
    books[bookId] = {
      id: bookId,
      title: meta.title || bookId,
      tagline: meta.tagline || '',
      summary: meta.summary || '',
      topics: meta.topics || [],
      icon: meta.icon || 'book',
      order: meta.order ?? 999,
      lessons: [],
    };
  }

  /* 2. fill lessons */
  for (const [path, raw] of Object.entries(mdModules)) {
    const parts = path.split('/');          // ['', 'content', 'html', '01-intro.md']
    if (parts.length < 4) continue;
    const bookId = parts[2];
    const fileName = parts[3];
    if (!fileName.endsWith('.md')) continue;

    if (!books[bookId]) {
      books[bookId] = {
        id: bookId,
        title: bookId,
        tagline: '',
        summary: '',
        topics: [],
        icon: 'book',
        order: 999,
        lessons: [],
      };
    }

    const { data, body } = parseFrontmatter(raw);
    const lessonId = fileNameToId(fileName);

    books[bookId].lessons.push({
      id: lessonId,
      bookId,
      title: data.title || lessonId,
      order: data.order ?? fileNameToOrder(fileName),
      body,
      fileName,
    });
  }

  /* 3. sort everything */
  Object.values(books).forEach((book) => {
    book.lessons.sort((a, b) => a.order - b.order);
  });

  return Object.values(books).sort((a, b) => a.order - b.order);
}

const BOOKS = build();

/* --------------------------- read time ---------------------------- */

export function estimateReadTime(body) {
  const words = body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/[#>*_\-\[\]()!]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/* ------------------------------ API ------------------------------- */

export function getAllBooks() {
  return BOOKS;
}

export function getBook(bookId) {
  return BOOKS.find((b) => b.id === bookId) || null;
}

export function getLesson(bookId, lessonId) {
  const book = getBook(bookId);
  if (!book) return null;
  return book.lessons.find((l) => l.id === lessonId) || null;
}

export function getLessonNeighbours(bookId, lessonId) {
  const book = getBook(bookId);
  if (!book) return { prev: null, next: null };
  const idx = book.lessons.findIndex((l) => l.id === lessonId);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? book.lessons[idx - 1] : null,
    next: idx < book.lessons.length - 1 ? book.lessons[idx + 1] : null,
  };
}

export function getFirstLesson(bookId) {
  const book = getBook(bookId);
  return book && book.lessons[0] ? book.lessons[0] : null;
}

/* plain-text version of a lesson body — used by search */
export function lessonPlainText(lesson) {
  return lesson.body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/[#>*_\-\[\]()!]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}