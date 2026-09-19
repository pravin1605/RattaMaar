import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import notesService from "../../services/notesService";
import quizService from "../../services/quizService";

import "./QuizResult.css";

function QuizResult() {
  const navigate = useNavigate();
  const { subjectId, attemptId } = useParams();

  const subject = notesService.getSubject(subjectId);

  const attempt = useMemo(
    () => quizService.getAttempt(attemptId),
    [attemptId]
  );

  /* =========================================================
     RESULT NOT FOUND
  ========================================================= */

  if (!subject || !attempt) {
    return (
      <div className="quiz-result-page">
        <div className="quiz-result-not-found">

          <span
            className="quiz-result-unicode-icon result-error-icon"
            aria-hidden="true"
          >
            🏆
          </span>

          <h1>Result Not Found</h1>

          <p>
            This quiz result could not be found on this
            device.
          </p>

          <button
            type="button"
            onClick={() => navigate("/quiz")}
          >
            <span
              className="quiz-result-unicode-icon"
              aria-hidden="true"
            >
              ←
            </span>

            Back to Quiz
          </button>

        </div>

        <QuizBottomNavigation navigate={navigate} />
      </div>
    );
  }

  /* =========================================================
     SCORE CALCULATIONS
  ========================================================= */

  const correctCount = attempt.results.filter(
    (result) => result.isCorrect
  ).length;

  const wrongCount = attempt.results.filter(
    (result) =>
      result.answered && !result.isCorrect
  ).length;

  const unansweredCount = attempt.results.filter(
    (result) => !result.answered
  ).length;

  const percentage = attempt.percentage;

  /* =========================================================
     PERFORMANCE MESSAGE
  ========================================================= */

  const getPerformanceMessage = () => {
    if (percentage >= 90) {
      return {
        title: "Excellent Work!",
        description:
          "You have demonstrated strong understanding of this quiz.",
      };
    }

    if (percentage >= 75) {
      return {
        title: "Great Work!",
        description:
          "You have a good understanding of the topics. Keep practicing.",
      };
    }

    if (percentage >= 50) {
      return {
        title: "Good Attempt!",
        description:
          "Review the questions you missed and strengthen those topics.",
      };
    }

    return {
      title: "Keep Practicing!",
      description:
        "Use the review section to identify the topics that need more practice.",
    };
  };

  const performance =
    getPerformanceMessage();

  /* =========================================================
     DURATION
  ========================================================= */

  const getDuration = () => {
    if (
      !attempt.startedAt ||
      !attempt.completedAt
    ) {
      return null;
    }

    const start =
      new Date(attempt.startedAt).getTime();

    const end =
      new Date(attempt.completedAt).getTime();

    if (
      !Number.isFinite(start) ||
      !Number.isFinite(end)
    ) {
      return null;
    }

    const seconds = Math.max(
      0,
      Math.round((end - start) / 1000)
    );

    const minutes =
      Math.floor(seconds / 60);

    const remainingSeconds =
      seconds % 60;

    if (minutes === 0) {
      return `${remainingSeconds}s`;
    }

    return `${minutes}m ${remainingSeconds}s`;
  };

  const duration = getDuration();

  return (
    <div className="quiz-result-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="quiz-result-header">

        <button
          type="button"
          className="quiz-result-back"
          onClick={() =>
            navigate(`/quiz/${subjectId}`)
          }
          aria-label="Back to quiz setup"
        >
          <span
            className="quiz-result-unicode-icon"
            aria-hidden="true"
          >
            ←
          </span>
        </button>

        <div>
          <span>QUIZ RESULT</span>

          <h1>
            {subject.name}
          </h1>
        </div>

      </header>

      <main className="quiz-result-main">

        {/* ===================================================
            SCORE HERO
        =================================================== */}

        <section className="quiz-result-hero">

          <div className="quiz-result-award">
            <span
              className="quiz-result-unicode-icon"
              aria-hidden="true"
            >
              🏆
            </span>
          </div>

          <span className="quiz-result-label">
            QUIZ COMPLETED
          </span>

          <h2>
            {performance.title}
          </h2>

          <div className="quiz-score-circle">

            <strong>
              {percentage}%
            </strong>

            <span>
              Score
            </span>

          </div>

          <p>
            {performance.description}
          </p>

          <div className="quiz-score-text">

            <strong>
              {attempt.score}
            </strong>

            <span>
              / {attempt.total} correct
            </span>

          </div>

        </section>

        {/* ===================================================
            STAT CARDS
        =================================================== */}

        <section className="quiz-result-stats">

          {/* CORRECT */}

          <div className="quiz-result-stat correct">

            <div className="quiz-stat-icon">

              <span
                className="quiz-result-unicode-icon"
                aria-hidden="true"
              >
                ✓
              </span>

            </div>

            <strong>
              {correctCount}
            </strong>

            <span>
              Correct
            </span>

          </div>

          {/* WRONG */}

          <div className="quiz-result-stat wrong">

            <div className="quiz-stat-icon">

              <span
                className="quiz-result-unicode-icon"
                aria-hidden="true"
              >
                ✕
              </span>

            </div>

            <strong>
              {wrongCount}
            </strong>

            <span>
              Wrong
            </span>

          </div>

          {/* UNANSWERED */}

          <div className="quiz-result-stat unanswered">

            <div className="quiz-stat-icon">

              <span
                className="quiz-result-unicode-icon"
                aria-hidden="true"
              >
                ◷
              </span>

            </div>

            <strong>
              {unansweredCount}
            </strong>

            <span>
              Unanswered
            </span>

          </div>

        </section>

        {/* ===================================================
            ATTEMPT INFORMATION
        =================================================== */}

        <section className="quiz-result-info">

          <h2>
            Attempt Summary
          </h2>

          <div className="quiz-result-info-list">

            <div>
              <span>
                Total Questions
              </span>

              <strong>
                {attempt.total}
              </strong>
            </div>

            <div>
              <span>
                Answered
              </span>

              <strong>
                {attempt.total -
                  unansweredCount}
              </strong>
            </div>

            <div>
              <span>
                Accuracy
              </span>

              <strong>
                {percentage}%
              </strong>
            </div>

            {duration && (
              <div>
                <span>
                  Time Taken
                </span>

                <strong>
                  {duration}
                </strong>
              </div>
            )}

          </div>

        </section>

        {/* ===================================================
            ACTIONS
        =================================================== */}

        <section className="quiz-result-actions">

          {/* REVIEW */}

          <button
            type="button"
            className="quiz-review-button"
            onClick={() =>
              navigate(
                `/quiz/${subjectId}/result/${attemptId}/review`
              )
            }
          >

            <span
              className="quiz-result-unicode-icon"
              aria-hidden="true"
            >
              ▤
            </span>

            Review Answers

          </button>

          {/* PRACTICE AGAIN */}

          <button
            type="button"
            className="quiz-practice-button"
            onClick={() =>
              navigate(
                `/quiz/${subjectId}/play`
              )
            }
          >

            <span
              className="quiz-result-unicode-icon"
              aria-hidden="true"
            >
              ↻
            </span>

            Practice Again

          </button>

          {/* ANOTHER SUBJECT */}

          <button
            type="button"
            className="quiz-result-secondary"
            onClick={() =>
              navigate("/quiz")
            }
          >

            <span
              className="quiz-result-unicode-icon"
              aria-hidden="true"
            >
              ←
            </span>

            Choose Another Subject

          </button>

        </section>

        <p className="quiz-result-storage-note">
          This result is saved locally on your device.
        </p>

      </main>

      <QuizBottomNavigation
        navigate={navigate}
      />

    </div>
  );
}

/* =========================================================
   BOTTOM NAVIGATION
========================================================= */

function QuizBottomNavigation({
  navigate,
}) {
  return (
    <nav className="quiz-bottom-nav">

      <button
        type="button"
        className="quiz-home-button"
        onClick={() => navigate("/")}
      >

        <span
          className="quiz-result-unicode-icon"
          aria-hidden="true"
        >
          ⌂
        </span>

        <span>
          Back to Home
        </span>

      </button>

      <button
        type="button"
        className="quiz-bottom-quiz"
        onClick={() =>
          navigate("/quiz")
        }
      >

        <span
          className="quiz-result-unicode-icon"
          aria-hidden="true"
        >
          🏆
        </span>

        <span>
          Quiz Home
        </span>

      </button>

    </nav>
  );
}

export default QuizResult;