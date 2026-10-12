import { readFileSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { pathToFileURL } from "node:url";

const ROOT = "D:/notes_web/src/pages/ProgrammingUniverse";

async function load(file) {
  const src = readFileSync(file, "utf8").replace(/export default/g, "module.exports =");
  const dir = mkdtempSync(join(tmpdir(), "patch-"));
  const tmp = join(dir, "m.cjs");
  writeFileSync(tmp, src);
  try { const mod = await import(pathToFileURL(tmp).href); return mod.default ?? mod.exports; }
  finally { rmSync(dir, { recursive: true, force: true }); }
}

async function edit(rel, fn) {
  const p = join(ROOT, rel);
  const obj = await load(p);
  fn(obj);
  writeFileSync(p, `export default ${JSON.stringify(obj, null, 2)};\n`);
}

const patternCategory = {
  "java-loop-trace-001": ["nested-loops", 1],
  "java-series-fibonacci-001": ["series", 1],
  "java-series-even-002": ["numbers", 1],
  "java-pattern-spaces-003": ["hollow", 1],
  "java-pattern-star-001": ["stars", 1],
  "java-pattern-star-002": ["stars", 2],
  "java-pattern-number-001": ["numbers", 2],
  "java-pattern-number-002": ["numbers", 3],
  "java-pattern-binary-003": ["advanced", 1],
  "java-pattern-alpha-001": ["alphabets", 1],
};
const patternFiles = [
  "chapters/pattern-lab/subjects/java/levels/loop-tracer/java-loop-trace-001.level.js",
  "chapters/pattern-lab/subjects/java/levels/loop-tracer/java-series-fibonacci-001.level.js",
  "chapters/pattern-lab/subjects/java/levels/loop-tracer/java-series-even-002.level.js",
  "chapters/pattern-lab/subjects/java/levels/loop-tracer/java-pattern-spaces-003.level.js",
  "chapters/pattern-lab/subjects/java/levels/pattern-master/java-pattern-star-001.level.js",
  "chapters/pattern-lab/subjects/java/levels/pattern-master/java-pattern-star-002.level.js",
  "chapters/pattern-lab/subjects/java/levels/pattern-master/java-pattern-number-001.level.js",
  "chapters/pattern-lab/subjects/java/levels/pattern-master/java-pattern-number-002.level.js",
  "chapters/pattern-lab/subjects/java/levels/pattern-master/java-pattern-binary-003.level.js",
  "chapters/pattern-lab/subjects/java/levels/pattern-master/java-pattern-alpha-001.level.js",
];
for (const rel of patternFiles) await edit(rel, (o) => {
  const [cat, num] = patternCategory[o.id];
  o.categoryId = cat;
  o.levelNumber = num;
  if (o.id === "java-pattern-binary-003") {
    o.content.patternRows = ["1 0 1 0", "0 1 0 1", "1 0 1 0", "0 1 0 1"];
    o.content.expectedOutput = o.content.patternRows.join("\n");
    o.content.code = "for (int i = 1; i <= 4; i++) {\n    for (int j = 1; j <= 4; j++) {\n        System.out.print((i + j) % 2 == 0 ? \"1\" : \"0\");\n        System.out.print(\" \");\n    }\n    System.out.println();\n}";
    o.content.choices = [
      { id: "alt", label: "Rows alternate: \"1 0 1 0\", then \"0 1 0 1\", and so on" },
      { id: "all1", label: "Every row prints \"1 1 1 1\"" },
      { id: "all0", label: "Every row prints \"0 0 0 0\"" },
    ];
    o.content.prompt = "The program runs with rows = 4 and columns = 4. What does it print?";
  }
});

for (const rel of [
  "chapters/code-quest/subjects/java/levels/code-builder/level-001.level.js",
  "chapters/code-quest/subjects/java/levels/output-detective/level-001.level.js",
]) await edit(rel, (o) => { o.rewards = { ...o.rewards, xp: 10 }; });

const keyPoints = {
  "java-int-007": ["JVM executes bytecode at runtime", "JRE = JVM plus core libraries to run programs", "JDK = JRE plus dev tools like javac, jar, debuggers", "Answer notes the developer needs the JDK to compile and package"],
  "dbms-int-007": ["Defines normalization goal (reduce redundancy, avoid anomalies)", "Names at least 1NF, 2NF, 3NF with the rule each enforces", "Gives a small example or functional-dependency reasoning", "Mentions trade-off such as joins vs redundancy (denormalization)"],
  "dsa-int-007": ["States the data structure choice explicitly", "Justifies choice with the operations needed and their complexity", "Mentions time and/or space trade-offs", "Notes an alternative and why it was rejected"],
  "js-int-007": ["Explains event loop with call stack, task queue, microtask queue", "Distinguishes macrotasks (setTimeout) from microtasks (Promise.then)", "Predicts correct output order using those rules", "Mentions non-blocking I/O being delegated to browser/node APIs"],
  "sql-int-007": ["Distinguishes filtering rows (WHERE) from filtering groups (HAVING)", "Explains execution order: WHERE before aggregation, HAVING after", "Uses GROUP BY alongside HAVING in the example", "Gives a correct sample query"],
};
for (const file of ["dbms", "dsa", "java", "javascript", "sql"]) {
  const rel = `interviews/questions/${file}.question.js`;
  const p = join(ROOT, rel);
  const arr = await load(p);
  for (const item of arr) if (keyPoints[item.id]) item.keyPoints = keyPoints[item.id];
  writeFileSync(p, `export default ${JSON.stringify(arr, null, 2)};\n`);
}
console.log("patched");
