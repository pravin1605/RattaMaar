export default {
  "id": "pl-alpha-005",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "alphabets",
  "levelNumber": 5,
  "title": "Centred Alphabet Pyramid Padded With Spaces",
  "difficulty": "intermediate",
  "estimatedMinutes": 4,
  "challengeType": "predict-output",
  "instructions": "Use the iteration trace table to work out the padding and the two letter loops, then choose the printed shape.",
  "content": {
    "language": "java",
    "prompt": "The padding loop runs while s < n. Which output does the program produce?",
    "code": "int n = 3;\nfor (int i = 1; i <= n; i++) {\n    for (int s = i; s < n; s++) {\n        System.out.print(\" \");\n    }\n    for (int j = 0; j < i; j++) {\n        System.out.print((char) ('A' + j));\n    }\n    for (int j = i - 2; j >= 0; j--) {\n        System.out.print((char) ('A' + j));\n    }\n    System.out.println();\n}",
    "patternRows": [
      "  A",
      " ABA",
      "ABCBA"
    ],
    "patternVariables": [
      "i=1  padding=2  up=1  down=0",
      "i=2  padding=1  up=2  down=1",
      "i=3  padding=0  up=3  down=2"
    ],
    "expectedOutput": "  A\n ABA\nABCBA",
    "trace": {
      "title": "ROW BUILD-UP",
      "subtitle": "Padding, climb loop and mirror loop per row",
      "columns": [
        "i",
        "spaces printed",
        "climb letters",
        "mirror letters",
        "row output"
      ],
      "rows": [
        {
          "cells": ["1", "2", "A", "none", "  A"],
          "note": "The mirror loop starts at i - 2 = -1, so its condition fails immediately."
        },
        {
          "cells": ["2", "1", "AB", "A", " ABA"],
          "note": "The climb stops at the row letter, and the mirror repeats the letter below it again."
        },
        {
          "cells": ["3", "0", "ABC", "BA", "ABCBA"],
          "note": "No padding on the widest row, so it touches the left margin."
        }
      ]
    },
    "choices": [
      {
        "id": "centred-pyramid",
        "label": "A centred over ABA centred over ABCBA, losing one leading space per row"
      },
      {
        "id": "plain-triangle",
        "label": "A then AB then ABC, each row flush with the left margin"
      },
      {
        "id": "repeat-rows",
        "label": "A then BBB then CCCCC, one letter repeated to fill the row"
      }
    ]
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "centred-pyramid"
  },
  "hints": [
    "Count how many times the padding loop can run when i is small and when i equals n.",
    "The mirror loop begins one letter below the letter the climb loop ended on, so the peak letter appears only once."
  ],
  "explanation": {
    "concept": "padding plus a mirrored letter run",
    "summary": "Row i prints n - i spaces, climbs A up to the row letter, then falls back down, so the peak letter appears once.",
    "details": "The climb loop covers j = 0 .. i-1 and the mirror loop covers j = i-2 .. 0; together they print 2i - 1 letters, the same odd widths as a star pyramid. Padding shrinks by one space per row because the condition is s < n with s starting at i. Spaces are printed as literal characters and nothing follows the last letter, so no row carries trailing blanks."
  },
  "rewards": {
    "xp": 22
  },
  "prerequisites": [
    "pl-alpha-004"
  ],
  "version": 1
};
