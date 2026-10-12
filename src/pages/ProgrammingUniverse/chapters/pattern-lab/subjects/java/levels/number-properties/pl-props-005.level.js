export default {
  "id": "pl-props-005",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "number-properties",
  "levelNumber": 5,
  "title": "Complete the Palindrome Check",
  "difficulty": "intermediate",
  "estimatedMinutes": 4,
  "challengeType": "code-completion",
  "instructions": "Fill the blank with the single variable name that makes the printed verdict correct for palindromic numbers.",
  "content": {
    "language": "java",
    "prompt": "The loop builds a flipped copy of the number digit by digit. Complete the comparison so that 1221 is reported as a palindrome.",
    "code": "int n = 1221;\nint original = n;\nint rev = 0;\nwhile (n != 0) {\n    int digit = n % 10;\n    rev = rev * 10 + digit;\n    n /= 10;\n}\nif (original == ____) {\n    System.out.println(\"palindrome\");\n}",
    "blanks": [
      { "placeholder": "____", "context": "if (original == ____) { System.out.println(\"palindrome\"); }" }
    ],
    "trace": {
      "columns": ["n at top", "digit = n % 10", "rev after", "n after"],
      "rows": [
        { "cells": ["1221", "1", "1", "122"], "note": "rev = 0 * 10 + 1" },
        { "cells": ["122", "2", "12", "12"], "note": "rev = 1 * 10 + 2" },
        { "cells": ["12", "2", "122", "1"], "note": "rev = 12 * 10 + 2" },
        { "cells": ["1", "1", "1221", "0"], "note": "rev = 122 * 10 + 1" }
      ]
    }
  },
  "evaluation": {
    "strategy": "fill-blanks",
    "expectedBlanks": [["rev"]]
  },
  "hints": [
    "The untouched copy taken before the loop holds the input, while the loop's accumulator holds its digit-flipped form.",
    "Compare the pristine copy against the accumulator that the while loop just finished building."
  ],
  "explanation": {
    "concept": "palindrome by numeric reversal",
    "summary": "After the loop, rev holds 1221 (the input read backwards), so the comparison must be original == rev; rev is the only variable carrying the flipped value.",
    "details": "n is destroyed by the loop (it ends at 0), which is exactly why original was saved beforehand. The build step rev = rev * 10 + digit shifts the accumulator left and appends the popped digit, reconstructing the number in reverse order."
  },
  "rewards": { "xp": 20 },
  "version": 1
};
