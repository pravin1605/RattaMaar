export default {
  id: "cq-sy-003",
  chapterId: "code-quest",
  subjectId: "java-fundamentals",
  modeId: "syntax-challenge",
  levelNumber: 3,
  title: "The For-Each Bridge",
  difficulty: "beginner",
  estimatedMinutes: 2,
  challengeType: "fill-blanks",
  instructions: "Complete the enhanced for loop header: one loop keyword and one separator symbol between the element variable and the collection.",
  content: {
    language: "java",
    prompt: "Read it aloud as: 'for each name in names'.",
    code: "String[] names = {\"Ada\", \"Lin\"};\n____ (String name ____ names) {\n    System.out.println(name);\n}",
    blanks: [
      { placeholder: "____", context: "____ (String name : names) — the loop keyword" },
      { placeholder: "____", context: "for (String name ____ names) — the separator symbol" },
    ],
  },
  evaluation: { strategy: "fill-blanks", expectedBlanks: [["for"], [":"]] },
  hints: [
    "The keyword is the same one used by the classic three-part indexed loop.",
    "The separator between element and source is the symbol often read as 'in', not a semicolon.",
  ],
  explanation: {
    concept: "Enhanced for (for-each) syntax",
    summary: "The header is for (ElementType variable : arrayOrIterable), with a colon bridging the variable and the source.",
    details: "for-each hides the index and iterates every element in order; it cannot modify the array structure or inspect positions. Learners often confuse the colon with the semicolons used in the classic for header — each form has its own punctuation contract.",
  },
  rewards: { xp: 19 },
  version: 1,
};
