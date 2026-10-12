export default {
  "id": "pl-digits-010",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "digits",
  "levelNumber": 10,
  "title": "Euclid's Engine: GCD Trace",
  "difficulty": "advanced",
  "estimatedMinutes": 5,
  "challengeType": "numeric-answer",
  "instructions": "Step through the Euclidean loop with the trace table, then report the final gcd value.",
  "content": {
    "language": "java",
    "prompt": "After the trace row shown is missing, the loop repeats until b becomes 0. What is the final gcd printed for a = 48, b = 18?",
    "code": "int a = 48, b = 18;\nwhile (b != 0) {\n    int t = b;\n    b = a % b;\n    a = t;\n}\nSystem.out.println(a);",
    "trace": {
      "columns": ["step", "a", "b", "a % b (new b)"],
      "rows": [
        { "cells": ["1", "48", "18", "12"] },
        { "cells": ["2", "18", "12", "6"] },
        { "cells": ["3", "12", "6", "0"] },
        { "cells": ["4", "6", "0", "loop ends"], "note": "when b becomes 0, a holds the answer" }
      ]
    },
    "answerLabel": "Final printed gcd"
  },
  "evaluation": { "strategy": "numeric-tolerance", "expectedNumber": 6, "tolerance": 0 },
  "hints": [
    "Each step swaps a for the previous b, and b for the remainder of the division.",
    "The loop stops the moment the remainder chain reaches 0 — the surviving a is the answer."
  ],
  "explanation": {
    "concept": "Euclidean algorithm",
    "summary": "gcd(48, 18) → gcd(18, 12) → gcd(12, 6) → gcd(6, 0) = 6: the algorithm repeatedly replaces the pair with (smaller, remainder) until the remainder vanishes.",
    "details": "Because 48 % 18 = 12, 18 % 12 = 6, and 12 % 6 = 0, the final non-zero value 6 divides both originals. This is O(log(min(a,b))) — far faster than trying every divisor."
  },
  "rewards": { "xp": 30 },
  "version": 1
};
