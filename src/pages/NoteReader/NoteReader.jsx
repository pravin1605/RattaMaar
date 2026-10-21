import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import subjects from "../../data/subjects";
import { getNoteDocumentUrl, getNoteIframeTitle } from "../../utils/htmlNote";

import "./NoteReader.css";

/* =========================================================
   CONSTANTS + HELPERS
========================================================= */

const SETTINGS_KEY = "notes-web-reader-settings";
const DEFAULT_SETTINGS = {
  fontSize: "medium",
  width: "comfortable",
  spacing: "comfortable",
};
const FONT_ZOOM = { small: 0.92, medium: 1, large: 1.15 };
const LINE_HEIGHT = { compact: 1.4, comfortable: null, relaxed: 1.9 };
const WORDS_PER_MINUTE = 200;
const HIGHLIGHT_SECONDS = 5;

/* Max number of height changes accepted per layout pass. Stops a
   badly-written note (100vh sections etc.) from growing forever. */
const MAX_HEIGHT_UPDATES = 30;

/* Highlighter colour (R,G,B). Yellow by default. */
const HIGHLIGHT_RGB = "250,204,21";
const HIGHLIGHT_EDGE_RGB = "202,138,4";

const clamp = (n, min = 0, max = 100) => Math.min(max, Math.max(min, n));

/* localStorage that never throws (private mode, quota, blocked). */
const store = {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  },
};

