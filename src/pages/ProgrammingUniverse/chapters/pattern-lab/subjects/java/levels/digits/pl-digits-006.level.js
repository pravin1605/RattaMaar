export default {
  "id": "pl-digits-006",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "digits",
  "levelNumber": 6,
  "title": "Sum of Squares of Digits",
  "difficulty": "intermediate",
  "estimatedMinutes": 4,
  "challengeType": "trace-variable",
  "instructions": "Step through the loop and fill the next trace row for n = 123.",
  "content": {
    "language": "java",
    "prompt": "After the first trace row (digit 3, sum 9), what does the SECOND iteration put in digit and sum?",
    "code": "int n = 123;\nint sum = 0;\nwhile (n > 0) {\n    int digit = n % 10;\n    sum += digit * digit;\n    n /= 10;\n}\nSystem.out.println(sum);",
    "trace": {
      "columns": ["step", "digit (n % 10)", "sum after step", "n after step"],
      "rows": [
        { "cells": ["1", "3", "9", "12"], "note": "123 % 10 = 3, sum = 3*3 = 9, n = 123 / 10 = 12" },
        { "cells": ["2", "2", "13", "1"], "note": "12 % 10 = 2, sum = 9 + 4 = 13, n = 12 / 10 = 1" },
        { "cells": ["3", "1", "14", "0"], "note": "1 % 10 = 1, sum = 13 + 1 = 14, loop ends" }
      ]
    },
    "answerLabel": "Row 2 values: digit, sum, n (comma separated)"
  },
  "evaluation": { "strategy": "structured-answer", "acceptedAnswers": ["2, 13, 1", "2,13,1", "2 13 1"] },
  "hints": [
    "Apply the two arithmetic updates in the exact order the loop writes them.",
    "12 % 10 gives the tens digit of the original number; then square it and add."
  ],
  "explanation": {
    "concept": "digit extraction with % and /",
    "summary": "n % 10 peels the last digit, n /= 10 removes it, and sum accumulates each digit squared.",
    "details": "For 123 the digits arrive as 3, 2, 1 so the accumulator builds 9, then 13, then 14 — the sum of squares 9 + 4 + 1."
  },
  "rewards": { "xp": 20 },
  "version": 1
};
