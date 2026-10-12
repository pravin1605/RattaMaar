export default {
  "id": "pl-series-009",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "series",
  "levelNumber": 9,
  "title": "Fibonacci Shift: Predict the Next Trace Row",
  "difficulty": "advanced",
  "estimatedMinutes": 5,
  "challengeType": "trace-variable",
  "instructions": "The trace stops after six passes. Reason one more iteration forward and choose the value of b after pass 7.",
  "content": {
    "language": "java",
    "prompt": "After six iterations the pair (a, b) is (8, 13), generating the series 0 1 1 2 3 5 8 13. What does b become after the seventh iteration?",
    "code": "int a = 0, b = 1;\nfor (int i = 1; i <= 7; i++) {\n    int next = a + b;\n    a = b;\n    b = next;\n}\nSystem.out.println(b);",
    "trace": {
      "columns": ["pass", "next = a + b", "a after shift", "b after shift"],
      "rows": [
        { "cells": ["1", "1", "1", "1"] },
        { "cells": ["2", "2", "1", "2"] },
        { "cells": ["3", "3", "2", "3"] },
        { "cells": ["4", "5", "3", "5"] },
        { "cells": ["5", "8", "5", "8"] },
        { "cells": ["6", "13", "8", "13"] }
      ]
    },
    "choices": [
      { "id": "fib-21", "label": "21" },
      { "id": "fib-18", "label": "18" },
      { "id": "fib-26", "label": "26" },
      { "id": "fib-13", "label": "13" }
    ]
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "fib-21"
  },
  "hints": [
    "In each pass the old b slides into a and the freshly computed sum slides into b; nothing else changes the pair.",
    "Read the last two b values from the trace and apply the same rule the loop follows on pass 7."
  ],
  "explanation": {
    "concept": "Fibonacci two-variable shift update",
    "summary": "On pass 7, next = 8 + 13 = 21, a becomes 13 and b becomes 21, so the program's seventh value is 21.",
    "details": "The idiom next = a + b; a = b; b = next rotates a sliding window of two consecutive Fibonacci numbers. Order matters: assigning a before computing next would double the wrong operand. After k passes, b holds the (k+1)-th Fibonacci number with F(0)=0, F(1)=1; here that is F(8) = 21. Distractors: 18 comes from adding 5 + 13 instead of the two most recent values, and 26 from doubling 13."
  },
  "rewards": { "xp": 30 },
  "version": 1
};
