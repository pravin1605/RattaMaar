export default {
  "id": "cq-od-005",
  "chapterId": "code-quest",
  "subjectId": "java-fundamentals",
  "modeId": "output-detective",
  "levelNumber": 5,
  "title": "Two Questions in One Line",
  "difficulty": "beginner",
  "estimatedMinutes": 3,
  "challengeType": "multiple-choice",
  "instructions": "This line uses a nested conditional operator. Pick the value that gets printed.",
  "content": {
    "language": "java",
    "code": "int score = 72;\nString label = score >= 90 ? \"high\" : score >= 60 ? \"mid\" : \"low\";\nSystem.out.println(label);",
    "prompt": "Which label is printed?",
    "choices": [
      { "id": "high", "label": "high" },
      { "id": "mid", "label": "mid" },
      { "id": "low", "label": "low" },
      { "id": "err", "label": "A compile error because ? cannot be repeated" }
    ]
  },
  "evaluation": { "strategy": "single-choice", "correctChoiceId": "mid" },
  "hints": [
    "Each question mark picks one of two answers; the second test only runs when the first test fails.",
    "Compare the score against 90 first, then against the remaining threshold."
  ],
  "explanation": {
    "concept": "Chained ternary (conditional) operators",
    "summary": "The chain reads: if score is at least 90 use the first label; otherwise test score against 60. 72 fails the 90 test but passes the 60 test, so the middle label is chosen. Repeating ? is legal; the expression groups from the right.",
    "details": "condition1 ? valueA : condition2 ? valueB : valueC is parsed as condition1 ? valueA : (condition2 ? valueB : valueC). Only the branch actually selected is evaluated."
  },
  "rewards": { "xp": 17 },
  "version": 1
};
