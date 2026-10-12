export default {
  "id": "pl-props-006",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "number-properties",
  "levelNumber": 6,
  "title": "Perfect Number 28: Final Divisor Sum",
  "difficulty": "intermediate",
  "estimatedMinutes": 4,
  "challengeType": "predict-output",
  "instructions": "Continue the traced loop past i = 7 up to i = n / 2 and type the value printed at the end.",
  "content": {
    "language": "java",
    "prompt": "The loop adds every proper divisor of n (candidates 1 through n / 2). The first seven passes are traced for n = 28. Predict the exact number printed after the loop finishes.",
    "code": "int n = 28;\nint sum = 0;\nfor (int i = 1; i <= n / 2; i++) {\n    if (n % i == 0) {\n        sum += i;\n    }\n}\nSystem.out.println(sum);",
    "trace": {
      "columns": ["i", "28 % i == 0 ?", "sum after"],
      "rows": [
        { "cells": ["1", "yes", "1"] },
        { "cells": ["2", "yes", "3"] },
        { "cells": ["3", "no", "3"] },
        { "cells": ["4", "yes", "7"] },
        { "cells": ["5", "no", "7"] },
        { "cells": ["6", "no", "7"] },
        { "cells": ["7", "yes", "14"], "note": "passes i = 8..13 add nothing; 14 is the last divisor <= 28/2" }
      ]
    },
    "expectedOutput": "28"
  },
  "evaluation": {
    "strategy": "structured-answer",
    "acceptedAnswers": ["28"]
  },
  "hints": [
    "Divisors come in pairs: since 1 x 28 is excluded (proper divisors only), each pair below the half appears once, and the partner of 2 is the largest candidate left.",
    "Keep adding every i that divides exactly from 8 through 28 / 2; exactly one more qualifying i remains after i = 7."
  ],
  "explanation": {
    "concept": "perfect number via proper-divisor sum",
    "summary": "Proper divisors of 28 are 1, 2, 4, 7 and 14; the traced sum 14 gains one final addend 14 (since 28 % 14 == 0 and 14 <= 28/2), so the printed total is 1 + 2 + 4 + 7 + 14 = 28.",
    "details": "A number equal to the sum of its proper divisors is called perfect (6, 28, 496, ...). The bound n / 2 works because no proper divisor can exceed half of n, and the loop's condition i <= n / 2 is evaluated for every integer in that range even when most are skipped."
  },
  "rewards": { "xp": 22 },
  "version": 1
};
