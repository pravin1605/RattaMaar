export default {
  "id": "pl-digits-004",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "digits",
  "levelNumber": 4,
  "title": "First Digit vs Last Digit of 9027",
  "difficulty": "beginner",
  "estimatedMinutes": 4,
  "challengeType": "multiple-choice",
  "instructions": "Trace both extractions and select the row that states first and last correctly.",
  "content": {
    "language": "java",
    "prompt": "last uses one modulo; first is found by dividing while the value stays >= 10. The shrinking loop is traced for n = 9027. Which option gives the final values of first and last?",
    "code": "int n = 9027;\nint last = n % 10;\nint first = n;\nwhile (first >= 10) {\n    first /= 10;\n}",
    "trace": {
      "columns": ["first at top", "first >= 10 ?", "first after"],
      "rows": [
        { "cells": ["9027", "yes", "902"] },
        { "cells": ["902", "yes", "90"] },
        { "cells": ["90", "yes", "9"] },
        { "cells": ["9", "no - loop ends", "9"] }
      ]
    },
    "choices": [
      { "id": "a", "label": "first = 9, last = 7" },
      { "id": "b", "label": "first = 7, last = 9" },
      { "id": "c", "label": "first = 0, last = 7" }
    ]
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "a"
  },
  "hints": [
    "The modulo operator looks at the units place of the untouched number, while the division loop attacks the opposite end.",
    "The loop stops the moment the working copy is a single-digit value; whatever survives there is the leading digit."
  ],
  "explanation": {
    "concept": "asymmetric access to the two ends of a number",
    "summary": "last = 9027 % 10 = 7. The divide loop walks 9027 -> 902 -> 90 -> 9 and stops since 9 < 10, so first = 9.",
    "details": "Rightmost digits are cheap (one % 10) but leftmost digits require stripping everything after them, which is exactly what repeated /= 10 does. Option c mistakes an interior digit for the leading one; the loop never inspects the 0."
  },
  "rewards": { "xp": 18 },
  "version": 1
};
