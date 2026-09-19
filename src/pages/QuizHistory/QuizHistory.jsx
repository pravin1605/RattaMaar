import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import quizService from "../../services/quizService";
import subjects from "../../data/subjects";

import "./QuizHistory.css";

function QuizHistory() {
  const navigate = useNavigate();

  // =========================================================
  // REACT SUBJECT
  // =========================================================
  const reactSubject = useMemo(() => {
    return subjects.find(
      (subject) =>
        String(subject.id).toLowerCase() === "react"
    );
  }, []);

  // =========================================================
  // GET ALL SAVED QUIZ HISTORY
  // =========================================================
  const history = useMemo(() => {
    try {
      const allHistory = quizService.getAllHistory();

      if (!Array.isArray(allHistory)) {
        return [];
      }

      // We are working ONLY with React for now.
      return allHistory
        .filter(
          (attempt) =>
            String(attempt.subjectId).toLowerCase() === "react"
        )
        .sort((a, b) => {
          const dateA = new Date(
            a.completedAt ||
              a.createdAt ||
              a.date ||
              0
          ).getTime();

          const dateB = new Date(
            b.completedAt ||
              b.createdAt ||
              b.date ||
              0
          ).getTime();

          return dateB - dateA;
        });
    } catch (error) {
      console.error(
        "Failed to load quiz history:",
        error
      );

      return [];
    }
  }, []);

  // =========================================================
  // FORMAT DATE
  // =========================================================
  const formatDate = (attempt) => {
    const value =
      attempt.completedAt ||
      attempt.createdAt ||
      attempt.date;

    if (!value) {
      return "Date unavailable";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "Date unavailable";
    }

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // =========================================================
  // GET SCORE
  // =========================================================
  const getScore = (attempt) => {
    const score =
      typeof attempt.score === "number"
        ? attempt.score
        : 0;

    const total =
      typeof attempt.total === "number"
        ? attempt.total
        : 25;

    return `${score}/${total}`;
  };

  // =========================================================
  // GET PERCENTAGE
  // =========================================================
  const getPercentage = (attempt) => {
    if (
      typeof attempt.percentage === "number"
    ) {
      return attempt.percentage;
    }

    const score =
      typeof attempt.score === "number"
        ? attempt.score
        : 0;

    const total =
      typeof attempt.total === "number"
        ? attempt.total
        : 25;

    if (!total) {
      return 0;
    }

    return Math.round((score / total) * 100);
  };

  // =========================================================
  // PERFORMANCE CLASS
  // =========================================================
  const getPerformanceClass = (percentage) => {
    if (percentage >= 80) {
      return "excellent";
    }

    if (percentage >= 60) {
      return "good";
    }

    if (percentage >= 40) {
      return "average";
    }

    return "needs-practice";
  };

  // =========================================================
  // PERFORMANCE TEXT
  // =========================================================
  const getPerformanceText = (percentage) => {
    if (percentage >= 80) {
      return "Excellent";
    }

    if (percentage >= 60) {
      return "Good";
    }

    if (percentage >= 40) {
      return "Keep Practicing";
    }

    return "Needs Practice";
  };

  // =========================================================
  // SUMMARY
  // =========================================================
  const summary = useMemo(() => {
    if (!history.length) {
      return {
        attempts: 0,
        bestScore: 0,
        averagePercentage: 0,
      };
    }

    const percentages = history.map(
      (attempt) => getPercentage(attempt)
    );

    const bestScore = Math.max(
      ...history.map(
        (attempt) =>
          typeof attempt.score === "number"
            ? attempt.score
            : 0
      )
    );

    const averagePercentage = Math.round(
      percentages.reduce(
        (sum, value) => sum + value,
        0
      ) / percentages.length
    );

    return {
      attempts: history.length,
      bestScore,
      averagePercentage,
    };
  }, [history]);

  // =========================================================
  // EMPTY STATE
  // =========================================================
  if (!history.length) {
    return (
      <div className="quiz-history-page">
        <header className="quiz-history-header">
          <button
            type="button"
            className="quiz-history-back"
            onClick={() => navigate("/quiz")}
            aria-label="Back to quiz"
          >
            <span
              className="quiz-history-unicode-icon"
              aria-hidden="true"
            >
              ←
            </span>
          </button>

          <div>
            <span className="quiz-history-label">
              REACT QUIZ
            </span>

            <h1>Quiz History</h1>

            <p>Review your previous attempts.</p>
          </div>
        </header>

        <main className="quiz-history-content">
          <section className="quiz-history-empty">
            <div className="quiz-history-empty-icon">
              <span
                className="quiz-history-unicode-icon"
                aria-hidden="true"
              >
                ◷
              </span>
            </div>

            <h2>No Quiz Attempts Yet</h2>

            <p>
              You haven't completed a React quiz yet.
              Start your first quiz to see your history
              here.
            </p>

            <button
              type="button"
              className="quiz-history-primary-btn"
              onClick={() =>
                navigate("/quiz/react")
              }
            >
              <span
                className="quiz-history-unicode-icon"
                aria-hidden="true"
              >
                ▶
              </span>

              <span>Start React Quiz</span>
            </button>
          </section>
        </main>

        <nav className="quiz-history-bottom-nav">
          <button
            type="button"
            onClick={() => navigate("/")}
          >
            <span
              className="quiz-history-unicode-icon"
              aria-hidden="true"
            >
              ⌂
            </span>

            <span>Home</span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/quiz")}
          >
            <span
              className="quiz-history-unicode-icon"
              aria-hidden="true"
            >
              🧠
            </span>

            <span>Quiz</span>
          </button>
        </nav>
      </div>
    );
  }

  // =========================================================
  // MAIN PAGE
  // =========================================================
  return (
    <div className="quiz-history-page">
      {/* =====================================================
          HEADER
      ===================================================== */}
      <header className="quiz-history-header">
        <button
          type="button"
          className="quiz-history-back"
          onClick={() => navigate("/quiz")}
          aria-label="Back to quiz"
        >
          <span
            className="quiz-history-unicode-icon"
            aria-hidden="true"
          >
            ←
          </span>
        </button>

        <div>
          <span className="quiz-history-label">
            REACT QUIZ
          </span>

          <h1>Quiz History</h1>

          <p>Review your previous attempts.</p>
        </div>
      </header>

      {/* =====================================================
          CONTENT
      ===================================================== */}
      <main className="quiz-history-content">
        {/* ===================================================
            HERO
        =================================================== */}
        <section className="quiz-history-hero">
          <div className="quiz-history-hero-icon">
            <span
              className="quiz-history-unicode-icon"
              aria-hidden="true"
            >
              🧠
            </span>
          </div>

          <div>
            <span className="quiz-history-hero-label">
              PRACTICE HISTORY
            </span>

            <h2>
              {reactSubject?.name || "React"} Quiz
            </h2>

            <p>
              Track your previous attempts and
              review your answers.
            </p>
          </div>
        </section>

        {/* ===================================================
            SUMMARY
        =================================================== */}
        <section className="quiz-history-summary">
          <div className="quiz-history-summary-card">
            <div className="quiz-history-summary-icon">
              <span
                className="quiz-history-unicode-icon"
                aria-hidden="true"
              >
                ☷
              </span>
            </div>

            <div>
              <span>Total Attempts</span>
              <strong>{summary.attempts}</strong>
            </div>
          </div>

          <div className="quiz-history-summary-card">
            <div className="quiz-history-summary-icon">
              <span
                className="quiz-history-unicode-icon"
                aria-hidden="true"
              >
                ★
              </span>
            </div>

            <div>
              <span>Best Score</span>
              <strong>
                {summary.bestScore}/25
              </strong>
            </div>
          </div>

          <div className="quiz-history-summary-card">
            <div className="quiz-history-summary-icon">
              <span
                className="quiz-history-unicode-icon"
                aria-hidden="true"
              >
                %
              </span>
            </div>

            <div>
              <span>Average</span>
              <strong>
                {summary.averagePercentage}%
              </strong>
            </div>
          </div>
        </section>

        {/* ===================================================
            HISTORY LIST
        =================================================== */}
        <section className="quiz-history-list-section">
          <div className="quiz-history-section-heading">
            <div>
              <h2>Previous Attempts</h2>

              <p>
                Your completed React quiz attempts.
              </p>
            </div>

            <button
              type="button"
              className="quiz-history-new-btn"
              onClick={() =>
                navigate("/quiz/react")
              }
            >
              <span
                className="quiz-history-unicode-icon"
                aria-hidden="true"
              >
                +
              </span>

              New Quiz
            </button>
          </div>

          <div className="quiz-history-list">
            {history.map((attempt, index) => {
              const percentage =
                getPercentage(attempt);

              const performanceClass =
                getPerformanceClass(
                  percentage
                );

              const performanceText =
                getPerformanceText(
                  percentage
                );

              return (
                <article
                  className="quiz-history-card"
                  key={
                    attempt.id ||
                    attempt.attemptId ||
                    `${attempt.subjectId}-${index}`
                  }
                >
                  {/* Attempt number */}
                  <div className="quiz-history-attempt-number">
                    <span>Attempt</span>
                    <strong>#{history.length - index}</strong>
                  </div>

                  {/* Score */}
                  <div className="quiz-history-score">
                    <span>Score</span>

                    <strong>
                      {getScore(attempt)}
                    </strong>
                  </div>

                  {/* Percentage */}
                  <div className="quiz-history-percentage">
                    <div>
                      <span>Percentage</span>

                      <strong>
                        {percentage}%
                      </strong>
                    </div>

                    <div className="quiz-history-progress">
                      <span
                        style={{
                          width: `${Math.min(
                            100,
                            Math.max(
                              0,
                              percentage
                            )
                          )}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Performance */}
                  <div
                    className={`quiz-history-performance ${performanceClass}`}
                  >
                    <span className="quiz-history-performance-icon">
                      {percentage >= 80
                        ? "✓"
                        : percentage >= 60
                        ? "●"
                        : percentage >= 40
                        ? "!"
                        : "↻"}
                    </span>

                    <span>
                      {performanceText}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="quiz-history-date">
                    <span>Date</span>

                    <strong>
                      {formatDate(attempt)}
                    </strong>
                  </div>

                  {/* Actions */}
                  <div className="quiz-history-actions">
                    <button
                      type="button"
                      className="quiz-history-view-btn"
                      onClick={() =>
                        navigate(
                          `/quiz/${subjectIdForAttempt(
                            attempt
                          )}/result/${getAttemptId(
                            attempt
                          )}`
                        )
                      }
                    >
                      View Result
                    </button>

                    <button
                      type="button"
                      className="quiz-history-review-btn"
                      onClick={() =>
                        navigate(
                          `/quiz/${subjectIdForAttempt(
                            attempt
                          )}/result/${getAttemptId(
                            attempt
                          )}/review`
                        )
                      }
                    >
                      Review
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ===================================================
            BOTTOM ACTION
        =================================================== */}
        <section className="quiz-history-bottom-action">
          <button
            type="button"
            className="quiz-history-primary-btn"
            onClick={() =>
              navigate("/quiz/react")
            }
          >
            <span
              className="quiz-history-unicode-icon"
              aria-hidden="true"
            >
              ↻
            </span>

            <span>Take Another React Quiz</span>
          </button>
        </section>
      </main>

      {/* =====================================================
          BOTTOM NAV
      ===================================================== */}
      <nav className="quiz-history-bottom-nav">
        <button
          type="button"
          onClick={() => navigate("/")}
        >
          <span
            className="quiz-history-unicode-icon"
            aria-hidden="true"
          >
            ⌂
          </span>

          <span>Home</span>
        </button>

        <button
          type="button"
          onClick={() => navigate("/quiz")}
        >
          <span
            className="quiz-history-unicode-icon"
            aria-hidden="true"
          >
            🧠
          </span>

          <span>Quiz</span>
        </button>
      </nav>
    </div>
  );
}

// =========================================================
// HELPERS
// =========================================================

function getAttemptId(attempt) {
  return (
    attempt.id ||
    attempt.attemptId ||
    attempt.quizAttemptId
  );
}

function subjectIdForAttempt(attempt) {
  return attempt.subjectId || "react";
}

export default QuizHistory;