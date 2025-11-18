import { useParams, Link, useLocation } from "react-router-dom";

export default function Result() {
  const { instrument, levelId } = useParams();
  const location = useLocation();

  // Read stars from navigation state
  const stars = location.state?.stars || 0;

  return (
    <div style={{ padding: 20 }}>
      <h1>Level {levelId} Completed!</h1>

      <h2>You earned: {"⭐".repeat(stars)}</h2>

      <br /><br />

      <Link to={`/leaderboard/${instrument}`}>
        <button>Go to Leaderboard</button>
      </Link>

      <br /><br />

      <Link to={`/room/${instrument}`}>← Back to Room</Link>
    </div>
  );
}
