/* =========================================================
   Existing helpers (unchanged)
========================================================= */

export function getNoteDocumentUrl(file) {
  if (!file) {
    return "";
  }

  return file;
}

export function getNoteIframeTitle(title) {
  return `${title} - Notes Web`;
}

/* =========================================================
   Responsive layer for the same-origin note iframe
   ---------------------------------------------------------
   Many notes were authored as fixed-width "A4 paper" pages
   (width: 210mm / 794px). On a phone those pages are wider
   than the iframe, so only the left part is visible.

   Instead of editing every note, the reader injects ONE
   style tag (id below) into each note. It:
     - lets A4-style page containers shrink to the viewport,
     - lets flex/grid items shrink (min-width: 0),
     - gives tables, code blocks and any other genuinely
       wide element their OWN horizontal scroll area,
     - never hides horizontal overflow on html/body.
   Note content, colors and typography are not touched.
========================================================= */

export const READER_LAYOUTS = ["auto", "portrait", "landscape", "fit"];

const RESPONSIVE_STYLE_ID = "notes-web-responsive";

const BASE_CSS = `html{-webkit-text-size-adjust:100%;text-size-adjust:100%}
img,video{max-width:100%;height:auto}
pre{max-width:100%;overflow-x:auto}
body{overflow-wrap:break-word}
li,td,th,code,dd{overflow-wrap:anywhere}
pre,pre code{overflow-wrap:normal}
@media (max-width:860px){
 html:not([data-nw-layout="fit"]) .page,html:not([data-nw-layout="fit"]) .a4-page{width:auto!important;max-width:100%!important;min-height:0!important;padding-left:clamp(12px,4vw,40px)!important;padding-right:clamp(12px,4vw,40px)!important}
 html:not([data-nw-layout="fit"]) table{display:block;max-width:100%;overflow-x:auto}
}
:where(body *){min-width:0}
[data-nw-scroll]{overflow-x:auto!important;max-width:100%}
[data-nw-cols] > *{grid-column:auto!important}
[data-nw-cols="1"]{grid-template-columns:minmax(0,1fr)!important}
[data-nw-cols="2"]{grid-template-columns:repeat(2,minmax(0,1fr))!important}
[data-nw-cols="3"]{grid-template-columns:repeat(3,minmax(0,1fr))!important}`;

const LAYOUT_CSS = {
  auto: "",
  portrait: `
  html[data-nw-layout="portrait"] .page,html[data-nw-layout="portrait"] .a4-page{width:auto!important;max-width:760px!important;min-height:0!important;margin-left:auto!important;margin-right:auto!important}
  html[data-nw-layout="portrait"] table{display:block;max-width:100%;overflow-x:auto}`,
  landscape: `
  html[data-nw-layout="landscape"] .page,html[data-nw-layout="landscape"] .a4-page{width:auto!important;max-width:1180px!important;min-height:0!important;margin-left:auto!important;margin-right:auto!important;padding-left:clamp(12px,3vw,40px)!important;padding-right:clamp(12px,3vw,40px)!important}
  html[data-nw-layout="landscape"] table{display:block;max-width:100%;overflow-x:auto}`,
  fit: "",
};

function getOrCreateStyle(doc) {
  let el = doc.getElementById(RESPONSIVE_STYLE_ID);
  if (!el) {
    el = doc.createElement("style");
    el.id = RESPONSIVE_STYLE_ID;
    (doc.head || doc.documentElement).appendChild(el);
  }
  return el;
}

/* Injects the responsive stylesheet for the chosen layout. */
export function applyNoteLayoutCss(doc, layout) {
  const mode = READER_LAYOUTS.includes(layout) ? layout : "auto";
  doc.documentElement.setAttribute("data-nw-layout", mode);
  const el = getOrCreateStyle(doc);
  /* "fit" shows the note exactly as authored and scales it down
     instead, so no reflow rules are injected for it. */
  el.textContent =
    mode === "fit"
      ? "img,video{max-width:100%;height:auto}"
      : BASE_CSS + LAYOUT_CSS[mode];
}

/* Marks elements that really are wider than their box so the CSS
   above can give each one its own horizontal scroll area, and
   stacks multi-column grids that would otherwise be crushed.
   Only reads layout, then writes attributes, deepest element
   first so a scrolling child frees its parent. */
export function markAdaptiveElements(doc, layout) {
  const body = doc.body;
  if (!body) return;
  const all = Array.from(body.querySelectorAll("*"));
  all.forEach((el) => {
    el.removeAttribute("data-nw-scroll");
    el.removeAttribute("data-nw-cols");
  });
  if (layout === "fit") return;

  const vw = doc.documentElement.clientWidth;
  const win = doc.defaultView;
  const stackBelow = layout === "portrait" ? 100000 : 700;
  const minColumn = layout === "portrait" ? 200 : 150;

  if (vw <= stackBelow) {
    for (const el of all) {
      const cs = win.getComputedStyle(el);
      if (cs.display !== "grid" && cs.display !== "inline-grid") continue;
      const columns = cs.gridTemplateColumns.split(" ").filter(Boolean).length;
      if (columns < 2) continue;
      let k = columns;
      while (k > 1 && el.clientWidth / k < minColumn) k -= 1;
      if (k < columns) el.setAttribute("data-nw-cols", String(k));
    }
  }

  for (let i = all.length - 1; i >= 0; i -= 1) {
    const el = all[i];
    if (el.clientWidth <= 0 || el.scrollWidth <= el.clientWidth + 1) continue;
    const cs = win.getComputedStyle(el);
    const { display, overflowX } = cs;
    if (
      (overflowX === "visible" || overflowX === "hidden" || overflowX === "clip") &&
      display !== "inline" &&
      display !== "contents" &&
      !display.startsWith("table")
    ) {
      el.setAttribute("data-nw-scroll", "");
    }
  }
}

/* Natural width of the note when shown exactly as authored. */
export function measureNaturalWidth(doc) {
  const de = doc.documentElement;
  return Math.max(de.scrollWidth, doc.body ? doc.body.scrollWidth : 0);
}

/* Height of the note's real content. It does not depend on the
   iframe's own height, so the iframe can shrink as well as grow
   (rotation, smaller text, wider layout) without a feedback loop. */
export function measureNoteHeight(doc, win) {
  const de = doc.documentElement;
  const body = doc.body;
  if (!body) return 0;
  const cs = win.getComputedStyle(body);
  const bodyBottom =
    body.getBoundingClientRect().bottom +
    (win.scrollY || 0) +
    (parseFloat(cs.marginBottom) || 0);
  let height = Math.max(de.getBoundingClientRect().height, bodyBottom);

  /* Anything that overflows the document (absolute items etc.). */
  if (de.scrollHeight > win.innerHeight + 1) {
    height = Math.max(height, de.scrollHeight);
  }
  if (!Number.isFinite(height) || height <= 0) {
    height = body.scrollHeight;
  }
  return Math.max(Math.ceil(height), 120);
}

/* A file that loaded but has no readable content (zero-byte file). */
export function isNoteDocumentEmpty(doc) {
  const body = doc.body;
  if (!body) return true;
  if ((body.textContent || "").trim()) return false;
  return !body.querySelector(
    "img, svg, canvas, video, iframe, object, embed, table, pre, audio"
  );
}