export default {
  "id": "pl-adv-004",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "advanced",
  "levelNumber": 4,
  "title": "Spiral Order: Walk the 5x5 Grid",
  "difficulty": "intermediate",
  "estimatedMinutes": 3,
  "challengeType": "pattern-prediction",
  "instructions": "The matrix is visited clockwise in a spiral, starting at the top-left. Choose the four values printed right after the top row.",
  "content": {
    "language": "java",
    "prompt": "The spiral prints the top row left to right, then continues down the right edge. Which four values are printed immediately after 1 2 3 4 5?",
    "code": "// Spiral traversal: top row left->right,\n// right column top->bottom,\n// bottom row right->left,\n// left column bottom->top,\n// then repeat on the shrunken inner ring.",
    "patternRows": [
      "1 2 3 4 5",
      "6 7 8 9 10",
      "11 12 13 14 15",
      "16 17 18 19 20",
      "21 22 23 24 25"
    ],
    "choices": [
      { "id": "spiral-right-edge", "label": "10 15 20 25" },
      { "id": "spiral-left-column", "label": "6 11 16 21" },
      { "id": "spiral-inner-row", "label": "7 8 9 10" },
      { "id": "spiral-bottom-row", "label": "21 22 23 24" }
    ]
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "spiral-right-edge"
  },
  "hints": [
    "The top row ends at the top-right corner; the walk never revisits a cell, so the next value must be a direct neighbour of 5.",
    "After a full edge is consumed the boundary shrinks; the remaining part of that first lap runs down the column that contains 5, 10, 15, 20, 25."
  ],
  "explanation": {
    "concept": "spiral (clockwise ring) matrix traversal",
    "summary": "After the top edge 1 2 3 4 5, the spiral goes down the right column, printing 10 15 20 25, then backwards along the bottom 24 23 22 21 and up the left column 16 11 6 before entering the inner 3x3 ring.",
    "details": "A clockwise spiral keeps four boundaries (top, right, bottom, left). Each edge is printed in one direction and then that boundary moves inward: full order for the 5x5 grid is 1 2 3 4 5, 10 15 20 25, 24 23 22 21, 16 11 6, then 7 8 9, 14 19, 18 17, 12, and finally 13 at the centre — 25 values total. Distractor 6 11 16 21 would be correct only for an anticlockwise spiral."
  },
  "rewards": { "xp": 20 },
  "version": 1
};
