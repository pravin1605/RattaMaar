

import Header from "../../components/layout/Header";
import BottomNavigation from "../../components/layout/BottomNavigation";

import "./Home.css";

function Home() {
  return (
    <div className="home-page">

      <Header />

      <main className="home-content">

        {/* =================================================
            WELCOME
        ================================================= */}

        <section className="welcome-section">

          <p className="welcome-small">
            Good morning 👋
          </p>

          <h2>
            What do you want
            <br />
            to learn today?
          </h2>

          <p className="welcome-description">
            Explore your notes and learn at your own pace.
          </p>

        </section>


        {/* =================================================
            SEARCH
        ================================================= */}

        <section className="home-search">

          <span
            className="simple-icon"
            aria-hidden="true"
          >
            🔍
          </span>

          <input
            type="text"
            placeholder="Search notes, topics..."
            aria-label="Search notes"
          />

        </section>


        {/* =================================================
            CONTINUE READING
        ================================================= */}

        <section className="home-section">

          <div className="section-heading">

            <div>

              <p className="section-label">

                <span
                  className="simple-icon"
                  aria-hidden="true"
                >
                  ◷
                </span>

                Continue Reading

              </p>

              <h3>
                Pick up where you left off
              </h3>

            </div>


            <button
              type="button"
              className="view-all-btn"
            >
              View all

              <span
                className="simple-icon"
                aria-hidden="true"
              >
                →
              </span>

            </button>

          </div>


          <article className="continue-card">

            <div className="continue-icon">

              <span aria-hidden="true">
                📖
              </span>

            </div>


            <div className="continue-info">

              <span className="continue-category">
                Java
              </span>

              <h4>
                Object Oriented Programming
              </h4>

              <p>
                Classes and Objects
              </p>


              <div className="progress-container">

                <div className="progress-bar">

                  <div
                    className="progress-value"
                    style={{
                      width: "70%",
                    }}
                  />

                </div>

                <span>
                  70%
                </span>

              </div>

            </div>

          </article>

        </section>


        {/* =================================================
            SUBJECTS
        ================================================= */}

        <section className="home-section">

          <div className="section-heading">

            <div>

              <p className="section-label">

                <span
                  className="simple-icon"
                  aria-hidden="true"
                >
                  📚
                </span>

                Explore

              </p>

              <h3>
                Subjects
              </h3>

            </div>


            <button
              type="button"
              className="view-all-btn"
            >
              See all

              <span
                className="simple-icon"
                aria-hidden="true"
              >
                →
              </span>

            </button>

          </div>


          <div className="subjects-grid">


            {/* JAVA */}

            <button
              type="button"
              className="subject-card"
            >

              <span className="subject-icon">
                ☕
              </span>

              <span className="subject-name">
                Java
              </span>

              <span className="subject-count">
                Notes
              </span>

            </button>


            {/* REACT */}

            <button
              type="button"
              className="subject-card"
            >

              <span className="subject-icon">
                ⚛️
              </span>

              <span className="subject-name">
                React
              </span>

              <span className="subject-count">
                Notes
              </span>

            </button>


            {/* SQL */}

            <button
              type="button"
              className="subject-card"
            >

              <span className="subject-icon">
                🗄️
              </span>

              <span className="subject-name">
                SQL
              </span>

              <span className="subject-count">
                Notes
              </span>

            </button>


            {/* PYTHON */}

            <button
              type="button"
              className="subject-card"
            >

              <span className="subject-icon">
                🐍
              </span>

              <span className="subject-name">
                Python
              </span>

              <span className="subject-count">
                Notes
              </span>

            </button>

          </div>

        </section>


        {/* =================================================
            MOBILE BOTTOM SPACE
        ================================================= */}

        <div className="mobile-bottom-space" />

      </main>


      <BottomNavigation />

    </div>
  );
}

export default Home;