export default {
  id: "cq-sy-001",
  chapterId: "code-quest",
  subjectId: "java-fundamentals",
  modeId: "syntax-challenge",
  levelNumber: 1,
  title: "The Entry Point Blueprint",
  difficulty: "beginner",
  estimatedMinutes: 2,
  challengeType: "fill-blanks",
  instructions: "Restore the two missing keywords that make this the standard Java application entry point.",
  content: {
    language: "java",
    prompt: "One word names the widest access level; the other is the exact method name the JVM looks for.",
    code: "____ class Main {\n    public static void ____ (String[] args) {\n        System.out.println(\"start\");\n    }\n}",
    blanks: [
      { placeholder: "____", context: "____ class Main {  — the class visibility keyword" },
      { placeholder: "____", context: "public static void ____(String[] args) — the method name" },
    ],
  },
  evaluation: { strategy: "fill-blanks", expectedBlanks: [["public"], ["main"]] },
  hints: [
    "The JVM must be able to call this method from outside the package, so the class carries the widest modifier.",
    "The launcher searches for a static method whose name is exactly the four letters that mean 'primary routine'.",
  ],
  explanation: {
    concept: "Class declaration and the main method signature",
    summary: "A runnable Java program needs a public class and a public static void main(String[] args) method.",
    details: "public exposes the class, static lets the JVM call the method without an instance, void signals no return value, and the single String[] parameter receives command-line arguments. Any deviation — wrong name, missing static — compiles but never runs as an application.",
  },
  rewards: { xp: 15 },
  version: 1,
};
