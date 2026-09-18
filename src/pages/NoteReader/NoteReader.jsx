import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import subjects from "../../data/subjects";
import {
  getNoteDocumentUrl,
  getNoteIframeTitle,
} from "../../utils/htmlNote";

import "./NoteReader.css";

function NoteReader() {
  const { subjectId, noteId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [noteError, setNoteError] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showTopButton, setShowTopButton] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const [iframeHeight, setIframeHeight] = useState(800);

  /* =========================================================
     FIND SUBJECT
  ========================================================= */

  const subject = subjects.find(
    (item) => item.id === subjectId
  );

  /* =========================================================
     FIND NOTE
  ========================================================= */

  const noteIndex =
    subject?.notes.findIndex(
      (item) => item.id === noteId
    ) ?? -1;

  const note =
    noteIndex >= 0
      ? subject?.notes[noteIndex]
      : null;

  /* =========================================================
     PREVIOUS NOTE
  ========================================================= */

  const previousNote =
    subject && noteIndex > 0
      ? subject.notes[noteIndex - 1]
      : null;

  /* =========================================================
     NEXT NOTE
  ========================================================= */

  const nextNote =
    subject &&
    noteIndex >= 0 &&
    noteIndex < subject.notes.length - 1
      ? subject.notes[noteIndex + 1]
      : null;

  /* =========================================================
     FAVORITE STORAGE KEY
  ========================================================= */

  const favoriteStorageKey = useMemo(
    () => `notes-web-favorite-${noteId}`,
    [noteId]
  );

  /* =========================================================
     READING PROGRESS STORAGE KEY
     
     Every subject + note gets its own progress.
     
     Example:
     notes-web-progress-java-part-01
  ========================================================= */

  const progressStorageKey = useMemo(
    () =>
      `notes-web-progress-${subjectId}-${noteId}`,
    [subjectId, noteId]
  );

  /* =========================================================
     STEP 8.3
     SAVE NOTE TO RECENT HISTORY

     Whenever a valid note is opened:
     - Remove old copy of same note
     - Put latest opening at the top
     - Keep maximum 20 notes
  ========================================================= */

  useEffect(() => {
    if (!subject || !note) {
      return;
    }

    const recentKey = "notes-web-recent";

    try {
      const existing =
        JSON.parse(
          localStorage.getItem(recentKey)
        ) || [];

      const filtered = existing.filter(
        (item) =>
          !(
            item.subjectId === subject.id &&
            item.noteId === note.id
          )
      );

      const updated = [
        {
          subjectId: subject.id,
          noteId: note.id,
          openedAt: new Date().toISOString(),
        },
        ...filtered,
      ].slice(0, 20);

      localStorage.setItem(
        recentKey,
        JSON.stringify(updated)
      );

      console.log(
        "Recent note saved:",
        {
          subjectId: subject.id,
          noteId: note.id,
        }
      );
    } catch (error) {
      console.error(
        "Unable to save recent note:",
        error
      );
    }
  }, [subject, note]);

  /* =========================================================
     LOAD FAVORITE STATUS
  ========================================================= */

  useEffect(() => {
    if (!noteId) {
      return;
    }

    const saved =
      localStorage.getItem(
        favoriteStorageKey
      ) === "true";

    setIsFavorite(saved);
  }, [
    noteId,
    favoriteStorageKey,
  ]);

  /* =========================================================
     STEP 8.5 + 8.6
     
     RESET READER WHEN NOTE CHANGES
     
     AND LOAD SAVED READING PROGRESS
  ========================================================= */

  useEffect(() => {
    setLoading(true);
    setNoteError(false);
    setShowTopButton(false);
    setIframeHeight(800);

    try {
      const savedProgress = Number(
        localStorage.getItem(
          progressStorageKey
        )
      );

      if (
        Number.isFinite(savedProgress)
      ) {
        setReadingProgress(
          Math.min(
            100,
            Math.max(
              0,
              savedProgress
            )
          )
        );
      } else {
        setReadingProgress(0);
      }
    } catch (error) {
      console.error(
        "Unable to load saved reading progress:",
        error
      );

      setReadingProgress(0);
    }

    /*
      We initially move to the top.

      After the iframe loads, we will restore
      the saved position.
    */
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [
    noteId,
    progressStorageKey,
  ]);

  /* =========================================================
     STEP 8.7
     
     READING PROGRESS
     
     - Calculate percentage
     - Save percentage to localStorage
     - Update progress bar
     - Show scroll-to-top button
  ========================================================= */

  useEffect(() => {
    function handleScroll() {
      const scrollTop =
        window.scrollY;

      const documentHeight =
        document.documentElement
          .scrollHeight;

      const availableHeight =
        documentHeight -
        window.innerHeight;

      const progress =
        availableHeight > 0
          ? (scrollTop /
              availableHeight) *
            100
          : 0;

      const safeProgress =
        Math.min(
          100,
          Math.max(
            0,
            progress
          )
        );

      setReadingProgress(
        safeProgress
      );

      /*
        Save reading progress.

        Example:
        72
      */
      try {
        localStorage.setItem(
          progressStorageKey,
          String(
            Math.round(
              safeProgress
            )
          )
        );
      } catch (error) {
        console.error(
          "Unable to save reading progress:",
          error
        );
      }

      setShowTopButton(
        scrollTop > 500
      );
    }

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    handleScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, [
    iframeHeight,
    progressStorageKey,
  ]);

  /* =========================================================
     RESTORE SAVED SCROLL POSITION
     
     This runs after the iframe has loaded.
     
     Example:
     saved progress = 72%
     
     The page scrolls to approximately 72%.
  ========================================================= */

  function restoreReadingPosition() {
    try {
      const savedProgress =
        Number(
          localStorage.getItem(
            progressStorageKey
          )
        );

      if (
        !Number.isFinite(
          savedProgress
        ) ||
        savedProgress <= 0
      ) {
        return;
      }

      /*
        Give the browser a little time to finish
        calculating the iframe/document height.
      */
      setTimeout(() => {
        const documentHeight =
          document.documentElement
            .scrollHeight;

        const availableHeight =
          documentHeight -
          window.innerHeight;

        if (
          availableHeight <= 0
        ) {
          return;
        }

        const safeProgress =
          Math.min(
            100,
            Math.max(
              0,
              savedProgress
            )
          );

        const targetScroll =
          (safeProgress / 100) *
          availableHeight;

        window.scrollTo({
          top: targetScroll,
          behavior: "auto",
        });

        setReadingProgress(
          safeProgress
        );
      }, 150);

      /*
        Second attempt.

        This helps when the iframe/document
        needs additional time to calculate height.
      */
      setTimeout(() => {
        const documentHeight =
          document.documentElement
            .scrollHeight;

        const availableHeight =
          documentHeight -
          window.innerHeight;

        if (
          availableHeight <= 0
        ) {
          return;
        }

        const safeProgress =
          Math.min(
            100,
            Math.max(
              0,
              savedProgress
            )
          );

        const targetScroll =
          (safeProgress / 100) *
          availableHeight;

        window.scrollTo({
          top: targetScroll,
          behavior: "auto",
        });
      }, 500);
    } catch (error) {
      console.error(
        "Unable to restore reading position:",
        error
      );
    }
  }

  /* =========================================================
     IFRAME LOAD
  ========================================================= */

  function handleIframeLoad(
    event
  ) {
    setLoading(false);
    setNoteError(false);

    const iframe =
      event.currentTarget;

    try {
      const iframeDocument =
        iframe.contentDocument ||
        iframe.contentWindow?.document;

      if (!iframeDocument) {
        setIframeHeight(900);

        restoreReadingPosition();

        return;
      }

      const bodyHeight =
        iframeDocument.body
          ?.scrollHeight || 0;

      const documentHeight =
        iframeDocument
          .documentElement
          ?.scrollHeight || 0;

      const height =
        Math.max(
          bodyHeight,
          documentHeight,
          600
        );

      setIframeHeight(
        height + 20
      );

      /*
        Restore saved reading position
        after iframe has loaded.
      */
      restoreReadingPosition();
    } catch (error) {
      console.error(
        "Unable to calculate note height:",
        error
      );

      setIframeHeight(900);

      restoreReadingPosition();
    }
  }

  /* =========================================================
     IFRAME ERROR
  ========================================================= */

  function handleIframeError() {
    setLoading(false);
    setNoteError(true);
  }

  /* =========================================================
     FAVORITE
  ========================================================= */

  function toggleFavorite() {
    const newValue =
      !isFavorite;

    setIsFavorite(
      newValue
    );

    localStorage.setItem(
      favoriteStorageKey,
      String(newValue)
    );
  }

  /* =========================================================
     SHARE
  ========================================================= */

  async function shareNote() {
    if (!note) {
      return;
    }

    const shareData = {
      title:
        getNoteIframeTitle(
          note.title
        ),

      text: `Read ${note.title} on Notes Web`,

      url: window.location.href,
    };

    try {
      /*
        Mobile / supported browsers
      */
      if (
        navigator.share &&
        typeof navigator.share ===
          "function"
      ) {
        await navigator.share(
          shareData
        );

        return;
      }

      /*
        Clipboard fallback
      */
      if (
        navigator.clipboard &&
        typeof navigator
          .clipboard
          .writeText ===
          "function"
      ) {
        await navigator.clipboard.writeText(
          window.location.href
        );

        setShareMessage(
          "Link copied!"
        );

        setTimeout(() => {
          setShareMessage("");
        }, 2000);

        return;
      }

      /*
        Final fallback
      */
      setShareMessage(
        "Copy the URL from your browser"
      );

      setTimeout(() => {
        setShareMessage("");
      }, 2500);
    } catch (error) {
      if (
        error?.name !==
        "AbortError"
      ) {
        console.error(
          "Unable to share note:",
          error
        );
      }
    }
  }

  /* =========================================================
     OPEN PREVIOUS / NEXT NOTE
  ========================================================= */

  function openNote(
    selectedNote
  ) {
    if (!selectedNote) {
      return;
    }

    navigate(
      `/notes/${subjectId}/${selectedNote.id}`
    );
  }

  /* =========================================================
     SCROLL TO TOP
  ========================================================= */

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /* =========================================================
     NOTE NOT FOUND
  ========================================================= */

  if (!subject || !note) {
    return (
      <div className="reader-error-page">
        <div
          className="reader-error-icon"
          aria-hidden="true"
        >
          !
        </div>

        <h1>
          Note Not Found
        </h1>

        <p>
          The note you're looking for
          could not be found.
        </p>

        <button
          type="button"
          onClick={() =>
            navigate(
              subject
                ? `/subjects/${subject.id}`
                : "/subjects"
            )
          }
        >
          Back to Notes
        </button>
      </div>
    );
  }

  /* =========================================================
     NOTE DOCUMENT URL
  ========================================================= */

  const noteUrl =
    getNoteDocumentUrl(
      note.file
    );

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="note-reader-page">

      {/* ===================================================
          READING PROGRESS BAR
      =================================================== */}

      <div
        className="reader-progress-container"
        aria-hidden="true"
      >
        <div
          className="reader-progress-bar"
          style={{
            width: `${readingProgress}%`,
          }}
        />
      </div>

      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="reader-header">

        {/* Back */}

        <button
          type="button"
          className="reader-icon-button"
          onClick={() =>
            navigate(
              `/subjects/${subject.id}`
            )
          }
          aria-label="Back to notes"
        >
          <span aria-hidden="true">
            ←
          </span>
        </button>

        {/* Title */}

        <div className="reader-title">
          <span>
            {subject.name}
          </span>

          <h1>
            {note.title}
          </h1>
        </div>

        {/* Actions */}

        <div className="reader-actions">

          {/* Favorite */}

          <button
            type="button"
            className={`reader-icon-button ${
              isFavorite
                ? "favorite-active"
                : ""
            }`}
            onClick={
              toggleFavorite
            }
            aria-label={
              isFavorite
                ? "Remove from favorites"
                : "Add to favorites"
            }
            aria-pressed={
              isFavorite
            }
          >
            <span aria-hidden="true">
              {isFavorite
                ? "♥"
                : "♡"}
            </span>
          </button>

          {/* Share */}

          <button
            type="button"
            className="reader-icon-button share-button"
            onClick={
              shareNote
            }
            aria-label="Share note"
          >
            <span aria-hidden="true">
              ↗
            </span>
          </button>

          {/* More */}

          <button
            type="button"
            className="reader-icon-button more-button"
            aria-label="More options"
          >
            <span aria-hidden="true">
              ⋮
            </span>
          </button>

        </div>
      </header>

      {/* ===================================================
          SHARE MESSAGE
      =================================================== */}

      {shareMessage && (
        <div
          className="share-message"
          role="status"
          aria-live="polite"
        >
          <span aria-hidden="true">
            ✓
          </span>

          {shareMessage}
        </div>
      )}

      {/* ===================================================
          MAIN
      =================================================== */}

      <main className="reader-main">

        {/* =================================================
            META
        ================================================= */}

        <div className="reader-meta">

          <span>
            Note {noteIndex + 1} of{" "}
            {subject.notes.length}
          </span>

          <span>
            {Math.round(
              readingProgress
            )}
            % read
          </span>

        </div>

        {/* =================================================
            NOTE FRAME
        ================================================= */}

        <section className="note-frame-container">

          {/* Loading */}

          {loading && (
            <div
              className="reader-loading"
              role="status"
              aria-live="polite"
            >
              <div
                className="loading-spinner"
                aria-hidden="true"
              >
                ◌
              </div>

              <p>
                Loading note...
              </p>
            </div>
          )}

          {/* Error */}

          {noteError && (
            <div
              className="reader-error"
              role="alert"
            >
              <div
                className="reader-error-small-icon"
                aria-hidden="true"
              >
                !
              </div>

              <h2>
                Unable to load this note
              </h2>

              <p>
                Please check the note
                file and try again.
              </p>

              <button
                type="button"
                onClick={() =>
                  window.location.reload()
                }
              >
                Try Again
              </button>
            </div>
          )}

          {/* Iframe */}

          {!noteError && (
            <iframe
              className="note-iframe"
              src={noteUrl}
              title={getNoteIframeTitle(
                note.title
              )}
              style={{
                height: `${iframeHeight}px`,
              }}
              onLoad={
                handleIframeLoad
              }
              onError={
                handleIframeError
              }
            />
          )}

        </section>

        {/* =================================================
            PREVIOUS / NEXT
        ================================================= */}

        <section className="reader-navigation">

          {/* Previous */}

          <button
            type="button"
            className="reader-nav-card previous"
            disabled={!previousNote}
            onClick={() =>
              openNote(
                previousNote
              )
            }
          >
            <span
              className="reader-nav-arrow"
              aria-hidden="true"
            >
              ←
            </span>

            <div>
              <span>
                PREVIOUS
              </span>

              <strong>
                {previousNote
                  ? previousNote.title
                  : "No previous note"}
              </strong>
            </div>
          </button>

          {/* Next */}

          <button
            type="button"
            className="reader-nav-card next"
            disabled={!nextNote}
            onClick={() =>
              openNote(
                nextNote
              )
            }
          >
            <div>
              <span>
                NEXT
              </span>

              <strong>
                {nextNote
                  ? nextNote.title
                  : "No next note"}
              </strong>
            </div>

            <span
              className="reader-nav-arrow"
              aria-hidden="true"
            >
              →
            </span>
          </button>

        </section>

      </main>

      {/* ===================================================
          SCROLL TOP
      =================================================== */}

      {showTopButton && (
        <button
          type="button"
          className="scroll-top-button"
          onClick={
            scrollToTop
          }
          aria-label="Scroll to top"
        >
          <span aria-hidden="true">
            ↑
          </span>
        </button>
      )}

    </div>
  );
}

export default NoteReader;