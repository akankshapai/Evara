
import { useNavigate, useParams } from "react-router-dom";

// FIXED IMAGE IMPORT PATHS (Vite-safe)
const tablaIcon = new URL("../assets/images/instrument_icons/tabla.png", import.meta.url).href;
const fluteIcon = new URL("../assets/images/instrument_icons/flute.png", import.meta.url).href;
const veenaIcon = new URL("../assets/images/instrument_icons/veena1.png", import.meta.url).href;
const dholakIcon = new URL("../assets/images/instrument_icons/dholak.png", import.meta.url).href;

export default function Instrument() {
  const { instrumentName } = useParams();
  const navigate = useNavigate();

  // CORRECT IMAGE OBJECT
  const images = {
    Tabla: tablaIcon,
    Flute: fluteIcon,
    Veena: veenaIcon,
    Dholak: dholakIcon,
  };

  // DETAILS FOR EACH INSTRUMENT
  const instrumentDetails = {
    Tabla: {
      banner: images.Tabla,
      desc: "Master classical rhythms through structured tabla training.",
      benefits: [
        "Learn basic & advanced taals",
        "Build strong rhythm foundation",
        "Practice along classical compositions",
      ],
    },
    Flute: {
      banner: images.Flute,
      desc: "The art of bansuri: breath, tone, and ragas.",
      benefits: [
        "Improve breath & tone",
        "Learn fingering patterns",
        "Raga improvisation basics",
      ],
    },
    Veena: {
      banner: images.Veena,
      desc: "Discover divine melodies of this ancient instrument.",
      benefits: [
        "Learn plucking techniques",
        "Master ragas step-by-step",
        "Cultural composition training",
      ],
    },
    Dholak: {
      banner: images.Dholak,
      desc: "Learn folk & classical rhythms with powerful tones.",
      benefits: [
        "Build rhythmic control",
        "Left-right hand balancing",
        "Indian folk beat patterns",
      ],
    },
  };

  const data = instrumentDetails[instrumentName] || {};

  return (
    <div
      className="min-h-screen bg-[#FFF8EB] px-6 py-10"
      style={{ fontFamily: "Merriweather, serif" }}
    >
      {/* TITLE */}
      <h1 className="text-4xl font-bold text-[#8B1E23] text-center mb-6">
        {instrumentName}
      </h1>

      {/* IMAGE (resized & clean) */}
      <div className="flex justify-center">
        <img
          src={data.banner}
          alt={instrumentName}
          style={{
            width: "160px",
            height: "160px",
            objectFit: "contain",
          }}
          className="shadow-md rounded-xl"
        />
      </div>

      {/* DESCRIPTION */}
      <p className="text-center text-gray-700 mt-6 text-lg max-w-2xl mx-auto">
        {data.desc}
      </p>

      {/* BENEFITS */}
      <h2 className="text-2xl font-semibold text-[#8B1E23] mt-10">Benefits</h2>

      <ul className="mt-4 space-y-3 text-gray-700 max-w-2xl mx-auto">
        {data.benefits?.map((b, index) => (
          <li
            key={index}
            className="bg-white p-4 rounded-lg shadow border border-[#F0D9B5]"
          >
            {b}
          </li>
        ))}
      </ul>

      {/* BUTTON */}
      <button
        onClick={() => navigate(`/instrument/${instrumentName}/gurus`)}
        className="mt-10 w-full bg-[#8B1E23] text-white py-3 rounded-xl shadow-md hover:scale-105 transition"
      >
        Choose Guru →
      </button>
    </div>
  );
}
