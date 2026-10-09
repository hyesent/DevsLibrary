/* ================================================================== */
/*DevsLibrary — SEARCH                                                     */
/* MiniSearch, fully offline. Three scopes:                             */
/*   - books      (home)                                                */
/*   - lessons    (inside a book)                                       */
/*   - text       (inside a lesson)                                     */
/* ================================================================== */

import MiniSearch from 'minisearch';
import {
  getAllBooks,
  getBook,
  getLesson,
  lessonPlainText,
} from './content.js';

/* ------------------------ build-time state ------------------------ */

let booksIndex = null;
const lessonIndexes = {};   // bookId -> MiniSearch
const textIndexes = {};     // "bookId/lessonId" -> MiniSearch

/* --------------------------- book index --------------------------- */

function ensureBooksIndex() {
  if (booksIndex) return booksIndex;

  booksIndex = new MiniSearch({
    fields: ['title', 'tagline', 'summary', 'topics'],
    storeFields: ['id', 'title', 'tagline'],
    searchOptions: {
      boost: { title: 4, tagline: 2, topics: 2 },
      fuzzy: 0.2,
      prefix: true,
    },
  });

  booksIndex.addAll(
    getAllBooks().map((b) => ({
      id: b.id,
      title: b.title,
      tagline: b.tagline || '',
      summary: b.summary || '',
      topics: (b.topics || []).join(' '),
    }))
  );

  return booksIndex;
}

/* -------------------------- lesson index -------------------------- */

function ensureLessonIndex(bookId) {
  if (lessonIndexes[bookId]) return lessonIndexes[bookId];

  const book = getBook(bookId);
  if (!book) return null;

  const idx = new MiniSearch({
    fields: ['title'],
    storeFields: ['id', 'title', 'order'],
    searchOptions: {
      fuzzy: 0.2,
      prefix: true,
    },
  });

  idx.addAll(
    book.lessons.map((l) => ({
      id: l.id,
      title: l.title,
      order: l.order,
    }))
  );

  lessonIndexes[bookId] = idx;
  return idx;
}

/* --------------------------- text index --------------------------- */
/* Chunked by paragraph/heading so results point at a real snippet.   */

function chunkLesson(body) {
  // split on blank lines, keep it simple
  return body
    .split(/\n{2,}/)
    .map((chunk, i) => {
      const clean = chunk
        .replace(/^#{1,6}\s+/gm, '')
        .replace(/```[\s\S]*?```/g, '')
        .replace(/`([^`]*)`/g, '$1')
        .replace(/[*_>#\-\[\]()!]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      return { id: String(i), text: clean, raw: chunk };
    })
    .filter((c) => c.text.length > 0);
}

function ensureTextIndex(bookId, lessonId) {
  const key = `${bookId}/${lessonId}`;
  if (textIndexes[key]) return textIndexes[key];

  const lesson = getLesson(bookId, lessonId);
  if (!lesson) return null;

  const chunks = chunkLesson(lesson.body);

  const idx = new MiniSearch({
    fields: ['text'],
    storeFields: ['id', 'text'],
    searchOptions: {
      fuzzy: 0.1,
      prefix: true,
    },
  });

  idx.addAll(
    chunks.map((c) => ({ id: c.id, text: c.text }))
  );

  textIndexes[key] = idx;
  return idx;
}

/* ------------------------------ API ------------------------------- */

export function searchBooks(query) {
  if (!query || !query.trim()) return [];
  return ensureBooksIndex()
    .search(query)
    .slice(0, 30)
    .map((r) => ({
      bookId: r.id,
      title: r.title,
      tagline: r.tagline,
    }));
}

export function searchLessons(bookId, query) {
  if (!query || !query.trim()) return [];
  const idx = ensureLessonIndex(bookId);
  if (!idx) return [];
  return idx
    .search(query)
    .slice(0, 30)
    .map((r) => ({
      bookId,
      lessonId: r.id,
      title: r.title,
    }));
}

export function searchText(bookId, lessonId, query) {
  if (!query || !query.trim()) return [];
  const idx = ensureTextIndex(bookId, lessonId);
  if (!idx) return [];
  return idx
    .search(query)
    .slice(0, 30)
    .map((r) => ({
      bookId,
      lessonId,
      chunkId: r.id,
      snippet: r.text,
    }));
}

/* ------------------------- global text search ---------------------- */
/* Used later if you want search across everything — cheap to add.     */

let globalTextIndex = null;

export function searchAllText(query) {
  if (!query || !query.trim()) return [];
  if (!globalTextIndex) {
    globalTextIndex = new MiniSearch({
      fields: ['text'],
      storeFields: ['bookId', 'lessonId', 'lessonTitle', 'text'],
      searchOptions: { fuzzy: 0.1, prefix: true },
    });

    const docs = [];
    for (const book of getAllBooks()) {
      for (const lesson of book.lessons) {
        const plain = lessonPlainText(lesson);
        if (!plain) continue;
        docs.push({
          id: `${book.id}/${lesson.id}`,
          bookId: book.id,
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          text: plain,
        });
      }
    }
    globalTextIndex.addAll(docs);
  }

  return globalTextIndex.search(query).slice(0, 30);
}