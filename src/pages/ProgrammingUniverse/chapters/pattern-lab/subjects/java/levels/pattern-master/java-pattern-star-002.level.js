export default {
  "id": "java-pattern-star-002",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "levelNumber": 2,
  "title": "Inverted Triangle",
  "difficulty": "beginner",
  "estimatedMinutes": 2,
  "challengeType": "predict-output",
  "instructions": "Study the example, reason through the loop logic, then choose the correct answer.",
  "content": {
    "language": "java",
    "prompt": "Which output is produced by a loop that prints 4, then 3, then 2, then 1 stars?",
    "choices": [
      {
        "id": "inverted",
        "label": "4 stars, then 3, then 2, then 1"
      },
      {
        "id": "increasing",
        "label": "1 star, then 2, then 3, then 4"
      },
      {
        "id": "square",
        "label": "4 stars on every row"
      }
    ],
    "code": "for (int i = 4; i >= 1; i--) {\n    for (int j = 1; j <= i; j++) {\n        System.out.print(\"* \");\n    }\n    System.out.println();\n}",
    "patternRows": [
      "* * * *",
      "* * *",
      "* *",
      "*"
    ],
    "expectedOutput": "* * * *\n* * *\n* *\n*"
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "inverted"
  },
  "hints": [
    "Trace the outer loop first, then count what the inner loop prints.",
    "Use the row number and the loop condition to check the number of iterations."
  ],
  "explanation": {
    "concept": "decreasing loop counters",
    "summary": "The outer loop begins at 4 and decreases until 1, so each row contains fewer stars.",
    "details": "The condition i >= 1 keeps the loop running while i is 4, 3, 2, and 1."
  },
  "rewards": {
    "xp": 18
  },
  "version": 1,
  "categoryId": "stars"
};
