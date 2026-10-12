import { useNavigate, useParams } from "react-router-dom";
import { getSubjects } from "./registry/subjectRegistry";
import { getGameModes } from "./registry/gameModeRegistry";
import { getLevelsForMode } from "./registry/levelRegistry";
import { getPracticeProgress, getLevelAvailability } from "./services/practiceProgressService";

const interviewSubjectIds = new Set(["java-fundamentals", "sql", "dsa", "dbms", "javascript"]);

export default function ProgrammingSubject() {
  const subjects = getSubjects();
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const subject = subjects.find((item) => item.id === subjectId);
  const modes = getGameModes();
  const progress = getPracticeProgress();
  if (!subject) return <div className="pu-page"><div className="pu-empty-state"><h1>Subject not found</h1><button className="pu-primary-btn" onClick={() => navigate('/programming/subjects')}>Back to subjects</button></div></div>;
  const activeModes = modes.map((mode) => {
    const levels = getLevelsForMode(subject.id, mode.id).filter((level) => (level.chapterId || "code-quest") === "code-quest").sort((a,b) => a.levelNumber-b.levelNumber || a.id.localeCompare(b.id));
    const completed = levels.filter((level) => progress.completedLevelIds.includes(level.id)).length;
    const first = levels.find((level) => getLevelAvailability(level, levels).unlocked);
    return { ...mode, levels, completed, first };
  }).filter((mode) => mode.levels.length);
  return <div className="pu-page">
    <button className="pu-back-link" onClick={() => navigate('/programming/subjects')}>← All subjects</button>
    <section className="pu-subject-hero"><span className="pu-subject-icon pu-subject-large">{subject.icon}</span><div><span className="pu-eyebrow">SUBJECT WORKSPACE</span><h1>{subject.name}</h1><p>{subject.description}</p><div className="pu-subject-pills"><span>{subject.category}</span><span>{subject.status === 'active' ? 'Playable challenges available' : subject.status === 'interview-ready' ? 'Interview questions available' : 'Learning pack planned'}</span></div></div></section>
    <section className="pu-section"><div className="pu-section-heading"><div><span className="pu-eyebrow">SELECT A GAME MODE</span><h2>How would you like to practice?</h2><p>Choose a game mode to see its available levels. No NotesWeb note titles are used in this learning catalogue.</p></div></div>
      {activeModes.length ? <div className="pu-mode-list">{activeModes.map((mode) => <article className="pu-mode-row" key={mode.id}><span className="pu-mode-icon">{mode.icon}</span><div className="pu-mode-row-copy"><strong>{mode.title}</strong><p>{mode.description}</p><small>{mode.completed} OF {mode.levels.length} LEVELS COMPLETED</small></div><button onClick={() => navigate(`/programming/practice?subject=${subject.id}&mode=${mode.id}`)}>Explore {mode.levels.length} ↗</button></article>)}</div> : <div className="pu-empty-state"><h2>No general challenges yet</h2><p>This subject is in the catalogue. Its game levels can be added as dynamic files without changing the subject page.</p></div>}
    </section>
    {interviewSubjectIds.has(subject.id) && <section className="pu-interview-subject-cta"><div><span className="pu-eyebrow">TECHNICAL INTERVIEW PREPARATION</span><h2>Practice {subject.name} interview questions</h2><p>Work through categorized questions with difficulty filters, model answers, and detailed explanations.</p></div><button className="pu-primary-btn" onClick={() => navigate(`/programming/interviews?subject=${subject.id}`)}>Open Interview Lab ↗</button></section>}
    {subject.id === 'java-fundamentals' && <section className="pu-interview-subject-cta pu-pattern-cta"><div><span className="pu-eyebrow">CHAPTER 02</span><h2>Practice visual patterns and number series</h2><p>Open the separate Pattern &amp; Series Lab chapter for row-by-row pattern challenges.</p></div><button className="pu-secondary-btn" onClick={() => navigate('/programming/chapters/pattern-lab')}>Open Pattern Lab ↗</button></section>}
  </div>;
}
