export default {
  "id": "pl-numbers-005",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "numbers",
  "levelNumber": 5,
  "title": "Count the Prints: 1234 Rectangle",
  "difficulty": "beginner",
  "estimatedMinutes": 2,
  "challengeType": "numeric-answer",
  "instructions": "This program prints a rectangle of counting digits. Answer how many times the inner loop body runs in total (each run prints one number).",
  "content": {
    "language": "java",
    "prompt": "How many total inner-loop prints does the program perform?",
    "code": "for (int i = 1; i <= 3; i++) {\n    for (int j = 1; j <= 4; j++) {\n        System.out.print(j + \" \");\n    }\n    System.out.println();\n}",
    "patternRows": [
      "1 2 3 4",
      "1 2 3 4",
      "1 2 3 4"
    ],
    "expectedOutput": "1 2 3 4\n1 2 3 4\n1 2 3 4"
  },
  "evaluation": {
    "strategy": "blank-count",
    "expectedCount": 12
  },
  "hints": [
    "The inner loop bound does not depend on i, so every row performs the same number of prints.",
    "Total iterations of a nested loop equals the product of the two ranges."
  ],
  "explanation": {
    "concept": "iteration count of nested loops",
    "summary": "The outer loop runs 3 times and the inner loop runs 4 times per outer iteration, so the body executes 3 * 4 = 12 times.",
    "details": "j restarts at 1 on each row, which is why every line shows 1 2 3 4 again. Because the inner bound is a constant, the rectangle has equal-width rows; the total print count is the grid area, not its perimeter."
  },
  "rewards": {
    "xp": 15
  },
  "version": 1
};
