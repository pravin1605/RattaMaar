import { useNavigate } from "react-router-dom";
import { getSubjects } from "./registry/subjectRegistry";
import { getGameModes, getPatternCategories } from "./registry/gameModeRegistry";
import { getLevels, getLevelById, getLevelsForMode, getLevelsForSubject } from "./registry/levelRegistry";
import { getInterviewQuestionCount } from "./registry/interviewQuestionRegistry";
import { getPracticeProgress, getLevelAvailability } from "./services/practiceProgressService";
import { getInterviewProgress } from "./services/interviewProgressService";
import { evaluateAchievements, buildLearnerStats, getRank } from "./services/achievementsService";

function dailyMission(levels, completedIds) {
  const day = Math.floor(Date.now() / 86400000);
  const playable = levels.filter((level) => getLevelAvailability(level, levels).unlocked);
  const pool = playable.length ? playable : levels;
  const pick = pool[day % pool.length];
  return { level: pick, done: completedIds.includes(pick.id) };
}

/** Most recent valid unfinished activity; falls back to the first open level. Stale saved ids are skipped. */
function getResumeLevel(levels, progress) {
  const done = new Set(progress.completedLevelIds);
  const open = (level) => Boolean(level) && !done.has(level.id) && getLevelAvailability(level, levels).unlocked;
  for (const result of progress.results) {
    const last = levels.find((level) => level.id === result.levelId);
    if (!last) continue;
    if (open(last)) return last;
    const next = levels
      .filter((level) => (level.chapterId || "code-quest") === (last.chapterId || "code-quest") && level.subjectId === last.subjectId && level.modeId === last.modeId && (level.categoryId || null) === (last.categoryId || null))
      .sort((a, b) => a.levelNumber - b.levelNumber || a.id.localeCompare(b.id))
      .find((level) => level.levelNumber > last.levelNumber && open(level));
    if (next) return next;
    break;
  }
  return levels.find(open) || null;
}

