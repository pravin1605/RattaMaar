/* =========================================================
   Note enhancements injected into the same-origin note iframe.
   Nothing here rewrites a note's text: code gets a small bar
   (language label, copy, show more) and colour spans whose
   text is identical to the original, callouts get an accent
   edge, long sections can fold, images can be zoomed, and the
   reader can apply a reading theme and font.
========================================================= */

const STYLE_ID = "notes-web-enhance";
const THEME_STYLE_ID = "notes-web-theme";
const LONG_CODE_LINES = 24;

const ENHANCE_CSS = `
.nw-code-bar{display:flex;align-items:center;justify-content:space-between;gap:8px;box-sizing:border-box;max-width:100%;margin:14px 0 0;padding:6px 10px;background:#1e1b2e;color:#e9e7f5;border-radius:10px 10px 0 0;font:700 11px/1.2 system-ui,-apple-system,"Segoe UI",sans-serif;letter-spacing:.06em;text-transform:uppercase;white-space:normal}
.nw-code-bar+*{margin-top:0!important;border-top-left-radius:0!important;border-top-right-radius:0!important}
.nw-code-lang{display:inline-flex;align-items:center;gap:6px}
.nw-code-lang:before{content:"";width:8px;height:8px;border-radius:50%;background:var(--nw-lang,#a78bfa);box-shadow:0 0 0 3px rgba(255,255,255,.12)}
.nw-code-actions{display:inline-flex;gap:6px}
.nw-code-btn{all:unset;box-sizing:border-box;cursor:pointer;padding:4px 10px;border-radius:999px;background:rgba(255,255,255,.12);color:#fff;font:700 11px/1 system-ui,sans-serif;letter-spacing:.04em;text-transform:none;-webkit-tap-highlight-color:transparent}
.nw-code-btn:hover{background:rgba(255,255,255,.22)}
.nw-code-btn:focus-visible{outline:2px solid #fff;outline-offset:2px}
.nw-code-btn.is-done{background:#16a34a}
.nw-collapsed{max-height:340px!important;overflow-y:hidden!important;-webkit-mask-image:linear-gradient(#000 72%,transparent);mask-image:linear-gradient(#000 72%,transparent)}
.nw-tk-c{color:#8b949e;font-style:italic}
.nw-tk-s{color:#4fb477}
.nw-tk-n{color:#e08a1e}
.nw-tk-k{color:#b967e6;font-weight:600}
.nw-tk-a{color:#e3b341}
.nw-tk-t{color:#5aa9f2}
[data-nw-callout]{border-radius:12px!important;box-shadow:inset 5px 0 0 var(--nw-callout,#7c3aed)!important}
[data-nw-callout="tip"]{--nw-callout:#16a34a}
[data-nw-callout="warning"]{--nw-callout:#e11d48}
[data-nw-callout="interview"]{--nw-callout:#7c3aed}
[data-nw-callout="note"]{--nw-callout:#0284c7}
[data-nw-fold]{cursor:pointer;-webkit-tap-highlight-color:transparent}
[data-nw-fold]:after{content:" \\25BE";font-size:.7em;opacity:.55}
[data-nw-fold][data-nw-folded]:after{content:" \\25B8"}
[data-nw-hidden]{display:none!important}
img[data-nw-zoom],svg[data-nw-zoom]{cursor:zoom-in}
`;

/* ---------- syntax colouring (plain-text code blocks only) ---------- */

