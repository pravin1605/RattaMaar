import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import BottomNavigation from "../../components/layout/BottomNavigation";
import pwaService from "../../services/pwaService";
import {
  getReadingStats,
  getWeeklyGoal,
  setWeeklyGoal,
} from "../../utils/readingStats";

import "./Settings.css";
import "./SettingsExtras.css";

const READER_KEY = "notes-web-reader-settings";

const ACCENTS = [
  { name: "Lime", value: "#c8ff3d" },
  { name: "Violet", value: "#a78bfa" },
  { name: "Blue", value: "#60a5fa" },
  { name: "Rose", value: "#fb7185" },
  { name: "Amber", value: "#fbbf24" },
  { name: "Teal", value: "#2dd4bf" },
  { name: "Orange", value: "#fb923c" },
];

const READER_THEMES = [
  { value: "app", label: "Match app", note: "Light / dark" },
  { value: "sepia", label: "Sepia", note: "Warm paper" },
  { value: "amoled", label: "AMOLED", note: "Pure black" },
  { value: "midnight", label: "Midnight", note: "Deep navy" },
];

const READER_FONTS = [
  { value: "note", label: "Note's own" },
  { value: "inter", label: "Inter" },
  { value: "merriweather", label: "Merriweather" },
  { value: "lora", label: "Lora" },
  { value: "dyslexic", label: "Easy read" },
];

const QUICK_LINKS = [
  { id: "sx-appearance", label: "Appearance" },
  { id: "sx-reading", label: "Reading" },
  { id: "sx-goals", label: "Goals" },
  { id: "sx-app", label: "App" },
  { id: "sx-data", label: "Data" },
];

const STORAGE_BUDGET = 5 * 1024 * 1024; /* typical browser limit */

function readReaderSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(READER_KEY));
    return saved && typeof saved === "object" ? saved : {};
  } catch {
    return {};
  }
}

