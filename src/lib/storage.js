/* ================================================================== */
/* DevsLibrary — STORAGE                                                    */
/* Everything that touches localStorage lives here.                     */
/* Keys are namespaced `DevsLibrary:*` so we never collide with anything.   */
/* ================================================================== */

const KEYS = {
  theme: 'DevsLibrary:theme',
  fontSize: 'DevsLibrary:font-size',
  lastRead: 'DevsLibrary:last-read',
  readLessons: 'DevsLibrary:read-lessons',
  items: 'DevsLibrary:items',       // notes + bookmarks + favourites
  highlights: 'DevsLibrary:highlights',
  recentRead: 'DevsLibrary:recent-read',
};

/* ----------------------------- helpers ---------------------------- */

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota or private mode — fail silently */
  }
}

function remove(key) {
  try {
    localStorage.removeItem(key);
  } catch {}
}

/* =============================== THEME ============================= */

export const THEMES = ['dark', 'sepia', 'light'];

export function getTheme() {
  const t = read(KEYS.theme, 'dark');
  return THEMES.includes(t) ? t : 'dark';
}

export function setTheme(theme) {
  if (!THEMES.includes(theme)) return;
  write(KEYS.theme, theme);
  applyTheme(theme);
}

export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  const colors = { dark: '#0b0f17', sepia: '#f4ecd8', light: '#ffffff' };
  if (meta) meta.setAttribute('content', colors[theme] || colors.dark);
}

/* ============================ FONT SIZE ============================ */

// Smooth slider: 0 → S, 50 → M, 100 → L
// Font size in rem, interpolated.

const FONT_MIN = 0.95;   // rem  (S)
const FONT_MAX = 1.25;   // rem  (L)

export function getFontSize() {
  const v = read(KEYS.fontSize, 50);
  return typeof v === 'number' ? v : 50;
}

export function setFontSize(value) {
  const clamped = Math.max(0, Math.min(100, value));
  write(KEYS.fontSize, clamped);
  applyFontSize(clamped);
}

export function applyFontSize(value) {
  const v = Math.max(0, Math.min(100, value));
  const rem = FONT_MIN + ((FONT_MAX - FONT_MIN) * v) / 100;
  document.documentElement.style.setProperty('--reader-font-size', `${rem}rem`);
}

/* ============================ LAST READ ============================ */

export function getLastRead() {
  return read(KEYS.lastRead, null);
}

export function saveLastRead(data) {
  // data: { bookId, lessonId, scrollY }
  write(KEYS.lastRead, { ...data, updatedAt: Date.now() });
}

export function updateLastReadScroll(scrollY) {
  const current = getLastRead();
  if (!current) return;
  write(KEYS.lastRead, { ...current, scrollY, updatedAt: Date.now() });
}

export function clearLastRead() {
  remove(KEYS.lastRead);
}

/* ========================== RECENT READ ============================ */

const RECENT_LIMIT = 5;

export function getRecentRead() {
  return read(KEYS.recentRead, []);
}

export function pushRecentRead({ bookId, lessonId }) {
  const list = getRecentRead();
  const filtered = list.filter(
    (r) => !(r.bookId === bookId && r.lessonId === lessonId)
  );
  filtered.unshift({ bookId, lessonId, at: Date.now() });
  write(KEYS.recentRead, filtered.slice(0, RECENT_LIMIT));
}

/* =========================== READ LESSONS ========================== */

export function getReadLessons() {
  return read(KEYS.readLessons, []);
}

export function isLessonRead(bookId, lessonId) {
  const list = getReadLessons();
  return list.includes(`${bookId}/${lessonId}`);
}

export function markLessonRead(bookId, lessonId) {
  const list = getReadLessons();
  const key = `${bookId}/${lessonId}`;
  if (!list.includes(key)) {
    list.push(key);
    write(KEYS.readLessons, list);
  }
}

export function unmarkLessonRead(bookId, lessonId) {
  const list = getReadLessons();
  const key = `${bookId}/${lessonId}`;
  write(KEYS.readLessons, list.filter((k) => k !== key));
}

export function countReadInBook(bookId, totalLessons) {
  const list = getReadLessons();
  const count = list.filter((k) => k.startsWith(`${bookId}/`)).length;
  return { count, total: totalLessons };
}

