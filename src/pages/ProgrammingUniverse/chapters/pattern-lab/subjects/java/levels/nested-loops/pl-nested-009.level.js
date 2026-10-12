export default {
  "id": "pl-nested-009",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "loop-tracer",
  "categoryId": "nested-loops",
  "levelNumber": 9,
  "title": "Backwards Outer, Forwards Inner",
  "difficulty": "advanced",
  "estimatedMinutes": 5,
  "challengeType": "trace-variable",
  "instructions": "The outer counter walks down while the inner bound walks up. Complete the missing trace cell and choose the star counts of the first three lines in order.",
  "content": {
    "language": "java",
    "prompt": "How many stars appear on each of the first three printed lines, in order?",
    "code": "for (int i = 5; i >= 1; i--) {\n    for (int j = 1; j <= 6 - i; j++) {\n        System.out.print(\"*\");\n    }\n    System.out.println();\n}",
    "trace": {
      "columns": ["outer i", "bound 6 - i", "inner executions"],
      "rows": [
        { "cells": ["5", "1", "1"], "note": "first outer pass" },
        { "cells": ["4", "2", "2"] },
        { "cells": ["3", "?", "?"], "note": "evaluate 6 - i, then count the inner passes" }
      ]
    },
    "choices": [
      { "id": "asc", "label": "1 star, then 2 stars, then 3 stars" },
      { "id": "desc", "label": "5 stars, then 4 stars, then 3 stars" },
      { "id": "flat", "label": "3 stars on each line" }
    ]
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "asc"
  },
  "hints": [
    "Substitute each outer value into the expression that forms the inner bound before counting executions.",
    "As the outer counter decreases by one, the value of 6 - i moves the opposite way; the inner loop length follows that bound."
  ],
  "explanation": {
    "concept": "inverse coupling of outer direction and inner bound",
    "summary": "Decrementing i makes 6 - i grow, so the inner loop prints one more star on every line: 1, 2, 3, 4, 5.",
    "details": "The first pass has i = 5, giving bound 6 - 5 = 1 and a single star. The next pass i = 4 gives bound 2, and the missing trace row resolves to bound 3 with three executions. Because the outer loop counts down to 1, the final line reaches five stars: a reversed outer direction combined with a complementary inner bound flips the usual shrinking triangle into a growing one."
  },
  "rewards": { "xp": 28 },
  "prerequisites": ["pl-nested-008"],
  "version": 1
};