const KEYWORDS = {
  java: "abstract assert boolean break byte case catch char class const continue default do double else enum extends final finally float for if implements import instanceof int interface long native new null package private protected public return short static super switch synchronized this throw throws transient try var void volatile while true false record sealed permits",
  js: "async await break case catch class const continue debugger default delete do else export extends finally for from function if import in instanceof let new null of return static super switch this throw try typeof undefined var void while yield true false",
  sql: "select from where insert into values update set delete create alter drop table view index join inner outer left right full on group by having order asc desc distinct union all as and or not null is in exists between like limit offset primary key foreign references constraint default begin end declare cursor open fetch close loop if then else elsif exception when procedure function trigger replace return commit rollback savepoint number varchar varchar2 date",
};

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function buildRegex(lang) {
  const kw = KEYWORDS[lang]
    ? `\\b(?:${KEYWORDS[lang].split(" ").join("|")})\\b`
    : null;
  const comment =
    lang === "sql"
      ? "--[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/"
      : "\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/";
  const str = "\"(?:\\\\.|[^\"\\\\\\n])*\"|'(?:\\\\.|[^'\\\\\\n])*'" + (lang === "js" ? "|`[^`]*`" : "");
  const parts = [
    `(${comment})`,
    `(${str})`,
    lang === "java" ? "(@\\w+)" : "()(?!)",
    "(\\b\\d+(?:\\.\\d+)?\\b)",
    kw ? `(${kw})` : "()(?!)",
  ];
  return new RegExp(parts.join("|"), lang === "sql" ? "gi" : "g");
}

const REGEX_CACHE = {};
const CLASSES = ["nw-tk-c", "nw-tk-s", "nw-tk-a", "nw-tk-n", "nw-tk-k"];

function colourise(text, lang) {
  if (!REGEX_CACHE[lang]) REGEX_CACHE[lang] = buildRegex(lang);
  const re = REGEX_CACHE[lang];
  re.lastIndex = 0;
  let out = "";
  let last = 0;
  let m;
  while ((m = re.exec(text))) {
    if (m[0] === "") {
      re.lastIndex += 1;
      continue;
    }
    out += esc(text.slice(last, m.index));
    const group = [1, 2, 3, 4, 5].find((g) => m[g]);
    out += `<span class="${CLASSES[group - 1]}">${esc(m[0])}</span>`;
    last = m.index + m[0].length;
  }
  return out + esc(text.slice(last));
}

function colouriseMarkup(text) {
  return esc(text).replace(
    /(&lt;\/?[a-zA-Z][^&]*?&gt;)/g,
    '<span class="nw-tk-t">$1</span>'
  );
}

