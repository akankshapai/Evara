


import { useNavigate } from "react-router-dom";

// Import images properly using Vite URL resolver
const tablaIcon = new URL("../assets/images/instrument_icons/tabla.png", import.meta.url).href;
const fluteIcon = new URL("../assets/images/instrument_icons/flute.png", import.meta.url).href;
const veenaIcon = new URL("../assets/images/instrument_icons/veena1.png", import.meta.url).href;
const dholakIcon = new URL("../assets/images/instrument_icons/dholak.png", import.meta.url).href;

export default function Hall() {
  const navigate = useNavigate();

  const instruments = [
    {
      name: "Tabla",
      icon: tablaIcon,
      desc: "Rhythmic excellence. Learn classical beats.",
    },
    {
      name: "Flute",
      icon: fluteIcon,
      desc: "Soft, divine bansuri and classical ragas.",
    },
    {
      name: "Veena",
      icon: veenaIcon,
      desc: "The majestic goddess instrument.",
    },
    {
      name: "Dholak",
      icon: dholakIcon,
      desc: "Folk & classical rhythms with powerful tones.",
    },
  ];

  const goToInstrument = (name) => {
    navigate(`/instrument/${name}`);
  };

  return (
    <div className="min-h-screen bg-[#FFF8EB] p-6" style={{ fontFamily: "Merriweather, serif" }}>
      <h1 className="text-3xl font-bold text-center text-[#8B1E23]">
        Choose Your Instrument
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-10 max-w-4xl mx-auto">
        {instruments.map((item, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-2xl shadow-md hover:scale-105 transition cursor-pointer text-center"
            onClick={() => goToInstrument(item.name)}
          >
            <img
              src={item.icon}
              alt={item.name}
              style={{
                width: "150px",
                height: "150px",
                objectFit: "contain",
              }}
              className="mx-auto"
            />

            <h2 className="text-2xl font-semibold text-[#8B1E23] mt-4">
              {item.name}
            </h2>

            <p className="text-gray-700 mt-2 text-sm">{item.desc}</p>

            <button className="mt-4 w-full bg-[#8B1E23] text-white py-2 rounded-lg">
              Enter →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
