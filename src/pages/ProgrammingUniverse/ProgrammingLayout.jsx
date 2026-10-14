import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./programming-universe.css";

// Four primary destinations. Practice, chapters and gameplay are contextual
// screens, so they highlight the destination they belong to instead.
const navItems = [
  { to: "/programming", label: "Universe", icon: "⌂", end: true, also: ["/programming/chapters"] },
  { to: "/programming/subjects", label: "Subjects", icon: "▦", also: ["/programming/practice"] },
  { to: "/programming/interviews", label: "Interviews", icon: "Q/A" },
  { to: "/programming/progress", label: "Progress", icon: "↗" },
];

export default function ProgrammingLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // Hide the global navigation during an active level so it never covers answer controls.
  const isPlayingLevel = pathname === "/programming/play" || pathname.startsWith("/programming/play/");

  return (
    <div className={`pu-app${isPlayingLevel ? " pu-app-playing" : ""}`}>
      <header className="pu-topbar">
        <button type="button" className="pu-brand" onClick={() => navigate("/programming")} aria-label="Programming Universe home">
          <span className="pu-brand-icon" aria-hidden="true">⌘</span>
          <span><strong>PROGRAMMING UNIVERSE</strong><small>NOTESWEB LEARNING LAB</small></span>
        </button>
        <button type="button" className="pu-back" onClick={() => navigate("/")} aria-label="Return to NotesWeb">← <span>NotesWeb</span></button>
      </header>
      <main className="pu-main"><Outlet /></main>
      {!isPlayingLevel && (
        <nav className="pu-bottom-nav" aria-label="Programming Universe navigation">
          {navItems.map((item) => {
            const related = (item.also || []).some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `pu-nav-item${isActive || related ? " active" : ""}`}
              >
                <span className="pu-nav-icon" aria-hidden="true">{item.icon}</span><span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      )}
    </div>
  );
}