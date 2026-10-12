export default {
  chapterId: "code-quest",
  id: "cq-concept-010",
  subjectId: "java-fundamentals",
  modeId: "concept-quest",
  levelNumber: 10,
  title: "Does Dropping the Last Reference Free Memory Now?",
  difficulty: "advanced",
  estimatedMinutes: 5,
  challengeType: "true-false",
  instructions: "Decide whether the statement is true.",
  content: {
    language: "java",
    code: "Task t = new Task();\nt = null;\n// claim: the Task object is reclaimed the instant this line executes",
    prompt: "True or false: setting the last reference to null guarantees the object is reclaimed immediately.",
    choices: [
      { id: "true", label: "True" },
      { id: "false", label: "False" },
    ],
  },
  evaluation: { strategy: "single-choice", correctChoiceId: "false" },
  hints: [
    "Reachability decides whether an object MAY be collected; it cannot decide WHEN.",
    "Collection happens on the garbage collector's own schedule, triggered by memory pressure, not by assignment.",
  ],
  explanation: {
    concept: "Garbage collection basics",
    summary: "False. Nulling the last reference makes the object eligible for collection, but reclamation happens only when the GC next runs.",
    details: "The JVM's GC (e.g. G1) traces reachable objects from GC roots; anything unreachable becomes a candidate and is reclaimed at a time the collector chooses, usually under heap pressure. Even System.gc() is only a hint. Two follow-ups: objects may still leak via forgotten map/list entries (not just live fields), and finalize()/Cleaner are for native-resource cleanup, never for controlling timing of reclamation.",
  },
  rewards: { xp: 35 },
  version: 1,
};
