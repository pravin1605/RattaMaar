import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/layout/Header";
import BottomNavigation from "../../components/layout/BottomNavigation";
import subjects from "../../data/subjects";

import "./Home.css";

const DAILY_GOAL = 3;
const XP_PER_LEVEL = 5;

/* =========================================================
   SMALL ICONS
========================================================= */

function FlameIcon() {
  return (
    <span
      className="home-unicode-icon flame-unicode-icon"
      aria-hidden="true"
    >
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
    <svg
      width={size}
      height={size}
      className="goal-ring-svg"
      aria-hidden="true"
    >
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

/* =========================================================
   COUNT-UP HOOK
========================================================= */

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

/* =========================================================
   HOME
========================================================= */

function Home() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  /* =========================================================
     ALL NOTES
  ========================================================= */

  const allNotes = useMemo(() => {
    return subjects.flatMap((subject) =>
      (subject.notes || []).map((note) => ({
        ...note,
        subjectId: subject.id,
        subjectName: subject.name,
      }))
    );
  }, []);

  /* =========================================================
     TOTAL DATA
  ========================================================= */

  const totalSubjects = subjects.length;
  const totalNotes = allNotes.length;

  /* =========================================================
     READING PROGRESS
  ========================================================= */

  const getProgress = (subjectId, noteId) => {
    try {
      const value = Number(
        localStorage.getItem(
          `notes-web-progress-${subjectId}-${noteId}`
        )
      );

      if (!Number.isFinite(value)) {
        return 0;
      }

      return Math.min(100, Math.max(0, value));
    } catch {
      return 0;
    }
  };

  /* =========================================================
     COMPLETED NOTES
  ========================================================= */

  const completedNotes = useMemo(() => {
    return allNotes.filter(
      (note) => getProgress(note.subjectId, note.id) >= 100
    ).length;
  }, [allNotes]);

  /* =========================================================
     STUDY STREAK
  ========================================================= */

  const [streak, setStreak] = useState({
    count: 0,
    justExtended: false,
  });

  useEffect(() => {
    try {
      const todayStr = new Date().toDateString();

      const stored = JSON.parse(
        localStorage.getItem("notes-web-streak")
      );

      if (!stored) {
        localStorage.setItem(
          "notes-web-streak",
          JSON.stringify({
            count: 1,
            lastVisit: todayStr,
          })
        );

        setStreak({
          count: 1,
          justExtended: false,
        });

        return;
      }

      if (stored.lastVisit === todayStr) {
        setStreak({
          count: stored.count,
          justExtended: false,
        });

        return;
      }

      const yesterday = new Date();

      yesterday.setDate(
        yesterday.getDate() - 1
      );

      const isConsecutive =
        stored.lastVisit === yesterday.toDateString();

      const nextCount = isConsecutive
        ? stored.count + 1
        : 1;

      localStorage.setItem(
        "notes-web-streak",
        JSON.stringify({
          count: nextCount,
          lastVisit: todayStr,
        })
      );

      setStreak({
        count: nextCount,
        justExtended:
          isConsecutive && nextCount > 1,
      });
    } catch {
      setStreak({
        count: 0,
        justExtended: false,
      });
    }
  }, []);

  /* =========================================================
     STREAK TOAST
  ========================================================= */

  const [showStreakToast, setShowStreakToast] =
    useState(false);

  useEffect(() => {
    if (!streak.justExtended) {
      return undefined;
    }

    setShowStreakToast(true);

    const timer = setTimeout(() => {
      setShowStreakToast(false);
    }, 4200);

    return () => clearTimeout(timer);
  }, [streak.justExtended]);

  /* =========================================================
     DAILY GOAL
  ========================================================= */

  const dailyProgress = useMemo(() => {
    try {
      const recent =
        JSON.parse(
          localStorage.getItem("notes-web-recent")
        ) || [];

      const todayStr =
        new Date().toDateString();

      const openedToday = new Set(
        recent
          .filter(
            (item) =>
              item.openedAt &&
              new Date(item.openedAt).toDateString() ===
                todayStr
          )
          .map(
            (item) =>
              `${item.subjectId}-${item.noteId}`
          )
      );

      return Math.min(
        DAILY_GOAL,
        openedToday.size
      );
    } catch {
      return 0;
    }
  }, [allNotes]);

  const goalMet =
    dailyProgress >= DAILY_GOAL;

  /* =========================================================
     LEVEL
  ========================================================= */

  const level =
    Math.floor(
      completedNotes / XP_PER_LEVEL
    ) + 1;

  const xpIntoLevel =
    completedNotes % XP_PER_LEVEL;

  const xpProgressPct =
    (xpIntoLevel / XP_PER_LEVEL) * 100;

  /* =========================================================
     ANIMATED STAT VALUES
  ========================================================= */

  const animatedSubjects =
    useCountUp(totalSubjects);

  const animatedNotes =
    useCountUp(totalNotes);

  const animatedCompleted =
    useCountUp(completedNotes);

  const animatedStreak =
    useCountUp(streak.count);

  /* =========================================================
     RECENT NOTE
  ========================================================= */

  const recentNote = useMemo(() => {
    try {
      const recent =
        JSON.parse(
          localStorage.getItem(
            "notes-web-recent"
          )
        ) || [];

      if (!recent.length) {
        return null;
      }

      const latest = recent[0];

      const subject = subjects.find(
        (item) =>
          item.id === latest.subjectId
      );

      const note = subject?.notes?.find(
        (item) =>
          item.id === latest.noteId
      );

      if (!subject || !note) {
        return null;
      }

      return {
        subject,
        note,
        openedAt: latest.openedAt,
        progress: getProgress(
          subject.id,
          note.id
        ),
      };
    } catch {
      return null;
    }
  }, [allNotes]);

  /* =========================================================
     SEARCH
  ========================================================= */

  const handleSearch = (event) => {
    event.preventDefault();

    const query =
      searchQuery.trim().toLowerCase();

    if (!query) {
      return;
    }

    const matchedNote = allNotes.find(
      (note) =>
        `${note.title} ${note.subjectName}`
          .toLowerCase()
          .includes(query)
    );

    if (matchedNote) {
      navigate(
        `/notes/${matchedNote.subjectId}/${matchedNote.id}`
      );

      return;
    }

    const matchedSubject =
      subjects.find((subject) =>
        subject.name
          .toLowerCase()
          .includes(query)
      );

    if (matchedSubject) {
      navigate(
        `/subjects/${matchedSubject.id}`
      );

      return;
    }

    navigate("/subjects");
  };

  /* =========================================================
     GREETING
  ========================================================= */

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) {
      return "Good morning";
    }

    if (hour < 18) {
      return "Good afternoon";
    }

    return "Good evening";
  };

  /* =========================================================
     RELATIVE TIME
  ========================================================= */

  const getRelativeTime = (date) => {
    if (!date) {
      return "";
    }

    const difference =
      Date.now() -
      new Date(date).getTime();

    const minutes =
      Math.floor(
        difference / 60000
      );

    if (minutes < 1) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes} min ago`;
    }

    const hours =
      Math.floor(minutes / 60);

    if (hours < 24) {
      return `${hours} hr ago`;
    }

    const days =
      Math.floor(hours / 24);

    if (days === 1) {
      return "Yesterday";
    }

    return `${days} days ago`;
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="home-page">
      <Header />

      {/* =================================================
          STREAK TOAST
      ================================================= */}

      {showStreakToast && (
        <div
          className="achievement-toast"
          role="status"
        >
          <FlameIcon />

          <span>
            {streak.count}-day streak — keep it going
          </span>
        </div>
      )}

      <main className="home-content">

        {/* =================================================
            HERO
        ================================================= */}

        <section className="home-hero">

          <div className="hero-content">

            <div className="welcome-badge">
              <span
                className="home-unicode-icon"
                aria-hidden="true"
              >
                ✦
              </span>

              <span>
                Keep learning, keep growing
              </span>
            </div>

            <p className="welcome-small">
              {getGreeting()} 👋
            </p>

            <h1>
              What do you want
              <br />
              <span>to learn today?</span>
            </h1>

            <p className="welcome-description">
              {streak.count > 1
                ? `You're on a ${streak.count}-day streak. Keep the momentum going.`
                : "Explore your programming notes, continue where you stopped, and learn at your own pace."}
            </p>

          </div>

          <div className="hero-decoration">
            <span
              className="hero-unicode-icon"
              aria-hidden="true"
            >
              ◫
            </span>
          </div>

        </section>

        {/* =================================================
            SEARCH
        ================================================= */}

        <form
          className="home-search"
          onSubmit={handleSearch}
        >
          <span
            className="search-icon home-unicode-icon"
            aria-hidden="true"
          >
            ⌕
          </span>

          <input
            type="text"
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(
                event.target.value
              )
            }
            placeholder="Search notes, topics or subjects..."
            aria-label="Search notes"
          />

          <button
            type="submit"
            className="search-submit"
            aria-label="Search"
          >
            <span
              className="home-unicode-icon"
              aria-hidden="true"
            >
              →
            </span>
          </button>
        </form>

        {/* =================================================
            MOMENTUM
        ================================================= */}

        <section className="momentum-bar">

          <div
            className={`momentum-card streak-card ${
              streak.count >= 3
                ? "is-hot"
                : ""
            }`}
          >
            <div className="momentum-icon flame-icon-wrap">
              <FlameIcon />
            </div>

            <div className="momentum-info">
              <strong>
                {animatedStreak}{" "}
                {animatedStreak === 1
                  ? "day"
                  : "days"}
              </strong>

              <span>
                Study streak
              </span>
            </div>
          </div>

          <div className="momentum-card goal-card">

            <div className="goal-ring-wrap">
              <GoalRing
                progress={
                  dailyProgress /
                  DAILY_GOAL
                }
              />

              <span className="goal-ring-label">
                {dailyProgress}/{DAILY_GOAL}
              </span>
            </div>

            <div className="momentum-info">

              <strong>
                {goalMet
                  ? "Goal complete"
                  : "Daily goal"}
              </strong>

              <span>
                {goalMet
                  ? "Nice work today"
                  : `${DAILY_GOAL - dailyProgress} note${
                      DAILY_GOAL -
                        dailyProgress ===
                      1
                        ? ""
                        : "s"
                    } to go`}
              </span>

            </div>

          </div>

          <div className="momentum-card level-card">

            <div className="momentum-icon level-icon-wrap">
              <span className="level-number">
                {level}
              </span>
            </div>

            <div className="momentum-info">

              <strong>
                Level {level}
              </strong>

              <div className="level-bar">
                <div
                  className="level-bar-fill"
                  style={{
                    width: `${xpProgressPct}%`,
                  }}
                />
              </div>

              <span>
                {xpIntoLevel}/
                {XP_PER_LEVEL} notes to next level
              </span>

            </div>

          </div>

        </section>

        {/* =================================================
            QUICK STATS
        ================================================= */}

        <section className="quick-stats">

          <div className="stat-card">

            <div className="stat-icon">
              <span
                className="home-unicode-icon"
                aria-hidden="true"
              >
                ▤
              </span>
            </div>

            <div>
              <strong>
                {animatedSubjects}
              </strong>

              <span>
                Subjects
              </span>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon">
              <span
                className="home-unicode-icon"
                aria-hidden="true"
              >
                ◫
              </span>
            </div>

            <div>
              <strong>
                {animatedNotes}
              </strong>

              <span>
                Total Notes
              </span>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon">
              <span
                className="home-unicode-icon"
                aria-hidden="true"
              >
                ✓
              </span>
            </div>

            <div>
              <strong>
                {animatedCompleted}
              </strong>

              <span>
                Completed
              </span>
            </div>

          </div>

        </section>

        {/* =================================================
            QUIZ CTA
        ================================================= */}

        <section
          className="home-quiz-card"
          onClick={() => navigate("/quiz")}
        >

          <div className="home-quiz-icon">
            <span
              className="home-unicode-icon home-quiz-unicode-icon"
              aria-hidden="true"
            >
              🧠
            </span>
          </div>

          <div className="home-quiz-content">

            <span className="home-quiz-label">
              Test yourself
            </span>

            <h3>
              Wanna see what stuck?
            </h3>

            <p>
              Let's start the quiz and find out.
            </p>

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
            <span className="home-quiz-btn-label">
              Start Quiz
            </span>

            <span
              className="home-unicode-icon"
              aria-hidden="true"
            >
              →
            </span>
          </button>

        </section>

        {/* =================================================
            CONTINUE READING
        ================================================= */}

        <section className="home-section">

          <div className="section-heading">

            <div>

              <p className="section-label">
                <span
                  className="home-unicode-icon"
                  aria-hidden="true"
                >
                  ◷
                </span>

                Continue Reading
              </p>

              <h2>
                Pick up where you left off
              </h2>

            </div>

            <button
              type="button"
              className="view-all-btn"
              onClick={() =>
                navigate("/recent")
              }
            >
              View all

              <span
                className="home-unicode-icon"
                aria-hidden="true"
              >
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
                <span>
                  {recentNote.subject.icon}
                </span>
              </div>

              <div className="continue-info">

                <div className="continue-top">

                  <span className="continue-category">
                    {recentNote.subject.name}
                  </span>

                  <span className="continue-time">
                    {getRelativeTime(
                      recentNote.openedAt
                    )}
                  </span>

                </div>

                <h3>
                  {recentNote.note.title}
                </h3>

                <p>
                  Continue learning from your last position
                </p>

                <div className="progress-container">

                  <div className="progress-bar">

                    <div
                      className="progress-value"
                      style={{
                        width: `${recentNote.progress}%`,
                      }}
                    />

                  </div>

                  <span>
                    {recentNote.progress}%
                  </span>

                </div>

              </div>

              <div className="continue-arrow">
                <span
                  className="home-unicode-icon"
                  aria-hidden="true"
                >
                  →
                </span>
              </div>

            </article>

          ) : (

            <div className="empty-continue">

              <div className="empty-icon">
                <span
                  className="home-unicode-icon"
                  aria-hidden="true"
                >
                  ◫
                </span>
              </div>

              <div>

                <h3>
                  Start your learning journey
                </h3>

                <p>
                  Open any note and it will appear here.
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  navigate("/subjects")
                }
              >
                Explore

                <span
                  className="home-unicode-icon"
                  aria-hidden="true"
                >
                  →
                </span>
              </button>

            </div>

          )}

        </section>

        {/* =================================================
            SUBJECTS
        ================================================= */}

        <section className="home-section">

          <div className="section-heading">

            <div>

              <p className="section-label">

                <span
                  className="home-unicode-icon"
                  aria-hidden="true"
                >
                  ↗
                </span>

                Explore

              </p>

              <h2>
                Your Subjects
              </h2>

            </div>

            <button
              type="button"
              className="view-all-btn"
              onClick={() =>
                navigate("/subjects")
              }
            >
              See all

              <span
                className="home-unicode-icon"
                aria-hidden="true"
              >
                →
              </span>
            </button>

          </div>

          <div className="subjects-grid">

            {subjects
              .slice(0, 6)
              .map((subject, index) => (

                <button
                  type="button"
                  className="subject-card"
                  key={subject.id}
                  style={{
                    animationDelay:
                      `${index * 65}ms`,
                  }}
                  onClick={() =>
                    navigate(
                      `/subjects/${subject.id}`
                    )
                  }
                >

                  <div className="subject-card-top">

                    <span className="subject-icon">
                      {subject.icon}
                    </span>

                    <span
                      className="subject-arrow home-unicode-icon"
                      aria-hidden="true"
                    >
                      →
                    </span>

                  </div>

                  <span className="subject-name">
                    {subject.name}
                  </span>

                  <span className="subject-description">
                    {subject.description}
                  </span>

                  <span className="subject-count">
                    {subject.notes?.length || 0}{" "}
                    {(subject.notes?.length || 0) === 1
                      ? "note"
                      : "notes"}
                  </span>

                </button>

              ))}

          </div>

        </section>

        {/* =================================================
            ALL SUBJECTS CTA
        ================================================= */}

        <section className="all-subjects-banner">

          <div className="banner-icon">
            <span
              className="home-unicode-icon"
              aria-hidden="true"
            >
              ▤
            </span>
          </div>

          <div className="banner-content">

            <span>
              {totalSubjects} subjects •{" "}
              {totalNotes} notes
            </span>

            <h3>
              Everything you need in one place.
            </h3>

          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/subjects")
            }
          >
            Explore all

            <span
              className="home-unicode-icon"
              aria-hidden="true"
            >
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