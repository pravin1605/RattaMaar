import { useNavigate, useParams } from "react-router-dom";
import { getSubjects } from "./registry/subjectRegistry";
import { getGameModes } from "./registry/gameModeRegistry";
import { getLevelsForMode, getLevelsForSubject } from "./registry/levelRegistry";
import { getInterviewQuestionCount } from "./registry/interviewQuestionRegistry";
import { getPracticeProgress, getLevelAvailability } from "./services/practiceProgressService";
import { getPracticeMapPath } from "./navigationHelpers";

export default function ProgrammingSubject() {
  const subjects = getSubjects();
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const subject = subjects.find((item) => item.id === subjectId);
  const modes = getGameModes();
  const progress = getPracticeProgress();
  if (!subject) return <div className="pu-page"><div className="pu-empty-state"><h1>Subject not found</h1><p>This subject may have been removed or is not registered yet.</p><button type="button" className="pu-primary-btn" onClick={() => navigate('/programming/subjects')}>Back to subjects</button></div></div>;

  const activeModes = modes.map((mode) => {
    const levels = getLevelsForMode(subject.id, mode.id).filter((level) => (level.chapterId || "code-quest") === "code-quest").sort((a, b) => a.levelNumber - b.levelNumber || a.id.localeCompare(b.id));
    const completed = levels.filter((level) => progress.completedLevelIds.includes(level.id)).length;
    const first = levels.find((level) => getLevelAvailability(level, levels).unlocked);
    return { ...mode, levels, completed, first };
  }).filter((mode) => mode.levels.length);

  const totalLevels = activeModes.reduce((total, mode) => total + mode.levels.length, 0);
  const completedLevels = activeModes.reduce((total, mode) => total + mode.completed, 0);
  const patternLevels = getLevelsForSubject(subject.id).filter((level) => level.chapterId === "pattern-lab");
  const interviewCount = getInterviewQuestionCount(subject.id);
  const hasCodeQuest = activeModes.length > 0;
  const hasPatternLab = patternLevels.length > 0;
  const hasInterviews = interviewCount > 0;
  const hasAnyDestination = hasCodeQuest || hasPatternLab || hasInterviews;
  const enc = encodeURIComponent(subject.id);

  return <div className="pu-page pu-subject-launchpad">
    <button type="button" className="pu-back-link" onClick={() => navigate('/programming/subjects')}>← All subjects</button>
    <section className="pu-subject-hero"><span className="pu-subject-icon pu-subject-large" aria-hidden="true">{subject.icon}</span><div className="pu-subject-hero-copy"><span className="pu-eyebrow">SUBJECT WORKSPACE</span><h1>{subject.name}</h1><p>{subject.description}</p>
      <div className="pu-subject-pills">{subject.category && <span>{subject.category}</span>}<span>{hasCodeQuest || hasPatternLab ? "Playable challenges available" : hasInterviews ? "Interview questions available" : "Learning pack planned"}</span></div>
      {hasCodeQuest && <div className="pu-subject-overall-progress"><div className="pu-subject-progress-track"><span style={{ width: `${totalLevels ? Math.round(completedLevels / totalLevels * 100) : 0}%` }} /></div><small>{completedLevels} of {totalLevels} Code Quest levels completed</small></div>}
    </div></section>

    <section className="pu-section pu-launchpad-section"><div className="pu-section-heading"><div><span className="pu-eyebrow">YOUR LEARNING PATHS</span><h2>What would you like to practice?</h2><p>Only activities that exist for {subject.name} are shown.</p></div></div>
      {hasAnyDestination ? <div className="pu-launchpad-grid">
        {hasCodeQuest && <article className="pu-launchpad-card pu-launchpad-code"><div className="pu-launchpad-card-top"><span className="pu-chapter-card-icon" aria-hidden="true">{"</>"}</span><span className="pu-eyebrow">CHAPTER 01</span></div><h3>Code Quest</h3><p>Predict outputs, debug programs and strengthen your programming logic.</p><div className="pu-launchpad-meta"><span>{activeModes.length} game modes</span><span>{totalLevels} levels</span></div><button type="button" className="pu-primary-btn" onClick={() => navigate(`/programming/chapters/code-quest?subject=${enc}`)}>Explore Code Quest <span aria-hidden="true">↗</span></button></article>}
        {hasPatternLab && <article className="pu-launchpad-card pu-launchpad-pattern"><div className="pu-launchpad-card-top"><span className="pu-chapter-card-icon" aria-hidden="true">▦</span><span className="pu-eyebrow">CHAPTER 02</span></div><h3>Pattern &amp; Series Lab</h3><p>Row-by-row pattern, number-property, digit-logic and series challenges.</p><div className="pu-launchpad-meta"><span>{new Set(patternLevels.map((level) => level.categoryId)).size} categories</span><span>{patternLevels.length} levels</span></div><button type="button" className="pu-primary-btn" onClick={() => navigate(`/programming/chapters/pattern-lab?subject=${enc}`)}>Explore Pattern Lab <span aria-hidden="true">↗</span></button></article>}
        {hasInterviews && <article className="pu-launchpad-card pu-launchpad-interview"><div className="pu-launchpad-card-top"><span className="pu-chapter-card-icon" aria-hidden="true">Q/A</span><span className="pu-eyebrow">INTERVIEW PREPARATION</span></div><h3>{subject.name} interview practice</h3><p>Categorized questions with model answers, explanations and difficulty filters.</p><div className="pu-launchpad-meta"><span>{interviewCount} questions</span><span>Interview practice</span></div><button type="button" className={hasCodeQuest || hasPatternLab ? "pu-secondary-btn" : "pu-primary-btn"} onClick={() => navigate(`/programming/interviews?subject=${enc}`)}>Practice interviews <span aria-hidden="true">↗</span></button></article>}
      </div> : <div className="pu-empty-state"><h2>Learning pack coming later</h2><p>{subject.name} is in the catalogue, but no coding levels or interview questions have been connected yet.</p><button type="button" className="pu-secondary-btn" onClick={() => navigate('/programming/subjects')}>Choose another subject</button></div>}
    </section>

    {hasCodeQuest && <section className="pu-section pu-subject-modes"><div className="pu-section-heading"><div><span className="pu-eyebrow">CODE QUEST · GAME MODES</span><h2>Jump straight into a game mode</h2><p>Select a mode to open its level map.</p></div></div>
      <div className="pu-mode-list">{activeModes.map((mode) => <article className="pu-mode-row" key={mode.id}><span className="pu-mode-icon" aria-hidden="true">{mode.icon}</span><div className="pu-mode-row-copy"><strong>{mode.title}</strong><p>{mode.description}</p><small>{mode.completed} OF {mode.levels.length} LEVELS COMPLETED</small></div><button type="button" onClick={() => navigate(getPracticeMapPath(subject.id, mode.id))}>{mode.completed === mode.levels.length ? "Review" : "Explore"} {mode.levels.length} ↗</button></article>)}</div>
    </section>}
  </div>;
}