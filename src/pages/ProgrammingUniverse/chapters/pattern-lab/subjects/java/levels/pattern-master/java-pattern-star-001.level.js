export default {
  "id": "java-pattern-star-001",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "levelNumber": 1,
  "title": "Left Triangle: First Contact",
  "difficulty": "beginner",
  "estimatedMinutes": 2,
  "challengeType": "predict-output",
  "instructions": "Study the example, reason through the loop logic, then choose the correct answer.",
  "content": {
    "language": "java",
    "prompt": "What is the output for rows = 3?",
    "choices": [
      {
        "id": "triangle",
        "label": "* on row 1, ** on row 2, *** on row 3"
      },
      {
        "id": "square",
        "label": "Three stars on every row"
      },
      {
        "id": "reverse",
        "label": "*** then ** then *"
      }
    ],
    "code": "for (int i = 1; i <= 3; i++) {\n    for (int j = 1; j <= i; j++) {\n        System.out.print(\"* \");\n    }\n    System.out.println();\n}",
    "patternRows": [
      "*",
      "* *",
      "* * *"
    ],
    "expectedOutput": "*\n* *\n* * *"
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "triangle"
  },
  "hints": [
    "Trace the outer loop first, then count what the inner loop prints.",
    "Use the row number and the loop condition to check the number of iterations."
  ],
  "explanation": {
    "concept": "rows and nested loops",
    "summary": "The inner loop runs j from 1 through i, so each new row prints one extra star.",
    "details": "The outer loop chooses the row number i. The inner loop prints i stars. println moves to the next row."
  },
  "rewards": {
    "xp": 15
  },
  "version": 1,
  "categoryId": "stars"
};
