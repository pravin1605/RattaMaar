export default {
  "id": "java-series-fibonacci-001",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "loop-tracer",
  "levelNumber": 1,
  "title": "Fibonacci Next Number",
  "difficulty": "beginner",
  "estimatedMinutes": 2,
  "challengeType": "predict-output",
  "instructions": "Study the example, reason through the loop logic, then choose the correct answer.",
  "content": {
    "language": "java",
    "prompt": "In the Fibonacci series 0, 1, 1, 2, 3, 5, what comes next?",
    "choices": [
      {
        "id": "eight",
        "label": "8"
      },
      {
        "id": "seven",
        "label": "7"
      },
      {
        "id": "ten",
        "label": "10"
      }
    ],
    "code": "Each new value is the sum of the previous two values."
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "eight"
  },
  "hints": [
    "Trace the outer loop first, then count what the inner loop prints.",
    "Use the row number and the loop condition to check the number of iterations."
  ],
  "explanation": {
    "concept": "Fibonacci sequence",
    "summary": "The next value is 3 + 5 = 8.",
    "details": "Always add the two immediately preceding numbers."
  },
  "rewards": {
    "xp": 12
  },
  "version": 1,
  "categoryId": "series"
};
