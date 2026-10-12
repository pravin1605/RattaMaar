export default {
  "id": "pl-digits-003",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "digits",
  "levelNumber": 3,
  "title": "Reverse 1234: Predict the Final Accumulator",
  "difficulty": "beginner",
  "estimatedMinutes": 4,
  "challengeType": "trace-variable",
  "instructions": "The trace stops one pass early. Work out the final pass and answer with the value of rev when the loop ends.",
  "content": {
    "language": "java",
    "prompt": "The shift-and-append rule rev = rev * 10 + digit rebuilds n backwards. Three of the four passes are traced for n = 1234. What is rev when the loop terminates?",
    "code": "int n = 1234;\nint rev = 0;\nwhile (n != 0) {\n    int digit = n % 10;\n    rev = rev * 10 + digit;\n    n /= 10;\n}",
    "trace": {
      "columns": ["n at top", "digit", "rev after", "n after"],
      "rows": [
        { "cells": ["1234", "4", "4", "123"], "note": "rev = 0 * 10 + 4" },
        { "cells": ["123", "3", "43", "12"], "note": "rev = 4 * 10 + 3" },
        { "cells": ["12", "2", "432", "1"], "note": "rev = 43 * 10 + 2" }
      ]
    }
  },
  "evaluation": {
    "strategy": "numeric-tolerance",
    "expectedNumber": 4321,
    "tolerance": 0
  },
  "hints": [
    "One pass is missing: the copy of n still holds a single digit that has not been appended yet.",
    "Apply the shift-and-append rule one more time to the last traced accumulator value using the lone remaining digit."
  ],
  "explanation": {
    "concept": "number reversal via place shifting",
    "summary": "The fourth pass pops digit 1: rev = 432 * 10 + 1 = 4321, and n becomes 0, so the loop ends with rev = 4321, the reverse of 1234.",
    "details": "Multiplying the accumulator by 10 frees the units slot for the newly popped digit, which is why reversal works without strings. Contrast with sum loops where no shifting happens. Note that reversing a number ending in 0 loses those zeros (1200 reverses to 21), a subtlety used in a later level."
  },
  "rewards": { "xp": 18 },
  "version": 1
};
