export default {
  "id": "pl-alpha-010",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "alphabets",
  "levelNumber": 10,
  "title": "Debug the Triangle That Prints Lowercase",
  "difficulty": "advanced",
  "estimatedMinutes": 5,
  "challengeType": "find-and-fix",
  "instructions": "The program is meant to print the uppercase rows A, AB, ABC but the output shown is wrong. Choose the fix that makes the goal true.",
  "content": {
    "language": "java",
    "prompt": "Goal: rows A / AB / ABC in capital letters. The code below prints the shape shown, which is not the goal. Which one-line change fixes it?",
    "code": "// Goal: print A / AB / ABC in uppercase\nint n = 3;\nfor (int i = 0; i < n; i++) {\n    for (int j = 0; j <= i; j++) {\n        System.out.print((char) ('a' + j));\n    }\n    System.out.println();\n}",
    "patternRows": [
      "a",
      "ab",
      "abc"
    ],
    "patternVariables": [
      "i=0  j=0",
      "i=1  j=0,1",
      "i=2  j=0,1,2"
    ],
    "expectedOutput": "a\nab\nabc",
    "choices": [
      {
        "id": "fix-base-letter",
        "label": "Change the base literal 'a' to 'A' so the offsets start from the uppercase code value"
      },
      {
        "id": "fix-drop-cast",
        "label": "Remove the (char) cast and let print choose between letter and number"
      },
      {
        "id": "fix-inner-bound",
        "label": "Change the inner condition to j < i so each row prints one letter fewer"
      },
      {
        "id": "fix-outer-start",
        "label": "Make the outer loop start at i = 1 so the row offsets line up with the letters"
      }
    ]
  },
  "evaluation": {
    "strategy": "validated-correction",
    "expectedFixId": "fix-base-letter"
  },
  "hints": [
    "The row widths are already correct, so the bug is not in a loop bound.",
    "Uppercase and lowercase letters sit in two separate contiguous blocks of character codes, and the offset is measured from whichever literal you add it to."
  ],
  "explanation": {
    "concept": "letter case is decided by the offset base",
    "summary": "The loop shape is right; only the base character literal is wrong, because 'a' + j walks through the lowercase block of character codes.",
    "details": "Changing the base to 'A' keeps every j offset identical and simply moves the whole run into the uppercase block, producing A / AB / ABC. Dropping the cast would print the arithmetic results as numbers, not letters. Tightening the inner bound or shifting the outer start would change how many letters appear per row, breaking the triangle that is already correct.",
    "modelAnswer": "int n = 3;\nfor (int i = 0; i < n; i++) {\n    for (int j = 0; j <= i; j++) {\n        System.out.print((char) ('A' + j));\n    }\n    System.out.println();\n}"
  },
  "rewards": {
    "xp": 32
  },
  "prerequisites": [
    "pl-alpha-009"
  ],
  "version": 1
};
