import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLevels } from "./registry/levelRegistry";
import { getSubjectById } from "./registry/subjectRegistry";
import { getPatternCategories } from "./registry/gameModeRegistry";
import { getPracticeProgress, getLevelAvailability } from "./services/practiceProgressService";

const chapters = {
  "code-quest": { title: "Code Quest", eyebrow: "CHAPTER 01 · PROGRAMMING PRACTICE", icon: "</>", intro: "Learn programming through playable challenges: predict output, find bugs, complete code and build stronger problem-solving habits.", color: "blue", goals: ["Understand syntax and core concepts", "Trace code and predict output", "Find and repair common bugs", "Build problem-solving confidence"] },
  "pattern-lab": { title: "Pattern & Series Lab", eyebrow: "CHAPTER 02 · VISUAL LOGIC PRACTICE", icon: "▦", intro: "Master star printing, number patterns, alphabet patterns, mathematical series and nested loops through visual, interactive practice.", color: "violet", goals: ["Understand row and column relationships", "Trace nested loops step by step", "Print number and character patterns", "Solve series and loop-logic challenges"] }
};

export default function ProgrammingChapter() {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const chapter = chapters[chapterId];
  const allLevels = getLevels();
  const levels = useMemo(() => allLevels.filter((level) => (level.chapterId || "code-quest") === chapterId).sort((a,b) => a.subjectId.localeCompare(b.subjectId) || a.modeId.localeCompare(b.modeId) || a.levelNumber-b.levelNumber || a.id.localeCompare(b.id)), [chapterId, allLevels]);
  const progress = getPracticeProgress();
  const completed = levels.filter(level => progress.completedLevelIds.includes(level.id)).length;
  const grouped = useMemo(() => {
    const map = new Map();
    levels.forEach(level => {
      const pathKey = chapterId === "pattern-lab" ? (level.categoryId || "uncategorised") : level.modeId;
      const key = `${level.subjectId}::${pathKey}`;
      if (!map.has(key)) map.set(key, { key, subjectId: level.subjectId, pathId: pathKey, levels: [] });
      map.get(key).levels.push(level);
    });
    if (chapterId === "pattern-lab") {
      const order = getPatternCategories().map((category) => category.id);
      return [...map.values()].sort((a, b) => (order.indexOf(a.pathId) + 1 || order.length + 1) - (order.indexOf(b.pathId) + 1 || order.length + 1));
    }
    return [...map.values()];
  }, [levels, chapterId]);
  if (!chapter) return <div className="pu-page"><section className="pu-empty-state"><h1>Chapter not found</h1><button className="pu-primary-btn" onClick={() => navigate('/programming')}>Back to Universe</button></section></div>;
  return <div className="pu-page pu-chapter-page">
    <button className="pu-back-link" onClick={() => navigate('/programming')}>← Back to Universe</button>
    <section className={`pu-chapter-hero ${chapter.color}`}>
      <span className="pu-chapter-icon">{chapter.icon}</span><span className="pu-eyebrow">{chapter.eyebrow}</span><h1>{chapter.title}</h1><p>{chapter.intro}</p>
      <div className="pu-chapter-stats"><div><strong>{levels.length}</strong><span>playable levels</span></div><div><strong>{completed}/{levels.length}</strong><span>completed</span></div><div><strong>{levels.length ? Math.round(completed/levels.length*100) : 0}%</strong><span>chapter progress</span></div></div>
      <div className="pu-chapter-progress"><span style={{width:`${levels.length ? completed/levels.length*100 : 0}%`}} /></div>
      <button className="pu-primary-btn" onClick={() => { const next = levels.find(level => !progress.completedLevelIds.includes(level.id) && getLevelAvailability(level, levels).unlocked) || levels.find(level => getLevelAvailability(level, levels).unlocked); if (next) navigate(`/programming/play/${next.id}`); else navigate('/programming/subjects'); }}>{levels.length ? "Continue chapter ↗" : "Browse subjects ↗"}</button>
    </section>
    <section className="pu-chapter-goals"><div className="pu-section-heading"><div><span className="pu-eyebrow">LEARNING GOALS</span><h2>What you will master</h2></div></div><div className="pu-goal-grid">{chapter.goals.map(goal => <div key={goal}><span>✓</span>{goal}</div>)}</div></section>
    <section className="pu-section"><div className="pu-section-heading"><div><span className="pu-eyebrow">SUBJECT → GAME MODE → LEVELS</span><h2>Your playable paths</h2><p>Choose a subject and game mode. Complete unlocked levels to progress through that path.</p></div></div>
      {grouped.length ? <div className="pu-chapter-paths">{grouped.map(group => {
        const subject = getSubjectById(group.subjectId);
        const pathLabel = chapterId === "pattern-lab" ? (getPatternCategories().find((category) => category.id === group.pathId)?.title || group.pathId) : group.pathId.replaceAll('-', ' ').replace(/\b\w/g,c=>c.toUpperCase());
        const sortedLevels = [...group.levels].sort((a,b) => a.levelNumber-b.levelNumber || a.id.localeCompare(b.id));
        const done = sortedLevels.filter(level => progress.completedLevelIds.includes(level.id)).length;
        const first = sortedLevels.find(level => getLevelAvailability(level, sortedLevels).unlocked);
        return <article className="pu-chapter-path-card" key={group.key}>
          <div className="pu-chapter-path-head"><span className="pu-path-badge">{subject?.name || group.subjectId}</span><span>{done}/{sortedLevels.length} complete</span></div>
          <h3>{pathLabel}</h3>
          <div className="pu-path-track"><span style={{width:`${sortedLevels.length ? done/sortedLevels.length*100 : 0}%`}} /></div>
          <div className="pu-chapter-levels">{sortedLevels.map(level => { const state=getLevelAvailability(level, sortedLevels); return <div key={level.id} className={`pu-chapter-level ${state.completed?'completed':state.unlocked?'unlocked':'locked'}`}><span className="pu-chapter-level-number">{state.completed?'✓':String(level.levelNumber).padStart(2,'0')}</span><div><strong>{level.title}</strong><small>{level.difficulty} · {level.rewards?.xp||0} XP</small></div><button disabled={!state.unlocked} onClick={()=>navigate(`/programming/play/${level.id}`)}>{state.completed?'Replay':state.unlocked?'Play':'Locked'}</button></div>; })}</div>
          {first && <button className="pu-secondary-btn pu-path-continue" onClick={()=>navigate(`/programming/play/${first.id}`)}>Open learning path ↗</button>}
        </article>;
      })}</div> : <div className="pu-empty-state"><h2>Playable levels are being prepared</h2><p>This chapter will list validated level files as they are added. You can still explore the subject catalogue and Interview Lab.</p><button className="pu-secondary-btn" onClick={() => navigate('/programming/subjects')}>Browse subjects</button></div>}
    </section>
  </div>;
}
