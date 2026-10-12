import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLevelById, getLevelsForMode, getLevels } from "./registry/levelRegistry";
import { getSubjectById } from "./registry/subjectRegistry";
import { getGameModeById, getPatternCategoryById } from "./registry/gameModeRegistry";
import { evaluateChallenge, getChallengeOptions } from "./engine";
import { getLevelStatus, recordLevelAttempt, getLevelAvailability } from "./services/practiceProgressService";
import PatternVisualizer, { TraceTable } from "./components/PatternVisualizer.jsx";

export default function ProgrammingPlay() {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const level = useMemo(() => getLevelById(levelId), [levelId]);
  const isTimed = Boolean(level?.timeLimitSeconds);
  const options = useMemo(() => level ? getChallengeOptions(level) : [], [level]);
  const [answer, setAnswer] = useState("");
  const [blankValues, setBlankValues] = useState([]);
  const [orderedIds, setOrderedIds] = useState(() => (level?.content?.blocks || []).map((block) => block.id));
  const [feedback, setFeedback] = useState(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(() => level?.timeLimitSeconds || 0);
  const timerRef = useRef(null);
  const timeoutRecorded = useRef(false);

  useEffect(() => {
    setOrderedIds((level?.content?.blocks || []).map((block) => block.id));
    setAnswer("");
    setBlankValues((level?.content?.blanks || []).map(() => ""));
    setFeedback(null);
    setHintsUsed(0);
    setShowExplanation(false);
    setSecondsLeft(level?.timeLimitSeconds || 0);
    timeoutRecorded.current = false;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [level]);

  useEffect(() => {
    if (!level || !isTimed || feedback) return;
    timerRef.current = setInterval(() => setSecondsLeft((current) => Math.max(0, current - 1)), 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); timerRef.current = null; };
  }, [level, isTimed, feedback]);

  const subject = level ? getSubjectById(level.subjectId) : null;
  const mode = level ? getGameModeById(level.modeId) : null;
  const category = level?.categoryId ? getPatternCategoryById(level.categoryId) : null;
  const status = level ? getLevelStatus(level.id) : { completed: false, attempts: 0 };
  const availability = level ? getLevelAvailability(level, getLevels()) : { unlocked: false, reason: "Level unavailable" };
  const siblingLevels = level ? getLevelsForMode(level.subjectId, level.modeId).filter((item) => (item.chapterId || "code-quest") === (level.chapterId || "code-quest") && (item.categoryId || null) === (level.categoryId || null)).sort((a, b) => a.levelNumber - b.levelNumber || a.id.localeCompare(b.id)) : [];
  const nextLevel = level ? siblingLevels.find((item) => item.levelNumber > level.levelNumber) : null;
  const timedOut = isTimed && secondsLeft === 0 && !feedback;
  const locked = Boolean(feedback) || timedOut;

  const submit = () => {
    if (!level || locked) return;
    const submittedAnswer = level.challengeType === "code-ordering" ? orderedIds
      : level.evaluation?.strategy === "fill-blanks" ? blankValues.join(" || ")
      : answer;
    if (submittedAnswer === "" || (level.evaluation?.strategy === "fill-blanks" && blankValues.some((value) => value.trim() === ""))) return;
    const evaluation = evaluateChallenge(level, submittedAnswer);
    const updated = recordLevelAttempt(level, { correct: evaluation.correct, selectedAnswer: submittedAnswer, hintsUsed });
    setFeedback({ ...evaluation, awardedXp: updated.results[0]?.awardedXp || 0 });
    setShowExplanation(!evaluation.correct);
  };

  useEffect(() => { if (timedOut && level && !timeoutRecorded.current) { timeoutRecorded.current = true; const updated = recordLevelAttempt(level, { correct: false, selectedAnswer: answer, hintsUsed }); setFeedback({ correct: false, expectedAnswer: null, timedOut: true, awardedXp: updated.results[0]?.awardedXp || 0 }); setShowExplanation(true); } }, [timedOut, level, answer, hintsUsed]);

  if (!level) return <div className="pu-page"><section className="pu-empty-state"><h1>Level not found</h1><p>This level may have been moved or failed content validation.</p><button className="pu-primary-btn" onClick={() => navigate("/programming/practice")}>Back to practice</button></section></div>;
  if (!availability.unlocked) return <div className="pu-page"><section className="pu-empty-state"><span className="pu-progress-emblem">🔒</span><h1>Mission locked</h1><p>{availability.reason}. Complete the previous level in this path to continue.</p><button className="pu-primary-btn" onClick={() => navigate(`/programming/chapters/${level.chapterId || "code-quest"}`)}>Open level map ↗</button></section></div>;

  const resetAttempt = () => { setAnswer(""); setFeedback(null); setShowExplanation(false); timeoutRecorded.current = false; if (isTimed) setSecondsLeft(level.timeLimitSeconds); };
  const revealHint = () => setHintsUsed((count) => Math.min(count + 1, level.hints.length));
  const visibleHint = hintsUsed > 0 ? level.hints[Math.min(hintsUsed, level.hints.length) - 1] : null;
  const canSubmit = level.challengeType === "code-ordering" ? orderedIds.length > 0
    : level.evaluation?.strategy === "fill-blanks" ? blankValues.length > 0 && blankValues.every((value) => value.trim() !== "")
    : answer !== "";
  const moveBlock = (index, direction) => { if (locked) return; setOrderedIds((current) => { const target = index + direction; if (target < 0 || target >= current.length) return current; const copy = [...current]; [copy[index], copy[target]] = [copy[target], copy[index]]; return copy; }); };

  const formatTime = (seconds) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

  return <div className={`pu-page pu-play-page${level.modeId === "boss-mission" ? " pu-boss" : ""}${isTimed ? " pu-timed" : ""}`}>
    <button className="pu-back-link" onClick={() => navigate(category ? `/programming/chapters/${level.chapterId}` : `/programming/practice?subject=${level.subjectId}&mode=${level.modeId}`)}>← Back to {category?.title || mode?.title || "practice"}</button>
    <section className="pu-play-topline">
      <div><span className="pu-eyebrow">{subject?.name || level.subjectId}{category ? ` / ${category.title}` : ` / ${mode?.title || level.modeId}`}</span><h1>{level.title}</h1><p>{level.instructions}</p></div>
      <div className="pu-level-meta">
        {isTimed && <strong className={`pu-timer ${secondsLeft <= 10 ? "danger" : ""}`} role="timer">⏱ {formatTime(secondsLeft)}</strong>}
        <span>{String(level.levelNumber).padStart(3, "0")}</span><small>{level.difficulty || "Beginner"}</small><small>{level.rewards?.xp || 0} XP</small>
      </div>
    </section>
    <div className="pu-play-progress"><span>ATTEMPTS: {status.attempts}</span><span>{level.modeId === "boss-mission" ? "☠ BOSS MISSION" : status.completed ? "✓ COMPLETED BEFORE" : "MISSION IN PROGRESS"}</span></div>
    <section className="pu-challenge-panel">
      <div className="pu-challenge-panel-head"><span className="pu-eyebrow">MISSION BRIEFING</span><span className="pu-challenge-type">{level.challengeType.replaceAll("-", " ")}</span></div>
      {level.content?.prompt && <h2>{level.content.prompt}</h2>}
      {level.content?.codeBefore && <pre className="pu-code-block"><code>{level.content.codeBefore}</code></pre>}
      {level.content?.code && <pre className="pu-code-block"><code>{level.content.code}</code></pre>}
      {level.content?.missingLine && <pre className="pu-code-block pu-missing-code"><code>{level.content.missingLine}</code></pre>}
      {level.content?.codeAfter && <pre className="pu-code-block"><code>{level.content.codeAfter}</code></pre>}
      {Array.isArray(level.content?.patternRows) && <PatternVisualizer rows={level.content.patternRows} variables={level.content.patternVariables} />}
      {level.content?.trace && <TraceTable trace={level.content.trace} />}
      {level.challengeType === "code-ordering" && Array.isArray(level.content?.blocks) ? <div className="pu-ordering-list"><p className="pu-ordering-instruction">Arrange these code blocks in the correct order using the arrows.</p>{orderedIds.map((id, index) => { const block = level.content.blocks.find((item) => item.id === id); if (!block) return null; return <div className="pu-ordering-block" key={id}><code>{block.code}</code><div><button type="button" aria-label="Move block up" onClick={() => moveBlock(index, -1)} disabled={index === 0 || locked}>↑</button><button type="button" aria-label="Move block down" onClick={() => moveBlock(index, 1)} disabled={index === orderedIds.length - 1 || locked}>↓</button></div></div>; })}</div>
        : level.evaluation?.strategy === "fill-blanks" ? <div className="pu-blanks-list"><p className="pu-ordering-instruction">Fill every blank, then check your answer.</p>{(level.content?.blanks || []).map((blank, index) => <label className="pu-blank-row" key={index}><span className="pu-blank-slot">{index + 1}</span><code className="pu-blank-context">{blank.context || blank.placeholder}</code><input value={blankValues[index] || ""} onChange={(event) => setBlankValues((current) => current.map((value, position) => position === index ? event.target.value : value))} placeholder={blank.placeholder} disabled={locked} /></label>)}</div>
        : options.length > 0 ? <div className="pu-answer-options" role="radiogroup" aria-label="Answer options">{options.map((option) => <button type="button" key={option.id} className={`pu-answer-option${answer === option.id ? " selected" : ""}${feedback && answer === option.id ? feedback.correct ? " correct" : " incorrect" : ""}`} onClick={() => { if (!locked) setAnswer(option.id); }} disabled={locked}><span className="pu-option-letter">{String.fromCharCode(65 + options.indexOf(option))}</span><span>{option.label}</span>{answer === option.id && <span className="pu-option-check">●</span>}</button>)}</div>
        : <div className="pu-answer-input-wrap"><label htmlFor="pu-answer">{level.content?.answerLabel || "Your answer"}</label><textarea id="pu-answer" value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder={level.content?.answerPlaceholder || "Type your answer here…"} disabled={locked} rows={level.content?.answerRows || 3} /></div>}
      {visibleHint && <div className="pu-hint-box"><strong>Hint {hintsUsed} of {level.hints.length}</strong><p>{visibleHint}</p></div>}
      <div className="pu-challenge-actions"><button className="pu-secondary-btn" onClick={revealHint} disabled={hintsUsed >= level.hints.length || locked}>Get a hint · −1 XP</button>{!feedback ? <button className="pu-primary-btn" onClick={submit} disabled={!canSubmit || timedOut}>{isTimed ? "Submit before time runs out ↗" : "Check answer ↗"}</button> : <button className="pu-secondary-btn" onClick={resetAttempt}>{isTimed ? "Retry with a fresh timer" : "Try again"}</button>}</div>
      {feedback && <div className={`pu-feedback ${feedback.correct ? "success" : "error"}`} role="status"><div className="pu-feedback-title"><span>{feedback.correct ? "✓" : "↻"}</span><div><strong>{feedback.correct ? "Mission complete!" : feedback.timedOut ? "Time is up — mission failed." : "Not quite — investigate again."}</strong><p>{feedback.correct ? `You earned ${feedback.awardedXp} XP this attempt.` : feedback.timedOut ? "The timer expired before a correct answer was recorded. Try again." : "Use the hint and explanation, then try again."}</p></div></div>
        {(feedback.correct || showExplanation) && <div className="pu-explanation"><span className="pu-eyebrow">WHY THIS WORKS</span><strong>{level.explanation?.concept || "Concept explanation"}</strong><p>{level.explanation?.summary}</p>{level.explanation?.details && <p>{level.explanation.details}</p>}{level.explanation?.modelAnswer && <pre className="pu-code-block"><code>{level.explanation.modelAnswer}</code></pre>}</div>}
        {feedback.correct && nextLevel && <button className="pu-primary-btn" onClick={() => navigate(`/programming/play/${nextLevel.id}`)}>Next level: {nextLevel.title} ↗</button>}
        {feedback.correct && !nextLevel && <button className="pu-secondary-btn" onClick={() => navigate(category ? `/programming/chapters/${level.chapterId}` : `/programming/practice?subject=${level.subjectId}&mode=${level.modeId}`)}>Back to level list ↗</button>}
        {!feedback.correct && <button className="pu-secondary-btn" onClick={() => setShowExplanation((value) => !value)}>{showExplanation ? "Hide explanation" : "Show explanation"}</button>}
      </div>}
    </section>
    <aside className="pu-play-side-note"><span>⌘</span><div><strong>Learn, don't just guess.</strong><p>Read the explanation even when your answer is correct. The Lab records attempts and completion locally on this device.</p></div></aside>
  </div>;
}
