export default [
  {
    "id": "hr-int-001",
    "subjectId": "hr",
    "subjectName": "HR & Project",
    "difficulty": "beginner",
    "type": "mcq",
    "question": "What is the most effective way to prepare for the opening question \"Tell me about yourself and your project\"?",
    "options": [
      {
        "id": "a",
        "text": "Memorize a five-minute script word for word and deliver it exactly"
      },
      {
        "id": "b",
        "text": "Recite your resume line by line so nothing is missed"
      },
      {
        "id": "c",
        "text": "Prepare a 60-90 second outline of present, relevant past, and why this role, anchored on one or two concrete project results, and rehearse it out loud until it sounds conversational"
      },
      {
        "id": "d",
        "text": "Improvise entirely so the answer looks natural"
      }
    ],
    "correctOptionId": "c",
    "answer": "A short structured outline (current work or studies, relevant background, and motivation for this role) backed by concrete project results, rehearsed out loud but not memorized verbatim.",
    "explanation": "Interviewers use this answer to check communication, relevance, and enthusiasm. Memorized scripts sound robotic and collapse when interrupted, while an internal outline adapts. Keep it under about 90 seconds and end on why the role fits you. Fill every claim with your own real facts; never invent experience."
  },
  {
    "id": "hr-int-002",
    "subjectId": "hr",
    "subjectName": "HR & Project",
    "difficulty": "intermediate",
    "type": "short-answer",
    "question": "\"What was your biggest technical challenge in the project?\" How should you structure the answer?",
    "answer": "Use STAR with technical depth. Situation: name the project and the constraint in one or two sentences, for example a slow report screen in my inventory-management project. Task: the goal I owned, such as cutting load time below three seconds. Action: the real engineering work, explaining what I investigated and why I chose it, for example profiling the queries, finding an N-plus-one access pattern, adding batching and an index, and writing a regression test to keep it fixed. Result: a measurable outcome and what I learned, such as load time dropping from twelve seconds to under two. Keep the challenge genuine, own the parts I did personally, and be ready for follow-ups on trade-offs, what failed first, and how I would do it differently. If the interviewer asks about a different project, adapt the same structure rather than repeating a rehearsed story verbatim.",
    "explanation": "Interviewers test whether you actually did the work, how you diagnose problems, and whether you quantify impact. Vague answers like 'we used Spring Boot' signal no ownership; a crisp action section with one or two technical specifics signals real experience.",
    "keyPoints": [
      "STAR structure with a real constraint and a goal you owned",
      "Action section shows diagnosis, options considered, and why you chose the solution",
      "Result is quantified or clearly observable",
      "You mention what you would do differently or what you learned"
    ]
  },
  {
    "id": "hr-int-003",
    "subjectId": "hr",
    "subjectName": "HR & Project",
    "difficulty": "beginner",
    "type": "mcq",
    "question": "For the behavioral question \"Describe a time you handled a conflict in a team\", what is the best answering habit?",
    "options": [
      {
        "id": "a",
        "text": "Say you have never had a conflict so you look easygoing"
      },
      {
        "id": "b",
        "text": "Tell a STAR story focused on how you understood the other person's view, discussed the issue privately with facts, and reached a working agreement, ending with the outcome and what changed in the team"
      },
      {
        "id": "c",
        "text": "Describe in detail how the teammate was wrong and you were right"
      },
      {
        "id": "d",
        "text": "Answer hypothetically about what you would do, since real conflicts are confidential"
      }
    ],
    "correctOptionId": "b",
    "answer": "A concrete STAR story that shows empathy, direct communication based on facts and goals, and a measurable resolution.",
    "explanation": "Interviewers look for emotional maturity: you noticed the disagreement early, sought the other perspective, escalated only when needed, and kept the team's goal central. Claiming no conflicts sounds evasive; blaming a teammate signals poor collaboration. Hypotheticals are weaker than real stories."
  },
  {
    "id": "hr-int-004",
    "subjectId": "hr",
    "subjectName": "HR & Project",
    "difficulty": "intermediate",
    "type": "short-answer",
    "question": "\"Why should we hire you?\" Outline a strong answer structure and give an example answer template.",
    "answer": "Structure: match, proof, added value, close. First restate the two or three needs the role description emphasizes. Second, give one concrete proof point per need from your projects or internships, with results. Third, mention an adjacent strength that adds value, such as writing documentation others actually use. Finally, close with motivation tied to the company's actual work. Example template: 'You need someone who can work with Java backends and ship fixes quickly. In my library-management project I owned the REST layer and cut duplicate booking bugs by adding validation at the service boundary, which reduced support tickets noticeably. I also test my own code, so reviews stayed short. I am genuinely interested in your internal-tools stack because that is the kind of problem I enjoyed solving.' Never bluff about skills you lack; honest fit beats borrowed confidence.",
    "explanation": "Interviewers ask this to see whether you understand the role and can sell relevance, not arrogance. Mapping your proven work to their listed needs, with specifics, is what distinguishes a strong answer from generic lines like 'I am a hard worker'.",
    "keyPoints": [
      "Opens by restating the role's real needs",
      "Each claim is backed by a specific project example with an outcome",
      "Mentions one added-value strength without exaggeration",
      "Closes on genuine motivation and honesty about fit"
    ]
  },
  {
    "id": "hr-int-005",
    "subjectId": "hr",
    "subjectName": "HR & Project",
    "difficulty": "advanced",
    "type": "short-answer",
    "question": "\"Tell me about a time you missed a deadline. What did you do?\" How do you answer without inventing anything?",
    "answer": "Pick a real, modest example from coursework, a project sprint, or an internship. Structure: what the commitment was, why it slipped with honest ownership, what you did the moment you knew, and what changed afterward. For example: during a team project I committed to finishing the payment module by Friday, realized by Wednesday that an external API integration was far larger than estimated, informed my mentor and teammates immediately instead of at the deadline, proposed splitting the module so the rest of the team was not blocked, and delivered the reduced scope Friday with the full feature early next week. Afterward I started estimating integrations with a spike task and buffer. Key habits: own the miss rather than blaming others, show early communication as the core corrective action, and end with a concrete process change so the failure becomes learning. Avoid fake failures like 'I worked too hard'.",
    "explanation": "This tests accountability, communication under pressure, and recovery. Interviewers want to hear that you flagged risk early and protected the team's plan, not that you never fail. A specific prevention step at the end shows growth.",
    "keyPoints": [
      "Real example with honest ownership, no blame shifting",
      "Communicated the risk early to the right people",
      "Concrete corrective action that minimized team impact",
      "A lasting process change that prevents a repeat"
    ]
  },
  {
    "id": "hr-int-006",
    "subjectId": "hr",
    "subjectName": "HR & Project",
    "difficulty": "beginner",
    "type": "short-answer",
    "question": "\"What is your greatest strength?\" How do you answer with a credible example?",
    "answer": "Choose one genuine strength, name it plainly, and prove it with a short specific story, ideally with a result. Strong patterns: debugging persistence, for example 'In my ticket-booking project I tracked an intermittent double-booking bug to a race condition by adding logging around the reservation path and reproducing it with concurrent requests, which taught me to estimate risk around evidence'. Framing matters more than the label: the example should show the strength in action, be about two or three sentences, and connect to the role, for example saying your habit of writing small tests helps in a team that values reliability. Do not list five strengths or pick a humble-brag; interviewers read that as rehearsed.",
    "explanation": "Interviewers check self-awareness and whether the strength is relevant and evidenced. A single concrete anecdote beats adjectives. The answer should map to the job's demands, so study the role description before choosing which strength to present.",
    "keyPoints": [
      "One clearly named strength, not a list",
      "Backed by a short concrete example from your real work",
      "The example shows observable impact or behavior",
      "Connects to what the role actually needs"
    ]
  },
  {
    "id": "hr-int-007",
    "subjectId": "hr",
    "subjectName": "HR & Project",
    "difficulty": "intermediate",
    "type": "short-answer",
    "question": "\"What is your weakness?\" Give an answer format that is honest and shows an improvement plan.",
    "answer": "Formula: a real but non-critical weakness, one concrete example of how it hurt, steps you are actively taking, and early evidence of progress. Example template: 'I used to over-polish the first version of a feature before showing anyone, which once cost me two days on a module my teammate could have corrected in minutes after a quick review. Now I timebox prototypes, push a rough version for feedback by the end of day one, and keep a checklist of what is good enough for review. On my last project that cut rework noticeably.' Choose something genuine that is not a core requirement of the job, never claim a fabricated flaw or 'I work too hard', and always spend more time on the improvement plan than on the flaw itself.",
    "explanation": "Interviewers look for self-awareness, candor, and a learning loop. The weakness only needs to be real and modest; the improvement actions and early results are what make the answer credible.",
    "keyPoints": [
      "A genuine, non-critical weakness with a concrete instance of its cost",
      "Specific improvement actions already underway, not intentions",
      "Evidence of progress so far",
      "Avoids cliches like perfectionism or working too hard"
    ]
  },
  {
    "id": "hr-int-008",
    "subjectId": "hr",
    "subjectName": "HR & Project",
    "difficulty": "intermediate",
    "type": "short-answer",
    "question": "\"Where do you see yourself in three years?\" How do you answer honestly without over-promising?",
    "answer": "Anchor the answer on growth the company can realistically provide. Structure: the skill depth you want next, the kind of problems you want to be trusted with, and how this role is the path there. Example template: 'In the next year I want to move from building features to owning a module end to end, including its design reviews and production issues. In three years I hope to be the person juniors come to for that area, possibly guiding a small feature team, and I am interested in this role because your team rotates ownership early.' Habits of a good answer: keep it relevant to the actual position, show ambition tied to value delivered rather than titles, and stay flexible; naming a real team practice you observed in the job posting is fine, but never claim insider knowledge of company plans.",
    "explanation": "This question checks whether your goals and the role's trajectory overlap and whether you will stay long enough to be worth the investment. Answers that are too vague signal no direction; answers that promise to run the department or name exact promotions sound unrealistic.",
    "keyPoints": [
      "Concrete skill and responsibility growth, not a title demand",
      "Aligned with the role and domain being interviewed for",
      "Shows the current job as a deliberate step in the plan",
      "Ambitious but realistic and open to adjustment"
    ]
  },
  {
    "id": "hr-int-009",
    "subjectId": "hr",
    "subjectName": "HR & Project",
    "difficulty": "advanced",
    "type": "short-answer",
    "question": "In a project discussion the interviewer says: \"Explain your project to someone with no technical background.\" What do you do?",
    "answer": "Describe the problem, the user-facing behavior, and the value; touch technology only when it earns its place, with an analogy. Model answer: 'My project is a queue-management app for a small clinic. Before it, patients waited in an untracked line and staff wrote names on paper. Now a patient books a slot on their phone, sees their position in the queue, and gets a message when they are two people away, and the receptionist just watches one screen. Under the hood it keeps the live order in a shared server list so every screen updates the same way, which matters because if each device kept its own order, two patients could be called at once.' Techniques: start from the human problem, use numbers a layperson feels such as wait time, replace jargon with one analogy maximum, and check in with a short 'does that make sense so far?'. Do not say 'it uses Spring Boot and Kafka' as the opening sentence.",
    "explanation": "Interviewers test communication, empathy for the audience, and whether you truly understand the system well enough to drop the vocabulary. Clear problem-first storytelling also prepares you for stakeholder conversations on the job.",
    "keyPoints": [
      "Starts with the human problem and who benefits",
      "Describes behavior and value in plain language before any jargon",
      "At most one analogy for the technical core, offered only if useful",
      "Checks understanding and invites questions instead of monologuing"
    ]
  },
  {
    "id": "hr-int-010",
    "subjectId": "hr",
    "subjectName": "HR & Project",
    "difficulty": "intermediate",
    "type": "short-answer",
    "question": "\"How do you handle feedback, and how do you keep learning?\" What makes an answer convincing?",
    "answer": "Convincing answers carry one real receipt of feedback received, changed behavior, and a follow-up, plus a description of a repeatable learning loop. Model answer: 'In my project review my mentor pointed out that my pull requests were too large to review, which slowed the whole team. I asked for two examples of good-sized requests in our repo, started splitting features into stacked changes with a description of scope, and later a teammate said reviews on my code took minutes instead of days. For learning, I keep a short note after every bug I fix about what the real cause was, and I reserve a few hours each week on a targeted topic, currently writing better tests.' Good habits: welcome specific criticism rather than claiming you love all feedback, show that you sought clarification or re-asked for input afterward, and describe how you learn outside of courses, for example reading changelogs or reproducing fixes.",
    "explanation": "Interviewers use this to predict coachability and growth slope. A named piece of feedback with your actual adjustment proves humility and execution; generic lines like 'I always welcome feedback' prove nothing.",
    "keyPoints": [
      "A concrete example of feedback received and what specifically changed",
      "Evidence that the change was verified, such as a teammate or mentor noticing",
      "A personal, repeatable learning routine beyond formal training",
      "Tone is open to criticism without being self-deprecating"
    ]
  }
];