/* =============================== ITEMS ============================= */
/* Notes + bookmarks + favourites — one list, tagged.                 */
/*                                                                     */
/* item = {                                                            */
/*   id: string,                                                       */
/*   type: 'note' | 'bookmark' | 'favourite',                          */
/*   scope: 'book' | 'lesson',                                         */
/*   bookId: string,                                                   */
/*   lessonId?: string,                                                */
/*   text?: string,          // notes only                             */
/*   createdAt: number,                                                */
/* }                                                                   */

function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function getAllItems() {
  return read(KEYS.items, []);
}

export function getItemsByType(type) {
  return getAllItems().filter((i) => i.type === type);
}

export function getItemsFor({ bookId, lessonId, type }) {
  return getAllItems().filter(
    (i) =>
      i.type === type &&
      i.bookId === bookId &&
      (lessonId === undefined || i.lessonId === lessonId)
  );
}

export function hasItem({ type, scope, bookId, lessonId }) {
  return getAllItems().some(
    (i) =>
      i.type === type &&
      i.scope === scope &&
      i.bookId === bookId &&
      (scope === 'book' || i.lessonId === lessonId)
  );
}

/* --- add --- */

export function addNote({ scope, bookId, lessonId, text }) {
  if (!text || !text.trim()) return null;
  const item = {
    id: makeId(),
    type: 'note',
    scope,
    bookId,
    lessonId: scope === 'lesson' ? lessonId : undefined,
    text: text.trim(),
    createdAt: Date.now(),
  };
  const list = getAllItems();
  list.push(item);
  write(KEYS.items, list);
  return item;
}

export function addBookmark({ scope, bookId, lessonId }) {
  if (hasItem({ type: 'bookmark', scope, bookId, lessonId })) return null;
  const item = {
    id: makeId(),
    type: 'bookmark',
    scope,
    bookId,
    lessonId: scope === 'lesson' ? lessonId : undefined,
    createdAt: Date.now(),
  };
  const list = getAllItems();
  list.push(item);
  write(KEYS.items, list);
  return item;
}

export function addFavourite({ scope, bookId, lessonId }) {
  if (hasItem({ type: 'favourite', scope, bookId, lessonId })) return null;
  const item = {
    id: makeId(),
    type: 'favourite',
    scope,
    bookId,
    lessonId: scope === 'lesson' ? lessonId : undefined,
    createdAt: Date.now(),
  };
  const list = getAllItems();
  list.push(item);
  write(KEYS.items, list);
  return item;
}

/* --- remove --- */

export function removeItemById(id) {
  const list = getAllItems();
  write(KEYS.items, list.filter((i) => i.id !== id));
}

export function removeBookmark({ scope, bookId, lessonId }) {
  const list = getAllItems();
  write(
    KEYS.items,
    list.filter(
      (i) =>
        !(
          i.type === 'bookmark' &&
          i.scope === scope &&
          i.bookId === bookId &&
          (scope === 'book' || i.lessonId === lessonId)
        )
    )
  );
}

export function removeFavourite({ scope, bookId, lessonId }) {
  const list = getAllItems();
  write(
    KEYS.items,
    list.filter(
      (i) =>
        !(
          i.type === 'favourite' &&
          i.scope === scope &&
          i.bookId === bookId &&
          (scope === 'book' || i.lessonId === lessonId)
        )
    )
  );
}

/* ============================ HIGHLIGHTS =========================== */

/* highlight = {                                                       */
/*   id, bookId, lessonId, text, createdAt,                            */
/* }                                                                   */

export function getHighlights({ bookId, lessonId } = {}) {
  const list = read(KEYS.highlights, []);
  if (!bookId) return list;
  return list.filter(
    (h) =>
      h.bookId === bookId &&
      (lessonId === undefined || h.lessonId === lessonId)
  );
}

export function addHighlight({ bookId, lessonId, text }) {
  if (!text || !text.trim()) return null;
  const item = {
    id: makeId(),
    bookId,
    lessonId,
    text: text.trim(),
    createdAt: Date.now(),
  };
  const list = read(KEYS.highlights, []);
  list.push(item);
  write(KEYS.highlights, list);
  return item;
}

export function removeHighlight(id) {
  const list = read(KEYS.highlights, []);
  write(KEYS.highlights, list.filter((h) => h.id !== id));
}

/* ============================ WIPE ALL ============================= */
/* Not exposed in UI (user said no), but useful for dev/testing.       */

export function wipeAll() {
  Object.values(KEYS).forEach(remove);
}