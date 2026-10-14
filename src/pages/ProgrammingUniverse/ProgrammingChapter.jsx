import { useMemo } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getLevels } from "./registry/levelRegistry";
import { getSubjectById } from "./registry/subjectRegistry";
import { getPatternCategories } from "./registry/gameModeRegistry";
import { getPracticeProgress, getLevelAvailability } from "./services/practiceProgressService";
import { getLevelMapPath, getPathId, getPathKey } from "./navigationHelpers";

const chapters = {
  "code-quest": { title: "Code Quest", eyebrow: "CHAPTER 01 · PROGRAMMING PRACTICE", icon: "</>", intro: "Learn programming through playable challenges: predict output, find bugs, complete code and build stronger problem-solving habits.", color: "blue", goals: ["Understand syntax and core concepts", "Trace code and predict output", "Find and repair common bugs", "Build problem-solving confidence"] },
  "pattern-lab": { title: "Pattern & Series Lab", eyebrow: "CHAPTER 02 · VISUAL LOGIC PRACTICE", icon: "▦", intro: "Master star printing, number patterns, alphabet patterns, mathematical series and nested loops through visual, interactive practice.", color: "violet", goals: ["Understand row and column relationships", "Trace nested loops step by step", "Print number and character patterns", "Solve series and loop-logic challenges"] },
};

const formatLabel = (value) => String(value).replaceAll("-", " ").replace(/\b\w/g, (c) => c.toUpperCase());
const byLevel = (a, b) => a.levelNumber - b.levelNumber || a.id.localeCompare(b.id);

