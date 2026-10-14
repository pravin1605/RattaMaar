import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSubjects } from "./registry/subjectRegistry";
import { getLevelsForSubject } from "./registry/levelRegistry";
import { getInterviewQuestionCount } from "./registry/interviewQuestionRegistry";

const STATUS_LABELS = { playable: "PRACTICE AVAILABLE", "interview-only": "INTERVIEW ONLY", planned: "COMING LATER" };

export default function ProgrammingSubjects() {
  const subjects = getSubjects();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All subjects");
  const navigate = useNavigate();
  const filters = ["All subjects", ...new Set(subjects.map((subject) => subject.category).filter(Boolean))];

  // Availability comes from the real registries, never from the static subject status flag.
  const subjectData = useMemo(() => subjects.map((subject) => {
    const levelCount = getLevelsForSubject(subject.id).length;
    const interviewCount = getInterviewQuestionCount(subject.id);
    const status = levelCount ? "playable" : interviewCount ? "interview-only" : "planned";
    return { ...subject, levelCount, interviewCount, status };
  }), [subjects]);

  const visible = useMemo(() => subjectData.filter((subject) => (filter === "All subjects" || subject.category === filter) && `${subject.name} ${subject.description}`.toLowerCase().includes(query.trim().toLowerCase())), [subjectData, filter, query]);

  return <div className="pu-page pu-subject-picker">
    <div className="pu-page-heading"><span className="pu-eyebrow">SUBJECT CATALOGUE</span><h1>Choose a subject.</h1><p>Pick a programming language or computer-science subject. Each subject opens only the practice modes and learning experiences that exist for it.</p></div>
    <div className="pu-subject-controls">
      <label className="pu-search"><span aria-hidden="true">⌕</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Java, Python, SQL, DSA…" aria-label="Search programming subjects" /></label>
      <div className="pu-filter-row" role="group" aria-label="Filter subjects">{filters.map((item) => <button type="button" key={item} className={`pu-filter${filter === item ? " selected" : ""}`} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div>
    </div>
    <div className="pu-catalog-grid">{visible.map((subject) => {
      const detail = subject.status === "playable" ? `${subject.levelCount} playable levels` : subject.status === "interview-only" ? `${subject.interviewCount} interview questions` : "Learning pack planned";
      return <button type="button" className={`pu-catalog-card pu-subject-card-${subject.status}`} key={subject.id} onClick={() => navigate(`/programming/subjects/${subject.id}`)} aria-label={`Open ${subject.name}. ${STATUS_LABELS[subject.status]}.`}>
        <span className={`pu-subject-icon pu-subject-tone-${subject.id.length % 4}`} aria-hidden="true">{subject.icon}</span>
        <span className={`pu-status pu-status-${subject.status}`}>{STATUS_LABELS[subject.status]}</span>
        <strong>{subject.name}</strong><small>{subject.description}</small>
        <div className="pu-catalog-footer"><span>{detail}</span><span>{subject.status === "planned" ? "View" : "Open"} ↗</span></div>
      </button>;
    })}</div>
    {!visible.length && <div className="pu-empty-state"><strong>No subjects found</strong><p>Try another search or subject group.</p><button type="button" className="pu-secondary-btn" onClick={() => { setQuery(""); setFilter("All subjects"); }}>Clear filters</button></div>}
    <section className="pu-interview-subject-cta"><div><span className="pu-eyebrow">INTERVIEW PREPARATION</span><h2>Practice technical interview questions</h2><p>Dynamic question packs, difficulty filters, model answers, explanations, and saved local progress.</p></div><button type="button" className="pu-primary-btn" onClick={() => navigate('/programming/interviews')}>Open Interview Lab ↗</button></section>
  </div>;
}