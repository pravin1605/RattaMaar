import { useEffect, useMemo } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { getSubjects } from "./registry/subjectRegistry";
import { getGameModes } from "./registry/gameModeRegistry";
import { getLevelsForMode } from "./registry/levelRegistry";
import { getPracticeProgress, getLevelAvailability } from "./services/practiceProgressService";
import { getPracticeMapPath } from "./navigationHelpers";

const isCodeQuest = (level) => (level.chapterId || "code-quest") !== "pattern-lab";

export default function ProgrammingPractice() {
  const subjects = getSubjects();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedSubject = subjects.find((subject) => subject.id === params.get("subject")) || null;
  const selectedModeId = params.get("mode");
  const modes = getGameModes();
  const selectedMode = modes.find((mode) => mode.id === selectedModeId) || null;
  const completed = new Set(getPracticeProgress().completedLevelIds);

  // Practice is contextual: without a subject there is nothing to practise yet, so go to the picker.
  useEffect(() => { if (!selectedSubject) navigate("/programming/subjects", { replace: true }); }, [selectedSubject, navigate]);

  const availableModes = useMemo(() => selectedSubject ? modes
    .map((mode) => ({ ...mode, levels: getLevelsForMode(selectedSubject.id, mode.id).filter(isCodeQuest) }))
    .filter((mode) => mode.levels.length)
    .map((mode) => ({ ...mode, completedCount: mode.levels.filter((level) => completed.has(level.id)).length })) : [], [selectedSubject, modes]); // eslint-disable-line react-hooks/exhaustive-deps

  const levels = useMemo(() => selectedSubject && selectedMode ? getLevelsForMode(selectedSubject.id, selectedMode.id).filter(isCodeQuest).sort((a, b) => a.levelNumber - b.levelNumber || a.id.localeCompare(b.id)) : [], [selectedSubject, selectedMode]);

  if (!selectedSubject) return null;
  const invalidMode = Boolean(selectedModeId && !selectedMode);
  const enc = encodeURIComponent(selectedSubject.id);
  const here = `${location.pathname}${location.search}`;
  const firstOpenId = levels.find((level) => !completed.has(level.id) && getLevelAvailability(level, levels).unlocked)?.id;

  return <div className="pu-page pu-practice-page">
    <button type="button" className="pu-back-link" onClick={() => navigate(selectedMode ? `/programming/practice?subject=${enc}` : `/programming/subjects/${enc}`)}>← {selectedMode ? "All game modes" : "Subject workspace"}</button>
    <div className="pu-page-heading"><span className="pu-eyebrow">{selectedSubject.name.toUpperCase()} · CODE QUEST</span><h1>{selectedMode ? `${selectedMode.title} levels` : "Choose a game mode."}</h1><p>{selectedMode ? `Play an unlocked ${selectedMode.title} level in ${selectedSubject.name} or replay a completed one.` : `Only game modes with registered levels for ${selectedSubject.name} are shown.`}</p></div>
    <div className="pu-practice-context"><span className="pu-context-icon" aria-hidden="true">{selectedSubject.icon || "⌘"}</span><div><strong>{selectedSubject.name}</strong><p>{selectedMode ? `${selectedMode.title} · ${levels.length} registered level${levels.length === 1 ? "" : "s"}` : "Choose a game mode to open its level map."}</p></div>{!selectedMode && <button type="button" onClick={() => navigate(`/programming/subjects/${enc}`)}>Subject workspace ↗</button>}</div>

    {invalidMode && <div className="pu-empty-state"><strong>Game mode unavailable</strong><p>That mode is not available. Choose another mode for {selectedSubject.name}.</p><button type="button" className="pu-primary-btn" onClick={() => navigate(`/programming/practice?subject=${enc}`, { replace: true })}>Choose another mode</button></div>}

    {!selectedMode && !invalidMode && (availableModes.length ? <section className="pu-section"><div className="pu-section-heading"><div><span className="pu-eyebrow">CHOOSE YOUR CHALLENGE TYPE</span><h2>{availableModes.length} game mode{availableModes.length === 1 ? "" : "s"} available</h2><p>Each mode has its own levels and progression.</p></div></div>
      <div className="pu-mode-grid pu-mode-grid-large">{availableModes.map((mode) => { const percent = Math.round(mode.completedCount / mode.levels.length * 100); return <article className="pu-mode-card" key={mode.id}><span className="pu-mode-icon" aria-hidden="true">{mode.icon}</span><span className="pu-mode-tag">{mode.tag}</span><strong>{mode.title}</strong><small>{mode.description}</small>
        <div className="pu-mode-progress"><span>{mode.completedCount} / {mode.levels.length} completed</span><span>{percent}%</span></div><div className="pu-subject-progress-track"><span style={{ width: `${percent}%` }} /></div>
        <button type="button" onClick={() => navigate(getPracticeMapPath(selectedSubject.id, mode.id))}>{mode.levels.length} levels · View map ↗</button></article>; })}</div></section>
      : <div className="pu-empty-state"><strong>No coding levels available yet</strong><p>{selectedSubject.name} has no registered Code Quest levels. Interview practice may still be available.</p><button type="button" className="pu-primary-btn" onClick={() => navigate(`/programming/interviews?subject=${enc}`)}>Open Interview Lab ↗</button></div>)}

    {selectedMode && <section className="pu-section pu-registered-levels"><div className="pu-section-heading"><div><span className="pu-eyebrow">LEVEL MAP</span><h2>{levels.length} available level{levels.length === 1 ? "" : "s"}</h2><p>Complete unlocked challenges to continue through this subject and game mode.</p></div></div>
      {levels.length ? <div className="pu-topic-list">{levels.map((level) => { const state = getLevelAvailability(level, levels); const isDone = state.completed || completed.has(level.id); const cls = ["pu-topic-item", "pu-level-list-item", isDone ? "pu-level-complete" : "", !state.unlocked ? "pu-level-locked" : "", level.id === firstOpenId ? "pu-level-current" : ""].filter(Boolean).join(" ");
        return <article className={cls} key={level.id}><span>{isDone ? "✓" : String(level.levelNumber).padStart(3, "0")}</span><strong>{level.title}</strong><small>{level.difficulty} · {level.challengeType} · {level.rewards?.xp || 0} XP · {isDone ? "Completed" : state.unlocked ? "Unlocked" : state.reason}</small>
          <button type="button" className="pu-level-play-btn" disabled={!state.unlocked && !isDone} onClick={() => navigate(`/programming/play/${level.id}`, { state: { from: here } })}>{isDone ? "Replay ↗" : state.unlocked ? "Play level ↗" : "Locked"}</button></article>; })}</div>
        : <div className="pu-empty-state"><strong>No levels registered for this mode yet</strong><p>Choose another game mode or explore the Interview Lab.</p><button type="button" className="pu-secondary-btn" onClick={() => navigate(`/programming/practice?subject=${enc}`)}>Choose another mode</button></div>}
    </section>}

    <section className="pu-interview-subject-cta"><div><span className="pu-eyebrow">NEED INTERVIEW PRACTICE?</span><h2>Open the Interview Lab</h2><p>Filter technical questions by subject and difficulty, check your answers and read model explanations.</p></div><button type="button" className="pu-secondary-btn" onClick={() => navigate(`/programming/interviews?subject=${enc}`)}>Interview Lab ↗</button></section>
  </div>;
}