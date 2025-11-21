import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase";

export default function Leaderboard() {
  const { instrument } = useParams();
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadScores() {
      const { data, error } = await supabase
        .from("leaderboard")
        .select("*")
        .eq("instrument", instrument)
        .order("stars", { ascending: false })
        .order("level", { ascending: true });

      if (error) {
        console.error("Leaderboard error:", error);
      } else {
        setScores(data);
      }

      setLoading(false);
    }

    loadScores();
  }, [instrument]);

  if (loading) return <div>Loading leaderboard...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Leaderboard — {instrument}</h1>

      {scores.length === 0 && <p>No entries yet.</p>}

      <ul>
        {scores.map((item, index) => (
          <li key={item.id}>
            <strong>{index + 1}. {item.user}</strong> — 
            ⭐ {item.stars} stars — 
            Level {item.level} — 
            <a href={item.url} target="_blank">View Performance</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
