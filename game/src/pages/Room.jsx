import { useNavigate, useParams } from "react-router-dom";

export default function Room() {
  const { instrumentName } = useParams();
  const navigate = useNavigate();

  const fixedName =
    instrumentName.charAt(0).toUpperCase() + instrumentName.slice(1).toLowerCase();

  const levels = [
    { number: 1, unlocked: true },
    { number: 2, unlocked: false },
    { number: 3, unlocked: false },
  ];

  const handleLevelClick = (levelNum, unlocked) => {
    if (!unlocked) return alert("This level is locked.");
    navigate(`/instrument/${fixedName}/level/${levelNum}/landmark`);
  };

  return (
    <div className="min-h-screen bg-[#FFF8EB] p-6" style={{ fontFamily: "Merriweather, serif" }}>
      <h1 className="text-3xl font-bold text-center text-[#8B1E23] mb-8">
        Levels – {fixedName}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {levels.map((level) => (
          <div
            key={level.number}
            onClick={() => handleLevelClick(level.number, level.unlocked)}
            className={`p-8 rounded-2xl shadow-xl text-center cursor-pointer transition ${
              level.unlocked ? "bg-white hover:scale-105" : "bg-gray-300 opacity-60"
            }`}
          >
            <div
              className={`mx-auto mb-4 rounded-full flex items-center justify-center shadow ${
                level.unlocked ? "bg-[#8B1E23] text-white" : "bg-gray-500 text-gray-300"
              }`}
              style={{ width: "80px", height: "80px", fontSize: "32px" }}
            >
              {level.number}
            </div>

            <h2 className="text-2xl font-bold text-[#8B1E23]">Level {level.number}</h2>
            <p className="mt-2 text-gray-700 text-lg">
              {level.unlocked ? "Unlocked" : "Locked"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
