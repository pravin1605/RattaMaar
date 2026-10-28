import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import BottomNavigation from "../../components/layout/BottomNavigation";

import subjects from "../../data/subjects";
import { getReadingStats } from "../../utils/readingStats";
import { getSubjectAccent } from "../../utils/subjectAccent";
import {
  getNoteProgress,
  getRecentList,
  readPreference,
  writePreference,
} from "../../utils/progressStore";

import "./Subjects.css";
import "./SubjectsExtras.css";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "progress", label: "In progress" },
  { id: "new", label: "Not started" },
  { id: "done", label: "Completed" },
];

const SORTS = [
  { id: "default", label: "Default order" },
  { id: "az", label: "A → Z" },
  { id: "notes", label: "Most notes" },
  { id: "progress", label: "Most progress" },
];

const VIEW_KEY = "notes-web-subjects-view";

function Ring({ percent, size = 64, children }) {
  return (
    <div
      className="sx-ring"
      style={{ "--pct": `${percent}%`, width: size, height: size }}
      role="img"
      aria-label={`${percent}% complete`}
    >
      <span>{children}</span>
    </div>
  );
}

function Subjects() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("default");
  const [view, setView] = useState(() =>
    readPreference(VIEW_KEY, "grid") === "list" ? "list" : "grid"
  );

  /* Progress is read once per visit (the page remounts on navigation). */
  const data = useMemo(() => {
    const items = subjects.map((subject, order) => {
      const total = subject.notes.length;
      let done = 0;
      let started = 0;
      let sum = 0;
      subject.notes.forEach((note) => {
        const p = getNoteProgress(subject.id, note.id);
        sum += p;
        if (p >= 100) done += 1;
        else if (p > 0) started += 1;
      });
      const percent = total ? Math.round(sum / total) : 0;
      let status = "new";
      if (total && done === total) status = "done";
      else if (done || started || percent > 0) status = "progress";
      return { subject, order, total, done, started, percent, status };
    });

    const totalNotes = items.reduce((n, i) => n + i.total, 0);
    const doneNotes = items.reduce((n, i) => n + i.done, 0);
    const overall = totalNotes
      ? Math.round(items.reduce((n, i) => n + i.percent * i.total, 0) / totalNotes)
      : 0;

    let resume = null;
    const latest = getRecentList()[0];
    if (latest) {
      const subject = subjects.find((s) => s.id === latest.subjectId);
      const note = subject?.notes.find((n) => n.id === latest.noteId);
      if (subject && note) {
        resume = { subject, note, percent: getNoteProgress(subject.id, note.id) };
      }
    }

    return { items, totalNotes, doneNotes, overall, resume, stats: getReadingStats() };
  }, []);

  const visible = useMemo(() => {
    const search = query.trim().toLowerCase();
    let list = data.items.filter((item) => {
      if (filter !== "all" && item.status !== filter) return false;
      if (!search) return true;
      return (
        item.subject.name.toLowerCase().includes(search) ||
        (item.subject.description || "").toLowerCase().includes(search) ||
        item.subject.notes.some((n) => n.title.toLowerCase().includes(search))
      );
    });
    list = [...list];
    if (sort === "az") list.sort((a, b) => a.subject.name.localeCompare(b.subject.name));
    if (sort === "notes") list.sort((a, b) => b.total - a.total);
    if (sort === "progress") list.sort((a, b) => b.percent - a.percent);
    return list;
  }, [data.items, query, filter, sort]);

  const counts = useMemo(() => {
    const c = { all: data.items.length, progress: 0, new: 0, done: 0 };
    data.items.forEach((i) => {
      c[i.status] += 1;
    });
    return c;
  }, [data.items]);

  function changeView(next) {
    setView(next);
    writePreference(VIEW_KEY, next);
  }

  function clearAll() {
    setQuery("");
    setFilter("all");
    setSort("default");
  }

  const filtering = query.trim() || filter !== "all";

  return (
    <div className="subjects-page">
      <header className="subjects-header">
        <div>
          <span className="subjects-label">LEARN</span>
          <h1>All Subjects</h1>
          <p>
            {subjects.length} subjects • {data.totalNotes} notes
          </p>
        </div>

        <div className="subjects-header-icon">
          <span className="subjects-header-icon-symbol">▤</span>
        </div>
      </header>

      <main className="subjects-content">
        {/* ---------- progress hero ---------- */}
        <section className="sx-hero" aria-label="Your overall progress">
          <Ring percent={data.overall} size={78}>
            <strong>{data.overall}%</strong>
          </Ring>

          <div className="sx-hero-text">
            <h2>
              {data.overall === 0
                ? "Ready to start learning?"
                : data.overall >= 100
                ? "Everything completed! 🎉"
                : "Keep the momentum going"}
            </h2>
            <p>
              {data.doneNotes} of {data.totalNotes} notes finished
            </p>
            <div className="sx-chips-row">
              <span className="sx-pill">🔥 {data.stats.streak}-day streak</span>
              <span className="sx-pill">
                🎯 {data.stats.weekDone}/{data.stats.goal} this week
              </span>
            </div>
          </div>
        </section>

        {/* ---------- continue where you left off ---------- */}
        {data.resume && (
          <button
            type="button"
            className="sx-resume"
            style={{
              "--c-from": getSubjectAccent(data.resume.subject.id).from,
              "--c-to": getSubjectAccent(data.resume.subject.id).to,
            }}
            onClick={() =>
              navigate(`/notes/${data.resume.subject.id}/${data.resume.note.id}`)
            }
          >
            <span className="sx-resume-icon" aria-hidden="true">
              {data.resume.subject.icon}
            </span>
            <span className="sx-resume-body">
              <small>CONTINUE WHERE YOU LEFT OFF</small>
              <strong>{data.resume.note.title}</strong>
              <span className="sx-resume-bar">
                <i style={{ width: `${data.resume.percent}%` }} />
              </span>
            </span>
            <span className="sx-resume-go" aria-hidden="true">
              {data.resume.percent}% ▸
            </span>
          </button>
        )}

        {/* ---------- search + controls ---------- */}
        <div className="sx-search">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            placeholder="Search subjects or topics…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search subjects or topics"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        <div className="sx-controls">
          <div className="sx-filters" role="tablist" aria-label="Filter subjects">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={filter === f.id}
                className={`sx-filter ${filter === f.id ? "is-active" : ""}`}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
                <b>{counts[f.id]}</b>
              </button>
            ))}
          </div>

          <div className="sx-tools">
            <label className="sx-sort">
              <span className="sx-visually-hidden">Sort subjects</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="sx-view" role="group" aria-label="Layout">
              <button
                type="button"
                className={view === "grid" ? "is-active" : ""}
                aria-pressed={view === "grid"}
                aria-label="Grid view"
                onClick={() => changeView("grid")}
              >
                ▦
              </button>
              <button
                type="button"
                className={view === "list" ? "is-active" : ""}
                aria-pressed={view === "list"}
                aria-label="List view"
                onClick={() => changeView("list")}
              >
                ☰
              </button>
            </div>
          </div>
        </div>

        <p className="sx-result-count" aria-live="polite">
          {visible.length} of {subjects.length} subjects
          {filtering && (
            <button type="button" onClick={clearAll}>
              Clear filters
            </button>
          )}
        </p>

        {/* ---------- subject cards ---------- */}
        {visible.length > 0 ? (
          <div className={`subjects-grid ${view === "list" ? "is-list" : ""}`}>
            {visible.map((item, index) => {
              const { subject } = item;
              const accent = getSubjectAccent(subject.id);
              return (
                <button
                  type="button"
                  className={`subject-item sx-card status-${item.status}`}
                  key={subject.id}
                  style={{
                    "--c-from": accent.from,
                    "--c-to": accent.to,
                    "--i": Math.min(index, 12),
                  }}
                  onClick={() => navigate(`/subjects/${subject.id}`)}
                >
                  <div className={`subject-icon ${subject.color}`}>
                    {subject.icon}
                  </div>

                  <div className="subject-info">
                    <h2>{subject.name}</h2>
                    <p>{subject.description}</p>

                    <div className="sx-card-meta">
                      <span className="note-count">
                        {item.total} {item.total === 1 ? "note" : "notes"}
                      </span>
                      <span className={`sx-status sx-status-${item.status}`}>
                        {item.status === "done" && "✓ Completed"}
                        {item.status === "progress" &&
                          `${item.done}/${item.total} done`}
                        {item.status === "new" && "New"}
                      </span>
                    </div>

                    <div className="sx-card-bar" aria-hidden="true">
                      <i style={{ width: `${item.percent}%` }} />
                    </div>
                  </div>

                  <Ring percent={item.percent} size={44}>
                    <small>{item.percent}%</small>
                  </Ring>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="sx-empty">
            <span aria-hidden="true">🔍</span>
            <h3>No subjects match</h3>
            <p>Try a different word, or clear the filters.</p>
            <button type="button" onClick={clearAll}>
              Show all subjects
            </button>
          </div>
        )}
      </main>

      {/* MOBILE NAVIGATION */}
      <BottomNavigation />
    </div>
  );
}

export default Subjects;