export default {
  "id": "pl-pyr-004",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "pyramids",
  "levelNumber": 4,
  "title": "Centred Number Pyramid With Double Padding",
  "difficulty": "intermediate",
  "estimatedMinutes": 4,
  "challengeType": "predict-output",
  "instructions": "The trace table records the padding and digit runs row by row. Use it to judge how the rows line up.",
  "content": {
    "language": "java",
    "prompt": "The padding loop prints two spaces on each trip. How are the rows aligned in the output?",
    "code": "int n = 4;\nfor (int i = 1; i <= n; i++) {\n    for (int s = i; s < n; s++) System.out.print(\"  \");\n    for (int j = 1; j <= i; j++) { if (j > 1) System.out.print(\" \"); System.out.print(j); }\n    for (int j = i - 1; j >= 1; j--) { System.out.print(\" \"); System.out.print(j); }\n    System.out.println();\n}",
    "patternRows": [
      "      1",
      "    1 2 1",
      "  1 2 3 2 1",
      "1 2 3 4 3 2 1"
    ],
    "patternVariables": [
      "i=1  spaces=6",
      "i=2  spaces=4",
      "i=3  spaces=2",
      "i=4  spaces=0"
    ],
    "expectedOutput": "      1\n    1 2 1\n  1 2 3 2 1\n1 2 3 4 3 2 1",
    "trace": {
      "title": "PADDING AND DIGITS",
      "subtitle": "One entry per printed row",
      "columns": [
        "i",
        "leading spaces",
        "climb digits",
        "fall digits",
        "row output"
      ],
      "rows": [
        {
          "cells": ["1", "6", "1", "none", "      1"],
          "note": "Three padding trips at two spaces each produce the deepest indent."
        },
        {
          "cells": ["2", "4", "1 2", "1", "    1 2 1"],
          "note": "The space before a digit comes from the separator test, not from the padding loop."
        },
        {
          "cells": ["3", "2", "1 2 3", "2 1", "  1 2 3 2 1"],
          "note": "Indent halves as the row gains digits."
        },
        {
          "cells": ["4", "0", "1 2 3 4", "3 2 1", "1 2 3 4 3 2 1"],
          "note": "The padding condition fails at once, so the base row is flush left."
        }
      ]
    },
    "choices": [
      {
        "id": "pad-two",
        "label": "Every row that is one digit shorter starts two spaces further right, so only the widest row is flush left"
      },
      {
        "id": "pad-one",
        "label": "Every shorter row starts one space further right, exactly like the plain star pyramid"
      },
      {
        "id": "pad-after",
        "label": "The spaces are printed after the digits, so all rows begin at the left margin"
      },
      {
        "id": "no-pad",
        "label": "The padding loop never runs, so the digits stack as a left-aligned triangle"
      }
    ]
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "pad-two"
  },
  "hints": [
    "Count how many trips the padding loop makes and how many characters each trip writes.",
    "Separators are written before a token rather than after it, which is what keeps the row ends clean."
  ],
  "explanation": {
    "concept": "padding sized to the digit columns",
    "summary": "Because digits are separated by a space, each missing row must add two leading spaces to stay centred.",
    "details": "Row i prints (n - i) trips of two spaces, so indents go 6, 4, 2, 0 while the digit run grows from 1 to 7 characters including separators. Printing the separator before each token except the first prevents trailing blanks, and the fall loop starts at i - 1 so the peak digit 4 is written once."
  },
  "rewards": {
    "xp": 24
  },
  "prerequisites": [
    "pl-pyr-003"
  ],
  "version": 1
};
