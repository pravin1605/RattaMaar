/* =========================================================
   Read-only helpers for the Subjects and Notes pages.
   They use the same keys as the reader and Home, and never
   write anything, so existing data stays untouched.
========================================================= */

function read(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

/* 0-100. An explicit "completed" mark counts as 100. */
export function getNoteProgress(subjectId, noteId) {
  const value = Number(read(`notes-web-progress-${subjectId}-${noteId}`));
  let percent = Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : 0;
  if (read(`notes-web-completed-${subjectId}-${noteId}`) === "true") percent = 100;
  return Math.round(percent);
}

export function isNoteFavorite(noteId) {
  return read(`notes-web-favorite-${noteId}`) === "true";
}

export function getRecentList() {
  try {
    const list = JSON.parse(read("notes-web-recent"));
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function readPreference(key, fallback) {
  return read(key) ?? fallback;
}

export function writePreference(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* preference simply isn't remembered */
  }
}