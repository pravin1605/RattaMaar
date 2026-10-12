export default {
  id: "cq-sy-004",
  chapterId: "code-quest",
  subjectId: "java-fundamentals",
  modeId: "syntax-challenge",
  levelNumber: 4,
  title: "The Three-Act Error Block",
  difficulty: "beginner",
  estimatedMinutes: 3,
  challengeType: "fill-blanks",
  instructions: "Restore the three structural keywords of Java's exception-handling skeleton, in source order.",
  content: {
    language: "java",
    prompt: "Act one protects risky code, act two reacts to a typed failure, act three always runs.",
    code: "____ {\n    readData();\n} ____ (IOException e) {\n    log(e);\n} ____ {\n    close();\n}",
    blanks: [
      { placeholder: "____", context: "____ { readData(); } — wraps the risky code" },
      { placeholder: "____", context: "____ (IOException e) { log(e); } — declares the handler with a typed parameter" },
      { placeholder: "____", context: "____ { close(); } — the block that runs no matter what" },
    ],
  },
  evaluation: { strategy: "fill-blanks", expectedBlanks: [["try"], ["catch"], ["finally"]] },
  hints: [
    "The first keyword means 'attempt'; the third means 'at the end, unconditionally'.",
    "The middle one names what the runtime does with a matching exception object, and it must declare a typed parameter in parentheses.",
  ],
  explanation: {
    concept: "try-catch-finally structure",
    summary: "try guards risky code, catch handles a specific exception type, and finally executes cleanup whether or not anything failed.",
    details: "A catch only fires when the thrown exception matches its parameter type or a supertype. finally runs on every exit path, including return and uncaught exceptions, which is why resource release lives there — or better, in try-with-resources.",
  },
  rewards: { xp: 21 },
  version: 1,
};
