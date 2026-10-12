export default {
  chapterId: "code-quest",
  id: "cq-concept-007",
  subjectId: "java-fundamentals",
  modeId: "concept-quest",
  levelNumber: 7,
  title: "Which Exception Must the Caller Plan For?",
  difficulty: "intermediate",
  estimatedMinutes: 3,
  challengeType: "multiple-choice",
  instructions: "Select the exception that a method must either catch or declare in its throws clause.",
  content: {
    language: "java",
    prompt: "Which of these is a checked exception?",
    choices: [
      { id: "a", label: "NullPointerException" },
      { id: "b", label: "IOException" },
      { id: "c", label: "ArithmeticException" },
      { id: "d", label: "ArrayIndexOutOfBoundsException" },
    ],
  },
  evaluation: { strategy: "single-choice", correctChoiceId: "b" },
  hints: [
    "One family descends directly from RuntimeException; everything in that family is unchecked.",
    "The compiler forces you to plan for failures outside your program's control, such as disk and network errors.",
  ],
  explanation: {
    concept: "Checked vs unchecked exceptions",
    summary: "IOException is checked: it extends Exception (not RuntimeException), so callers must catch it or declare it with throws.",
    details: "Checked exceptions model recoverable, external conditions the caller should anticipate (missing file, closed socket). NullPointerException, ArithmeticException and ArrayIndexOutOfBoundsException all extend RuntimeException — unchecked, they signal programming bugs the compiler refuses to burden callers with. The hierarchy rule: Exception and its non-RuntimeException children = checked; Throwable -> Error children (like OutOfMemoryError) = unchecked and unrecoverable.",
  },
  rewards: { xp: 25 },
  version: 1,
};
