import { useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getSubjects } from "./registry/subjectRegistry";
import { getGameModes } from "./registry/gameModeRegistry";
import { getLevelsForMode } from "./registry/levelRegistry";
import { getLevelAvailability } from "./services/practiceProgressService";

export default function ProgrammingPractice() {
  const subjects = getSubjects();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const selectedSubject = subjects.find((subject) => subject.id === params.get('subject'));
  const selectedModeId = params.get('mode');
  const modes = getGameModes();
  const selectedMode = modes.find((mode) => mode.id === selectedModeId);
  const levels = useMemo(() => selectedSubject && selectedModeId ? getLevelsForMode(selectedSubject.id, selectedModeId).filter((level) => (level.chapterId || 'code-quest') !== 'pattern-lab').sort((a,b) => a.levelNumber-b.levelNumber || a.id.localeCompare(b.id)) : [], [selectedSubject, selectedModeId]);
  return <div className="pu-page">
    <div className="pu-page-heading"><span className="pu-eyebrow">PRACTICE HUB</span><h1>Choose how to practice.</h1><p>Pick a subject first, then a game mode. The level list is generated from registered challenge files.</p></div>
    <div className="pu-practice-context"><span className="pu-context-icon">⌘</span><div><strong>{selectedSubject ? selectedSubject.name : 'Choose a subject'}</strong><p>{selectedSubject ? 'Game modes below show available challenges for this subject.' : 'Select a subject to filter the practice modes and level packs.'}</p></div><button onClick={() => navigate('/programming/subjects')}>Choose subject ↗</button></div>
    <div className="pu-mode-grid pu-mode-grid-large">{modes.filter((mode) => mode.available).map((mode) => {
      const count = selectedSubject ? getLevelsForMode(selectedSubject.id, mode.id).filter((level) => (level.chapterId || 'code-quest') !== 'pattern-lab').length : 0;
      return <article className="pu-mode-card" key={mode.id}><span className="pu-mode-icon">{mode.icon}</span><span className="pu-mode-tag">{mode.tag}</span><strong>{mode.title}</strong><small>{mode.description}</small><button onClick={() => selectedSubject ? navigate(`/programming/practice?subject=${selectedSubject.id}&mode=${mode.id}`) : navigate('/programming/subjects')}>{selectedSubject ? `${count} available levels · Select ↗` : 'Choose subject ↗'}</button></article>;
    })}</div>
    {selectedSubject && selectedMode && <section className="pu-section pu-registered-levels"><div className="pu-section-heading"><div><span className="pu-eyebrow">{selectedSubject.name.toUpperCase()} · {selectedMode.title.toUpperCase()}</span><h2>{levels.length} available level{levels.length === 1 ? '' : 's'}</h2><p>Play an unlocked level, review its explanation, then continue to the next level in this subject and game mode.</p></div></div>
      {levels.length ? <div className="pu-topic-list">{levels.map((level) => { const state = getLevelAvailability(level, levels); return <article className={`pu-topic-item pu-level-list-item ${state.completed ? 'pu-level-complete' : state.unlocked ? '' : 'pu-level-locked'}`} key={level.id}><span>{state.completed ? '✓' : String(level.levelNumber).padStart(3,'0')}</span><strong>{level.title}</strong><small>{level.difficulty} · {level.challengeType} · {level.rewards?.xp || 0} XP · {state.completed ? 'Completed' : state.unlocked ? 'Unlocked' : state.reason}</small><button className="pu-level-play-btn" disabled={!state.unlocked} onClick={() => navigate(`/programming/play/${level.id}`)}>{state.completed ? 'Replay ↗' : state.unlocked ? 'Play level ↗' : 'Locked'}</button></article>; })}</div> : <div className="pu-empty-state"><strong>No levels registered for this mode yet</strong><p>Choose another game mode or explore Interview Lab for more practice.</p><button className="pu-secondary-btn" onClick={() => navigate(`/programming/interviews?subject=${selectedSubject.id}`)}>Try interview questions ↗</button></div>}
    </section>}
    <section className="pu-interview-subject-cta"><div><span className="pu-eyebrow">NEED INTERVIEW PRACTICE?</span><h2>Open the dynamic Interview Lab</h2><p>Filter technical questions by subject and difficulty, check your answers, and read model explanations.</p></div><button className="pu-primary-btn" onClick={() => navigate(`/programming/interviews${selectedSubject ? `?subject=${selectedSubject.id}` : ''}`)}>Interview Lab ↗</button></section>
  </div>;
}
