import { useNavigate, useParams } from "react-router-dom";

import notesService from "../../services/notesService";

import "./QuizSetup.css";

function QuizSetup() {
  const navigate = useNavigate();
  const { subjectId } = useParams();

  const subject = notesService.getSubject(subjectId);

  if (!subject) {
    return (
      <div className="quiz-setup-page">
        <div className="quiz-setup-not-found">
          <span
            className="quiz-setup-unicode-icon not-found-icon"
            aria-hidden="true"
          >
            🧠
          </span>

          <h1>Subject Not Found</h1>

          <p>
            The selected quiz subject could not be found.
          </p>

          <button
            type="button"
            onClick={() => navigate("/quiz")}
          >
            <span
              className="quiz-setup-unicode-icon"
              aria-hidden="true"
            >
              ←
            </span>

            Back to Quiz
          </button>
        </div>
      </div>
    );
  }

  const noteCount = subject.notes?.length || 0;

  return (
    <div className="quiz-setup-page">
      {/* Header */}
      <header className="quiz-setup-header">
        <button
          type="button"
          className="quiz-back-button"
          onClick={() => navigate("/quiz")}
          aria-label="Back to Quiz"
        >
          <span
            className="quiz-setup-unicode-icon"
            aria-hidden="true"
          >
            ←
          </span>
        </button>

        <div>
          <span>QUIZ SETUP</span>
          <h1>{subject.name}</h1>
        </div>
      </header>

      {/* Main */}
      <main className="quiz-setup-main">
        {/* Subject intro */}
        <section className="quiz-setup-hero">
          <div className="quiz-setup-icon">
            <span
              className="quiz-setup-unicode-icon"
              aria-hidden="true"
            >
              ▤
            </span>
          </div>

          <div>
            <h2>Ready to test yourself?</h2>

            <p>
              Questions will be based on the topics available
              in your {subject.name} notes.
            </p>
          </div>
        </section>

        {/* Quiz information */}
        <section className="quiz-info-card">
          <h2>Quiz Details</h2>

          <div className="quiz-info-list">
            {/* Questions */}
            <div className="quiz-info-item">
              <div className="quiz-info-icon">
                <span
                  className="quiz-setup-unicode-icon"
                  aria-hidden="true"
                >
                  ☷
                </span>
              </div>

              <div>
                <span>Questions per attempt</span>
                <strong>25 Questions</strong>
              </div>
            </div>

            {/* Notes */}
            <div className="quiz-info-item">
              <div className="quiz-info-icon">
                <span
                  className="quiz-setup-unicode-icon"
                  aria-hidden="true"
                >
                  ▤
                </span>
              </div>

              <div>
                <span>Available notes</span>

                <strong>
                  {noteCount}{" "}
                  {noteCount === 1 ? "Note" : "Notes"}
                </strong>
              </div>
            </div>

            {/* Quiz mode */}
            <div className="quiz-info-item">
              <div className="quiz-info-icon">
                <span
                  className="quiz-setup-unicode-icon"
                  aria-hidden="true"
                >
                  ◷
                </span>
              </div>

              <div>
                <span>Quiz mode</span>
                <strong>Practice</strong>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="quiz-how-card">
          <div className="quiz-how-title">
            <span
              className="quiz-setup-unicode-icon"
              aria-hidden="true"
            >
              ✓
            </span>

            <h2>How it works</h2>
          </div>

          <div className="quiz-how-list">
            <div>
              <span>1</span>

              <p>
                You will get 25 questions in each attempt.
              </p>
            </div>

            <div>
              <span>2</span>

              <p>
                Questions you have already attempted will be
                avoided when possible.
              </p>
            </div>

            <div>
              <span>3</span>

              <p>
                Your score and quiz history will be saved on
                this device.
              </p>
            </div>

            <div>
              <span>4</span>

              <p>
                After completing a quiz, you can start another
                set of questions.
              </p>
            </div>
          </div>
        </section>

        {/* Start */}
        <button
          type="button"
          className="start-quiz-button"
          onClick={() => navigate(`/quiz/${subject.id}/play`)}
        >
          <span
            className="quiz-setup-unicode-icon"
            aria-hidden="true"
          >
            ▶
          </span>

          Start Quiz
        </button>

        <p className="quiz-setup-note">
          Your progress will be stored locally on this device.
        </p>
      </main>

      {/* Quiz-only bottom navigation */}
      <nav className="quiz-bottom-nav">
        <button
          type="button"
          className="quiz-home-button"
          onClick={() => navigate("/")}
        >
          <span
            className="quiz-setup-unicode-icon"
            aria-hidden="true"
          >
            ⌂
          </span>

          <span>Back to Home</span>
        </button>
      </nav>
    </div>
  );
}

export default QuizSetup;