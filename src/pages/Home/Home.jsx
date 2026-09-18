import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/layout/Header";
import BottomNavigation from "../../components/layout/BottomNavigation";
import subjects from "../../data/subjects";

import "./Home.css";

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
     RECENT NOTE
  ========================================================= */

  const recentNote = useMemo(() => {
    try {
      const recent =
        JSON.parse(
          localStorage.getItem("notes-web-recent")
        ) || [];

      if (!recent.length) {
        return null;
      }

      const latest = recent[0];

      const subject = subjects.find(
        (item) => item.id === latest.subjectId
      );

      const note = subject?.notes?.find(
        (item) => item.id === latest.noteId
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

    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return;
    }

    const matchedNote = allNotes.find((note) =>
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

    const matchedSubject = subjects.find((subject) =>
      subject.name.toLowerCase().includes(query)
    );

    if (matchedSubject) {
      navigate(`/subjects/${matchedSubject.id}`);
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
      Date.now() - new Date(date).getTime();

    const minutes = Math.floor(
      difference / 60000
    );

    if (minutes < 1) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes} min ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
      return `${hours} hr ago`;
    }

    const days = Math.floor(hours / 24);

    if (days === 1) {
      return "Yesterday";
    }

    return `${days} days ago`;
  };

  return (
    <div className="home-page">
      <Header />

      <main className="home-content">

        {/* =================================================
            HERO / WELCOME
        ================================================= */}

        <section className="home-hero">

          <div className="hero-content">

            <div className="welcome-badge">
              <span className="home-unicode-icon">
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
              Explore your programming notes, continue
              where you stopped, and learn at your own pace.
            </p>

          </div>

          <div className="hero-decoration">
            <span className="hero-unicode-icon">
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
              setSearchQuery(event.target.value)
            }
            placeholder="Search notes, topics or subjects..."
            aria-label="Search notes"
          />

          <button
            type="submit"
            className="search-submit"
            aria-label="Search"
          >
            <span className="home-unicode-icon">
              →
            </span>
          </button>

        </form>


        {/* =================================================
            QUICK STATS
        ================================================= */}

        <section className="quick-stats">

          <div className="stat-card">

            <div className="stat-icon">
              <span className="home-unicode-icon">
                ▤
              </span>
            </div>

            <div>
              <strong>{totalSubjects}</strong>
              <span>Subjects</span>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              <span className="home-unicode-icon">
                ◫
              </span>
            </div>

            <div>
              <strong>{totalNotes}</strong>
              <span>Total Notes</span>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              <span className="home-unicode-icon">
                ✓
              </span>
            </div>

            <div>
              <strong>{completedNotes}</strong>
              <span>Completed</span>
            </div>

          </div>

        </section>


        {/* =================================================
            CONTINUE READING
        ================================================= */}

        <section className="home-section">

          <div className="section-heading">

            <div>

              <p className="section-label">
                <span className="home-unicode-icon">
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
              onClick={() => navigate("/recent")}
            >
              View all

              <span className="home-unicode-icon">
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
                <span className="home-unicode-icon">
                  →
                </span>
              </div>

            </article>

          ) : (

            <div className="empty-continue">

              <div className="empty-icon">
                <span className="home-unicode-icon">
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
                onClick={() => navigate("/subjects")}
              >
                Explore

                <span className="home-unicode-icon">
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
                <span className="home-unicode-icon">
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
              onClick={() => navigate("/subjects")}
            >
              See all

              <span className="home-unicode-icon">
                →
              </span>
            </button>

          </div>


          <div className="subjects-grid">

            {subjects
              .slice(0, 6)
              .map((subject) => (

                <button
                  type="button"
                  className="subject-card"
                  key={subject.id}
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

                    <span className="subject-arrow home-unicode-icon">
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
            <span className="home-unicode-icon">
              ▤
            </span>
          </div>

          <div className="banner-content">

            <span>
              {totalSubjects} subjects • {totalNotes} notes
            </span>

            <h3>
              Everything you need in one place.
            </h3>

          </div>

          <button
            type="button"
            onClick={() => navigate("/subjects")}
          >
            Explore all

            <span className="home-unicode-icon">
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