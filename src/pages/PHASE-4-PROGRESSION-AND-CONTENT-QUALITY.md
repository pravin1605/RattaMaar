# Programming Universe — Phase 4

## Included
- Topic/mode level map with visual completion progress.
- Sequential unlocking: the first registered level is open; a later level requires the previous registered level in the same subject/topic/mode to be completed. Completed levels can be replayed. Direct URL access checks the same rule.
- Subject topic cards expose a path button for each mode with registered levels.
- Challenge contract now recognizes true/false, fill-in-blank, variable tracing, and debug-output challenge labels, plus case-insensitive text, contains-text, and numeric-tolerance evaluators. Submitted code is still never executed.
- Content contract checks choice shape and unique code-block IDs. The registry reports invalid/duplicate level modules; Progress and level-map screens display diagnostics.
- Existing Vite glob discovery remains automatic. Adding a `.level.js` file requires no central registry edits.

## Level authoring
Create a file matching the existing glob, for example:
`src/pages/ProgrammingUniverse/subjects/java-fundamentals/levels/bug-hunter/syntax-basics/level-002.level.js`

Use a unique `id`, the exact subject/mode/topic IDs, an integer `levelNumber`, a supported `challengeType`, a supported evaluation strategy, `hints: []`, `explanation.summary`, and optional `rewards.xp`. Level numbering should increase within a topic/mode path.

## Progress storage
Guest progress remains local to the browser under `notes-web-programming-progress`. Cloud sync and cross-device identity are not part of this phase.

## Validation status
This is a source-only ZIP based on the supplied `src` snapshot. Syntax parsing and ZIP integrity are checked; a full Vite production build/browser test cannot be confirmed without the original project's package manifest, Vite config, and HTML entry point.
