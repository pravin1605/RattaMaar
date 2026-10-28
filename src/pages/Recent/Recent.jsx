import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import subjects from "../../data/subjects";
import { getSubjectAccent } from "../../utils/subjectAccent";
import { getNoteProgress, isNoteFavorite } from "../../utils/progressStore";
import "./Recent.css";
import "./RecentExtras.css";

import BottomNavigation from "../../components/layout/BottomNavigation";

const STORAGE_KEY = "notes-web-recent";
const UNDO_MS = 6000;

const STATUS_FILTERS = [
  { id: "all", label: "All" },
  { id: "progress", label: "In progress" },
  { id: "done", label: "Completed" },
  { id: "fav", label: "♥ Favorites" },
];

const SORTS = [
  { id: "new", label: "Newest first" },
  { id: "old", label: "Oldest first" },
  { id: "az", label: "A → Z" },
  { id: "progress", label: "Most progress" },
];

function loadRecent() {
  try {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function saveRecent(list) {
  try {
    if (list.length) localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* storage blocked: the list just won't persist */
  }
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

function groupOf(openedAt) {
  const time = new Date(openedAt).getTime();
  if (!openedAt || Number.isNaN(time)) return { id: "earlier", label: "Earlier" };
  const today = startOfDay(new Date());
  const day = 86400000;
  if (time >= today) return { id: "today", label: "Today" };
  if (time >= today - day) return { id: "yesterday", label: "Yesterday" };
  if (time >= today - 6 * day) return { id: "week", label: "This week" };
  return { id: "earlier", label: "Earlier" };
}

function formatAgo(date) {
  const time = new Date(date).getTime();
  if (!date || Number.isNaN(time)) return "Recently opened";

  const minutes = Math.floor((Date.now() - time) / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min${minutes === 1 ? "" : "s"} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;

  return new Date(date).toLocaleDateString();
}

function Recent() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [sort, setSort] = useState("new");
  const [confirmClear, setConfirmClear] = useState(false);
  const [undo, setUndo] = useState(null);
  const [recentNotes, setRecentNotes] = useState(loadRecent);
  const undoTimer = useRef(0);

  useEffect(() => () => clearTimeout(undoTimer.current), []);

  /* ---------- join history with real notes, progress, favorites ---------- */

  const notes = useMemo(() => {
    return recentNotes
      .map((recent) => {
        const subject = subjects.find((item) => item.id === recent.subjectId);
        const note = subject?.notes?.find((item) => item.id === recent.noteId);
        if (!subject || !note) return null;

        const progress = getNoteProgress(subject.id, note.id);
        return {
          ...note,
          subjectId: subject.id,
          subjectName: subject.name,
          subjectIcon: subject.icon,
          accent: getSubjectAccent(subject.id),
          openedAt: recent.openedAt,
          number: subject.notes.findIndex((n) => n.id === note.id) + 1,
          progress,
          status: progress >= 100 ? "done" : progress > 0 ? "progress" : "unread",
          fav: isNoteFavorite(note.id),
        };
      })
      .filter(Boolean);
  }, [recentNotes]);

  /* ---------- summary numbers ---------- */

  const summary = useMemo(() => {
    const today = startOfDay(new Date());
    const week = today - 6 * 86400000;
    const stamp = (n) => new Date(n.openedAt).getTime();
    return {
      total: notes.length,
      today: notes.filter((n) => stamp(n) >= today).length,
      week: notes.filter((n) => stamp(n) >= week).length,
      inProgress: notes.filter((n) => n.status === "progress").length,
    };
  }, [notes]);

  const subjectChips = useMemo(() => {
    const map = new Map();
    notes.forEach((n) => {
      const entry = map.get(n.subjectId) || { id: n.subjectId, name: n.subjectName, icon: n.subjectIcon, count: 0 };
      entry.count += 1;
      map.set(n.subjectId, entry);
    });
    return [...map.values()].sort((a, b) => b.count - a.count);
  }, [notes]);

  const statusCounts = useMemo(() => {
    const c = { all: notes.length, progress: 0, done: 0, fav: 0 };
    notes.forEach((n) => {
      if (n.status === "progress") c.progress += 1;
      if (n.status === "done") c.done += 1;
      if (n.fav) c.fav += 1;
    });
    return c;
  }, [notes]);

  /* ---------- search + filters + sort ---------- */

  const filteredNotes = useMemo(() => {
    const query = search.trim().toLowerCase();

    let list = notes.filter((n) => {
      if (subjectFilter !== "all" && n.subjectId !== subjectFilter) return false;
      if (statusFilter === "fav" ? !n.fav : statusFilter !== "all" && n.status !== statusFilter) {
        return false;
      }
      return (
        !query ||
        n.title.toLowerCase().includes(query) ||
        n.subjectName.toLowerCase().includes(query)
      );
    });

    list = [...list];
    const at = (n) => new Date(n.openedAt).getTime() || 0;
    if (sort === "new") list.sort((a, b) => at(b) - at(a));
    if (sort === "old") list.sort((a, b) => at(a) - at(b));
    if (sort === "az") list.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "progress") list.sort((a, b) => b.progress - a.progress);
    return list;
  }, [notes, search, statusFilter, subjectFilter, sort]);

  /* Grouping by day only makes sense for the two date orders. */
  const groups = useMemo(() => {
    if (sort !== "new" && sort !== "old") {
      return [{ id: "all", label: null, items: filteredNotes }];
    }
    const result = [];
    filteredNotes.forEach((n) => {
      const g = groupOf(n.openedAt);
      let bucket = result.find((r) => r.id === g.id);
      if (!bucket) {
        bucket = { ...g, items: [] };
        result.push(bucket);
      }
      bucket.items.push(n);
    });
    return result;
  }, [filteredNotes, sort]);

  const resume = useMemo(
    () => [...notes].sort((a, b) => (new Date(b.openedAt).getTime() || 0) - (new Date(a.openedAt).getTime() || 0)).find((n) => n.status !== "done") || null,
    [notes]
  );

  const filtering = search.trim() || statusFilter !== "all" || subjectFilter !== "all";

  /* ---------- actions (with undo) ---------- */

  function offerUndo(previous, label) {
    clearTimeout(undoTimer.current);
    setUndo({ previous, label });
    undoTimer.current = setTimeout(() => setUndo(null), UNDO_MS);
  }

  function undoLast() {
    if (!undo) return;
    clearTimeout(undoTimer.current);
    saveRecent(undo.previous);
    setRecentNotes(undo.previous);
    setUndo(null);
  }

  function clearHistory() {
    if (!confirmClear) {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 4000);
      return;
    }
    offerUndo(recentNotes, "History cleared");
    saveRecent([]);
    setRecentNotes([]);
    setSearch("");
    setConfirmClear(false);
  }

  function removeRecent(subjectId, noteId) {
    const updated = recentNotes.filter(
      (item) => !(item.subjectId === subjectId && item.noteId === noteId)
    );
    offerUndo(recentNotes, "Removed from recent");
    saveRecent(updated);
    setRecentNotes(updated);
  }

  function openNote(subjectId, noteId) {
    navigate(`/notes/${subjectId}/${noteId}`);
  }

  function resetFilters() {
    setSearch("");
    setStatusFilter("all");
    setSubjectFilter("all");
  }

  /* ---------- UI ---------- */

  return (
    <main className="recent-page">
      <section className="recent-header">
        <div className="recent-header-icon" aria-hidden="true">
          <span>◷</span>
        </div>

        <div>
          <span className="recent-header-label">YOUR ACTIVITY</span>

          <h1>Recent Notes</h1>

          <p>Continue from where you left off</p>
        </div>
      </section>

      {notes.length > 0 && (
        <>
          {/* ---------- summary ---------- */}
          <section className="rx-stats" aria-label="Activity summary">
            <div className="rx-stat">
              <strong>{summary.today}</strong>
              <span>opened today</span>
            </div>
            <div className="rx-stat">
              <strong>{summary.week}</strong>
              <span>this week</span>
            </div>
            <div className="rx-stat">
              <strong>{summary.inProgress}</strong>
              <span>in progress</span>
            </div>
            <div className="rx-stat">
              <strong>{summary.total}</strong>
              <span>in history</span>
            </div>
          </section>

          {/* ---------- resume ---------- */}
          {resume && !filtering && (
            <button
              type="button"
              className="rx-resume"
              style={{ "--c-from": resume.accent.from, "--c-to": resume.accent.to }}
              onClick={() => openNote(resume.subjectId, resume.id)}
            >
              <span className="rx-resume-icon" aria-hidden="true">{resume.subjectIcon}</span>
              <span className="rx-resume-body">
                <small>PICK UP WHERE YOU STOPPED</small>
                <strong>{resume.title}</strong>
                <span className="rx-resume-bar" aria-hidden="true">
                  <i style={{ width: `${resume.progress}%` }} />
                </span>
              </span>
              <span className="rx-resume-go" aria-hidden="true">
                {resume.progress > 0 ? `${resume.progress}%` : "Start"} ▸
              </span>
            </button>
          )}

          {/* ---------- toolbar ---------- */}
          <section className="recent-toolbar">
            <div className="recent-search">
              <span className="recent-search-icon" aria-hidden="true">⌕</span>

              <input
                type="text"
                placeholder="Search recent notes..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search recent notes"
              />

              {search && (
                <button
                  type="button"
                  className="recent-search-clear"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            <button
              type="button"
              className={`clear-history-button ${confirmClear ? "is-confirm" : ""}`}
              onClick={clearHistory}
            >
              <span className="clear-history-icon" aria-hidden="true">×</span>
              <span>{confirmClear ? "Tap again to confirm" : "Clear History"}</span>
            </button>
          </section>

          {/* ---------- filters ---------- */}
          <div className="rx-filters" role="tablist" aria-label="Filter by status">
            {STATUS_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={statusFilter === f.id}
                className={`rx-chip ${statusFilter === f.id ? "is-active" : ""}`}
                onClick={() => setStatusFilter(f.id)}
              >
                {f.label}
                <b>{statusCounts[f.id]}</b>
              </button>
            ))}
          </div>

          {subjectChips.length > 1 && (
            <div className="rx-filters rx-subjects" role="tablist" aria-label="Filter by subject">
              <button
                type="button"
                role="tab"
                aria-selected={subjectFilter === "all"}
                className={`rx-chip ${subjectFilter === "all" ? "is-active" : ""}`}
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
                  className={`rx-chip ${subjectFilter === s.id ? "is-active" : ""}`}
                  onClick={() => setSubjectFilter(s.id)}
                >
                  <span aria-hidden="true">{s.icon}</span>
                  {s.name}
                  <b>{s.count}</b>
                </button>
              ))}
            </div>
          )}

          <div className="rx-sortbar">
            <span className="recent-count" aria-live="polite">
              {filteredNotes.length} {filteredNotes.length === 1 ? "note" : "notes"}
              {filtering && (
                <button type="button" className="rx-link" onClick={resetFilters}>
                  Clear filters
                </button>
              )}
            </span>

            <label className="rx-sort">
              <span className="rx-visually-hidden">Sort recent notes</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </label>
          </div>
        </>
      )}

      {notes.length === 0 ? (
        <section className="recent-empty">
          <div className="recent-empty-icon" aria-hidden="true">◷</div>

          <h2>No Recent Notes</h2>

          <p>
            Notes you open will appear here so you can quickly continue
            learning.
          </p>

          <button
            type="button"
            className="browse-notes-button"
            onClick={() => navigate("/subjects")}
          >
            <span className="browse-notes-icon" aria-hidden="true">▤</span>
            Browse Notes
            <span aria-hidden="true">→</span>
          </button>
        </section>
      ) : filteredNotes.length === 0 ? (
        <section className="recent-no-results">
          <div className="recent-no-results-icon" aria-hidden="true">⌕</div>

          <h2>No notes found</h2>

          <p>Try a different word, or clear the filters.</p>

          <button type="button" className="rx-reset" onClick={resetFilters}>
            Show all recent notes
          </button>
        </section>
      ) : (
        <section className="recent-list">
          {groups.map((group) => (
            <div className="rx-group" key={group.id}>
              {group.label && (
                <h2 className="rx-group-title">
                  {group.label}
                  <span>{group.items.length}</span>
                </h2>
              )}

              {group.items.map((note, index) => (
                <article
                  className={`recent-card rx-card status-${note.status}`}
                  key={`${note.subjectId}-${note.id}`}
                  style={{
                    "--c-from": note.accent.from,
                    "--c-to": note.accent.to,
                    "--i": Math.min(index, 10),
                  }}
                  onClick={() => openNote(note.subjectId, note.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.target !== event.currentTarget) return;
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openNote(note.subjectId, note.id);
                    }
                  }}
                >
                  <div className="recent-card-icon rx-icon">{note.subjectIcon}</div>

                  <div className="recent-card-content">
                    <span className="recent-subject">
                      {note.subjectName} • Note {note.number}
                    </span>

                    <h3>
                      {note.title}
                      {note.fav && (
                        <em className="rx-heart" aria-label="Favorite">♥</em>
                      )}
                    </h3>

                    <div className="rx-meta">
                      <span className="recent-time">
                        <span className="recent-time-icon" aria-hidden="true">◷</span>
                        {formatAgo(note.openedAt)}
                      </span>

                      <span className={`rx-status rx-status-${note.status}`}>
                        {note.status === "done" && "✓ Completed"}
                        {note.status === "progress" && `${note.progress}% read`}
                        {note.status === "unread" && "Not started"}
                      </span>
                    </div>

                    {note.status !== "unread" && (
                      <div className="rx-bar" aria-hidden="true">
                        <i style={{ width: `${note.progress}%` }} />
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    className="remove-recent-button"
                    onClick={(event) => {
                      event.stopPropagation();
                      removeRecent(note.subjectId, note.id);
                    }}
                    aria-label={`Remove ${note.title} from recent notes`}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </article>
              ))}
            </div>
          ))}
        </section>
      )}

      {undo && (
        <div className="rx-undo" role="status" aria-live="polite">
          <span>{undo.label}</span>
          <button type="button" onClick={undoLast}>Undo</button>
        </div>
      )}

      <BottomNavigation />
    </main>
  );
}

export default Recent;