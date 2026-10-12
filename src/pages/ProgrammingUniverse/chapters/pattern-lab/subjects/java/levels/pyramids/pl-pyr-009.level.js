export default {
  "id": "pl-pyr-009",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "pyramids",
  "levelNumber": 9,
  "title": "Butterfly Pattern: Where the Gap Disappears",
  "difficulty": "advanced",
  "estimatedMinutes": 4,
  "challengeType": "pattern-prediction",
  "instructions": "Two mirrored star blocks are separated by a space loop. Predict how the widest row of the figure looks.",
  "content": {
    "language": "java",
    "prompt": "The gap loop bound is 2 * (n - i). Describe the row where i has grown to equal n.",
    "code": "int n = 5;\nfor (int r = 1; r <= 2 * n - 1; r++) {\n    int i = (r <= n) ? r : 2 * n - r;\n    for (int j = 1; j <= i; j++) System.out.print(\"*\");\n    for (int s = 1; s <= 2 * (n - i); s++) System.out.print(\" \");\n    for (int j = 1; j <= i; j++) System.out.print(\"*\");\n    System.out.println();\n}",
    "patternRows": [
      "*        *",
      "**      **",
      "***    ***",
      "****  ****",
      "**********",
      "****  ****",
      "***    ***",
      "**      **",
      "*        *"
    ],
    "patternVariables": [
      "r=1  i=1  gap=8",
      "r=2  i=2  gap=6",
      "r=3  i=3  gap=4",
      "r=4  i=4  gap=2",
      "r=5  i=5  gap=0",
      "r=6  i=4  gap=2",
      "r=7  i=3  gap=4",
      "r=8  i=2  gap=6",
      "r=9  i=1  gap=8"
    ],
    "expectedOutput": "*        *\n**      **\n***    ***\n****  ****\n**********\n****  ****\n***    ***\n**      **\n*        *",
    "choices": [
      {
        "id": "gap-closes",
        "label": "The gap loop makes no trips, so both wings merge into one solid run of stars"
      },
      {
        "id": "gap-widest",
        "label": "The gap is at its widest there, pushing the two wings to the margins"
      },
      {
        "id": "one-wing",
        "label": "The second star loop is skipped, so that row holds only n stars"
      },
      {
        "id": "no-stars",
        "label": "The star loops stop running because their bound no longer grows"
      }
    ]
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "gap-closes"
  },
  "hints": [
    "A bound built from the difference between n and the current row runs out of trips exactly when that difference is zero.",
    "Two star groups printed with nothing in between are indistinguishable from one longer group."
  ],
  "explanation": {
    "concept": "mirrored wings sharing one width",
    "summary": "Each row prints i stars, then 2 * (n - i) spaces, then i stars again, so the gap closes precisely on the middle row.",
    "details": "The row index i is folded back by the ternary test, which makes r = 6 behave like i = 4 and so on, giving nine symmetric rows. The gap shrinks by two per row because it is twice the distance from i to n, and when i equals n the loop variable s starts at 1 against a bound of 0, so the body never runs and the two wings join into 2 * n stars. Every row ends with a star, so the figure carries no trailing blanks."
  },
  "rewards": {
    "xp": 34
  },
  "prerequisites": [
    "pl-pyr-008"
  ],
  "version": 1
};
