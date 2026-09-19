import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import notesService from "../../services/notesService";
import quizService from "../../services/quizService";

import "./QuizPlay.css";

function QuizPlay() {
  const navigate = useNavigate();
  const { subjectId } = useParams();

  const subject = notesService.getSubject(subjectId);

  const questions = useMemo(
    () => quizService.createQuestionSet(subjectId, 25),
    [subjectId]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [startedAt] = useState(() => new Date().toISOString());
  const [showQuestionList, setShowQuestionList] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentIndex]);

  /* =========================================================
     SUBJECT NOT FOUND
  ========================================================= */

  if (!subject) {
    return (
      <div className="quiz-play-page">
        <div className="quiz-play-error">
          <span
            className="quiz-play-unicode-icon error-icon"
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
              className="quiz-play-unicode-icon"
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

  /* =========================================================
     EMPTY QUESTION BANK
  ========================================================= */

  if (!questions.length) {
    return (
      <div className="quiz-play-page">
        <header className="quiz-play-header">
          <button
            type="button"
            className="quiz-play-back"
            onClick={() =>
              navigate(`/quiz/${subjectId}`)
            }
            aria-label="Back to quiz setup"
          >
            <span
              className="quiz-play-unicode-icon"
              aria-hidden="true"
            >
              ←
            </span>
          </button>

          <div className="quiz-play-title">
            <span>QUIZ</span>
            <h1>{subject.name}</h1>
          </div>

          <div className="quiz-play-header-icon">
            <span
              className="quiz-play-unicode-icon"
              aria-hidden="true"
            >
              🧠
            </span>
          </div>
        </header>

        <main className="quiz-empty-state">
          <div className="quiz-empty-icon">
            <span
              className="quiz-play-unicode-icon"
              aria-hidden="true"
            >
              ☷
            </span>
          </div>

          <h2>Question Bank Coming Soon</h2>

          <p>
            Questions for {subject.name} are being prepared
            from your original notes.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate(`/quiz/${subjectId}`)
            }
          >
            <span
              className="quiz-play-unicode-icon"
              aria-hidden="true"
            >
              ←
            </span>

            Back to Quiz Setup
          </button>
        </main>

        <QuizBottomNavigation navigate={navigate} />
      </div>
    );
  }

  const question = questions[currentIndex];

  const selectedAnswer = answers[question.id];

  const answeredCount = Object.keys(answers).length;

  const progressPercentage =
    ((currentIndex + 1) / questions.length) * 100;

  const isLastQuestion =
    currentIndex === questions.length - 1;

  /* =========================================================
     ANSWER
  ========================================================= */

  const handleAnswer = (optionIndex) => {
    setAnswers((previous) => ({
      ...previous,
      [question.id]: optionIndex,
    }));
  };

  /* =========================================================
     PREVIOUS
  ========================================================= */

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(
        (previous) => previous - 1
      );
    }
  };

  /* =========================================================
     NEXT
  ========================================================= */

  const goToNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(
        (previous) => previous + 1
      );
    }
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = () => {
    const completedAt = new Date().toISOString();

    const attempt = quizService.saveAttempt({
      subjectId,
      questions,
      answers,
      startedAt,
      completedAt,
    });

    navigate(
      `/quiz/${subjectId}/result/${attempt.id}`,
      {
        replace: true,
      }
    );
  };

  const unansweredCount =
    questions.length - answeredCount;

  return (
    <div className="quiz-play-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="quiz-play-header">

        <button
          type="button"
          className="quiz-play-back"
          onClick={() =>
            navigate(`/quiz/${subjectId}`)
          }
          aria-label="Back to quiz setup"
        >
          <span
            className="quiz-play-unicode-icon"
            aria-hidden="true"
          >
            ←
          </span>
        </button>

        <div className="quiz-play-title">
          <span>QUIZ</span>
          <h1>{subject.name}</h1>
        </div>

        <div className="quiz-play-header-icon">
          <span
            className="quiz-play-unicode-icon"
            aria-hidden="true"
          >
            🧠
          </span>
        </div>

      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="quiz-play-main">

        {/* ===================================================
            PROGRESS
        =================================================== */}

        <section className="quiz-progress-section">

          <div className="quiz-progress-top">

            <div>
              <span>QUESTION</span>

              <strong>
                {currentIndex + 1}

                <small>
                  {" "}
                  / {questions.length}
                </small>
              </strong>
            </div>

            <div className="quiz-progress-count">

              <span
                className="quiz-play-unicode-icon"
                aria-hidden="true"
              >
                ✓
              </span>

              <span>
                {answeredCount} answered
              </span>

            </div>

          </div>

          <div className="quiz-progress-bar">

            <div
              className="quiz-progress-fill"
              style={{
                width: `${progressPercentage}%`,
              }}
            />

          </div>

        </section>

        {/* ===================================================
            TOPIC
        =================================================== */}

        <div className="quiz-topic-row">

          <span className="quiz-topic-badge">
            {question.topicName || "General"}
          </span>

          {question.difficulty && (
            <span
              className={`quiz-difficulty quiz-difficulty-${question.difficulty}`}
            >
              {question.difficulty}
            </span>
          )}

        </div>

        {/* ===================================================
            QUESTION
        =================================================== */}

        <section className="quiz-question-card">

          <div className="quiz-question-number">
            Question {currentIndex + 1}
          </div>

          <h2>{question.question}</h2>

          <div className="quiz-options">

            {question.options.map(
              (option, index) => {

                const isSelected =
                  selectedAnswer === index;

                return (
                  <button
                    type="button"
                    key={`${question.id}-${index}`}
                    className={`quiz-option ${
                      isSelected
                        ? "quiz-option-selected"
                        : ""
                    }`}
                    onClick={() =>
                      handleAnswer(index)
                    }
                  >

                    <span className="quiz-option-letter">
                      {String.fromCharCode(
                        65 + index
                      )}
                    </span>

                    <span className="quiz-option-text">
                      {option}
                    </span>

                    {isSelected && (
                      <span className="quiz-option-check">
                        ✓
                      </span>
                    )}

                  </button>
                );
              }
            )}

          </div>

        </section>

        {/* ===================================================
            QUESTION NAVIGATION
        =================================================== */}

        <section className="quiz-navigation-card">

          <div className="quiz-navigation-heading">

            <div>

              <h3>
                Question Navigation
              </h3>

              <p>
                {answeredCount} of{" "}
                {questions.length} answered
              </p>

            </div>

            <button
              type="button"
              className="quiz-list-toggle"
              onClick={() =>
                setShowQuestionList(
                  (previous) => !previous
                )
              }
            >

              <span
                className="quiz-play-unicode-icon"
                aria-hidden="true"
              >
                ☷
              </span>

              {showQuestionList
                ? "Hide"
                : "Show"}

            </button>

          </div>

          {showQuestionList && (
            <div className="quiz-question-grid">

              {questions.map(
                (item, index) => {

                  const answered =
                    answers[item.id] !==
                    undefined;

                  const active =
                    index === currentIndex;

                  return (
                    <button
                      type="button"
                      key={item.id}
                      className={`
                        quiz-number-button
                        ${active ? "active" : ""}
                        ${
                          answered
                            ? "answered"
                            : ""
                        }
                      `}
                      onClick={() => {
                        setCurrentIndex(index);
                        setShowQuestionList(false);
                      }}
                    >
                      {index + 1}
                    </button>
                  );
                }
              )}

            </div>
          )}

        </section>

        {/* ===================================================
            ACTIONS
        =================================================== */}

        <section className="quiz-play-actions">

          <button
            type="button"
            className="quiz-secondary-button"
            onClick={goToPrevious}
            disabled={currentIndex === 0}
          >

            <span
              className="quiz-play-unicode-icon"
              aria-hidden="true"
            >
              ←
            </span>

            Previous

          </button>

          {!isLastQuestion ? (

            <button
              type="button"
              className="quiz-primary-button"
              onClick={goToNext}
            >

              Next

              <span
                className="quiz-play-unicode-icon"
                aria-hidden="true"
              >
                →
              </span>

            </button>

          ) : (

            <button
              type="button"
              className="quiz-submit-button"
              onClick={() =>
                setShowSubmitConfirm(true)
              }
            >

              <span
                className="quiz-play-unicode-icon"
                aria-hidden="true"
              >
                ⚑
              </span>

              Submit Quiz

            </button>

          )}

        </section>

        {/* ===================================================
            UNANSWERED WARNING
        =================================================== */}

        {isLastQuestion &&
          unansweredCount > 0 && (
            <p className="quiz-unanswered-warning">

              You still have{" "}
              {unansweredCount} unanswered{" "}
              {unansweredCount === 1
                ? "question"
                : "questions"}.

            </p>
          )}

      </main>

      {/* =====================================================
          SUBMIT MODAL
      ===================================================== */}

      {showSubmitConfirm && (

        <div className="quiz-modal-overlay">

          <div className="quiz-submit-modal">

            <div className="quiz-modal-icon">

              <span
                className="quiz-play-unicode-icon"
                aria-hidden="true"
              >
                ⚑
              </span>

            </div>

            <h2>
              Submit Quiz?
            </h2>

            <p>
              You have answered{" "}
              <strong>
                {answeredCount}
              </strong>{" "}
              of{" "}
              <strong>
                {questions.length}
              </strong>{" "}
              questions.
            </p>

            {unansweredCount > 0 && (
              <p className="quiz-modal-warning">
                {unansweredCount} questions
                are still unanswered.
              </p>
            )}

            <div className="quiz-modal-actions">

              <button
                type="button"
                className="quiz-modal-cancel"
                onClick={() =>
                  setShowSubmitConfirm(false)
                }
              >
                Continue Quiz
              </button>

              <button
                type="button"
                className="quiz-modal-submit"
                onClick={handleSubmit}
              >
                Submit
              </button>

            </div>

          </div>

        </div>

      )}

      {/* =====================================================
          BOTTOM NAV
      ===================================================== */}

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
          className="quiz-play-unicode-icon"
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
        className="quiz-bottom-reset"
        onClick={() => navigate("/quiz")}
      >

        <span
          className="quiz-play-unicode-icon"
          aria-hidden="true"
        >
          ↻
        </span>

        <span>
          Quiz Home
        </span>

      </button>

    </nav>
  );
}

export default QuizPlay;