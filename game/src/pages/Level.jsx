import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { lessons } from "../data/lessons";

export default function Level() {
  const { instrument, levelId } = useParams();
  const levelIndex = Number(levelId) - 1;

  const lesson = lessons[instrument][levelIndex];
  const [started, setStarted] = useState(false);

  if (!lesson) return <div>Invalid level</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>
        {lesson.title}
      </h1>

      {!started ? (
        <div>
          <img 
            src="/guru.png" 
            alt="Guru"
            style={{ width: 120, marginBottom: 20 }}
          />

          <h3>Guru Message</h3>
          <p>{lesson.guruText}</p>

          <p><strong>Audio Lesson:</strong></p>
          <audio controls src={lesson.audio}></audio>

          <br /><br />

          <button onClick={() => setStarted(true)}>
            Start Level
          </button>

          <br /><br />
          <Link to={`/room/${instrument}`}>← Back to Room</Link>
        </div>
      ) : (
        <div>
          <h3>Now it’s your turn!</h3>
          <p>Practice this level and when ready, upload your performance.</p>

          <button>
            <Link to={`/upload/${instrument}/${levelId}`}>
              Go to Upload Performance
            </Link>
          </button>

          <br /><br />
          <Link to={`/room/${instrument}`}>← Back to Room</Link>
        </div>
      )}
    </div>
  );
}
