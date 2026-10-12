export default {
  chapterId: "code-quest",
  id: "cq-sql-009",
  subjectId: "sql",
  modeId: "query-master",
  levelNumber: 9,
  title: "TRUNCATE Erases the Table Itself?",
  difficulty: "advanced",
  estimatedMinutes: 4,
  challengeType: "true-false",
  instructions: "Decide whether the statement is true or false.",
  content: {
    language: "sql",
    code: "TRUNCATE TABLE employees;\n-- claim: this removes every row AND the table definition itself",
    prompt: "True or false: TRUNCATE removes the rows together with the table structure.",
    choices: [
      { id: "true", label: "True" },
      { id: "false", label: "False" },
    ],
  },
  evaluation: { strategy: "single-choice", correctChoiceId: "false" },
  hints: [
    "After the statement, the empty container is still there, ready to receive new rows.",
    "Only one of the three verbs (DELETE / TRUNCATE / DROP) destroys the schema object itself.",
  ],
  explanation: {
    concept: "DELETE vs TRUNCATE vs DROP",
    summary: "False. TRUNCATE quickly removes all rows but keeps the table definition; DROP TABLE removes rows, definition, indexes and constraints together.",
    details: "DELETE is DML: row-by-row, supports WHERE, fires triggers, logs each row and can be rolled back in a transaction. TRUNCATE is DDL: no WHERE, minimal logging, typically auto-commits, and often resets identity counters. DROP removes the object entirely — after TRUNCATE, SELECT * FROM employees still works and simply returns zero rows.",
  },
  rewards: { xp: 30 },
  version: 1,
};
