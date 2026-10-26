import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";

const projects = [
  {
    number: "01",
    title: "Gym Management System",
    category: "Web Application",
    description:
      "A web-based gym management application designed to organize gym-related information and provide a practical digital management experience.",
    technologies: ["React", "JavaScript", "HTML", "CSS"],
    link: "https://pravin1605.github.io/gym_demo_1/",
    type: "Live Demo",
  },
  {
    number: "02",
    title: "Gym Management — V2",
    category: "Web Application",
    description:
      "A second gym management implementation exploring another interface and workflow for fitness and gym management requirements.",
    technologies: ["React", "JavaScript", "CSS"],
    link: "https://pravin1605.github.io/gym_demo_2/",
    type: "Live Demo",
  },
  {
    number: "03",
    title: "Kindergarten Learning",
    category: "Education",
    description:
      "A child-friendly educational web experience designed around learning activities and an engaging digital interface for young learners.",
    technologies: ["React", "JavaScript", "HTML", "CSS"],
    link: "https://kindergarden-1-ten.vercel.app/",
    type: "Live Demo",
  },
  {
    number: "04",
    title: "Smart QR Restaurant",
    category: "Restaurant Technology",
    description:
      "A digital restaurant ordering experience connecting table QR codes, menu browsing and restaurant-side order workflows.",
    technologies: ["React", "QR", "JavaScript", "Web"],
    link: "https://evergrowqrfronted.vercel.app/",
    type: "Live Demo",
  },
  {
    number: "05",
    title: "Artist Club",
    category: "Creative Platform",
    description:
      "A creative web platform concept designed around artists and digital content with a clean and modern user experience.",
    technologies: ["React", "JavaScript", "Web"],
    link: "https://artistclub-beta.vercel.app/",
    type: "Live Demo",
  },
  {
    number: "06",
    title: "Gigglegossipe",
    category: "Android Application",
    description:
      "An Android chat application using Firebase for authentication, real-time communication, media sharing and notification-related functionality.",
    technologies: ["Java", "Android", "Firebase"],
    link: "https://github.com/pravin1605/Gigglegossipe",
    type: "GitHub",
  },
  {
    number: "07",
    title: "SocietyHub",
    category: "SaaS / Management",
    description:
      "A society management application concept focused on resident management, maintenance, complaints, payments and community workflows.",
    technologies: ["React", "Vite", "PocketBase"],
    link: "https://github.com/pravin1605/societyhub",
    type: "GitHub",
  },
];

const skillGroups = [
  {
    title: "Programming",
    description: "Core programming and problem-solving technologies.",
    skills: [
      "Java",
      "JavaScript",
      "C",
      "OOP",
      "Data Structures",
      "Algorithms",
      "Problem Solving",
    ],
  },
  {
    title: "Java Development",
    description: "Backend and enterprise Java technologies.",
    skills: [
      "JDBC",
      "Servlet",
      "JSP",
      "Hibernate",
      "Spring",
      "Spring Boot",
      "Maven",
      "REST API",
    ],
  },
  {
    title: "Frontend",
    description: "Technologies used to build modern web interfaces.",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React",
      "Responsive Design",
      "DOM",
      "JSON",
      "Fetch API",
    ],
  },
  {
    title: "Databases",
    description: "Relational and NoSQL database technologies.",
    skills: [
      "SQL",
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Database Design",
      "Joins",
      "Queries",
      "CRUD",
    ],
  },
  {
    title: "Development Tools",
    description: "Tools used throughout the development workflow.",
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "IntelliJ IDEA",
      "Eclipse",
      "Postman",
      "Chrome DevTools",
      "npm",
    ],
  },
  {
    title: "Mobile & Cloud",
    description: "Mobile development and backend/cloud technologies.",
    skills: [
      "Android",
      "Firebase",
      "Authentication",
      "Cloud Firestore",
      "FCM",
      "Hosting",
      "Vercel",
      "GitHub Pages",
    ],
  },
];

const education = [
  {
    level: "B.E.",
    title: "Computer Engineering",
    institution: "University of Mumbai",
    period: "2022 — 2026",
    result: "75%",
    detail: "Bachelor of Engineering",
  },
  {
    level: "Honours",
    title: "Artificial Intelligence & Machine Learning",
    institution: "University of Mumbai",
    period: "2024 — 2026",
    result: "80%",
    detail: "Engineering Honours",
  },
  {
    level: "HSC",
    title: "Higher Secondary Certificate",
    institution: "Maharashtra State Board",
    period: "2021 — 2022",
    result: "70%",
    detail: "Class XII",
  },
  {
    level: "SSC",
    title: "Secondary School Certificate",
    institution: "Maharashtra State Board",
    period: "2019 — 2020",
    result: "91.40%",
    detail: "Class X",
  },
];

