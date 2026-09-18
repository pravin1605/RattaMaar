import { NavLink } from "react-router-dom";

import "./BottomNavigation.css";

function BottomNavigation() {
  return (
    <nav className="bottom-navigation">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "bottom-nav-item active" : "bottom-nav-item"
        }
      >
        <span className="bottom-nav-icon">⌂</span>
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/subjects"
        className={({ isActive }) =>
          isActive ? "bottom-nav-item active" : "bottom-nav-item"
        }
      >
        <span className="bottom-nav-icon">▤</span>
        <span>Notes</span>
      </NavLink>

      <NavLink
        to="/favorites"
        className={({ isActive }) =>
          isActive ? "bottom-nav-item active" : "bottom-nav-item"
        }
      >
        <span className="bottom-nav-icon">♡</span>
        <span>Favorites</span>
      </NavLink>

      <NavLink
        to="/settings"
        className={({ isActive }) =>
          isActive ? "bottom-nav-item active" : "bottom-nav-item"
        }
      >
        <span className="bottom-nav-icon">⚙</span>
        <span>Settings</span>
      </NavLink>
    </nav>
  );
}

export default BottomNavigation;