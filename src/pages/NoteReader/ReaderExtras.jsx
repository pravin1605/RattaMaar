import { useEffect, useMemo, useState } from "react";

/* =========================================================
   Small presentational pieces for the reader. They hold no
   reading logic: NoteReader passes data and callbacks in.
========================================================= */

export const PEN_COLORS = [
  { id: "orange", label: "Orange", rgb: "255,106,0", hex: "#ff6a00" },
  { id: "yellow", label: "Yellow", rgb: "250,204,21", hex: "#facc15" },
  { id: "green", label: "Green", rgb: "34,197,94", hex: "#22c55e" },
  { id: "pink", label: "Pink", rgb: "244,114,182", hex: "#f472b6" },
  { id: "blue", label: "Blue", rgb: "56,189,248", hex: "#38bdf8" },
];

export const NOTE_COLORS = ["#facc15", "#fb923c", "#4ade80", "#38bdf8", "#f472b6"];

export function penRgb(id) {
  return (PEN_COLORS.find((c) => c.id === id) || PEN_COLORS[0]).rgb;
}

/* ---------- circular progress ---------- */

export function ProgressRing({ value, size = 44, stroke = 4, children }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.max(0, Math.min(100, value)) / 100);
  return (
    <span className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle className="ring-track" cx={size / 2} cy={size / 2} r={radius} strokeWidth={stroke} fill="none" />
        <circle
          className="ring-value"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span className="ring-label">{children}</span>
    </span>
  );
}

/* ---------- confetti / completion celebration ---------- */

export function Celebration({ show, title = "Note completed!", onDone }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: Math.round(Math.random() * 100),
        delay: Math.round(Math.random() * 350),
        dur: 1500 + Math.round(Math.random() * 900),
        drift: Math.round(Math.random() * 160 - 80),
        hue: [265, 25, 145, 200, 330, 48][i % 6],
      })),
    []
  );

  useEffect(() => {
    if (!show) return undefined;
    const id = setTimeout(() => onDone?.(), 2600);
    return () => clearTimeout(id);
  }, [show, onDone]);

  if (!show) return null;
  return (
    <div className="celebration" role="status" aria-live="polite">
      <div className="confetti" aria-hidden="true">
        {pieces.map((p) => (
          <i
            key={p.id}
            style={{
              left: `${p.left}%`,
              animationDelay: `${p.delay}ms`,
              animationDuration: `${p.dur}ms`,
              "--drift": `${p.drift}px`,
              background: `hsl(${p.hue} 85% 58%)`,
            }}
          />
        ))}
      </div>
      <div className="celebration-card">
        <span aria-hidden="true">🎉</span>
        <strong>{title}</strong>
      </div>
    </div>
  );
}

/* ---------- pen colour picker ---------- */

export function PenColors({ value, onChange }) {
  return (
    <span className="pen-colors" role="radiogroup" aria-label="Highlighter colour">
      {PEN_COLORS.map((c) => (
        <button
          key={c.id}
          type="button"
          role="radio"
          aria-checked={value === c.id}
          aria-label={c.label}
          title={c.label}
          className={`pen-swatch ${value === c.id ? "is-active" : ""}`}
          style={{ background: c.hex }}
          onClick={() => onChange(c.id)}
        />
      ))}
    </span>
  );
}

/* ---------- floating bottom toolbar ---------- */

export function FloatingToolbar({
  panel,
  highlighterOn,
  hasBookmarks,
  onToc,
  onHighlight,
  onNotes,
  onSettings,
  onTop,
  progress,
}) {
  const buttons = [
    { id: "toc", icon: "☰", label: "Contents", active: panel === "toc", onClick: onToc },
    { id: "pen", icon: "🖊️", label: "Highlight", active: highlighterOn, onClick: onHighlight },
    { id: "notes", icon: hasBookmarks ? "🔖" : "📝", label: "Notes", active: panel === "notes", onClick: onNotes },
    { id: "settings", icon: "Aa", label: "Settings", active: panel === "settings", onClick: onSettings },
  ];
  return (
    <div className="float-toolbar" role="toolbar" aria-label="Reader tools">
      {buttons.map((b) => (
        <button
          key={b.id}
          type="button"
          className={`float-tool ${b.active ? "is-active" : ""}`}
          onClick={b.onClick}
          aria-label={b.label}
          aria-pressed={b.active}
        >
          <span aria-hidden="true">{b.icon}</span>
          <small>{b.label}</small>
        </button>
      ))}
      <button type="button" className="float-tool float-top" onClick={onTop} aria-label="Back to top">
        <ProgressRing value={progress} size={36} stroke={3}>
          <span aria-hidden="true">↑</span>
        </ProgressRing>
      </button>
    </div>
  );
}

