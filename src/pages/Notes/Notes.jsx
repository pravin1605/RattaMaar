import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import subjects from "../../data/subjects";
import "./Notes.css";
import "./NotesExtras.css";

import BottomNavigation from "../../components/layout/BottomNavigation";
import { getSubjectAccent } from "../../utils/subjectAccent";
import {
  getNoteProgress,
  getRecentList,
  isNoteFavorite,
} from "../../utils/progressStore";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "progress", label: "In progress" },
  { id: "done", label: "Done" },
  { id: "fav", label: "♥ Favorites" },
];

function Notes() {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortAz, setSortAz] = useState(false);

  const subject = subjects.find((item) => item.id === subjectId);

  /* Progress and favorites are read once per visit. */
  const model = useMemo(() => {
    if (!subject) return null;

    const rows = subject.notes.map((note, index) => {
      const progress = getNoteProgress(subject.id, note.id);
      const status = progress >= 100 ? "done" : progress > 0 ? "progress" : "unread";
      return { note, index, progress, status, fav: isNoteFavorite(note.id) };
    });

    const done = rows.filter((r) => r.status === "done").length;
    const started = rows.filter((r) => r.status === "progress").length;
    const percent = rows.length
      ? Math.round(rows.reduce((n, r) => n + r.progress, 0) / rows.length)
      : 0;

    const recent = getRecentList().find((r) => r.subjectId === subject.id);
    const recentRow = recent ? rows.find((r) => r.note.id === recent.noteId) : null;

    /* What the big button should open. */
    let cta = null;
    if (recentRow && recentRow.status !== "done") {
      cta = { row: recentRow, label: "Continue" };
    } else {
      const next = rows.find((r) => r.status !== "done");
      if (next) cta = { row: next, label: done || started ? "Continue" : "Start" };
      else if (rows[0]) cta = { row: rows[0], label: "Review again" };
    }

    return { rows, done, started, percent, cta, recentId: recentRow?.note.id };
  }, [subject]);

  const counts = useMemo(() => {
    const c = { all: 0, unread: 0, progress: 0, done: 0, fav: 0 };
    model?.rows.forEach((r) => {
      c.all += 1;
      c[r.status] += 1;
      if (r.fav) c.fav += 1;
    });
    return c;
  }, [model]);

  const visibleRows = useMemo(() => {
    if (!model) return [];
    const search = searchTerm.trim().toLowerCase();

    let rows = model.rows.filter((r) => {
      if (filter === "fav" ? !r.fav : filter !== "all" && r.status !== filter) {
        return false;
      }
      return !search || r.note.title.toLowerCase().includes(search);
    });

    if (sortAz) {
      rows = [...rows].sort((a, b) => a.note.title.localeCompare(b.note.title));
    }
    return rows;
  }, [model, searchTerm, filter, sortAz]);

  if (!subject) {
    return (
      <div className="notes-not-found">
        <div className="notes-not-found-icon">▤</div>

        <h1>Subject Not Found</h1>

        <p>
          The subject you are looking for does not exist in Notes Web.
        </p>

        <button onClick={() => navigate("/subjects")}>
          Browse Subjects
        </button>
      </div>
    );
  }

  const accent = getSubjectAccent(subject.id);
  const filtering = searchTerm.trim() || filter !== "all";

  return (
    <div
      className="notes-page"
      style={{ "--c-from": accent.from, "--c-to": accent.to, "--c-solid": accent.solid }}
    >
      <header className="notes-header">
        <button
          type="button"
          className="notes-back-button"
          onClick={() => navigate("/subjects")}
          aria-label="Back to subjects"
        >
          <span>←</span>
        </button>

        <div className="notes-header-info">
          <div className={`notes-subject-icon ${subject.color}`}>
            {subject.icon}
          </div>

          <div>
            <span>SUBJECT</span>
            <h1>{subject.name}</h1>
          </div>
        </div>
      </header>

      <main className="notes-content">
        {/* ---------- subject banner ---------- */}
        <section className="nx-banner">
          <div className="nx-banner-top">
            <div className="nx-banner-text">
              <h2>{subject.name}</h2>
              <p>{subject.description}</p>
            </div>

            <div
              className="nx-ring"
              style={{ "--pct": `${model.percent}%` }}
              role="img"
              aria-label={`${model.percent}% of ${subject.name} complete`}
            >
              <span>{model.percent}%</span>
            </div>
          </div>

          <div className="nx-stats">
            <span className="nx-stat">
              <b>{subject.notes.length}</b> {subject.notes.length === 1 ? "note" : "notes"}
            </span>
            <span className="nx-stat">
              <b>{model.done}</b> done
            </span>
            <span className="nx-stat">
              <b>{model.started}</b> in progress
            </span>
          </div>

          {model.cta && (
            <button
              type="button"
              className="nx-cta"
              onClick={() => navigate(`/notes/${subject.id}/${model.cta.row.note.id}`)}
            >
              <span className="nx-cta-label">
                <small>{model.cta.label.toUpperCase()}</small>
                <strong>{model.cta.row.note.title}</strong>
              </span>
              <span aria-hidden="true">▶</span>
            </button>
          )}
        </section>

        <section className="notes-intro">
          <div>
            <h2>Topics</h2>

            <p>
              {subject.notes.length}{" "}
              {subject.notes.length === 1 ? "note" : "notes"} available
            </p>
          </div>

          <div className="notes-total-icon">
            <span>▤</span>
          </div>
        </section>

        <div className="notes-search">
          <span className="notes-search-icon">⌕</span>

          <input
            type="search"
            placeholder={`Search ${subject.name} notes...`}
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
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

        {/* ---------- filters ---------- */}
        <div className="nx-controls">
          <div className="nx-filters" role="tablist" aria-label="Filter notes">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={filter === f.id}
                className={`nx-filter ${filter === f.id ? "is-active" : ""}`}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
                <b>{counts[f.id]}</b>
              </button>
            ))}
          </div>

          <button
            type="button"
            className={`nx-sort ${sortAz ? "is-active" : ""}`}
            aria-pressed={sortAz}
            onClick={() => setSortAz((v) => !v)}
            title="Sort alphabetically"
          >
            A→Z
          </button>
        </div>

        <p className="nx-result-count" aria-live="polite">
          Showing {visibleRows.length} of {subject.notes.length}
          {filtering && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setFilter("all");
              }}
            >
              Clear filters
            </button>
          )}
        </p>

        <section className="notes-list">
          {visibleRows.length > 0 ? (
            visibleRows.map((row, position) => (
              <div
                className={`note-list-item nx-row status-${row.status} ${
                  row.note.id === model.recentId ? "is-current" : ""
                }`}
                key={row.note.id}
                style={{ "--i": Math.min(position, 12) }}
              >
                <button
                  type="button"
                  className="nx-row-main"
                  onClick={() =>
                    navigate(
                      `/notes/${subject.id}/${row.note.id}`
                    )
                  }
                  aria-label={`${row.note.title}, ${
                    row.status === "done"
                      ? "completed"
                      : row.status === "progress"
                      ? `${row.progress}% read`
                      : "not started"
                  }`}
                >
                  <div className="note-number">
                    {row.status === "done"
                      ? "✓"
                      : String(row.index + 1).padStart(2, "0")}
                  </div>

                  <div className="note-list-info">
                    <h3>{row.note.title}</h3>

                    <span>
                      {subject.name} • Note {row.index + 1}
                      {row.note.id === model.recentId && row.status !== "done" && (
                        <em className="nx-tag">Last opened</em>
                      )}
                      {row.fav && (
                        <em className="nx-heart" aria-label="Favorite">
                          ♥
                        </em>
                      )}
                    </span>

                    {row.status !== "unread" && (
                      <div className="nx-row-bar" aria-hidden="true">
                        <i style={{ width: `${row.progress}%` }} />
                      </div>
                    )}
                  </div>

                  <span className="nx-row-state" aria-hidden="true">
                    {row.status === "progress" && `${row.progress}%`}
                    {row.status === "unread" && "NEW"}
                  </span>

                  <span
                    className="note-list-arrow"
                    aria-hidden="true"
                  >
                    ›
                  </span>
                </button>
              </div>
            ))
          ) : (
            <div className="no-notes">
              <span className="no-notes-icon">⌕</span>

              <h3>No notes found</h3>

              <p>
                {filtering
                  ? "Nothing matches. Try another word or clear the filters."
                  : "Try searching with a different topic name."}
              </p>
            </div>
          )}
        </section>
      </main>

      <BottomNavigation />
    </div>
  );
}

export default Notes;