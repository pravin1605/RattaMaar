export default {
  "id": "cq-bh-007",
  "chapterId": "code-quest",
  "subjectId": "java-fundamentals",
  "modeId": "bug-hunter",
  "levelNumber": 7,
  "title": "The Word That Vanished After the Number",
  "difficulty": "intermediate",
  "estimatedMinutes": 4,
  "challengeType": "find-and-fix",
  "instructions": "Given the input 3 then hello on the next line, word ends up empty. Choose the correction that captures hello.",
  "content": {
    "language": "java",
    "code": "Scanner sc = new Scanner(System.in);\nint count = sc.nextInt();\nString word = sc.nextLine();\nSystem.out.println(\"count=\" + count + \" word=\" + word);",
    "prompt": "Which fix reads the word correctly?",
    "choices": [
      { "id": "use-next", "label": "Read the word with sc.next() instead of sc.nextLine()." },
      { "id": "to-long", "label": "Read the number with sc.nextLong() instead of sc.nextInt()." },
      { "id": "close-first", "label": "Call sc.close() before reading the word." },
      { "id": "parse", "label": "Wrap the word read in Integer.parseInt(...)." }
    ]
  },
  "evaluation": { "strategy": "validated-correction", "expectedFixId": "use-next" },
  "hints": [
    "The numeric read stops at the digits and leaves the rest of that line, including the line terminator, queued up.",
    "A full-line read right afterwards grabs whatever is left of the first line; a token read skips ahead to the next word instead."
  ],
  "explanation": {
    "concept": "Scanner buffering: nextInt followed by nextLine",
    "summary": "nextInt consumes only the number and leaves the newline in the buffer, so the nextLine() call returns the empty remainder of that first line. Using next() skips whitespace and returns hello.",
    "details": "An alternative fix is to call nextLine() once more to swallow the leftover newline before reading the real line. Changing the numeric method or closing the stream does not address the buffered line break."
  },
  "rewards": { "xp": 21 },
  "version": 1
};
