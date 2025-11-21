import { useState } from "react";

export default function Leaderboard() {
  // Filters
  const [instrument, setInstrument] = useState("All");
  const [level, setLevel] = useState("All");

  // Cleaned NEW dummy leaderboard data (ONLY 4 instruments)
  const dummyData = [
    {
      rank: 1,
      avatar: "/assets/images/avatars/avatar1.png",
      username: "Meera",
      score: 980,
      instrument: "Tabla",
      level: 1,
    },
    {
      rank: 2,
      avatar: "/assets/images/avatars/avatar2.png",
      username: "Arjun",
      score: 910,
      instrument: "Flute",
      level: 1,
    },
    {
      rank: 3,
      avatar: "/assets/images/avatars/avatar3.png",
      username: "Kiran",
      score: 880,
      instrument: "Veena",
      level: 2,
    },
    {
      rank: 4,
      avatar: "/assets/images/avatars/avatar4.png",
      username: "Lakshmi",
      score: 850,
      instrument: "Dholak",
      level: 1,
    },
  ];

  // Filter logic (UI only)
  const filtered = dummyData.filter((item) => {
    const instrumentMatch =
      instrument === "All" || item.instrument === instrument;
    const levelMatch = level === "All" || item.level === Number(level);
    return instrumentMatch && levelMatch;
  });

  return (
    <div
      className="min-h-screen bg-[#FFF8EB] p-6"
      style={{ fontFamily: "Merriweather, serif" }}
    >
      <h1 className="text-3xl font-bold text-center text-[#8B1E23]">
        Leaderboard
      </h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
        <select
          value={instrument}
          onChange={(e) => setInstrument(e.target.value)}
          className="px-4 py-2 rounded-lg border shadow"
        >
          <option>All</option>
          <option>Tabla</option>
          <option>Flute</option>
          <option>Veena</option>
          <option>Dholak</option>
        </select>

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="px-4 py-2 rounded-lg border shadow"
        >
          <option>All</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
      </div>

      {/* Leaderboard List */}
      <div className="mt-10 max-w-3xl mx-auto space-y-4">
        {filtered.map((item) => (
          <div
            key={item.rank}
            className="flex items-center bg-white p-4 rounded-2xl shadow-md"
          >
            <div className="w-12 text-xl font-bold text-[#8B1E23]">
              #{item.rank}
            </div>

            <img
              src={item.avatar}
              alt="avatar"
              className="w-14 h-14 rounded-full shadow ml-3 object-cover"
            />

            <div className="ml-4 flex-1">
              <h3 className="text-lg font-semibold text-[#8B1E23]">
                {item.username}
              </h3>
              <p className="text-gray-700">
                {item.instrument} • Level {item.level}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xl font-semibold">{item.score}</p>
              <p className="text-yellow-600">⭐ ⭐ ⭐ ⭐</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