/* ---------- "now reading" section pill ---------- */

export function SectionPill({ title, onClick }) {
  if (!title) return null;
  return (
    <button type="button" className="section-pill" onClick={onClick} title="Open contents">
      <span aria-hidden="true">§</span>
      <span className="section-pill-text">{title}</span>
    </button>
  );
}

/* ---------- image lightbox ---------- */

export function ImageLightbox({ image, onClose }) {
  useEffect(() => {
    if (!image) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [image, onClose]);

  if (!image) return null;
  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image preview" onClick={onClose}>
      <img src={image.src} alt={image.alt} onClick={(e) => e.stopPropagation()} />
      <button type="button" className="lightbox-close" onClick={onClose} aria-label="Close preview">
        ✕
      </button>
    </div>
  );
}

/* ---------- my highlights / notes panel body ---------- */

export function NotesPanelBody({
  items,
  currentSection,
  onAddBookmark,
  onAddNote,
  onJump,
  onRemove,
}) {
  const [text, setText] = useState("");
  const [color, setColor] = useState(NOTE_COLORS[0]);

  const submit = () => {
    if (!text.trim()) return;
    onAddNote(text.trim(), color);
    setText("");
  };

  return (
    <div className="notes-panel">
      <p className="notes-hint">
        Pen highlights are temporary. Bookmarks and sticky notes are saved for
        this note{currentSection ? ` (now at “${currentSection}”)` : ""}.
      </p>

      <button type="button" className="reader-btn notes-add-bookmark" onClick={onAddBookmark}>
        🔖 Bookmark this spot
      </button>

      <div className="sticky-form">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a sticky note for this spot…"
          rows={2}
          maxLength={400}
          aria-label="Sticky note text"
        />
        <div className="sticky-form-row">
          <span className="pen-colors" role="radiogroup" aria-label="Note colour">
            {NOTE_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                role="radio"
                aria-checked={color === c}
                aria-label={`Note colour ${c}`}
                className={`pen-swatch ${color === c ? "is-active" : ""}`}
                style={{ background: c }}
                onClick={() => setColor(c)}
              />
            ))}
          </span>
          <button type="button" className="reader-btn" onClick={submit} disabled={!text.trim()}>
            Add note
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="notes-empty">Nothing saved for this note yet.</p>
      ) : (
        <ul className="notes-list">
          {items.map((item) => (
            <li key={item.id} className="notes-item" style={{ "--note-color": item.color || "#7c3aed" }}>
              <button type="button" className="notes-jump" onClick={() => onJump(item)}>
                <span className="notes-kind" aria-hidden="true">{item.type === "bookmark" ? "🔖" : "📝"}</span>
                <span className="notes-body">
                  <strong>{item.type === "bookmark" ? item.section || "Bookmark" : item.text}</strong>
                  <small>
                    {item.type === "note" && item.section ? `${item.section} · ` : ""}
                    {Math.round(item.percent)}% through the note
                  </small>
                </span>
              </button>
              <button type="button" className="notes-remove" onClick={() => onRemove(item.id)} aria-label="Delete">
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ---------- bookmark ribbons on the right edge ---------- */

export function BookmarkRail({ items, onJump }) {
  const marks = items.filter((i) => i.type === "bookmark");
  if (!marks.length) return null;
  return (
    <div className="bookmark-rail" aria-label="Bookmarks">
      {marks.map((m) => (
        <button
          key={m.id}
          type="button"
          className="bookmark-ribbon"
          style={{ top: `${Math.max(2, Math.min(96, m.percent))}%` }}
          onClick={() => onJump(m)}
          aria-label={`Bookmark at ${Math.round(m.percent)}%`}
          title={m.section || "Bookmark"}
        />
      ))}
    </div>
  );
}