export default {
  "id": "pl-props-002",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "number-properties",
  "levelNumber": 2,
  "title": "Which One Breaks the Armstrong Chain",
  "difficulty": "beginner",
  "estimatedMinutes": 3,
  "challengeType": "multiple-choice",
  "instructions": "Cube the digits of each candidate and add them; pick the number whose digit-cube sum differs from itself.",
  "content": {
    "language": "java",
    "prompt": "370, 371 and 372 run through the same Armstrong test. Two of them satisfy sum of digit cubes == the number. Which one does NOT?",
    "code": "int n = CANDIDATE;\nint copy = n, sum = 0;\nwhile (copy != 0) {\n    int d = copy % 10;\n    sum += d * d * d;\n    copy /= 10;\n}\n// Armstrong when sum == n",
    "choices": [
      { "id": "c370", "label": "370" },
      { "id": "c371", "label": "371" },
      { "id": "c372", "label": "372" }
    ]
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "c372"
  },
  "hints": [
    "For every candidate, cube the three digits 3, 7 and the units digit separately, then add.",
    "Compare the finished accumulator with the number you started from; one of them lands short."
  ],
  "explanation": {
    "concept": "Armstrong numbers of three digits",
    "summary": "370 = 27 + 343 + 0 and 371 = 27 + 343 + 1 both match themselves, but 372 gives 27 + 343 + 8 = 378, which is not 372.",
    "details": "Only the units digit changes across the three candidates, so the sums differ by exactly 2^3 = 8 steps: 0 -> 27+343+0, 1 -> +1, 2 -> +8. A passing Armstrong test must reproduce the original number exactly."
  },
  "rewards": { "xp": 15 },
  "prerequisites": ["pl-props-001"],
  "version": 1
};
