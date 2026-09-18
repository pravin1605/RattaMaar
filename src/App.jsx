import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Subjects from "./pages/Subjects/Subjects";
import Notes from "./pages/Notes/Notes";
import NoteReader from "./pages/NoteReader/NoteReader";
import Favorites from "./pages/Favorites/Favorites";
import Recent from "./pages/Recent/Recent";
import Settings from "./pages/Settings/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            HOME
        ========================= */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* =========================
            ALL SUBJECTS
        ========================= */}
        <Route
          path="/subjects"
          element={<Subjects />}
        />

        {/* =========================
            SUBJECT NOTES
            Example:
            /subjects/java
        ========================= */}
        <Route
          path="/subjects/:subjectId"
          element={<Notes />}
        />

        {/* =========================
            NOTE READER
            Example:
            /notes/java/part-01
        ========================= */}
        <Route
          path="/notes/:subjectId/:noteId"
          element={<NoteReader />}
        />

        {/* =========================
            FAVORITES
        ========================= */}
        <Route
          path="/favorites"
          element={<Favorites />}
        />

        {/* =========================
            RECENT
        ========================= */}
        <Route
          path="/recent"
          element={<Recent />}
        />

        {/* =========================
            SETTINGS
        ========================= */}
        <Route
          path="/settings"
          element={<Settings />}
        />

        {/* =========================
            PAGE NOT FOUND
        ========================= */}
        <Route
          path="*"
          element={
            <div
              style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "30px 20px",
                textAlign: "center",
                background: "#f7f8fc",
              }}
            >
              <h1>Page Not Found</h1>

              <p>
                The page you are looking for does not exist.
              </p>

              <a
                href="/"
                style={{
                  marginTop: "15px",
                  padding: "10px 18px",
                  borderRadius: "10px",
                  background: "#111827",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontWeight: "700",
                }}
              >
                Go Home
              </a>
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;