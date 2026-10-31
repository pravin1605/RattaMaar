import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";
import "./AboutExtras.css";

/* =========================================================
   CONTENT (all facts below are yours; edit freely)
========================================================= */

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
    icon: "{ }",
    description: "Core programming and problem-solving technologies.",
    skills: ["Java", "JavaScript", "C", "OOP", "Data Structures", "Algorithms", "Problem Solving"],
  },
  {
    title: "Java Development",
    icon: "☕",
    description: "Backend and enterprise Java technologies.",
    skills: ["JDBC", "Servlet", "JSP", "Hibernate", "Spring", "Spring Boot", "Maven", "REST API"],
  },
  {
    title: "Frontend",
    icon: "◧",
    description: "Technologies used to build modern web interfaces.",
    skills: ["HTML5", "CSS3", "JavaScript", "React", "Responsive Design", "DOM", "JSON", "Fetch API"],
  },
  {
    title: "Databases",
    icon: "▤",
    description: "Relational and NoSQL database technologies.",
    skills: ["SQL", "MySQL", "PostgreSQL", "MongoDB", "Database Design", "Joins", "Queries", "CRUD"],
  },
  {
    title: "Development Tools",
    icon: "⚙",
    description: "Tools used throughout the development workflow.",
    skills: ["Git", "GitHub", "VS Code", "IntelliJ IDEA", "Eclipse", "Postman", "Chrome DevTools", "npm"],
  },
  {
    title: "Mobile & Cloud",
    icon: "☁",
    description: "Mobile development and backend/cloud technologies.",
    skills: ["Android", "Firebase", "Authentication", "Cloud Firestore", "FCM", "Hosting", "Vercel", "GitHub Pages"],
  },
];

/* Listed in the order they happened, so the timeline reads forwards. */
const education = [
  {
    level: "SSC",
    title: "Secondary School Certificate",
    institution: "Maharashtra State Board",
    period: "2019 — 2020",
    result: "91.40%",
    detail: "Class X",
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
];

const achievements = [
  {
    mark: "01",
    title: "ELECTROWIZ 25",
    result: "1st Prize — Software Category",
    description: "Recognized in the software category at the project competition.",
  },
  {
    mark: "02",
    title: "Code Automata '25",
    result: "Winner",
    description: "Team achievement in a competitive software development event.",
  },
  {
    mark: "03",
    title: "EduConnect",
    result: "2nd Place",
    description: "AI-powered student mentoring platform developed as Team Duo Dare.",
  },
  {
    mark: "04",
    title: "React Native VAP",
    result: "Runner-Up",
    description: "Runner-up recognition during the React Native Value Addition Program.",
  },
  {
    mark: "05",
    title: "EduScan",
    result: "VAP Best Project",
    description: "Educational platform project developed using React Native.",
  },
  {
    mark: "06",
    title: "GDG on Campus",
    result: "Organizer",
    description: "Selected as a GDG on Campus Organizer for Vishwaniketan.",
  },
];

const interests = [
  { icon: "</>", title: "Software Engineering", description: "Structured, maintainable applications and useful features." },
  { icon: "API", title: "Backend & APIs", description: "Application logic, data flow and service integration." },
  { icon: "UI", title: "User Experience", description: "Interfaces that are clear, responsive and accessible." },
  { icon: "AI", title: "Emerging Technology", description: "Exploring new tools and practical ways to use them." },
];

const principles = [
  { icon: "🎯", title: "Useful first", text: "I start from the problem a real person has, then shape the software around it." },
  { icon: "🧹", title: "Clear code", text: "Readable, maintainable code and reliable functionality over clever shortcuts." },
  { icon: "🔁", title: "Keep improving", text: "Ship, learn from real challenges, and make the next version better." },
];

const ROLES = ["Developer", "Creator", "Learner"];

const CHAPTERS = [
  { id: "ab-spark", no: "01", title: "The Spark" },
  { id: "ab-foundations", no: "02", title: "Foundations" },
  { id: "ab-toolkit", no: "03", title: "The Toolkit" },
  { id: "ab-build", no: "04", title: "Building" },
  { id: "ab-proof", no: "05", title: "Proof" },
  { id: "ab-drive", no: "06", title: "What Drives Me" },
  { id: "ab-next", no: "07", title: "What's Next" },
];

const PROJECT_FILTERS = [
  { id: "all", label: "All" },
  { id: "Live Demo", label: "Live demos" },
  { id: "GitHub", label: "On GitHub" },
];

const EMAIL = "pravinrokade1605@gmail.com";

/* =========================================================
   SMALL PIECES
========================================================= */

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

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

/* Counts up once, when it scrolls into view. */
function CountUp({ value, decimals = 0, pad = 0, suffix = "" }) {
  const ref = useRef(null);
  const format = useCallback(
    (n) => `${n.toFixed(decimals).padStart(pad + (decimals ? decimals + 1 : 0), "0")}${suffix}`,
    [decimals, pad, suffix]
  );
  const [text, setText] = useState(() => format(value));

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !("IntersectionObserver" in window)) return undefined;

    let frame = 0;
    setText(format(0));
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const run = (now) => {
          const t = Math.min(1, (now - start) / 1300);
          const eased = 1 - Math.pow(1 - t, 3);
          setText(format(value * eased));
          if (t < 1) frame = requestAnimationFrame(run);
        };
        frame = requestAnimationFrame(run);
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, format]);

  return <span ref={ref}>{text}</span>;
}

