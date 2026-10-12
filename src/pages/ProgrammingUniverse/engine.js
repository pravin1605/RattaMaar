/** Small deterministic evaluator for authored challenges. Never executes submitted code. */
export function evaluateChallenge(level, answer) {
  const strategy = level?.evaluation?.strategy;
  if (strategy === "single-choice" || strategy === "validated-correction") {
    const expected = strategy === "single-choice" ? level.evaluation.correctChoiceId : level.evaluation.expectedFixId;
    return { correct: String(answer ?? "") === String(expected ?? ""), expectedAnswer: expected };
  }
  if (strategy === "exact-output" || strategy === "exact-text") {
    const expected = String(level.evaluation.expectedOutput ?? level.evaluation.expectedText ?? "").trim();
    return { correct: String(answer ?? "").trim() === expected, expectedAnswer: expected };
  }
  if (strategy === "ordered-blocks") {
    const expected = Array.isArray(level.evaluation.expectedOrder) ? level.evaluation.expectedOrder : [];
    const submitted = Array.isArray(answer) ? answer : [];
    return { correct: expected.length === submitted.length && expected.every((item, index) => item === submitted[index]), expectedAnswer: expected };
  }
  if (strategy === "case-insensitive-text") {
    const expected = String(level.evaluation.expectedText ?? "").trim().toLowerCase();
    return { correct: String(answer ?? "").trim().toLowerCase() === expected, expectedAnswer: expected };
  }
  if (strategy === "contains-text") {
    const expected = String(level.evaluation.requiredText ?? "").trim().toLowerCase();
    return { correct: Boolean(expected) && String(answer ?? "").toLowerCase().includes(expected), expectedAnswer: expected };
  }
  if (strategy === "numeric-tolerance") {
    const expected = Number(level.evaluation.expectedNumber);
    const tolerance = Number(level.evaluation.tolerance ?? 0);
    const submitted = Number(String(answer ?? "").trim());
    return { correct: Number.isFinite(submitted) && Number.isFinite(expected) && Math.abs(submitted - expected) <= tolerance, expectedAnswer: expected };
  }
  if (strategy === "blank-count") {
    const expected = Number(level.evaluation.expectedCount);
    const submitted = Number(String(answer ?? "").trim());
    return { correct: Number.isFinite(submitted) && submitted === expected, expectedAnswer: expected };
  }
  if (strategy === "fill-blanks") {
    const normalize = (value) => String(value ?? "").replace(/\s+/g, " ").trim().toLowerCase();
    const expected = (level.evaluation.expectedBlanks || []).map((blank) => Array.isArray(blank) || typeof blank === "string"
      ? { accepted: [blank].flat().map(normalize) }
      : { accepted: (blank.accepted || [blank.value].flat()).map(normalize) });
    const submitted = typeof answer === "string" ? answer.split("||") : Array.isArray(answer) ? answer : [];
    if (submitted.length !== expected.length) return { correct: false, expectedAnswer: expected.map((blank) => blank.accepted[0] ?? ""), wrongCount: expected.length };
    const correct = expected.every((blank, index) => blank.accepted.includes(normalize(submitted[index])));
    return { correct, expectedAnswer: expected.map((blank) => blank.accepted[0] ?? "") };
  }
  if (strategy === "structured-answer") {
    const accepted = (level.evaluation.acceptedAnswers || []).map((item) => String(item).trim().toLowerCase());
    return { correct: accepted.includes(String(answer ?? "").trim().toLowerCase()), expectedAnswer: accepted[0] || "Review the explanation" };
  }
  return { correct: false, expectedAnswer: null, unsupported: true };
}

export function getChallengeOptions(level) {
  if (Array.isArray(level?.content?.choices)) return level.content.choices;
  if (Array.isArray(level?.content?.options)) return level.content.options.map((option, index) => typeof option === "string" ? { id: String(index), label: option } : option);
  return [];
}
