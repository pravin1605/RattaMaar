import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import "./BottomNavigation.css";

/* Crisp SVG icons (outline when idle, filled when active). */
function Icon({ name, active }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: active ? 1.9 : 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    focusable: "false",
  };
  const fill = "none";

  switch (name) {
    case "home":
      return (
        <svg {...common}>
          <path
            d="M3.5 10.8 12 3.6l8.5 7.2V19a1.5 1.5 0 0 1-1.5 1.5h-4.2v-5.4H9.2v5.4H5A1.5 1.5 0 0 1 3.5 19z"
            fill={fill}
            fillOpacity={0}
          />
        </svg>
      );
    case "notes":
      return (
        <svg {...common}>
          <path
            d="M12 6.6C10.4 5.1 8 4.5 4 4.5v13c4 0 6.4.6 8 2.1 1.6-1.5 4-2.1 8-2.1v-13c-4 0-6.4.6-8 2.1z"
            fill={fill}
            fillOpacity={0}
          />
          <path d="M12 6.6v13" />
        </svg>
      );
    case "favorites":
      return (
        <svg {...common}>
          <path
            d="M12 20.3s-7.6-4.6-9.1-9.3C1.8 7.5 3.9 4.5 7.1 4.5c1.9 0 3.5 1 4.9 2.8 1.4-1.8 3-2.8 4.9-2.8 3.2 0 5.3 3 4.2 6.5-1.5 4.7-9.1 9.3-9.1 9.3z"
            fill={fill}
            fillOpacity={0}
          />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M4 7h9M19 7h1M4 17h1M11 17h9" />
          <circle cx="16" cy="7" r="2.4" fill={fill} fillOpacity={0} />
          <circle cx="8" cy="17" r="2.4" fill={fill} fillOpacity={0} />
        </svg>
      );
  }
}

const TABS = [
  { to: "/", label: "Home", icon: "home" },
  { to: "/subjects", label: "Notes", icon: "notes" },
  { to: "/favorites", label: "Favorites", icon: "favorites" },
  { to: "/settings", label: "Settings", icon: "settings" },
];

/* Which tab is highlighted for the current URL (-1 = none). */
function getActiveIndex(pathname) {
  if (pathname === "/") return 0;
  return TABS.findIndex(
    (tab, index) =>
      index > 0 && (pathname === tab.to || pathname.startsWith(`${tab.to}/`))
  );
}

function countFavorites() {
  try {
    return Object.keys(localStorage).filter(
      (key) =>
        key.startsWith("notes-web-favorite-") &&
        localStorage.getItem(key) === "true"
    ).length;
  } catch {
    return 0;
  }
}

function BottomNavigation() {
  const { pathname } = useLocation();
  const [favoriteCount, setFavoriteCount] = useState(countFavorites);

  const activeIndex = getActiveIndex(pathname);

  /* Refresh the badge whenever you move between pages or return to the app. */
  useEffect(() => {
    setFavoriteCount(countFavorites());

    const refresh = () => setFavoriteCount(countFavorites());
    window.addEventListener("focus", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("focus", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [pathname]);

  return (
    <nav
      className="bottom-navigation"
      aria-label="Main navigation"
      style={{ "--bn-index": Math.max(activeIndex, 0) }}
    >
      <span
        className={`bn-indicator ${activeIndex < 0 ? "is-hidden" : ""}`}
        aria-hidden="true"
      />

      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === "/"}
          className={({ isActive }) =>
            isActive ? "bottom-nav-item active" : "bottom-nav-item"
          }
        >
          {({ isActive }) => (
            <>
              <span className="bottom-nav-icon">
                <Icon name={tab.icon} active={isActive} />
                {tab.icon === "favorites" && favoriteCount > 0 && (
                  <span
                    className="bn-badge"
                    aria-label={`${favoriteCount} favorites`}
                  >
                    {favoriteCount > 99 ? "99+" : favoriteCount}
                  </span>
                )}
              </span>
              <span className="bn-label">{tab.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

export default BottomNavigation;