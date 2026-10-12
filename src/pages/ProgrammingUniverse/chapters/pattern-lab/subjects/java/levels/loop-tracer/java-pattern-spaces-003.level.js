export default {
  "id": "java-pattern-spaces-003",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "loop-tracer",
  "levelNumber": 1,
  "title": "Why the Pyramid Is Centered",
  "difficulty": "beginner",
  "estimatedMinutes": 2,
  "challengeType": "predict-output",
  "instructions": "Study the example, reason through the loop logic, then choose the correct answer.",
  "content": {
    "language": "java",
    "prompt": "For a pyramid with 4 rows, how many leading spaces are printed before the first row if the formula is rows - i?",
    "choices": [
      {
        "id": "three",
        "label": "3 spaces"
      },
      {
        "id": "four",
        "label": "4 spaces"
      },
      {
        "id": "one",
        "label": "1 space"
      }
    ],
    "code": "int rows = 4;\nfor (int i = 1; i <= rows; i++) {\n    int spaces = rows - i;\n    // print spaces, then stars\n}"
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "three"
  },
  "hints": [
    "Trace the outer loop first, then count what the inner loop prints.",
    "Use the row number and the loop condition to check the number of iterations."
  ],
  "explanation": {
    "concept": "spaces and alignment",
    "summary": "On the first row i = 1, so spaces = 4 - 1 = 3.",
    "details": "As i increases, the number of leading spaces decreases by one."
  },
  "rewards": {
    "xp": 18
  },
  "version": 1,
  "categoryId": "hollow"
};
