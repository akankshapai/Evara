import { useNavigate, useParams } from "react-router-dom";

export default function Level() {
  const { instrumentName, levelNumber } = useParams();
  const navigate = useNavigate();

  const fixedName =
    instrumentName.charAt(0).toUpperCase() + instrumentName.slice(1).toLowerCase();

  return (
    <div className="min-h-screen bg-[#FFF8EB] px-6 py-10" style={{ fontFamily: "Merriweather, serif" }}>
      <h1 className="text-4xl font-bold text-[#8B1E23] text-center mb-6">
        Level {levelNumber} – {fixedName}
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold text-[#8B1E23]">
          Instructions
        </h2>
        <p className="text-gray-700 mt-4 text-lg">
          🎵 Sing or play the lesson you learned <br />
          🎵 Keep your mic close <br />
          🎵 Maintain pitch & rhythm
        </p>
      </div>

      <div className="bg-[#FFF1D6] p-6 rounded-2xl mt-10 max-w-2xl mx-auto shadow-xl">
        <h2 className="text-2xl font-semibold text-center text-[#8B1E23] mb-6">
          Your Recording
        </h2>

        <div className="flex flex-col gap-4">
          <button className="bg-[#8B1E23] text-white py-3 rounded-lg shadow-md">
            🎙 Start Recording
          </button>

          <button className="bg-gray-800 text-white py-3 rounded-lg shadow-md">
            ⏹ Stop Recording
          </button>

          <button className="bg-blue-700 text-white py-3 rounded-lg shadow-md">
            ▶ Play Audio
          </button>

          <button className="bg-green-700 text-white py-3 rounded-lg shadow-md">
            ⬆ Upload Audio
          </button>
        </div>
      </div>

      <button className="mt-10 w-full bg-[#8B1E23] text-white py-4 rounded-xl shadow-lg">
        Submit for Grading →
      </button>
    </div>
  );
}
