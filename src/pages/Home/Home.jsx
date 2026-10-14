import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/layout/Header";
import BottomNavigation from "../../components/layout/BottomNavigation";
import subjects from "../../data/subjects";

import "./Home.css";
import "./ProgrammingUniverseEntry.css";

const DAILY_GOAL = 3;
const XP_PER_LEVEL = 5;

/* Decorative accent per subject card (blue, violet, cyan, purple, indigo, sky). */
const SUBJECT_TONES = ["#3b82f6", "#8b5cf6", "#06b6d4", "#a855f7", "#6366f1", "#0ea5e9"];

/* ---------- small icons ---------- */

function FlameIcon() {
  return (
    <span className="home-unicode-icon flame-unicode-icon" aria-hidden="true">
      🔥
    </span>
  );
}

function GoalRing({ progress, size = 52, strokeWidth = 5 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const safeProgress = Math.min(1, Math.max(0, progress));
  const offset = circumference - safeProgress * circumference;

  return (
    <svg width={size} height={size} className="goal-ring-svg" aria-hidden="true">
      <circle
        className="goal-ring-track"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        className="goal-ring-progress"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}

/* Hero illustration: a boy learning to code on a laptop (inline SVG, no image file). */
function BoyIllustration() {
  return (
    <svg className="hero-code-svg" viewBox="0 0 260 192" role="img" aria-label="A boy learning to code on a laptop" focusable="false">
      <defs>
        <linearGradient id="boyScreen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <circle cx="130" cy="104" r="88" fill="#fff" opacity=".14" />
      {/* body */}
      <path d="M66 192C66 158 92 140 130 140s64 18 64 52z" fill="#ffffff" />
      <path d="M112 142l18 16 18-16" fill="none" stroke="#c7d2fe" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="121" y="118" width="18" height="26" rx="8" fill="#f1bf94" />
      {/* head */}
      <circle cx="100" cy="98" r="5.5" fill="#f1bf94" />
      <circle cx="160" cy="98" r="5.5" fill="#f1bf94" />
      <circle cx="130" cy="96" r="30" fill="#f8d2ae" />
      <path d="M99 92c0-26 62-26 62 0-8-12-18-15-31-15s-23 3-31 15z" fill="#2d2a4a" />
      <path d="M128 70c4-9 14-9 18-4-6-1-12 0-18 4z" fill="#2d2a4a" />
      {/* face */}
      <circle cx="119" cy="100" r="3" fill="#2d2a4a" />
      <circle cx="141" cy="100" r="3" fill="#2d2a4a" />
      <circle cx="111" cy="108" r="4.5" fill="#f9a8b8" opacity=".55" />
      <circle cx="149" cy="108" r="4.5" fill="#f9a8b8" opacity=".55" />
      <path d="M122 110q8 8 16 0" fill="none" stroke="#2d2a4a" strokeWidth="2.4" strokeLinecap="round" />
      {/* headphones */}
      <path d="M97 96C97 62 163 62 163 96" fill="none" stroke="#22d3ee" strokeWidth="6" strokeLinecap="round" />
      <rect x="91" y="90" width="11" height="22" rx="5.5" fill="#22d3ee" />
      <rect x="158" y="90" width="11" height="22" rx="5.5" fill="#22d3ee" />
      {/* arms */}
      <path d="M76 150Q64 176 100 174" fill="none" stroke="#e0e7ff" strokeWidth="15" strokeLinecap="round" />
      <path d="M184 150Q196 176 160 174" fill="none" stroke="#e0e7ff" strokeWidth="15" strokeLinecap="round" />
      {/* laptop (back of screen faces us) */}
      <rect x="82" y="132" width="96" height="42" rx="7" fill="#1e1b4b" />
      <circle cx="130" cy="153" r="6" fill="#fff" opacity=".85" />
      <path d="M70 174h120l-6 9H76z" fill="#c7d2fe" />
      <circle cx="102" cy="173" r="7" fill="#f8d2ae" />
      <circle cx="158" cy="173" r="7" fill="#f8d2ae" />
      {/* desk */}
      <rect x="22" y="183" width="216" height="9" rx="4.5" className="boy-desk" />
      {/* floating symbols */}
      <text x="26" y="64" className="boy-sym" fill="#ffffff">{"</>"}</text>
      <text x="204" y="52" className="boy-sym" fill="#a5f3fc">{"{ }"}</text>
      <text x="216" y="118" className="boy-sym" fill="#22d3ee">#</text>
      <circle cx="38" cy="112" r="5" fill="#fbbf24" />
    </svg>
  );
}

/* ---------- count-up hook ---------- */

function useCountUp(target, duration = 800) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, [target, duration]);

  return value;
}

