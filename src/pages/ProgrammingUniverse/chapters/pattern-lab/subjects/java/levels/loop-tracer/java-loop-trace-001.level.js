export default {
  "id": "java-loop-trace-001",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "loop-tracer",
  "levelNumber": 1,
  "title": "Count the Inner Loop",
  "difficulty": "beginner",
  "estimatedMinutes": 2,
  "challengeType": "predict-output",
  "instructions": "Study the example, reason through the loop logic, then choose the correct answer.",
  "content": {
    "language": "java",
    "prompt": "The outer loop runs 3 times and the inner loop runs 2 times per outer iteration. How many total inner-loop iterations occur?",
    "choices": [
      {
        "id": "six",
        "label": "6 iterations"
      },
      {
        "id": "five",
        "label": "5 iterations"
      },
      {
        "id": "two",
        "label": "2 iterations"
      }
    ],
    "code": "for (int i = 1; i <= 3; i++) {\n    for (int j = 1; j <= 2; j++) {\n        // runs once per inner iteration\n    }\n}"
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "six"
  },
  "hints": [
    "Trace the outer loop first, then count what the inner loop prints.",
    "Use the row number and the loop condition to check the number of iterations."
  ],
  "explanation": {
    "concept": "nested loop multiplication",
    "summary": "The inner loop executes 2 times for each of 3 outer-loop iterations: 3 × 2 = 6.",
    "details": "When the inner loop resets for each outer iteration, count all repeats."
  },
  "rewards": {
    "xp": 18
  },
  "version": 1,
  "categoryId": "nested-loops"
};
