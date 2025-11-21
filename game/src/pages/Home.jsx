import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";
import VeenaImg from "../assets/images/veena.png";

export default function Home() {
  const [leaderboardRow, setLeaderboardRow] = useState(null);
  const [sbError, setSbError] = useState(null);

  useEffect(() => {
    async function testSupabase() {
      try {
        const { data, error } = await supabase
          .from("leaderboard")
          .select("*")
          .limit(1);

        if (error) setSbError(error);
        else setLeaderboardRow(data?.[0] ?? null);

      } catch (err) {
        setSbError(err);
      }
    }
    testSupabase();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8EB] to-[#F3E0C3] relative overflow-hidden">

      {/* Background */}
      <img
        src={VeenaImg}
        alt="veena"
        className="absolute top-[-40px] right-[-20px] w-[450px] opacity-[0.15] rotate-[-12deg] pointer-events-none select-none"
      />

      {/* Title */}
      <div className="text-center mt-10">
        <h1 className="text-6xl font-serif text-[#8B1E23] font-bold drop-shadow-md">
          Saraswathi Archives
        </h1>
        <p className="mt-4 text-lg text-[#4A3A3A] max-w-2xl mx-auto">
          Explore classical music through swaras, instruments, challenges, and interactive learning.
        </p>
      </div>

      {/* MAIN OPTIONS */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {/* Swara Game */}
        <Link
          to="/play"
          className="no-underline bg-[#FFF9F0] border border-[#E7D8C5] rounded-3xl p-8 shadow-lg 
                     hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer text-center group"
        >
          <div className="text-4xl mb-3 group-hover:scale-110 transition">🎵</div>
          <h2 className="text-2xl font-serif text-[#8B1E23] mb-2">Play Swara Game</h2>
          <p className="text-[#3A2F2F]">Test memory with swara sequences.</p>
        </Link>

        {/* Learn Swaras */}
        {/* Musical Match – Practice Partners */}
<Link
  to="/match"
  className="no-underline bg-[#FFF9F0] border border-[#E7D8C5] rounded-3xl p-8 shadow-lg
             hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer text-center group"
>
  <div className="text-4xl mb-3 group-hover:scale-110 transition">🎼</div>
  <h2 className="text-2xl font-serif text-[#8B1E23] mb-2">Musical Match</h2>
  <p className="text-[#3A2F2F]">
    Find practice partners and collaborate through music.
  </p>
</Link>

        <Link
          to="/learn"
          className="no-underline bg-[#FFF9F0] border border-[#E7D8C5] rounded-3xl p-8 shadow-lg 
                     hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer text-center group"
        >
          <div className="text-4xl mb-3 group-hover:scale-110 transition">📚</div>
          <h2 className="text-2xl font-serif text-[#8B1E23] mb-2">Learn Swaras</h2>
          <p className="text-[#3A2F2F]">Listen and practice the classical notes.</p>
        </Link>

        {/* INSTRUMENT ROOMS (MAIN FLOW) */}
        <Link
          to="/hall"
          className="no-underline bg-[#FFF9F0] border border-[#E7D8C5] rounded-3xl p-8 shadow-lg 
                     hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer text-center group"
        >
          <div className="text-4xl mb-3 group-hover:scale-110 transition">🥁</div>
          <h2 className="text-2xl font-serif text-[#8B1E23] mb-2">Instrument Rooms</h2>
          <p className="text-[#3A2F2F]">Choose an instrument and complete levels.</p>
        </Link>

      </div>

      {/* SECONDARY LINKS */}
      <div className="mt-16 text-center">
        <Link className="no-underline mx-4 text-[#8B1E23] hover:text-[#D68A0F] transition" to="/character">
          Character
        </Link>
        <Link className="no-underline mx-4 text-[#8B1E23] hover:text-[#D68A0F] transition" to="/leaderboard/tabla">
          Leaderboard
        </Link>
      </div>

      {/* Supabase status */}
      <div className="mt-8 text-center text-sm text-[#4A3A3A]">
        <strong>Supabase test:</strong>{" "}
        {sbError ? (
          <span className="text-red-600">Error</span>
        ) : leaderboardRow ? (
          <span>Loaded row id: {leaderboardRow.id ?? "unknown"}</span>
        ) : (
          <span>Loading…</span>
        )}
      </div>

    </div>
  );
}
