import { getQuestionBank } from "../data/quiz";
import storageService from "./storageService";

const ATTEMPTS_KEY = "quiz-attempts";

const createId = () => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
        return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const shuffle = (items) => {
    const array = [...items];

    for (let i = array.length - 1; i > 0; i -= 1) {
        const randomIndex = Math.floor(
            Math.random() * (i + 1)
        );

        [array[i], array[randomIndex]] = [
            array[randomIndex],
            array[i],
        ];
    }

    return array;
};

const getAttempts = () => {
    return storageService.get(ATTEMPTS_KEY, []);
};

const saveAttempts = (attempts) => {
    storageService.set(ATTEMPTS_KEY, attempts);
};

export const quizService = {
    /**
     * Get all questions for a subject.
     */
    getQuestions(subjectId) {
        return getQuestionBank(subjectId);
    },

    /**
     * Get questions grouped by topic.
     */
    getQuestionsByTopic(subjectId) {
        const questions = this.getQuestions(subjectId);

        return questions.reduce((groups, question) => {
            const topicId = question.topicId || "general";

            if (!groups[topicId]) {
                groups[topicId] = {
                    id: topicId,
                    name: question.topicName || "General",
                    questions: [],
                };
            }

            groups[topicId].questions.push(question);

            return groups;
        }, {});
    },

    /**
     * Get all attempts for a subject.
     */
    getAttempts(subjectId) {
        return getAttempts().filter(
            (attempt) => attempt.subjectId === subjectId
        );
    },

    /**
     * Get all question IDs that the user has already seen.
     */
    getSeenQuestionIds(subjectId) {
        const attempts = this.getAttempts(subjectId);

        const seenIds = new Set();

        attempts.forEach((attempt) => {
            (attempt.questionIds || []).forEach((questionId) => {
                seenIds.add(questionId);
            });
        });

        return seenIds;
    },

    /**
     * Select a new quiz set.
     *
     * Priority:
     * 1. Questions never seen before
     * 2. Previously seen questions if necessary
     *
     * This allows us to eventually support large question pools.
     */
    createQuestionSet(subjectId, count = 25) {
        const questions = this.getQuestions(subjectId);

        if (!questions.length) {
            return [];
        }

        const seenQuestionIds =
            this.getSeenQuestionIds(subjectId);

        const unseenQuestions = questions.filter(
            (question) =>
                !seenQuestionIds.has(question.id)
        );

        const seenQuestions = questions.filter(
            (question) =>
                seenQuestionIds.has(question.id)
        );

        const selected = [];

        // First choose unseen questions.
        selected.push(...shuffle(unseenQuestions));

        // If we don't have enough unseen questions,
        // use previously seen questions.
        if (selected.length < count) {
            selected.push(...shuffle(seenQuestions));
        }

        /*
         * Shuffle answer options for every question.
         *
         * IMPORTANT:
         * Because the options are shuffled, correctAnswer
         * must also be converted to the new shuffled index.
         */
        return selected
            .slice(0, count)
            .map((question) => {
                const shuffledOptions = shuffle(
                    question.options.map(
                        (option, index) => ({
                            text: option,
                            originalIndex: index,
                        })
                    )
                );

                return {
                    ...question,

                    options: shuffledOptions.map(
                        (option) => option.text
                    ),

                    correctAnswer:
                        shuffledOptions.findIndex(
                            (option) =>
                                option.originalIndex ===
                                question.correctAnswer
                        ),
                };
            });
    },

    /**
     * Save completed quiz attempt.
     *
     * IMPORTANT:
     * The complete question snapshot is saved here.
     *
     * This means the review screen can later show
     * exactly what the student saw during the attempt,
     * including shuffled options.
     */
    saveAttempt({
        subjectId,
        questions,
        answers,
        startedAt,
        completedAt,
    }) {
        const results = questions.map((question) => {
            const answer = answers[question.id];

            const selectedAnswer =
                typeof answer === "number"
                    ? answer
                    : null;

            const isCorrect =
                selectedAnswer !== null &&
                selectedAnswer === question.correctAnswer;

            return {
                questionId: question.id,

                subjectId,

                topicId:
                    question.topicId || "general",

                topicName:
                    question.topicName || "General",

                /*
                 * Save the actual question text shown
                 * during this attempt.
                 */
                question: question.question,

                /*
                 * Save the exact shuffled options used
                 * in this attempt.
                 */
                options: [...question.options],

                /*
                 * Save explanation so the review screen
                 * can show it later.
                 */
                explanation:
                    question.explanation || "",

                /*
                 * Save difficulty for future analytics.
                 */
                difficulty:
                    question.difficulty || "medium",

                /*
                 * Save the related note if available.
                 */
                noteId:
                    question.noteId || null,

                /*
                 * Student's selected option index.
                 */
                selectedAnswer,

                /*
                 * Correct option index from the
                 * shuffled options.
                 */
                correctAnswer:
                    question.correctAnswer,

                isCorrect,

                answered:
                    selectedAnswer !== null,
            };
        });

        const score = results.filter(
            (result) => result.isCorrect
        ).length;

        const total = questions.length;

        const percentage =
            total > 0
                ? Math.round(
                    (score / total) * 100
                )
                : 0;

        const attempt = {
            id: createId(),

            subjectId,

            questionIds: questions.map(
                (question) => question.id
            ),

            answers,

            results,

            score,

            total,

            percentage,

            startedAt,

            completedAt,
        };

        const attempts = getAttempts();

        attempts.unshift(attempt);

        saveAttempts(attempts);

        return attempt;
    },

    /**
     * Get one attempt.
     */
    getAttempt(attemptId) {
        return getAttempts().find(
            (attempt) => attempt.id === attemptId
        );
    },

    /**
     * Get question-level statistics.
     */
    getQuestionStats(subjectId) {
        const attempts =
            this.getAttempts(subjectId);

        const stats = {};

        attempts.forEach((attempt) => {
            (attempt.results || []).forEach(
                (result) => {
                    if (!stats[result.questionId]) {
                        stats[result.questionId] = {
                            questionId:
                                result.questionId,

                            topicId:
                                result.topicId,

                            topicName:
                                result.topicName,

                            attempts: 0,

                            correct: 0,

                            wrong: 0,

                            unanswered: 0,

                            lastSeen: null,
                        };
                    }

                    const item =
                        stats[result.questionId];

                    item.attempts += 1;

                    if (result.isCorrect) {
                        item.correct += 1;
                    } else if (result.answered) {
                        item.wrong += 1;
                    } else {
                        item.unanswered += 1;
                    }

                    item.lastSeen =
                        attempt.completedAt;
                }
            );
        });

        return stats;
    },

    /**
     * Get topic-level statistics.
     */
    getTopicStats(subjectId) {
        const questionStats =
            this.getQuestionStats(subjectId);

        const topicStats = {};

        Object.values(questionStats).forEach(
            (question) => {
                const topicId =
                    question.topicId;

                if (!topicStats[topicId]) {
                    topicStats[topicId] = {
                        topicId,

                        topicName:
                            question.topicName,

                        attempts: 0,

                        correct: 0,

                        wrong: 0,

                        unanswered: 0,
                    };
                }

                const topic =
                    topicStats[topicId];

                topic.attempts +=
                    question.attempts;

                topic.correct +=
                    question.correct;

                topic.wrong +=
                    question.wrong;

                topic.unanswered +=
                    question.unanswered;
            }
        );

        return topicStats;
    },

    /**
     * Get attempt history.
     */
    getHistory(subjectId) {
        return this.getAttempts(subjectId);
    },

    /**
     * Get all quiz attempts.
     */
    getAllHistory() {
        return getAttempts();
    },

    /**
     * Clear quiz history.
     */
    clearHistory() {
        storageService.remove(ATTEMPTS_KEY);
    },

    /**
     * Get summary for a subject.
     */
    getSummary(subjectId) {
        const attempts =
            this.getAttempts(subjectId);

        if (!attempts.length) {
            return {
                attempts: 0,
                questionsAnswered: 0,
                correct: 0,
                accuracy: 0,
            };
        }

        const questionsAnswered =
            attempts.reduce(
                (total, attempt) =>
                    total +
                    (attempt.results || []).filter(
                        (result) =>
                            result.answered
                    ).length,
                0
            );

        const correct =
            attempts.reduce(
                (total, attempt) =>
                    total + attempt.score,
                0
            );

        return {
            attempts: attempts.length,

            questionsAnswered,

            correct,

            accuracy:
                questionsAnswered > 0
                    ? Math.round(
                        (correct /
                            questionsAnswered) *
                            100
                    )
                    : 0,
        };
    },
};

export default quizService;