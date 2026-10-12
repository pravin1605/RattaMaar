export default {
  "id": "pl-digits-005",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "digits",
  "levelNumber": 5,
  "title": "Extract the Hundreds Digit of 48293",
  "difficulty": "intermediate",
  "estimatedMinutes": 4,
  "challengeType": "code-completion",
  "instructions": "Fill the blank with the integer divisor that positions n so that % 10 reveals the hundreds place.",
  "content": {
    "language": "java",
    "prompt": "To grab the digit at the hundreds place, first delete the two lower places with integer division, then take the units digit. Complete the missing divisor in (n / ____) % 10.",
    "code": "int n = 48293;\nint hundreds = (n / ____) % 10;",
    "blanks": [
      { "placeholder": "____", "context": "int hundreds = (n / ____) % 10;" }
    ],
    "trace": {
      "columns": ["step", "expression", "value", "why"],
      "rows": [
        { "cells": ["1", "48293 / divisor (integer division)", "482", "the last two places 9 and 3 are truncated away"] },
        { "cells": ["2", "482 % 10", "2", "the surviving units digit is the original hundreds digit"] }
      ]
    }
  },
  "evaluation": {
    "strategy": "fill-blanks",
    "expectedBlanks": [["100"]]
  },
  "hints": [
    "Each decimal place costs one factor of ten; skipping the two places to the right of the target needs a divisor with two zeros.",
    "The trace shows 48293 was truncated to 482, which equals the original without its final two digits."
  ],
  "explanation": {
    "concept": "positional digit extraction",
    "summary": "Dividing by 100 truncates the tens and units places (48293 / 100 = 482), and 482 % 10 = 2, which is exactly the hundreds digit of 48293.",
    "details": "General rule: the digit at place value 10^k is (n / 10^k) % 10. Java integer division truncates toward zero for positive operands, so no casting or Math functions are needed. Here the hundreds place is 10^2 = 100."
  },
  "rewards": { "xp": 20 },
  "version": 1
};
