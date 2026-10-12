export default {
  chapterId: "code-quest",
  id: "cq-sql-001",
  subjectId: "sql",
  modeId: "query-master",
  levelNumber: 1,
  title: "How Many Rows Pass the Salary Filter?",
  difficulty: "beginner",
  estimatedMinutes: 2,
  challengeType: "numeric-answer",
  instructions: "Using the schema and data shown, count how many rows the query returns.",
  content: {
    language: "sql",
    code: "employees\nid | name | dept  | salary\n1  | Ann  | Eng   | 5000\n2  | Bo   | Eng   | 6000\n3  | Cy   | Sales | 6000\n4  | Di   | Sales | 7000\n5  | Ed   | IT    | 4000\n6  | Fay  | IT    | NULL\n\ndepts\ndept  | floor\nEng   | 2\nSales | 3\nHR    | 4\n\n-- query\nSELECT name FROM employees WHERE salary >= 6000;",
    prompt: "How many rows does the query return?",
  },
  evaluation: { strategy: "numeric-tolerance", expectedNumber: 3 },
  hints: [
    "Cross off every row that fails the salary test, and remember what a comparison against a missing value yields.",
    "NULL >= 6000 is UNKNOWN, so that row is not just rejected — it never qualifies at all.",
  ],
  explanation: {
    concept: "SELECT + WHERE row filtering",
    summary: "3 rows: Bo (6000), Cy (6000) and Di (7000). Ed (4000) fails the predicate, Ann (5000) fails it, and Fay's NULL comparison evaluates to UNKNOWN, which WHERE also rejects.",
    details: "WHERE keeps only rows whose predicate is TRUE. Comparisons involving NULL produce UNKNOWN, never TRUE, so NULL salary is excluded from >= filters. If you wanted Fay included you would need OR salary IS NULL.",
  },
  rewards: { xp: 15 },
  version: 1,
};
