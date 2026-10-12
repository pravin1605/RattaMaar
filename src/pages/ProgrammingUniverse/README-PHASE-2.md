# Programming Universe content architecture

The current user-facing hierarchy is **Chapter → Subject → Game Mode → Level**. The chapter determines the learning experience; subjects are a curated Programming Universe catalogue independent of NotesWeb note titles; each game mode has an automatically discovered level pack.

- `registry/subjectRegistry.js`: loads the curated subject catalogue and optional subject configs.
- `registry/gameModeRegistry.js`: exposes shared game modes.
- `registry/levelRegistry.js`: discovers every `*.level.js` file under the Programming Universe tree and validates it.
- `registry/interviewQuestionRegistry.js`: discovers and validates dynamic technical interview question packs.
- `engine.js`: evaluates authored challenge answers without executing arbitrary submitted code.
- `services/practiceProgressService.js`: stores chapter/subject/mode level attempts and XP locally.
- `services/interviewProgressService.js`: stores Interview Lab attempts locally.

To add a level, create a `.level.js` file under `chapters/<chapter-id>/subjects/<subject>/levels/<game-mode>/`. To add interview questions, create a `*.question.js` pack under `interviews/questions/`. Neither action requires editing a central catalogue or creating a React component for each item.