function readSettings() {
  try {
    const saved = JSON.parse(store.get(SETTINGS_KEY));
    return { ...DEFAULT_SETTINGS, ...(saved || {}) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

/* ---------- iframe helpers (all same-origin dependent) ---------- */

function getHeadings(doc) {
  return Array.from(doc.querySelectorAll("h1, h2, h3"))
    .filter((el) => (el.textContent || "").trim())
    .slice(0, 80);
}

/* Reader settings are applied through ONE removable style tag.
   They touch zoom (text size + fit-to-width), paragraph/list
   line-height, and keep images/videos inside the screen.

   The first rule is the "reach the bottom" fix:
   - no inner scrollbars (the page scrolls, not the iframe)
   - height:auto / min-height:0 so 100vh layouts cannot feed the
     iframe height back into itself and grow forever. */
function applyReaderSettings(doc, settings, fit = 1) {
  let el = doc.getElementById("notes-web-reader-settings");
  if (!el) {
    el = doc.createElement("style");
    el.id = "notes-web-reader-settings";
    (doc.head || doc.documentElement).appendChild(el);
  }
  const zoom = Math.round((FONT_ZOOM[settings.fontSize] ?? 1) * fit * 1000) / 1000;
  const lineHeight = LINE_HEIGHT[settings.spacing];
  el.textContent =
    "html,body{overflow-y:hidden !important;min-height:0 !important;height:auto !important;}" +
    "img,video{max-width:100%;height:auto;}" +
    (zoom !== 1 ? `body{zoom:${zoom};}` : "") +
    (lineHeight
      ? `p,li,dd,blockquote{line-height:${lineHeight} !important;}`
      : "");
}

/* Lays the note out for the CURRENT iframe width and returns its
   true content height. The iframe is collapsed first so the height
   can shrink again (rotation to landscape, smaller text, etc.).
   Collapsing can make the browser clamp the page scroll, so the
   scroll position is saved and restored around the measurement. */
function layoutAndMeasure(iframe, doc, win, settings, onScrollFix) {
  const savedY = window.scrollY;
  const previousHeight = iframe.style.height;
  iframe.style.height = "0px";

  applyReaderSettings(doc, settings, 1);

  const root = doc.documentElement;
  const clientWidth = root.clientWidth;
  const scrollWidth = root.scrollWidth;
  let fit = 1;
  if (clientWidth > 0 && scrollWidth > clientWidth + 1) {
    fit = clamp(clientWidth / scrollWidth, 0.4, 1);
  }
  if (fit < 1) applyReaderSettings(doc, settings, fit);

  /* Real bottom of the content (covers zoom rounding / last margins). */
  const bodyBottom = doc.body
    ? Math.ceil(doc.body.getBoundingClientRect().bottom + (win.scrollY || 0))
    : 0;

  const height =
    Math.max(
      Math.ceil(root.scrollHeight),
      Math.ceil(doc.body ? doc.body.scrollHeight : 0),
      bodyBottom,
      300
    ) + 2; /* small buffer so the last line is never clipped */

  iframe.style.height = previousHeight;

  /* Put the page scroll back if collapsing the iframe moved it. */
  if (Math.abs(window.scrollY - savedY) > 1) {
    onScrollFix?.();
    window.scrollTo({ top: savedY, behavior: "auto" });
  }
  return height;
}

/* =========================================================
   TEMPORARY HIGHLIGHTER (overlay based, does not edit the note)
   Returns a cleanup function that removes every listener,
   timer and element it created.
========================================================= */

const PEN_STYLE = `
  body.nr-pen-mode, body.nr-pen-mode * {
    cursor: crosshair !important;
    user-select: none !important;
    -webkit-user-select: none !important;
    -webkit-touch-callout: none !important;
    touch-action: none !important;
  }
  body.nr-pen-mode ::selection { background: transparent !important; }
  .nr-pen-overlay {
    position: absolute; top: 0; left: 0; width: 100%;
    pointer-events: none; z-index: 2147483000; overflow: visible;
  }
  .nr-pen-box {
    position: absolute; box-sizing: border-box; min-width: 8px; min-height: 8px;
    background: linear-gradient(90deg, rgba(${HIGHLIGHT_RGB},.55), rgba(${HIGHLIGHT_RGB},.8), rgba(${HIGHLIGHT_RGB},.55));
    border: 1px solid rgba(${HIGHLIGHT_EDGE_RGB},.45);
    border-radius: 3px 8px 3px 8px / 8px 3px 8px 3px;
    mix-blend-mode: multiply;
    box-shadow: 0 1px 3px rgba(${HIGHLIGHT_EDGE_RGB},.25);
    transform: translateZ(0) rotate(-0.4deg);
    pointer-events: none;
    transition: opacity .45s ease, transform .45s ease;
  }
  .nr-pen-box.nr-pen-drawing {
    background: linear-gradient(90deg, rgba(${HIGHLIGHT_RGB},.7), rgba(${HIGHLIGHT_RGB},.9), rgba(${HIGHLIGHT_RGB},.7));
  }
  .nr-pen-box.nr-pen-fade { opacity: 0; transform: translateY(-1px) scale(.99) rotate(-0.4deg); }
`;

function attachHighlighter(doc, win) {
  const body = doc.body;
  if (!body) return () => {};

  if (!doc.getElementById("notes-web-highlighter-style")) {
    const style = doc.createElement("style");
    style.id = "notes-web-highlighter-style";
    style.textContent = PEN_STYLE;
    (doc.head || doc.documentElement).appendChild(style);
  }

  /* Overlay lives on <html>, outside <body>, so body zoom never skews it. */
  const overlay = doc.createElement("div");
  overlay.id = "nr-pen-overlay";
  overlay.className = "nr-pen-overlay";
  doc.documentElement.appendChild(overlay);

  const timers = new Set();
  const later = (fn, ms) => {
    const id = win.setTimeout(() => {
      timers.delete(id);
      fn();
    }, ms);
    timers.add(id);
  };

  /* The overlay is absolutely positioned and must NEVER add to the
     scrollable height of the note, so it is sized from the body only. */
  const refreshHeight = () => {
    overlay.style.height = `${Math.max(
      body.scrollHeight,
      body.getBoundingClientRect().height,
      300
    )}px`;
  };
  refreshHeight();

  let drawing = false;
  let startX = 0;
  let startY = 0;
  let activeBox = null;

  const point = (e) => ({
    x: typeof e.pageX === "number" ? e.pageX : e.clientX,
    y: typeof e.pageY === "number" ? e.pageY : e.clientY,
  });

  const clearSelection = () => {
    try {
      win.getSelection?.()?.removeAllRanges();
    } catch {
      /* selection can be briefly unavailable */
    }
  };

  const block = (e) => {
    if (!win.__notesPenActive) return;
    e.preventDefault();
    e.stopPropagation();
    clearSelection();
  };

  const onDown = (e) => {
    if (!win.__notesPenActive) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;

    block(e);
    refreshHeight();

    const p = point(e);
    drawing = true;
    startX = p.x;
    startY = p.y;

    activeBox = doc.createElement("div");
    activeBox.className = "nr-pen-box nr-pen-drawing";
    Object.assign(activeBox.style, {
      left: `${startX}px`,
      top: `${startY - 13}px`,
      width: "8px",
      height: "26px",
    });
    overlay.appendChild(activeBox);

    if (e.pointerId != null && body.setPointerCapture) {
      try {
        body.setPointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    }
  };

  const onMove = (e) => {
    if (!drawing || !activeBox || !win.__notesPenActive) return;
    block(e);

    const p = point(e);
    const dy = p.y - startY;
    const left = Math.min(startX, p.x);
    const width = Math.max(Math.abs(p.x - startX), 8);

    activeBox.style.left = `${left}px`;
    activeBox.style.width = `${width}px`;
    if (Math.abs(dy) <= 18) {
      activeBox.style.top = `${startY - 13}px`;
      activeBox.style.height = "26px";
    } else {
      activeBox.style.top = `${Math.min(startY, p.y)}px`;
      activeBox.style.height = `${Math.max(Math.abs(dy), 12)}px`;
    }
  };

  const onUp = () => {
    if (!drawing) return;
    drawing = false;
    const box = activeBox;
    activeBox = null;
    clearSelection();
    if (!box) return;

    box.classList.remove("nr-pen-drawing");

    /* A simple tap places a default-size stripe (useful on images). */
    if ((parseFloat(box.style.width) || 0) < 12) {
      Object.assign(box.style, {
        width: "96px",
        height: "26px",
        left: `${startX - 48}px`,
        top: `${startY - 13}px`,
      });
    }

    later(() => {
      box.classList.add("nr-pen-fade");
      later(() => box.remove(), 500);
    }, HIGHLIGHT_SECONDS * 1000);
  };

  const onCancel = () => {
    if (!drawing) return;
    drawing = false;
    activeBox?.remove();
    activeBox = null;
    clearSelection();
  };

  const opts = { passive: false };
  body.addEventListener("pointerdown", onDown, opts);
  doc.addEventListener("pointermove", onMove, opts);
  doc.addEventListener("pointerup", onUp, opts);
  doc.addEventListener("pointercancel", onCancel, opts);
  doc.addEventListener("dragstart", block, opts);
  doc.addEventListener("selectstart", block, opts);

  return () => {
    body.removeEventListener("pointerdown", onDown, opts);
    doc.removeEventListener("pointermove", onMove, opts);
    doc.removeEventListener("pointerup", onUp, opts);
    doc.removeEventListener("pointercancel", onCancel, opts);
    doc.removeEventListener("dragstart", block, opts);
    doc.removeEventListener("selectstart", block, opts);
    timers.forEach((id) => win.clearTimeout(id));
    timers.clear();
    overlay.remove();
    body.classList.remove("nr-pen-mode");
  };
}

/* =========================================================
   SMALL REUSABLE COMPONENTS
========================================================= */

function ReaderPanel({ title, onClose, children }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  return (
    <>
      <div className="reader-backdrop" onClick={onClose} aria-hidden="true" />
      <aside className="reader-panel" role="dialog" aria-label={title}>
        <div className="reader-panel-head">
          <h2>{title}</h2>
          <button
            ref={closeRef}
            type="button"
            className="reader-panel-close"
            onClick={onClose}
            aria-label={`Close ${title}`}
          >
            ✕
          </button>
        </div>
        <div className="reader-panel-body">{children}</div>
      </aside>
    </>
  );
}

function Segmented({ label, value, options, onChange }) {
  return (
    <div className="seg-group">
      <span className="seg-label" id={`seg-${label}`}>
        {label}
      </span>
      <div className="seg" role="radiogroup" aria-labelledby={`seg-${label}`}>
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={value === opt.value}
            className={value === opt.value ? "is-selected" : ""}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ReaderMenu({ open, onToggle, onClose, items }) {
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onPointer = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) onClose();
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open, onClose]);

  return (
    <div className="reader-menu-wrap" ref={wrapRef}>
      <button
        type="button"
        className="reader-icon-button more-button"
        onClick={onToggle}
        aria-label="More options"
        aria-haspopup="menu"
        aria-expanded={open}
        title="More options"
      >
        <span aria-hidden="true">⋮</span>
      </button>

      {open && (
        <div className="reader-menu" role="menu">
          {items
            .filter((item) => !item.hidden)
            .map((item) => (
              <button
                key={item.label}
                type="button"
                role="menuitem"
                className={`reader-menu-item ${item.compactOnly ? "menu-compact-only" : ""}`}
                onClick={() => {
                  onClose();
                  item.onSelect();
                }}
              >
                <span aria-hidden="true">{item.icon}</span>
                {item.label}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   NOTE READER
========================================================= */

function NoteReader() {
  const { subjectId, noteId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [noteError, setNoteError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showTopButton, setShowTopButton] = useState(false);
  const [toast, setToast] = useState("");
  const [iframeHeight, setIframeHeight] = useState(800);
  const [isHighlighterActive, setIsHighlighterActive] = useState(false);
  const [iframeReloadTick, setIframeReloadTick] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [panel, setPanel] = useState(null); // "settings" | "toc" | "shortcuts"
  const [settings, setSettings] = useState(readSettings);
  const [toc, setToc] = useState([]);
  const [readMinutes, setReadMinutes] = useState(null);
  const [storageOk, setStorageOk] = useState(true);
  const [isLandscapeLocked, setIsLandscapeLocked] = useState(false);

  const iframeRef = useRef(null);
  const frameRef = useRef(null);
  const headerRef = useRef(null);
  const docCleanupRef = useRef(null);
  const relayoutRef = useRef(null);
  const progressRef = useRef(0);
  const canSaveRef = useRef(false);
  const userScrolledRef = useRef(false);
  const programmaticScrollRef = useRef(0);
  const restoreTimersRef = useRef([]);
  const toastTimerRef = useRef(null);
  const settingsRef = useRef(settings);
  const keyHandlerRef = useRef(() => {});

  settingsRef.current = settings;

  /* ---------- data lookup ---------- */

  const subject = subjects.find((item) => item.id === subjectId);
  const notes = subject?.notes || [];
  const noteIndex = notes.findIndex((item) => item.id === noteId);
  const note = noteIndex >= 0 ? notes[noteIndex] : null;
  const previousNote = noteIndex > 0 ? notes[noteIndex - 1] : null;
  const nextNote =
    noteIndex >= 0 && noteIndex < notes.length - 1
      ? notes[noteIndex + 1]
      : null;

  /* Storage keys: unchanged, compatible with Home and other pages. */
  const favoriteStorageKey = useMemo(
    () => `notes-web-favorite-${noteId}`,
    [noteId]
  );
  const progressStorageKey = useMemo(
    () => `notes-web-progress-${subjectId}-${noteId}`,
    [subjectId, noteId]
  );
  const completedStorageKey = useMemo(
    () => `notes-web-completed-${subjectId}-${noteId}`,
    [subjectId, noteId]
  );

  const showToast = useCallback((text, ms = 2500) => {
    setToast(text);
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(""), ms);
  }, []);

  /* ---------- storage availability ---------- */

  useEffect(() => {
    const ok = store.set("notes-web-storage-test", "1");
    store.remove("notes-web-storage-test");
    setStorageOk(ok);
  }, []);

  /* ---------- recent history (deduplicated) ---------- */

  useEffect(() => {
    if (!subject || !note) return;
    try {
      const existing = JSON.parse(store.get("notes-web-recent")) || [];
      const filtered = existing.filter(
        (item) =>
          !(item.subjectId === subject.id && item.noteId === note.id)
      );
      store.set(
        "notes-web-recent",
        JSON.stringify(
          [
            {
              subjectId: subject.id,
              noteId: note.id,
              openedAt: new Date().toISOString(),
            },
            ...filtered,
          ].slice(0, 20)
        )
      );
    } catch (error) {
      console.error("Unable to save recent note:", error);
    }
  }, [subject, note]);

  /* ---------- reset reader whenever the note changes ---------- */

  useEffect(() => {
    setLoading(true);
    setNoteError(false);
    setShowTopButton(false);
    setIframeHeight(800);
    setIsHighlighterActive(false);
    setPanel(null);
    setMenuOpen(false);
    setToc([]);
    setReadMinutes(null);
    setIsFavorite(store.get(favoriteStorageKey) === "true");
    setCompleted(store.get(completedStorageKey) === "true");

    const saved = Number(store.get(progressStorageKey));
    const initial = Number.isFinite(saved) ? clamp(saved) : 0;
    progressRef.current = initial;
    setReadingProgress(initial);

    canSaveRef.current = false;
    userScrolledRef.current = false;
    restoreTimersRef.current.forEach(clearTimeout);
    restoreTimersRef.current = [];

    programmaticScrollRef.current = performance.now();
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [noteId, subjectId, favoriteStorageKey, completedStorageKey, progressStorageKey]);

  /* ---------- give up on a note that never finishes loading ---------- */

  useEffect(() => {
    if (!loading) return undefined;
    const id = setTimeout(() => {
      setNoteError(true);
      setLoading(false);
    }, 20000);
    return () => clearTimeout(id);
  }, [loading, reloadKey, noteId]);

  /* ---------- reading progress ----------
     0%   = top of the note sits just under the sticky header
     100% = bottom of the note reaches the bottom of the screen */

  const getHeaderHeight = () => headerRef.current?.offsetHeight || 70;

  const computeProgress = useCallback(() => {
    const el = frameRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const headerH = headerRef.current?.offsetHeight || 70;
    const viewH = window.innerHeight;
    const max = rect.height - (viewH - headerH);
    if (max <= 0) return rect.bottom <= viewH + 2 ? 100 : 0;
    return clamp(((headerH - rect.top) / max) * 100);
  }, []);

  /* Scroll so that the note is at `percent` read. */
  function scrollToProgress(percent) {
    const el = frameRef.current;
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    const headerH = getHeaderHeight();
    const max = rect.height - (window.innerHeight - headerH);
    if (max <= 0) return false;

    programmaticScrollRef.current = performance.now();
    window.scrollTo({
      top: Math.max(
        0,
        window.scrollY + rect.top - headerH + (percent / 100) * max
      ),
      behavior: "auto",
    });
    return true;
  }

  useEffect(() => {
    let frameId = 0;
    let saveTimer = 0;

    const writeProgress = () => {
      saveTimer = 0;
      if (!canSaveRef.current) return;
      /* A note that reached 100% stays counted as complete elsewhere
         (Home stats). "Reset reading progress" clears it. */
      if (Number(store.get(progressStorageKey)) >= 100 && progressRef.current < 100) {
        return;
      }
      store.set(progressStorageKey, String(Math.round(progressRef.current)));
    };

    const update = () => {
      frameId = 0;
      const p = computeProgress();
      progressRef.current = p;
      setReadingProgress(p);
      setShowTopButton(window.scrollY > 500);
      if (canSaveRef.current) {
        clearTimeout(saveTimer);
        saveTimer = setTimeout(writeProgress, 500);
      }
    };

    const onScroll = () => {
      if (performance.now() - programmaticScrollRef.current > 250) {
        userScrolledRef.current = true;
        canSaveRef.current = true;
      }
      if (!frameId) frameId = requestAnimationFrame(update);
    };

    /* Resize only re-measures. It must NOT count as the user scrolling. */
    const onResizeOnly = () => {
      if (!frameId) frameId = requestAnimationFrame(update);
    };

    const flush = () => {
      if (saveTimer) {
        clearTimeout(saveTimer);
        writeProgress();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResizeOnly, { passive: true });
    window.addEventListener("pagehide", flush);
    onResizeOnly();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResizeOnly);
      window.removeEventListener("pagehide", flush);
      if (frameId) cancelAnimationFrame(frameId);
      flush();
    };
  }, [progressStorageKey, computeProgress, iframeHeight]);

  /* ---------- keep position when the phone is rotated ---------- */

  useEffect(() => {
    let timer = 0;
    let anchor = null;
    let lastWidth = window.innerWidth;

    const onResize = () => {
      if (window.innerWidth === lastWidth) return; /* address bar only */
      lastWidth = window.innerWidth;

      if (anchor === null) {
        anchor = progressRef.current;
        canSaveRef.current = false;
      }

      clearTimeout(timer);
      timer = setTimeout(() => {
        relayoutRef.current?.();
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            if (anchor !== null && anchor >= 1) scrollToProgress(anchor);
            anchor = null;
            canSaveRef.current = true;
          })
        );
      }, 250);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- restore saved position ---------- */

  function scheduleRestore() {
    const saved = Number(store.get(progressStorageKey));

    /* Nothing meaningful to restore: start saving straight away. */
    if (!Number.isFinite(saved) || saved <= 2 || saved >= 99) {
      canSaveRef.current = true;
      return;
    }

    let announced = false;
    const apply = () => {
      if (userScrolledRef.current) return;
      if (!scrollToProgress(saved)) return;
      if (!announced) {
        announced = true;
        showToast("Last position restored");
      }
    };

    /* Images and fonts can change the height after load, so retry. */
    restoreTimersRef.current = [
      setTimeout(apply, 150),
      setTimeout(apply, 600),
      setTimeout(apply, 1200),
      setTimeout(() => {
        canSaveRef.current = true;
      }, 1300),
    ];
  }

  /* ---------- iframe document access ---------- */

  function getIframeDocument() {
    try {
      const iframe = iframeRef.current;
      return iframe?.contentDocument || iframe?.contentWindow?.document || null;
    } catch {
      return null;
    }
  }

  /* ---------- iframe load ---------- */

  function handleIframeLoad(event) {
    const iframe = event.currentTarget;

    docCleanupRef.current?.();
    docCleanupRef.current = null;

    let doc = null;
    let win = null;
    try {
      doc = iframe.contentDocument;
      win = iframe.contentWindow;
    } catch {
      doc = null;
    }

    /* Cross-origin note: we cannot measure or enhance it. */
    if (!doc || !win) {
      setLoading(false);
      setIframeHeight(900);
      scheduleRestore();
      return;
    }

    /* A missing file often falls back to the app's own index.html. */
    if (!doc.body || doc.getElementById("root")) {
      setLoading(false);
      setNoteError(true);
      return;
    }

    const cleanups = [];

    /* Highlighter overlay + listeners. */
    cleanups.push(attachHighlighter(doc, win));
    win.__notesPenActive = false;

    /* Keyboard shortcuts also work while the note has focus. */
    const onKey = (e) => keyHandlerRef.current(e);
    doc.addEventListener("keydown", onKey);
    cleanups.push(() => doc.removeEventListener("keydown", onKey));

    /* Layout (settings + fit to width) and height.
       - at most ONE measure per animation frame
       - the scroll position is preserved around every measure
       - the number of accepted height changes is capped so a
         misbehaving note can never grow the iframe forever. */
    let updates = 0;
    let raf = 0;

    const measure = () => {
      const next = layoutAndMeasure(
        iframe,
        doc,
        win,
        settingsRef.current,
        () => {
          programmaticScrollRef.current = performance.now();
        }
      );
      setIframeHeight((current) =>
        Math.abs(current - next) > 3 && updates++ < MAX_HEIGHT_UPDATES
          ? next
          : current
      );
    };

    const measureSoon = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        measure();
      });
    };

    relayoutRef.current = () => {
      updates = 0;
      measure();
    };
    cleanups.push(() => {
      relayoutRef.current = null;
      if (raf) cancelAnimationFrame(raf);
    });
    measure();

    const RO = win.ResizeObserver || window.ResizeObserver;
    if (RO) {
      const observer = new RO(measureSoon);
      observer.observe(doc.body);
      cleanups.push(() => observer.disconnect());
    }

    /* Images finishing late change the height. */
    const onImgLoad = () => {
      updates = 0;
      measureSoon();
    };
    doc.addEventListener("load", onImgLoad, true);
    cleanups.push(() => doc.removeEventListener("load", onImgLoad, true));

    /* One more measure after fonts finish loading. */
    if (doc.fonts?.ready) {
      doc.fonts.ready.then(() => {
        updates = 0;
        measureSoon();
      });
    }

    /* Table of contents + reading time (only from real content). */
    setToc(
      getHeadings(doc).map((el) => ({
        text: el.textContent.trim().replace(/\s+/g, " "),
        level: Number(el.tagName.slice(1)),
      }))
    );
    const words = (doc.body.innerText || "")
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;
    setReadMinutes(words >= 50 ? Math.max(1, Math.round(words / WORDS_PER_MINUTE)) : null);

    docCleanupRef.current = () => cleanups.forEach((fn) => fn());

    setIframeReloadTick((tick) => tick + 1);
    setLoading(false);
    setNoteError(false);
    scheduleRestore();
  }

  function handleIframeError() {
    setLoading(false);
    setNoteError(true);
  }

  /* Keep highlighter state in sync with the loaded document. */
  useEffect(() => {
    const doc = getIframeDocument();
    const win = iframeRef.current?.contentWindow;
    if (!doc || !win) return;
    win.__notesPenActive = isHighlighterActive;
    (doc.body || doc.documentElement)?.classList.toggle(
      "nr-pen-mode",
      isHighlighterActive
    );
  }, [isHighlighterActive, iframeReloadTick]);

  /* Apply + persist reading settings. */
  useEffect(() => {
    store.set(SETTINGS_KEY, JSON.stringify(settings));
    relayoutRef.current?.();
  }, [settings, iframeReloadTick]);

  /* ---------- landscape / rotate ---------- */

  useEffect(() => {
    const onFsChange = () => {
      if (!document.fullscreenElement) {
        setIsLandscapeLocked(false);
        try {
          window.screen?.orientation?.unlock?.();
        } catch {
          /* ignore */
        }
      }
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  async function toggleLandscape() {
    const orientation = window.screen?.orientation;
    try {
      if (!isLandscapeLocked) {
        if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        }
        if (!orientation?.lock) throw new Error("no-orientation-lock");
        await orientation.lock("landscape");
        setIsLandscapeLocked(true);
        showToast("Landscape mode on");
      } else {
        orientation?.unlock?.();
        if (document.fullscreenElement) await document.exitFullscreen();
        setIsLandscapeLocked(false);
        showToast("Landscape mode off");
      }
    } catch {
      try {
        if (document.fullscreenElement) await document.exitFullscreen();
      } catch {
        /* ignore */
      }
      setIsLandscapeLocked(false);
      showToast("Can't force rotation here. Turn on auto-rotate and turn your phone sideways.", 4000);
    }
  }

  /* Full cleanup on unmount. */
  useEffect(
    () => () => {
      docCleanupRef.current?.();
      restoreTimersRef.current.forEach(clearTimeout);
      clearTimeout(toastTimerRef.current);
      try {
        window.screen?.orientation?.unlock?.();
        if (document.fullscreenElement) document.exitFullscreen();
      } catch {
        /* ignore */
      }
    },
    []
  );

  /* =========================================================
     ACTIONS
  ========================================================= */

  function toggleFavorite() {
    const next = !isFavorite;
    setIsFavorite(next);
    if (!store.set(favoriteStorageKey, String(next))) {
      showToast("Couldn't save favorite in this browser");
    }
  }

  function toggleCompleted() {
    const next = !completed;
    setCompleted(next);
    store.set(completedStorageKey, String(next));
    if (next) {
      store.set(progressStorageKey, "100");
      showToast("Marked as completed");
    } else {
      store.set(
        progressStorageKey,
        String(Math.round(Math.min(progressRef.current, 99)))
      );
      showToast("Completion cleared");
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("Link copied");
    } catch {
      showToast("Copy this page's URL from the address bar");
    }
  }

  async function shareNote() {
    if (!note) return;
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({
          title: getNoteIframeTitle(note.title),
          text: `Read ${note.title} on Notes Web`,
          url: window.location.href,
        });
        return;
      }
      await copyLink();
    } catch (error) {
      if (error?.name === "AbortError") return; /* user cancelled */
      showToast("Couldn't share this note");
    }
  }

  function resetProgress() {
    store.remove(progressStorageKey);
    progressRef.current = 0;
    setReadingProgress(0);
    canSaveRef.current = true;
    programmaticScrollRef.current = performance.now();
    window.scrollTo({ top: 0, behavior: "smooth" });
    showToast("Reading progress reset");
  }

  function retryLoad() {
    setNoteError(false);
    setLoading(true);
    setReloadKey((key) => key + 1);
  }

  function openNote(target) {
    if (target) navigate(`/notes/${subjectId}/${target.id}`);
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function scrollToHeading(index) {
    const doc = getIframeDocument();
    const el = doc ? getHeadings(doc)[index] : null;
    const frame = frameRef.current;
    if (!el || !frame) return;

    const top =
      window.scrollY +
      frame.getBoundingClientRect().top +
      el.getBoundingClientRect().top -
      (getHeaderHeight() + 14);
    setPanel(null);
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }

  function togglePanel(name) {
    setMenuOpen(false);
    setPanel((current) => (current === name ? null : name));
  }

  function updateSetting(key, value) {
    setSettings((current) => ({ ...current, [key]: value }));
  }

  /* ---------- keyboard shortcuts ---------- */

  keyHandlerRef.current = (e) => {
    const target = e.target;
    if (
      e.ctrlKey ||
      e.metaKey ||
      e.altKey ||
      /^(INPUT|TEXTAREA|SELECT)$/.test(target?.tagName || "") ||
      target?.isContentEditable
    ) {
      return;
    }

    switch (e.key.toLowerCase()) {
      case "escape":
        if (panel || menuOpen) {
          setPanel(null);
          setMenuOpen(false);
        } else if (isHighlighterActive) {
          setIsHighlighterActive(false);
        }
        break;
      case "h":
        setIsHighlighterActive((current) => !current);
        break;
      case "f":
        toggleFavorite();
        break;
      case "p":
        openNote(previousNote);
        break;
      case "n":
        openNote(nextNote);
        break;
      case "t":
        togglePanel("toc");
        break;
      case "s":
        togglePanel("settings");
        break;
      case "r":
        toggleLandscape();
        break;
      case "?":
        togglePanel("shortcuts");
        break;
      default:
    }
  };

  useEffect(() => {
    const onKey = (e) => keyHandlerRef.current(e);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* =========================================================
     NOT FOUND
  ========================================================= */

  if (!subject || !note) {
    return (
      <div className="reader-error-page">
        <div className="reader-error-icon" aria-hidden="true">
          !
        </div>
        <h1>Note not found</h1>
        <p>
          The note you're looking for could not be found. It may have been
          moved or the link may be incorrect.
        </p>
        <button
          type="button"
          className="reader-btn"
          onClick={() =>
            navigate(subject ? `/subjects/${subject.id}` : "/subjects")
          }
        >
          {subject ? `Back to ${subject.name}` : "Browse subjects"}
        </button>
      </div>
    );
  }

  const noteUrl = getNoteDocumentUrl(note.file);
  const progressRounded = Math.round(readingProgress);
  const reachedEnd = readingProgress >= 98;

  const menuItems = [
    { label: "Copy note link", icon: "⧉", onSelect: copyLink },
    { label: "Share", icon: "↗", onSelect: shareNote, compactOnly: true },
    { label: "Contents", icon: "☰", onSelect: () => togglePanel("toc"), compactOnly: true },
    {
      label: isLandscapeLocked ? "Exit landscape mode" : "Rotate to landscape",
      icon: "⟲",
      onSelect: toggleLandscape,
    },
    { label: "Reading settings", icon: "Aa", onSelect: () => togglePanel("settings") },
    { label: "Reset reading progress", icon: "↺", onSelect: resetProgress },
    { label: "Retry loading note", icon: "⟳", onSelect: retryLoad, hidden: !noteError },
    { label: "Keyboard shortcuts", icon: "⌨", onSelect: () => togglePanel("shortcuts") },
  ];

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="note-reader-page" data-width={settings.width}>
      {/* PROGRESS BAR */}
      <div
        className="reader-progress-container"
        role="progressbar"
        aria-label="Reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progressRounded}
      >
        <div
          className="reader-progress-bar"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* HEADER */}
      <header className="reader-header" ref={headerRef}>
        <button
          type="button"
          className="reader-icon-button"
          onClick={() => navigate(`/subjects/${subject.id}`)}
          aria-label={`Back to ${subject.name}`}
          title={`Back to ${subject.name}`}
        >
          <span aria-hidden="true">←</span>
        </button>

        <div className="reader-title">
          <nav className="reader-crumb" aria-label="Breadcrumb">
            <button
              type="button"
              onClick={() => navigate(`/subjects/${subject.id}`)}
            >
              {subject.name}
            </button>
            <span aria-hidden="true">/</span>
            <span>Note {noteIndex + 1}</span>
          </nav>
          <h1>{note.title}</h1>
        </div>

        <div className="reader-actions">
          <button
            type="button"
            className={`reader-icon-button ${isFavorite ? "favorite-active" : ""}`}
            onClick={toggleFavorite}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            aria-pressed={isFavorite}
            title={isFavorite ? "Remove from favorites (F)" : "Add to favorites (F)"}
          >
            <span aria-hidden="true">{isFavorite ? "♥" : "♡"}</span>
          </button>

          <button
            type="button"
            className={`reader-icon-button highlighter-button ${
              isHighlighterActive ? "highlighter-active" : ""
            }`}
            onClick={() => setIsHighlighterActive((current) => !current)}
            aria-label={
              isHighlighterActive ? "Turn off highlighter" : "Turn on highlighter"
            }
            aria-pressed={isHighlighterActive}
            title={
              isHighlighterActive
                ? "Highlighter on (H or Esc to turn off)"
                : "Highlighter (H)"
            }
          >
            <span aria-hidden="true">🖊️</span>
          </button>

          <button
            type="button"
            className="reader-icon-button toc-button"
            onClick={() => togglePanel("toc")}
            aria-label="Table of contents"
            aria-expanded={panel === "toc"}
            title="Contents (T)"
          >
            <span aria-hidden="true">☰</span>
          </button>

          <button
            type="button"
            className="reader-icon-button share-button"
            onClick={shareNote}
            aria-label="Share note"
            title="Share"
          >
            <span aria-hidden="true">↗</span>
          </button>

          <ReaderMenu
            open={menuOpen}
            onToggle={() => setMenuOpen((open) => !open)}
            onClose={() => setMenuOpen(false)}
            items={menuItems}
          />
        </div>
      </header>

      {/* TOAST */}
      {toast && (
        <div className="reader-toast" role="status" aria-live="polite">
          <span aria-hidden="true">✓</span>
          {toast}
        </div>
      )}

      {/* PANELS */}
      {panel === "settings" && (
        <ReaderPanel title="Reading settings" onClose={() => setPanel(null)}>
          <Segmented
            label="Text size"
            value={settings.fontSize}
            onChange={(v) => updateSetting("fontSize", v)}
            options={[
              { value: "small", label: "Small" },
              { value: "medium", label: "Medium" },
              { value: "large", label: "Large" },
            ]}
          />
          <Segmented
            label="Content width"
            value={settings.width}
            onChange={(v) => updateSetting("width", v)}
            options={[
              { value: "comfortable", label: "Comfortable" },
              { value: "wide", label: "Wide" },
            ]}
          />
          <Segmented
            label="Line spacing"
            value={settings.spacing}
            onChange={(v) => updateSetting("spacing", v)}
            options={[
              { value: "compact", label: "Compact" },
              { value: "comfortable", label: "Default" },
              { value: "relaxed", label: "Relaxed" },
            ]}
          />
          <p className="panel-note">
            Theme follows your app's light or dark setting. Notes keep their
            own page colors.
          </p>
          <button
            type="button"
            className="reader-btn reader-btn-ghost"
            onClick={() => setSettings({ ...DEFAULT_SETTINGS })}
          >
            Reset to defaults
          </button>
        </ReaderPanel>
      )}

      {panel === "toc" && (
        <ReaderPanel title="Contents" onClose={() => setPanel(null)}>
          {toc.length === 0 ? (
            <p className="panel-note">
              No headings were found in this note, so there is no table of
              contents to show.
            </p>
          ) : (
            <ul className="toc-list">
              {toc.map((item, index) => (
                <li key={`${index}-${item.text}`} data-level={item.level}>
                  <button type="button" onClick={() => scrollToHeading(index)}>
                    {item.text}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </ReaderPanel>
      )}

      {panel === "shortcuts" && (
        <ReaderPanel title="Keyboard shortcuts" onClose={() => setPanel(null)}>
          <dl className="shortcut-list">
            {[
              ["P / N", "Previous / next note"],
              ["H", "Highlighter on / off"],
              ["F", "Favorite"],
              ["T", "Contents"],
              ["S", "Reading settings"],
              ["R", "Rotate to landscape"],
              ["?", "This list"],
              ["Esc", "Close panel or turn off highlighter"],
            ].map(([keys, label]) => (
              <div key={keys}>
                <dt>
                  <kbd>{keys}</kbd>
                </dt>
                <dd>{label}</dd>
              </div>
            ))}
          </dl>
        </ReaderPanel>
      )}

      {/* MAIN */}
      <main className="reader-main">
        {!storageOk && (
          <p className="reader-storage-warning" role="note">
            Your browser is blocking local storage, so favorites, progress and
            settings won't be saved.
          </p>
        )}

        <div className="reader-meta">
          <span>
            Note {noteIndex + 1} of {notes.length}
            {readMinutes ? ` · about ${readMinutes} min read` : ""}
          </span>
          {completed ? (
            <span className="meta-done">✓ Completed</span>
          ) : (
            <span>{progressRounded}% read</span>
          )}
        </div>

        <section className="note-frame-container" ref={frameRef}>
          {loading && (
            <div className="reader-loading" role="status" aria-live="polite">
              <div className="loading-spinner" aria-hidden="true">
                ◌
              </div>
              <p>Loading note…</p>
            </div>
          )}

          {noteError && (
            <div className="reader-error" role="alert">
              <div className="reader-error-small-icon" aria-hidden="true">
                !
              </div>
              <h2>This note couldn't be loaded</h2>
              <p>
                The file may be missing or your connection may have dropped.
                Try again, or go back to the subject.
              </p>
              <div className="reader-error-actions">
                <button type="button" className="reader-btn" onClick={retryLoad}>
                  Try again
                </button>
                <button
                  type="button"
                  className="reader-btn reader-btn-ghost"
                  onClick={() => navigate(`/subjects/${subject.id}`)}
                >
                  Back to {subject.name}
                </button>
              </div>
            </div>
          )}

          {!noteError && (
            <iframe
              key={`${noteId}-${reloadKey}`}
              ref={iframeRef}
              className="note-iframe"
              src={noteUrl}
              scrolling="no"
              title={getNoteIframeTitle(note.title)}
              style={{ height: `${iframeHeight}px` }}
              onLoad={handleIframeLoad}
              onError={handleIframeError}
            />
          )}
        </section>

        {/* COMPLETION */}
        {!noteError && (
          <section className={`reader-complete ${completed ? "is-done" : ""}`}>
            <p>
              {completed
                ? "You've completed this note."
                : reachedEnd
                ? "You've reached the end of this note."
                : "Finished reading this note?"}
            </p>
            <button
              type="button"
              className={`reader-btn ${completed ? "reader-btn-ghost" : ""}`}
              onClick={toggleCompleted}
              aria-pressed={completed}
            >
              {completed ? "Undo" : "Mark as completed"}
            </button>
          </section>
        )}

        {/* PREVIOUS / NEXT */}
        <nav className="reader-navigation" aria-label="Note navigation">
          <button
            type="button"
            className="reader-nav-card previous"
            disabled={!previousNote}
            onClick={() => openNote(previousNote)}
            aria-label={
              previousNote
                ? `Previous note: ${previousNote.title}`
                : "No previous note"
            }
          >
            <span className="reader-nav-arrow" aria-hidden="true">
              ←
            </span>
            <div>
              <span>PREVIOUS</span>
              <strong>
                {previousNote ? previousNote.title : "You're at the first note"}
              </strong>
            </div>
          </button>

          <button
            type="button"
            className="reader-nav-card next"
            disabled={!nextNote}
            onClick={() => openNote(nextNote)}
            aria-label={
              nextNote ? `Next note: ${nextNote.title}` : "No next note"
            }
          >
            <div>
              <span>NEXT</span>
              <strong>
                {nextNote ? nextNote.title : "You're at the last note"}
              </strong>
            </div>
            <span className="reader-nav-arrow" aria-hidden="true">
              →
            </span>
          </button>
        </nav>

        <div className="reader-back-row">
          <button
            type="button"
            className="reader-link"
            onClick={() => navigate(`/subjects/${subject.id}`)}
          >
            ← Back to {subject.name}
          </button>
        </div>
      </main>

      {showTopButton && (
        <button
          type="button"
          className="scroll-top-button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <span aria-hidden="true">↑</span>
        </button>
      )}
    </div>
  );
}

export default NoteReader;