function Chapter({ id, no, title, heading, subtitle, children }) {
  return (
    <section className="about-section ab-chapter" id={id} data-reveal="section" data-chapter={id}>
      <div className="about-section-heading">
        <span className="about-section-number">{no}</span>
        <div>
          <p className="about-kicker">
            Chapter {no} · {title}
          </p>
          <h2>{heading}</h2>
          {subtitle && <p className="about-section-subtitle">{subtitle}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

/* =========================================================
   PAGE
========================================================= */

function About() {
  const navigate = useNavigate();
  const pageRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [activeChapter, setActiveChapter] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [skillTab, setSkillTab] = useState(0);
  const [projectFilter, setProjectFilter] = useState("all");
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef(0);

  const uniqueSkills = useMemo(
    () => new Set(skillGroups.flatMap((group) => group.skills)).size,
    []
  );

  const visibleProjects = useMemo(
    () => projects.filter((p) => projectFilter === "all" || p.type === projectFilter),
    [projectFilter]
  );

  const currentChapter = CHAPTERS.find((c) => c.id === activeChapter);

  /* ----- reveal on scroll (existing behaviour) ----- */
  useEffect(() => {
    const page = pageRef.current;
    if (!page) return undefined;

    const revealElements = page.querySelectorAll("[data-reveal]");

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
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
      { threshold: 0.08, rootMargin: "0px 0px -35px 0px" }
    );

    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [visibleProjects]);

  /* ----- reading progress + back-to-top ----- */
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
      setShowTop(window.scrollY > 900);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* ----- which chapter is on screen ----- */
  useEffect(() => {
    const page = pageRef.current;
    if (!page || !("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveChapter(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    page.querySelectorAll("[data-chapter]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ----- rotating role word in the hero ----- */
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2400);
    return () => clearInterval(id);
  }, []);

  /* ----- chapter menu: Escape / outside click ----- */
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    const onClick = (e) => {
      if (!e.target.closest?.(".ab-chapter-nav")) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onClick);
    };
  }, [menuOpen]);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  const goToChapter = (id) => {
    setMenuOpen(false);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  };

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const area = document.createElement("textarea");
      area.value = EMAIL;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="about-page" ref={pageRef} id="about-top">
      <div className="about-background-grid" aria-hidden="true" />
      <div className="about-floating-orb about-orb-one" aria-hidden="true" />
      <div className="about-floating-orb about-orb-two" aria-hidden="true" />
      <div className="about-floating-orb about-orb-three" aria-hidden="true" />

      {/* reading progress */}
      <div
        className="ab-progress"
        role="progressbar"
        aria-label="Reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
      >
        <i style={{ width: `${progress}%` }} />
      </div>

      {/* chapter menu */}
      <nav className="ab-chapter-nav" aria-label="Story chapters">
        <button
          type="button"
          className="ab-chapter-button"
          aria-expanded={menuOpen}
          aria-haspopup="true"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="ab-chapter-dot" aria-hidden="true" />
          <span>
            {currentChapter ? `${currentChapter.no} · ${currentChapter.title}` : "Prologue"}
          </span>
          <span aria-hidden="true">{menuOpen ? "▴" : "▾"}</span>
        </button>

        {menuOpen && (
          <ul className="ab-chapter-menu">
            <li>
              <button type="button" onClick={() => { setMenuOpen(false); scrollToTop(); }}>
                <b>00</b> Prologue
              </button>
            </li>
            {CHAPTERS.map((chapter) => (
              <li key={chapter.id}>
                <button
                  type="button"
                  className={activeChapter === chapter.id ? "is-active" : ""}
                  onClick={() => goToChapter(chapter.id)}
                >
                  <b>{chapter.no}</b> {chapter.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </nav>

      <div className="about-container">
        <button
          className="about-back-button"
          onClick={() => navigate("/settings")}
          type="button"
        >
          <span aria-hidden="true">←</span>
          <span>Back to Settings</span>
        </button>

        {/* ===================== PROLOGUE ===================== */}
        <section className="about-hero" data-reveal="hero">
          <div className="about-hero-copy">
            <div className="about-eyebrow">
              <span className="about-status-dot" />
              <span>
                <span className="ab-role" key={roleIndex}>{ROLES[roleIndex]}</span>
                <span className="ab-role-sr"> · Developer · Creator · Learner</span>
              </span>
            </div>

            <p className="about-hero-overline">THE PERSON BEHIND NOTES WEB</p>

            <h1>
              Notes
              <span>Web.</span>
            </h1>

            <p className="about-tagline">Learn. Read. Remember.</p>

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
              <a href="#ab-spark" className="about-primary-button" onClick={(e) => { e.preventDefault(); goToChapter("ab-spark"); }}>
                Read the story <ArrowIcon />
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
                  <p className="about-profile-subtitle">Software Developer</p>
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

        {/* ===================== STORY MAP + STATS ===================== */}
        <section className="about-stats" data-reveal="section" aria-label="At a glance">
          <div className="about-stat">
            <strong>2022–26</strong>
            <span>Engineering</span>
            <div className="about-stat-accent" />
          </div>
          <div className="about-stat">
            <strong><CountUp value={projects.length} pad={2} /></strong>
            <span>Featured Projects</span>
            <div className="about-stat-accent" />
          </div>
          <div className="about-stat">
            <strong><CountUp value={uniqueSkills} /></strong>
            <span>Technologies</span>
            <div className="about-stat-accent" />
          </div>
          <div className="about-stat">
            <strong><CountUp value={91.4} decimals={2} suffix="%" /></strong>
            <span>SSC</span>
            <div className="about-stat-accent" />
          </div>
        </section>

        <section className="ab-storymap" data-reveal="section" aria-label="The story in seven chapters">
          <p className="about-kicker">The story in seven chapters</p>
          <ol>
            {CHAPTERS.map((chapter) => (
              <li key={chapter.id}>
                <button type="button" onClick={() => goToChapter(chapter.id)}>
                  <b>{chapter.no}</b>
                  <span>{chapter.title}</span>
                </button>
              </li>
            ))}
          </ol>
        </section>

        {/* ===================== 01 THE SPARK ===================== */}
        <Chapter
          id="ab-spark"
          no="01"
          title="The Spark"
          heading="More than just code."
          subtitle="The thinking, curiosity and purpose behind what I build."
        >
          <blockquote className="ab-narration">
            Learning is easier when everything you need is in one calm,
            organized place. That idea became <strong>Notes Web</strong>.
          </blockquote>

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
        </Chapter>

        {/* ===================== 02 FOUNDATIONS ===================== */}
        <Chapter
          id="ab-foundations"
          no="02"
          title="Foundations"
          heading="It started in the classroom."
          subtitle="Strong fundamentals first: programming, object-oriented concepts, data structures, algorithms and databases."
        >
          <ol className="ab-timeline">
            {education.map((item, index) => (
              <li
                className="ab-timeline-item"
                key={item.level}
                data-reveal="card"
                style={{ "--card-delay": `${index * 110}ms` }}
              >
                <span className="ab-timeline-dot" aria-hidden="true" />
                <article className="about-education-card">
                  <div className="about-education-top">
                    <span className="about-education-level">{item.level}</span>
                    <span className="about-education-result">{item.result}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p className="about-education-institution">{item.institution}</p>
                  <div className="about-education-bottom">
                    <span>{item.detail}</span>
                    <span>{item.period}</span>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </Chapter>

        {/* ===================== 03 TOOLKIT ===================== */}
        <Chapter
          id="ab-toolkit"
          no="03"
          title="The Toolkit"
          heading="Tools picked up along the way."
          subtitle="Pick a group to see what's inside. These are areas of study and use, not a claim of equal expertise in every technology."
        >
          <div className="ab-skill-tabs" role="tablist" aria-label="Skill groups">
            {skillGroups.map((group, index) => (
              <button
                key={group.title}
                type="button"
                role="tab"
                id={`ab-tab-${index}`}
                aria-selected={skillTab === index}
                aria-controls="ab-skill-panel"
                className={`ab-skill-tab ${skillTab === index ? "is-active" : ""}`}
                onClick={() => setSkillTab(index)}
              >
                <span aria-hidden="true">{group.icon}</span>
                {group.title}
                <b>{group.skills.length}</b>
              </button>
            ))}
          </div>

          <div
            className="ab-skill-panel"
            id="ab-skill-panel"
            role="tabpanel"
            aria-labelledby={`ab-tab-${skillTab}`}
            key={skillGroups[skillTab].title}
          >
            <div className="ab-skill-panel-head">
              <span className="ab-skill-panel-icon" aria-hidden="true">
                {skillGroups[skillTab].icon}
              </span>
              <div>
                <h3>{skillGroups[skillTab].title}</h3>
                <p>{skillGroups[skillTab].description}</p>
              </div>
              <div className="about-skill-count">
                <strong>{uniqueSkills}</strong>
                <span>in total</span>
              </div>
            </div>

            <div className="about-skill-list">
              {skillGroups[skillTab].skills.map((skill, i) => (
                <span key={skill} style={{ "--i": i }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </Chapter>

        {/* ===================== 04 BUILDING ===================== */}
        <Chapter
          id="ab-build"
          no="04"
          title="Building"
          heading="Then ideas became products."
          subtitle="Web applications, mobile projects and product concepts. Open a link to explore the work."
        >
          {/* the app you're holding */}
          <article className="ab-spotlight" data-reveal="card">
            <div className="ab-spotlight-badge">YOU ARE HERE</div>
            <div className="ab-spotlight-body">
              <p className="about-kicker">The project you're holding</p>
              <h3>Notes Web</h3>
              <p>
                The app you're reading this in: subject notes, a focused
                reader that remembers where you stopped, progress and
                streaks, bookmarks and sticky notes, and an installable app
                that works offline.
              </p>
              <div className="about-project-tech">
                {["React", "PWA", "Offline-ready"].map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <button type="button" className="about-primary-button" onClick={() => navigate("/subjects")}>
                Open the notes <ArrowIcon />
              </button>
            </div>
          </article>

          <div className="ab-filter-row" role="tablist" aria-label="Filter projects">
            {PROJECT_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={projectFilter === f.id}
                className={`ab-chip ${projectFilter === f.id ? "is-active" : ""}`}
                onClick={() => setProjectFilter(f.id)}
              >
                {f.label}
                <b>{f.id === "all" ? projects.length : projects.filter((p) => p.type === f.id).length}</b>
              </button>
            ))}
          </div>

          <div className="about-projects-grid">
            {visibleProjects.map((project, index) => (
              <article
                className="about-project-card"
                key={project.number}
                data-reveal="card"
                style={{ "--card-delay": `${index * 65}ms` }}
              >
                <div className="about-project-header">
                  <span className="about-project-number">/ {project.number}</span>
                  <span className="about-project-category">{project.category}</span>
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

          <h3 className="ab-subheading">Learning on the job</h3>

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
                {["HTML5", "CSS3", "JavaScript", "React", "Bootstrap"].map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          </article>
        </Chapter>

        {/* ===================== 05 PROOF ===================== */}
        <Chapter
          id="ab-proof"
          no="05"
          title="Proof"
          heading="And the work got noticed."
          subtitle="Milestones and recognition along the way."
        >
          <div className="about-achievements-grid">
            {achievements.map((achievement, index) => {
              const text = achievement.result.toLowerCase();
              const medal = /1st|winner/.test(text) ? "🥇" : /2nd|runner/.test(text) ? "🥈" : "🏅";
              return (
                <article
                  className={`about-achievement-card ab-award ${index === 0 ? "is-top" : ""}`}
                  key={achievement.title}
                  data-reveal="card"
                  style={{ "--card-delay": `${index * 70}ms` }}
                >
                  <div className="about-achievement-number" aria-hidden="true">
                    {medal}
                  </div>
                  <div>
                    <h3>{achievement.title}</h3>
                    <strong>{achievement.result}</strong>
                    <p>{achievement.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </Chapter>

        {/* ===================== 06 WHAT DRIVES ME ===================== */}
        <Chapter
          id="ab-drive"
          no="06"
          title="What Drives Me"
          heading="How I work, and what I'm curious about."
          subtitle="The habits behind the projects, and the areas I keep exploring."
        >
          <div className="ab-principles">
            {principles.map((item, index) => (
              <article
                className="ab-principle"
                key={item.title}
                data-reveal="card"
                style={{ "--card-delay": `${index * 90}ms` }}
              >
                <span aria-hidden="true">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>

          <div className="about-interests-grid">
            {interests.map((item, index) => (
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
        </Chapter>

        {/* ===================== 07 WHAT'S NEXT ===================== */}
        <Chapter
          id="ab-next"
          no="07"
          title="What's Next"
          heading="Keep improving. Keep building."
          subtitle="Deepening engineering skills, improving product quality and learning through real development challenges."
        >
          <section className="about-connect ab-connect" data-reveal="section">
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

              <button type="button" className="ab-copy" onClick={copyEmail}>
                {copied ? "✓ Email copied" : "Copy email address"}
              </button>
              <span className="ab-sr-only" role="status" aria-live="polite">
                {copied ? "Email address copied" : ""}
              </span>
            </div>

            <div className="about-connect-links">
              <a href="tel:+917498362160" className="about-connect-link">
                <div>
                  <span>Mobile</span>
                  <strong>+91 74983 62160</strong>
                </div>
                <ArrowIcon />
              </a>

              <a href={`mailto:${EMAIL}`} className="about-connect-link">
                <div>
                  <span>Email</span>
                  <strong>{EMAIL}</strong>
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
        </Chapter>

        {/* ===================== EPILOGUE ===================== */}
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

            <button type="button" className="about-back-to-top" onClick={scrollToTop}>
              Back to top ↑
            </button>
          </div>
        </footer>
      </div>

      {showTop && (
        <button type="button" className="ab-fab" onClick={scrollToTop} aria-label="Back to top">
          ↑
        </button>
      )}
    </main>
  );
}

export default About;