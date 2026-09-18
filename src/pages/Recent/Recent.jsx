import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import subjects from "../../data/subjects";
import "./Recent.css";

 import BottomNavigation from "../../components/layout/BottomNavigation";

function Recent() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [recentNotes, setRecentNotes] = useState(() => {
    try {
      return (
        JSON.parse(
          localStorage.getItem("notes-web-recent")
        ) || []
      );
    } catch {
      return [];
    }
  });


  /* =========================================================
     FIND ACTUAL NOTES FROM SUBJECT DATA
  ========================================================= */

  const notes = useMemo(() => {
    return recentNotes
      .map((recent) => {
        const subject = subjects.find(
          (item) => item.id === recent.subjectId
        );

        if (!subject) {
          return null;
        }

        const note = subject.notes?.find(
          (item) => item.id === recent.noteId
        );

        if (!note) {
          return null;
        }

        return {
          ...note,
          subjectId: subject.id,
          subjectName: subject.name,
          subjectIcon: subject.icon,
          subjectColor: subject.color,
          openedAt: recent.openedAt,
        };
      })
      .filter(Boolean);
  }, [recentNotes]);


  /* =========================================================
     SEARCH
  ========================================================= */

  const filteredNotes = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return notes;
    }

    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query) ||
        note.subjectName.toLowerCase().includes(query)
    );
  }, [notes, search]);


  /* =========================================================
     CLEAR COMPLETE HISTORY
  ========================================================= */

  function clearHistory() {
    localStorage.removeItem("notes-web-recent");

    setRecentNotes([]);

    setSearch("");
  }


  /* =========================================================
     REMOVE ONE RECENT NOTE
  ========================================================= */

  function removeRecent(subjectId, noteId) {
    const updated = recentNotes.filter(
      (item) =>
        !(
          item.subjectId === subjectId &&
          item.noteId === noteId
        )
    );

    localStorage.setItem(
      "notes-web-recent",
      JSON.stringify(updated)
    );

    setRecentNotes(updated);
  }


  /* =========================================================
     OPEN NOTE
  ========================================================= */

  function openNote(subjectId, noteId) {
    navigate(
      `/notes/${subjectId}/${noteId}`
    );
  }


  /* =========================================================
     FORMAT OPENED DATE
  ========================================================= */

  function formatDate(date) {
    if (!date) {
      return "Recently opened";
    }

    const difference =
      Date.now() - new Date(date).getTime();

    const minutes = Math.floor(
      difference / 60000
    );

    if (minutes < 1) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes} min${
        minutes === 1 ? "" : "s"
      } ago`;
    }

    const hours = Math.floor(
      minutes / 60
    );

    if (hours < 24) {
      return `${hours} hour${
        hours === 1 ? "" : "s"
      } ago`;
    }

    const days = Math.floor(
      hours / 24
    );

    if (days < 7) {
      return `${days} day${
        days === 1 ? "" : "s"
      } ago`;
    }

    return new Date(date).toLocaleDateString();
  }


  /* =========================================================
     UI
  ========================================================= */

  return (
    <main className="recent-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="recent-header">

        <div
          className="recent-header-icon"
          aria-hidden="true"
        >
          <span>◷</span>
        </div>

        <div>
          <span className="recent-header-label">
            YOUR ACTIVITY
          </span>

          <h1>Recent Notes</h1>

          <p>
            Continue from where you left off
          </p>
        </div>

      </section>


      {/* =====================================================
          TOOLBAR
      ===================================================== */}

      {notes.length > 0 && (
        <section className="recent-toolbar">

          <div className="recent-search">

            <span
              className="recent-search-icon"
              aria-hidden="true"
            >
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search recent notes..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
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
            className="clear-history-button"
            onClick={clearHistory}
          >
            <span
              className="clear-history-icon"
              aria-hidden="true"
            >
              ×
            </span>

            <span>
              Clear History
            </span>
          </button>

        </section>
      )}


      {/* =====================================================
          NO RECENT NOTES
      ===================================================== */}

      {notes.length === 0 ? (

        <section className="recent-empty">

          <div
            className="recent-empty-icon"
            aria-hidden="true"
          >
            ◷
          </div>

          <h2>No Recent Notes</h2>

          <p>
            Notes you open will appear here so you
            can quickly continue learning.
          </p>

          <button
            type="button"
            className="browse-notes-button"
            onClick={() => navigate("/")}
          >
            <span
              className="browse-notes-icon"
              aria-hidden="true"
            >
              ▤
            </span>

            Browse Notes

            <span aria-hidden="true">
              →
            </span>
          </button>

        </section>


      ) : filteredNotes.length === 0 ? (

        /* ===================================================
           NO SEARCH RESULTS
        =================================================== */

        <section className="recent-no-results">

          <div
            className="recent-no-results-icon"
            aria-hidden="true"
          >
            ⌕
          </div>

          <h2>No notes found</h2>

          <p>
            Try searching with a different note or
            subject name.
          </p>

          <button
            type="button"
            onClick={() => setSearch("")}
          >
            Clear Search
          </button>

        </section>


      ) : (

        /* ===================================================
           RECENT LIST
        =================================================== */

        <section className="recent-list">

          <div className="recent-count">
            {filteredNotes.length}{" "}
            {filteredNotes.length === 1
              ? "note"
              : "notes"}
          </div>


          {filteredNotes.map((note) => (

            <article
              className="recent-card"
              key={`${note.subjectId}-${note.id}`}
              onClick={() =>
                openNote(
                  note.subjectId,
                  note.id
                )
              }
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" ||
                  event.key === " "
                ) {
                  event.preventDefault();

                  openNote(
                    note.subjectId,
                    note.id
                  );
                }
              }}
            >

              {/* Subject Icon */}

              <div
                className="recent-card-icon"
                style={{
                  backgroundColor: `${note.subjectColor}18`,
                  color: note.subjectColor,
                }}
              >
                {note.subjectIcon}
              </div>


              {/* Note Information */}

              <div className="recent-card-content">

                <span className="recent-subject">
                  {note.subjectName}
                </span>

                <h3>
                  {note.title}
                </h3>

                <div className="recent-time">

                  <span
                    className="recent-time-icon"
                    aria-hidden="true"
                  >
                    ◷
                  </span>

                  {formatDate(
                    note.openedAt
                  )}

                </div>

              </div>


              {/* Remove */}

              <button
                type="button"
                className="remove-recent-button"
                onClick={(event) => {
                  event.stopPropagation();

                  removeRecent(
                    note.subjectId,
                    note.id
                  );
                }}
                aria-label={`Remove ${note.title} from recent notes`}
              >
                <span aria-hidden="true">
                  ×
                </span>
              </button>

            </article>

          ))}

        </section>

      )}

        <BottomNavigation />
    </main>

  );
}

export default Recent;