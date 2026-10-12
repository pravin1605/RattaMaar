export default {
  id: "cq-vt-009",
  chapterId: "code-quest",
  subjectId: "java-fundamentals",
  modeId: "variable-tracker",
  levelNumber: 9,
  title: "Map Size Under Replacements",
  difficulty: "advanced",
  estimatedMinutes: 4,
  challengeType: "trace-variable",
  instructions: "Two size readings were hidden as the map is modified step by step. Fill both in table order.",
  content: {
    language: "java",
    prompt: "Track how many keys the map holds after each operation.",
    code: "Map<String, Integer> scores = new HashMap<>();\nscores.put(\"a\", 1);\nscores.put(\"b\", 2);\nscores.put(\"a\", 5);\nscores.remove(\"b\");\nscores.put(\"c\", 3);",
    trace: {
      columns: ["operation", "scores.size()"],
      rows: [
        { cells: ["put a -> 1", "1"] },
        { cells: ["put b -> 2", "2"] },
        { cells: ["put a -> 5", "?"], note: "the key a already exists" },
        { cells: ["remove b", "?"], note: "one key disappears" },
        { cells: ["put c -> 3", "2"], note: "a brand-new key" },
      ],
    },
    blanks: [
      { placeholder: "?", context: "size after the replacement put of key a" },
      { placeholder: "?", context: "size after the remove operation" },
    ],
  },
  evaluation: { strategy: "fill-blanks", expectedBlanks: [["2"], ["1"]] },
  hints: [
    "put decides between inserting a new key and updating an existing one; only one of those changes the count.",
    "After the removal, count how many distinct keys remain before the final insert.",
  ],
  explanation: {
    concept: "HashMap key semantics",
    summary: "Re-putting an existing key replaces its value without changing size, while removing a key shrinks the map by one.",
    details: "After two inserts the map holds keys a and b. The second put for a updates the stored value (1 becomes 5) but the key set stays at size 2. remove(\"b\") drops the map to one key, and put(\"c\", 3) adds a fresh key, returning to two. A Map never stores duplicate keys — that is its defining guarantee.",
  },
  rewards: { xp: 32 },
  version: 1,
};
