export default {
  "id": "pl-digits-002",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "digits",
  "levelNumber": 2,
  "title": "Count the Digits of 70384",
  "difficulty": "beginner",
  "estimatedMinutes": 3,
  "challengeType": "numeric-answer",
  "instructions": "Use the trace to count how many times the loop body actually executes, and answer with that integer.",
  "content": {
    "language": "java",
    "prompt": "This loop counts digits by repeatedly shrinking n. The table shows every pass for n = 70384. How many times does the loop body execute?",
    "code": "int n = 70384;\nint count = 0;\nwhile (n != 0) {\n    count++;\n    n /= 10;\n}",
    "trace": {
      "columns": ["n at top", "count after", "n after n /= 10"],
      "rows": [
        { "cells": ["70384", "1", "7038"] },
        { "cells": ["7038", "2", "703"] },
        { "cells": ["703", "3", "70"] },
        { "cells": ["70", "4", "7"] },
        { "cells": ["7", "5", "0"], "note": "the zero digit was already counted when it was stripped" }
      ]
    }
  },
  "evaluation": {
    "strategy": "blank-count",
    "expectedCount": 5
  },
  "hints": [
    "One body pass removes exactly one decimal place, so passes and digits match one to one.",
    "Count the rows of the table: each row is a completed body execution."
  ],
  "explanation": {
    "concept": "digit counting by repeated division",
    "summary": "The body runs once per decimal place stripped: 70384 has five digits, and the trace has five passes ending with n = 0 and count = 5.",
    "details": "Trailing zeros do not reduce the count here because each /= 10 still corresponds to one printed digit of the original number. An internal zero like the 0 in 70384 is consumed like any other digit. Beware the edge case n = 0: this loop counts it as zero digits, so a do-while version is used when 0 must count as one digit."
  },
  "rewards": { "xp": 16 },
  "version": 1
};
