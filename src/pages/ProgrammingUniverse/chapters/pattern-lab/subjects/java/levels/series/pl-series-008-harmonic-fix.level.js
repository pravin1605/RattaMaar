export default {
  "id": "pl-series-008",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "series",
  "levelNumber": 8,
  "title": "Harmonic Sum: The Integer Division Bug",
  "difficulty": "advanced",
  "estimatedMinutes": 4,
  "challengeType": "find-and-fix",
  "instructions": "The program should print 1 + 1/2 + 1/3 + 1/4 as a decimal sum, but it prints 1.0. Choose the fix.",
  "content": {
    "language": "java",
    "prompt": "Why does the harmonic sum stop growing after the first term, and which correction fixes it?",
    "code": "double sum = 0;\nfor (int i = 1; i <= 4; i++) {\n    sum += 1 / i;\n}\nSystem.out.println(sum);",
    "trace": {
      "columns": ["i", "1 / i as computed", "sum"],
      "rows": [
        { "cells": ["1", "1", "1.0"], "note": "1 / 1 = 1 exactly" },
        { "cells": ["2", "0", "1.0"], "note": "int division: 1 / 2 truncates to 0" },
        { "cells": ["3", "0", "1.0"], "note": "int division: 1 / 3 truncates to 0" },
        { "cells": ["4", "0", "1.0"], "note": "int division: 1 / 4 truncates to 0" }
      ]
    },
    "choices": [
      { "id": "fix-double-literal", "label": "Change the term to 1.0 / i so one operand is a double and real division happens." },
      { "id": "fix-int-sum", "label": "Declare sum as an int so the fractions are stored exactly." },
      { "id": "fix-skip-first", "label": "Start the loop at i = 2 so the first whole term is skipped." },
      { "id": "fix-more-iterations", "label": "Extend the loop to i <= 40 so small terms eventually add up." }
    ]
  },
  "evaluation": {
    "strategy": "validated-correction",
    "expectedFixId": "fix-double-literal"
  },
  "hints": [
    "Look at the types on both sides of the division before thinking about the variable that stores the total.",
    "Java decides int versus floating division from the operand types: when both operands are int, the fractional part is truncated before any widening to double can happen."
  ],
  "explanation": {
    "concept": "integer division and numeric promotion",
    "summary": "1 / i is int/int, so it truncates to 0 for every i greater than 1; writing 1.0 / i promotes the computation to double and the sum becomes 1.0 + 0.5 + 0.3333... + 0.25 = 2.0833....",
    "details": "The truncation happens at the division itself, not at the += widening, so making sum a double is useless while both operands stay int. Casting with (double) i or writing 1.0 / i are the two standard fixes; the literal 1.0 is preferred because it cannot be forgotten inside a longer expression. Declaring sum an int would truncate even harder, and more iterations of zeros are still zeros."
  },
  "rewards": { "xp": 26 },
  "version": 1
};
