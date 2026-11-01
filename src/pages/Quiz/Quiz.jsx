import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import subjects from "../../data/subjects";
import { quizService } from "../../services/quizService";
import storageService from "../../services/storageService";
import { getSubjectAccent } from "../../utils/subjectAccent";

import "./Quiz.css";
import "./QuizExtras.css";

const FILTERS = [
    { id: "all", label: "All" },
    { id: "ready", label: "Ready to play" },
    { id: "soon", label: "Coming soon" },
];

/* Lowest-scoring topic with enough answers to mean something. */
function findWeakestTopic(attempts) {
    const topics = {};

    attempts.forEach((attempt) => {
        (attempt.results || []).forEach((result) => {
            if (!result.answered) return;
            const name = result.topicName || "General";
            if (!topics[name]) topics[name] = { name, correct: 0, total: 0 };
            topics[name].total += 1;
            if (result.isCorrect) topics[name].correct += 1;
        });
    });

    const weakest = Object.values(topics)
        .filter((topic) => topic.total >= 3)
        .map((topic) => ({
            ...topic,
            percent: Math.round((topic.correct / topic.total) * 100),
        }))
        .sort((a, b) => a.percent - b.percent)[0];

    return weakest && weakest.percent < 80 ? weakest : null;
}

function formatWhen(date) {
    const time = new Date(date).getTime();
    if (!date || Number.isNaN(time)) return "";
    const days = Math.floor((Date.now() - time) / 86400000);
    if (days < 1) return "today";
    if (days === 1) return "yesterday";
    if (days < 7) return `${days} days ago`;
    return new Date(date).toLocaleDateString();
}

