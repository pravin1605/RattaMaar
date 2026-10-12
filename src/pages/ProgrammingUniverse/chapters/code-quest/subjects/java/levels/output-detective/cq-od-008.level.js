export default {
  "id": "cq-od-008",
  "chapterId": "code-quest",
  "subjectId": "java-fundamentals",
  "modeId": "output-detective",
  "levelNumber": 8,
  "title": "What Fresh Arrays Contain",
  "difficulty": "intermediate",
  "estimatedMinutes": 3,
  "challengeType": "multiple-choice",
  "instructions": "None of these arrays were assigned values. Pick the line the program prints.",
  "content": {
    "language": "java",
    "code": "int[] nums = new int[3];\ndouble[] prices = new double[2];\nboolean[] flags = new boolean[2];\nSystem.out.println(nums[0] + \", \" + prices[1] + \", \" + flags[0]);",
    "prompt": "What is printed?",
    "choices": [
      { "id": "a", "label": "0, 0.0, false" },
      { "id": "b", "label": "null, null, null" },
      { "id": "c", "label": "0, 0, false" },
      { "id": "d", "label": "A runtime error: the slots hold nothing" }
    ]
  },
  "evaluation": { "strategy": "single-choice", "correctChoiceId": "a" },
  "hints": [
    "Array components receive a built-in starting value per element type when the array is created.",
    "Each numeric type prints in its own form: a whole-number type keeps no decimal point, a floating type keeps one."
  ],
  "explanation": {
    "concept": "Default values of array elements",
    "summary": "new int[3] fills every slot with 0, new double[2] with 0.0 and new boolean[2] with false. Printed in order the line is 0, 0.0, false.",
    "details": "Unlike local variables, array elements are always initialized: numeric types to zero (rendered as 0.0 for double), booleans to false, and reference types to null. That is why reading an untouched slot is legal and never throws."
  },
  "rewards": { "xp": 24 },
  "version": 1
};
