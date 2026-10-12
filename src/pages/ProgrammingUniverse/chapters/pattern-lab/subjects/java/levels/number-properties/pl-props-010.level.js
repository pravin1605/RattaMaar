export default {
  "id": "pl-props-010",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "number-properties",
  "levelNumber": 10,
  "title": "Spy Number 132: Repair the Multiplier Line",
  "difficulty": "advanced",
  "estimatedMinutes": 6,
  "challengeType": "code-completion",
  "instructions": "Type the exact variable name that must be read on the right-hand side of the update line to keep the running multiplication alive.",
  "content": {
    "language": "java",
    "prompt": "A spy number has equal digit sum and digit product (132: 1+3+2 = 6 and 1*3*2 = 6). The sum accumulator uses += but the product line has a hole: which single variable belongs in the blank so the product accumulates across passes?",
    "code": "int n = 132;\nint sum = 0;\nint product = 1;\nwhile (n != 0) {\n    int digit = n % 10;\n    sum += digit;\n    product = ____ * digit;\n    n /= 10;\n}",
    "trace": {
      "columns": ["n at top", "digit", "sum after", "product after", "n after"],
      "rows": [
        { "cells": ["132", "2", "2", "2", "13"], "note": "product = 1 * 2" },
        { "cells": ["13", "3", "5", "6", "1"], "note": "product = previous 2 * 3" },
        { "cells": ["1", "1", "6", "6", "0"], "note": "product = previous 6 * 1; sum equals product" }
      ]
    }
  },
  "evaluation": {
    "strategy": "structured-answer",
    "acceptedAnswers": ["product"]
  },
  "hints": [
    "Unlike the additive accumulator, the multiplying line reassigns from scratch, so it must fold the previous accumulated result into the new value.",
    "Read the trace: each row's product uses the prior row's product times the popped digit; name the variable holding that prior result."
  ],
  "explanation": {
    "concept": "running product accumulator for spy numbers",
    "summary": "The blank must be product itself: product = product * digit carries the running multiplication forward, exactly like sum += digit carries the addition. Without reading its own old value, the accumulator would reset every pass.",
    "details": "product starts at 1 because 1 is the multiplicative identity; starting at 0 would poison the whole run. 132 is spy (6 == 6), and so are 1124 (1+1+2+4 = 8 and 1*1*2*4 = 8) and 123 (sum 6, product 6). A failing example: 456 has digit sum 15 but digit product 120, so the two never meet."
  },
  "rewards": { "xp": 30 },
  "version": 1
};
