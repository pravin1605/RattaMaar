export default {
  "id": "pl-props-008",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "number-properties",
  "levelNumber": 8,
  "title": "Neon Number Check with a Broken Condition",
  "difficulty": "intermediate",
  "estimatedMinutes": 5,
  "challengeType": "find-and-fix",
  "instructions": "The digit-sum loop works but the verdict line never fires. Choose the fix that restores the neon test.",
  "content": {
    "language": "java",
    "prompt": "A neon number satisfies: sum of digits of (n * n) equals n. For n = 9 the trace shows the loop producing the digit sum correctly, yet the program cannot print neon. Which correction fixes it?",
    "code": "int n = 9;\nint sq = n * n;\nint sum = 0;\nwhile (sq != 0) {\n    sum += sq % 10;\n    sq /= 10;\n}\nif (sum == sq) {\n    System.out.println(\"neon\");\n}",
    "trace": {
      "columns": ["sq at top", "sq % 10", "sum after", "sq after"],
      "rows": [
        { "cells": ["81", "1", "1", "8"], "note": "9 * 9 = 81" },
        { "cells": ["8", "8", "9", "0"], "note": "loop ends with sq == 0" }
      ]
    },
    "choices": [
      { "id": "f1", "label": "Change the condition to sum == n" },
      { "id": "f2", "label": "Change the condition to sum == 0" },
      { "id": "f3", "label": "Move the statement sum += sq % 10 before the while loop" }
    ]
  },
  "evaluation": {
    "strategy": "validated-correction",
    "expectedFixId": "f1"
  },
  "hints": [
    "The popping loop destroys the variable that stored the square; ask what value that variable is guaranteed to hold when the loop exits.",
    "The definition compares the digit sum against the number the program started from, not against the leftover loop variable."
  ],
  "explanation": {
    "concept": "neon number and post-loop variable state",
    "summary": "After the loop sq is 0 (that is the exit condition), so sum == sq can never hold for a positive n. The correct comparison is sum == n: digits of 9^2 = 81 sum to 8 + 1 = 9, so neon prints.",
    "details": "For n = 1 the square is 1 and the digit sum is 1, also neon. For n = 5 the square is 25 with digit sum 2 + 5 = 7, which is not 5, so 5 is a failing candidate. The general bug class here: a loop consumes its own working variable, so you must keep a separate copy for later comparisons."
  },
  "rewards": { "xp": 24 },
  "version": 1
};
