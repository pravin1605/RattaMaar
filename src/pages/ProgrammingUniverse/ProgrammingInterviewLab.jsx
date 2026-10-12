import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getSubjects } from "./registry/subjectRegistry";
import { getInterviewProgress, recordInterviewAnswer, getBookmarkedIds, toggleBookmark, saveMockReport, getMockReports } from "./services/interviewProgressService";
import { getInterviewQuestions } from "./registry/interviewQuestionRegistry";

const questionBank = getInterviewQuestions();
const difficulties = ["all", "beginner", "intermediate", "advanced"];

const ARENAS = [
  { id: "browse", icon: "☰", title: "Question Bank", hint: "Filter, study and practise at your own pace." },
  { id: "quick", icon: "⚡", title: "Quick Interview", hint: "8 random questions from your current filters, scored." },
  { id: "mcq", icon: "▦", title: "MCQ Arena", hint: "Rapid multiple-choice rounds with instant feedback." },
  { id: "explain", icon: "✎", title: "Explain Your Answer", hint: "Written answers compared against a model answer and key-point checklist." },
  { id: "debug", icon: "⌁", title: "Output & Debug Round", hint: "Questions that contain code — predict, find the flaw, justify." },
  { id: "mock", icon: "🎩", title: "Mock Interview", hint: "12 mixed questions across categories, then a full result report." },
];

function shuffle(items, seed = Date.now()) {
  let s = seed >>> 0;
  const random = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) { const j = Math.floor(random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; }
  return copy;
}

const hasCode = (q) => /code/i.test(`${q.question} ${q.explanation} ${q.answer ?? ""}`) || Boolean(q.codeExample);

