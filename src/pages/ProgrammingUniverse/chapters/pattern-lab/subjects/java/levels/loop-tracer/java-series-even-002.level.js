export default {
  "id": "java-series-even-002",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "loop-tracer",
  "levelNumber": 1,
  "title": "Even Number Series",
  "difficulty": "beginner",
  "estimatedMinutes": 2,
  "challengeType": "predict-output",
  "instructions": "Study the example, reason through the loop logic, then choose the correct answer.",
  "content": {
    "language": "java",
    "prompt": "What is the sum of the first five positive even numbers: 2, 4, 6, 8, 10?",
    "choices": [
      {
        "id": "thirty",
        "label": "30"
      },
      {
        "id": "twenty",
        "label": "20"
      },
      {
        "id": "fifteen",
        "label": "15"
      }
    ],
    "code": "int sum = 0;\nfor (int n = 2; n <= 10; n += 2) {\n    sum += n;\n}"
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "thirty"
  },
  "hints": [
    "Trace the outer loop first, then count what the inner loop prints.",
    "Use the row number and the loop condition to check the number of iterations."
  ],
  "explanation": {
    "concept": "loop counter and accumulator",
    "summary": "2 + 4 + 6 + 8 + 10 = 30. The counter increases by 2 on each iteration.",
    "details": "n += 2 is shorthand for n = n + 2."
  },
  "rewards": {
    "xp": 15
  },
  "version": 1,
  "categoryId": "numbers"
};
