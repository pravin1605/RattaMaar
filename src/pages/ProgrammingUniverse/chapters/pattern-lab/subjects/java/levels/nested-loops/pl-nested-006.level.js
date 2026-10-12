export default {
  "id": "pl-nested-006",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "loop-tracer",
  "categoryId": "nested-loops",
  "levelNumber": 6,
  "title": "Trace the Times Table",
  "difficulty": "intermediate",
  "estimatedMinutes": 4,
  "challengeType": "predict-output",
  "instructions": "Study the trace of the first outer pass, extend the same logic to the second pass, and type that printed line exactly, with single spaces between values.",
  "content": {
    "language": "java",
    "prompt": "Type line 2 of the output for this 3 x 3 table.",
    "code": "for (int i = 1; i <= 3; i++) {\n    for (int j = 1; j <= 3; j++) {\n        System.out.print(i * j + \" \");\n    }\n    System.out.println();\n}",
    "trace": {
      "columns": ["outer i", "inner j", "printed value"],
      "rows": [
        { "cells": ["1", "1", "1"] },
        { "cells": ["1", "2", "2"], "note": "product of the two counters" },
        { "cells": ["1", "3", "3"] },
        { "cells": ["1", "4", "none"], "note": "condition j <= 3 fails, line ends" }
      ]
    },
    "patternRows": [
      "1 2 3",
      "2 4 6",
      "3 6 9"
    ],
    "expectedOutput": "1 2 3\n2 4 6\n3 6 9"
  },
  "evaluation": {
    "strategy": "structured-answer",
    "acceptedAnswers": ["2 4 6"]
  },
  "hints": [
    "On the second pass the outer counter holds the next value while the inner counter replays the full range.",
    "Multiply each inner value by the fixed outer value of that pass, in printing order."
  ],
  "explanation": {
    "concept": "products of two independent counters",
    "summary": "While i stays at 2, j takes 1, 2, 3, so the printed products are 2, 4, 6 before the line break.",
    "details": "The inner loop restarts from j = 1 on every outer pass, so each line is a fresh multiplication row. The token form i * j + \" \" separates printed values with a space, and the trailing space at the line end is dropped by the visualizer. When j reaches 4 the condition j <= 3 fails, ending the row with exactly three values."
  },
  "rewards": { "xp": 22 },
  "prerequisites": ["pl-nested-005"],
  "version": 1
};
