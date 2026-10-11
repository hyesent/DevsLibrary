/* ================================================================== */
/* DEVSLIBRARY — STORAGE                                               */
/* ================================================================== */

const KEYS = {
  theme: 'devslibrary:theme',
  fontSize: 'devslibrary:font-size',
  showHighlights: 'devslibrary:show-highlights',
  lastRead: 'devslibrary:last-read',
  readLessons: 'devslibrary:read-lessons',
  items: 'devslibrary:items',
  highlights: 'devslibrary:highlights',
  recentRead: 'devslibrary:recent-read',
};

const LAB_SAVES_KEY = 'devslibrary:lab:saves';
const LAB_HISTORY_KEY = 'devslibrary:lab:history';
const LAB_DRAFT_PREFIX = 'devslibrary:lab:draft:';
const LAB_SETTINGS_KEY = 'devslibrary:lab:settings';

/* --------------------------- helpers ----------------------------- */

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch { return fallback; }
}

function write(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

function remove(key) {
  try { localStorage.removeItem(key); } catch {}
}

/* shared id generator — used by items, highlights, lab saves, lab history */
function makeId(prefix = 'id') {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
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

const FONT_MIN = 0.95;
const FONT_MAX = 1.25;

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

/* ========================= SHOW HIGHLIGHTS ========================= */

export function getShowHighlights() {
  return read(KEYS.showHighlights, true);
}

export function setShowHighlights(v) {
  write(KEYS.showHighlights, !!v);
  try {
    window.dispatchEvent(new CustomEvent('dsl:show-highlights-changed'));
  } catch {}
}

/* ============================ LAST READ ============================ */

export function getLastRead() { return read(KEYS.lastRead, null); }

export function saveLastRead(data) {
  write(KEYS.lastRead, { ...data, updatedAt: Date.now() });
}

export function updateLastReadScroll(scrollY) {
  const current = getLastRead();
  if (!current) return;
  write(KEYS.lastRead, { ...current, scrollY, updatedAt: Date.now() });
}

export function clearLastRead() { remove(KEYS.lastRead); }

/* ========================== RECENT READ ============================ */

const RECENT_LIMIT = 5;

export function getRecentRead() { return read(KEYS.recentRead, []); }

export function pushRecentRead({ bookId, lessonId }) {
  const list = getRecentRead();
  const filtered = list.filter(
    (r) => !(r.bookId === bookId && r.lessonId === lessonId)
  );
  filtered.unshift({ bookId, lessonId, at: Date.now() });
  write(KEYS.recentRead, filtered.slice(0, RECENT_LIMIT));
}

/* =========================== READ LESSONS ========================== */

export function getReadLessons() { return read(KEYS.readLessons, []); }

export function isLessonRead(bookId, lessonId) {
  return getReadLessons().includes(`${bookId}/${lessonId}`);
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

export function getAllItems() { return read(KEYS.items, []); }

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

export function addNote({ scope, bookId, lessonId, text }) {
  if (!text || !text.trim()) return null;
  const item = {
    id: makeId('note'),
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
    id: makeId('bm'),
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
    id: makeId('fav'),
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

export function removeItemById(id) {
  const list = getAllItems();
  write(KEYS.items, list.filter((i) => i.id !== id));
}

export function removeBookmark({ scope, bookId, lessonId }) {
  const list = getAllItems();
  write(KEYS.items, list.filter((i) => !(
    i.type === 'bookmark' &&
    i.scope === scope &&
    i.bookId === bookId &&
    (scope === 'book' || i.lessonId === lessonId)
  )));
}

export function removeFavourite({ scope, bookId, lessonId }) {
  const list = getAllItems();
  write(KEYS.items, list.filter((i) => !(
    i.type === 'favourite' &&
    i.scope === scope &&
    i.bookId === bookId &&
    (scope === 'book' || i.lessonId === lessonId)
  )));
}

/* ============================ HIGHLIGHTS =========================== */

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
  const list = read(KEYS.highlights, []);
  if (list.some((h) => h.bookId === bookId && h.lessonId === lessonId && h.text === text.trim())) {
    return null;
  }
  const item = {
    id: makeId('hl'),
    bookId,
    lessonId,
    text: text.trim(),
    createdAt: Date.now(),
  };
  list.push(item);
  write(KEYS.highlights, list);
  return item;
}

export function removeHighlight(id) {
  const list = read(KEYS.highlights, []);
  write(KEYS.highlights, list.filter((h) => h.id !== id));
}

/* ========================== LAB — DRAFTS =========================== */

export function getLabDraft(mode) {
  return read(`${LAB_DRAFT_PREFIX}${mode}`, null);
}

export function setLabDraft(mode, code) {
  write(`${LAB_DRAFT_PREFIX}${mode}`, code);
}

export function clearLabDraft(mode) {
  remove(`${LAB_DRAFT_PREFIX}${mode}`);
}

/* ========================== LAB — SAVES ============================ */

export function getLabSaves(mode) {
  const all = read(LAB_SAVES_KEY, []);
  return mode ? all.filter((s) => s.mode === mode) : all;
}

export function getLabSave(id) {
  return read(LAB_SAVES_KEY, []).find((s) => s.id === id) || null;
}

export function addLabSave({ name, mode, code }) {
  const saves = read(LAB_SAVES_KEY, []);
  const save = {
    id: makeId('save'),
    name: name || 'Untitled',
    mode,
    code,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  saves.unshift(save);
  write(LAB_SAVES_KEY, saves);
  return save;
}

export function updateLabSave(id, code) {
  const saves = read(LAB_SAVES_KEY, []);
  const idx = saves.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  saves[idx] = { ...saves[idx], code, updatedAt: Date.now() };
  write(LAB_SAVES_KEY, saves);
  return saves[idx];
}

export function renameLabSave(id, name) {
  const saves = read(LAB_SAVES_KEY, []);
  const idx = saves.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  saves[idx] = { ...saves[idx], name, updatedAt: Date.now() };
  write(LAB_SAVES_KEY, saves);
  return saves[idx];
}

export function deleteLabSave(id) {
  const saves = read(LAB_SAVES_KEY, []);
  write(LAB_SAVES_KEY, saves.filter((s) => s.id !== id));
  const history = read(LAB_HISTORY_KEY, []);
  write(LAB_HISTORY_KEY, history.filter((h) => h.saveId !== id));
}

/* ========================== LAB — HISTORY ========================== */

const HISTORY_CAP_PER_KEY = 50;

export function getLabHistory(key) {
  const all = read(LAB_HISTORY_KEY, []);
  if (!key) return all;
  return all.filter((h) => h.key === key);
}

export function pushLabHistory({ mode, saveId, code }) {
  const key = saveId || `mode:${mode}`;
  const history = read(LAB_HISTORY_KEY, []);
  const last = history.find((h) => h.key === key);
  if (last && last.code === code) return null;

  const entry = {
    id: makeId('hist'),
    key,
    mode,
    saveId: saveId || null,
    code,
    createdAt: Date.now(),
  };
  history.unshift(entry);

  const counts = {};
  const trimmed = [];
  for (const h of history) {
    counts[h.key] = (counts[h.key] || 0) + 1;
    if (counts[h.key] <= HISTORY_CAP_PER_KEY) trimmed.push(h);
  }
  write(LAB_HISTORY_KEY, trimmed);
  return entry;
}

export function deleteLabHistory(id) {
  const history = read(LAB_HISTORY_KEY, []);
  write(LAB_HISTORY_KEY, history.filter((h) => h.id !== id));
}

export function clearLabHistory(key) {
  const history = read(LAB_HISTORY_KEY, []);
  write(LAB_HISTORY_KEY, history.filter((h) => h.key !== key));
}

/* ========================= LAB — SETTINGS ========================== */

export function getLabSettings() {
  return read(LAB_SETTINGS_KEY, { saveMode: 'manual' });
}

export function setLabSettings(settings) {
  write(LAB_SETTINGS_KEY, settings);
}

/* ============================ WIPE ALL ============================= */

export function wipeAll() {
  Object.values(KEYS).forEach(remove);
  remove(LAB_SAVES_KEY);
  remove(LAB_HISTORY_KEY);
  remove(LAB_SETTINGS_KEY);
  // drafts share a prefix — sweep all localStorage keys starting with it
  try {
    const toRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(LAB_DRAFT_PREFIX)) toRemove.push(k);
    }
    toRemove.forEach(remove);
  } catch {}
}