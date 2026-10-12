export default {
  "id": "pl-hollow-007",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "hollow",
  "levelNumber": 7,
  "title": "Rebuild the Butterfly Wings",
  "difficulty": "intermediate",
  "estimatedMinutes": 4,
  "challengeType": "code-ordering",
  "instructions": "Arrange the blocks to print the rising half of a butterfly with n = 4: row i shows i stars, a shrinking gap of spaces, then i stars again.",
  "content": {
    "language": "java",
    "prompt": "The variable n is already declared as 4. Order the six blocks into one working outer-loop body.",
    "code": "int n = 4;\n// arrange the blocks below",
    "blocks": [
      { "id": "b6", "code": "    System.out.println();" },
      { "id": "b4", "code": "    for (int s = 1; s <= 2 * (n - i); s++) System.out.print(\" \");" },
      { "id": "b1", "code": "for (int i = 1; i <= n; i++) {" },
      { "id": "b5", "code": "    for (int j = 1; j <= i; j++) System.out.print(\"*\");" },
      { "id": "b3", "code": "}" },
      { "id": "b2", "code": "    for (int j = 1; j <= i; j++) System.out.print(\"*\");" }
    ],
    "patternRows": [
      "*      *",
      "**    **",
      "***  ***",
      "********"
    ],
    "expectedOutput": "*      *\n**    **\n***  ***\n********"
  },
  "evaluation": {
    "strategy": "ordered-blocks",
    "expectedOrder": ["b1", "b2", "b4", "b5", "b6", "b3"]
  },
  "hints": [
    "Each line has three printing phases in order: left wing, gap, right wing, then the line break, and finally the closing brace.",
    "The gap loop must shrink as the wings grow: it uses 2 * (n - i) while both wing loops use the row index."
  ],
  "explanation": {
    "concept": "composing one row from three consecutive inner loops",
    "summary": "The wings both run j from 1 to i, the gap loop fills 2 * (n - i) spaces between them, and println ends each row before the brace closes the outer loop.",
    "details": "For row i the printed width is always i + 2 * (n - i) + i, so all lines stay aligned even as the gap collapses. On the final pass i = 4 the gap loop condition 1 <= 0 fails immediately, printing the two touching wings as one solid line. Ending the block sequence with the line break and then the closing brace keeps the body inside the loop."
  },
  "rewards": { "xp": 22 },
  "prerequisites": ["pl-hollow-006"],
  "version": 1
};