const achievements = [
  {
    mark: "01",
    title: "ELECTROWIZ 25",
    result: "1st Prize — Software Category",
    description:
      "Recognized in the software category at the project competition.",
  },
  {
    mark: "02",
    title: "Code Automata '25",
    result: "Winner",
    description:
      "Team achievement in a competitive software development event.",
  },
  {
    mark: "03",
    title: "EduConnect",
    result: "2nd Place",
    description:
      "AI-powered student mentoring platform developed as Team Duo Dare.",
  },
  {
    mark: "04",
    title: "React Native VAP",
    result: "Runner-Up",
    description:
      "Runner-up recognition during the React Native Value Addition Program.",
  },
  {
    mark: "05",
    title: "EduScan",
    result: "VAP Best Project",
    description:
      "Educational platform project developed using React Native.",
  },
  {
    mark: "06",
    title: "GDG on Campus",
    result: "Organizer",
    description:
      "Selected as a GDG on Campus Organizer for Vishwaniketan.",
  },
];

const stats = [
  {
    value: "2022–26",
    label: "Engineering",
  },
  {
    value: "07",
    label: "Featured Projects",
  },
  {
    value: "30+",
    label: "Technologies",
  },
  {
    value: "91.40%",
    label: "SSC",
  },
];

function ExternalIcon() {
  return (
    <span className="about-external-icon" aria-hidden="true">
      ↗
    </span>
  );
}

function ArrowIcon() {
  return (
    <span className="about-arrow-icon" aria-hidden="true">
      →
    </span>
  );
}



