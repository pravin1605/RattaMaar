import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BottomNavigation from "../../components/layout/BottomNavigation";
import pwaService from "../../services/pwaService";

import "./Settings.css";

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
      window.alert("Installation could not be completed.");
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
    } catch (error) {
      console.error("NotesWeb export failed:", error);
      window.alert("Could not export your data. Please try again.");
    }
  }

  // Clear recently opened notes.
  function clearRecent() {
    if (!window.confirm("Clear all recently opened notes?")) return;

    localStorage.removeItem("notes-web-recent");
    window.alert("Recent history cleared.");
  }

  // Clear saved reading progress.
  function clearProgress() {
    if (!window.confirm("Clear all reading progress?")) return;

    Object.keys(localStorage)
      .filter((key) => key.startsWith("notes-web-progress-"))
      .forEach((key) => localStorage.removeItem(key));

    window.alert("Reading progress cleared.");
  }

  // Clear favorite notes.
  function clearFavorites() {
    if (!window.confirm("Remove all favorite notes?")) return;

    Object.keys(localStorage)
      .filter((key) => key.startsWith("notes-web-favorite-"))
      .forEach((key) => localStorage.removeItem(key));

    window.alert("Favorites cleared.");
  }

  // Clear all NotesWeb localStorage data.
  function clearAllData() {
    const confirmed = window.confirm(
      "This will clear NotesWeb preferences, favorites, recent history, " +
      "and reading progress. This action cannot be undone. Continue?"
    );

    if (!confirmed) return;

    Object.keys(localStorage)
      .filter((key) => key.startsWith("notes-web-"))
      .forEach((key) => localStorage.removeItem(key));

    setTheme("light");
    setReduceMotion(false);
    setReaderFontSize(18);
    setReaderLineSpacing(1.7);
    setAccent("#c8ff3d");

    window.alert("NotesWeb data has been cleared.");
  }

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
        {/* APPEARANCE */}
        <section className="settings-section">
          <div className="settings-section-title">
            <div>
              <h2>Appearance</h2>
              <p>Choose the look that suits you.</p>
            </div>
            <span className="settings-section-number">01</span>
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
                {[
                  { name: "Lime", value: "#c8ff3d" },
                  { name: "Violet", value: "#a78bfa" },
                  { name: "Blue", value: "#60a5fa" },
                  { name: "Rose", value: "#fb7185" },
                  { name: "Amber", value: "#fbbf24" },
                ].map((colour) => (
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
              </div>
            </div>
          </div>
        </section>

        {/* READING & DISCOVERY */}
        <section className="settings-section">
          <div className="settings-section-title">
            <div>
              <h2>Reading & discovery</h2>
              <p>Get back to learning without extra steps.</p>
            </div>
            <span className="settings-section-number">02</span>
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

        {/* APP STATUS & INSTALL */}
        <section className="settings-section">
          <div className="settings-section-title">
            <div>
              <h2>App & connectivity</h2>
              <p>Check your connection and app installation.</p>
            </div>
            <span className="settings-section-number">03</span>
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
        <section className="settings-section">
          <div className="settings-section-title">
            <div>
              <h2>Your data</h2>
              <p>Manage your saved preferences and activity.</p>
            </div>
            <span className="settings-section-number">04</span>
          </div>

          <div className="settings-card settings-data-card">
            <div className="settings-data-intro">
              <div className="settings-item-icon">⇩</div>
              <div>
                <h3>Export app data</h3>
                <p>
                  Download a JSON backup of NotesWeb localStorage data.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="settings-export-button"
              onClick={exportAppData}
            >
              Export backup <span>↓</span>
            </button>

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
            <span className="settings-section-number">05</span>
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

      <BottomNavigation />
    </div>
  );
}

export default Settings;