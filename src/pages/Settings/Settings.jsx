import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BottomNavigation from "../../components/layout/BottomNavigation";
import pwaService from "../../services/pwaService";

import "./Settings.css";

function Settings() {
  const navigate = useNavigate();

  /* =========================================================
     THEME
  ========================================================= */

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("notes-web-theme") || "system";
  });

  /* =========================================================
     ONLINE / OFFLINE
  ========================================================= */

  const [online, setOnline] = useState(() => navigator.onLine);

  /* =========================================================
     PWA
  ========================================================= */

  const [canInstall, setCanInstall] = useState(() => {
    return !!pwaService.getInstallPrompt();
  });

  const [isInstalled, setIsInstalled] = useState(() => {
    return pwaService.isStandalone();
  });

  const [installing, setInstalling] = useState(false);

  /* =========================================================
     THEME EFFECT
  ========================================================= */

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else if (theme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.setAttribute("data-theme", "system");
    }

    localStorage.setItem("notes-web-theme", theme);
  }, [theme]);

  /* =========================================================
     ONLINE / OFFLINE EFFECT
  ========================================================= */

  useEffect(() => {
    const handleOnline = () => {
      setOnline(true);
    };

    const handleOffline = () => {
      setOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  /* =========================================================
     PWA INSTALL EVENTS
  ========================================================= */

  useEffect(() => {
    const handleInstallAvailable = () => {
      setCanInstall(true);
    };

    const handleInstalled = () => {
      setCanInstall(false);
      setIsInstalled(true);
    };

    window.addEventListener(
      "pwa-install-available",
      handleInstallAvailable
    );

    window.addEventListener(
      "pwa-installed",
      handleInstalled
    );

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

  /* =========================================================
     INSTALL APP
  ========================================================= */

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
    } finally {
      setInstalling(false);
    }
  };

  /* =========================================================
     CLEAR RECENT
  ========================================================= */

  function clearRecent() {
    const confirmed = window.confirm(
      "Clear all recently opened notes?"
    );

    if (!confirmed) return;

    localStorage.removeItem("notes-web-recent");

    alert("Recent history cleared.");
  }

  /* =========================================================
     CLEAR PROGRESS
  ========================================================= */

  function clearProgress() {
    const confirmed = window.confirm(
      "Clear all reading progress?"
    );

    if (!confirmed) return;

    Object.keys(localStorage)
      .filter((key) =>
        key.startsWith("notes-web-progress-")
      )
      .forEach((key) => {
        localStorage.removeItem(key);
      });

    alert("Reading progress cleared.");
  }

  /* =========================================================
     CLEAR FAVORITES
  ========================================================= */

  function clearFavorites() {
    const confirmed = window.confirm(
      "Remove all favorite notes?"
    );

    if (!confirmed) return;

    Object.keys(localStorage)
      .filter((key) =>
        key.startsWith("notes-web-favorite-")
      )
      .forEach((key) => {
        localStorage.removeItem(key);
      });

    alert("Favorites cleared.");
  }

  /* =========================================================
     CLEAR ALL DATA
  ========================================================= */

  function clearAllData() {
    const confirmed = window.confirm(
      "This will clear favorites, recent history, and reading progress. Continue?"
    );

    if (!confirmed) return;

    Object.keys(localStorage)
      .filter((key) =>
        key.startsWith("notes-web-")
      )
      .forEach((key) => {
        localStorage.removeItem(key);
      });

    setTheme("system");

    alert("Notes Web data has been cleared.");
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="settings-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="settings-header">

        <button
          type="button"
          className="settings-back-button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <span className="settings-icon">
            ←
          </span>
        </button>

        <div className="settings-header-text">
          <h1>Settings</h1>

          <p>
            Customize your Notes Web experience
          </p>
        </div>

      </header>


      <main className="settings-content">

        {/* ===================================================
            APPEARANCE
        =================================================== */}

        <section className="settings-section">

          <div className="settings-section-title">
            <span>Appearance</span>
          </div>

          <div className="settings-card">

            <div className="settings-item-main settings-theme-main">

              <div className="settings-item-icon">
                <span>◐</span>
              </div>

              <div>
                <h3>Theme</h3>

                <p>
                  Choose how Notes Web looks
                </p>
              </div>

            </div>


            <div className="theme-options">

              {/* LIGHT */}

              <button
                type="button"
                className={
                  theme === "light"
                    ? "theme-option active"
                    : "theme-option"
                }
                onClick={() => setTheme("light")}
                aria-pressed={theme === "light"}
              >
                <span className="theme-icon">
                  ☀
                </span>

                <span>Light</span>
              </button>


              {/* SYSTEM */}

              <button
                type="button"
                className={
                  theme === "system"
                    ? "theme-option active"
                    : "theme-option"
                }
                onClick={() => setTheme("system")}
                aria-pressed={theme === "system"}
              >
                <span className="theme-icon">
                  ◉
                </span>

                <span>System</span>
              </button>


              {/* DARK */}

              <button
                type="button"
                className={
                  theme === "dark"
                    ? "theme-option active"
                    : "theme-option"
                }
                onClick={() => setTheme("dark")}
                aria-pressed={theme === "dark"}
              >
                <span className="theme-icon">
                  ☾
                </span>

                <span>Dark</span>
              </button>

            </div>

          </div>

        </section>


        {/* ===================================================
            READING
        =================================================== */}

        <section className="settings-section">

          <div className="settings-section-title">
            <span>Reading</span>
          </div>

          <div className="settings-card">

            {/* RECENT */}

            <button
              type="button"
              className="settings-link-item"
              onClick={() => navigate("/recent")}
            >

              <div className="settings-item-main">

                <div className="settings-item-icon">
                  <span>◷</span>
                </div>

                <div>
                  <h3>Recent Notes</h3>

                  <p>
                    View notes you opened recently
                  </p>
                </div>

              </div>

              <span className="settings-chevron">
                ›
              </span>

            </button>


            {/* BROWSE NOTES */}

            <button
              type="button"
              className="settings-link-item"
              onClick={() => navigate("/subjects")}
            >

              <div className="settings-item-main">

                <div className="settings-item-icon">
                  <span>▤</span>
                </div>

                <div>
                  <h3>Browse Notes</h3>

                  <p>
                    Explore all available subjects
                  </p>
                </div>

              </div>

              <span className="settings-chevron">
                ›
              </span>

            </button>

          </div>

        </section>


        {/* ===================================================
            APP
        =================================================== */}

        <section className="settings-section">

          <div className="settings-section-title">
            <span>App</span>
          </div>

          <div className="settings-card">

            {/* ONLINE / OFFLINE */}

            <div className="settings-link-item static-item">

              <div className="settings-item-main">

                <div
                  className={
                    online
                      ? "settings-item-icon online"
                      : "settings-item-icon offline"
                  }
                >
                  <span>
                    {online ? "◉" : "⊘"}
                  </span>
                </div>

                <div>
                  <h3>
                    {online
                      ? "Online"
                      : "Offline"}
                  </h3>

                  <p>
                    {online
                      ? "Internet connection available"
                      : "You can still read cached notes"}
                  </p>
                </div>

              </div>

              <span
                className={
                  online
                    ? "status-dot online"
                    : "status-dot offline"
                }
              />

            </div>


            {/* =================================================
                INSTALL APP
            ================================================= */}

            <div className="pwa-install-section">

              <div className="pwa-install-card">

                <div className="pwa-install-icon">
                  <span>⇩</span>
                </div>

                <div className="pwa-install-content">

                  <h3>
                    Notes Web App
                  </h3>

                  {isInstalled ? (
                    <p className="pwa-install-success">
                      Notes Web is already installed
                      on this device.
                    </p>
                  ) : (
                    <p>
                      Install Notes Web on your home
                      screen for faster access and
                      offline-friendly reading.
                    </p>
                  )}

                  {!isInstalled && canInstall && (
                    <button
                      type="button"
                      className="install-app-button"
                      onClick={handleInstall}
                      disabled={installing}
                    >
                      <span className="install-button-icon">
                        ⇩
                      </span>

                      <span>
                        {installing
                          ? "Installing..."
                          : "Install App"}
                      </span>
                    </button>
                  )}

                  {!isInstalled && !canInstall && (
                    <p className="install-help-text">
                      If the Install button is not
                      available, open your browser menu
                      and choose "Install app" or
                      "Add to Home screen".
                    </p>
                  )}

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ===================================================
            DATA
        =================================================== */}

        <section className="settings-section">

          <div className="settings-section-title">
            <span>Your Data</span>
          </div>

          <div className="settings-card">

            {/* CLEAR RECENT */}

            <button
              type="button"
              className="settings-danger-item"
              onClick={clearRecent}
            >
              <span className="danger-icon">
                ◷
              </span>

              <span>
                Clear Recent History
              </span>
            </button>


            {/* CLEAR PROGRESS */}

            <button
              type="button"
              className="settings-danger-item"
              onClick={clearProgress}
            >
              <span className="danger-icon">
                ▤
              </span>

              <span>
                Clear Reading Progress
              </span>
            </button>


            {/* CLEAR FAVORITES */}

            <button
              type="button"
              className="settings-danger-item"
              onClick={clearFavorites}
            >
              <span className="danger-icon">
                ♡
              </span>

              <span>
                Clear Favorites
              </span>
            </button>


            {/* CLEAR ALL */}

            <button
              type="button"
              className="settings-danger-item danger-all"
              onClick={clearAllData}
            >
              <span className="danger-icon">
                ×
              </span>

              <span>
                Clear All Notes Web Data
              </span>
            </button>

          </div>

        </section>


        {/* ===================================================
            ABOUT
        =================================================== */}

        <section className="settings-section">

          <div className="settings-section-title">
            <span>About</span>
          </div>

          <div className="settings-about-card">

            <div className="settings-about-logo">
              ▤
            </div>

            <div>
              <h2>
                Notes Web
              </h2>

              <p>
                Learn. Read. Remember.
              </p>

              <span>
                Version 1.0.0
              </span>
            </div>

          </div>


          <div className="settings-about-info">

            <span className="settings-info-icon">
              i
            </span>

            <p>
              A simple, mobile-first notes
              application designed for focused
              learning and quick revision.
            </p>

          </div>

        </section>


        <div className="settings-bottom-space" />

      </main>


      {/* =====================================================
          COMMON MOBILE NAVIGATION
      ===================================================== */}

      <BottomNavigation />

    </div>
  );
}

export default Settings;