export default {
  "id": "pl-props-001",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "number-properties",
  "levelNumber": 1,
  "title": "Armstrong Verdict for 153",
  "difficulty": "beginner",
  "estimatedMinutes": 3,
  "challengeType": "predict-output",
  "instructions": "Follow the trace table step by step, then type the exact value the last line prints.",
  "content": {
    "language": "java",
    "prompt": "An Armstrong number equals the sum of the cubes of its own digits. The trace shows each loop pass for n = 153. What does System.out.println(sum == original) print?",
    "code": "int n = 153;\nint original = n;\nint sum = 0;\nwhile (n != 0) {\n    int digit = n % 10;\n    sum += digit * digit * digit;\n    n /= 10;\n}\nSystem.out.println(sum == original);",
    "trace": {
      "columns": ["pass", "n at top", "digit = n % 10", "digit * digit * digit", "sum after", "n after n /= 10"],
      "rows": [
        { "cells": ["1", "153", "3", "27", "27", "15"], "note": "ones digit 3 popped first" },
        { "cells": ["2", "15", "5", "125", "152", "1"], "note": "tens digit 5 popped next" },
        { "cells": ["3", "1", "1", "1", "153", "0"], "note": "last digit popped; loop stops since n is 0" }
      ]
    },
    "expectedOutput": "true"
  },
  "evaluation": {
    "strategy": "structured-answer",
    "acceptedAnswers": ["true"]
  },
  "hints": [
    "Digits are popped from the right; cube each popped digit and keep one running accumulator.",
    "When n reaches 0 the loop ends, so compare the final accumulator against the copy taken before the loop started."
  ],
  "explanation": {
    "concept": "Armstrong (narcissistic) number test by digit popping",
    "summary": "The loop adds 3^3 + 5^3 + 1^3 = 27 + 125 + 1 = 153, so the final comparison sum == original evaluates to the boolean printed as true.",
    "details": "n % 10 always yields the current rightmost digit and n /= 10 (integer division) removes it. Because 153 equals the sum of its digit cubes, the boolean expression is satisfied. This pop-and-accumulate skeleton is the base of nearly every digit algorithm.",
    "modelAnswer": "int n = 153; int original = n; int sum = 0; while (n != 0) { int digit = n % 10; sum += digit * digit * digit; n /= 10; } System.out.println(sum == original); // true"
  },
  "rewards": { "xp": 15 },
  "version": 1
};
