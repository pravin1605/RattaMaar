import { useNavigate } from "react-router-dom";

import BottomNavigation from "../../components/layout/BottomNavigation";

import subjects from "../../data/subjects";

import "./Subjects.css";

function Subjects() {
  const navigate = useNavigate();

  return (
    <div className="subjects-page">

      <header className="subjects-header">

        <div>
          <span className="subjects-label">
            LEARN
          </span>

          <h1>
            All Subjects
          </h1>

          <p>
            {subjects.length} subjects available
          </p>
        </div>

        <div className="subjects-header-icon">
          <span className="subjects-header-icon-symbol">
            ▤
          </span>
        </div>

      </header>


      <main className="subjects-content">

        <div className="subjects-grid">

          {subjects.map((subject) => (

            <button
              type="button"
              className="subject-item"
              key={subject.id}
              onClick={() =>
                navigate(
                  `/subjects/${subject.id}`
                )
              }
            >

              <div
                className={`subject-icon ${subject.color}`}
              >
                {subject.icon}
              </div>

              <div className="subject-info">

                <h2>
                  {subject.name}
                </h2>

                <p>
                  {subject.description}
                </p>

                <span className="note-count">
                  {subject.notes.length}{" "}
                  {subject.notes.length === 1
                    ? "note"
                    : "notes"}
                </span>

              </div>

              <span
                className="subject-arrow"
                aria-hidden="true"
              >
                ›
              </span>

            </button>

          ))}

        </div>

      </main>


      {/* MOBILE NAVIGATION */}

      <BottomNavigation />

    </div>
  );
}

export default Subjects;