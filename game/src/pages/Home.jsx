import { Link } from "react-router-dom";
import { supabase } from "../supabase";

export default function Home() {

  async function testSupabase() {
    const { data, error } = await supabase
      .from("leaderboard")
      .select("*")
      .limit(1);

    console.log("DATA:", data);
    console.log("ERROR:", error);
  }

  // Run the test when the component loads
  testSupabase();

  return (
    <div style={{ padding: 20 }}>
      <h1>Home</h1>
      <p>Testing Supabase… check console</p>

      <nav>
        <ul>
          <li><Link to="/character">Character</Link></li>
          <li><Link to="/hall">Hall</Link></li>
          <li><Link to="/room/tabla">Room (tabla)</Link></li>
          <li><Link to="/level/tabla/1">Level (tabla level 1)</Link></li>
          <li><Link to="/upload/tabla/1">Upload (tabla level 1)</Link></li>
          <li><Link to="/leaderboard/tabla">Leaderboard (tabla)</Link></li>
        </ul>
      </nav>
    </div>
  );
}
