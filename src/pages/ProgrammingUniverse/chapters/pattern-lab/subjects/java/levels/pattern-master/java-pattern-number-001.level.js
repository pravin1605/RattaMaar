export default {
  "id": "java-pattern-number-001",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "levelNumber": 2,
  "title": "Repeated Row Numbers",
  "difficulty": "beginner",
  "estimatedMinutes": 2,
  "challengeType": "predict-output",
  "instructions": "Study the example, reason through the loop logic, then choose the correct answer.",
  "content": {
    "language": "java",
    "prompt": "Each row prints its row number i, i times. What is the third row?",
    "choices": [
      {
        "id": "third",
        "label": "3 3 3"
      },
      {
        "id": "seq",
        "label": "1 2 3"
      },
      {
        "id": "two",
        "label": "3 3"
      }
    ],
    "code": "for (int i = 1; i <= 3; i++) {\n    for (int j = 1; j <= i; j++) {\n        System.out.print(i + \" \");\n    }\n    System.out.println();\n}",
    "patternRows": [
      "1",
      "2 2",
      "3 3 3"
    ],
    "expectedOutput": "1\n2 2\n3 3 3"
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "third"
  },
  "hints": [
    "Trace the outer loop first, then count what the inner loop prints.",
    "Use the row number and the loop condition to check the number of iterations."
  ],
  "explanation": {
    "concept": "row variable versus column variable",
    "summary": "The expression printed is i, and the inner loop runs i times. On row three, i equals 3.",
    "details": "Notice the difference between printing i and printing j."
  },
  "rewards": {
    "xp": 15
  },
  "version": 1,
  "categoryId": "numbers"
};
