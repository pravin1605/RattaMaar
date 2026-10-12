export default {
  "id": "pl-series-003",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "series",
  "levelNumber": 3,
  "title": "Geometric Series: Halving Terms",
  "difficulty": "beginner",
  "estimatedMinutes": 2,
  "challengeType": "numeric-answer",
  "instructions": "Use the trace table to follow how each term is produced, then type the fourth printed value.",
  "content": {
    "language": "java",
    "prompt": "The loop prints the first four terms of a geometric series. Type the fourth term exactly as Java prints it.",
    "code": "double term = 0.5;\nfor (int i = 1; i <= 4; i++) {\n    System.out.print(term + \" \");\n    term = term / 2;\n}",
    "trace": {
      "columns": ["i", "printed term", "term after halving"],
      "rows": [
        { "cells": ["1", "0.5", "0.25"] },
        { "cells": ["2", "0.25", "0.125"] },
        { "cells": ["3", "0.125", "0.0625"] },
        { "cells": ["4", "0.0625", "0.03125"] }
      ]
    }
  },
  "evaluation": {
    "strategy": "structured-answer",
    "acceptedAnswers": ["0.0625"]
  },
  "hints": [
    "Each printed value is the previous one divided by 2; the term printed in an iteration is the value BEFORE it is halved again.",
    "Work with a double variable: dividing 0.125 by 2 keeps the fraction, while an int division would silently drop it to zero."
  ],
  "explanation": {
    "concept": "geometric progression (GP) with a ratio of 1/2",
    "summary": "The terms are 0.5, 0.25, 0.125, 0.0625: each printed value is term/2 of the next, so the fourth term is 0.0625.",
    "details": "A GP multiplies (here divides) by a constant ratio each step. Because term is declared double, Java keeps the fractional bits. If term had been an int holding 1 and the loop computed 1/2, integer division would give 0 and every later print would be 0 — a classic double-vs-int casting trap. Powers of 2 in the denominator (1/2, 1/4, 1/8, 1/16) also print exactly in binary floating point, so 0.0625 prints without rounding noise."
  },
  "rewards": { "xp": 16 },
  "version": 1
};
