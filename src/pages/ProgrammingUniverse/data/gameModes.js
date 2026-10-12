/** Game modes and Pattern Lab categories.
 *  `scope: "code-quest"` modes appear in the Practice hub; `scope: "pattern-lab"` entries
 *  are categories inside Chapter 2 and are addressed through a level's `categoryId`. */
const gameModes = [
  { id: "output-detective", scope: "code-quest", icon: "⌕", title: "Output Detective", description: "Predict what the code or query will produce.", tag: "TRACE THE LOGIC", available: true },
  { id: "bug-hunter", scope: "code-quest", icon: "⌁", title: "Bug Hunter", description: "Locate mistakes, repair broken code and learn why it failed.", tag: "FIND · FIX · LEARN", available: true },
  { id: "code-builder", scope: "code-quest", icon: "▦", title: "Code Builder", description: "Complete missing lines and arrange code in the right order.", tag: "BUILD THE SOLUTION", available: true },
  { id: "concept-quest", scope: "code-quest", icon: "◇", title: "Concept Quest", description: "Master concepts through short missions and checkpoints.", tag: "LEARN BY PLAYING", available: true },
  { id: "query-master", scope: "code-quest", icon: "▤", title: "Query Master", description: "Read, repair and reason about database queries.", tag: "DATABASE MISSIONS", available: true },
  { id: "coding-arena", scope: "code-quest", icon: "⚔", title: "Coding Arena", description: "Algorithm puzzles: build the solution logic step by step.", tag: "SOLVE · BUILD · REVIEW", available: true },
  { id: "variable-tracker", scope: "code-quest", icon: "⇄", title: "Variable Tracker", description: "Follow variables through every iteration and fill the trace table.", tag: "TRACE EVERY VALUE", available: true },
  { id: "logic-master", scope: "code-quest", icon: "⑂", title: "Logic Master", description: "Debug conditional logic, loops and edge-case behaviour.", tag: "REASON THE BRANCHES", available: true },
  { id: "syntax-challenge", scope: "code-quest", icon: "⌨", title: "Syntax Challenge", description: "Fill the exact syntax Java needs — declarations, keywords, operators.", tag: "PRECISION CODING", available: true },
  { id: "algorithm-architect", scope: "code-quest", icon: "▲", title: "Algorithm Architect", description: "Design algorithms: order the steps, pick the right structure, count the cost.", tag: "DESIGN THE SOLUTION", available: true },
  { id: "timed-challenge", scope: "code-quest", icon: "⏱", title: "Timed Challenge", description: "Answer against the clock. Fast recall under pressure.", tag: "BEAT THE TIMER", available: true },
  { id: "boss-mission", scope: "code-quest", icon: "☠", title: "Boss Mission", description: "Multi-concept finale missions that combine everything from the path.", tag: "FINAL TRIAL", available: true },
  { id: "pattern-category", scope: "pattern-lab", groups: [
    { id: "stars", icon: "✦", title: "Star & Symbol Patterns", description: "Triangles, squares and symbol rows built with nested loops." },
    { id: "numbers", icon: "123", title: "Number Printing Patterns", description: "Counting, row-number and Floyd-style numeric triangles." },
    { id: "alphabets", icon: "Aa", title: "Alphabet Patterns", description: "Letter triangles, pyramids and zig-zag character series." },
    { id: "pyramids", icon: "△", title: "Pyramids & Diamonds", description: "Centred pyramids, inverted pyramids and hollow diamonds." },
    { id: "hollow", icon: "▢", title: "Hollow & Symmetrical", description: "Borders, butterfly, hourglass, X and cross shapes." },
    { id: "nested-loops", icon: "↻", title: "Nested-Loop Mastery", description: "Deep two- and three-level loop tracing and counting." },
    { id: "number-properties", icon: "≡", title: "Number Properties", description: "Armstrong, prime, palindrome, perfect, strong, neon, automorphic." },
    { id: "digits", icon: "⛴", title: "Digit-Based Problems", description: "Digit sums, counts, reversal and positional extraction." },
    { id: "series", icon: "∑", title: "Mathematical Series", description: "AP, GP, factorials, Fibonacci, squares, cubes, alternating sums." },
    { id: "advanced", icon: "✧", title: "Special & Advanced Patterns", description: "Spirals, Pascal's triangle, binary patterns and composite shapes." },
  ] },
];
export default gameModes;
