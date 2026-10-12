export default {
  chapterId: "code-quest",
  id: "cq-dsa-010",
  subjectId: "dsa",
  modeId: "coding-arena",
  levelNumber: 10,
  title: "Wrap-Around Queue: What Prints?",
  difficulty: "advanced",
  estimatedMinutes: 5,
  challengeType: "predict-output",
  instructions: "Trace head/tail through all six operations and enter everything the dequeue steps print, one number per line.",
  content: {
    language: "java",
    code: "int[] buf = new int[4];\nint head = 0, tail = 0, size = 0;\n// enqueue(x): buf[tail] = x; tail = (tail + 1) % 4; size++;\n// dequeue():  print buf[head]; head = (head + 1) % 4; size--;\nenqueue(1); enqueue(2); enqueue(3);\ndequeue(); dequeue();\nenqueue(4);\ndequeue();",
    expectedOutput: "1\n2\n4",
  },
  evaluation: { strategy: "exact-output", expectedOutput: "1\n2\n4" },
  hints: [
    "Track head, tail and size after every operation; indices wrap with % 4.",
    "After two removals the next insertion lands in the third slot, and the final removal reads exactly that slot.",
  ],
  explanation: {
    concept: "Circular buffer queue",
    summary: "Prints 1, 2, 4. After enqueue 1/2/3 (tail = 3), two dequeues print 1 and 2 and move head to 2; enqueue 4 writes buf[2] and wraps tail to 3; the last dequeue prints buf[2] = 4.",
    details: "The modulo lets the buffer reuse freed cells — a naive linear queue would report 'full' after 4 total enqueues even with holes at the front. Capacity is bounded by the array length minus disambiguation logic; tracking size separately (as here) avoids the classic 'head == tail means empty or full?' confusion.",
  },
  rewards: { xp: 35 },
  version: 1,
};
