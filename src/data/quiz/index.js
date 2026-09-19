import reactQuiz from "./reactQuiz";

const quizBank = {
  react: reactQuiz,
};

export function getQuestionBank(subjectId) {
  return quizBank[subjectId] || [];
}

export function getAvailableQuizSubjects() {
  return Object.keys(quizBank);
}

export default quizBank;