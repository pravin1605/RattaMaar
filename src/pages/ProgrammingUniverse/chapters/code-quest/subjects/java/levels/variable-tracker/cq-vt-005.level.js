export default {
  id: "cq-vt-005",
  chapterId: "code-quest",
  subjectId: "java-fundamentals",
  modeId: "variable-tracker",
  levelNumber: 5,
  title: "Index Walk Over an Array",
  difficulty: "intermediate",
  estimatedMinutes: 3,
  challengeType: "trace-variable",
  instructions: "The trace shows the while loop inspecting each slot. Type the value that replaces the ? in the last row.",
  content: {
    language: "java",
    prompt: "What does found hold when the loop terminates?",
    code: "int[] nums = {5, 10, 15, 20};\nint idx = 0;\nint found = -1;\nwhile (idx < nums.length) {\n    if (nums[idx] == 15) found = idx;\n    idx++;\n}",
    trace: {
      columns: ["idx", "nums[idx]", "found"],
      rows: [
        { cells: ["0", "5", "-1"] },
        { cells: ["1", "10", "-1"] },
        { cells: ["2", "15", "2"], note: "the comparison succeeds here" },
        { cells: ["3", "20", "?"], note: "after the final pass" },
      ],
    },
  },
  evaluation: { strategy: "structured-answer", acceptedAnswers: ["2"] },
  hints: [
    "found only changes when the inspected element matches the target.",
    "Once a position is recorded, later non-matching passes leave it untouched.",
  ],
  explanation: {
    concept: "Linear scan with a remembered position",
    summary: "found captures the index of the matching element and keeps it through the remaining passes.",
    details: "nums[2] is 15, so found becomes 2. The loop continues (there is no break) but no later element equals 15, so the last row still reads 2. Remember that array positions are counted from 0, so the third element sits at index 2.",
  },
  rewards: { xp: 23 },
  version: 1,
};
