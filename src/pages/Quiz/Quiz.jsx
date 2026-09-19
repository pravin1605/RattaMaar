import { useNavigate } from "react-router-dom";

import subjects from "../../data/subjects";


import "./Quiz.css";

function Quiz() {
    const navigate = useNavigate();

    return (
        <div className="quiz-page">
            {/* Header */}
            <header className="quiz-header">
                <div className="quiz-header-icon">
                    <span className="quiz-unicode-icon" aria-hidden="true">
                        🧠
                    </span>
                </div>

                <div>
                    <h1>Quiz</h1>
                    <p>Test what you have learned</p>
                </div>
            </header>

            {/* Hero */}
            <section className="quiz-hero">
                <div className="quiz-hero-icon">
                    <span className="quiz-unicode-icon" aria-hidden="true">
                        🧠
                    </span>
                </div>

                <div className="quiz-hero-content">
                    <span className="quiz-hero-label">
                        PRACTICE MODE
                    </span>

                    <h2>Test Your Knowledge</h2>

                    <p>
                        Choose a subject and practice questions based on
                        the topics available in your notes.
                    </p>
                </div>
            </section>

            {/* Subjects */}
            <section className="quiz-section">
                <div className="quiz-section-heading">
                    <div>
                        <h2>Choose a Subject</h2>

                        <p>
                            Select what you want to practice.
                        </p>
                    </div>
                </div>

                <div className="quiz-subject-grid">
                    {subjects.map((subject) => {
                        const noteCount = subject.notes?.length || 0;

                        return (
                            <button
                                key={subject.id}
                                type="button"
                                className="quiz-subject-card"
                                onClick={() => {
                                    navigate(`/quiz/${subject.id}`);
                                }}
                            >
                                <div className="quiz-subject-top">
                                    <div className="quiz-subject-icon">
                                        <span
                                            className="quiz-unicode-icon"
                                            aria-hidden="true"
                                        >
                                            ▤
                                        </span>
                                    </div>

                                    <span
                                        className="quiz-subject-arrow quiz-unicode-icon"
                                        aria-hidden="true"
                                    >
                                        →
                                    </span>
                                </div>

                                <div className="quiz-subject-info">
                                    <h3>{subject.name}</h3>

                                    <p>
                                        {noteCount}{" "}
                                        {noteCount === 1 ? "note" : "notes"} available
                                    </p>
                                </div>

                                <span className="quiz-subject-action">
                                    Start Quiz
                                </span>
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* Quiz-only bottom navigation */}
            <nav className="quiz-bottom-nav">
                <button
                    type="button"
                    className="quiz-home-button"
                    onClick={() => navigate("/")}
                >
                    <span
                        className="quiz-unicode-icon"
                        aria-hidden="true"
                    >
                        ⌂
                    </span>

                    <span>Back to Home</span>
                </button>
            </nav>


            {/* Quiz History */}

            <button
                type="button"
                className="quiz-history-link"
                onClick={() => navigate("/quiz/history")}
            >
                <span
                    className="quiz-unicode-icon"
                    aria-hidden="true"
                >
                    ◷
                </span>

                <span>View React Quiz History</span>

                <span
                    className="quiz-unicode-icon"
                    aria-hidden="true"
                >
                    →
                </span>
            </button>
        </div>
    );
}

export default Quiz;