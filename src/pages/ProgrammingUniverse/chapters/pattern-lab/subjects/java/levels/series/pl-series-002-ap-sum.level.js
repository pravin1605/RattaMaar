export default {
  "id": "pl-series-002",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "series",
  "levelNumber": 2,
  "title": "Arithmetic Progression: Terms and Running Sum",
  "difficulty": "beginner",
  "estimatedMinutes": 2,
  "challengeType": "multiple-choice",
  "instructions": "Trace the loop term by term using the step table, then choose the full printed line.",
  "content": {
    "language": "java",
    "prompt": "The loop prints each AP term and finally the accumulated sum. What is the complete printed output?",
    "code": "int a = 2, d = 3, sum = 0;\nfor (int i = 1; i <= 4; i++) {\n    int term = a + (i - 1) * d;\n    sum += term;\n    System.out.print(term + \" \");\n}\nSystem.out.print(sum);",
    "trace": {
      "columns": ["i", "term", "sum"],
      "rows": [
        { "cells": ["1", "2", "2"], "note": "term = 2 + 0*3" },
        { "cells": ["2", "5", "7"], "note": "term = 2 + 1*3" },
        { "cells": ["3", "8", "15"], "note": "term = 2 + 2*3" },
        { "cells": ["4", "11", "26"], "note": "term = 2 + 3*3" }
      ]
    },
    "choices": [
      { "id": "ap-correct", "label": "2 5 8 11 26" },
      { "id": "ap-wrong-sum", "label": "2 5 8 11 15" },
      { "id": "ap-wrong-terms", "label": "2 4 6 8 20" }
    ]
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "ap-correct"
  },
  "hints": [
    "Each term adds the common difference d to the previous term; check the trace table column by column.",
    "The last number printed is not a term: it is the accumulation of every term so far."
  ],
  "explanation": {
    "concept": "arithmetic progression (AP) nth term and series sum",
    "summary": "With a = 2 and d = 3 the terms are 2, 5, 8, 11, and the loop adds them into sum, which ends at 26, so the output is 2 5 8 11 26.",
    "details": "The nth term of an AP is a + (n-1)*d, so term grows by exactly d each iteration. sum += term accumulates the series; the classic mistake is reading the second-to-last trace value as the total instead of completing the final addition. The closed form sum of the first n AP terms is n*(first + last)/2, here 4*(2+11)/2 = 26, a quick sanity check for your trace."
  },
  "rewards": { "xp": 15 },
  "version": 1
};
