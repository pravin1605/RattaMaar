export default {
  "id": "pl-props-007",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "number-properties",
  "levelNumber": 7,
  "title": "Strong Number 145: Finish the Factorial Sum",
  "difficulty": "intermediate",
  "estimatedMinutes": 5,
  "challengeType": "numeric-answer",
  "instructions": "Extend the partial trace by hand to the final pass and report the value of sum when the outer loop ends.",
  "content": {
    "language": "java",
    "prompt": "A strong number equals the sum of the factorials of its digits. The outer loop pops digits from the right and an inner loop computes digit!. Two passes are traced for m = 145. What is sum when the outer loop terminates?",
    "code": "int m = 145;\nint sum = 0;\nwhile (m != 0) {\n    int digit = m % 10;\n    int fact = 1;\n    for (int k = 2; k <= digit; k++) {\n        fact *= k;\n    }\n    sum += fact;\n    m /= 10;\n}",
    "trace": {
      "columns": ["m at top", "digit", "inner loop for k", "fact = digit!", "sum after", "m after"],
      "rows": [
        { "cells": ["145", "5", "2,3,4,5", "120", "120", "14"], "note": "5! = 120" },
        { "cells": ["14", "4", "2,3,4", "24", "144", "1"], "note": "4! = 24" }
      ]
    }
  },
  "evaluation": {
    "strategy": "numeric-tolerance",
    "expectedNumber": 145,
    "tolerance": 0
  },
  "hints": [
    "One digit is still waiting to be popped; the inner loop for that digit never multiplies anything.",
    "Add the final factorial, which equals 1, to the partially accumulated total shown in the trace."
  ],
  "explanation": {
    "concept": "strong number with nested factorial loop",
    "summary": "The third pass pops digit 1: the inner loop body never runs (k starts at 2 which is already greater than 1), so fact stays 1 and sum becomes 144 + 1 = 145. Because that equals the original number, 145 is strong.",
    "details": "1! = 1 by definition of the empty product inside the loop. Compare with 154: 1! + 5! + 4! = 1 + 120 + 24 = 145, which is not 154 - the same digits in a different order do not matter here because the sum is order-free; the failing verdict simply differs from the input. 1, 2 and 145 are the classic strong numbers."
  },
  "rewards": { "xp": 24 },
  "version": 1
};