/* ---------- home ---------- */

function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const allNotes = useMemo(() => {
    return subjects.flatMap((subject) =>
      (subject.notes || []).map((note) => ({
        ...note,
        subjectId: subject.id,
        subjectName: subject.name,
      }))
    );
  }, []);

  const totalSubjects = subjects.length;
  const totalNotes = allNotes.length;

  const getProgress = (subjectId, noteId) => {
    try {
      const value = Number(
        localStorage.getItem(`notes-web-progress-${subjectId}-${noteId}`)
      );
      if (!Number.isFinite(value)) {
        return 0;
      }
      return Math.min(100, Math.max(0, value));
    } catch {
      return 0;
    }
  };

  const completedNotes = useMemo(() => {
    return allNotes.filter(
      (note) => getProgress(note.subjectId, note.id) >= 100
    ).length;
  }, [allNotes]);

  /* ----- study streak ----- */

  const [streak, setStreak] = useState({ count: 0, justExtended: false });

  useEffect(() => {
    try {
      const todayStr = new Date().toDateString();
      const stored = JSON.parse(localStorage.getItem("notes-web-streak"));

      if (!stored) {
        localStorage.setItem(
          "notes-web-streak",
          JSON.stringify({ count: 1, lastVisit: todayStr })
        );
        setStreak({ count: 1, justExtended: false });
        return;
      }

      if (stored.lastVisit === todayStr) {
        setStreak({ count: stored.count, justExtended: false });
        return;
      }

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const isConsecutive = stored.lastVisit === yesterday.toDateString();
      const nextCount = isConsecutive ? stored.count + 1 : 1;

      localStorage.setItem(
        "notes-web-streak",
        JSON.stringify({ count: nextCount, lastVisit: todayStr })
      );

      setStreak({
        count: nextCount,
        justExtended: isConsecutive && nextCount > 1,
      });
    } catch {
      setStreak({ count: 0, justExtended: false });
    }
  }, []);

  const [showStreakToast, setShowStreakToast] = useState(false);

  useEffect(() => {
    if (!streak.justExtended) {
      return undefined;
    }
    setShowStreakToast(true);
    const timer = setTimeout(() => setShowStreakToast(false), 4200);
    return () => clearTimeout(timer);
  }, [streak.justExtended]);

  /* ----- daily goal ----- */

  const dailyProgress = useMemo(() => {
    try {
      const recent = JSON.parse(localStorage.getItem("notes-web-recent")) || [];
      const todayStr = new Date().toDateString();

      const openedToday = new Set(
        recent
          .filter(
            (item) =>
              item.openedAt &&
              new Date(item.openedAt).toDateString() === todayStr
          )
          .map((item) => `${item.subjectId}-${item.noteId}`)
      );

      return Math.min(DAILY_GOAL, openedToday.size);
    } catch {
      return 0;
    }
  }, [allNotes]);

  const goalMet = dailyProgress >= DAILY_GOAL;

  /* ----- level ----- */

  const level = Math.floor(completedNotes / XP_PER_LEVEL) + 1;
  const xpIntoLevel = completedNotes % XP_PER_LEVEL;
  const xpProgressPct = (xpIntoLevel / XP_PER_LEVEL) * 100;

  /* ----- animated values ----- */

  const animatedSubjects = useCountUp(totalSubjects);
  const animatedNotes = useCountUp(totalNotes);
  const animatedCompleted = useCountUp(completedNotes);
  const animatedStreak = useCountUp(streak.count);

  /* ----- recent note ----- */

  const recentNote = useMemo(() => {
    try {
      const recent = JSON.parse(localStorage.getItem("notes-web-recent")) || [];

      if (!recent.length) {
        return null;
      }

      const latest = recent[0];
      const subject = subjects.find((item) => item.id === latest.subjectId);
      const note = subject?.notes?.find((item) => item.id === latest.noteId);

      if (!subject || !note) {
        return null;
      }

      return {
        subject,
        note,
        openedAt: latest.openedAt,
        progress: getProgress(subject.id, note.id),
      };
    } catch {
      return null;
    }
  }, [allNotes]);

  /* ----- search ----- */

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return;
    }

    const matchedNote = allNotes.find((note) =>
      `${note.title} ${note.subjectName}`.toLowerCase().includes(query)
    );

    if (matchedNote) {
      navigate(`/notes/${matchedNote.subjectId}/${matchedNote.id}`);
      return;
    }

    const matchedSubject = subjects.find((subject) =>
      subject.name.toLowerCase().includes(query)
    );

    if (matchedSubject) {
      navigate(`/subjects/${matchedSubject.id}`);
      return;
    }

    navigate("/subjects");
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const getRelativeTime = (date) => {
    if (!date) {
      return "";
    }

    const difference = Date.now() - new Date(date).getTime();
    const minutes = Math.floor(difference / 60000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} min ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hr ago`;

    const days = Math.floor(hours / 24);
    if (days === 1) return "Yesterday";

    return `${days} days ago`;
  };

  /* Hero primary action: resume the last note, otherwise browse subjects. */
  const handleHeroAction = () => {
    if (recentNote) {
      navigate(`/notes/${recentNote.subject.id}/${recentNote.note.id}`);
      return;
    }
    navigate("/subjects");
  };

  return (
    <div className="home-page">
      <Header />

      {showStreakToast && (
        <div className="achievement-toast" role="status">
          <FlameIcon />
          <span>{streak.count}-day streak — keep it going</span>
        </div>
      )}

      <main className="home-content">
        {/* ============ HERO ============ */}
        <section className="home-hero">
          <div className="hero-content">
            <p className="welcome-small">{getGreeting()} 👋</p>

            <h1>Your coding journey starts here.</h1>

            <p className="welcome-description">
              Explore programming concepts, strengthen your fundamentals, and
              build your skills one lesson at a time.
              {streak.count > 1 && ` You're on a ${streak.count}-day streak.`}
            </p>

            <div className="hero-actions">
              <button type="button" className="hero-cta" onClick={handleHeroAction}>
                {recentNote ? "Resume learning" : "Start learning"}
                <span className="home-unicode-icon" aria-hidden="true">→</span>
              </button>
              <button type="button" className="hero-cta-secondary" onClick={() => navigate("/subjects")}>
                Explore subjects
              </button>
            </div>
          </div>

          <div className="hero-decoration">
            <BoyIllustration />
          </div>
        </section>

        {/* ============ SEARCH ============ */}
        <form className="home-search" onSubmit={handleSearch}>
          <span className="search-icon home-unicode-icon" aria-hidden="true">
            ⌕
          </span>

          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search notes, topics or subjects..."
            aria-label="Search notes"
          />

          <button type="submit" className="search-submit" aria-label="Search">
            <span className="home-unicode-icon" aria-hidden="true">
              →
            </span>
          </button>
        </form>

        {/* ============ CONTINUE READING ============ */}
        <section className="home-section">
          <div className="section-heading">
            <div>
              <h2>Continue reading</h2>
              <p className="section-sub">Pick up where you left off</p>
            </div>

            <button
              type="button"
              className="view-all-btn"
              onClick={() => navigate("/recent")}
            >
              View all
              <span className="home-unicode-icon" aria-hidden="true">
                →
              </span>
            </button>
          </div>

          {recentNote ? (
          <article
              className="continue-card"
              onClick={() =>
                navigate(
                  `/notes/${recentNote.subject.id}/${recentNote.note.id}`
                )
              }
            >
              <div className="continue-icon">
                <span>{recentNote.subject.icon}</span>
              </div>

              <div className="continue-info">
                <div className="continue-top">
                  <span className="continue-category">
                    {recentNote.subject.name}
                  </span>
                  <span className="continue-time">
                    {getRelativeTime(recentNote.openedAt)}
                  </span>
                </div>

                <h3>{recentNote.note.title}</h3>

                <div className="progress-container">
                  <div className="progress-bar">
                    <div
                      className="progress-value"
                      style={{ width: `${recentNote.progress}%` }}
                    />
                  </div>
                  <span>{recentNote.progress}%</span>
                </div>
              </div>

              <div className="continue-arrow">
                <span className="home-unicode-icon" aria-hidden="true">
                  →
                </span>
              </div>
            </article>
          ) : (
            <div className="continue-empty">
              <div className="empty-icon">
                <span className="home-unicode-icon" aria-hidden="true">
                  ◫
                </span>
              </div>
              <div>
                <h3>No notes opened yet</h3>
                <p>Open any note and it will appear here.</p>
              </div>
            </div>
          )}
        </section>

        {/* ============ PROGRAMMING UNIVERSE (main highlight) ============ */}
        <section
          className="programming-universe-entry"
          aria-labelledby="programming-universe-title"
        >

          <div className="pu-body">
          <header className="pu-header">
            <div className="programming-entry-copy">
              <h2 id="programming-universe-title">Programming Universe</h2>
              <p>
                Learn by solving missions, fixing bugs, and progressing through
                coding levels. Pick a subject below to start.
              </p>
              <div className="programming-entry-tags">
                <span>
                  {totalSubjects} {totalSubjects === 1 ? "subject" : "subjects"}
                </span>
                <span>
                  {totalNotes} {totalNotes === 1 ? "note" : "notes"}
                </span>
                <span>Game-based practice</span>
              </div>
            </div>

            <button
              type="button"
              className="programming-entry-button"
              onClick={() => navigate("/programming")}
            >
              Enter Universe <span aria-hidden="true">↗</span>
            </button>
          </header>

        </div>
        </section>

        {/* ============ YOUR SUBJECTS (separate section) ============ */}
        <section className="home-section">
          <div className="section-heading">
            <div>
              <h2>Your subjects</h2>
              <p className="section-sub">Choose a subject to start learning</p>
            </div>

            <button
              type="button"
              className="view-all-btn"
              onClick={() => navigate("/subjects")}
            >
              See all
              <span className="home-unicode-icon" aria-hidden="true">
                →
              </span>
            </button>
          </div>

          {subjects.length > 0 ? (
            <div className="subjects-grid">
              {subjects.slice(0, 6).map((subject, index) => {
                const count = subject.notes?.length || 0;

                return (
                  <button
                    type="button"
                    className="subject-card"
                    key={subject.id}
                    style={{
                      animationDelay: `${index * 65}ms`,
                      "--tone": SUBJECT_TONES[index % SUBJECT_TONES.length],
                    }}
                    onClick={() => navigate(`/subjects/${subject.id}`)}
                  >
                    <div className="subject-card-top">
                      <span className="subject-icon">{subject.icon}</span>
                      <span
                        className="subject-arrow home-unicode-icon"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </div>

                    <span className="subject-name">{subject.name}</span>
                    <span className="subject-description">
                      {subject.description}
                    </span>
                    <span className="subject-count">
                      {count} {count === 1 ? "note" : "notes"}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="subjects-empty">Subjects will appear here once they are available.</p>
          )}
        </section>

        {/* ============ YOUR PROGRESS ============ */}
        <section className="home-section">
          <div className="section-heading">
            <div>
              <h2>Your progress</h2>
              <p className="section-sub">Streak, daily goal and level</p>
            </div>
          </div>

          <div className="momentum-bar">
            <div
              className={`momentum-card streak-card ${
                streak.count >= 3 ? "is-hot" : ""
              }`}
            >
              <div className="momentum-icon flame-icon-wrap">
                <FlameIcon />
              </div>

              <div className="momentum-info">
                <strong>
                  {animatedStreak} {animatedStreak === 1 ? "day" : "days"}
                </strong>
                <span>Study streak</span>
              </div>
            </div>

            <div className="momentum-card goal-card">
              <div className="goal-ring-wrap">
                <GoalRing progress={dailyProgress / DAILY_GOAL} />
                <span className="goal-ring-label">
                  {dailyProgress}/{DAILY_GOAL}
                </span>
              </div>

              <div className="momentum-info">
                <strong>{goalMet ? "Goal complete" : "Daily goal"}</strong>
                <span>
                  {goalMet
                    ? "Nice work today"
                    : `${DAILY_GOAL - dailyProgress} note${
                        DAILY_GOAL - dailyProgress === 1 ? "" : "s"
                      } to go`}
                </span>
              </div>
            </div>

            <div className="momentum-card level-card">
              <div className="momentum-icon level-icon-wrap">
                <span className="level-number">{level}</span>
              </div>

              <div className="momentum-info">
                <strong>Level {level}</strong>
                <div className="level-bar">
                  <div
                    className="level-bar-fill"
                    style={{ width: `${xpProgressPct}%` }}
                  />
                </div>
                <span>
                  {xpIntoLevel}/{XP_PER_LEVEL} notes to next level
                </span>
              </div>
            </div>
          </div>

          <div className="quick-stats">
            <div className="stat-card">
              <div className="stat-icon">
                <span className="home-unicode-icon" aria-hidden="true">
                  ▤
                </span>
              </div>
              <div>
                <strong>{animatedSubjects}</strong>
                <span>Subjects</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <span className="home-unicode-icon" aria-hidden="true">
                  ◫
                </span>
              </div>
              <div>
                <strong>{animatedNotes}</strong>
                <span>Total notes</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <span className="home-unicode-icon" aria-hidden="true">
                  ✓
                </span>
              </div>
              <div>
                <strong>{animatedCompleted}</strong>
                <span>Completed</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============ QUIZ CTA ============ */}
        <section className="home-quiz-card" onClick={() => navigate("/quiz")}>
          <div className="home-quiz-icon">
            <span
              className="home-unicode-icon home-quiz-unicode-icon"
              aria-hidden="true"
            >
              🧠
            </span>
          </div>

          <div className="home-quiz-content">
            <span className="home-quiz-label">Test yourself</span>
            <h3>Wanna see what stuck?</h3>
            <p>Let's start the quiz and find out.</p>
          </div>

          <button
            type="button"
            className="home-quiz-btn"
            onClick={(event) => {
              event.stopPropagation();
              navigate("/quiz");
            }}
            aria-label="Start quiz"
          >
            <span className="home-quiz-btn-label">Start Quiz</span>
            <span className="home-unicode-icon" aria-hidden="true">
              →
            </span>
          </button>
        </section>

        {/* ============ ALL SUBJECTS CTA ============ */}
        <section className="all-subjects-banner">
          <div className="banner-icon">
            <span className="home-unicode-icon" aria-hidden="true">
              ▤
            </span>
          </div>

          <div className="banner-content">
            <span>
              {totalSubjects} subjects • {totalNotes} notes
            </span>
            <h3>Everything you need in one place.</h3>
          </div>

          <button type="button" onClick={() => navigate("/subjects")}>
            Explore all
            <span className="home-unicode-icon" aria-hidden="true">
              →
            </span>
          </button>
        </section>

        <div className="mobile-bottom-space" />
      </main>

      <BottomNavigation />
    </div>
  );
}

export default Home;