export default {
  "id": "pl-series-007",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "series",
  "levelNumber": 7,
  "title": "Repdigit Series 1 + 11 + 111 + 1111",
  "difficulty": "intermediate",
  "estimatedMinutes": 4,
  "challengeType": "predict-output",
  "instructions": "Type the exact final number printed by the program (a single short value).",
  "content": {
    "language": "java",
    "prompt": "Each new term is built from the previous one by shifting a decimal place and appending a 1. What single number does the program print?",
    "code": "int term = 0, sum = 0;\nfor (int i = 1; i <= 4; i++) {\n    term = term * 10 + 1;\n    sum += term;\n}\nSystem.out.println(sum);",
    "trace": {
      "columns": ["i", "term", "sum"],
      "rows": [
        { "cells": ["1", "1", "1"], "note": "0*10+1 = 1" },
        { "cells": ["2", "11", "12"], "note": "1*10+1 = 11" },
        { "cells": ["3", "111", "123"], "note": "11*10+1 = 111" },
        { "cells": ["4", "1111", "1234"], "note": "111*10+1 = 1111" }
      ]
    },
    "expectedOutput": "1234"
  },
  "evaluation": {
    "strategy": "exact-output",
    "expectedOutput": "1234"
  },
  "hints": [
    "Multiplying by 10 shifts every existing digit one place left in decimal, and the + 1 fills the new units place.",
    "Do not add the terms column by column mentally; follow the running sum row by row — its digits turn out to be a neat staircase."
  ],
  "explanation": {
    "concept": "digit-building recurrence (1 + 11 + 111 + ...)",
    "summary": "The terms are 1, 11, 111, 1111 and their sum is 1234, so the program prints 1234.",
    "details": "term = term * 10 + 1 is the standard recurrence for repdigits (numbers made of repeated digits). The column-wise addition gives 1 + 11 + 111 + 1111 = 1234 because the digit sums per column (1, 1+1, 1+1+1, 1+1+1+1) never carry. Here the loop bound is small; for larger counts the int sum grows fast and you would check overflow before trusting the printed total."
  },
  "rewards": { "xp": 22 },
  "version": 1
};
