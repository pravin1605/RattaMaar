import { useMemo } from "react";

import { getReadingStats } from "../../utils/readingStats";
import "./ReadingStatsCard.css";

/* Streak, weekly goal ring and badges for the Home page.
   Reads its own keys only (see utils/readingStats.js). */
function ReadingStatsCard() {
  const stats = useMemo(() => getReadingStats(), []);
  const percent = Math.min(100, Math.round((stats.weekDone / stats.goal) * 100));
  const earned = stats.badges.filter((badge) => badge.earned);

  return (
    <section className="stats-card" aria-label="Your reading streak and weekly goal">
      <div className="stats-streak">
        <span className="stats-flame" aria-hidden="true">🔥</span>
        <div>
          <strong>
            {stats.streak} day{stats.streak === 1 ? "" : "s"}
          </strong>
          <small>{stats.streak ? "reading streak" : "Read a note to start a streak"}</small>
        </div>
      </div>

      <div className="stats-goal">
        <div
          className="stats-ring"
          style={{ "--pct": `${percent}%` }}
          role="img"
          aria-label={`${stats.weekDone} of ${stats.goal} notes finished this week`}
        >
          <span>{stats.weekDone}/{stats.goal}</span>
        </div>
        <small>notes this week</small>
      </div>

      <div className="stats-badges">
        {earned.length === 0 ? (
          <small>Finish a note to earn your first badge</small>
        ) : (
          earned.slice(-3).map((badge) => (
            <span key={badge.id} className="stats-badge" title={badge.label}>
              <span aria-hidden="true">{badge.icon}</span>
              {badge.label}
            </span>
          ))
        )}
      </div>
    </section>
  );
}

export default ReadingStatsCard;