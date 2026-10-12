export default {
  "id": "cq-cb-002",
  "chapterId": "code-quest",
  "subjectId": "java-fundamentals",
  "modeId": "code-builder",
  "levelNumber": 2,
  "title": "Build the Array Reverser",
  "difficulty": "beginner",
  "estimatedMinutes": 3,
  "challengeType": "code-ordering",
  "instructions": "Arrange the four statements so this method flips the array in place using pair swaps.",
  "content": {
    "language": "java",
    "codeBefore": "public static void reverse(int[] arr) {",
    "codeAfter": "    }\n}",
    "prompt": "Target: {1, 2, 3, 4} becomes {4, 3, 2, 1}.",
    "blocks": [
      { "id": "b4", "code": "    arr[arr.length - 1 - i] = temp;" },
      { "id": "b2", "code": "    int temp = arr[i];" },
      { "id": "b1", "code": "    for (int i = 0; i < arr.length / 2; i++) {" },
      { "id": "b3", "code": "    arr[i] = arr[arr.length - 1 - i];" }
    ]
  },
  "evaluation": { "strategy": "ordered-blocks", "expectedOrder": ["b1", "b2", "b3", "b4"] },
  "hints": [
    "A swap needs the victim's old value preserved before any slot overwrites it.",
    "Visit only the front half so each pair is exchanged exactly once; the far partner of position i is counted back from the end."
  ],
  "explanation": {
    "concept": "In-place reversal with a temp variable",
    "summary": "The loop header comes first, then each pass saves the front element in temp, copies the matching back element to the front, and finally writes temp into the back slot. Running only to arr.length / 2 means every pair is swapped exactly once.",
    "details": "For {1,2,3,4}: pass i=0 exchanges positions 0 and 3, pass i=1 exchanges 1 and 2, giving {4,3,2,1}. Writing back into arr[i] before saving it would destroy the value being moved to the other end."
  },
  "rewards": { "xp": 15 },
  "version": 1
};
