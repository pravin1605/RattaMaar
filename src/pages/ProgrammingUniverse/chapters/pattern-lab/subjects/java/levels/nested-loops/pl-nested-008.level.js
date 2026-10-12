export default {
  "id": "pl-nested-008",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "loop-tracer",
  "categoryId": "nested-loops",
  "levelNumber": 8,
  "title": "The Triangle That Starts on the Diagonal",
  "difficulty": "advanced",
  "estimatedMinutes": 4,
  "challengeType": "predict-output",
  "instructions": "The inner loop begins at the current row index instead of 1. Choose the correct output shape.",
  "content": {
    "language": "java",
    "prompt": "What does the program print?",
    "code": "for (int i = 1; i <= 4; i++) {\n    for (int j = i; j <= 4; j++) {\n        System.out.print(j + \" \");\n    }\n    System.out.println();\n}",
    "choices": [
      { "id": "shrink", "label": "Row 1 shows 1 through 4, and each following row drops its leading number, so rows get shorter" },
      { "id": "same", "label": "Every row shows the full sequence from 1 through 4" },
      { "id": "grow", "label": "Rows start small and grow longer as the outer loop advances" }
    ],
    "patternRows": [
      "1 2 3 4",
      "2 3 4",
      "3 4",
      "4"
    ],
    "expectedOutput": "1 2 3 4\n2 3 4\n3 4\n4"
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "shrink"
  },
  "hints": [
    "The inner counter's starting value is the outer counter itself, so each pass begins further along the sequence.",
    "Count how many values satisfy both j >= i and j <= 4 on each pass; the window of printed numbers slides left to right."
  ],
  "explanation": {
    "concept": "inner bound tied to the outer variable",
    "summary": "Because j starts at i, each row prints the slice of 1 through 4 that begins at the row number, so rows shrink from the left.",
    "details": "On pass i the inner loop covers j = i, i + 1, ..., 4, which contains 5 - i values: four on the first pass, one on the last. This j = i start is the key trick behind triangular and hollow pyramid patterns, where columns before the diagonal should stay blank or unprinted. The same loop still resets its start value on every outer pass."
  },
  "rewards": { "xp": 25 },
  "prerequisites": ["pl-nested-007"],
  "version": 1
};
