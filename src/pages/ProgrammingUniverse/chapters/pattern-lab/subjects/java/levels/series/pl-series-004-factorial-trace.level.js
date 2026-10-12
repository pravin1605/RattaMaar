export default {
  "id": "pl-series-004",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "series",
  "levelNumber": 4,
  "title": "Factorial Loop Trace",
  "difficulty": "beginner",
  "estimatedMinutes": 2,
  "challengeType": "numeric-answer",
  "instructions": "Follow the accumulator table and enter the number printed at the end.",
  "content": {
    "language": "java",
    "prompt": "What number does this loop print? Enter it as an integer.",
    "code": "int fact = 1;\nfor (int i = 1; i <= 5; i++) {\n    fact = fact * i;\n}\nSystem.out.println(fact);",
    "trace": {
      "columns": ["i", "fact after fact * i"],
      "rows": [
        { "cells": ["1", "1"] },
        { "cells": ["2", "2"] },
        { "cells": ["3", "6"] },
        { "cells": ["4", "24"] },
        { "cells": ["5", "120"] }
      ]
    }
  },
  "evaluation": {
    "strategy": "numeric-tolerance",
    "expectedNumber": 120,
    "tolerance": 0
  },
  "hints": [
    "The accumulator starts at 1 because multiplying by 0 would erase the whole product.",
    "Multiply the running product by i on each pass; the growth is much faster than an additive series, so keep the loop bound small."
  ],
  "explanation": {
    "concept": "factorial as a multiplicative accumulator",
    "summary": "The loop computes 5! = 1*2*3*4*5 = 120.",
    "details": "fact = fact * i folds each new multiplier into the accumulator, producing 1, 2, 6, 24, 120. Factorial is the standard overflow trap: 12! fits in int but 13! = 6227020800 exceeds Integer.MAX_VALUE (about 2.1 billion), so an int factorial loop silently prints a wrong value from 13 upward. Keeping the loop small (as here) or switching to long avoids the wrap."
  },
  "rewards": { "xp": 16 },
  "version": 1
};
