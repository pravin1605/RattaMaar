export default {
  "id": "pl-series-006",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "series",
  "levelNumber": 6,
  "title": "Alternating Series: Order the Loop",
  "difficulty": "intermediate",
  "estimatedMinutes": 3,
  "challengeType": "code-ordering",
  "instructions": "Arrange the blocks so the program computes 1 - 2 + 3 - 4 + 5 - 6 and prints the result.",
  "content": {
    "language": "java",
    "prompt": "The blocks are shuffled. Put initialization, loop header, accumulation, sign flip, loop close and printing in a valid execution order.",
    "code": "",
    "blocks": [
      { "id": "b3", "code": "    sum += i * sign;" },
      { "id": "b1", "code": "int sum = 0, sign = 1;" },
      { "id": "b6", "code": "System.out.println(sum);" },
      { "id": "b2", "code": "for (int i = 1; i <= 6; i++) {" },
      { "id": "b5", "code": "}" },
      { "id": "b4", "code": "    sign = -sign;" }
    ],
    "trace": {
      "columns": ["i", "term (i * sign)", "sum"],
      "rows": [
        { "cells": ["1", "1", "1"] },
        { "cells": ["2", "-2", "-1"] },
        { "cells": ["3", "3", "2"] },
        { "cells": ["4", "-4", "-2"] },
        { "cells": ["5", "5", "3"] },
        { "cells": ["6", "-6", "-3"] }
      ]
    }
  },
  "evaluation": {
    "strategy": "ordered-blocks",
    "expectedOrder": ["b1", "b2", "b3", "b4", "b5", "b6"]
  },
  "hints": [
    "Variables must exist before the loop uses them, and the print belongs after the loop closes.",
    "Inside the body, the term is folded into sum while the current sign is still valid; the flip to the opposite sign happens right after that."
  ],
  "explanation": {
    "concept": "alternating-sign series and statement order",
    "summary": "The correct order is init, for-header, sum += i * sign, sign = -sign, closing brace, print; the result is -3.",
    "details": "sign starts at 1 so the first term is positive; multiplying by sign and then negating sign produces the +,-,+,- pattern. If the flip came before the accumulation, the first term would be negative and the whole series would be -1+2-3+4-5+6 = 3, the sign-inverted wrong answer. Statements after the closing brace run once, which is why println(sum) goes last, not inside the loop."
  },
  "rewards": { "xp": 20 },
  "version": 1
};