export default function ProgrammingChapter() {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [params, setParams] = useSearchParams();
  const chapter = chapters[chapterId];
  const allLevels = getLevels();
  const progress = getPracticeProgress();
  const completedSet = new Set(progress.completedLevelIds);
  const subjectFilter = params.get("subject");
  const selectedKey = params.get("path");

  const levels = useMemo(() => allLevels.filter((level) => (level.chapterId || "code-quest") === chapterId).sort((a, b) => a.subjectId.localeCompare(b.subjectId) || a.modeId.localeCompare(b.modeId) || byLevel(a, b)), [chapterId, allLevels]);

  const paths = useMemo(() => {
    const map = new Map();
    levels.forEach((level) => {
      const key = getPathKey(level);
      if (!map.has(key)) map.set(key, { key, subjectId: level.subjectId, pathId: getPathId(level), levels: [] });
      map.get(key).levels.push(level);
    });
    const list = [...map.values()].map((path) => ({ ...path, levels: path.levels.sort(byLevel) }));
    if (chapterId === "pattern-lab") {
      const order = getPatternCategories().map((category) => category.id);
      return list.sort((a, b) => (order.indexOf(a.pathId) + 1 || order.length + 1) - (order.indexOf(b.pathId) + 1 || order.length + 1));
    }
    return list;
  }, [levels, chapterId]);

  const categories = getPatternCategories();
  const selectedPath = paths.find((path) => path.key === selectedKey) || null;
  const visiblePaths = subjectFilter ? paths.filter((path) => path.subjectId === subjectFilter) : paths;
  const filterSubject = subjectFilter ? getSubjectById(subjectFilter) : null;
  const chapterCompleted = levels.filter((level) => completedSet.has(level.id)).length;
  const chapterPercent = levels.length ? Math.round(chapterCompleted / levels.length * 100) : 0;

  const pathLabel = (path) => chapterId === "pattern-lab" ? categories.find((category) => category.id === path.pathId)?.title || formatLabel(path.pathId) : formatLabel(path.pathId);
  const pathStats = (path) => {
    const done = path.levels.filter((level) => completedSet.has(level.id)).length;
    const totalXp = path.levels.reduce((sum, level) => sum + Number(level.rewards?.xp || 0), 0);
    const earnedXp = path.levels.filter((level) => completedSet.has(level.id)).reduce((sum, level) => sum + Number(level.rewards?.xp || 0), 0);
    const next = path.levels.find((level) => !completedSet.has(level.id) && getLevelAvailability(level, path.levels).unlocked);
    return { done, total: path.levels.length, percent: path.levels.length ? Math.round(done / path.levels.length * 100) : 0, totalXp, earnedXp, next };
  };

  // Selecting a path adds one history entry; Back removes it again, so browser Back and the Back link agree.
  const openPath = (path) => { const next = new URLSearchParams(params); next.set("path", path.key); setParams(next, { state: { fromList: true } }); };
  const closePath = () => {
    if (location.state?.fromList && Number(window.history.state?.idx) > 0) { navigate(-1); return; }
    const next = new URLSearchParams(params); next.delete("path"); setParams(next, { replace: true });
  };
  const clearSubjectFilter = () => { const next = new URLSearchParams(params); next.delete("subject"); setParams(next, { replace: true }); };
  const playLevel = (level) => navigate(`/programming/play/${level.id}`, { state: { from: getLevelMapPath(level) } });

  const continueLearning = () => {
    const pool = (selectedPath ? [selectedPath] : visiblePaths.length ? visiblePaths : paths).flatMap((path) => path.levels);
    const open = (level) => !completedSet.has(level.id) && getLevelAvailability(level, levels).unlocked;
    const target = pool.find(open) || levels.find(open);
    if (target) { playLevel(target); return; }
    const review = (selectedPath ? selectedPath.levels : levels).find((level) => getLevelAvailability(level, levels).unlocked);
    if (review) { playLevel(review); return; }
    navigate("/programming/subjects");
  };

  if (!chapter) return <div className="pu-page"><section className="pu-empty-state"><h1>Chapter not found</h1><p>That chapter does not exist.</p><button type="button" className="pu-primary-btn" onClick={() => navigate("/programming")}>Back to Universe</button></section></div>;

  const allDone = levels.length > 0 && chapterCompleted === levels.length;
  const selectedStats = selectedPath ? pathStats(selectedPath) : null;

  return <div className="pu-page pu-chapter-page">
    <button type="button" className="pu-back-link" onClick={() => selectedPath ? closePath() : navigate(subjectFilter ? `/programming/subjects/${encodeURIComponent(subjectFilter)}` : "/programming")}>← {selectedPath ? `All ${chapter.title} paths` : subjectFilter && filterSubject ? `${filterSubject.name} workspace` : "Back to Universe"}</button>

    <section className={`pu-chapter-hero ${chapter.color}`}>
      <span className="pu-chapter-icon" aria-hidden="true">{chapter.icon}</span><span className="pu-eyebrow">{chapter.eyebrow}</span><h1>{chapter.title}</h1><p>{chapter.intro}</p>
      <div className="pu-chapter-stats"><div><strong>{levels.length}</strong><span>Levels</span></div><div><strong>{chapterCompleted}/{levels.length}</strong><span>Completed</span></div><div><strong>{chapterPercent}%</strong><span>Progress</span></div></div>
      <div className="pu-chapter-progress" role="progressbar" aria-label="Chapter completion" aria-valuemin={0} aria-valuemax={100} aria-valuenow={chapterPercent}><span style={{ width: `${chapterPercent}%` }} /></div>
      <button type="button" className="pu-primary-btn" onClick={continueLearning}>{levels.length === 0 ? "Browse subjects ↗" : allDone ? "Review chapter ↗" : "Continue Learning ↗"}</button>
    </section>

    {!selectedPath && <section className="pu-chapter-goals"><div className="pu-section-heading"><div><span className="pu-eyebrow">LEARNING GOALS</span><h2>What you will master</h2></div></div><div className="pu-goal-grid">{chapter.goals.map((goal) => <div key={goal}><span aria-hidden="true">✓</span>{goal}</div>)}</div></section>}

    <section className="pu-section"><div className="pu-section-heading"><div><span className="pu-eyebrow">{selectedPath ? "YOUR LEVEL MAP" : "CHOOSE YOUR PATH"}</span>
      <h2>{selectedPath ? pathLabel(selectedPath) : chapterId === "pattern-lab" ? "Explore pattern categories" : "Choose a subject and mode"}</h2>
      <p>{selectedPath ? "Complete unlocked levels to progress. Each level shows its XP reward and lock status." : filterSubject ? `Showing paths for ${filterSubject.name}.` : "Choose a path to open only its level map."}</p></div>
      {!selectedPath && filterSubject && <button type="button" className="pu-text-link" onClick={clearSubjectFilter}>Show all subjects ↗</button>}</div>

      {!selectedPath && visiblePaths.length > 0 && <div className="pu-chapter-paths pu-chapter-path-picker">{visiblePaths.map((path) => { const stats = pathStats(path); const subject = getSubjectById(path.subjectId); const done = stats.done === stats.total && stats.total > 0;
        return <button type="button" className={`pu-chapter-path-card pu-chapter-path-choice${done ? " pu-path-complete" : ""}`} key={path.key} onClick={() => openPath(path)}>
          <div className="pu-chapter-path-head"><span className="pu-path-badge">{subject?.name || formatLabel(path.subjectId)}</span><span>{done ? "Completed" : `${stats.done}/${stats.total} done`}</span></div>
          <h3>{pathLabel(path)}</h3>
          <div className="pu-path-track" role="progressbar" aria-label={`${pathLabel(path)} progress`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={stats.percent}><span style={{ width: `${stats.percent}%` }} /></div>
          <div className="pu-chapter-path-summary"><span><strong>{stats.total}</strong> levels</span><span><strong>{stats.earnedXp}</strong> / {stats.totalXp} XP</span></div>
          <span className="pu-chapter-path-open">{done ? "Review level map" : "Open level map"}<span aria-hidden="true"> ↗</span></span>
        </button>; })}</div>}

      {!selectedPath && paths.length > 0 && visiblePaths.length === 0 && <div className="pu-empty-state"><h2>No {chapter.title} paths for {filterSubject?.name || "this subject"}</h2><p>That subject has no levels in this chapter yet.</p><div className="pu-empty-actions"><button type="button" className="pu-primary-btn" onClick={clearSubjectFilter}>Show all paths</button><button type="button" className="pu-secondary-btn" onClick={() => navigate("/programming/subjects")}>Choose another subject</button></div></div>}

      {selectedPath && <div className="pu-selected-path">
        <div className="pu-selected-path-summary"><div><span className="pu-eyebrow">{getSubjectById(selectedPath.subjectId)?.name || formatLabel(selectedPath.subjectId)}</span><h3>{pathLabel(selectedPath)}</h3><p>{selectedStats.done} of {selectedStats.total} levels completed · {selectedStats.earnedXp} of {selectedStats.totalXp} XP earned</p></div>{selectedStats.next && <button type="button" className="pu-primary-btn" onClick={() => playLevel(selectedStats.next)}>Continue ↗</button>}</div>
        <div className="pu-topic-list">{selectedPath.levels.map((level) => { const state = getLevelAvailability(level, selectedPath.levels); const isDone = completedSet.has(level.id) || state.completed; const playable = state.unlocked || isDone;
          const cls = ["pu-topic-item", "pu-level-list-item", isDone ? "pu-level-complete" : !state.unlocked ? "pu-level-locked" : "", selectedStats.next?.id === level.id ? "pu-level-current" : ""].filter(Boolean).join(" ");
          return <article key={level.id} className={cls}><span>{isDone ? "✓" : String(level.levelNumber).padStart(2, "0")}</span>
            <div className="pu-selected-level-copy"><strong>{level.title}</strong><small>{level.difficulty} · {level.challengeType} · {level.rewards?.xp || 0} XP</small>{!playable && <small>{state.reason || "Complete the previous level to unlock"}</small>}</div>
            <button type="button" className="pu-level-play-btn" disabled={!playable} onClick={() => playLevel(level)}>{isDone ? "Replay" : state.unlocked ? "Play" : "Locked"}</button></article>; })}</div>
      </div>}

      {!paths.length && <div className="pu-empty-state"><h2>Playable levels are being prepared</h2><p>This chapter will list validated level files as they are added. You can still explore the subject catalogue and Interview Lab.</p><button type="button" className="pu-secondary-btn" onClick={() => navigate("/programming/subjects")}>Browse subjects</button></div>}
    </section>
  </div>;
}