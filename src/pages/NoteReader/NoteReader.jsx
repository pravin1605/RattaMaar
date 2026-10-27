import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import subjects from "../../data/subjects";
import {
  applyNoteLayoutCss,
  getNoteDocumentUrl,
  getNoteIframeTitle,
  isNoteDocumentEmpty,
  markAdaptiveElements,
  measureNaturalWidth,
  measureNoteHeight,
} from "../../utils/htmlNote";

import "./NoteReader.css";
import "./ReaderExtras.css";
import {
  BookmarkRail,
  Celebration,
  FloatingToolbar,
  ImageLightbox,
  NotesPanelBody,
  PenColors,
  ProgressRing,
  SectionPill,
  penRgb,
} from "./ReaderExtras";
import { accentStyle } from "../../utils/subjectAccent";
import {
  getReadingStats,
  recordCompletion,
  recordReadingDay,
} from "../../utils/readingStats";
import { applyReadingTheme, attachNoteEnhancements } from "../../utils/noteEnhance";

/* =========================================================
   CONSTANTS + HELPERS
========================================================= */

const SETTINGS_KEY = "notes-web-reader-settings";
const DEFAULT_SETTINGS = {
  fontSize: "medium",
  width: "comfortable",
  spacing: "comfortable",
  layout: "auto",
  theme: "app",
  font: "note",
  penColor: "orange",
  swipe: true,
};
const THEME_OPTIONS = ["app", "sepia", "amoled", "midnight"];
const FONT_OPTIONS = ["note", "inter", "merriweather", "lora", "dyslexic"];
const PEN_IDS = ["orange", "yellow", "green", "pink", "blue"];
const LAYOUT_OPTIONS = [
  { value: "auto", label: "Automatic layout", short: "Auto" },
  { value: "portrait", label: "Portrait-friendly layout", short: "Portrait" },
  { value: "landscape", label: "Landscape-friendly layout", short: "Landscape" },
  { value: "fit", label: "Fit note to width", short: "Fit width" },
];
const SHORT_NOTE_DWELL_MS = 2000;
const MIN_FIT_ZOOM = 0.3;
const FONT_ZOOM = { small: 0.92, medium: 1, large: 1.15 };
const LINE_HEIGHT = { compact: 1.4, comfortable: null, relaxed: 1.9 };
const WORDS_PER_MINUTE = 200;
const HIGHLIGHT_SECONDS = 5;

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
    const merged = { ...DEFAULT_SETTINGS, ...(saved || {}) };
    if (!LAYOUT_OPTIONS.some((o) => o.value === merged.layout)) {
      merged.layout = DEFAULT_SETTINGS.layout;
    }
    if (!THEME_OPTIONS.includes(merged.theme)) merged.theme = "app";
    if (!FONT_OPTIONS.includes(merged.font)) merged.font = "note";
    if (!PEN_IDS.includes(merged.penColor)) merged.penColor = "orange";
    merged.swipe = merged.swipe !== false;
    return merged;
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

/* Reader settings are applied through ONE removable style tag, and
   only touch zoom and paragraph/list line-height. Nothing else in
   the note's own formatting is overridden. */
