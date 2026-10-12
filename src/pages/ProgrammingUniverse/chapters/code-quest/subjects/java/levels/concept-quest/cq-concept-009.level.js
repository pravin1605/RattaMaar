export default {
  chapterId: "code-quest",
  id: "cq-concept-009",
  subjectId: "java-fundamentals",
  modeId: "concept-quest",
  levelNumber: 9,
  title: "Ignore Duplicates, Keep Any Order",
  difficulty: "advanced",
  estimatedMinutes: 4,
  challengeType: "multiple-choice",
  instructions: "Choose the collection contract that fits the requirement.",
  content: {
    language: "java",
    prompt: "You must store employee IDs, automatically drop duplicates, allow nulls, and never care about ordering. Which top-level interface fits best?",
    choices: [
      { id: "a", label: "List" },
      { id: "b", label: "Set" },
      { id: "c", label: "Map" },
      { id: "d", label: "Queue" },
    ],
  },
  evaluation: { strategy: "single-choice", correctChoiceId: "b" },
  hints: [
    "The requirement says repeated inserts of the same ID must leave the size unchanged.",
    "Which collection contract forbids duplicate elements entirely and permits one null?"
  ],
  explanation: {
    concept: "Choosing a collection: List vs Set vs Map vs Queue",
    summary: "Set — it forbids duplicates by contract, permits null elements (HashSet), and offers no ordering guarantee, exactly matching the requirement.",
    details: "List keeps insertion order and happily stores duplicates; Queue adds head-ordered operations (offer/poll) but does not forbid duplicates; Map stores key-value pairs, so it fits 'associate ID with record', not 'store unique IDs' — although its keySet is a Set. For uniqueness with fast lookups, HashSet is the usual implementation; TreeSet would additionally sort and reject nulls, which the requirement does not ask for.",
  },
  rewards: { xp: 30 },
  version: 1,
};
