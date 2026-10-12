export default {
  chapterId: "code-quest",
  id: "cq-dsa-004",
  subjectId: "dsa",
  modeId: "coding-arena",
  levelNumber: 4,
  title: "One Sequence In, Two Different Answers Out",
  difficulty: "intermediate",
  estimatedMinutes: 3,
  challengeType: "debug-output",
  instructions: "Predict exactly what the last line prints (two digits separated by one space).",
  content: {
    language: "java",
    code: "Deque<Integer> s = new ArrayDeque<>();\ns.push(1); s.push(2); s.push(3);\nQueue<Integer> q = new ArrayDeque<>();\nq.add(1); q.add(2); q.add(3);\nSystem.out.println(s.pop() + \" \" + q.poll());",
    expectedOutput: "3 1",
  },
  evaluation: { strategy: "exact-output", expectedOutput: "3 1" },
  hints: [
    "LIFO removes from the end you just added to; FIFO removes from the end you touched first.",
    "Both structures received 1, 2, 3 in the same order, but their heads sit at opposite ends.",
  ],
  explanation: {
    concept: "Stack (LIFO) vs Queue (FIFO)",
    summary: "Prints '3 1'. push adds at the head of the ArrayDeque-as-stack, so pop returns the most recent 3; add queues at the tail, so poll returns the longest-waiting 1.",
    details: "ArrayDeque plays both roles: push/pop/peek model a stack, add/poll/peek model a queue (both on one circular array). Using the same instance for both idioms at once is a classic bug source — here the two variables make the contrast explicit. If you then popped/polled again you would get 2 in both cases.",
  },
  rewards: { xp: 20 },
  version: 1,
};
