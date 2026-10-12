export default {
  chapterId: "code-quest",
  id: "cq-dsa-006",
  subjectId: "dsa",
  modeId: "coding-arena",
  levelNumber: 6,
  title: "A Re-put Key and an Absent Lookup",
  difficulty: "intermediate",
  estimatedMinutes: 3,
  challengeType: "predict-output",
  instructions: "Predict exactly what the program prints.",
  content: {
    language: "java",
    code: "Map<String, Integer> m = new HashMap<>();\nm.put(\"a\", 1);\nm.put(\"b\", 2);\nm.put(\"a\", 9);\nSystem.out.println(m.get(\"a\") + \" \" + m.get(\"c\"));",
    expectedOutput: "9 null",
  },
  evaluation: { strategy: "exact-output", expectedOutput: "9 null" },
  hints: [
    "A second insertion under an existing key replaces the stored value instead of growing the map.",
    "Looking up an absent key yields the reference default, not the numeric zero — and size stays 2.",
  ],
  explanation: {
    concept: "HashMap get/put semantics",
    summary: "Prints '9 null'. put(\"a\", 9) overwrites the earlier 1 for the same key; get(\"c\") finds no mapping and returns null because the value type is the Integer wrapper.",
    details: "put returns the previous value and keeps one entry per key — m.size() == 2 afterwards. get on a missing key returns the default for the reference type V; with HashMap<String, Integer> that is null, so unboxing it into an int would throw NullPointerException — the classic autoboxing trap. getOrDefault(\"c\", 0) avoids it.",
  },
  rewards: { xp: 25 },
  version: 1,
};
