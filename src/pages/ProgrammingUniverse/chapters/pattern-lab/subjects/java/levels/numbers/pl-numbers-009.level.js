export default {
  "id": "pl-numbers-009",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "numbers",
  "levelNumber": 9,
  "title": "Trace the Column Counter Triangle",
  "difficulty": "advanced",
  "estimatedMinutes": 4,
  "challengeType": "trace-variable",
  "instructions": "Use the step table to follow i and j through every inner iteration, then type the exact output.",
  "content": {
    "language": "java",
    "prompt": "Type the full output produced by the traced loops:",
    "code": "for (int i = 1; i <= 3; i++) {\n    for (int j = 1; j <= i; j++) {\n        System.out.print(j + \" \");\n    }\n    System.out.println();\n}",
    "trace": {
      "columns": [
        "i",
        "j",
        "row text so far"
      ],
      "rows": [
        {
          "cells": ["1", "1", "1"],
          "note": "row 1: single print, then line break"
        },
        {
          "cells": ["2", "1", "1"]
        },
        {
          "cells": ["2", "2", "1 2"],
          "note": "row 2 finished by println"
        },
        {
          "cells": ["3", "1", "1"]
        },
        {
          "cells": ["3", "2", "1 2"]
        },
        {
          "cells": ["3", "3", "1 2 3"],
          "note": "row 3 finished by println"
        }
      ]
    },
    "patternRows": [
      "1",
      "1 2",
      "1 2 3"
    ],
    "expectedOutput": "1\n1 2\n1 2 3"
  },
  "evaluation": {
    "strategy": "structured-answer",
    "acceptedAnswers": [
      "1\n1 2\n1 2 3"
    ]
  },
  "hints": [
    "j restarts at 1 every time a new row begins, so each row shows the same leading digits again.",
    "The inner bound grows with i, so row length increases while the printed values stay in column order."
  ],
  "explanation": {
    "concept": "column-numbered triangle",
    "summary": "Since print uses j, not i, every row walks its counter from 1 up to i, giving 1, then 1 2, then 1 2 3.",
    "details": "The trace shows j resetting to 1 at each new outer iteration - this is what separates column numbering from Floyd's triangle, where one shared counter keeps climbing. The trailing space after the last value of each row is invisible in the output."
  },
  "rewards": {
    "xp": 26
  },
  "version": 1
};
