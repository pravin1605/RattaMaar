export default {
  "id": "pl-series-010",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "series",
  "levelNumber": 10,
  "title": "Powers of Two: The Overflow Cliff",
  "difficulty": "advanced",
  "estimatedMinutes": 5,
  "challengeType": "multiple-choice",
  "instructions": "The doubling series grows fast. Trace the early passes, then choose what an int variable prints right after it reaches 1073741824.",
  "content": {
    "language": "java",
    "prompt": "The loop prints value and then doubles it. The trace shows the first six passes. Once value is 1073741824 (2^30), what appears on the very next printed line?",
    "code": "int value = 1;\nfor (int i = 1; i <= 31; i++) {\n    System.out.println(value);\n    value = value * 2;\n}",
    "trace": {
      "columns": ["pass", "printed value"],
      "rows": [
        { "cells": ["1", "1"] },
        { "cells": ["2", "2"] },
        { "cells": ["3", "4"] },
        { "cells": ["4", "8"] },
        { "cells": ["5", "16"] },
        { "cells": ["6", "32"] }
      ]
    },
    "choices": [
      { "id": "pow-negative", "label": "A negative number, because the doubled result exceeds Integer.MAX_VALUE and the bits wrap around." },
      { "id": "pow-exact", "label": "Exactly 2147483648, because an int widens to fit any result." },
      { "id": "pow-zero", "label": "0, because overflow resets the variable before the print." },
      { "id": "pow-auto-double", "label": "2147483648.0, because Java converts the expression to double automatically." }
    ]
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "pow-negative"
  },
  "hints": [
    "An int is a 32-bit two's-complement value: its largest positive number is 2^31 - 1, and 2^30 * 2 lands one step past that ceiling.",
    "Overflow neither throws an exception nor resets to zero; the result wraps to the negative end of the range."
  ],
  "explanation": {
    "concept": "int overflow in multiplicative series",
    "summary": "1073741824 * 2 = 2147483648 is larger than Integer.MAX_VALUE (2147483647), so the int wraps around and the next printed line is -2147483648.",
    "details": "Java integer arithmetic silently wraps modulo 2^32; only Math.multiplyExact throws. Powers of two illustrate the cliff cleanly: the pattern stays valid through 2^30, then the sign bit flips in and every later print is garbage. The fixes are switching value to long (safe up to 2^62) or stopping the loop earlier — the same trap that caps int factorials at 12! and long factorials at 20!."
  },
  "rewards": { "xp": 32 },
  "version": 1
};
