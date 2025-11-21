import { useNavigate, useParams } from "react-router-dom";

export default function Landmark() {
  const { instrumentName, levelNumber } = useParams();
  const navigate = useNavigate();

  const fixedName =
    instrumentName.charAt(0).toUpperCase() + instrumentName.slice(1).toLowerCase();

  return (
    <div className="min-h-screen bg-[#FFF8EB] px-6 py-10" style={{ fontFamily: "Merriweather, serif" }}>
      <h1 className="text-4xl font-bold text-center text-[#8B1E23] mb-8">
        Lesson – Level {levelNumber}
      </h1>

      <div className="flex justify-center">
        <iframe
          className="rounded-xl shadow"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/2V-20Qe4M8Y"
          title="Lesson Video"
          allowFullScreen
        ></iframe>
      </div>

      <div className="bg-[#FFF1D6] rounded-2xl p-6 mt-12 shadow-xl max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-[#8B1E23]">Lesson Notes</h2>
        <p className="text-gray-700 mt-4 leading-relaxed text-lg">
          🎵 Sa Re Ga Ma practice <br />
          🎵 Introduction to the raga <br />
          🎵 Voice modulation exercises <br />
          🎵 Basic patterns and drills
        </p>
      </div>

      <button
        onClick={() => navigate(`/instrument/${fixedName}/level/${levelNumber}`)}
        className="mt-10 w-full bg-[#8B1E23] text-white py-4 rounded-xl shadow-lg"
      >
        Proceed →
      </button>
    </div>
  );
}

