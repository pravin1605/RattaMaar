export default {
  "id": "java-pattern-number-002",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "levelNumber": 3,
  "title": "Floyd Triangle",
  "difficulty": "beginner",
  "estimatedMinutes": 2,
  "challengeType": "predict-output",
  "instructions": "Study the example, reason through the loop logic, then choose the correct answer.",
  "content": {
    "language": "java",
    "prompt": "What is the fourth row of Floyd’s triangle?",
    "choices": [
      {
        "id": "row4",
        "label": "7 8 9 10"
      },
      {
        "id": "row4wrong",
        "label": "4 4 4 4"
      },
      {
        "id": "start",
        "label": "1 2 3 4"
      }
    ],
    "code": "int number = 1;\nfor (int i = 1; i <= 4; i++) {\n    for (int j = 1; j <= i; j++) {\n        System.out.print(number++ + \" \");\n    }\n    System.out.println();\n}",
    "patternRows": [
      "1",
      "2 3",
      "4 5 6",
      "7 8 9 10"
    ],
    "expectedOutput": "1\n2 3\n4 5 6\n7 8 9 10"
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "row4"
  },
  "hints": [
    "Trace the outer loop first, then count what the inner loop prints.",
    "Use the row number and the loop condition to check the number of iterations."
  ],
  "explanation": {
    "concept": "continuous counter",
    "summary": "The number variable increases after each printed value, including across row boundaries.",
    "details": "Rows contain 1, 2, 3, then 4 numbers. Count the first six values before row four."
  },
  "rewards": {
    "xp": 20
  },
  "version": 1,
  "categoryId": "numbers"
};
