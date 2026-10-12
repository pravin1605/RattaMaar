export default {
  "id": "cq-od-009",
  "chapterId": "code-quest",
  "subjectId": "java-fundamentals",
  "modeId": "output-detective",
  "levelNumber": 9,
  "title": "The Text That Refuses to Change",
  "difficulty": "intermediate",
  "estimatedMinutes": 4,
  "challengeType": "predict-output",
  "instructions": "Two containers of characters are modified in different ways. Type both printed lines.",
  "content": {
    "language": "java",
    "code": "String s = \"ab\";\ns.concat(\"cd\");\nStringBuilder sb = new StringBuilder(\"xy\");\nsb.append(\"z\");\nSystem.out.println(s);\nSystem.out.println(sb);",
    "answerLabel": "Two lines of output",
    "answerPlaceholder": "line1\nline2"
  },
  "evaluation": { "strategy": "structured-answer", "acceptedAnswers": ["ab\nxyz", "ab xyz", "ab, xyz", "line1: ab line2: xyz"] },
  "hints": [
    "concat builds and returns a brand-new text object; the original reference still points where it started.",
    "append alters the very builder object it is called on, so its stored characters grow in place."
  ],
  "explanation": {
    "concept": "Immutable String versus mutable StringBuilder",
    "summary": "s.concat(\"cd\") creates a new String that is never stored, so s still prints ab. sb.append(\"z\") mutates the builder in place, so it prints xyz.",
    "details": "String objects can never change after creation: every operation returns a fresh object and the caller must keep it. StringBuilder changes its internal character array, so ignoring the return value still leaves the modification visible. println(sb) works because StringBuilder's toString is called automatically."
  },
  "rewards": { "xp": 27 },
  "version": 1
};
