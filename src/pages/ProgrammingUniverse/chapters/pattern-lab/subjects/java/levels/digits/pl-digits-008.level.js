export default {
  "id": "pl-digits-008",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "digits",
  "levelNumber": 8,
  "title": "Reading a Number in Binary",
  "difficulty": "intermediate",
  "estimatedMinutes": 5,
  "challengeType": "trace-variable",
  "instructions": "Study the remainder-collection trace, then answer what the reversed binary string is.",
  "content": {
    "language": "java",
    "prompt": "The loop below collects binary digits as remainders. What final binary string does it print for n = 13?",
    "code": "int n = 13;\nString bits = \"\";\nwhile (n > 0) {\n    bits = (n % 2) + bits;\n    n /= 2;\n}\nSystem.out.println(bits);",
    "trace": {
      "columns": ["step", "n at start", "n % 2 (prepended)", "bits after step", "n after step"],
      "rows": [
        { "cells": ["1", "13", "1", "1", "6"] },
        { "cells": ["2", "6", "0", "01", "3"] },
        { "cells": ["3", "3", "1", "101", "1"], "note": "3 % 2 = 1 prepended before 01" },
        { "cells": ["4", "1", "1", "1101", "0"], "note": "loop ends when n becomes 0" }
      ]
    },
    "answerLabel": "The printed binary string"
  },
  "evaluation": { "strategy": "case-insensitive-text", "expectedText": "1101" },
  "hints": [
    "Prepending means the LAST remainder computed appears at the FRONT of the string.",
    "13 = 8 + 4 + 1, so the bit weights 8, 4, 2, 1 are 1, 1, 0, 1."
  ],
  "explanation": {
    "concept": "base conversion by repeated division",
    "summary": "Repeatedly taking n % 2 yields bits from least significant to most significant; prepending them builds the binary representation.",
    "details": "13 → remainder 1, 6 → 0, 3 → 1, 1 → 1. Reading the prepended string gives 1101, which equals 8 + 4 + 1. Appending instead would print the reversed bits."
  },
  "rewards": { "xp": 25 },
  "version": 1
};
