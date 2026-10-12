export default {
  "id": "pl-hollow-008",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "hollow",
  "levelNumber": 8,
  "title": "Mend the Leaning Diamond",
  "difficulty": "intermediate",
  "estimatedMinutes": 5,
  "challengeType": "find-and-fix",
  "instructions": "The program should print a hollow diamond, but one condition term is wrong. Choose the fix that produces the intended output.",
  "content": {
    "language": "java",
    "prompt": "Intended output: for each of the 9 rows, stars should appear at equal distance k to the LEFT and to the RIGHT of the center column n, producing a symmetric diamond outline. The variable k = Math.min(i - 1, width - i) already gives that distance.",
    "code": "int n = 5;\nint width = 2 * n - 1;\nfor (int i = 1; i <= width; i++) {\n    int k = Math.min(i - 1, width - i);\n    for (int j = 1; j <= width; j++) {\n        if (j == n - k || j == n - k) {\n            System.out.print(\"*\");\n        } else {\n            System.out.print(\" \");\n        }\n    }\n    System.out.println();\n}"
  },
  "choices": [
    { "id": "fixPlus", "label": "Change the second test to j == n + k" },
    { "id": "fixK", "label": "Replace the k computation with int k = i;" },
    { "id": "fixFirst", "label": "Change the first test to j == k" }
  ],
  "evaluation": {
    "strategy": "validated-correction",
    "expectedFixId": "fixPlus"
  },
  "hints": [
    "The two tests should place the left and right border of the diamond; a mirror of (n - k) across the center is (n + k).",
    "With the duplicated test, each row prints only one star or two coinciding ones, so the outline leans. Check symmetry around column n."
  ],
  "explanation": {
    "concept": "symmetric border columns via a shared distance",
    "summary": "The diamond's outline is the pair of columns n - k and n + k, where k grows to n - 1 at the middle row and shrinks again.",
    "details": "width = 2 * n - 1 = 9 and k = Math.min(i - 1, width - i) rises 0, 1, 2, 3, 4 then falls 3, 2, 1, 0, so the two border stars march apart to columns 1 and 9 at row 5 and back together. The buggy condition repeats n - k, printing a single star per row instead of the mirrored pair; the fix replaces the second test with j == n + k. Interior columns between the borders print spaces, keeping the diamond hollow."
  },
  "rewards": { "xp": 25 },
  "prerequisites": ["pl-hollow-007"],
  "version": 1
};
