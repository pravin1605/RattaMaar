export default {
  "id": "pl-nested-002",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "loop-tracer",
  "categoryId": "nested-loops",
  "levelNumber": 2,
  "title": "How Many Times Does the Inner Body Run?",
  "difficulty": "beginner",
  "estimatedMinutes": 2,
  "challengeType": "numeric-answer",
  "instructions": "Count the total number of inner-loop executions and enter that number.",
  "content": {
    "language": "java",
    "prompt": "Enter the value printed by the program.",
    "code": "int total = 0;\nfor (int i = 1; i <= 4; i++) {\n    for (int j = 1; j <= 2 * i; j++) {\n        total++;\n    }\n}\nSystem.out.println(total);"
  },
  "evaluation": {
    "strategy": "blank-count",
    "expectedCount": 20
  },
  "hints": [
    "The inner bound depends on the outer variable, so each outer pass contributes a different number of executions.",
    "List the four inner loop bounds as double the current row index, then add them up."
  ],
  "explanation": {
    "concept": "variable inner bounds change the iteration count",
    "summary": "The inner loop runs 2 * i times per outer pass, so the totals per pass are 2, 4, 6, 8 and add up to 20.",
    "details": "With a constant inner bound you could multiply outer count by inner count, but here j grows with i. Each outer pass re-evaluates 2 * i from scratch: i = 1 gives 2 executions, i = 2 gives 4, i = 3 gives 6, and i = 4 gives 8, for a grand total of 20 increments."
  },
  "rewards": { "xp": 15 },
  "version": 1
};
