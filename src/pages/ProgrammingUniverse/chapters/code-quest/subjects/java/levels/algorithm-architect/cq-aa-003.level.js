export default {
  id: "cq-aa-003",
  chapterId: "code-quest",
  subjectId: "java-fundamentals",
  modeId: "algorithm-architect",
  levelNumber: 3,
  title: "Choosing the Loop Bounds",
  difficulty: "beginner",
  estimatedMinutes: 2,
  challengeType: "multiple-choice",
  instructions: "You must add every element of an array of length 5 to sum, touching each slot exactly once and never running out of range. Pick the correct loop header.",
  content: {
    language: "java",
    prompt: "Which header visits indices 0 through 4 precisely once?",
    code: "int[] arr = {3, 1, 4, 1, 5};\nint sum = 0;\n// ??? loop header ???\n//     sum += arr[i];",
    choices: [
      { id: "a", label: "for (int i = 1; i < 5; i++)" },
      { id: "b", label: "for (int i = 0; i < arr.length; i++)" },
      { id: "c", label: "for (int i = 0; i <= arr.length; i++)" },
      { id: "d", label: "for (int i = 0; i < arr.length - 1; i++)" },
    ],
  },
  evaluation: { strategy: "single-choice", correctChoiceId: "b" },
  hints: [
    "The first slot lives at index zero and the count of slots equals the length.",
    "One option skips the head of the array, one runs past the tail, and one stops before the last slot."
  ],
  explanation: {
    concept: "Loop bounds and array coverage",
    summary: "Starting at 0 with a strict less-than against length covers exactly the valid indices 0..4.",
    details: "Option a drops arr[0]; option c reaches index 5 and throws ArrayIndexOutOfBoundsException; option d stops at index 3, missing the final element. The half-open interval [0, length) is the standard Java traversal contract.",
  },
  rewards: { xp: 20 },
  version: 1,
};
