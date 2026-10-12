export default {
  "id": "pl-props-003",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "number-properties",
  "levelNumber": 3,
  "title": "How Many Divisor Attempts for 25",
  "difficulty": "beginner",
  "estimatedMinutes": 4,
  "challengeType": "numeric-answer",
  "instructions": "Count how many times the loop body is entered before the break, using the trace table.",
  "content": {
    "language": "java",
    "prompt": "The primality test tries divisors i = 2, 3, ... only while i * i <= n. For n = 25 the trace is shown. How many times is the loop body entered before execution leaves the loop?",
    "code": "int n = 25;\nboolean isPrime = true;\nfor (int i = 2; i * i <= n; i++) {\n    if (n % i == 0) {\n        isPrime = false;\n        break;\n    }\n}",
    "trace": {
      "columns": ["i", "i * i <= 25 ?", "25 % i", "action"],
      "rows": [
        { "cells": ["2", "true (4 <= 25)", "1", "not a divisor, keep going"], "note": "" },
        { "cells": ["3", "true (9 <= 25)", "1", "not a divisor, keep going"] },
        { "cells": ["4", "true (16 <= 25)", "1", "not a divisor, keep going"] },
        { "cells": ["5", "true (25 <= 25)", "0", "divisor found, break"] }
      ]
    }
  },
  "evaluation": {
    "strategy": "blank-count",
    "expectedCount": 4
  },
  "hints": [
    "One factor pair of 25 is 5 x 5, and the guard i * i <= n still allows the square root itself as a candidate.",
    "Count one row of the table per body entry; the final row leaves through the early exit instead of the loop condition."
  ],
  "explanation": {
    "concept": "trial division up to sqrt(n)",
    "summary": "The body runs for i = 2, 3, 4, 5, so four entries. At i = 5 the remainder 25 % 5 is 0, isPrime is set to false and break stops the search.",
    "details": "If n had a factor larger than its square root, the matching partner factor would be smaller than the square root and would already have been found. That is why i * i <= n (avoiding Math.sqrt) is a complete and safe bound. 25 is not prime."
  },
  "rewards": { "xp": 18 },
  "version": 1
};
