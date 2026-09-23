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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <main className="about-page" ref={pageRef}>
      <div className="about-background-grid" />
      <div className="about-floating-orb about-orb-one" />
      <div className="about-floating-orb about-orb-two" />
      <div className="about-floating-orb about-orb-three" />

      <div className="about-container">

        {/* BACK BUTTON */}

        <button
          className="about-back-button"
          onClick={() => navigate("/settings")}
          type="button"
        >
          <span>←</span>
          <span>Back to Settings</span>
        </button>

        {/* HERO */}

        <section className="about-hero" data-reveal="hero">
          <div className="about-hero-copy">

            <div className="about-eyebrow">
              <span className="about-status-dot" />
              Developer Profile
            </div>

            <h1>
              Notes
              <span>Web</span>
            </h1>

            <p className="about-tagline">
              Learn. Read. Remember.
            </p>

            <p className="about-hero-description">
              A focused note-taking application created alongside my journey
              through software development, full-stack engineering and
              building practical digital products.
            </p>

            <div className="about-hero-meta">
              <span>Computer Engineering</span>
              <span className="about-meta-separator">•</span>
              <span>Full Stack Development</span>
              <span className="about-meta-separator">•</span>
              <span>India</span>
            </div>

            <div className="about-hero-actions">
              <a
                href="tel:+917498362160"
                className="about-primary-button"
              >
                <span>Call Me</span>
                <span>+91 74983 62160</span>
              </a>

              <a
                href="https://www.linkedin.com/in/pravin-rokade-19117a271/"
                target="_blank"
                rel="noreferrer"
                className="about-secondary-button"
              >
                LinkedIn
                <ExternalIcon />
              </a>
            </div>
          </div>

          <div className="about-profile-card">

            <div className="about-profile-glow" />

            <div className="about-profile-top">
              <div className="about-avatar">
                PR
              </div>

              <div>
                <p className="about-profile-label">
                  Created by
                </p>

                <h2>
                  Pravin Rokade
                </h2>
              </div>
            </div>

            <div className="about-profile-divider" />

            <div className="about-profile-details">

              <div>
                <span>Focus</span>
                <strong>
                  Full Stack Development
                </strong>
              </div>

              <div>
                <span>Education</span>
                <strong>
                  B.E. Computer Engineering
                </strong>
              </div>

              <div>
                <span>University</span>
                <strong>
                  University of Mumbai
                </strong>
              </div>

              <div>
                <span>Contact</span>
                <strong>
                  +91 74983 62160
                </strong>
              </div>

            </div>

            <div className="about-profile-footer">
              <span className="about-profile-live-dot" />
              Open to building & learning
            </div>

          </div>
        </section>

        {/* STATS */}

        <section className="about-stats" data-reveal="stats">
          {stats.map((stat, index) => (
            <div
              className="about-stat"
              key={stat.label}
              style={{
                "--delay": `${index * 100}ms`,
              }}
            >
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </section>

        {/* ABOUT */}

        <section className="about-section" data-reveal="section">

          <div className="about-section-heading">
            <span className="about-section-number">
              01
            </span>

            <div>
              <p className="about-kicker">
                Introduction
              </p>

              <h2>
                About Me
              </h2>
            </div>
          </div>

          <div className="about-intro-grid">

            <div className="about-intro-main">

              <p>
                I’m <strong>Pravin Rokade</strong>, a Computer Engineering
                student focused on software development and building
                practical digital products.
              </p>

              <p>
                My development journey includes frontend development,
                backend development, databases, Android applications,
                APIs and product-oriented web applications.
              </p>

              <p>
                I enjoy taking an idea from a basic concept and turning it
                into a working application with a clean interface,
                structured code and useful functionality.
              </p>

              <p>
                Notes Web is one of my projects built around a simple idea:
                making learning, reading and remembering information more
                organized.
              </p>

            </div>

            <div className="about-focus-card">

              <div className="about-focus-icon">
                {"</>"}
              </div>

              <p className="about-kicker">
                Current Focus
              </p>

              <h3>
                Building useful software
              </h3>

              <p>
                Full-stack applications, management systems, educational
                products, mobile applications and practical digital tools.
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

        {/* EDUCATION */}

        <section className="about-section" data-reveal="section">

          <div className="about-section-heading">
            <span className="about-section-number">
              02
            </span>

            <div>
              <p className="about-kicker">
                Academic Journey
              </p>

              <h2>
                Education
              </h2>
            </div>
          </div>

          <div className="about-education-grid">

            {education.map((item, index) => (
              <article
                className="about-education-card"
                key={item.level}
                data-reveal="card"
                style={{
                  "--card-delay": `${index * 120}ms`,
                }}
              >

                <div className="about-education-top">

                  <span className="about-education-level">
                    {item.level}
                  </span>

                  <span className="about-education-result">
                    {item.result}
                  </span>

                </div>

                <h3>
                  {item.title}
                </h3>

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
            <span className="about-section-number">
              03
            </span>

            <div>
              <p className="about-kicker">
                Technical Toolkit
              </p>

              <h2>
                Skills
              </h2>
            </div>
          </div>

          <div className="about-skills-intro">

            <div>
              <h3>
                Technologies & Concepts
              </h3>

              <p>
                A broad development toolkit covering programming,
                Java development, frontend, databases, APIs,
                development tools and mobile technologies.
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
                style={{
                  "--card-delay": `${groupIndex * 100}ms`,
                }}
              >

                <div className="about-skill-group-header">

                  <span className="about-skill-group-number">
                    {String(groupIndex + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3>
                      {group.title}
                    </h3>

                    <p>
                      {group.description}
                    </p>
                  </div>

                </div>

                <div className="about-skill-list">

                  {group.skills.map((skill, index) => (
                    <span
                      key={skill}
                      style={{
                        "--skill-delay": `${index * 35}ms`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}

                </div>

              </article>
            ))}

          </div>
        </section>

        {/* PROJECTS */}

        <section className="about-section" data-reveal="section">

          <div className="about-section-heading">
            <span className="about-section-number">
              04
            </span>

            <div>
              <p className="about-kicker">
                Selected Work
              </p>

              <h2>
                Projects
              </h2>
            </div>
          </div>

          <div className="about-projects-grid">

            {projects.map((project, index) => (
              <article
                className="about-project-card"
                key={project.number}
                data-reveal="card"
                style={{
                  "--card-delay": `${index * 90}ms`,
                }}
              >

                <div className="about-project-header">

                  <span className="about-project-number">
                    {project.number}
                  </span>

                  <span className="about-project-category">
                    {project.category}
                  </span>

                </div>

                <div className="about-project-line" />

                <h3>
                  {project.title}
                </h3>

                <p>
                  {project.description}
                </p>

                <div className="about-project-tech">

                  {project.technologies.map((technology) => (
                    <span key={technology}>
                      {technology}
                    </span>
                  ))}

                </div>

                <a
                  className="about-project-link"
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>
                    {project.type}
                  </span>

                  <ExternalIcon />
                </a>

              </article>
            ))}

          </div>
        </section>

        {/* EXPERIENCE */}

        <section className="about-section" data-reveal="section">

          <div className="about-section-heading">
            <span className="about-section-number">
              05
            </span>

            <div>
              <p className="about-kicker">
                Professional Experience
              </p>

              <h2>
                Experience
              </h2>
            </div>
          </div>

          <article
            className="about-experience-card"
            data-reveal="card"
          >

            <div className="about-experience-marker">
              <span />
            </div>

            <div className="about-experience-content">

              <div className="about-experience-heading">

                <div>
                  <p className="about-kicker">
                    Internship
                  </p>

                  <h3>
                    Web Developer Intern
                  </h3>
                </div>

                <span className="about-experience-period">
                  Dnyanda Sustainable Engineering Solutions Pvt. Ltd.
                </span>

              </div>

              <p>
                Worked on web development using HTML5, CSS3, JavaScript,
                React and Bootstrap while gaining practical experience
                in developing and improving web interfaces.
              </p>

              <div className="about-experience-tags">
                <span>HTML5</span>
                <span>CSS3</span>
                <span>JavaScript</span>
                <span>React</span>
                <span>Bootstrap</span>
              </div>

            </div>

          </article>
        </section>

        {/* ACHIEVEMENTS */}

        <section className="about-section" data-reveal="section">

          <div className="about-section-heading">
            <span className="about-section-number">
              06
            </span>

            <div>
              <p className="about-kicker">
                Milestones
              </p>

              <h2>
                Achievements
              </h2>
            </div>
          </div>

          <div className="about-achievements-grid">

            {achievements.map((achievement, index) => (
              <article
                className="about-achievement-card"
                key={achievement.title}
                data-reveal="card"
                style={{
                  "--card-delay": `${index * 100}ms`,
                }}
              >

                <div className="about-achievement-number">
                  {achievement.mark}
                </div>

                <div>

                  <h3>
                    {achievement.title}
                  </h3>

                  <strong>
                    {achievement.result}
                  </strong>

                  <p>
                    {achievement.description}
                  </p>

                </div>

              </article>
            ))}

          </div>
        </section>

        {/* CONNECT */}

        <section className="about-connect" data-reveal="section">

          <div className="about-connect-copy">

            <p className="about-kicker">
              Get In Touch
            </p>

            <h2>
              Let’s build something
              <span> useful.</span>
            </h2>

            <p>
              Want to discuss a project, development opportunity or
              collaboration? Connect with me through any of the channels
              below.
            </p>

          </div>

          <div className="about-connect-links">

            <a
              href="tel:+917498362160"
              className="about-connect-link"
            >
              <div>
                <span>
                  Mobile
                </span>

                <strong>
                  +91 74983 62160
                </strong>
              </div>

              <ArrowIcon />
            </a>

            <a
              href="mailto:pravinrokade1605@gmail.com"
              className="about-connect-link"
            >
              <div>
                <span>
                  Email
                </span>

                <strong>
                  pravinrokade1605@gmail.com
                </strong>
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
                <span>
                  GitHub
                </span>

                <strong>
                  github.com/pravin1605
                </strong>
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
                <span>
                  LinkedIn
                </span>

                <strong>
                  Pravin Rokade
                </strong>
              </div>

              <ArrowIcon />
            </a>

          </div>

        </section>

        {/* FOOTER */}

        <footer className="about-footer">

          <div>
            <strong>
              Notes Web
            </strong>

            <span>
              Learn. Read. Remember.
            </span>
          </div>

          <div className="about-footer-contact">
            <span>
              +91 74983 62160
            </span>

            <span>
              •
            </span>

            <span>
              Built by Pravin Nitin Rokade
            </span>
          </div>

        </footer>

      </div>
    </main>
  );
}

export default About;