function detectLanguage(el, text) {
  const hint = `${el.className || ""} ${el.getAttribute("data-lang") || ""} ${
    el.querySelector("code")?.className || ""
  }`.toLowerCase();
  if (/\b(lang(uage)?-)?java\b/.test(hint) && !/javascript/.test(hint)) return "java";
  if (/javascript|\bjs\b|jsx/.test(hint)) return "js";
  if (/sql|plsql/.test(hint)) return "sql";
  if (/html|xml/.test(hint)) return "xml";
  if (/^\s*</.test(text) && />\s*$/.test(text)) return "xml";
  if (/\b(select|insert\s+into|update\s+\w+\s+set|create\s+table|delete\s+from)\b/i.test(text) ||
      /\b(declare|begin|end;|cursor|dbms_output)\b/i.test(text)) return "sql";
  if (/\b(public|private|protected)\b.*[({;]|System\.out|import\s+java|@Override|\bclass\s+\w+/.test(text)) return "java";
  if (/\b(const|let|var)\s+\w+|=>|console\.log|function\s*\w*\s*\(/.test(text)) return "js";
  return "code";
}

const LANG_LABEL = { java: "Java", js: "JavaScript", sql: "SQL", xml: "HTML / XML", code: "Code" };
const LANG_COLOR = { java: "#f59e0b", js: "#facc15", sql: "#38bdf8", xml: "#fb7185", code: "#a78bfa" };

/* ---------- helpers ---------- */

function findCodeBlocks(doc, win) {
  const candidates = Array.from(
    doc.body.querySelectorAll("pre, [class*='code']")
  ).filter((el) => {
    if (el.closest(".nw-code-bar")) return false;
    if (el.tagName !== "PRE") {
      const cs = win.getComputedStyle(el);
      if (!/^pre/.test(cs.whiteSpace)) return false;
      if (cs.display === "inline") return false;
    }
    return (el.textContent || "").includes("\n") || el.tagName === "PRE";
  });
  /* Keep outermost blocks that don't contain another candidate. */
  return candidates.filter(
    (el) =>
      !candidates.some((other) => other !== el && other.contains(el)) &&
      !candidates.some((other) => other !== el && el.contains(other))
  );
}

async function copyText(win, doc, text) {
  try {
    if (win.navigator.clipboard?.writeText) {
      await win.navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the legacy path */
  }
  try {
    const area = doc.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    Object.assign(area.style, { position: "fixed", opacity: "0", top: "0" });
    doc.body.appendChild(area);
    area.select();
    const ok = doc.execCommand("copy");
    area.remove();
    return ok;
  } catch {
    return false;
  }
}

function decorateCode(doc, win, cleanups) {
  const blocks = findCodeBlocks(doc, win);
  blocks.forEach((block) => {
    if (block.dataset.nwCode) return;
    block.dataset.nwCode = "1";
    const text = block.textContent || "";
    if (!text.trim() || text.length > 40000) return;

    const lang = detectLanguage(block, text);

    /* Colour only blocks that are still plain text. */
    if (block.children.length === 0 && (lang === "java" || lang === "js" || lang === "sql")) {
      block.innerHTML = colourise(text, lang);
    } else if (block.children.length === 0 && lang === "xml") {
      block.innerHTML = colouriseMarkup(text);
    }

    const bar = doc.createElement("div");
    bar.className = "nw-code-bar";
    bar.style.setProperty("--nw-lang", LANG_COLOR[lang]);

    const label = doc.createElement("span");
    label.className = "nw-code-lang";
    label.textContent = LANG_LABEL[lang];

    const actions = doc.createElement("span");
    actions.className = "nw-code-actions";

    const lines = text.split("\n").length;
    if (lines > LONG_CODE_LINES) {
      block.classList.add("nw-collapsed");
      const toggle = doc.createElement("button");
      toggle.type = "button";
      toggle.className = "nw-code-btn";
      toggle.textContent = "Show more";
      toggle.addEventListener("click", () => {
        const collapsed = block.classList.toggle("nw-collapsed");
        toggle.textContent = collapsed ? "Show more" : "Show less";
      });
      actions.appendChild(toggle);
    }

    const copy = doc.createElement("button");
    copy.type = "button";
    copy.className = "nw-code-btn";
    copy.textContent = "Copy";
    let timer = 0;
    copy.addEventListener("click", async () => {
      const ok = await copyText(win, doc, block.textContent || "");
      copy.textContent = ok ? "Copied ✓" : "Copy failed";
      copy.classList.toggle("is-done", ok);
      win.clearTimeout(timer);
      timer = win.setTimeout(() => {
        copy.textContent = "Copy";
        copy.classList.remove("is-done");
      }, 1600);
    });
    cleanups.push(() => win.clearTimeout(timer));
    actions.appendChild(copy);

    bar.append(label, actions);
    block.parentNode.insertBefore(bar, block);
  });
}

function markCallouts(doc, win) {
  const kinds = [
    ["interview", /(^|[-_\s])(interview|qa|q-a)([-_\s]|$)/i, /^\s*(💬\s*)?interview/i],
    ["warning", /(^|[-_\s])(warn|warning|caution|danger|important|pitfall|mistake)([-_\s]|$)/i, /^\s*(⚠️?\s*)?(warning|caution|important|common mistake)\b/i],
    ["tip", /(^|[-_\s])(tip|hint|pro-tip|remember|trick)([-_\s]|$)/i, /^\s*(💡\s*)?(tip|hint|pro tip|remember)\b/i],
    ["note", /(^|[-_\s])(note|info|callout|key-?point)([-_\s]|$)/i, /^\s*(📝\s*|ℹ️?\s*)?note\b/i],
  ];
  doc.body.querySelectorAll("div, p, blockquote, aside, section").forEach((el) => {
    if (el.hasAttribute("data-nw-callout")) return;
    const text = (el.textContent || "").trim();
    if (!text || text.length > 700 || el.querySelector("pre, table, h1, h2")) return;
    const cs = win.getComputedStyle(el);
    if (cs.display === "inline" || cs.display === "none") return;
    const cls = typeof el.className === "string" ? el.className : "";
    for (const [kind, classRe, textRe] of kinds) {
      if ((cls && classRe.test(cls)) || textRe.test(text.slice(0, 40))) {
        el.setAttribute("data-nw-callout", kind);
        break;
      }
    }
  });
}

function makeFoldable(doc, cleanups) {
  const heads = Array.from(doc.body.querySelectorAll("h2")).filter(
    (h) => !h.closest("header, nav, [class*='toc'], [class*='hero']")
  );
  if (heads.length < 3) return;

  heads.forEach((head) => {
    /* Headings are often wrapped alone in a ".section-header" box, with
       the content as siblings of that box. Fold from the wrapper then. */
    const anchor =
      !head.nextElementSibling &&
      head.parentElement &&
      head.parentElement !== doc.body &&
      head.parentElement.children.length <= 3
        ? head.parentElement
        : head;
    const group = [];
    for (let n = anchor.nextElementSibling; n; n = n.nextElementSibling) {
      if (/^H[12]$/.test(n.tagName) || n.querySelector("h1, h2")) break;
      group.push(n);
    }
    if (group.length < 1) return;

    head.setAttribute("data-nw-fold", "");
    head.setAttribute("role", "button");
    head.setAttribute("tabindex", "0");
    head.setAttribute("aria-expanded", "true");

    const toggle = () => {
      const folded = head.toggleAttribute("data-nw-folded");
      head.setAttribute("aria-expanded", String(!folded));
      group.forEach((n) =>
        folded ? n.setAttribute("data-nw-hidden", "") : n.removeAttribute("data-nw-hidden")
      );
    };
    const onKey = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    };
    head.addEventListener("click", toggle);
    head.addEventListener("keydown", onKey);
    cleanups.push(() => {
      head.removeEventListener("click", toggle);
      head.removeEventListener("keydown", onKey);
    });
  });
}

function setupImageZoom(doc, win, onZoomImage, cleanups) {
  if (!onZoomImage) return;
  const zoomable = (el) => {
    const r = el.getBoundingClientRect();
    return r.width >= 90 && r.height >= 60 && !el.closest("a, button");
  };
  doc.body.querySelectorAll("img, svg").forEach((el) => {
    if (zoomable(el)) el.setAttribute("data-nw-zoom", "");
  });

  const onClick = (e) => {
    if (win.__notesPenActive) return;
    const el = e.target.closest?.("img[data-nw-zoom], svg[data-nw-zoom]");
    if (!el) return;
    if (el.tagName === "IMG") {
      onZoomImage({ src: el.currentSrc || el.src, alt: el.alt || "" });
    } else {
      try {
        const clone = el.cloneNode(true);
        clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        const r = el.getBoundingClientRect();
        if (!clone.getAttribute("viewBox") && r.width && r.height) {
          clone.setAttribute("viewBox", `0 0 ${Math.round(r.width)} ${Math.round(r.height)}`);
        }
        clone.removeAttribute("width");
        clone.removeAttribute("height");
        const xml = new win.XMLSerializer().serializeToString(clone);
        onZoomImage({ src: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(xml)}`, alt: "Diagram" });
      } catch {
        /* diagram can't be serialised: leave it as is */
      }
    }
  };
  doc.addEventListener("click", onClick);
  cleanups.push(() => doc.removeEventListener("click", onClick));
}

function setupSwipe(doc, win, onSwipe, cleanups) {
  if (!onSwipe) return;
  let start = null;
  const blocked = (el) =>
    !!el.closest?.("pre, table, [data-nw-scroll], .nw-code-bar, input, textarea, select, svg");

  const onStart = (e) => {
    if (e.touches.length !== 1 || win.__notesPenActive || blocked(e.target)) {
      start = null;
      return;
    }
    const t = e.touches[0];
    start = { x: t.clientX, y: t.clientY, t: Date.now() };
  };
  const onEnd = (e) => {
    if (!start || !e.changedTouches.length) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    const dt = Date.now() - start.t;
    start = null;
    const scale = win.parent?.visualViewport?.scale || 1;
    const selection = win.getSelection?.()?.toString();
    if (scale > 1.05 || selection) return;
    if (Math.abs(dx) > 120 && Math.abs(dy) < 45 && Math.abs(dx) > Math.abs(dy) * 3 && dt < 550) {
      onSwipe(dx < 0 ? "next" : "previous");
    }
  };
  doc.addEventListener("touchstart", onStart, { passive: true });
  doc.addEventListener("touchend", onEnd, { passive: true });
  cleanups.push(() => {
    doc.removeEventListener("touchstart", onStart);
    doc.removeEventListener("touchend", onEnd);
  });
}

/* ---------- public API ---------- */

export function attachNoteEnhancements(doc, win, options = {}) {
  const cleanups = [];
  if (!doc.body) return () => {};

  if (!doc.getElementById(STYLE_ID)) {
    const style = doc.createElement("style");
    style.id = STYLE_ID;
    style.textContent = ENHANCE_CSS;
    (doc.head || doc.documentElement).appendChild(style);
  }

  try {
    decorateCode(doc, win, cleanups);
    markCallouts(doc, win);
    makeFoldable(doc, cleanups);
    setupImageZoom(doc, win, options.onZoomImage, cleanups);
    setupSwipe(doc, win, options.onSwipe, cleanups);
  } catch {
    /* enhancements are optional: a failure must never break reading */
  }

  return () => cleanups.forEach((fn) => fn());
}

/* ---------- reading theme + font ---------- */

const FONT_STACKS = {
  inter: {
    css: "Inter:wght@400;500;600;700",
    stack: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  },
  merriweather: {
    css: "Merriweather:wght@400;700",
    stack: 'Merriweather, Georgia, "Times New Roman", serif',
  },
  lora: {
    css: "Lora:wght@400;500;600;700",
    stack: 'Lora, Georgia, "Times New Roman", serif',
  },
  dyslexic: {
    css: "Atkinson+Hyperlegible:wght@400;700",
    stack: '"Atkinson Hyperlegible", "OpenDyslexic", Verdana, Tahoma, sans-serif',
    extra: "letter-spacing:.02em;word-spacing:.08em;",
  },
};

/* Filters used by the dark reading themes. Images are flipped back
   so photos and diagrams keep their real colours. */
const THEME_CSS = {
  sepia: "html{background:#f4ecd8;filter:sepia(.35) saturate(.92) brightness(.97)}",
  amoled:
    "html{background:#fff;filter:invert(1) hue-rotate(180deg) contrast(.96)}img,video,canvas,.nw-code-bar{filter:invert(1) hue-rotate(180deg)}",
  midnight:
    "html{background:#fff;filter:invert(.9) hue-rotate(180deg) sepia(.55) hue-rotate(170deg) saturate(1.7) brightness(.95)}img,video,canvas,.nw-code-bar{filter:invert(1) hue-rotate(170deg)}",
};

export function applyReadingTheme(doc, settings) {
  let el = doc.getElementById(THEME_STYLE_ID);
  if (!el) {
    el = doc.createElement("style");
    el.id = THEME_STYLE_ID;
    (doc.head || doc.documentElement).appendChild(el);
  }

  const font = FONT_STACKS[settings.font];
  /* @import must come first in a stylesheet. */
  let css = font
    ? `@import url("https://fonts.googleapis.com/css2?family=${font.css}&display=swap");`
    : "";
  css += THEME_CSS[settings.theme] || "";
  if (font) {
    css += `body :not(pre):not(code):not(pre *):not(code *):not(svg *):not(.nw-code-bar):not(.nw-code-bar *){font-family:${font.stack} !important;${font.extra || ""}}`;
  }
  if (el.textContent !== css) el.textContent = css;
}