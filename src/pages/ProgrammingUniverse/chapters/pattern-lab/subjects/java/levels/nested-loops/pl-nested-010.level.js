export default {
  "id": "pl-nested-010",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "loop-tracer",
  "categoryId": "nested-loops",
  "levelNumber": 10,
  "title": "Three Loops Deep",
  "difficulty": "advanced",
  "estimatedMinutes": 6,
  "challengeType": "trace-variable",
  "instructions": "An innermost counter increments once per innermost execution. Complete the trace and enter the final printed count.",
  "content": {
    "language": "java",
    "prompt": "Enter the value printed by the last statement.",
    "code": "int prints = 0;\nfor (int i = 1; i <= 2; i++) {\n    for (int j = 1; j <= 2; j++) {\n        for (int k = 1; k <= 2; k++) {\n            prints++;\n        }\n    }\n}\nSystem.out.println(prints);",
    "trace": {
      "columns": ["outer i", "middle j", "innermost executions this pair", "running total"],
      "rows": [
        { "cells": ["1", "1", "2", "2"] },
        { "cells": ["1", "2", "2", "4"] },
        { "cells": ["2", "1", "2", "6"] },
        { "cells": ["2", "2", "2", "?"], "note": "add the pair count to the total above" }
      ]
    }
  },
  "evaluation": {
    "strategy": "blank-count",
    "expectedCount": 8
  },
  "hints": [
    "The innermost loop restarts its full range for every pair of outer and middle values.",
    "Count how many (i, j) pairs exist, then multiply by the length of the innermost loop."
  ],
  "explanation": {
    "concept": "multiplication rule for nested loop counts",
    "summary": "Two outer values times two middle values times two inner values give 2 x 2 x 2 executions, so the counter ends at 8.",
    "details": "Each trace row covers one (i, j) pair, and the innermost loop runs its full length k = 1, 2 inside every pair. The running-total column is 2, 4, 6, 8: the increments of a three-level nest multiply rather than add. Only the innermost statement touches prints, so the outer and middle loops contribute their repetition counts but never increment the accumulator themselves."
  },
  "rewards": { "xp": 32 },
  "prerequisites": ["pl-nested-009"],
  "version": 1
};
