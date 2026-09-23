import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
     TEMPORARY HIGHLIGHTER STATE

     This highlighter no longer touches the note's own
     text/DOM at all. Instead it draws an electric-orange
     "pen stripe" on a transparent overlay layer that sits
     on TOP of the note, styled to look like a real marker
     stroke (angled ends, ink-blend, slightly uneven edges).
     Because nothing about the note's own HTML is changed:

       - it can never re-arrange or reflow the note's text
       - it works exactly the same over images, tables,
         code blocks, or anything else, since the overlay
         does not care what is underneath it
  ========================================================= */

  const [isHighlighterActive, setIsHighlighterActive] =
    useState(false);

  const iframeRef = useRef(null);

  /*
    Bumped every time the iframe finishes loading a
    document. The highlighter effect depends on this so it
    re-installs the overlay + listeners on the FRESH
    document whenever a note (re)loads - navigating the
    iframe destroys anything previously attached to the
    old document.
  */
  const [iframeReloadTick, setIframeReloadTick] =
    useState(0);

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
     STORAGE KEYS
  ========================================================= */

  const favoriteStorageKey = useMemo(
    () => `notes-web-favorite-${noteId}`,
    [noteId]
  );

  const progressStorageKey = useMemo(
    () =>
      `notes-web-progress-${subjectId}-${noteId}`,
    [subjectId, noteId]
  );

  /* =========================================================
     SAVE NOTE TO RECENT HISTORY
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
    } catch (error) {
      console.error(
        "Unable to save recent note:",
        error
      );
    }
  }, [subject, note]);

  /* =========================================================
     LOAD FAVORITE
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
     RESET READER WHEN NOTE CHANGES
  ========================================================= */

  useEffect(() => {
    setLoading(true);
    setNoteError(false);
    setShowTopButton(false);
    setIframeHeight(800);

    /*
      Turn highlighter OFF whenever another note opens.
    */
    setIsHighlighterActive(false);

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

    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [
    noteId,
    progressStorageKey,
  ]);

  /* =========================================================
     READING PROGRESS
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
     RESTORE READING POSITION
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

      const restore = () => {
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
      };

      setTimeout(restore, 150);
      setTimeout(restore, 500);
    } catch (error) {
      console.error(
        "Unable to restore reading position:",
        error
      );
    }
  }

  /* =========================================================
     GET IFRAME DOCUMENT
  ========================================================= */

  function getIframeDocument() {
    const iframe = iframeRef.current;

    if (!iframe) {
      return null;
    }

    try {
      return (
        iframe.contentDocument ||
        iframe.contentWindow?.document ||
        null
      );
    } catch (error) {
      console.error(
        "Unable to access note iframe:",
        error
      );

      return null;
    }
  }

  /* =========================================================
     HIGHLIGHTER PEN (OVERLAY BASED)

     How it works:

     1. A single transparent "overlay" <div> is appended
        on top of the note (position: absolute, covering
        the full scrollable height of the note document).
        It never blocks clicks/selection
        (pointer-events: none) - drawing is driven by
        listeners on the document itself, not the overlay.

     2. While the pen is ON:
          - pointerdown  -> start a new orange marker
            stripe at the cursor position
          - pointermove  -> resize that stripe to follow
            the drag, like dragging a real highlighter pen
          - pointerup    -> finish the stripe. If the user
            simply tapped/clicked (e.g. on a picture,
            where there is no text to drag-select) a small
            default-sized stripe is placed at that point.

     3. Each stripe fades out and is removed after
        5 seconds.

     Because this NEVER edits the note's own HTML - no
     wrapping, no surroundContents, no TreeWalker - it:
       - works identically over plain text, headings,
         tables, code blocks AND images
       - can never shift/reflow the note's own layout
  ========================================================= */

  function installHighlighterStyles(iframeDocument) {
    if (iframeDocument.getElementById("notes-web-highlighter-style")) return;

    const style = iframeDocument.createElement("style");
    style.id = "notes-web-highlighter-style";
    style.textContent = `
      body.nr-pen-mode,
      body.nr-pen-mode * {
        cursor: crosshair !important;
        user-select: none !important;
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        -webkit-touch-callout: none !important;
        touch-action: none !important;
      }

      body.nr-pen-mode ::selection {
        background: transparent !important;
        color: inherit !important;
      }

      .nr-pen-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        pointer-events: none;
        z-index: 2147483000;
        overflow: visible;
      }

      /* ---------------------------------------------------
         ELECTRIC ORANGE MARKER STROKE

         mix-blend-mode: multiply makes the stripe behave
         like real highlighter ink sitting on top of the
         text underneath it (darkens/tints instead of
         flatly covering), and the asymmetric border-radius
         + slight rotation give each stroke a hand-drawn,
         felt-tip look instead of a perfect rectangle.
      --------------------------------------------------- */

      .nr-pen-box {
        position: absolute;
        box-sizing: border-box;
        min-width: 8px;
        min-height: 8px;
        background: linear-gradient(
          90deg,
          rgba(204, 74, 0, 0.62),
          rgba(255, 106, 0, 0.82),
          rgba(204, 74, 0, 0.62)
        );
        border: 1px solid rgba(153, 55, 0, 0.55);
        border-radius: 3px 8px 3px 8px / 8px 3px 8px 3px;
        mix-blend-mode: multiply;
        box-shadow:
          0 1px 3px rgba(120, 45, 0, 0.28),
          inset 0 0 0 1px rgba(255, 255, 255, 0.08),
          inset 0 -3px 5px rgba(140, 50, 0, 0.22);
        opacity: 1;
        transform: translateZ(0) rotate(-0.4deg);
        pointer-events: none;
        will-change: opacity, transform;
        transition: opacity 0.45s ease, transform 0.45s ease;
      }

      .nr-pen-box.nr-pen-drawing {
        background: linear-gradient(
          90deg,
          rgba(179, 64, 0, 0.72),
          rgba(255, 106, 0, 0.92),
          rgba(179, 64, 0, 0.72)
        );
        border-color: rgba(140, 50, 0, 0.65);
        box-shadow:
          0 2px 7px rgba(120, 45, 0, 0.32),
          inset 0 0 0 1px rgba(255, 255, 255, 0.10),
          inset 0 -3px 6px rgba(140, 50, 0, 0.28);
      }

      .nr-pen-box.nr-pen-fade {
        opacity: 0;
        transform: translateY(-1px) scale(0.99) rotate(-0.4deg);
      }
    `;
    (iframeDocument.head || iframeDocument.documentElement).appendChild(style);
  }

  function clearNativeSelection(iframeWindow) {
    try {
      const selection = iframeWindow?.getSelection?.();
      if (selection && selection.rangeCount > 0) {
        selection.removeAllRanges();
      }
    } catch (error) {
      // Selection access can fail briefly in some embedded documents.
    }
  }

  function setupHighlighterPen(iframeDocument, iframeWindow) {
    if (!iframeDocument || !iframeWindow) return;

    installHighlighterStyles(iframeDocument);

    const body =
      iframeDocument.body ||
      iframeDocument.documentElement;

    if (!body) return;

    let overlay =
      iframeDocument.getElementById("nr-pen-overlay");

    if (!overlay) {
      overlay = iframeDocument.createElement("div");
      overlay.id = "nr-pen-overlay";
      overlay.className = "nr-pen-overlay";
      body.appendChild(overlay);
    }

    function refreshOverlayHeight() {
      const height = Math.max(
        iframeDocument.documentElement?.scrollHeight || 0,
        body?.scrollHeight || 0,
        iframeWindow.innerHeight || 0,
        600
      );
      overlay.style.height = `${height}px`;
    }

    refreshOverlayHeight();

    if (iframeDocument.__nrPenAttached) return;
    iframeDocument.__nrPenAttached = true;

    let drawing = false;
    let startX = 0;
    let startY = 0;
    let activeBox = null;

    function getPoint(event) {
      return {
        x: typeof event.pageX === "number" ? event.pageX : event.clientX,
        y: typeof event.pageY === "number" ? event.pageY : event.clientY,
      };
    }

    function preventPenSelection(event) {
      if (!iframeWindow.__notesPenActive) return;
      event.preventDefault();
      event.stopPropagation();
      clearNativeSelection(iframeWindow);
    }

    function startDraw(event) {
      if (!iframeWindow.__notesPenActive) return;

      preventPenSelection(event);
      refreshOverlayHeight();

      const point = getPoint(event);
      drawing = true;
      startX = point.x;
      startY = point.y;

      activeBox = iframeDocument.createElement("div");
      activeBox.className = "nr-pen-box nr-pen-drawing";
      activeBox.style.left = `${startX}px`;
      activeBox.style.top = `${startY - 13}px`;
      activeBox.style.width = "8px";
      activeBox.style.height = "26px";
      overlay.appendChild(activeBox);

      if (
        event.pointerId != null &&
        body.setPointerCapture
      ) {
        try {
          body.setPointerCapture(event.pointerId);
        } catch (error) {}
      }
    }

    function moveDraw(event) {
      if (!drawing || !activeBox || !iframeWindow.__notesPenActive) {
        return;
      }

      preventPenSelection(event);

      const point = getPoint(event);
      const dx = point.x - startX;
      const dy = point.y - startY;
      const left = Math.min(startX, point.x);
      const width = Math.max(Math.abs(dx), 8);

      if (Math.abs(dy) <= 18) {
        activeBox.style.left = `${left}px`;
        activeBox.style.top = `${startY - 13}px`;
        activeBox.style.width = `${width}px`;
        activeBox.style.height = "26px";
      } else {
        activeBox.style.left = `${left}px`;
        activeBox.style.top = `${Math.min(startY, point.y)}px`;
        activeBox.style.width = `${width}px`;
        activeBox.style.height = `${Math.max(Math.abs(dy), 12)}px`;
      }
    }

    function finishDraw() {
      if (!drawing) return;

      drawing = false;
      const finishedBox = activeBox;
      activeBox = null;

      clearNativeSelection(iframeWindow);

      if (!finishedBox) return;

      finishedBox.classList.remove("nr-pen-drawing");

      const width =
        parseFloat(finishedBox.style.width) || 0;

      if (width < 12) {
        finishedBox.style.width = "96px";
        finishedBox.style.height = "26px";
        finishedBox.style.left = `${startX - 48}px`;
        finishedBox.style.top = `${startY - 13}px`;
      }

      iframeWindow.setTimeout(() => {
        finishedBox.classList.add("nr-pen-fade");

        iframeWindow.setTimeout(() => {
          finishedBox.remove();
        }, 500);
      }, 5000);
    }

    function cancelDraw() {
      if (!drawing) return;

      drawing = false;

      if (activeBox) {
        activeBox.remove();
      }

      activeBox = null;
      clearNativeSelection(iframeWindow);
    }

    body.addEventListener("pointerdown", startDraw, { passive: false });
    iframeDocument.addEventListener("pointermove", moveDraw, { passive: false });
    iframeDocument.addEventListener("pointerup", finishDraw, { passive: false });
    iframeDocument.addEventListener("pointercancel", cancelDraw, { passive: false });
    iframeDocument.addEventListener("dragstart", preventPenSelection, { passive: false });
    iframeDocument.addEventListener("selectstart", preventPenSelection, { passive: false });
  }
  /*
    Keep the pen's on/off state - and the crosshair
    cursor cue - in sync with whatever document is
    currently loaded in the iframe.
  */

  useEffect(() => {
    const iframeWindow =
      iframeRef.current?.contentWindow;

    const iframeDocument =
      getIframeDocument();

    if (!iframeWindow || !iframeDocument) {
      return;
    }

    iframeWindow.__notesPenActive =
      isHighlighterActive;

    const body =
      iframeDocument.body ||
      iframeDocument.documentElement;

    if (body) {
      body.classList.toggle(
        "nr-pen-mode",
        isHighlighterActive
      );
    }
  }, [
    isHighlighterActive,
    iframeReloadTick,
  ]);

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

      setupHighlighterPen(
        iframeDocument,
        iframe.contentWindow
      );

      iframe.contentWindow.__notesPenActive =
        isHighlighterActive;

      /*
        Tell the highlighter-sync effect that a
        (possibly new) document is now loaded.
      */
      setIframeReloadTick(
        (tick) => tick + 1
      );

      const bodyHeight =
        iframeDocument.body
          ?.scrollHeight || 0;

      const documentHeight =
        iframeDocument.documentElement
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

      text:
        `Read ${note.title} on Notes Web`,

      url:
        window.location.href,
    };

    try {
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

      if (
        navigator.clipboard &&
        typeof navigator
          .clipboard.writeText ===
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
        }, 2500);

        return;
      }

      setShareMessage(
        "Copy this page URL to share the note."
      );

      setTimeout(() => {
        setShareMessage("");
      }, 3000);
    } catch (error) {
      if (
        error?.name ===
        "AbortError"
      ) {
        return;
      }

      console.error(
        "Unable to share note:",
        error
      );
    }
  }

  /* =========================================================
     OPEN NOTE
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
     SCROLL TOP
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
     NOTE URL
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

      {/* READING PROGRESS */}

      <div
        className="reader-progress-container"
        aria-hidden="true"
      >
        <div
          className="reader-progress-bar"
          style={{
            width:
              `${readingProgress}%`,
          }}
        />
      </div>

      {/* HEADER */}

      <header className="reader-header">

        {/* BACK */}

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

        {/* TITLE */}

        <div className="reader-title">

          <span>
            {subject.name}
          </span>

          <h1>
            {note.title}
          </h1>

        </div>

        {/* ACTIONS */}

        <div className="reader-actions">

          {/* FAVORITE */}

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

          {/* =================================================
              TEMPORARY HIGHLIGHTER
          ================================================= */}

          <button
            type="button"
            className={`reader-icon-button highlighter-button ${
              isHighlighterActive
                ? "highlighter-active"
                : ""
            }`}
            onClick={() =>
              setIsHighlighterActive(
                (current) =>
                  !current
              )
            }
            aria-label={
              isHighlighterActive
                ? "Turn off highlighter"
                : "Turn on highlighter"
            }
            aria-pressed={
              isHighlighterActive
            }
            title={
              isHighlighterActive
                ? "Highlighter on"
                : "Temporary highlighter"
            }
          >
            <span aria-hidden="true">
              🖊️
            </span>
          </button>

          {/* SHARE */}

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

          {/* MORE */}

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

      {/* SHARE MESSAGE */}

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

      {/* MAIN */}

      <main className="reader-main">

        {/* META */}

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

        {/* NOTE FRAME */}

        <section className="note-frame-container">

          {/* LOADING */}

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

          {/* ERROR */}

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

          {/* IFRAME */}

          {!noteError && (
            <iframe
              ref={iframeRef}
              className="note-iframe"
              src={noteUrl}
              title={getNoteIframeTitle(
                note.title
              )}
              style={{
                height:
                  `${iframeHeight}px`,
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

        {/* PREVIOUS / NEXT */}

        <section className="reader-navigation">

          {/* PREVIOUS */}

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

          {/* NEXT */}

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

      {/* SCROLL TOP */}

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