export default {
  "id": "cq-tc-009",
  "chapterId": "code-quest",
  "subjectId": "java-fundamentals",
  "modeId": "timed-challenge",
  "levelNumber": 9,
  "title": "Loop Tally Dash",
  "difficulty": "intermediate",
  "estimatedMinutes": 1,
  "timeLimitSeconds": 30,
  "challengeType": "numeric-answer",
  "instructions": "Count the iterations before the timer runs out.",
  "content": {
    "language": "java",
    "prompt": "How many times does the inner statement execute?\nfor (int i = 0; i < 3; i++)\n    for (int j = i; j < 3; j++)\n        count++;",
    "answerLabel": "Total executions of count++"
  },
  "evaluation": { "strategy": "blank-count", "expectedCount": 6 },
  "hints": [
    "Row i = 0 runs j = 0, 1, 2; later rows start further along.",
    "Add the three row counts: 3 + 2 + 1."
  ],
  "explanation": {
    "concept": "triangular iteration counts",
    "summary": "The inner loop runs 3, then 2, then 1 times — 6 in total.",
    "details": "Because j starts at i, the work forms a triangle, not a square. n = 3 gives n(n+1)/2 = 6; a full square would be 9."
  },
  "rewards": { "xp": 20 },
  "version": 1
};
