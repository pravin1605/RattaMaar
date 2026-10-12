export default {
  "id": "pl-nested-003",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "loop-tracer",
  "categoryId": "nested-loops",
  "levelNumber": 3,
  "title": "Three Loops, One Variable",
  "difficulty": "beginner",
  "estimatedMinutes": 3,
  "challengeType": "trace-variable",
  "instructions": "Read the trace table, finish the arithmetic, and choose the printed value.",
  "content": {
    "language": "java",
    "prompt": "What does the program print?",
    "code": "int x = 0;\nfor (int i = 1; i <= 3; i++) {\n    x++;\n}\nfor (int i = 1; i <= 2; i++) {\n    for (int j = 1; j <= 3; j++) {\n        x++;\n    }\n}\nfor (int i = 1; i <= 4; i++) {\n    x -= 2;\n}\nSystem.out.println(x);",
    "trace": {
      "columns": ["stage", "executions run", "x after stage"],
      "rows": [
        { "cells": ["start", "0", "0"] },
        { "cells": ["loop A: x++", "3", "3"], "note": "single loop, three passes" },
        { "cells": ["loop B: x++ nested", "6", "9"], "note": "2 outer passes times 3 inner passes" },
        { "cells": ["loop C: x -= 2", "4", "1"], "note": "four passes subtract two each" }
      ]
    },
    "choices": [
      { "id": "one", "label": "1" },
      { "id": "nine", "label": "9" },
      { "id": "five", "label": "5" }
    ]
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "one"
  },
  "hints": [
    "The three loops are sequential, not nested together: finish one stage before starting the next.",
    "Count how many times each loop body executes, then apply additions and subtractions to x in stage order."
  ],
  "explanation": {
    "concept": "sequential loops sharing an accumulator",
    "summary": "x gains 3 in loop A, gains 6 in the nested loop B, then loses 8 in loop C, ending at 1.",
    "details": "Loop A executes x++ three times. Loop B multiplies 2 outer by 3 inner executions for six more increments, taking x to 9. Loop C runs four times but subtracts 2 each pass, removing 8 in total. Reading the trace column by column keeps the stages from bleeding into each other."
  },
  "rewards": { "xp": 16 },
  "prerequisites": ["pl-nested-002"],
  "version": 1
};
