export default {
  "id": "pl-pyr-010",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "pyramids",
  "levelNumber": 10,
  "title": "Build the Pyramid From the n - i Padding Rule",
  "difficulty": "advanced",
  "estimatedMinutes": 5,
  "challengeType": "fill-blanks",
  "instructions": "Complete both blanks: the bound that makes the indent shrink by one each row, and the call that finishes a row.",
  "content": {
    "language": "java",
    "prompt": "Fill in the two missing pieces so the output below is produced.",
    "code": "int n = 5;\nfor (int i = 1; i <= n; i++) {\n    for (int s = 1; s <= ____; s++) System.out.print(\" \");\n    for (int j = 1; j <= 2 * i - 1; j++) System.out.print(\"*\");\n    ____;\n}",
    "blanks": [
      {
        "placeholder": "padding bound",
        "context": "for (int s = 1; s <= ____; s++) System.out.print(\" \");"
      },
      {
        "placeholder": "statement that ends the row",
        "context": "____;   // written once per row, after the star loop"
      }
    ],
    "patternRows": [
      "    *",
      "   ***",
      "  *****",
      " *******",
      "*********"
    ],
    "patternVariables": [
      "i=1  spaces=4  stars=1",
      "i=2  spaces=3  stars=3",
      "i=3  spaces=2  stars=5",
      "i=4  spaces=1  stars=7",
      "i=5  spaces=0  stars=9"
    ],
    "expectedOutput": "    *\n   ***\n  *****\n *******\n*********"
  },
  "evaluation": {
    "strategy": "fill-blanks",
    "expectedBlanks": [
      ["n - i", "n-i", "rows - i", "rows-i", "5 - i", "5-i"],
      ["System.out.println()", "System.out.println ()"]
    ]
  },
  "hints": [
    "The first row of a five-row figure needs four leading spaces and the last row needs none, so the bound has to fall as the row number rises.",
    "The star loop never moves the cursor down, so the second blank is the argument-free statement that ends a line."
  ],
  "explanation": {
    "concept": "leading-space formula for centred pyramids",
    "summary": "Padding is driven by the distance between the row number and the height, so the bound is the height minus the current row.",
    "details": "With the bound n - i the indent goes 4, 3, 2, 1, 0 while the width expression 2 * i - 1 gives 1, 3, 5, 7, 9, and those two changes cancel out to keep the pyramid centred. The line-ending call sits inside the outer loop but after both inner loops, so it runs exactly once per row. Writing the padding first also means the star loop can end a row on a star, avoiding trailing spaces."
  },
  "rewards": {
    "xp": 35
  },
  "prerequisites": [
    "pl-pyr-009"
  ],
  "version": 1
};
