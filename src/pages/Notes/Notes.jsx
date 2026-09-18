import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import subjects from "../../data/subjects";
import "./Notes.css";

import BottomNavigation from "../../components/layout/BottomNavigation";

function Notes() {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const subject = subjects.find(
    (item) => item.id === subjectId
  );

  const filteredNotes = useMemo(() => {
    if (!subject) return [];

    const search = searchTerm.trim().toLowerCase();

    if (!search) {
      return subject.notes;
    }

    return subject.notes.filter((note) =>
      note.title.toLowerCase().includes(search)
    );
  }, [subject, searchTerm]);

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

  return (
    <div className="notes-page">
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

        <section className="notes-list">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note, index) => (
              <button
                type="button"
                className="note-list-item"
                key={note.id}
                onClick={() =>
                  navigate(
                    `/notes/${subject.id}/${note.id}`
                  )
                }
              >
                <div className="note-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="note-list-info">
                  <h3>{note.title}</h3>

                  <span>
                    {subject.name} • Note {index + 1}
                  </span>
                </div>

                <span
                  className="note-list-arrow"
                  aria-hidden="true"
                >
                  ›
                </span>
              </button>
            ))
          ) : (
            <div className="no-notes">
              <span className="no-notes-icon">⌕</span>

              <h3>No notes found</h3>

              <p>
                Try searching with a different topic name.
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