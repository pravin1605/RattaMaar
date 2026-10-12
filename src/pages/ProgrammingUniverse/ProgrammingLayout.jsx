import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./programming-universe.css";

const navItems = [
  { to: "/programming", label: "Universe", icon: "⌂", end: true },
  { to: "/programming/subjects", label: "Subjects", icon: "▦" },
  { to: "/programming/practice", label: "Practice", icon: "⌘" },
  { to: "/programming/interviews", label: "Interviews", icon: "Q/A" },
  { to: "/programming/progress", label: "Progress", icon: "↗" },
];

export default function ProgrammingLayout() {
  const navigate = useNavigate();
  return (
    <div className="pu-app">
      <header className="pu-topbar">
        <button className="pu-brand" onClick={() => navigate("/programming")} aria-label="Programming Universe home">
          <span className="pu-brand-icon">⌘</span>
          <span><strong>PROGRAMMING UNIVERSE</strong><small>NOTESWEB LEARNING LAB</small></span>
        </button>
        <button className="pu-back" onClick={() => navigate("/")}>← <span>NotesWeb</span></button>
      </header>
      <main className="pu-main"><Outlet /></main>
      <nav className="pu-bottom-nav" aria-label="Programming Universe navigation">
        {navItems.map((item) => <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => `pu-nav-item${isActive ? " active" : ""}`}>
          <span className="pu-nav-icon" aria-hidden="true">{item.icon}</span><span>{item.label}</span>
        </NavLink>)}
      </nav>
    </div>
  );
}