function Quiz() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState("all");

    /* Read once per visit (the page remounts when you come back). */
    const data = useMemo(() => {
        const allAttempts = storageService.get("quiz-attempts", []);
        const attempts = Array.isArray(allAttempts) ? allAttempts : [];

        const cards = subjects.map((subject, order) => {
            const questions = quizService.getQuestions(subject.id);
            const total = questions.length;
            const subjectAttempts = attempts.filter(
                (attempt) => attempt.subjectId === subject.id
            );
            const seen = total
                ? [...quizService.getSeenQuestionIds(subject.id)].filter((id) =>
                    questions.some((question) => question.id === id)
                ).length
                : 0;
            const scores = subjectAttempts.map((attempt) => attempt.percentage || 0);
            const topics = new Set(questions.map((question) => question.topicId || "general"));

            return {
                subject,
                order,
                total,
                topicCount: topics.size,
                ready: total > 0,
                seen,
                attemptCount: subjectAttempts.length,
                best: scores.length ? Math.max(...scores) : null,
                last: subjectAttempts[0] || null,
                weakest: findWeakestTopic(subjectAttempts),
            };
        });

        /* Playable subjects first, then the ones still being written. */
        cards.sort((a, b) => Number(b.ready) - Number(a.ready) || a.order - b.order);

        const scores = attempts.map((attempt) => attempt.percentage || 0);
        const correct = attempts.reduce((n, attempt) => n + (attempt.score || 0), 0);
        const questionsTotal = attempts.reduce((n, attempt) => n + (attempt.total || 0), 0);

        const stats = {
            quizzes: attempts.length,
            best: scores.length ? Math.max(...scores) : 0,
            average: scores.length
                ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
                : 0,
            accuracy: questionsTotal ? Math.round((correct / questionsTotal) * 100) : 0,
            perfect: scores.some((score) => score >= 100),
        };

        const badges = [
            { id: "first", icon: "🌱", label: "First quiz", earned: stats.quizzes >= 1 },
            { id: "five", icon: "🔥", label: "5 quizzes", earned: stats.quizzes >= 5 },
            { id: "eighty", icon: "🎯", label: "Scored 80%+", earned: stats.best >= 80 },
            { id: "perfect", icon: "🏆", label: "Perfect score", earned: stats.perfect },
        ];

        const recommended =
            cards.find((card) => card.ready && card.seen < card.total) ||
            cards.find((card) => card.ready) ||
            null;

        return { cards, stats, badges, recent: attempts.slice(0, 3), recommended };
    }, []);

    const visibleCards = data.cards.filter(
        (card) =>
            filter === "all" ||
            (filter === "ready" ? card.ready : !card.ready)
    );

    const counts = {
        all: data.cards.length,
        ready: data.cards.filter((card) => card.ready).length,
        soon: data.cards.filter((card) => !card.ready).length,
    };

    const { stats, recommended } = data;

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
            <section className="quiz-hero qx-hero">
                <div className="quiz-hero-icon">
                    <span className="quiz-unicode-icon" aria-hidden="true">
                        🧠
                    </span>
                </div>

                <div className="quiz-hero-content">
                    <span className="quiz-hero-label">
                        PRACTICE MODE
                    </span>

                    <h2>
                        {stats.quizzes === 0
                            ? "Take your first quiz"
                            : `Your best score: ${stats.best}%`}
                    </h2>

                    <p>
                        {stats.quizzes === 0
                            ? "Choose a subject and practice questions based on the topics available in your notes."
                            : `${stats.quizzes} ${stats.quizzes === 1 ? "quiz" : "quizzes"} taken, ${stats.accuracy}% of answers correct so far. Keep going!`}
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="qx-stats" aria-label="Your quiz statistics">
                <div className="qx-stat">
                    <strong>{stats.quizzes}</strong>
                    <span>quizzes</span>
                </div>
                <div className="qx-stat">
                    <strong>{stats.best}%</strong>
                    <span>best</span>
                </div>
                <div className="qx-stat">
                    <strong>{stats.average}%</strong>
                    <span>average</span>
                </div>
                <div className="qx-stat">
                    <strong>{stats.accuracy}%</strong>
                    <span>accuracy</span>
                </div>
            </section>

            {/* Recommended next */}
            {recommended && (
                <button
                    type="button"
                    className="qx-next"
                    style={{
                        "--c-from": getSubjectAccent(recommended.subject.id).from,
                        "--c-to": getSubjectAccent(recommended.subject.id).to,
                    }}
                    onClick={() => navigate(`/quiz/${recommended.subject.id}`)}
                >
                    <span className="qx-next-icon" aria-hidden="true">
                        {recommended.subject.icon}
                    </span>
                    <span className="qx-next-body">
                        <small>
                            {recommended.seen < recommended.total ? "UP NEXT FOR YOU" : "READY FOR ANOTHER ROUND?"}
                        </small>
                        <strong>{recommended.subject.name} quiz</strong>
                        <span>
                            {recommended.seen < recommended.total
                                ? `${recommended.total - recommended.seen} new questions waiting`
                                : "You've seen every question. Try to beat your best."}
                        </span>
                    </span>
                    <span className="qx-next-go" aria-hidden="true">▶</span>
                </button>
            )}

            {/* Weak topic nudge */}
            {data.cards.some((card) => card.weakest) && (
                <p className="qx-nudge">
                    {(() => {
                        const card = data.cards.find((item) => item.weakest);
                        return (
                            <>
                                💡 Worth revisiting in <b>{card.subject.name}</b>:{" "}
                                <b>{card.weakest.name}</b> ({card.weakest.percent}% correct)
                            </>
                        );
                    })()}
                </p>
            )}

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

                <div className="qx-filters" role="tablist" aria-label="Filter subjects">
                    {FILTERS.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            role="tab"
                            aria-selected={filter === item.id}
                            className={`qx-chip ${filter === item.id ? "is-active" : ""}`}
                            onClick={() => setFilter(item.id)}
                        >
                            {item.label}
                            <b>{counts[item.id]}</b>
                        </button>
                    ))}
                </div>

                <div className="quiz-subject-grid">
                    {visibleCards.map((card, index) => {
                        const { subject } = card;
                        const noteCount = subject.notes?.length || 0;
                        const accent = getSubjectAccent(subject.id);
                        const seenPercent = card.total
                            ? Math.round((card.seen / card.total) * 100)
                            : 0;

                        return (
                            <button
                                key={subject.id}
                                type="button"
                                disabled={!card.ready}
                                className={`quiz-subject-card qx-card ${card.ready ? "is-ready" : "is-soon"}`}
                                style={{
                                    "--c-from": accent.from,
                                    "--c-to": accent.to,
                                    "--i": Math.min(index, 10),
                                }}
                                onClick={() => {
                                    navigate(`/quiz/${subject.id}`);
                                }}
                            >
                                <div className="quiz-subject-top">
                                    <div className="quiz-subject-icon qx-icon">
                                        <span
                                            className="quiz-unicode-icon"
                                            aria-hidden="true"
                                        >
                                            {subject.icon}
                                        </span>
                                    </div>

                                    {card.ready ? (
                                        card.best !== null ? (
                                            <span className="qx-best" title="Best score">
                                                🏅 {card.best}%
                                            </span>
                                        ) : (
                                            <span
                                                className="quiz-subject-arrow quiz-unicode-icon"
                                                aria-hidden="true"
                                            >
                                                →
                                            </span>
                                        )
                                    ) : (
                                        <span className="qx-soon">Soon</span>
                                    )}
                                </div>

                                <div className="quiz-subject-info">
                                    <h3>{subject.name}</h3>

                                    <p>
                                        {card.ready
                                            ? `${card.total} questions · ${card.topicCount} topics`
                                            : `${noteCount} ${noteCount === 1 ? "note" : "notes"} · quiz in the works`}
                                    </p>
                                </div>

                                {card.ready && (
                                    <div className="qx-progress">
                                        <div
                                            className="qx-progress-bar"
                                            role="progressbar"
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                            aria-valuenow={seenPercent}
                                            aria-label={`${card.seen} of ${card.total} questions seen`}
                                        >
                                            <i style={{ width: `${seenPercent}%` }} />
                                        </div>
                                        <small>
                                            {card.seen}/{card.total} seen
                                            {card.last ? ` · last ${card.last.percentage}% ${formatWhen(card.last.completedAt)}` : ""}
                                        </small>
                                    </div>
                                )}

                                <span className="quiz-subject-action">
                                    {!card.ready
                                        ? "Coming soon"
                                        : card.attemptCount
                                            ? "Play again"
                                            : "Start Quiz"}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Recent results */}
                {data.recent.length > 0 && (
                    <div className="qx-recent">
                        <h3>Recent results</h3>
                        <ul>
                            {data.recent.map((attempt) => {
                                const subject = subjects.find((s) => s.id === attempt.subjectId);
                                const percent = attempt.percentage || 0;
                                return (
                                    <li key={attempt.id}>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                navigate(`/quiz/${attempt.subjectId}/result/${attempt.id}`)
                                            }
                                        >
                                            <span className={`qx-score ${percent >= 80 ? "good" : percent >= 50 ? "ok" : "low"}`}>
                                                {percent}%
                                            </span>
                                            <span className="qx-recent-text">
                                                <strong>{subject?.name || attempt.subjectId}</strong>
                                                <small>
                                                    {attempt.score}/{attempt.total} correct · {formatWhen(attempt.completedAt)}
                                                </small>
                                            </span>
                                            <span aria-hidden="true">›</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}

                {/* Badges */}
                <div className="qx-badges" aria-label="Quiz badges">
                    {data.badges.map((badge) => (
                        <span
                            key={badge.id}
                            className={`qx-badge ${badge.earned ? "earned" : ""}`}
                            title={badge.earned ? "Earned" : "Not earned yet"}
                        >
                            <span aria-hidden="true">{badge.icon}</span>
                            {badge.label}
                        </span>
                    ))}
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

                <span>View Quiz History</span>

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