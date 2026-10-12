export default {
  "id": "pl-adv-002",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "advanced",
  "levelNumber": 2,
  "title": "Pascal's Triangle: Name the Next Row",
  "difficulty": "beginner",
  "estimatedMinutes": 2,
  "challengeType": "pattern-prediction",
  "instructions": "Study the printed triangle rows and choose the row that comes next.",
  "content": {
    "language": "java",
    "prompt": "In Pascal's triangle every interior value is the sum of the two values diagonally above it. Given the four printed rows, which row is fifth?",
    "code": "// Build each row from the one above:\n// interior[j] = previous[j - 1] + previous[j]\n// edges are always 1",
    "patternRows": [
      "1",
      "1 1",
      "1 2 1",
      "1 3 3 1"
    ],
    "choices": [
      { "id": "pascal-14641", "label": "1 4 6 4 1" },
      { "id": "pascal-14441", "label": "1 4 4 4 1" },
      { "id": "pascal-13641", "label": "1 3 6 4 1" },
      { "id": "pascal-12341", "label": "1 4 5 4 1" }
    ]
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "pascal-14641"
  },
  "hints": [
    "The new row is one value longer, and each interior entry pairs two neighbours of the previous row.",
    "Check your candidate against the addition rule at position 3: the two values above it are 3 and 3."
  ],
  "explanation": {
    "concept": "Pascal's triangle row generation",
    "summary": "Pairwise sums 1, 1+3=4, 3+3=6, 3+1=4, 1 give the row 1 4 6 4 1.",
    "details": "Row k (starting from 0) lists the binomial coefficients C(k, j), and the identity C(k, j) = C(k-1, j-1) + C(k-1, j) is exactly the printed adjacency rule. That is why the fifth row (k = 4) is 1 4 6 4 1. A Java program generates it either from the addition rule on an array or from the multiplicative update value = value * (k - j) / j; watch out for int overflow on deeper rows."
  },
  "rewards": { "xp": 15 },
  "version": 1
};