function applyReaderSettings(doc, settings, fitZoom = 1) {
  let el = doc.getElementById("notes-web-reader-settings");
  if (!el) {
    el = doc.createElement("style");
    el.id = "notes-web-reader-settings";
    (doc.head || doc.documentElement).appendChild(el);
  }
  const zoom = Math.round((FONT_ZOOM[settings.fontSize] ?? 1) * fitZoom * 1000) / 1000;
  const lineHeight = LINE_HEIGHT[settings.spacing];
  el.textContent =
    (zoom !== 1 ? `body{zoom:${zoom};}` : "") +
    (lineHeight
      ? `p,li,dd,blockquote{line-height:${lineHeight} !important;}`
      : "");
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
    --pen-rgb: 255,106,0;
    background: linear-gradient(90deg, rgba(var(--pen-rgb),.62), rgba(var(--pen-rgb),.86), rgba(var(--pen-rgb),.62));
    border: 1px solid rgba(var(--pen-rgb),.7);
    border-radius: 3px 8px 3px 8px / 8px 3px 8px 3px;
    mix-blend-mode: multiply;
    box-shadow: 0 1px 3px rgba(var(--pen-rgb),.35), inset 0 -3px 5px rgba(0,0,0,.14);
    transform: translateZ(0) rotate(-0.4deg);
    pointer-events: none;
    transition: opacity .45s ease, transform .45s ease;
  }
  .nr-pen-box.nr-pen-drawing {
    background: linear-gradient(90deg, rgba(var(--pen-rgb),.72), rgba(var(--pen-rgb),.95), rgba(var(--pen-rgb),.72));
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

  const refreshHeight = () => {
    overlay.style.height = `${Math.max(
      doc.documentElement.scrollHeight,
      body.scrollHeight,
      win.innerHeight || 0,
      600
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
    if (win.__notesPenRgb) activeBox.style.setProperty("--pen-rgb", win.__notesPenRgb);
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
            .map((item) =>
              item.heading ? (
                <div
                  key={item.heading}
                  className="reader-menu-heading"
                  role="presentation"
                >
                  {item.heading}
                </div>
              ) : (
                <button
                  key={item.label}
                  type="button"
                  role={item.checked === undefined ? "menuitem" : "menuitemradio"}
                  aria-checked={item.checked === undefined ? undefined : item.checked}
                  className={`reader-menu-item ${
                    item.compactOnly ? "menu-compact-only" : ""
                  } ${item.checked ? "is-checked" : ""}`}
                  onClick={() => {
                    onClose();
                    item.onSelect();
                  }}
                >
                  <span aria-hidden="true">{item.checked ? "✓" : item.icon}</span>
                  {item.label}
                </button>
              )
            )}
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
  const [noteEmpty, setNoteEmpty] = useState(false);
  const [isLandscape, setIsLandscape] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth > window.innerHeight : false
  );
  const [orientationLocked, setOrientationLocked] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [zoomImage, setZoomImage] = useState(null);
  const [celebrate, setCelebrate] = useState(false);
  const [sectionTitle, setSectionTitle] = useState("");
  const [annotations, setAnnotations] = useState([]);
  const [stats, setStats] = useState(() => getReadingStats());

  const iframeRef = useRef(null);
  const frameRef = useRef(null);
  const docCleanupRef = useRef(null);
  const progressRef = useRef(0);
  const canSaveRef = useRef(false);
  const userScrolledRef = useRef(false);
  const programmaticScrollRef = useRef(0);
  const restoreTimersRef = useRef([]);
  const toastTimerRef = useRef(null);
  const settingsRef = useRef(settings);
  const loadingRef = useRef(true);
  const keyHandlerRef = useRef(() => {});
  const headerRef = useRef(null);
  const recalcRef = useRef(() => {});
  const relayoutRef = useRef(() => {});
  const reflowRef = useRef(false);
  const reflowTimerRef = useRef(0);
  const lastWidthRef = useRef(typeof window !== "undefined" ? window.innerWidth : 0);
  const dwellTimerRef = useRef(0);
  const dwellDoneRef = useRef(false);
  const enteredFullscreenRef = useRef(false);
  const lastLayoutRef = useRef("");
  const anchorRef = useRef({ until: 0, percent: 0 });
  const celebratedRef = useRef(false);
  const prevProgressRef = useRef(0);
  const swipeRef = useRef(() => {});
  const leaveTimerRef = useRef(0);

  settingsRef.current = settings;
  loadingRef.current = loading;

  /* Short fade-out before leaving the reader (skipped for users who
     prefer reduced motion). */
  const go = (path) => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) {
      navigate(path);
      return;
    }
    setLeaving(true);
    clearTimeout(leaveTimerRef.current);
    leaveTimerRef.current = setTimeout(() => navigate(path), 170);
  };

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
  const annotationsKey = useMemo(
    () => `notes-web-annotations-${subjectId}-${noteId}`,
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
    setNoteEmpty(false);
    setLeaving(false);
    setZoomImage(null);
    setCelebrate(false);
    setSectionTitle("");
    prevProgressRef.current = 0;
    celebratedRef.current = Number(store.get(progressStorageKey)) >= 100;
    try {
      const saved = JSON.parse(store.get(annotationsKey));
      setAnnotations(Array.isArray(saved) ? saved : []);
    } catch {
      setAnnotations([]);
    }
    setIsFavorite(store.get(favoriteStorageKey) === "true");
    const wasCompleted = store.get(completedStorageKey) === "true";
    setCompleted(wasCompleted);
    /* Home counts a note as finished when its progress is 100. If the
       progress record was cleared (Settings) but the explicit
       completion record survived, bring them back in line. */
    if (wasCompleted && Number(store.get(progressStorageKey)) !== 100) {
      store.set(progressStorageKey, "100");
    }

    clearTimeout(dwellTimerRef.current);
    dwellDoneRef.current = false;
    reflowRef.current = false;
    clearTimeout(reflowTimerRef.current);

    const saved = Number(store.get(progressStorageKey));
    const initial = Number.isFinite(saved) ? clamp(saved) : 0;
    progressRef.current = initial;
    setReadingProgress(initial);

    canSaveRef.current = false;
    userScrolledRef.current = false;
    restoreTimersRef.current.forEach(clearTimeout);
    restoreTimersRef.current = [];

    programmaticScrollRef.current = performance.now();
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [noteId, subjectId, favoriteStorageKey, completedStorageKey, progressStorageKey, annotationsKey]);

  /* ---------- give up on a note that never finishes loading ---------- */

  useEffect(() => {
    if (!loading) return undefined;
    const id = setTimeout(() => {
      setNoteError(true);
      setLoading(false);
    }, 20000);
    return () => clearTimeout(id);
  }, [loading, reloadKey, noteId]);

  /* ---------- reading progress (based on the note frame itself) ---------- */

  /* Geometry of the note frame relative to the visible reading area.
     The reading area starts under the sticky header and ends at the
     bottom of the viewport. 0% = the top of the note is just under the
     header; 100% = the last line of the note is at the viewport bottom.
     Headers, meta row, completion box and previous/next cards sit
     outside the frame, so they never count. */
  const getReadGeometry = useCallback(() => {
    const el = frameRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const headerBottom = Math.max(
      0,
      headerRef.current ? headerRef.current.getBoundingClientRect().bottom : 0
    );
    const viewHeight = window.visualViewport?.height || window.innerHeight;
    const range = rect.height - (viewHeight - headerBottom);
    return { rect, headerBottom, range };
  }, []);

  /* Returns a 0-100 number, or null when the note fits on one screen. */
  const computeProgress = useCallback(() => {
    const g = getReadGeometry();
    if (!g) return 0;
    if (g.range <= 2) return null;
    const p = clamp(((g.headerBottom - g.rect.top) / g.range) * 100);
    return p >= 99 ? 100 : p;
  }, [getReadGeometry]);

  /* Scroll position (window) that corresponds to a progress value. */
  const scrollTopForProgress = useCallback(
    (percent) => {
      const g = getReadGeometry();
      if (!g || g.range <= 2) return null;
      return window.scrollY + g.rect.top - g.headerBottom + (percent / 100) * g.range;
    },
    [getReadGeometry]
  );

  useEffect(() => {
    let frameId = 0;
    let saveTimer = 0;
    let lastSaved = Number(store.get(progressStorageKey));

    const writeProgress = () => {
      saveTimer = 0;
      if (!canSaveRef.current || reflowRef.current) return;
      const next = Math.round(progressRef.current);
      /* A note that reached 100% stays counted as complete elsewhere
         (Home stats). "Reset reading progress" clears it. */
      if (Number(store.get(progressStorageKey)) >= 100 && next < 100) return;
      if (Number.isFinite(lastSaved) && lastSaved === next) return;
      if (store.set(progressStorageKey, String(next))) lastSaved = next;
    };

    const queueSave = () => {
      if (!canSaveRef.current || reflowRef.current) return;
      clearTimeout(saveTimer);
      saveTimer = setTimeout(writeProgress, 500);
    };

    /* Recalculate from the current geometry. This never counts as a
       user scroll, so layout changes cannot corrupt saved progress. */
    const update = () => {
      frameId = 0;
      setShowTopButton(window.scrollY > 500);
      if (reflowRef.current) return; /* geometry is mid-change */

      const p = computeProgress();
      if (p === null) {
        /* Whole note is visible without scrolling: starts at 0, and
           counts as read after it has stayed on screen briefly. */
        if (!dwellTimerRef.current && !dwellDoneRef.current && !loadingRef.current) {
          dwellTimerRef.current = setTimeout(() => {
            dwellTimerRef.current = 0;
            dwellDoneRef.current = true;
            update();
          }, SHORT_NOTE_DWELL_MS);
        }
        const shown = dwellDoneRef.current ? 100 : 0;
        progressRef.current = shown;
        setReadingProgress(shown);
        if (dwellDoneRef.current) queueSave();
        return;
      }

      clearTimeout(dwellTimerRef.current);
      dwellTimerRef.current = 0;
      /* Until the saved position has been restored the frame sits at
         the top, so keep showing the saved value instead of 0. */
      if (!canSaveRef.current && !userScrolledRef.current) return;
      progressRef.current = p;
      setReadingProgress(p);
      queueSave();
    };

    const schedule = () => {
      if (!frameId) frameId = requestAnimationFrame(update);
    };

    const onScroll = () => {
      if (reflowRef.current) return;
      if (performance.now() - programmaticScrollRef.current > 250) {
        userScrolledRef.current = true;
        canSaveRef.current = true;
      }
      schedule();
    };

    const flush = () => {
      if (saveTimer) {
        clearTimeout(saveTimer);
        writeProgress();
      }
    };

    recalcRef.current = schedule;

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", flush);
    schedule();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", flush);
      if (frameId) cancelAnimationFrame(frameId);
      flush();
      clearTimeout(saveTimer);
      clearTimeout(dwellTimerRef.current);
      dwellTimerRef.current = 0;
    };
  }, [progressStorageKey, computeProgress]);

  /* Height changes (images, fonts, reflow) re-run the calculation
     without being treated as the reader scrolling. */
  useEffect(() => {
    const anchor = anchorRef.current;
    if (performance.now() < anchor.until && anchor.percent > 0 && anchor.percent < 100) {
      const top = scrollTopForProgress(anchor.percent);
      if (top !== null) {
        programmaticScrollRef.current = performance.now();
        window.scrollTo({ top: Math.max(0, top), behavior: "instant" });
      }
    }
    recalcRef.current();
  }, [iframeHeight, scrollTopForProgress]);

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
      const top = scrollTopForProgress(saved);
      if (top === null) return;

      programmaticScrollRef.current = performance.now();
      window.scrollTo({ top: Math.max(0, top), behavior: "instant" });

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
        recalcRef.current();
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

    /* A zero-byte / contentless file: show a clear message instead of
       a blank page that looks like a layout bug. */
    if (isNoteDocumentEmpty(doc)) {
      docCleanupRef.current = () => cleanups.forEach((fn) => fn());
      setNoteEmpty(true);
      setLoading(false);
      setNoteError(false);
      canSaveRef.current = false;
      return;
    }
    setNoteEmpty(false);

    /* Code bars + colours, callouts, folding, image zoom, swipe. */
    cleanups.push(
      attachNoteEnhancements(doc, win, {
        onZoomImage: setZoomImage,
        onSwipe: (direction) => swipeRef.current(direction),
      })
    );
    recordReadingDay();
    setStats(getReadingStats());

    /* Responsive layer + reading settings + height. ONE scheduler
       coalesces every trigger (load, resize, fonts, images,
       observer) into at most one pass per animation frame. */
    let rafId = 0;
    let trailingTimer = 0;
    let lastWidth = -1;
    const changeLog = [];

    const layoutPass = () => {
      rafId = 0;
      const { layout, ...rest } = settingsRef.current;
      const width = doc.documentElement.clientWidth;
      const widthChanged = width !== lastWidth;
      lastWidth = width;

      applyNoteLayoutCss(doc, layout);
      applyReaderSettings(doc, { ...rest, layout }, 1);
      applyReadingTheme(doc, settingsRef.current);
      if (layout === "fit") {
        const natural = measureNaturalWidth(doc);
        const fit = natural > width + 1 ? Math.max(MIN_FIT_ZOOM, width / natural) : 1;
        applyReaderSettings(doc, { ...rest, layout }, fit);
      }
      if (widthChanged || layout !== lastLayoutRef.current) {
        markAdaptiveElements(doc, layout);
        lastLayoutRef.current = layout;
      }

      const next = measureNoteHeight(doc, win);
      const now = performance.now();
      while (changeLog.length && now - changeLog[0] > 1000) changeLog.shift();

      setIframeHeight((current) => {
        if (Math.abs(current - next) <= 2) return current;
        /* Loop guard: if the height keeps changing many times a
           second, stop for a moment and take one trailing measurement. */
        if (changeLog.length >= 15) {
          clearTimeout(trailingTimer);
          trailingTimer = win.setTimeout(request, 1000);
          return current;
        }
        changeLog.push(now);
        return next;
      });
    };

    function request() {
      if (!rafId) rafId = win.requestAnimationFrame(layoutPass);
    }
    relayoutRef.current = request;

    layoutPass();

    const RO = win.ResizeObserver || window.ResizeObserver;
    if (RO) {
      const observer = new RO(request);
      observer.observe(doc.body);
      observer.observe(doc.documentElement);
      cleanups.push(() => observer.disconnect());
    }
    win.addEventListener("resize", request);
    doc.addEventListener("load", request, true); /* images, fonts, frames */
    win.addEventListener("load", request);
    cleanups.push(() => {
      win.removeEventListener("resize", request);
      doc.removeEventListener("load", request, true);
      win.removeEventListener("load", request);
      if (rafId) win.cancelAnimationFrame(rafId);
      clearTimeout(trailingTimer);
      relayoutRef.current = () => {};
    });
    if (doc.fonts) {
      doc.fonts.ready.then(request).catch(() => {});
      doc.fonts.addEventListener?.("loadingdone", request);
      cleanups.push(() => doc.fonts.removeEventListener?.("loadingdone", request));
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
    win.__notesPenRgb = penRgb(settings.penColor);
    (doc.body || doc.documentElement)?.classList.toggle(
      "nr-pen-mode",
      isHighlighterActive
    );
  }, [isHighlighterActive, iframeReloadTick, settings.penColor]);

  /* Apply + persist reading settings. The iframe is never shrunk
     artificially; the scheduler measures the real content height. */
  useEffect(() => {
    store.set(SETTINGS_KEY, JSON.stringify(settings));
    relayoutRef.current();
  }, [settings, iframeReloadTick]);

  /* ---------- rotation / viewport changes ----------
     When the width changes (rotation, split-screen) the note reflows
     and its height changes. Progress is kept as a fraction of the
     note, so the same passage stays in view afterwards. */
  useEffect(() => {
    let settleTimer = 0;

    const finishReflow = () => {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        /* Late height changes (fonts, images) re-apply the anchor for a
           short while so the same passage stays in view. */
        anchorRef.current = {
          until: performance.now() + 1800,
          percent: progressRef.current,
        };
        const top = scrollTopForProgress(progressRef.current);
        if (top !== null && progressRef.current > 0 && progressRef.current < 100) {
          programmaticScrollRef.current = performance.now();
          window.scrollTo({ top: Math.max(0, top), behavior: "instant" });
        }
        reflowRef.current = false;
        recalcRef.current();
      }, 350);
      reflowTimerRef.current = settleTimer;
    };

    const onViewportChange = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
      if (window.innerWidth === lastWidthRef.current) return; /* e.g. URL bar */
      lastWidthRef.current = window.innerWidth;
      reflowRef.current = true;
      relayoutRef.current();
      finishReflow();
    };

    window.addEventListener("resize", onViewportChange);
    window.addEventListener("orientationchange", onViewportChange);
    return () => {
      window.removeEventListener("resize", onViewportChange);
      window.removeEventListener("orientationchange", onViewportChange);
      clearTimeout(settleTimer);
    };
  }, [scrollTopForProgress]);

  /* Keep the page-level 100vh sheets in step with the real viewport. */
  useEffect(() => {
    const mq = window.matchMedia?.("(orientation: landscape)");
    if (!mq) return undefined;
    const onChange = () => setIsLandscape(window.innerWidth > window.innerHeight);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  /* Full cleanup on unmount. */
  useEffect(
    () => () => {
      docCleanupRef.current?.();
      restoreTimersRef.current.forEach(clearTimeout);
      clearTimeout(toastTimerRef.current);
      clearTimeout(reflowTimerRef.current);
      clearTimeout(dwellTimerRef.current);
      clearTimeout(leaveTimerRef.current);
      try {
        window.screen?.orientation?.unlock?.();
        if (enteredFullscreenRef.current && document.fullscreenElement) {
          document.exitFullscreen?.().catch(() => {});
        }
      } catch {
        /* nothing to release */
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
      if (!celebratedRef.current) {
        celebratedRef.current = true;
        setCelebrate(true);
      }
      recordCompletion(`${subjectId}/${noteId}`);
      setStats(getReadingStats());
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
    /* Resets THIS note only: its saved position/progress and its
       explicit completion mark (otherwise the reader would still say
       "Completed" while Home no longer counts it). */
    store.remove(progressStorageKey);
    store.remove(completedStorageKey);
    setCompleted(false);
    dwellDoneRef.current = false;
    progressRef.current = 0;
    setReadingProgress(0);
    canSaveRef.current = true;
    programmaticScrollRef.current = performance.now();
    window.scrollTo({ top: 0, behavior: "instant" });
    showToast("Reading progress reset");
  }

  function retryLoad() {
    setNoteError(false);
    setLoading(true);
    setReloadKey((key) => key + 1);
  }

  function openNote(target) {
    if (target) go(`/notes/${subjectId}/${target.id}`);
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
      84;
    setPanel(null);
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }

  function togglePanel(name) {
    setMenuOpen(false);
    setPanel((current) => (current === name ? null : name));
  }

  function chooseLayout(layout) {
    setSettings((current) => ({ ...current, layout }));
    const label = LAYOUT_OPTIONS.find((o) => o.value === layout)?.label;
    if (label) showToast(label);
  }

  /* Screen Orientation API: only works where the browser allows it
     (usually fullscreen or an installed PWA on Android). It never
     rotates the phone by itself when auto-rotate is the real control,
     so failures are explained instead of hidden. */
  async function toggleRotation() {
    const orientation = window.screen?.orientation;
    if (!orientation || typeof orientation.lock !== "function") {
      showToast(
        "This browser can't lock rotation. Turn on Auto-rotate in your phone's quick settings, then turn the phone.",
        5200
      );
      return;
    }

    if (orientationLocked) {
      try {
        orientation.unlock();
      } catch {
        /* ignore */
      }
      setOrientationLocked(false);
      showToast("Rotation unlocked. Your phone's Auto-rotate setting controls it again.", 4200);
      return;
    }

    const target = window.innerWidth > window.innerHeight ? "portrait" : "landscape";
    const tryLock = () => orientation.lock(target);

    try {
      await tryLock();
    } catch {
      /* Android Chrome needs fullscreen for a lock outside an installed app. */
      try {
        const standalone = window.matchMedia?.("(display-mode: standalone)")?.matches;
        if (!standalone && document.documentElement.requestFullscreen && !document.fullscreenElement) {
          await document.documentElement.requestFullscreen();
          enteredFullscreenRef.current = true;
        }
        await tryLock();
      } catch {
        showToast(
          "Your browser didn't allow a rotation lock. Turn on Auto-rotate in your phone's quick settings and turn the phone instead.",
          5800
        );
        return;
      }
    }
    setOrientationLocked(true);
    showToast(`Screen locked to ${target}`);
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

  /* ---------- section tracking ("now reading") ---------- */

  useEffect(() => {
    let raf = 0;
    const compute = () => {
      raf = 0;
      const doc = iframeRef.current?.contentDocument;
      const g = getReadGeometry();
      if (!doc || !doc.body || !g) return;
      const readTop = g.headerBottom - g.rect.top + 24;
      let current = "";
      for (const heading of getHeadings(doc)) {
        if (heading.getBoundingClientRect().top <= readTop) {
          current = (heading.textContent || "").trim().replace(/\s+/g, " ");
        } else {
          break;
        }
      }
      setSectionTitle((previous) => (previous === current ? previous : current));
    };
    const onChange = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    window.addEventListener("scroll", onChange, { passive: true });
    window.addEventListener("resize", onChange);
    onChange();
    return () => {
      window.removeEventListener("scroll", onChange);
      window.removeEventListener("resize", onChange);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [getReadGeometry, iframeReloadTick, iframeHeight]);

  /* ---------- celebrate finishing a note by reading ---------- */

  useEffect(() => {
    const previous = prevProgressRef.current;
    prevProgressRef.current = readingProgress;
    if (
      readingProgress >= 100 &&
      previous < 100 &&
      !celebratedRef.current &&
      userScrolledRef.current &&
      canSaveRef.current
    ) {
      celebratedRef.current = true;
      setCelebrate(true);
      recordCompletion(`${subjectId}/${noteId}`);
      setStats(getReadingStats());
    }
  }, [readingProgress, subjectId, noteId]);

  /* ---------- bookmarks and sticky notes (saved per note) ---------- */

  function saveAnnotations(next) {
    setAnnotations(next);
    store.set(annotationsKey, JSON.stringify(next));
  }

  function addAnnotation(type, text = "", color = "#7c3aed") {
    const item = {
      id: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
      type,
      text,
      color,
      percent: Math.round(progressRef.current),
      section: sectionTitle,
      t: Date.now(),
    };
    saveAnnotations([...annotations, item].sort((a, b) => a.percent - b.percent));
    showToast(type === "bookmark" ? "Bookmark saved" : "Note saved");
  }

  function jumpToAnnotation(item) {
    const top = scrollTopForProgress(item.percent);
    setPanel(null);
    if (top !== null) window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }

  function removeAnnotation(id) {
    saveAnnotations(annotations.filter((item) => item.id !== id));
  }

  /* Swipe left / right inside the note opens the next / previous note. */
  swipeRef.current = (direction) => {
    const target = direction === "next" ? nextNote : previousNote;
    if (!target || !settingsRef.current.swipe) return;
    showToast(direction === "next" ? "Next note" : "Previous note");
    openNote(target);
  };

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
            go(subject ? `/subjects/${subject.id}` : "/subjects")
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
    { label: "My highlights & notes", icon: "🔖", onSelect: () => togglePanel("notes") },
    { label: "Reading settings", icon: "Aa", onSelect: () => togglePanel("settings") },
    { heading: "Reading layout" },
    ...LAYOUT_OPTIONS.filter((option) => option.value !== "auto").map((option) => ({
      label: option.label,
      icon: "▭",
      checked: settings.layout === option.value,
      onSelect: () => chooseLayout(option.value),
    })),
    {
      label: orientationLocked ? "Unlock screen rotation" : "Rotate screen (lock orientation)",
      icon: "⟲",
      onSelect: toggleRotation,
    },
    { heading: "Note" },
    { label: "Reset reading progress", icon: "↺", onSelect: resetProgress },
    { label: "Retry loading note", icon: "⟳", onSelect: retryLoad, hidden: !noteError },
    { label: "Keyboard shortcuts", icon: "⌨", onSelect: () => togglePanel("shortcuts") },
  ];

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div
      className={`note-reader-page ${leaving ? "is-leaving" : ""}`}
      style={accentStyle(subject.id)}
      data-reader-theme={settings.theme}
      data-width={settings.width}
      data-layout={settings.layout}
      data-viewport={isLandscape ? "landscape" : "portrait"}
    >
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
          onClick={() => go(`/subjects/${subject.id}`)}
          aria-label={`Back to ${subject.name}`}
          title={`Back to ${subject.name}`}
        >
          <span aria-hidden="true">←</span>
        </button>

        <div className="reader-title">
          <nav className="reader-crumb" aria-label="Breadcrumb">
            <button
              type="button"
              onClick={() => go(`/subjects/${subject.id}`)}
            >
              <span className="crumb-icon" aria-hidden="true">
                {subject.icon}
              </span>
              {subject.name}
            </button>
            <span aria-hidden="true">/</span>
            <span>📄 Note {noteIndex + 1}</span>
          </nav>
          <h1>{note.title}</h1>
        </div>

        <div className="reader-actions">
          <span className="header-ring" title={`${progressRounded}% read`}>
            <ProgressRing value={readingProgress} size={34} stroke={3}>
              {progressRounded}
            </ProgressRing>
          </span>
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
                : "Temporary highlighter (H)"
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

      {/* HIGHLIGHTER NOTICE */}
      {isHighlighterActive && (
        <div className="reader-pen-banner" role="status">
          <span aria-hidden="true">🖊️</span>
          <span>
            Highlighter on. Marks are temporary and fade after{" "}
            {HIGHLIGHT_SECONDS} seconds.
          </span>
          <PenColors
            value={settings.penColor}
            onChange={(v) => updateSetting("penColor", v)}
          />
          <button type="button" onClick={() => setIsHighlighterActive(false)}>
            Turn off
          </button>
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
          <Segmented
            label="Layout"
            value={settings.layout}
            onChange={(v) => updateSetting("layout", v)}
            options={LAYOUT_OPTIONS.map((o) => ({ value: o.value, label: o.short }))}
          />
          <Segmented
            label="Reading theme"
            value={settings.theme}
            onChange={(v) => updateSetting("theme", v)}
            options={[
              { value: "app", label: "App" },
              { value: "sepia", label: "Sepia" },
              { value: "amoled", label: "AMOLED" },
              { value: "midnight", label: "Midnight" },
            ]}
          />
          <Segmented
            label="Reading font"
            value={settings.font}
            onChange={(v) => updateSetting("font", v)}
            options={[
              { value: "note", label: "Note's own" },
              { value: "inter", label: "Inter" },
              { value: "merriweather", label: "Merriweather" },
              { value: "lora", label: "Lora" },
              { value: "dyslexic", label: "Easy read" },
            ]}
          />
          <Segmented
            label="Swipe to change notes"
            value={settings.swipe ? "on" : "off"}
            onChange={(v) => updateSetting("swipe", v === "on")}
            options={[
              { value: "on", label: "On" },
              { value: "off", label: "Off" },
            ]}
          />
          <p className="panel-note">
            The app's light or dark mode is set in Settings. Reading themes
            recolor this reader and the note itself; fonts need an internet
            connection the first time.
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

      {panel === "notes" && (
        <ReaderPanel title="My highlights & notes" onClose={() => setPanel(null)}>
          <NotesPanelBody
            items={annotations}
            currentSection={sectionTitle}
            onAddBookmark={() => addAnnotation("bookmark", "", "#f43f5e")}
            onAddNote={(text, color) => addAnnotation("note", text, color)}
            onJump={jumpToAnnotation}
            onRemove={removeAnnotation}
          />
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
          <span className="meta-chips">
            <span className="meta-chip" title="Days in a row you've read">
              <span aria-hidden="true">🔥</span>
              {stats.streak} day{stats.streak === 1 ? "" : "s"}
            </span>
            <span className="meta-chip" title="Notes finished this week (weekly goal)">
              <ProgressRing
                value={(stats.weekDone / stats.goal) * 100}
                size={22}
                stroke={3}
              >
                {""}
              </ProgressRing>
              {stats.weekDone}/{stats.goal} this week
            </span>
            {stats.badges.filter((b) => b.earned).slice(-1).map((b) => (
              <span key={b.id} className="meta-chip" title="Latest badge">
                <span aria-hidden="true">{b.icon}</span>
                {b.label}
              </span>
            ))}
          </span>
          {completed ? (
            <span className="meta-done">✓ Completed</span>
          ) : (
            <span>{progressRounded}% read</span>
          )}
        </div>

        <section
          className={`note-frame-container ${loading ? "is-loading" : ""}`}
          ref={frameRef}
        >
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
                  onClick={() => go(`/subjects/${subject.id}`)}
                >
                  Back to {subject.name}
                </button>
              </div>
            </div>
          )}

          {noteEmpty && !noteError && (
            <div className="reader-error reader-empty" role="status">
              <div className="reader-error-small-icon" aria-hidden="true">
                ∅
              </div>
              <h2>This note has no content yet</h2>
              <p>
                The file for this note exists but is empty, so there is
                nothing to display. Its original content needs to be added
                back to the project.
              </p>
              <div className="reader-error-actions">
                <button
                  type="button"
                  className="reader-btn reader-btn-ghost"
                  onClick={() => go(`/subjects/${subject.id}`)}
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
              title={getNoteIframeTitle(note.title)}
              style={{
                height: `${iframeHeight}px`,
                visibility: noteEmpty ? "hidden" : undefined,
                position: noteEmpty ? "absolute" : undefined,
              }}
              onLoad={handleIframeLoad}
              onError={handleIframeError}
            />
          )}
        </section>

        {/* COMPLETION */}
        {!noteError && !noteEmpty && (
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
            onClick={() => go(`/subjects/${subject.id}`)}
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

      <BookmarkRail items={annotations} onJump={jumpToAnnotation} />

      {readingProgress > 2 && !panel && (
        <SectionPill title={sectionTitle} onClick={() => togglePanel("toc")} />
      )}

      <FloatingToolbar
        panel={panel}
        highlighterOn={isHighlighterActive}
        hasBookmarks={annotations.length > 0}
        progress={readingProgress}
        onToc={() => togglePanel("toc")}
        onHighlight={() => setIsHighlighterActive((current) => !current)}
        onNotes={() => togglePanel("notes")}
        onSettings={() => togglePanel("settings")}
        onTop={scrollToTop}
      />

      <ImageLightbox image={zoomImage} onClose={() => setZoomImage(null)} />
      <Celebration show={celebrate} onDone={() => setCelebrate(false)} />
    </div>
  );
}

export default NoteReader;