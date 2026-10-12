import { useNavigate } from "react-router-dom";
import { getPracticeProgress } from "./services/practiceProgressService";
import { getLevelById, getLevelValidationIssues, getLevels } from "./registry/levelRegistry";
import { getSubjects } from "./registry/subjectRegistry";
import { getInterviewProgress } from "./services/interviewProgressService";
import { getInterviewQuestionCount, getInterviewQuestionIssues } from "./registry/interviewQuestionRegistry";
import { evaluateAchievements, buildLearnerStats, getRank, getAchievementDefinitions } from "./services/achievementsService";

export default function ProgrammingProgress() {
  const navigate = useNavigate();
  const progress = getPracticeProgress();
  const completed = progress.completedLevelIds.length;
  const xp = Number(progress.xp || 0);
  const recentResults = progress.results.slice(0, 8);
  const validationIssues = getLevelValidationIssues();
  const totalRegistered = getLevels().length;
  const totalSubjects = getSubjects().length;
  const interviewProgress = getInterviewProgress();
  const interviewCount = getInterviewQuestionCount();
  const interviewIssues = getInterviewQuestionIssues();
  const accuracy = progress.results.length ? Math.round((progress.results.filter((item) => item.correct).length / progress.results.length) * 100) : 0;
  const levels = getLevels();
  const stats = buildLearnerStats({ ...progress, allLevels: levels }, interviewProgress);
  const { unlocked: unlockedAchievements } = evaluateAchievements(stats);
  const rank = getRank(progress.xp);
  const hintsUsed = progress.results.filter((item) => item.hintsUsed > 0).length;
  return <div className="pu-page">
    <div className="pu-page-heading"><span className="pu-eyebrow">YOUR LEARNING RECORD</span><h1>Progress, made visible.</h1><p>Your completed levels, earned XP, rank and recent attempts are saved locally on this device.</p></div>
    <section className="pu-profile-band">
      <div className="pu-profile-rank"><span className="pu-rank-badge">{rank.level}</span><div><strong>Rank {rank.level} · {rank.title}</strong><div className="pu-rank-bar"><span style={{ width: `${rank.progress}%` }} /></div><small>{progress.xp} XP{rank.nextAt ? ` · ${rank.nextAt - progress.xp} XP to next rank` : " · top rank reached"}</small></div></div>
    </section>
    <div className="pu-progress-grid"><div className="pu-progress-stat"><span>REGISTERED CHALLENGES</span><strong>{totalRegistered}</strong><small>Auto-discovered valid level modules</small></div><div className="pu-progress-stat"><span>SUBJECTS IN CATALOGUE</span><strong>{totalSubjects}</strong><small>Expandable learning tracks</small></div><div className="pu-progress-stat"><span>LEVELS COMPLETED</span><strong>{completed}</strong><small>Unique levels completed</small></div><div className="pu-progress-stat"><span>EXPERIENCE POINTS</span><strong>{xp}</strong><small>XP awarded for first-time completion</small></div><div className="pu-progress-stat"><span>ATTEMPT ACCURACY</span><strong>{accuracy}%</strong><small>Across {progress.results.length} recorded attempts</small></div><div className="pu-progress-stat"><span>HINTS USED</span><strong>{hintsUsed}</strong><small>Attempts that opened at least one hint</small></div><div className="pu-progress-stat"><span>INTERVIEW QUESTIONS</span><strong>{interviewCount}</strong><small>Dynamic question bank across all arena subjects</small></div><div className="pu-progress-stat"><span>INTERVIEW ACCURACY</span><strong>{interviewProgress.attempts ? Math.round(interviewProgress.correct / interviewProgress.attempts * 100) : 0}%</strong><small>{interviewProgress.attempts} answers attempted</small></div></div>
    <section className="pu-section"><div className="pu-section-heading"><div><span className="pu-eyebrow">TROPHY CASE</span><h2>Achievements ({unlockedAchievements.length}/{getAchievementDefinitions().length})</h2><p>Achievements unlock only from recorded activity.</p></div></div>
      <div className="pu-achievement-grid">{getAchievementDefinitions().map((achievement) => { const got = unlockedAchievements.some((item) => item.id === achievement.id); return <div className={`pu-achievement-tile${got ? " unlocked" : ""}`} key={achievement.id}><span>{got ? achievement.icon : "🔒"}</span><strong>{achievement.title}</strong><small>{achievement.description}</small></div>; })}</div>
    </section>
    {recentResults.length ? <section className="pu-section"><div className="pu-section-heading"><div><span className="pu-eyebrow">RECENT ACTIVITY</span><h2>Your latest attempts</h2></div></div><div className="pu-topic-list">{recentResults.map((result, index) => { const level = getLevelById(result.levelId); return <article className="pu-topic-item" key={`${result.levelId}-${result.completedAt}-${index}`}><span>{result.correct ? "✓" : "↻"}</span><strong>{level?.title || result.levelId}</strong><small>{result.correct ? `Correct · +${result.awardedXp || 0} XP` : "Needs another attempt"} · {new Date(result.completedAt).toLocaleDateString()}</small><button className="pu-level-play-btn" onClick={() => navigate(`/programming/play/${result.levelId}`)}>Open level ↗</button></article>; })}</div></section> : !interviewProgress.attempts ? <section className="pu-empty-progress"><span className="pu-progress-emblem">↗</span><h2>Your journey starts here</h2><p>Play a registered challenge to begin recording your learning progress. The Lab only displays real attempts and completions.</p><button className="pu-primary-btn" onClick={() => navigate("/programming/subjects")}>Choose a subject ↗</button></section> : null}
    {interviewProgress.results.length > 0 && <section className="pu-section"><div className="pu-section-heading"><div><span className="pu-eyebrow">INTERVIEW LAB ACTIVITY</span><h2>Recent interview answers</h2></div></div><div className="pu-topic-list">{interviewProgress.results.slice(0, 6).map((result, index) => <article className="pu-topic-item" key={`${result.questionId}-${result.answeredAt}-${index}`}><span>{result.correct ? "✓" : "↻"}</span><strong>{result.questionId}</strong><small>{result.correct ? "Correct answer" : "Review this answer"} · {new Date(result.answeredAt).toLocaleDateString()}</small><button className="pu-level-play-btn" onClick={() => navigate(`/programming/interviews?subject=${result.subjectId}`)}>Practice subject ↗</button></article>)}</div></section>}
    <section className="pu-interview-subject-cta"><div><span className="pu-eyebrow">TECHNICAL INTERVIEW PRACTICE</span><h2>Keep preparing for interviews</h2><p>{interviewProgress.answeredIds.length} unique questions attempted. Review answers across Java, SQL, DSA, DBMS and JavaScript.</p></div><button className="pu-primary-btn" onClick={() => navigate("/programming/interviews")}>Open Interview Lab ↗</button></section>
    <section className={`pu-validation-panel ${interviewIssues.length ? "has-issues" : "all-clear"}`}><strong>Interview question bank health</strong><p>{interviewIssues.length ? `${interviewIssues.length} interview question issue(s) found.` : `All ${interviewCount} discovered interview questions passed basic content validation.`}</p>{interviewIssues.map((issue, index) => <p key={`${issue.id}-${index}`}><code>{issue.id}</code> — {issue.message}</p>)}</section>
    <section className={`pu-validation-panel ${validationIssues.length ? "has-issues" : "all-clear"}`}><strong>Content registry health</strong><p>{validationIssues.length ? `${validationIssues.length} invalid or duplicate level module(s) were skipped by the registry.` : `All ${totalRegistered} discovered level module(s) passed the current content contract.`}</p>{validationIssues.map((issue, index) => <p key={`${issue.id}-${index}`}><code>{issue.id}</code> — {issue.errors.join(" ")}</p>)}</section>
    <p className="pu-progress-footnote">Guest progress is stored in browser local storage. It does not sync across devices yet; cloud sync will be a separate phase.</p>
  </div>;
}