function About() {
  const navigate = useNavigate();
  const pageRef = useRef(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const revealElements = page.querySelectorAll("[data-reveal]");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      revealElements.forEach((element) =>
        element.classList.add("is-visible")
      );
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -35px 0px",
      }
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
        ? "auto"
        : "smooth",
    });
  };

  return (
    <main className="about-page" ref={pageRef} id="about-top">
      <div className="about-background-grid" aria-hidden="true" />
      <div className="about-floating-orb about-orb-one" aria-hidden="true" />
      <div className="about-floating-orb about-orb-two" aria-hidden="true" />
      <div className="about-floating-orb about-orb-three" aria-hidden="true" />

      <div className="about-container">
        <button
          className="about-back-button"
          onClick={() => navigate("/settings")}
          type="button"
        >
          <span aria-hidden="true">←</span>
          <span>Back to Settings</span>
        </button>

        {/* HERO */}
        <section className="about-hero" data-reveal="hero">
          <div className="about-hero-copy">
            <div className="about-eyebrow">
              <span className="about-status-dot" />
              <span>Developer · Creator · Learner</span>
            </div>

            <p className="about-hero-overline">
              THE PERSON BEHIND NOTES WEB
            </p>

            <h1>
              Notes
              <span>Web.</span>
            </h1>

            <p className="about-tagline">
              Learn. Read. Remember.
            </p>

            <p className="about-hero-description">
              I'm Pravin Nitin Rokade, a Computer Engineering graduate
              focused on software development, thoughtful user experiences
              and building practical digital products.
            </p>

            <div className="about-hero-meta">
              <span>Computer Engineering</span>
              <span className="about-meta-separator">•</span>
              <span>Full Stack Development</span>
              <span className="about-meta-separator">•</span>
              <span>India</span>
            </div>

            <div className="about-hero-actions">
              <a href="#about-projects" className="about-primary-button">
                Explore My Work <ArrowIcon />
              </a>

              <a
                href="https://www.linkedin.com/in/pravin-rokade-19117a271/"
                target="_blank"
                rel="noreferrer"
                className="about-secondary-button"
              >
                Let's Connect <ExternalIcon />
              </a>
            </div>

            <div className="about-hero-caption">
              <span className="about-caption-line" />
              Turning ideas into working software.
            </div>
          </div>

          <div className="about-profile-wrap">
            <div className="about-profile-decoration" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>

            <div className="about-profile-card">
              <div className="about-profile-top">
                <div className="about-avatar">PR</div>
                <div>
                  <p className="about-profile-label">Designed & developed by</p>
                  <h2>Pravin Rokade</h2>
                  <p className="about-profile-subtitle">
                    Software Developer
                  </p>
                </div>
              </div>

              <div className="about-profile-divider" />

              <div className="about-profile-details">
                <div>
                  <span>Specialization</span>
                  <strong>Full Stack Development</strong>
                </div>
                <div>
                  <span>Education</span>
                  <strong>B.E. Computer Engineering</strong>
                </div>
                <div>
                  <span>University</span>
                  <strong>University of Mumbai</strong>
                </div>
                <div>
                  <span>Approach</span>
                  <strong>Learn · Build · Improve</strong>
                </div>
              </div>

              <div className="about-profile-footer">
                <span className="about-profile-live-dot" />
                Always learning. Always building.
              </div>
            </div>

            <div className="about-floating-note about-note-one">
              <span>&lt;/&gt;</span>
              <div>
                <strong>Build</strong>
                <small>With purpose</small>
              </div>
            </div>

            <div className="about-floating-note about-note-two">
              <span>✳</span>
              <div>
                <strong>Keep learning</strong>
                <small>Every single day</small>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="about-stats" data-reveal="section">
          {stats.map((stat, index) => (
            <div
              className="about-stat"
              key={stat.label}
              style={{ "--delay": `${index * 100}ms` }}
            >
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
              <div className="about-stat-accent" />
            </div>
          ))}
        </section>

        {/* INTRODUCTION */}
        <section className="about-section" data-reveal="section">
          <div className="about-section-heading">
            <span className="about-section-number">01</span>
            <div>
              <p className="about-kicker">A little introduction</p>
              <h2>More than just code.</h2>
              <p className="about-section-subtitle">
                The thinking, curiosity and purpose behind what I build.
              </p>
            </div>
          </div>

          <div className="about-intro-grid">
            <div className="about-intro-main">
              <p>
                I'm <strong>Pravin Rokade</strong>, a developer interested
                in creating software that solves practical problems and
                makes everyday tasks easier.
              </p>
              <p>
                My experience spans frontend interfaces, backend
                development, databases, APIs, Android applications and
                full-stack projects. I enjoy understanding how the pieces
                fit together, not just how to make a screen look good.
              </p>
              <p>
                Notes Web reflects that mindset: making learning and
                reading more organized through a focused digital experience.
              </p>
            </div>

            <div className="about-focus-card">
              <div className="about-focus-icon">&lt;/&gt;</div>
              <p className="about-kicker">My development philosophy</p>
              <h3>Useful first. Beautiful always.</h3>
              <p>
                I value clear code, thoughtful interfaces, reliable
                functionality and continuous improvement.
              </p>
              <div className="about-focus-line">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </section>

        {/* JOURNEY */}
        <section className="about-section" data-reveal="section">
          <div className="about-section-heading">
            <span className="about-section-number">02</span>
            <div>
              <p className="about-kicker">The journey so far</p>
              <h2>My Journey</h2>
              <p className="about-section-subtitle">
                Learning, experimenting and turning knowledge into projects.
              </p>
            </div>
          </div>

          <div className="about-journey">
            <article className="about-journey-item" data-reveal="card">
              <span className="about-journey-marker">01</span>
              <div>
                <p className="about-kicker">Foundation</p>
                <h3>Build strong fundamentals</h3>
                <p>
                  Programming, object-oriented concepts, data structures,
                  algorithms and database fundamentals.
                </p>
              </div>
            </article>

            <article className="about-journey-item" data-reveal="card">
              <span className="about-journey-marker">02</span>
              <div>
                <p className="about-kicker">Development</p>
                <h3>Turn concepts into applications</h3>
                <p>
                  Working across web interfaces, backend systems, APIs,
                  databases and mobile application development.
                </p>
              </div>
            </article>

            <article className="about-journey-item" data-reveal="card">
              <span className="about-journey-marker">03</span>
              <div>
                <p className="about-kicker">Product thinking</p>
                <h3>Build around real needs</h3>
                <p>
                  Exploring educational tools, management systems,
                  communication products and useful digital experiences.
                </p>
              </div>
            </article>

            <article className="about-journey-item" data-reveal="card">
              <span className="about-journey-marker">04</span>
              <div>
                <p className="about-kicker">What's next</p>
                <h3>Keep improving</h3>
                <p>
                  Deepening engineering skills, improving product quality
                  and learning through real development challenges.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* EDUCATION */}
        <section className="about-section" data-reveal="section">
          <div className="about-section-heading">
            <span className="about-section-number">03</span>
            <div>
              <p className="about-kicker">Academic background</p>
              <h2>Education</h2>
            </div>
          </div>

          <div className="about-education-grid">
            {education.map((item, index) => (
              <article
                className="about-education-card"
                key={item.level}
                data-reveal="card"
                style={{ "--card-delay": `${index * 100}ms` }}
              >
                <div className="about-education-top">
                  <span className="about-education-level">{item.level}</span>
                  <span className="about-education-result">{item.result}</span>
                </div>
                <h3>{item.title}</h3>
                <p className="about-education-institution">
                  {item.institution}
                </p>
                <div className="about-education-bottom">
                  <span>{item.detail}</span>
                  <span>{item.period}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section className="about-section" data-reveal="section">
          <div className="about-section-heading">
            <span className="about-section-number">04</span>
            <div>
              <p className="about-kicker">Technical toolkit</p>
              <h2>Skills & Technologies</h2>
              <p className="about-section-subtitle">
                Tools and concepts used throughout my development journey.
              </p>
            </div>
          </div>

          <div className="about-skills-intro">
            <div>
              <h3>From fundamentals to full-stack projects</h3>
              <p>
                Explore the technologies and concepts across my development
                toolkit. Skill groups describe areas of study and use, not
                a claim of equal expertise in every technology.
              </p>
            </div>
            <div className="about-skill-count">
              <strong>30+</strong>
              <span>Technologies</span>
            </div>
          </div>

          <div className="about-skill-groups">
            {skillGroups.map((group, groupIndex) => (
              <article
                className="about-skill-group"
                key={group.title}
                data-reveal="card"
                style={{ "--card-delay": `${groupIndex * 80}ms` }}
              >
                <div className="about-skill-group-header">
                  <span className="about-skill-group-number">
                    {String(groupIndex + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>{group.title}</h3>
                    <p>{group.description}</p>
                  </div>
                </div>
                <div className="about-skill-list">
                  {group.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section
          className="about-section"
          data-reveal="section"
          id="about-projects"
        >
          <div className="about-section-heading">
            <span className="about-section-number">05</span>
            <div>
              <p className="about-kicker">Selected work</p>
              <h2>Projects I've Built</h2>
              <p className="about-section-subtitle">
                A selection of web applications, mobile projects and product
                concepts. Open a link to explore the work.
              </p>
            </div>
          </div>

          <div className="about-projects-grid">
            {projects.map((project, index) => (
              <article
                className="about-project-card"
                key={project.number}
                data-reveal="card"
                style={{ "--card-delay": `${index * 65}ms` }}
              >
                <div className="about-project-header">
                  <span className="about-project-number">
                    / {project.number}
                  </span>
                  <span className="about-project-category">
                    {project.category}
                  </span>
                </div>

                <div className="about-project-line" />
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="about-project-tech">
                  {project.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>

                <a
                  className="about-project-link"
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.type}: ${project.title} (opens in a new tab)`}
                >
                  <span>{project.type === "GitHub" ? "View Repository" : "Explore Project"}</span>
                  <ExternalIcon />
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="about-section" data-reveal="section">
          <div className="about-section-heading">
            <span className="about-section-number">06</span>
            <div>
              <p className="about-kicker">Practical experience</p>
              <h2>Experience</h2>
            </div>
          </div>

          <article className="about-experience-card" data-reveal="card">
            <div className="about-experience-marker">
              <span />
            </div>
            <div className="about-experience-content">
              <div className="about-experience-heading">
                <div>
                  <p className="about-kicker">Internship</p>
                  <h3>Web Developer Intern</h3>
                </div>
                <span className="about-experience-period">
                  Dnyanda Sustainable Engineering Solutions Pvt. Ltd.
                </span>
              </div>
              <p>
                Worked with HTML5, CSS3, JavaScript, React and Bootstrap,
                gaining practical experience in developing and improving
                web interfaces.
              </p>
              <div className="about-experience-tags">
                {["HTML5", "CSS3", "JavaScript", "React", "Bootstrap"].map(
                  (skill) => <span key={skill}>{skill}</span>
                )}
              </div>
            </div>
          </article>
        </section>

        {/* ACHIEVEMENTS */}
        <section className="about-section" data-reveal="section">
          <div className="about-section-heading">
            <span className="about-section-number">07</span>
            <div>
              <p className="about-kicker">Milestones & recognition</p>
              <h2>Achievements</h2>
            </div>
          </div>

          <div className="about-achievements-grid">
            {achievements.map((achievement, index) => (
              <article
                className="about-achievement-card"
                key={achievement.title}
                data-reveal="card"
                style={{ "--card-delay": `${index * 70}ms` }}
              >
                <div className="about-achievement-number">
                  {achievement.mark}
                </div>
                <div>
                  <h3>{achievement.title}</h3>
                  <strong>{achievement.result}</strong>
                  <p>{achievement.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* INTERESTS */}
        <section className="about-section" data-reveal="section">
          <div className="about-section-heading">
            <span className="about-section-number">08</span>
            <div>
              <p className="about-kicker">What drives me</p>
              <h2>Areas of Interest</h2>
            </div>
          </div>

          <div className="about-interests-grid">
            {[
              {
                icon: "</>",
                title: "Software Engineering",
                description: "Structured, maintainable applications and useful features.",
              },
              {
                icon: "API",
                title: "Backend & APIs",
                description: "Application logic, data flow and service integration.",
              },
              {
                icon: "UI",
                title: "User Experience",
                description: "Interfaces that are clear, responsive and accessible.",
              },
              {
                icon: "AI",
                title: "Emerging Technology",
                description: "Exploring new tools and practical ways to use them.",
              },
            ].map((item, index) => (
              <article
                className="about-interest-card"
                key={item.title}
                data-reveal="card"
                style={{ "--card-delay": `${index * 80}ms` }}
              >
                <span className="about-interest-icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="about-connect" data-reveal="section">
          <div className="about-connect-copy">
            <p className="about-kicker">Have an idea?</p>
            <h2>
              Let's build something
              <span> useful.</span>
            </h2>
            <p>
              For project discussions, collaboration and development
              opportunities, connect through the channels below.
            </p>
          </div>

          <div className="about-connect-links">
            <a href="tel:+917498362160" className="about-connect-link">
              <div>
                <span>Mobile</span>
                <strong>+91 74983 62160</strong>
              </div>
              <ArrowIcon />
            </a>

            <a
              href="mailto:pravinrokade1605@gmail.com"
              className="about-connect-link"
            >
              <div>
                <span>Email</span>
                <strong>pravinrokade1605@gmail.com</strong>
              </div>
              <ArrowIcon />
            </a>

            <a
              href="https://github.com/pravin1605"
              target="_blank"
              rel="noreferrer"
              className="about-connect-link"
            >
              <div>
                <span>GitHub</span>
                <strong>github.com/pravin1605</strong>
              </div>
              <ArrowIcon />
            </a>

            <a
              href="https://www.linkedin.com/in/pravin-rokade-19117a271/"
              target="_blank"
              rel="noreferrer"
              className="about-connect-link"
            >
              <div>
                <span>LinkedIn</span>
                <strong>Pravin Rokade</strong>
              </div>
              <ArrowIcon />
            </a>
          </div>
        </section>

        {/* SIGNATURE FOOTER */}
        <footer className="about-footer">
          <div className="about-footer-main">
            <a
              className="about-footer-brand"
              href="#about-top"
              onClick={(event) => {
                event.preventDefault();
                scrollToTop();
              }}
            >
              <span className="about-footer-logo">N</span>
              <span>
                <strong>Notes Web</strong>
                <small>Learn. Read. Remember.</small>
              </span>
            </a>

            <p className="about-footer-message">
              Built with curiosity, care and a passion for learning.
            </p>

            <div className="about-footer-signature">
              <span>Designed & developed by</span>
              <strong>Pravin Nitin Rokade</strong>
              <span className="about-footer-underline" />
            </div>
          </div>

          <div className="about-footer-bottom">
            <span>© {new Date().getFullYear()} Notes Web</span>
            <span className="about-footer-dot">•</span>
            <span>Made to make learning simpler.</span>

            <button
              type="button"
              className="about-back-to-top"
              onClick={scrollToTop}
            >
              Back to top ↑
            </button>
          </div>
        </footer>
      </div>
    </main>
  );
}

export default About;
