import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import subjects from "../../data/subjects";
import "./Favorites.css";


import BottomNavigation from "../../components/layout/BottomNavigation";

function Favorites() {
  const navigate = useNavigate();

  const [favoriteNotes, setFavoriteNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  function loadFavorites() {
    const savedFavorites = [];

    subjects.forEach((subject) => {
      subject.notes.forEach((note) => {
        const storageKey = `notes-web-favorite-${note.id}`;

        if (localStorage.getItem(storageKey) === "true") {
          savedFavorites.push({
            ...note,
            subjectId: subject.id,
            subjectName: subject.name,
            subjectIcon: subject.icon,
            subjectColor: subject.color,
          });
        }
      });
    });

    setFavoriteNotes(savedFavorites);
  }

  useEffect(() => {
    loadFavorites();
  }, []);

  /*
   * Reload favorites when the user comes back
   * to this page/tab.
   */
  useEffect(() => {
    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        loadFavorites();
      }
    }

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    window.addEventListener("focus", loadFavorites);

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      window.removeEventListener("focus", loadFavorites);
    };
  }, []);

  function removeFavorite(noteId) {
    localStorage.removeItem(
      `notes-web-favorite-${noteId}`
    );

    loadFavorites();
  }

  function clearAllFavorites() {
    favoriteNotes.forEach((note) => {
      localStorage.removeItem(
        `notes-web-favorite-${note.id}`
      );
    });

    setFavoriteNotes([]);
    setSearchTerm("");
  }

  function openNote(note) {
    navigate(
      `/notes/${note.subjectId}/${note.id}`
    );
  }

  const filteredFavorites = favoriteNotes.filter((note) => {
    const search = searchTerm.toLowerCase().trim();

    if (!search) {
      return true;
    }

    return (
      note.title.toLowerCase().includes(search) ||
      note.subjectName.toLowerCase().includes(search)
    );
  });

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
              {favoriteNotes.length === 1
                ? "note"
                : "notes"}{" "}
              saved
            </p>
          </div>

          {favoriteNotes.length > 0 && (
            <button
              type="button"
              className="clear-favorites"
              onClick={clearAllFavorites}
            >
              <span
                className="clear-icon"
                aria-hidden="true"
              >
                ×
              </span>

              Clear all
            </button>
          )}

        </section>


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
              Try searching for another subject or
              note name.
            </p>

            <button
              type="button"
              onClick={() => setSearchTerm("")}
            >
              Clear Search
            </button>

          </section>


        ) : (

          /* =================================================
             FAVORITE LIST
          ================================================= */

          <section className="favorites-list">

            {filteredFavorites.map((note, index) => (

              <article
                className="favorite-card"
                key={`${note.subjectId}-${note.id}`}
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

                    <small>
                      Note {index + 1}
                    </small>

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
                  onClick={() =>
                    removeFavorite(note.id)
                  }
                  aria-label={`Remove ${note.title} from favorites`}
                >
                  <span aria-hidden="true">♥</span>
                </button>

              </article>

            ))}

          </section>

        )}

      </main>

        <BottomNavigation />

    </div>
  );
}

export default Favorites;