export default function ProgrammingHome() {
  const navigate = useNavigate();
  const subjects = getSubjects();
  const levels = getLevels();
  const modes = getGameModes();
  const categories = getPatternCategories();
  const progress = getPracticeProgress();
  const interviewProgress = getInterviewProgress();
  const interviewCount = getInterviewQuestionCount();
  const stats = buildLearnerStats({ ...progress, allLevels: levels }, interviewProgress);
  const { unlocked: unlockedAchievements, newlyUnlocked } = evaluateAchievements(stats);
  const rank = getRank(progress.xp);
  const completedSet = progress.completedLevelIds;
  const nextPlayable = levels.find((level) => !completedSet.includes(level.id) && getLevelAvailability(level, levels).unlocked);
  const resumeLevel = getResumeLevel(levels, progress);
  const hasStarted = progress.results.length > 0 || completedSet.length > 0;
  const featuredSubjects = subjects
    .map((subject) => ({ subject, levelCount: getLevelsForSubject(subject.id).length, questionCount: getInterviewQuestionCount(subject.id) }))
    .filter((item) => item.levelCount || item.questionCount)
    .sort((a, b) => Number(b.levelCount > 0) - Number(a.levelCount > 0))
    .slice(0, 4)
    .map((item) => item.subject);
  const quickModes = modes
    .map((mode) => ({ mode, subject: subjects.find((subject) => getLevelsForMode(subject.id, mode.id).some((level) => (level.chapterId || "code-quest") === "code-quest")) }))
    .filter((item) => item.subject)
    .slice(0, 6);
  const mission = levels.length ? dailyMission(levels, completedSet) : null;
  const recommended = levels.filter((level) => !completedSet.includes(level.id) && getLevelAvailability(level, levels).unlocked && level.chapterId === "pattern-lab")[0]
    || nextPlayable || levels[0];
  const recent = progress.results.slice(0, 4);
  const questCompleted = levels.filter((level) => (level.chapterId || "code-quest") === "code-quest" && completedSet.includes(level.id)).length;
  const patternCompleted = levels.filter((level) => level.chapterId === "pattern-lab" && completedSet.includes(level.id)).length;

  return <div className="pu-page">
    <section className="pu-hero">
      <div className="pu-hero-grid" aria-hidden="true" />
      <div className="pu-kicker"><span className="pu-live-dot" /> PROGRAMMING UNIVERSE · YOUR CODING PRACTICE SPACE</div>
      <h1>Learn the logic.<br /><span>Build real confidence.</span></h1>
      <p>A game-based platform for programming: play missions, trace patterns, debug real code and prepare for technical interviews — all inside NotesWeb.</p>
      <div className="pu-hero-actions">
        {resumeLevel ? <button className="pu-primary-btn" onClick={() => navigate(`/programming/play/${resumeLevel.id}`)}>{hasStarted ? "Continue Learning" : "Start Learning"} <span aria-hidden="true">↗</span></button>
          : <button className="pu-primary-btn" onClick={() => navigate("/programming/chapters/code-quest")}>Open Code Quest <span aria-hidden="true">↗</span></button>}
        <button className="pu-secondary-btn" onClick={() => navigate("/programming/interviews")}>Interview Arena</button>
      </div>
      <div className="pu-hero-stats"><div><strong>{levels.length}</strong><span>playable levels</span></div><div><strong>{subjects.length}</strong><span>programming subjects</span></div><div><strong>{interviewCount}</strong><span>interview questions</span></div></div>
    </section>

    <section className="pu-profile-band">
      <div className="pu-profile-rank"><span className="pu-rank-badge">{rank.level}</span><div><strong>Rank {rank.level} · {rank.title}</strong><div className="pu-rank-bar"><span style={{ width: `${rank.progress}%` }} /></div><small>{progress.xp} XP{rank.nextAt ? ` · ${rank.nextAt - progress.xp} XP to next rank` : " · top rank reached"}</small></div></div>
      <div className="pu-profile-stats">
        <div><strong>{completedSet.length}</strong><span>levels done</span></div>
        <div><strong>{stats.accuracy}%</strong><span>accuracy</span></div>
        <div><strong>{questCompleted}</strong><span>Code Quest</span></div>
        <div><strong>{patternCompleted}</strong><span>Pattern Lab</span></div>
        <div><strong>{interviewProgress.attempts}</strong><span>interview answers</span></div>
      </div>
    </section>

    {newlyUnlocked.length > 0 && <section className="pu-achievement-toast">{newlyUnlocked.map((achievement) => <div key={achievement.id} className="pu-toast-chip"><span>{achievement.icon}</span><strong>{achievement.title}</strong><small>Achievement unlocked!</small></div>)}</section>}

    <section className="pu-section pu-missions-row">
      {mission && <article className={`pu-daily-card${mission.done ? " done" : ""}`}><span className="pu-eyebrow">DAILY MISSION</span><h3>{mission.done ? "Today's mission already complete" : "One mission a day keeps the rust away"}</h3><p>{mission.level.title} · {mission.level.rewards?.xp || 0} XP</p><button className={mission.done ? "pu-secondary-btn" : "pu-primary-btn"} onClick={() => navigate(`/programming/play/${mission.level.id}`)}>{mission.done ? "Replay mission ↗" : "Play today's mission ↗"}</button></article>}
      {recommended && <article className="pu-recommend-card"><span className="pu-eyebrow">RECOMMENDED CHALLENGE</span><h3>{recommended.title}</h3><p>{recommended.instructions}</p><button className="pu-secondary-btn" onClick={() => navigate(`/programming/play/${recommended.id}`)}>Open challenge ↗</button></article>}
    </section>

    <section className="pu-section pu-chapters-section">
      <div className="pu-section-heading"><div><span className="pu-eyebrow">THREE DESTINATIONS · ONE UNIVERSE</span><h2>Choose your journey</h2><p>Separate chapter paths, shared progression, independent of the NotesWeb notes catalogue.</p></div></div>
      <div className="pu-chapter-card-grid pu-chapter-grid-3">
        <button className="pu-chapter-card pu-chapter-card-code" onClick={() => navigate('/programming/chapters/code-quest')}><span className="pu-chapter-card-number">CHAPTER 01</span><span className="pu-chapter-card-icon">&lt;/&gt;</span><strong>Code Quest</strong><p>Predict outputs, hunt bugs, master variables, logic, syntax and algorithms — 10 game modes.</p><span className="pu-chapter-card-footer">Enter Code Quest <b>↗</b></span></button>
        <button className="pu-chapter-card pu-chapter-card-pattern" onClick={() => navigate('/programming/chapters/pattern-lab')}><span className="pu-chapter-card-number">CHAPTER 02</span><span className="pu-chapter-card-icon">▦</span><strong>Pattern &amp; Series Lab</strong><p>Ten categories: stars, numbers, alphabets, pyramids, hollow shapes, nested loops, number properties, digits and series.</p><span className="pu-chapter-card-footer">Enter Pattern Lab <b>↗</b></span></button>
        <button className="pu-chapter-card pu-chapter-card-interview" onClick={() => navigate('/programming/interviews')}><span className="pu-chapter-card-number">ARENA</span><span className="pu-chapter-card-icon">Q/A</span><strong>Technical Interview Arena</strong><p>{interviewCount} authored questions, quick rounds, MCQ arena, explain-your-answer and full mock interview reports.</p><span className="pu-chapter-card-footer">Enter the Arena <b>↗</b></span></button>
      </div>
    </section>

    <section className="pu-section"><div className="pu-section-heading"><div><span className="pu-eyebrow">SUBJECTS, NOT NOTE TITLES</span><h2>Pick what you want to learn</h2><p>Programming subjects are curated separately from the NotesWeb notes catalogue.</p></div><button className="pu-text-link" onClick={() => navigate('/programming/subjects')}>All subjects ↗</button></div>
      <div className="pu-subject-grid">{featuredSubjects.map((subject) => <button className="pu-subject-card" key={subject.id} onClick={() => navigate(`/programming/subjects/${subject.id}`)}><span className="pu-subject-icon">{subject.icon}</span><span className="pu-card-arrow">↗</span><strong>{subject.name}</strong><small>{subject.description}</small><span className="pu-card-meta">Open subject workspace</span></button>)}</div>
    </section>

    <section className="pu-section"><div className="pu-section-heading"><div><span className="pu-eyebrow">PRACTICE YOUR WAY</span><h2>{modes.length} game modes · {categories.length} pattern categories</h2><p>Reusable challenge formats power the level packs.</p></div><button className="pu-text-link" onClick={() => navigate('/programming/chapters/code-quest')}>All Code Quest paths ↗</button></div>
      <div className="pu-mode-grid">{quickModes.map(({ mode, subject }) => <button className="pu-mode-card" key={mode.id} onClick={() => navigate(`/programming/practice?subject=${encodeURIComponent(subject.id)}&mode=${encodeURIComponent(mode.id)}`)}><span className="pu-mode-icon">{mode.icon}</span><span className="pu-mode-tag">{mode.tag}</span><strong>{mode.title}</strong><small>{mode.description}</small><span className="pu-mode-open">Browse mode ↗</span></button>)}</div>
    </section>

    <section className="pu-section"><div className="pu-section-heading"><div><span className="pu-eyebrow">TROPHY CASE</span><h2>Achievements</h2><p>{unlockedAchievements.length} unlocked by real play — no fake badges.</p></div><button className="pu-text-link" onClick={() => navigate('/programming/progress')}>All achievements ↗</button></div>
      <div className="pu-achievement-row">{unlockedAchievements.slice(0, 8).map((achievement) => <div className="pu-achievement-chip" key={achievement.id}><span>{achievement.icon}</span><strong>{achievement.title}</strong><small>{achievement.description}</small></div>)}{!unlockedAchievements.length && <p className="pu-achievement-empty">Complete your first mission to unlock the first achievement.</p>}</div>
    </section>

    {recent.length > 0 && <section className="pu-section"><div className="pu-section-heading"><div><span className="pu-eyebrow">RECENT ACTIVITY</span><h2>Your latest attempts</h2></div><button className="pu-text-link" onClick={() => navigate('/programming/progress')}>Full progress ↗</button></div>
      <div className="pu-topic-list">{recent.map((result, index) => { const level = getLevelById(result.levelId); return <article className="pu-topic-item" key={`${result.levelId}-${result.completedAt}-${index}`}><span>{result.correct ? "✓" : "↻"}</span><strong>{level?.title || result.levelId}</strong><small>{result.correct ? `Correct · +${result.awardedXp || 0} XP` : "Needs another attempt"} · {new Date(result.completedAt).toLocaleDateString()}</small><button className="pu-level-play-btn" onClick={() => navigate(`/programming/play/${result.levelId}`)}>Open ↗</button></article>; })}</div>
    </section>}
  </div>;
}