export default {
  "id": "cq-tc-007",
  "chapterId": "code-quest",
  "subjectId": "java-fundamentals",
  "modeId": "timed-challenge",
  "levelNumber": 7,
  "title": "Bounds Reflex",
  "difficulty": "beginner",
  "estimatedMinutes": 1,
  "timeLimitSeconds": 20,
  "challengeType": "multiple-choice",
  "instructions": "Answer fast: which index is out of bounds?",
  "content": {
    "language": "java",
    "prompt": "int[] nums = new int[5]; Which access throws ArrayIndexOutOfBoundsException?",
    "choices": [
      { "id": "a", "label": "nums[0]" },
      { "id": "b", "label": "nums[4]" },
      { "id": "c", "label": "nums[5]" },
      { "id": "d", "label": "nums[2]" }
    ]
  },
  "evaluation": { "strategy": "single-choice", "correctChoiceId": "c" },
  "hints": [
    "An array of size 5 starts counting at 0.",
    "The legal window is [0, length - 1]."
  ],
  "explanation": {
    "concept": "zero-based indexing",
    "summary": "new int[5] creates indices 0 through 4; index 5 is one past the end.",
    "details": "Off-by-one at the upper bound is the most common array bug — loop conditions should use i < length, not i <= length."
  },
  "rewards": { "xp": 15 },
  "version": 1
};