export default function ProgrammingInterviewLab() {
  const subjects = getSubjects();
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const [subjectFilter, setSubjectFilter] = useState(params.get("subject") || "all");
  const [difficulty, setDifficulty] = useState("all");
  const [arena, setArena] = useState("browse");
  const [practiceMode, setPracticeMode] = useState("practice");
  const [query, setQuery] = useState("");
  const [bookmarksOnly, setBookmarksOnly] = useState(false);
  const [bookmarkIds, setBookmarkIds] = useState(() => getBookmarkedIds());
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [checked, setChecked] = useState(false);
  const [writtenAnswer, setWrittenAnswer] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [resultCorrect, setResultCorrect] = useState(null);
  const [progress, setProgress] = useState(() => getInterviewProgress());
  const [session, setSession] = useState(null);
  const [report, setReport] = useState(null);

  const filtered = useMemo(() => questionBank.filter((item) =>
    (subjectFilter === "all" || item.subjectId === subjectFilter) &&
    (difficulty === "all" || item.difficulty === difficulty) &&
    (!bookmarksOnly || bookmarkIds.includes(item.id)) &&
    `${item.question} ${item.subjectName} ${item.answer} ${item.explanation}`.toLowerCase().includes(query.trim().toLowerCase())
  ), [subjectFilter, difficulty, query, bookmarksOnly, bookmarkIds]);

  const basePool = useMemo(() => {
    if (arena === "mcq") return filtered.filter((item) => item.type === "mcq");
    if (arena === "explain") return filtered.filter((item) => item.type === "short-answer");
    if (arena === "debug") return filtered.filter(hasCode);
    return filtered;
  }, [arena, filtered]);

  const questions = useMemo(() => {
    if (arena === "browse") return basePool;
    if (!session) return basePool;
    return session.order;
  }, [arena, basePool, session]);

  const question = questions[index] || null;
  const subjectLabel = subjectFilter === "all" ? "All subjects" : subjects.find((item) => item.id === subjectFilter)?.name || "Selected subject";

  useEffect(() => { resetCard(); setIndex(0); setSession(null); setReport(null); }, [arena, subjectFilter, difficulty, query, bookmarksOnly]);

  function resetCard() { setSelected(""); setChecked(false); setWrittenAnswer(""); setRevealed(false); setResultCorrect(null); }

  function updateSubject(value) { setSubjectFilter(value); setParams(value === "all" ? {} : { subject: value }); }

  function startSession() {
    if (!basePool.length) return;
    const length = arena === "mock" ? Math.min(12, basePool.length) : Math.min(8, basePool.length);
    const order = shuffle(basePool).slice(0, length);
    setSession({ order, answers: new Map(), startedAt: Date.now() });
    setReport(null); setIndex(0); resetCard();
  }

  function checkAnswer() {
    if (!question || !selected || checked) return;
    const correct = selected === question.correctOptionId;
    const next = recordInterviewAnswer(question, selected, correct);
    setProgress(next); setResultCorrect(correct); setChecked(true);
    recordInSession(correct);
  }

  function selfAssessAnswer(correct) {
    if (!question || checked) return;
    const next = recordInterviewAnswer(question, correct ? "self-assessed-known" : "self-assessed-review", correct);
    setProgress(next); setResultCorrect(correct); setChecked(true);
    recordInSession(correct);
  }

  function recordInSession(correct) {
    if (!session) return;
    setSession((current) => {
      if (!current) return current;
      const answers = new Map(current.answers);
      answers.set(question.id, { questionId: question.id, subjectId: question.subjectId, subjectName: question.subjectName, correct });
      return { ...current, answers };
    });
  }

  const sessionAnswers = useMemo(() => session ? [...session.answers.values()] : [], [session]);

  function finishSession() {
    if (!session) return;
    const answers = sessionAnswers;
    const score = answers.filter((a) => a.correct).length;
    const byCategory = {};
    for (const answer of answers) {
      byCategory[answer.subjectName] = byCategory[answer.subjectName] || { attempted: 0, correct: 0 };
      byCategory[answer.subjectName].attempted += 1;
      if (answer.correct) byCategory[answer.subjectName].correct += 1;
    }
    const weakCategories = Object.entries(byCategory).filter(([, v]) => v.correct / v.attempted < 0.6).map(([name]) => name);
    const suggestedRevision = weakCategories.length
      ? weakCategories.map((name) => `Revisit ${name}: read each explanation twice and re-answer those questions in the Question Bank.`)
      : ["Strong round — raise the difficulty filter and try a harder mix next time."];
    const generated = {
      mode: arena === "mock" ? "Mock Interview" : "Quick Interview",
      score, total: answers.length,
      percent: answers.length ? Math.round((score / answers.length) * 100) : 0,
      weakCategories, suggestedRevision,
      perQuestion: answers,
      difficultyMix: Object.entries(byCategory).map(([name, v]) => `${name}: ${v.correct}/${v.attempted}`),
    };
    if (arena === "mock") saveMockReport(generated);
    setReport(generated);
  }

  const inSession = arena !== "browse" && session && !report;
  const bookmarkActive = question && bookmarkIds.includes(question.id);

  return <div className="pu-page pu-interview-page">
    <button className="pu-back-link" onClick={() => navigate("/programming")}>← Back to Universe</button>
    <section className="pu-interview-hero">
      <div className="pu-interview-hero-mark">Q/A</div>
      <span className="pu-eyebrow">TECHNICAL INTERVIEW ARENA</span>
      <h1>Interview Arena</h1>
      <p>Real interview questions with model answers, explanations and honest self-assessment. Choose an arena, filter by subject and difficulty, and track where you stand.</p>
      <div className="pu-interview-stats">
        <div><strong>{questionBank.length}</strong><span>questions loaded</span></div>
        <div><strong>{progress.attempts}</strong><span>answers attempted</span></div>
        <div><strong>{progress.attempts ? Math.round(progress.correct / progress.attempts * 100) : 0}%</strong><span>overall accuracy</span></div>
        <div><strong>{bookmarkIds.length}</strong><span>marked for revision</span></div>
      </div>
    </section>

    <section className="pu-arena-grid" aria-label="Interview arenas">
      {ARENAS.map((item) => <button key={item.id} className={`pu-arena-card${arena === item.id ? " active" : ""}`} onClick={() => setArena(item.id)}><span className="pu-arena-icon">{item.icon}</span><strong>{item.title}</strong><small>{item.hint}</small></button>)}
    </section>

    <section className="pu-interview-controls" aria-label="Interview question filters">
      <label><span>Subject</span><select value={subjectFilter} onChange={(event) => updateSubject(event.target.value)}><option value="all">All subjects</option>{subjects.filter((subject) => questionBank.some((item) => item.subjectId === subject.id)).map((subject) => <option key={subject.id} value={subject.id}>{subject.name}</option>)}</select></label>
      <label><span>Difficulty</span><select value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>{difficulties.map((item) => <option key={item} value={item}>{item === "all" ? "All levels" : item[0].toUpperCase() + item.slice(1)}</option>)}</select></label>
      <label className="pu-interview-search"><span>Search questions</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a question or concept…" /></label>
      <div className="pu-interview-toggle" role="group" aria-label="Practice mode"><button className={practiceMode === "practice" ? "active" : ""} onClick={() => setPracticeMode("practice")}>Practice</button><button className={practiceMode === "study" ? "active" : ""} onClick={() => setPracticeMode("study")}>Study</button></div>
      <button className={`pu-bookmark-filter${bookmarksOnly ? " active" : ""}`} onClick={() => setBookmarksOnly((value) => !value)}>★ Revision list ({bookmarkIds.length})</button>
    </section>

    {arena === "browse" && <div className="pu-interview-bankline"><div><strong>{filtered.length}</strong> questions · <span>{subjectLabel}</span>{question && <span> · Question {index + 1} of {questions.length}</span>}</div></div>}
    {(arena === "quick" || arena === "mock") && !session && !report && <section className="pu-session-cta"><div><span className="pu-eyebrow">{arena === "mock" ? "FULL REPORT AT THE END" : "SCORED ROUND"}</span><h2>{arena === "mock" ? "12 mixed questions across categories" : `Up to 8 random questions from ${subjectLabel}`}</h2><p>{basePool.length} questions match your filters. Written answers are self-assessed against the model answer — the arena never pretends to auto-grade free text.</p></div><button className="pu-primary-btn" onClick={startSession} disabled={!basePool.length}>Start round ↗</button></section>}

    {report && <section className="pu-mock-report">
      <span className="pu-eyebrow">{report.mode.toUpperCase()} · RESULT REPORT</span>
      <h2>{report.percent}% — {report.score} of {report.total} solid</h2>
      <div className="pu-report-bars">{report.difficultyMix.map((line) => <div key={line} className="pu-report-chip">{line}</div>)}</div>
      <h3>Category breakdown</h3>
      <ul>{report.perQuestion.map((answer, i) => <li key={`${answer.questionId}-${i}`}><span className={answer.correct ? "ok" : "bad"}>{answer.correct ? "✓" : "✗"}</span> {answer.subjectName} · <code>{answer.questionId}</code></li>)}</ul>
      {report.weakCategories.length ? <><h3>Weak categories</h3><ul>{report.weakCategories.map((name) => <li key={name}>{name}</li>)}</ul></> : <p className="pu-report-strong">No weak categories this round.</p>}
      <h3>Suggested revision</h3>
      <ul>{report.suggestedRevision.map((line) => <li key={line}>{line}</li>)}</ul>
      <div className="pu-report-actions"><button className="pu-primary-btn" onClick={startSession}>Run another round ↗</button><button className="pu-secondary-btn" onClick={() => { setReport(null); setArena("browse"); }}>Review questions in the bank</button></div>
    </section>}

    {question && inSession && <div className="pu-session-line"><span>ROUND PROGRESS: {Math.min(index + 1, session.order.length)} / {session.order.length}</span><span>SCORE: {sessionAnswers.filter((a) => a.correct).length}</span></div>}

    {question ? <section className="pu-interview-card">
      <div className="pu-interview-question-meta">
        <span>{question.subjectName}</span>
        <span className={`pu-difficulty-pill ${question.difficulty}`}>{question.difficulty}</span>
        <button className={`pu-bookmark-btn${bookmarkActive ? " active" : ""}`} onClick={() => setBookmarkIds(toggleBookmark(question.id))}>{bookmarkActive ? "★ Marked for revision" : "☆ Mark for revision"}</button>
      </div>
      <div className="pu-interview-question-count">{inSession ? `ROUND QUESTION ${String(index + 1).padStart(2, "0")}` : `QUESTION ${String(index + 1).padStart(2, "0")}`}</div>
      <h2>{question.question}</h2>
      {question.codeExample && <pre className="pu-code-block"><code>{question.codeExample}</code></pre>}
      {question.options?.length ? <div className="pu-interview-options" role="radiogroup" aria-label="Answer choices">{question.options.map((option, optionIndex) => {
        const isCorrect = option.id === question.correctOptionId;
        const isSelected = selected === option.id;
        const stateClass = (checked || practiceMode === "study") && isCorrect ? " correct" : checked && isSelected && !isCorrect ? " incorrect" : isSelected ? " selected" : "";
        return <button type="button" key={option.id} className={`pu-interview-option${stateClass}`} onClick={() => { if (!checked && practiceMode === "practice") setSelected(option.id); }} disabled={checked || practiceMode === "study"}>
          <span className="pu-interview-option-letter">{String.fromCharCode(65 + optionIndex)}</span><span>{option.text}</span>{checked && isCorrect && <b>Correct</b>}
        </button>;
      })}</div> : practiceMode === "practice" && !revealed ? <div className="pu-interview-written-wrap"><label htmlFor="pu-interview-written-answer">Your answer</label><textarea id="pu-interview-written-answer" rows={4} value={writtenAnswer} onChange={(event) => setWrittenAnswer(event.target.value)} placeholder="Write the key points you would explain to an interviewer…" disabled={revealed || checked} /></div> : practiceMode === "study" ? null : <div className="pu-interview-answer-text"><strong>Model answer</strong><p>{question.answer}</p></div>}
      {practiceMode === "study" && <div className="pu-interview-study-answer"><span className="pu-eyebrow">MODEL ANSWER</span><p>{question.answer}</p></div>}
      {Array.isArray(question.keyPoints) && (checked || practiceMode === "study" || revealed) && <div className="pu-keypoints"><span className="pu-eyebrow">KEY POINTS CHECKLIST</span><ul>{question.keyPoints.map((point) => <li key={point}>{point}</li>)}</ul><p className="pu-keypoints-note">Interviewers listen for these points. No automatic grading exists for free text — compare honestly.</p></div>}
      {question.type === "short-answer" && practiceMode === "practice" && revealed && !checked && <div className="pu-interview-self-assess"><strong>Compare your answer with the model answer.</strong><p>Rate yourself honestly; this records a self-assessment rather than automatically grading free-form text.</p><div><button className="pu-primary-btn" onClick={() => selfAssessAnswer(true)}>I covered the key points</button><button className="pu-secondary-btn" onClick={() => selfAssessAnswer(false)}>I need to review</button></div></div>}
      {checked && <div className={`pu-interview-feedback ${resultCorrect ? "correct" : "incorrect"}`}><strong>{resultCorrect ? "Correct / self-assessed confident" : "Review this answer"}</strong><p>{question.answer}</p><div><span className="pu-eyebrow">EXPLANATION</span><p>{question.explanation}</p></div>{question.relatedPractice && <p className="pu-related-practice">Related practice: {question.relatedPractice}</p>}</div>}
      {practiceMode === "study" && <div className="pu-interview-explanation"><span className="pu-eyebrow">WHY IT MATTERS</span><p>{question.explanation}</p></div>}
      <div className="pu-interview-actions">
        {practiceMode === "practice" ? (question.options?.length
          ? <button className="pu-primary-btn" onClick={checkAnswer} disabled={!selected || checked}>Check answer ↗</button>
          : <>
            {!revealed && !checked ? <button className="pu-primary-btn" onClick={() => setRevealed(true)} disabled={writtenAnswer.trim().length < 8}>Reveal model answer ↗</button> : null}
            {checked && <span className="pu-study-mode-label">Self-assessment recorded</span>}
          </>
        ) : <span className="pu-study-mode-label">Study mode · answer, checklist and explanation visible</span>}
        <div>
          {inSession && index + 1 >= session.order.length
            ? <button className="pu-primary-btn" onClick={finishSession} disabled={sessionAnswers.length === 0}>{arena === "mock" ? "Generate result report ↗" : "See my score ↗"}</button>
            : <button className="pu-secondary-btn" onClick={() => { setIndex((c) => Math.min(c + 1, questions.length - 1)); resetCard(); }} disabled={questions.length < 2}>Next question →</button>}
          <button className="pu-secondary-btn" onClick={() => { setIndex((c) => Math.max(c - 1, 0)); resetCard(); }} disabled={index === 0}>← Previous</button>
        </div>
      </div>
    </section> : !report && <section className="pu-empty-state"><h2>No questions match these filters</h2><p>Choose another subject or difficulty, or clear your search.</p><button className="pu-primary-btn" onClick={() => { updateSubject("all"); setDifficulty("all"); setQuery(""); setBookmarksOnly(false); }}>Clear filters</button></section>}

    {arena !== "browse" && !report && !inSession && basePool.length > 0 && !question && <section className="pu-empty-state"><h2>This arena has no matching questions</h2><p>Widen your subject or difficulty filters, then start a round again.</p><button className="pu-secondary-btn" onClick={() => setArena("browse")}>Back to Question Bank</button></section>}

    {getMockReports().length > 0 && arena === "mock" && !report && <section className="pu-section"><div className="pu-section-heading"><div><span className="pu-eyebrow">PAST PERFORMANCE</span><h2>Previous mock reports</h2></div></div>
      <div className="pu-topic-list">{getMockReports().slice(0, 5).map((item, i) => <article className="pu-topic-item" key={`${item.completedAt}-${i}`}><span>{item.percent >= 60 ? "✓" : "↻"}</span><strong>{item.mode} · {item.score}/{item.total}</strong><small>{new Date(item.completedAt).toLocaleString()} · weak: {item.weakCategories.length ? item.weakCategories.join(", ") : "none"}</small><button className="pu-level-play-btn" onClick={() => setReport(item)}>Open report ↗</button></article>)}</div></section>}

    <section className="pu-interview-footnote"><strong>Question bank health</strong><p>{questionBank.length} questions were discovered from separate question-pack files. New packs can be added without changing this page. Written answers are always evaluated by self-assessment against the model answer and key-point checklist — there is no automatic free-text grading. Attempts and bookmarks are saved locally on this device.</p></section>
  </div>;
}
