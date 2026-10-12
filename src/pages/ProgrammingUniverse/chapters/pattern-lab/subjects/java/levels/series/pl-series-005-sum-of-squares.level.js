export default {
  "id": "pl-series-005",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "series",
  "levelNumber": 5,
  "title": "Sum of Squares: Complete the Term",
  "difficulty": "intermediate",
  "estimatedMinutes": 3,
  "challengeType": "code-completion",
  "instructions": "Fill the blank so the loop accumulates 1^2 + 2^2 + 3^2 + 4^2.",
  "content": {
    "language": "java",
    "prompt": "The trace table shows the expected running totals. Which expression completes the accumulation line?",
    "code": "int sum = 0;\nfor (int i = 1; i <= 4; i++) {\n    sum += ____;\n}\nSystem.out.println(sum);",
    "trace": {
      "columns": ["i", "term added", "sum"],
      "rows": [
        { "cells": ["1", "1", "1"] },
        { "cells": ["2", "4", "5"] },
        { "cells": ["3", "9", "14"] },
        { "cells": ["4", "16", "30"] }
      ]
    },
    "blanks": [
      { "placeholder": "____", "context": "sum += ____;" }
    ]
  },
  "evaluation": {
    "strategy": "fill-blanks",
    "expectedBlanks": [["i * i", "i*i"]]
  },
  "hints": [
    "Compare the term-added column with i: name the operation that turns 1, 2, 3, 4 into 1, 4, 9, 16.",
    "Writing i * 2 would give even numbers, but the target totals grow faster; check which expression makes the third term 9."
  ],
  "explanation": {
    "concept": "sum of squares series",
    "summary": "The blank is i * i: the loop adds 1, 4, 9, 16 and prints 30.",
    "details": "The squared term of position i is i*i. Reading the trace backwards, the differences between consecutive sums are 1, 4, 9, 16 — the squares themselves. A common wrong completion is i * 2, which gives linear growth (2, 4, 6, 8) instead of squares. Java has no ** power operator, so i * i is the idiomatic way to write the squared term. The closed form n(n+1)(2n+1)/6 for 1^2+...+n^2 gives 4*5*9/6 = 30, matching the trace."
  },
  "rewards": { "xp": 18 },
  "version": 1
};
