export default {
  id: "cq-lg-005",
  chapterId: "code-quest",
  subjectId: "java-fundamentals",
  modeId: "logic-master",
  levelNumber: 5,
  title: "Nested Ternary Ladder",
  difficulty: "intermediate",
  estimatedMinutes: 3,
  challengeType: "predict-output",
  instructions: "Trace the nested conditional expression and type the exact string assigned to label.",
  content: {
    language: "java",
    prompt: "What does label reference after this statement?",
    code: "int s = 7;\nString label = (s > 10) ? \"big\" : (s > 5) ? \"medium\" : \"small\";",
  },
  evaluation: { strategy: "structured-answer", acceptedAnswers: ["medium"] },
  hints: [
    "The second test lives inside the else side of the first one.",
    "Evaluate the outer comparison first; only if it fails does the inner pair get a chance.",
  ],
  explanation: {
    concept: "Nested ternary (conditional) operator",
    summary: "The outer test fails, so evaluation moves into the else side where the inner test succeeds and picks the middle band.",
    details: "s > 10 is false, so the expression continues to the nested ternary. There s > 5 is true, giving the second string. Nested ternaries read right-to-left in grouping: cond1 ? a : (cond2 ? b : c). Deep nesting hurts readability, so prefer an if-else ladder or a switch.",
  },
  rewards: { xp: 24 },
  version: 1,
};
