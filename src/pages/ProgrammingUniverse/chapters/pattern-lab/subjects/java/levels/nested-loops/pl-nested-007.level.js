export default {
  "id": "pl-nested-007",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "loop-tracer",
  "categoryId": "nested-loops",
  "levelNumber": 7,
  "title": "Count What Row i Prints",
  "difficulty": "intermediate",
  "estimatedMinutes": 4,
  "challengeType": "trace-variable",
  "instructions": "The trace records the inner executions of each outer pass. Complete it and enter the final printed count.",
  "content": {
    "language": "java",
    "prompt": "Enter the value printed at the end.",
    "code": "int count = 0;\nfor (int i = 1; i <= 4; i++) {\n    for (int j = 1; j <= i; j++) {\n        count++;\n    }\n}\nSystem.out.println(count);",
    "trace": {
      "columns": ["outer i", "inner executions", "running total"],
      "rows": [
        { "cells": ["1", "1", "1"] },
        { "cells": ["2", "2", "3"] },
        { "cells": ["3", "3", "6"] },
        { "cells": ["4", "4", "?"], "note": "add this pass count to the total above" }
      ]
    }
  },
  "evaluation": {
    "strategy": "blank-count",
    "expectedCount": 10
  },
  "hints": [
    "The inner bound equals the current row index, so each pass executes one more time than the pass before.",
    "Finish the running-total column by adding each pass count to the total above it."
  ],
  "explanation": {
    "concept": "triangular iteration counts",
    "summary": "The inner loop runs 1, 2, 3, 4 times across the four outer passes, and the accumulated total ends at 10.",
    "details": "Because j is bounded by i rather than a constant, the counts form a triangle: 1 + 2 + 3 + 4. The trace's running-total column is the sequence of partial sums, and the final sum 10 is what the accumulator prints. The same triangular count underlies the left-aligned star triangles in Pattern Lab."
  },
  "rewards": { "xp": 24 },
  "prerequisites": ["pl-nested-006"],
  "version": 1
};
