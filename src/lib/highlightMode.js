/* Tiny event bus for cross-component highlight coordination. */

/* ---------- enter highlight mode ---------- */
const startListeners = new Set();

export function onHighlightStart(fn) {
  startListeners.add(fn);
  return () => startListeners.delete(fn);
}

export function requestHighlightStart() {
  startListeners.forEach((fn) => fn());
}

/* ---------- highlights changed (added / removed) ---------- */
const changeListeners = new Set();

export function onHighlightsChanged(fn) {
  changeListeners.add(fn);
  return () => changeListeners.delete(fn);
}

export function notifyHighlightsChanged() {
  changeListeners.forEach((fn) => fn());
}