/* Changes only the given fields; every other saved reader setting stays. */
function patchReaderSettings(patch) {
  try {
    localStorage.setItem(
      READER_KEY,
      JSON.stringify({ ...readReaderSettings(), ...patch })
    );
  } catch {
    /* storage blocked */
  }
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function getStorageStats() {
  const stats = { keys: 0, bytes: 0, favorites: 0, progress: 0, completed: 0, notes: 0, recent: 0 };
  try {
    Object.keys(localStorage)
      .filter((key) => key.startsWith("notes-web-"))
      .forEach((key) => {
        const value = localStorage.getItem(key) || "";
        stats.keys += 1;
        stats.bytes += (key.length + value.length) * 2; /* UTF-16 */
        if (key.startsWith("notes-web-favorite-") && value === "true") stats.favorites += 1;
        if (key.startsWith("notes-web-progress-")) stats.progress += 1;
        if (key.startsWith("notes-web-completed-") && value === "true") stats.completed += 1;
        if (key.startsWith("notes-web-annotations-")) {
          try {
            stats.notes += JSON.parse(value).length || 0;
          } catch {
            /* ignore a damaged entry */
          }
        }
        if (key === "notes-web-recent") {
          try {
            stats.recent = JSON.parse(value).length || 0;
          } catch {
            /* ignore */
          }
        }
      });
  } catch {
    /* storage blocked */
  }
  return stats;
}

function removeKeys(predicate) {
  Object.keys(localStorage).filter(predicate).forEach((key) => localStorage.removeItem(key));
}

function Settings() {
  const navigate = useNavigate();

  // Theme: Light is the default for first-time users.
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("notes-web-theme") || "light";
  });

  // Reading comfort.
  const [reduceMotion, setReduceMotion] = useState(() => {
    return localStorage.getItem("notes-web-reduce-motion") === "true";
  });

  // Reading comfort settings. Values are persisted on this device.
  const [readerFontSize, setReaderFontSize] = useState(() => {
    return Number(localStorage.getItem("notes-web-reader-font-size")) || 18;
  });

  const [readerLineSpacing, setReaderLineSpacing] = useState(() => {
    return Number(localStorage.getItem("notes-web-line-spacing")) || 1.7;
  });

  const [accent, setAccent] = useState(() => {
    return localStorage.getItem("notes-web-accent") || "#c8ff3d";
  });

  // Reader defaults (stored inside the reader's own settings object).
  const [readerTheme, setReaderTheme] = useState(() => readReaderSettings().theme || "app");
  const [readerFont, setReaderFont] = useState(() => readReaderSettings().font || "note");
  const [swipe, setSwipe] = useState(() => readReaderSettings().swipe !== false);

  // Weekly goal, storage numbers, dialog and toast.
  const [goal, setGoal] = useState(() => getWeeklyGoal());
  const [refresh, setRefresh] = useState(0);
  const [dialog, setDialog] = useState(null);
  const [toast, setToast] = useState("");
  const toastTimer = useRef(0);
  const importRef = useRef(null);

  // Internet connection.
  const [online, setOnline] = useState(() => navigator.onLine);

  // PWA installation.
  const [canInstall, setCanInstall] = useState(() => {
    return !!pwaService.getInstallPrompt();
  });

  const [isInstalled, setIsInstalled] = useState(() => {
    return pwaService.isStandalone();
  });

  const [installing, setInstalling] = useState(false);

  /* `refresh` changes after cleanups/imports so the numbers re-read storage. */
  const stats = useMemo(() => getStorageStats(), [refresh]); // eslint-disable-line react-hooks/exhaustive-deps
  const reading = useMemo(() => getReadingStats(), [refresh, goal]); // eslint-disable-line react-hooks/exhaustive-deps

  const showToast = useCallback((message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 3200);
  }, []);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  // Apply and persist the selected theme.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("notes-web-theme", theme);
  }, [theme]);

  // Apply reduced-motion preference.
  useEffect(() => {
    document.documentElement.classList.toggle(
      "notes-web-reduce-motion",
      reduceMotion
    );

    localStorage.setItem(
      "notes-web-reduce-motion",
      String(reduceMotion)
    );
  }, [reduceMotion]);

  // Apply and save reading preferences. Reader components can use these CSS variables.
  useEffect(() => {
    document.documentElement.style.setProperty("--notes-reader-font-size", `${readerFontSize}px`);
    document.documentElement.style.setProperty("--notes-reader-line-height", String(readerLineSpacing));
    localStorage.setItem("notes-web-reader-font-size", String(readerFontSize));
    localStorage.setItem("notes-web-line-spacing", String(readerLineSpacing));
  }, [readerFontSize, readerLineSpacing]);

  // Apply the selected accent across components that use --accent.
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", accent);
    document.documentElement.style.setProperty("--notes-web-accent", accent);
    localStorage.setItem("notes-web-accent", accent);
  }, [accent]);

  // Reader defaults are merged into the reader's saved settings.
  useEffect(() => {
    patchReaderSettings({ theme: readerTheme, font: readerFont, swipe });
  }, [readerTheme, readerFont, swipe]);

  useEffect(() => {
    setWeeklyGoal(goal);
  }, [goal]);

  // Close the confirm dialog with Escape.
  useEffect(() => {
    if (!dialog) return undefined;
    const onKey = (event) => event.key === "Escape" && setDialog(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dialog]);

  // Monitor internet connectivity.
  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Listen for PWA installation events.
  useEffect(() => {
    const handleInstallAvailable = () => setCanInstall(true);

    const handleInstalled = () => {
      setCanInstall(false);
      setIsInstalled(true);
    };

    window.addEventListener(
      "pwa-install-available",
      handleInstallAvailable
    );

    window.addEventListener("pwa-installed", handleInstalled);

    return () => {
      window.removeEventListener(
        "pwa-install-available",
        handleInstallAvailable
      );

      window.removeEventListener(
        "pwa-installed",
        handleInstalled
      );
    };
  }, []);

  // Install NotesWeb as a PWA.
  const handleInstall = async () => {
    if (installing) return;

    setInstalling(true);

    try {
      const result = await pwaService.install();

      if (result?.installed) {
        setCanInstall(false);
        setIsInstalled(true);
      }
    } catch (error) {
      console.error("PWA installation failed:", error);
      showToast("Installation could not be completed.");
    } finally {
      setInstalling(false);
    }
  };

  // Export NotesWeb localStorage data.
  function exportAppData() {
    try {
      const appData = {};

      Object.keys(localStorage)
        .filter((key) => key.startsWith("notes-web-"))
        .forEach((key) => {
          appData[key] = localStorage.getItem(key);
        });

      const backup = {
        app: "Notes Web",
        exportedAt: new Date().toISOString(),
        version: "1.0.0",
        data: appData,
      };

      const blob = new Blob(
        [JSON.stringify(backup, null, 2)],
        { type: "application/json" }
      );

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `notes-web-backup-${new Date()
        .toISOString()
        .slice(0, 10)}.json`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      setTimeout(() => URL.revokeObjectURL(url), 1000);
      showToast(`Backup saved (${Object.keys(appData).length} items)`);
    } catch (error) {
      console.error("NotesWeb export failed:", error);
      showToast("Could not export your data. Please try again.");
    }
  }

  // Restore a backup made by "Export backup".
  async function importAppData(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    try {
      const backup = JSON.parse(await file.text());
      const entries = Object.entries(backup?.data || {}).filter(
        ([key, value]) => key.startsWith("notes-web-") && typeof value === "string"
      );

      if (backup?.app !== "Notes Web" || entries.length === 0) {
        showToast("That file isn't a NotesWeb backup.");
        return;
      }

      setDialog({
        title: "Restore this backup?",
        message: `${entries.length} saved items will be restored. Matching items on this device are replaced; anything else is kept.`,
        confirmLabel: "Restore",
        onConfirm: () => {
          entries.forEach(([key, value]) => localStorage.setItem(key, value));
          showToast("Backup restored. Reloading…");
          setTimeout(() => window.location.reload(), 900);
        },
      });
    } catch {
      showToast("Could not read that file.");
    }
  }

  // Ask the service worker for a newer version of the app.
  async function checkForUpdates() {
    try {
      const registration = await navigator.serviceWorker?.getRegistration();

      if (!registration) {
        showToast("Updates are checked automatically when you're online.");
        return;
      }

      await registration.update();
      showToast(
        registration.waiting || registration.installing
          ? "A new version is ready. Reload to use it."
          : "You're on the latest version."
      );
    } catch {
      showToast("Couldn't check for updates right now.");
    }
  }

  function resetAppearance() {
    setTheme("light");
    setReduceMotion(false);
    setAccent("#c8ff3d");
    setReaderTheme("app");
    setReaderFont("note");
    setSwipe(true);
    showToast("Appearance reset to defaults");
  }

  function clearWith(predicate, message) {
    removeKeys(predicate);
    setRefresh((n) => n + 1);
    showToast(message);
  }

  // Clear recently opened notes.
  function clearRecent() {
    setDialog({
      title: "Clear recent history?",
      message: "Your list of recently opened notes will be emptied.",
      confirmLabel: "Clear history",
      danger: true,
      onConfirm: () => clearWith((key) => key === "notes-web-recent", "Recent history cleared."),
    });
  }

  // Clear saved reading progress, and the matching completion marks so
  // the reader and Home never disagree.
  function clearProgress() {
    setDialog({
      title: "Clear reading progress?",
      message: "Saved positions, percentages and completed marks will be removed.",
      confirmLabel: "Clear progress",
      danger: true,
      onConfirm: () =>
        clearWith(
          (key) =>
            key.startsWith("notes-web-progress-") ||
            key.startsWith("notes-web-completed-"),
          "Reading progress cleared."
        ),
    });
  }

  // Clear favorite notes.
  function clearFavorites() {
    setDialog({
      title: "Remove all favorites?",
      message: "Your favorite notes will be unmarked.",
      confirmLabel: "Remove favorites",
      danger: true,
      onConfirm: () =>
        clearWith((key) => key.startsWith("notes-web-favorite-"), "Favorites cleared."),
    });
  }

  // Clear bookmarks and sticky notes saved in the reader.
  function clearAnnotations() {
    setDialog({
      title: "Delete bookmarks and sticky notes?",
      message: "Every bookmark and sticky note you saved while reading will be deleted.",
      confirmLabel: "Delete them",
      danger: true,
      onConfirm: () =>
        clearWith((key) => key.startsWith("notes-web-annotations-"), "Bookmarks and notes deleted."),
    });
  }

  // Clear all NotesWeb localStorage data.
  function clearAllData() {
    setDialog({
      title: "Clear ALL NotesWeb data?",
      message:
        "This clears preferences, favorites, recent history, reading progress, bookmarks and streaks on this device. It cannot be undone. Export a backup first if unsure.",
      confirmLabel: "Clear everything",
      danger: true,
      onConfirm: () => {
        removeKeys((key) => key.startsWith("notes-web-"));

        setTheme("light");
        setReduceMotion(false);
        setReaderFontSize(18);
        setReaderLineSpacing(1.7);
        setAccent("#c8ff3d");
        setReaderTheme("app");
        setReaderFont("note");
        setSwipe(true);
        setGoal(5);
        setRefresh((n) => n + 1);

        showToast("NotesWeb data has been cleared.");
      },
    });
  }

  function jumpTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const usedPercent = Math.min(100, (stats.bytes / STORAGE_BUDGET) * 100);
  const goalPercent = Math.min(100, Math.round((reading.weekDone / reading.goal) * 100));
  const customAccent = !ACCENTS.some((colour) => colour.value === accent);

  return (
    <div className="settings-page">
      {/* HEADER */}
      <header className="settings-header">
        <button
          type="button"
          className="settings-back-button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          ←
        </button>

        <div className="settings-header-text">
          <span className="settings-eyebrow">PREFERENCES</span>

          <h1>Settings</h1>

          <p>Manage your reading, appearance and app data.</p>
        </div>
      </header>

      <main className="settings-content">
        {/* SNAPSHOT */}
        <section className="sx-snapshot" aria-label="Your NotesWeb at a glance">
          <div className="sx-snap-card">
            <span aria-hidden="true">🔥</span>
            <strong>{reading.streak}</strong>
            <small>day streak</small>
          </div>
          <div className="sx-snap-card">
            <span aria-hidden="true">✅</span>
            <strong>{stats.completed}</strong>
            <small>notes done</small>
          </div>
          <div className="sx-snap-card">
            <span aria-hidden="true">♥</span>
            <strong>{stats.favorites}</strong>
            <small>favorites</small>
          </div>
          <div className="sx-snap-card">
            <span aria-hidden="true">🔖</span>
            <strong>{stats.notes}</strong>
            <small>bookmarks & notes</small>
          </div>
        </section>

        {/* QUICK JUMP */}
        <nav className="sx-jump" aria-label="Jump to a section">
          {QUICK_LINKS.map((link) => (
            <button key={link.id} type="button" onClick={() => jumpTo(link.id)}>
              {link.label}
            </button>
          ))}
        </nav>

        {/* APPEARANCE */}
        <section className="settings-section" id="sx-appearance">
          <div className="settings-section-title">
            <div>
              <h2>Appearance</h2>
              <p>Choose the look that suits you.</p>
            </div>
            <button type="button" className="sx-reset" onClick={resetAppearance}>
              Reset
            </button>
          </div>

          <div className="settings-card">
            <div className="settings-item-main settings-theme-main">
              <div className="settings-item-icon">◐</div>

              <div>
                <h3>Theme preference</h3>
                <p>Your selection is saved on this device.</p>
              </div>
            </div>

            <div className="theme-options">
              <button
                type="button"
                className={`theme-option ${theme === "light" ? "active" : ""}`}
                onClick={() => setTheme("light")}
                aria-pressed={theme === "light"}
              >
                <span className="theme-preview light-preview">
                  <span />
                </span>
                <span className="theme-option-label">
                  <strong>Light</strong>
                  <small>Clean & bright</small>
                </span>
                {theme === "light" && (
                  <span className="theme-check">✓</span>
                )}
              </button>

              <button
                type="button"
                className={`theme-option ${theme === "system" ? "active" : ""}`}
                onClick={() => setTheme("system")}
                aria-pressed={theme === "system"}
              >
                <span className="theme-preview system-preview">
                  <span />
                </span>
                <span className="theme-option-label">
                  <strong>System</strong>
                  <small>Follow device</small>
                </span>
                {theme === "system" && (
                  <span className="theme-check">✓</span>
                )}
              </button>

              <button
                type="button"
                className={`theme-option ${theme === "dark" ? "active" : ""}`}
                onClick={() => setTheme("dark")}
                aria-pressed={theme === "dark"}
              >
                <span className="theme-preview dark-preview">
                  <span />
                </span>
                <span className="theme-option-label">
                  <strong>Dark</strong>
                  <small>Low-light comfort</small>
                </span>
                {theme === "dark" && (
                  <span className="theme-check">✓</span>
                )}
              </button>
            </div>
          </div>

          <div className="settings-card settings-preference-card">
            <div className="settings-item-main">
              <div className="settings-item-icon">⌁</div>

              <div className="settings-item-copy">
                <h3>Reduce animations</h3>
                <p>
                  Minimize interface motion for a calmer experience.
                </p>
              </div>
            </div>

            <label className="settings-switch">
              <input
                type="checkbox"
                checked={reduceMotion}
                onChange={(event) =>
                  setReduceMotion(event.target.checked)
                }
                aria-label="Reduce animations"
              />
              <span className="settings-switch-track" />
            </label>
          </div>

          <div className="settings-card settings-accent-card">
            <div className="settings-setting-row">
              <div className="settings-item-main">
                <div className="settings-item-icon">✦</div>
                <div>
                  <h3>Accent colour</h3>
                  <p>Choose a highlight colour for supported controls.</p>
                </div>
              </div>
              <div className="settings-accent-options" role="group" aria-label="Accent colour">
                {ACCENTS.map((colour) => (
                  <button
                    key={colour.value}
                    type="button"
                    className={`settings-accent-swatch ${accent === colour.value ? "active" : ""}`}
                    style={{ "--swatch-colour": colour.value }}
                    onClick={() => setAccent(colour.value)}
                    aria-label={`${colour.name} accent colour`}
                    aria-pressed={accent === colour.value}
                    title={colour.name}
                  >
                    {accent === colour.value ? "✓" : ""}
                  </button>
                ))}

                <label
                  className={`settings-accent-swatch sx-custom ${customAccent ? "active" : ""}`}
                  style={{ "--swatch-colour": customAccent ? accent : "transparent" }}
                  title="Pick your own colour"
                >
                  <span aria-hidden="true">{customAccent ? "✓" : "+"}</span>
                  <input
                    type="color"
                    value={/^#[0-9a-f]{6}$/i.test(accent) ? accent : "#c8ff3d"}
                    onChange={(event) => setAccent(event.target.value)}
                    aria-label="Custom accent colour"
                  />
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* READING & DISCOVERY */}
        <section className="settings-section" id="sx-reading">
          <div className="settings-section-title">
            <div>
              <h2>Reading & discovery</h2>
              <p>Get back to learning without extra steps.</p>
            </div>
          </div>

          <div className="settings-card settings-reading-card">
            <div className="settings-reading-control">
              <div className="settings-reading-label">
                <div>
                  <h3>Reader text size</h3>
                  <p>Adjust the text size for reading notes.</p>
                </div>
                <output htmlFor="reader-font-size">{readerFontSize}px</output>
              </div>
              <input
                id="reader-font-size"
                className="settings-range"
                type="range"
                min="14"
                max="26"
                step="1"
                value={readerFontSize}
                onChange={(event) => setReaderFontSize(Number(event.target.value))}
                aria-label="Reader text size"
              />
              <div className="settings-range-ends"><span>A</span><span className="large-a">A</span></div>
            </div>
            <div className="settings-reading-control">
              <div className="settings-reading-label">
                <div>
                  <h3>Line spacing</h3>
                  <p>Give paragraphs more room to breathe.</p>
                </div>
                <output htmlFor="reader-line-spacing">{Number(readerLineSpacing).toFixed(1)}×</output>
              </div>
              <input
                id="reader-line-spacing"
                className="settings-range"
                type="range"
                min="1.3"
                max="2.2"
                step="0.1"
                value={readerLineSpacing}
                onChange={(event) => setReaderLineSpacing(Number(event.target.value))}
                aria-label="Reader line spacing"
              />
              <div className="settings-range-ends"><span>Compact</span><span>Relaxed</span></div>
            </div>
            <div className="settings-reader-preview">
              <span className="settings-preview-label">LIVE PREVIEW</span>
              <p style={{ fontSize: `${readerFontSize}px`, lineHeight: readerLineSpacing }}>Readable notes help you focus on the ideas that matter.</p>
            </div>
          </div>

          {/* Reader defaults */}
          <div className="settings-card sx-reader-card">
            <div className="settings-item-main sx-card-head">
              <div className="settings-item-icon">📖</div>
              <div>
                <h3>Reader defaults</h3>
                <p>Used when you open a note. You can still change them inside the reader.</p>
              </div>
            </div>

            <div className="sx-group">
              <span className="sx-group-label">Reading theme</span>
              <div className="sx-theme-grid" role="group" aria-label="Reading theme">
                {READER_THEMES.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`sx-theme-tile sx-theme-${option.value} ${readerTheme === option.value ? "active" : ""}`}
                    onClick={() => setReaderTheme(option.value)}
                    aria-pressed={readerTheme === option.value}
                  >
                    <span className="sx-theme-swatch" aria-hidden="true">Aa</span>
                    <strong>{option.label}</strong>
                    <small>{option.note}</small>
                  </button>
                ))}
              </div>
            </div>

            <div className="sx-group">
              <span className="sx-group-label">Reading font</span>
              <div className="sx-chip-row" role="group" aria-label="Reading font">
                {READER_FONTS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`sx-chip ${readerFont === option.value ? "active" : ""}`}
                    onClick={() => setReaderFont(option.value)}
                    aria-pressed={readerFont === option.value}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <p className="sx-hint">Web fonts need an internet connection the first time.</p>
            </div>

            <div className="settings-preference-card sx-inline-switch">
              <div className="settings-item-copy">
                <h3>Swipe to change notes</h3>
                <p>Swipe left or right inside a note for the next or previous one.</p>
              </div>
              <label className="settings-switch">
                <input
                  type="checkbox"
                  checked={swipe}
                  onChange={(event) => setSwipe(event.target.checked)}
                  aria-label="Swipe to change notes"
                />
                <span className="settings-switch-track" />
              </label>
            </div>
          </div>

          <div className="settings-card">
            <button
              type="button"
              className="settings-link-item"
              onClick={() => navigate("/recent")}
            >
              <div className="settings-item-main">
                <div className="settings-item-icon">◷</div>
                <div>
                  <h3>Recent notes</h3>
                  <p>Continue where you left off.</p>
                </div>
              </div>
              <span className="settings-chevron">↗</span>
            </button>

            <button
              type="button"
              className="settings-link-item"
              onClick={() => navigate("/subjects")}
            >
              <div className="settings-item-main">
                <div className="settings-item-icon">▤</div>
                <div>
                  <h3>Browse subjects</h3>
                  <p>Explore your available study material.</p>
                </div>
              </div>
              <span className="settings-chevron">↗</span>
            </button>
          </div>
        </section>

        {/* GOALS */}
        <section className="settings-section" id="sx-goals">
          <div className="settings-section-title">
            <div>
              <h2>Goals & streak</h2>
              <p>Small targets keep you going.</p>
            </div>
          </div>

          <div className="settings-card sx-goal-card">
            <div className="sx-goal-top">
              <div
                className="sx-goal-ring"
                style={{ "--pct": `${goalPercent}%` }}
                role="img"
                aria-label={`${reading.weekDone} of ${reading.goal} notes finished this week`}
              >
                <span>{reading.weekDone}/{reading.goal}</span>
              </div>

              <div className="sx-goal-copy">
                <h3>Weekly goal</h3>
                <p>Notes to finish each week (Monday to Sunday).</p>
              </div>
            </div>

            <div className="sx-stepper" role="group" aria-label="Weekly goal">
              <button
                type="button"
                onClick={() => setGoal((g) => Math.max(1, g - 1))}
                disabled={goal <= 1}
                aria-label="Lower weekly goal"
              >
                −
              </button>
              <output aria-live="polite">{goal} {goal === 1 ? "note" : "notes"} / week</output>
              <button
                type="button"
                onClick={() => setGoal((g) => Math.min(20, g + 1))}
                disabled={goal >= 20}
                aria-label="Raise weekly goal"
              >
                +
              </button>
            </div>

            <div className="sx-badges" aria-label="Badges">
              {reading.badges.map((badge) => (
                <span
                  key={badge.id}
                  className={`sx-badge ${badge.earned ? "earned" : ""}`}
                  title={badge.earned ? "Earned" : "Not earned yet"}
                >
                  <span aria-hidden="true">{badge.icon}</span>
                  {badge.label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* APP STATUS & INSTALL */}
        <section className="settings-section" id="sx-app">
          <div className="settings-section-title">
            <div>
              <h2>App & connectivity</h2>
              <p>Check your connection and app installation.</p>
            </div>
          </div>

          <div className="settings-card">
            <div className="settings-link-item static-item">
              <div className="settings-item-main">
                <div className={`settings-item-icon ${online ? "online" : "offline"}`}>
                  {online ? "●" : "⊘"}
                </div>

                <div>
                  <h3>{online ? "You're online" : "You're offline"}</h3>
                  <p>
                    {online
                      ? "Internet connection is available."
                      : "Cached content may still be available."}
                  </p>
                </div>
              </div>

              <span className={`status-pill ${online ? "online" : "offline"}`}>
                {online ? "CONNECTED" : "OFFLINE"}
              </span>
            </div>

            <button type="button" className="settings-link-item" onClick={checkForUpdates}>
              <div className="settings-item-main">
                <div className="settings-item-icon">⟳</div>
                <div>
                  <h3>Check for updates</h3>
                  <p>Look for a newer version of NotesWeb.</p>
                </div>
              </div>
              <span className="settings-chevron">›</span>
            </button>

            <div className="pwa-install-section">
              <div className="pwa-install-card">
                <div className="pwa-install-icon">↥</div>

                <div className="pwa-install-content">
                  <span className="settings-welcome-label">
                    YOUR APP, ONE TAP AWAY
                  </span>

                  <h3>NotesWeb on your home screen</h3>

                  <p>
                    {isInstalled
                      ? "NotesWeb is installed on this device."
                      : "Install the app for convenient access and an app-like experience."}
                  </p>

                  {isInstalled ? (
                    <span className="pwa-install-success">
                      ✓ App installed
                    </span>
                  ) : canInstall ? (
                    <button
                      type="button"
                      className="install-app-button"
                      onClick={handleInstall}
                      disabled={installing}
                    >
                      {installing ? "Installing..." : "Install NotesWeb"}
                      {!installing && <span>↗</span>}
                    </button>
                  ) : (
                    <p className="install-help-text">
                      If installation is supported, open your browser menu
                      and choose “Install app” or “Add to Home screen”.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DATA & BACKUP */}
        <section className="settings-section" id="sx-data">
          <div className="settings-section-title">
            <div>
              <h2>Your data</h2>
              <p>Manage your saved preferences and activity.</p>
            </div>
          </div>

          <div className="settings-card sx-storage-card">
            <div className="sx-storage-head">
              <div>
                <h3>Storage on this device</h3>
                <p>
                  {formatBytes(stats.bytes)} used · {stats.keys} saved items
                </p>
              </div>
              <span className="sx-storage-pct">{usedPercent < 1 ? "<1" : Math.round(usedPercent)}%</span>
            </div>
            <div
              className="sx-meter"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(usedPercent)}
              aria-label="Storage used"
            >
              <i style={{ width: `${Math.max(2, usedPercent)}%` }} />
            </div>
            <ul className="sx-storage-list">
              <li><b>{stats.progress}</b> notes with progress</li>
              <li><b>{stats.completed}</b> completed</li>
              <li><b>{stats.recent}</b> in recent history</li>
              <li><b>{stats.notes}</b> bookmarks & notes</li>
            </ul>
          </div>

          <div className="settings-card settings-data-card">
            <div className="settings-data-intro">
              <div className="settings-item-icon">⇩</div>
              <div>
                <h3>Backup & restore</h3>
                <p>
                  Download a JSON backup of NotesWeb data, or restore one.
                </p>
              </div>
            </div>

            <div className="sx-backup-row">
              <button
                type="button"
                className="settings-export-button"
                onClick={exportAppData}
              >
                Export backup <span>↓</span>
              </button>

              <button
                type="button"
                className="settings-export-button"
                onClick={() => importRef.current?.click()}
              >
                Import backup <span>↑</span>
              </button>
              <input
                ref={importRef}
                type="file"
                accept="application/json,.json"
                className="sx-file-input"
                onChange={importAppData}
                aria-label="Choose a NotesWeb backup file"
                tabIndex={-1}
              />
            </div>

            <p className="settings-data-note">
              Note: This export does not include separate files from your
              public folder or browser cache.
            </p>
          </div>

          <div className="settings-card settings-cleanup-card">
            <div className="settings-cleanup-heading">
              <h3>Cleanup tools</h3>
              <p>Remove only the data you no longer need.</p>
            </div>

            <button
              type="button"
              className="settings-danger-item"
              onClick={clearRecent}
            >
              <span className="danger-icon">◷</span>
              <span>Clear recent history</span>
              <span className="settings-danger-arrow">›</span>
            </button>

            <button
              type="button"
              className="settings-danger-item"
              onClick={clearProgress}
            >
              <span className="danger-icon">▤</span>
              <span>Clear reading progress</span>
              <span className="settings-danger-arrow">›</span>
            </button>

            <button
              type="button"
              className="settings-danger-item"
              onClick={clearFavorites}
            >
              <span className="danger-icon">♡</span>
              <span>Clear favorite notes</span>
              <span className="settings-danger-arrow">›</span>
            </button>

            <button
              type="button"
              className="settings-danger-item"
              onClick={clearAnnotations}
            >
              <span className="danger-icon">🔖</span>
              <span>Clear bookmarks & sticky notes</span>
              <span className="settings-danger-arrow">›</span>
            </button>

            <button
              type="button"
              className="settings-danger-item danger-all"
              onClick={clearAllData}
            >
              <span className="danger-icon">!</span>
              <span>Clear all NotesWeb data</span>
              <span className="settings-danger-arrow">›</span>
            </button>
          </div>
        </section>

        {/* ABOUT */}
        <section className="settings-section">
          <div className="settings-section-title">
            <div>
              <h2>About NotesWeb</h2>
              <p>A little more about your learning space.</p>
            </div>
          </div>

          <button
            type="button"
            className="settings-about-link"
            onClick={() => navigate("/about")}
          >
            <div className="settings-about-card">
              <div className="settings-about-logo">N.</div>

              <div className="settings-about-content">
                <h2>NotesWeb</h2>
                <p>Learn. Read. Remember.</p>
                <span className="settings-about-version">
                  About Us · Version 1.0.0
                </span>
              </div>

              <span className="settings-about-arrow">↗</span>
            </div>
          </button>
        </section>

        <footer className="settings-footer">
          <span className="settings-footer-mark">N.</span>
          <p>NotesWeb</p>
          <span>Preferences are saved on this device.</span>
        </footer>

        <div className="settings-bottom-space" />
      </main>

      {dialog && (
        <div className="sx-overlay" onClick={() => setDialog(null)}>
          <div
            className="sx-dialog"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="sx-dialog-title"
            aria-describedby="sx-dialog-message"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="sx-dialog-title">{dialog.title}</h2>
            <p id="sx-dialog-message">{dialog.message}</p>
            <div className="sx-dialog-actions">
              <button type="button" autoFocus onClick={() => setDialog(null)}>
                Cancel
              </button>
              <button
                type="button"
                className={dialog.danger ? "danger" : "primary"}
                onClick={() => {
                  const action = dialog.onConfirm;
                  setDialog(null);
                  action();
                }}
              >
                {dialog.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="sx-toast" role="status" aria-live="polite">
          {toast}
        </div>
      )}

      <BottomNavigation />
    </div>
  );
}

export default Settings;