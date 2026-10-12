export default {
  "id": "pl-props-009",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "number-properties",
  "levelNumber": 9,
  "title": "Automorphic: Does 625 End in 25",
  "difficulty": "advanced",
  "estimatedMinutes": 5,
  "challengeType": "predict-output",
  "instructions": "Follow the digit-by-digit suffix comparison and type the exact boolean the program prints.",
  "content": {
    "language": "java",
    "prompt": "An automorphic number n has a square whose decimal form ends with n. The loop peeks at the last digit of the square and of n together, advancing both. What does the final println print for n = 25?",
    "code": "int n = 25;\nint sq = n * n;\nint t = n;\nboolean matches = true;\nwhile (t != 0) {\n    if (sq % 10 != t % 10) {\n        matches = false;\n        break;\n    }\n    sq /= 10;\n    t /= 10;\n}\nSystem.out.println(matches);",
    "trace": {
      "columns": ["t", "sq", "t % 10", "sq % 10", "compare result", "after shifts"],
      "rows": [
        { "cells": ["25", "625", "5", "5", "equal", "t = 2, sq = 62"], "note": "25 * 25 = 625" },
        { "cells": ["2", "62", "2", "2", "equal", "t = 0, sq = 6"], "note": "t reaches 0, loop ends, matches unchanged" }
      ]
    },
    "expectedOutput": "true"
  },
  "evaluation": {
    "strategy": "structured-answer",
    "acceptedAnswers": ["true"]
  },
  "hints": [
    "Compare the two rightmost digits one round at a time; the flag only flips if some pair disagrees.",
    "The loop stops when the original-number copy runs out of digits, so check whether every pairing up to that point agreed."
  ],
  "explanation": {
    "concept": "automorphic number via synchronized digit stripping",
    "summary": "625 ends in 25 because both digit pairs (5 vs 5, then 2 vs 2) agree, so matches keeps its initial value and the printed boolean is the affirmative one.",
    "details": "This algorithm walks square and input from the right in lockstep: sq /= 10 and t /= 10 shift both numbers after each agreement. Classic automorphics: 5 (25), 6 (36), 25 (625), 76 (5776). 76: 76 * 76 = 5776, pairs 6-6 and 7-7 both agree, so it passes; 24 fails immediately since 24^2 = 576 ends in 76 not 24."
  },
  "rewards": { "xp": 28 },
  "version": 1
};
