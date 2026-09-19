import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import quizService from "../../services/quizService";
import "./QuizReview.css";

function QuizReview() {
  const navigate = useNavigate();
  const { subjectId, attemptId } = useParams();

  const attempt = useMemo(
    () => quizService.getAttempt(attemptId),
    [attemptId]
  );

  // =========================================================
  // ATTEMPT NOT FOUND
  // =========================================================
  if (!attempt || attempt.subjectId !== subjectId) {
    return (
      <div className="quiz-review-page">
        <header className="quiz-review-header">
          <button
            type="button"
            className="quiz-review-back"
            onClick={() => navigate(`/quiz/${subjectId}/play`)}
            aria-label="Back to quiz"
          >
            <span
              className="quiz-review-unicode-icon"
              aria-hidden="true"
            >
              ←
            </span>
          </button>

          <div>
            <h1>Review Answers</h1>
            <p>Attempt not found</p>
          </div>
        </header>

        <main className="quiz-review-empty">
          <div className="quiz-review-empty-icon">
            <span
              className="quiz-review-unicode-icon quiz-review-error-icon"
              aria-hidden="true"
            >
              ✕
            </span>
          </div>

          <h2>Attempt Not Found</h2>

          <p>
            This quiz attempt is no longer available on this device.
          </p>

          <button
            type="button"
            className="quiz-review-primary-btn"
            onClick={() => navigate("/quiz")}
          >
            <span
              className="quiz-review-unicode-icon"
              aria-hidden="true"
            >
              ⌂
            </span>

            <span>Quiz Home</span>
          </button>
        </main>
      </div>
    );
  }

  // =========================================================
  // COUNTS
  // =========================================================
  const results = attempt.results || [];

  const correctCount = results.filter(
    (result) => result.isCorrect
  ).length;

  const wrongCount = results.filter(
    (result) => result.answered && !result.isCorrect
  ).length;

  const unansweredCount = results.filter(
    (result) => !result.answered
  ).length;

  // =========================================================
  // MAIN
  // =========================================================
  return (
    <div className="quiz-review-page">
      {/* =====================================================
          HEADER
      ===================================================== */}
      <header className="quiz-review-header">
        <button
          type="button"
          className="quiz-review-back"
          onClick={() =>
            navigate(`/quiz/${subjectId}/result/${attemptId}`)
          }
          aria-label="Back to result"
        >
          <span
            className="quiz-review-unicode-icon"
            aria-hidden="true"
          >
            ←
          </span>
        </button>

        <div>
          <h1>Review Answers</h1>
          <p>Check your answers and explanations</p>
        </div>
      </header>

      {/* =====================================================
          CONTENT
      ===================================================== */}
      <main className="quiz-review-content">
        {/* ===================================================
            SUMMARY
        =================================================== */}
        <section className="quiz-review-summary">
          <div className="quiz-review-summary-main">
            <span className="quiz-review-summary-label">
              Your Score
            </span>

            <strong>
              {attempt.score}/{attempt.total}
            </strong>

            <span className="quiz-review-percentage">
              {attempt.percentage}%
            </span>
          </div>

          <div className="quiz-review-stats">
            {/* Correct */}
            <div className="quiz-review-stat correct">
              <span
                className="quiz-review-unicode-icon"
                aria-hidden="true"
              >
                ✓
              </span>

              <span>{correctCount} Correct</span>
            </div>

            {/* Wrong */}
            <div className="quiz-review-stat wrong">
              <span
                className="quiz-review-unicode-icon"
                aria-hidden="true"
              >
                ✕
              </span>

              <span>{wrongCount} Wrong</span>
            </div>

            {/* Unanswered */}
            <div className="quiz-review-stat unanswered">
              <span
                className="quiz-review-unicode-icon"
                aria-hidden="true"
              >
                −
              </span>

              <span>{unansweredCount} Unanswered</span>
            </div>
          </div>
        </section>

        {/* ===================================================
            QUESTION REVIEW
        =================================================== */}
        <section className="quiz-review-list">
          <div className="quiz-review-section-heading">
            <div>
              <h2>Question Review</h2>

              <p>
                {attempt.total} questions from this attempt
              </p>
            </div>
          </div>

          {results.map((result, index) => {
            const hasAnswer = result.answered;
            const isCorrect = result.isCorrect;

            return (
              <article
                className={`review-question-card ${
                  isCorrect
                    ? "is-correct"
                    : hasAnswer
                    ? "is-wrong"
                    : "is-unanswered"
                }`}
                key={result.questionId}
              >
                {/* =========================================
                    QUESTION HEADER
                ========================================= */}
                <div className="review-question-top">
                  <div className="review-question-number">
                    Q{index + 1}
                  </div>

                  <div className="review-question-meta">
                    <span className="review-topic">
                      {result.topicName}
                    </span>

                    {result.difficulty && (
                      <span className="review-difficulty">
                        {result.difficulty}
                      </span>
                    )}
                  </div>

                  {/* STATUS */}
                  <div className="review-status">
                    {isCorrect ? (
                      <>
                        <span
                          className="quiz-review-unicode-icon"
                          aria-hidden="true"
                        >
                          ✓
                        </span>

                        <span>Correct</span>
                      </>
                    ) : hasAnswer ? (
                      <>
                        <span
                          className="quiz-review-unicode-icon"
                          aria-hidden="true"
                        >
                          ✕
                        </span>

                        <span>Wrong</span>
                      </>
                    ) : (
                      <>
                        <span
                          className="quiz-review-unicode-icon"
                          aria-hidden="true"
                        >
                          −
                        </span>

                        <span>Skipped</span>
                      </>
                    )}
                  </div>
                </div>

                {/* =========================================
                    QUESTION
                ========================================= */}
                <div className="review-question-text">
                  {result.question}
                </div>

                {/* =========================================
                    OPTIONS
                ========================================= */}
                <div className="review-options">
                  {result.options.map((option, optionIndex) => {
                    const isSelected =
                      result.selectedAnswer === optionIndex;

                    const isCorrectOption =
                      result.correctAnswer === optionIndex;

                    let optionClass = "";

                    if (isCorrectOption) {
                      optionClass = "correct-option";
                    } else if (isSelected) {
                      optionClass = "wrong-option";
                    }

                    return (
                      <div
                        key={`${result.questionId}-${optionIndex}`}
                        className={`review-option ${optionClass}`}
                      >
                        {/* Letter */}
                        <div className="review-option-letter">
                          {String.fromCharCode(65 + optionIndex)}
                        </div>

                        {/* Text */}
                        <div className="review-option-text">
                          {option}
                        </div>

                        {/* Label */}
                        <div className="review-option-label">
                          {isCorrectOption && (
                            <span className="correct-label">
                              Correct answer
                            </span>
                          )}

                          {isSelected && !isCorrectOption && (
                            <span className="wrong-label">
                              Your answer
                            </span>
                          )}

                          {isSelected && isCorrectOption && (
                            <span className="your-correct-label">
                              Your answer
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* =========================================
                    UNANSWERED MESSAGE
                ========================================= */}
                {!hasAnswer && (
                  <div className="review-unanswered-message">
                    <span
                      className="quiz-review-unicode-icon"
                      aria-hidden="true"
                    >
                      −
                    </span>

                    <span>
                      You did not answer this question.
                    </span>
                  </div>
                )}

                {/* =========================================
                    EXPLANATION
                ========================================= */}
                {result.explanation && (
                  <div className="review-explanation">
                    <strong>Explanation</strong>

                    <p>{result.explanation}</p>
                  </div>
                )}
              </article>
            );
          })}
        </section>

        {/* ===================================================
            ACTIONS
        =================================================== */}
        <section className="quiz-review-actions">
          {/* Practice Again */}
          <button
            type="button"
            className="quiz-review-primary-btn"
            onClick={() =>
              navigate(`/quiz/${subjectId}/play`)
            }
          >
            <span
              className="quiz-review-unicode-icon"
              aria-hidden="true"
            >
              ↻
            </span>

            <span>Practice Again</span>
          </button>

          {/* Back to Result */}
          <button
            type="button"
            className="quiz-review-secondary-btn"
            onClick={() =>
              navigate(
                `/quiz/${subjectId}/result/${attemptId}`
              )
            }
          >
            <span
              className="quiz-review-unicode-icon"
              aria-hidden="true"
            >
              ←
            </span>

            <span>Back to Result</span>
          </button>

          {/* Quiz Home */}
          <button
            type="button"
            className="quiz-review-secondary-btn"
            onClick={() => navigate("/quiz")}
          >
            <span
              className="quiz-review-unicode-icon"
              aria-hidden="true"
            >
              ⌂
            </span>

            <span>Quiz Home</span>
          </button>
        </section>
      </main>

      {/* =====================================================
          BOTTOM NAVIGATION
      ===================================================== */}
      <nav className="quiz-review-bottom-nav">
        <button
          type="button"
          onClick={() => navigate("/")}
        >
          <span
            className="quiz-review-unicode-icon"
            aria-hidden="true"
          >
            ⌂
          </span>

          <span>Back to Home</span>
        </button>

        <button
          type="button"
          onClick={() => navigate("/quiz")}
        >
          <span
            className="quiz-review-unicode-icon"
            aria-hidden="true"
          >
            ↻
          </span>

          <span>Quiz Home</span>
        </button>
      </nav>
    </div>
  );
}

export default QuizReview;