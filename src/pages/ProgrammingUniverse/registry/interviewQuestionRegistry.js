const questionModules = import.meta.glob("../interviews/questions/*.question.js", { eager: true, import: "default" });
const discovered = Object.values(questionModules).flatMap((pack) => Array.isArray(pack) ? pack : []);
const ids = new Set();
export const interviewQuestionIssues = [];
export const validInterviewQuestions = discovered.filter((question) => {
  const issue = (message) => interviewQuestionIssues.push({ id: question?.id || "<unknown>", message });
  if (!question || typeof question !== "object") { issue("Question must export an object."); return false; }
  if (!question.id || !question.subjectId || !question.subjectName || !question.question || !question.answer || !question.explanation) { issue("Required question fields are missing."); return false; }
  if (ids.has(question.id)) { issue("Duplicate interview question ID."); return false; }
  ids.add(question.id);
  if (!["beginner", "intermediate", "advanced"].includes(question.difficulty)) { issue("Unsupported difficulty."); return false; }
  if (!["mcq", "short-answer"].includes(question.type)) { issue("Unsupported interview question type."); return false; }
  if (question.type === "mcq") {
    if (!Array.isArray(question.options) || question.options.length < 2) { issue("MCQ requires at least two answer options."); return false; }
    const optionIds = question.options.map((option) => option?.id);
    if (question.options.some((option) => !option || typeof option.id !== "string" || typeof option.text !== "string" || !option.text.trim())) { issue("Every option requires an ID and readable text."); return false; }
    if (new Set(optionIds).size !== optionIds.length) { issue("Option IDs must be unique within a question."); return false; }
    if (!question.correctOptionId || !question.options.some((option) => option.id === question.correctOptionId)) { issue("Correct option is missing from the options list."); return false; }
  }
  return true;
});
export function getInterviewQuestions() { return validInterviewQuestions; }
export function getInterviewQuestionCount(subjectId) { return validInterviewQuestions.filter((question) => !subjectId || question.subjectId === subjectId).length; }
export function getInterviewQuestionIssues() { return [...interviewQuestionIssues]; }
