export default {
  "id": "cq-bh-004",
  "chapterId": "code-quest",
  "subjectId": "java-fundamentals",
  "modeId": "bug-hunter",
  "levelNumber": 4,
  "title": "The Loop That Stepped One Too Far",
  "difficulty": "beginner",
  "estimatedMinutes": 2,
  "challengeType": "find-and-fix",
  "instructions": "This loop crashes with ArrayIndexOutOfBoundsException on its last pass. Choose the correction.",
  "content": {
    "language": "java",
    "code": "int[] data = {10, 20, 30};\nfor (int i = 0; i <= data.length; i++) {\n    System.out.println(data[i]);\n}",
    "prompt": "Which fix stops the crash while printing all three values?",
    "choices": [
      { "id": "strict-lt", "label": "Use i < data.length as the loop condition." },
      { "id": "start-one", "label": "Start the loop with i = 1 instead of i = 0." },
      { "id": "shift-index", "label": "Print data[i - 1] inside the loop body." },
      { "id": "no-condition", "label": "Remove the condition and loop until i = length." }
    ]
  },
  "evaluation": { "strategy": "validated-correction", "expectedFixId": "strict-lt" },
  "hints": [
    "The valid indexes of a three-slot array stop one before its length value.",
    "The crash happens on exactly one iteration; tighten the stopping test rather than moving every index."
  ],
  "explanation": {
    "concept": "Off-by-one errors in array loops",
    "summary": "Indexes run from 0 to length - 1, so i <= length lets the loop reach i = 3 and read data[3], which is out of bounds. Changing the test to i < data.length stops the loop in time and prints 10, 20, 30.",
    "details": "Starting at 1 or printing i - 1 would skip or misalign values but the out-of-bounds visit still happens; only the stopping condition is wrong here."
  },
  "rewards": { "xp": 15 },
  "version": 1
};
