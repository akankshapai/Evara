import { Link, useParams } from "react-router-dom";
import { lessons } from "../data/lessons";

export default function Room() {
  const { instrument } = useParams();
  const levels = lessons[instrument];

  return (
    <div style={{ padding: 20 }}>
      <Link to={`/hall/${instrument}`}>← Back to Hall</Link>
      <br /><br />

      <h1>{instrument} Room</h1>

      <ul>
        {levels.map((lesson, index) => {
          const levelNumber = index + 1;

          // Level 1 always unlocked
          const isUnlocked =
            levelNumber === 1 ||
            localStorage.getItem(`${instrument}_level_${levelNumber - 1}`) ===
              "completed";

          return (
            <li key={index} style={{ marginBottom: 10 }}>
              {isUnlocked ? (
                <Link to={`/level/${instrument}/${levelNumber}`}>
                  Level {levelNumber} — {lesson.title}
                </Link>
              ) : (
                <span style={{ opacity: 0.5 }}>
                  Level {levelNumber} — Locked 🔒
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
