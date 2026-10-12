export default {
  "id": "pl-digits-001",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "digits",
  "levelNumber": 1,
  "title": "Digit Sum of 456",
  "difficulty": "beginner",
  "estimatedMinutes": 3,
  "challengeType": "predict-output",
  "instructions": "Read the trace table, then type the number printed when the loop ends.",
  "content": {
    "language": "java",
    "prompt": "The classic pop-and-add loop processes n = 456. The full execution is traced. What exact number does the program print?",
    "code": "int n = 456;\nint sum = 0;\nwhile (n != 0) {\n    int digit = n % 10;\n    sum += digit;\n    n /= 10;\n}\nSystem.out.println(sum);",
    "trace": {
      "columns": ["n at top", "digit = n % 10", "sum after", "n after n /= 10"],
      "rows": [
        { "cells": ["456", "6", "6", "45"] },
        { "cells": ["45", "5", "11", "4"] },
        { "cells": ["4", "4", "15", "0"], "note": "loop ends because n became 0" }
      ]
    },
    "expectedOutput": "15"
  },
  "evaluation": {
    "strategy": "structured-answer",
    "acceptedAnswers": ["15"]
  },
  "hints": [
    "Each pass strips the rightmost digit off n and adds it to one running total.",
    "Add the three popped digits in the order the table shows and report the last value of the accumulator."
  ],
  "explanation": {
    "concept": "digit-sum loop (modulo-10 / divide-10 pair)",
    "summary": "The loop pops 6, then 5, then 4, so sum accumulates 6 + 5 + 4 = 15, which is printed after n is reduced to 0.",
    "details": "n % 10 isolates the units digit and integer division n /= 10 discards it. Three digits mean three passes; the guard n != 0 stops exactly when no digits remain. Digit order does not affect a sum."
  },
  "rewards": { "xp": 15 },
  "version": 1
};
