import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import subjects from "../../data/subjects";
import { getSubjectAccent } from "../../utils/subjectAccent";
import { getNoteProgress, getRecentList } from "../../utils/progressStore";
import "./Favorites.css";
import "./FavoritesExtras.css";

import BottomNavigation from "../../components/layout/BottomNavigation";

const STATUS_FILTERS = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "progress", label: "In progress" },
  { id: "done", label: "Done" },
];

const SORTS = [
  { id: "default", label: "By subject" },
  { id: "az", label: "A → Z" },
  { id: "progress", label: "Most progress" },
  { id: "recent", label: "Last opened" },
];

const UNDO_MS = 6000;

function formatAgo(date) {
  const time = new Date(date).getTime();
  if (!date || Number.isNaN(time)) return "";
  const minutes = Math.floor((Date.now() - time) / 60000);
  if (minutes < 1) return "Opened just now";
  if (minutes < 60) return `Opened ${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Opened ${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `Opened ${days} day${days === 1 ? "" : "s"} ago`;
  return `Opened ${new Date(date).toLocaleDateString()}`;
}

function readFavorites() {
  const recent = getRecentList();
  const list = [];

  subjects.forEach((subject) => {
    subject.notes.forEach((note, index) => {
      let isFavorite = false;
      try {
        isFavorite = localStorage.getItem(`notes-web-favorite-${note.id}`) === "true";
      } catch {
        isFavorite = false;
      }
      if (!isFavorite) return;

      const progress = getNoteProgress(subject.id, note.id);
      const opened = recent.find((r) => r.subjectId === subject.id && r.noteId === note.id);

      list.push({
        ...note,
        subjectId: subject.id,
        subjectName: subject.name,
        subjectIcon: subject.icon,
        subjectColor: subject.color,
        accent: getSubjectAccent(subject.id),
        number: index + 1,
        progress,
        status: progress >= 100 ? "done" : progress > 0 ? "progress" : "unread",
        openedAt: opened?.openedAt || null,
      });
    });
  });

  return list;
}

function Favorites() {
  const navigate = useNavigate();

  const [favoriteNotes, setFavoriteNotes] = useState(readFavorites);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [sort, setSort] = useState("default");
  const [confirmClear, setConfirmClear] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(0);
  const confirmTimer = useRef(0);

  const loadFavorites = useCallback(() => setFavoriteNotes(readFavorites()), []);

  /*
   * Reload favorites when the user comes back
   * to this page/tab.
   */
  useEffect(() => {
    function handleVisibilityChange() {
      if (document.visibilityState === "visible") loadFavorites();
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", loadFavorites);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", loadFavorites);
    };
  }, [loadFavorites]);

  useEffect(
    () => () => {
      clearTimeout(toastTimer.current);
      clearTimeout(confirmTimer.current);
    },
    []
  );

  function showToast(message, undo) {
    clearTimeout(toastTimer.current);
    setToast({ message, undo });
    toastTimer.current = setTimeout(() => setToast(null), undo ? UNDO_MS : 2600);
  }

  function setFavoriteFlag(ids, value) {
    ids.forEach((id) => {
      try {
        if (value) localStorage.setItem(`notes-web-favorite-${id}`, "true");
        else localStorage.removeItem(`notes-web-favorite-${id}`);
      } catch {
        /* storage blocked */
      }
    });
    loadFavorites();
  }

  function removeFavorite(note) {
    setFavoriteFlag([note.id], false);
    showToast(`Removed "${note.title}"`, () => {
      setFavoriteFlag([note.id], true);
      setToast(null);
    });
  }

  function clearAllFavorites() {
    if (!confirmClear) {
      setConfirmClear(true);
      clearTimeout(confirmTimer.current);
      confirmTimer.current = setTimeout(() => setConfirmClear(false), 4000);
      return;
    }

    const ids = favoriteNotes.map((note) => note.id);
    setFavoriteFlag(ids, false);
    setSearchTerm("");
    setStatusFilter("all");
    setSubjectFilter("all");
    setConfirmClear(false);
    showToast(`Cleared ${ids.length} favorite${ids.length === 1 ? "" : "s"}`, () => {
      setFavoriteFlag(ids, true);
      setToast(null);
    });
  }

  function openNote(note) {
    navigate(`/notes/${note.subjectId}/${note.id}`);
  }

  function surpriseMe() {
    const pool = favoriteNotes.filter((n) => n.status !== "done");
    const choices = pool.length ? pool : favoriteNotes;
    if (!choices.length) return;
    openNote(choices[Math.floor(Math.random() * choices.length)]);
  }

  async function shareList() {
    const text = `My favorite notes on Notes Web:\n${favoriteNotes
      .map((n) => `• ${n.title} (${n.subjectName})`)
      .join("\n")}`;

    try {
      if (navigator.share) {
        await navigator.share({ title: "My favorite notes", text });
        return;
      }
      await navigator.clipboard.writeText(text);
      showToast("List copied to clipboard");
    } catch (error) {
      if (error?.name !== "AbortError") showToast("Couldn't share the list");
    }
  }

  /* ---------- derived data ---------- */

  const summary = useMemo(() => {
    const count = favoriteNotes.length;
    const done = favoriteNotes.filter((n) => n.status === "done").length;
    const started = favoriteNotes.filter((n) => n.status === "progress").length;
    const percent = count
      ? Math.round(favoriteNotes.reduce((sum, n) => sum + n.progress, 0) / count)
      : 0;
    return { count, done, started, percent, subjectCount: new Set(favoriteNotes.map((n) => n.subjectId)).size };
  }, [favoriteNotes]);

  const subjectChips = useMemo(() => {
    const map = new Map();
    favoriteNotes.forEach((n) => {
      const entry = map.get(n.subjectId) || { id: n.subjectId, name: n.subjectName, icon: n.subjectIcon, count: 0 };
      entry.count += 1;
      map.set(n.subjectId, entry);
    });
    return [...map.values()];
  }, [favoriteNotes]);

  const statusCounts = useMemo(() => {
    const c = { all: favoriteNotes.length, unread: 0, progress: 0, done: 0 };
    favoriteNotes.forEach((n) => {
      c[n.status] += 1;
    });
    return c;
  }, [favoriteNotes]);

  const filteredFavorites = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    let list = favoriteNotes.filter((note) => {
      if (statusFilter !== "all" && note.status !== statusFilter) return false;
      if (subjectFilter !== "all" && note.subjectId !== subjectFilter) return false;
      return (
        !search ||
        note.title.toLowerCase().includes(search) ||
        note.subjectName.toLowerCase().includes(search)
      );
    });

    list = [...list];
    const at = (n) => new Date(n.openedAt).getTime() || 0;
    if (sort === "az") list.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "progress") list.sort((a, b) => b.progress - a.progress);
    if (sort === "recent") list.sort((a, b) => at(b) - at(a));
    return list;
  }, [favoriteNotes, searchTerm, statusFilter, subjectFilter, sort]);

  const groups = useMemo(() => {
    if (sort !== "default") return [{ id: "all", label: null, items: filteredFavorites }];
    const result = [];
    filteredFavorites.forEach((note) => {
      let group = result.find((g) => g.id === note.subjectId);
      if (!group) {
        group = { id: note.subjectId, label: note.subjectName, icon: note.subjectIcon, items: [] };
        result.push(group);
      }
      group.items.push(note);
    });
    return result;
  }, [filteredFavorites, sort]);

  const resume = useMemo(() => {
    const open = favoriteNotes.filter((n) => n.status !== "done");
    const at = (n) => new Date(n.openedAt).getTime() || 0;
    return [...open].sort((a, b) => at(b) - at(a) || b.progress - a.progress)[0] || null;
  }, [favoriteNotes]);

  const filtering = searchTerm.trim() || statusFilter !== "all" || subjectFilter !== "all";

  function resetFilters() {
    setSearchTerm("");
    setStatusFilter("all");
    setSubjectFilter("all");
  }

  return (
    <div className="favorites-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="favorites-header">

        <button
          type="button"
          className="favorites-back-button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <span aria-hidden="true">←</span>
        </button>

        <div className="favorites-header-title">

          <div
            className="favorites-heart"
            aria-hidden="true"
          >
            <span>♥</span>
          </div>

          <div>
            <span>YOUR COLLECTION</span>
            <h1>Favorites</h1>
          </div>

        </div>

      </header>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="favorites-content">

        {/* ===================================================
            INTRO
        =================================================== */}

        <section className="favorites-intro">

          <div>
            <h2>Saved Notes</h2>

            <p>
              {favoriteNotes.length}{" "}
              {favoriteNotes.length === 1 ? "note" : "notes"} saved
            </p>
          </div>

          {favoriteNotes.length > 0 && (
            <button
              type="button"
              className={`clear-favorites ${confirmClear ? "is-confirm" : ""}`}
              onClick={clearAllFavorites}
            >
              <span className="clear-icon" aria-hidden="true">
                ×
              </span>

              {confirmClear ? "Tap again to confirm" : "Clear all"}
            </button>
          )}

        </section>

        {favoriteNotes.length > 0 && (
          <>
            {/* ---------- collection summary ---------- */}
            <section className="fx-hero" aria-label="Collection summary">
              <div
                className="fx-ring"
                style={{ "--pct": `${summary.percent}%` }}
                role="img"
                aria-label={`${summary.percent}% of your favorites read`}
              >
                <span>{summary.percent}%</span>
              </div>

              <div className="fx-hero-text">
                <h3>
                  {summary.done === summary.count
                    ? "You've read them all! 🎉"
                    : "Your hand-picked reading list"}
                </h3>
                <p>
                  {summary.count} notes from {summary.subjectCount}{" "}
                  {summary.subjectCount === 1 ? "subject" : "subjects"}
                </p>
                <div className="fx-pills">
                  <span className="fx-pill">✅ {summary.done} done</span>
                  <span className="fx-pill">📖 {summary.started} in progress</span>
                  <span className="fx-pill">🆕 {statusCounts.unread} unread</span>
                </div>
              </div>
            </section>

            {/* ---------- resume + quick actions ---------- */}
            {resume && !filtering && (
              <button
                type="button"
                className="fx-resume"
                style={{ "--c-from": resume.accent.from, "--c-to": resume.accent.to }}
                onClick={() => openNote(resume)}
              >
                <span className="fx-resume-icon" aria-hidden="true">{resume.subjectIcon}</span>
                <span className="fx-resume-body">
                  <small>{resume.progress > 0 ? "KEEP READING" : "START WITH THIS ONE"}</small>
                  <strong>{resume.title}</strong>
                  <span className="fx-resume-bar" aria-hidden="true">
                    <i style={{ width: `${resume.progress}%` }} />
                  </span>
                </span>
                <span className="fx-resume-go" aria-hidden="true">
                  {resume.progress > 0 ? `${resume.progress}%` : "Open"} ▸
                </span>
              </button>
            )}

            <div className="fx-actions">
              <button type="button" onClick={surpriseMe}>
                🎲 Surprise me
              </button>
              <button type="button" onClick={shareList}>
                ↗ Share list
              </button>
            </div>
          </>
        )}


        {/* ===================================================
            SEARCH
        =================================================== */}

        {favoriteNotes.length > 0 && (
          <div className="favorites-search">

            <span
              className="search-icon"
              aria-hidden="true"
            >
              ⌕
            </span>

            <input
              type="search"
              placeholder="Search favorites..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              aria-label="Search favorites"
            />

            {searchTerm && (
              <button
                type="button"
                className="clear-search"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}

          </div>
        )}

        {favoriteNotes.length > 0 && (
          <>
            <div className="fx-filters" role="tablist" aria-label="Filter by status">
              {STATUS_FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={statusFilter === f.id}
                  className={`fx-chip ${statusFilter === f.id ? "is-active" : ""}`}
                  onClick={() => setStatusFilter(f.id)}
                >
                  {f.label}
                  <b>{statusCounts[f.id]}</b>
                </button>
              ))}
            </div>

            {subjectChips.length > 1 && (
              <div className="fx-filters" role="tablist" aria-label="Filter by subject">
                <button
                  type="button"
                  role="tab"
                  aria-selected={subjectFilter === "all"}
                  className={`fx-chip ${subjectFilter === "all" ? "is-active" : ""}`}
                  onClick={() => setSubjectFilter("all")}
                >
                  All subjects
                </button>
                {subjectChips.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={subjectFilter === s.id}
                    className={`fx-chip ${subjectFilter === s.id ? "is-active" : ""}`}
                    onClick={() => setSubjectFilter(s.id)}
                  >
                    <span aria-hidden="true">{s.icon}</span>
                    {s.name}
                    <b>{s.count}</b>
                  </button>
                ))}
              </div>
            )}

            <div className="fx-sortbar">
              <span className="fx-count" aria-live="polite">
                {filteredFavorites.length} of {favoriteNotes.length}
                {filtering && (
                  <button type="button" className="fx-link" onClick={resetFilters}>
                    Clear filters
                  </button>
                )}
              </span>

              <label className="fx-sort">
                <span className="fx-sr-only">Sort favorites</span>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  {SORTS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </>
        )}


        {/* ===================================================
            NO FAVORITES
        =================================================== */}

        {favoriteNotes.length === 0 ? (

          <section className="favorites-empty">

            <div
              className="empty-heart"
              aria-hidden="true"
            >
              ♡
            </div>

            <h2>No favorites yet</h2>

            <p>
              Save notes you want to read later by
              tapping the heart button inside a note.
            </p>

            <button
              type="button"
              onClick={() => navigate("/subjects")}
            >
              <span
                className="empty-book-icon"
                aria-hidden="true"
              >
                ▤
              </span>

              Browse Notes

              <span aria-hidden="true">→</span>
            </button>

          </section>


        ) : filteredFavorites.length === 0 ? (

          /* =================================================
             SEARCH RESULT EMPTY
          ================================================= */

          <section className="favorites-empty search-empty">

            <div
              className="search-empty-icon"
              aria-hidden="true"
            >
              ⌕
            </div>

            <h2>No notes found</h2>

            <p>
              Try another word, or clear the filters.
            </p>

            <button
              type="button"
              onClick={resetFilters}
            >
              Show all favorites
            </button>

          </section>


        ) : (

          /* =================================================
             FAVORITE LIST
          ================================================= */

          <section className="favorites-list">

            {groups.map((group) => (
              <div className="fx-group" key={group.id}>
                {group.label && (
                  <h3 className="fx-group-title">
                    <span aria-hidden="true">{group.icon}</span>
                    {group.label}
                    <b>{group.items.length}</b>
                  </h3>
                )}

                {group.items.map((note, position) => (

                  <article
                    className={`favorite-card fx-card status-${note.status}`}
                    key={`${note.subjectId}-${note.id}`}
                    style={{
                      "--c-from": note.accent.from,
                      "--c-to": note.accent.to,
                      "--i": Math.min(position, 10),
                    }}
                  >

                    {/* -------------------------------------------
                        NOTE MAIN BUTTON
                    ------------------------------------------- */}

                    <button
                      type="button"
                      className="favorite-card-main"
                      onClick={() => openNote(note)}
                    >

                      <div
                        className={`favorite-subject-icon ${note.subjectColor}`}
                      >
                        {note.subjectIcon}
                      </div>

                      <div className="favorite-card-info">

                        <span className="favorite-subject">
                          {note.subjectName}
                        </span>

                        <h3>{note.title}</h3>

                        <small className="fx-meta">
                          <span>Note {note.number}</span>
                          <span className={`fx-status fx-status-${note.status}`}>
                            {note.status === "done" && "✓ Done"}
                            {note.status === "progress" && `${note.progress}% read`}
                            {note.status === "unread" && "Not started"}
                          </span>
                          {note.openedAt && <span>{formatAgo(note.openedAt)}</span>}
                        </small>

                        {note.status !== "unread" && (
                          <span className="fx-bar" aria-hidden="true">
                            <i style={{ width: `${note.progress}%` }} />
                          </span>
                        )}

                      </div>

                      <span
                        className="favorite-arrow"
                        aria-hidden="true"
                      >
                        ›
                      </span>

                    </button>


                    {/* -------------------------------------------
                        REMOVE FAVORITE
                    ------------------------------------------- */}

                    <button
                      type="button"
                      className="remove-favorite"
                      onClick={() => removeFavorite(note)}
                      aria-label={`Remove ${note.title} from favorites`}
                    >
                      <span aria-hidden="true">♥</span>
                    </button>

                  </article>

                ))}
              </div>
            ))}

          </section>

        )}

      </main>

      {toast && (
        <div className="fx-toast" role="status" aria-live="polite">
          <span>{toast.message}</span>
          {toast.undo && (
            <button type="button" onClick={toast.undo}>
              Undo
            </button>
          )}
        </div>
      )}

      <BottomNavigation />

    </div>
  );
}

export default Favorites;