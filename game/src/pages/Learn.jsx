import React, { useState } from "react";

export default function Learn() {

  const swaras = [
    { name: "Sa", audio: "/audio/flute1.wav", color: "#8B1E23" },
    { name: "Re", audio: "/audio/flute2.wav", color: "#9A3412" },
    { name: "Ga", audio: "/audio/flute3.wav", color: "#7C2D12" },
    { name: "Ma", audio: "/audio/violin1.wav", color: "#8B5E34" },
    { name: "Pa", audio: "/audio/violin2.wav", color: "#4A3A3A" },
    { name: "Dha", audio: "/audio/tabla1.wav", color: "#8B4C39" },
    { name: "Ni", audio: "/audio/tabla2.wav", color: "#6B2F2F" }
  ];

  const [activeSwara, setActiveSwara] = useState(null);

  function playAudio(swara) {
    const audio = new Audio(swara.audio);
    audio.play();

    setActiveSwara(swara.name);
    setTimeout(() => setActiveSwara(null), 400);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7E9] to-[#F4E6C9] px-6 py-12">

      <h1 className="text-center text-5xl font-serif text-[#8B1E23] font-bold drop-shadow mb-6">
        Learn Swaras
      </h1>

      <p className="text-center text-[#4A3A3A] max-w-xl mx-auto mb-12 text-lg">
        Tap a swara to hear its sound. Practice the sequence Sa–Re–Ga–Ma–Pa–Dha–Ni.
      </p>

      {/* GRID */}
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 max-w-5xl w-full">

          {swaras.map((swara) => (
            <div
              key={swara.name}
              onClick={() => playAudio(swara)}
              className={`
                cursor-pointer
                p-6
                rounded-xl
                bg-[#FFFDF8]
                border
                border-[#E7D8C5]
                shadow-sm
                hover:shadow-lg
                hover:-translate-y-1
                transition-all
                text-center
                select-none
                ${activeSwara === swara.name ? "ring-4 ring-[#D4A017]" : ""}
              `}
            >
              <div
                className="text-3xl font-serif font-bold mb-1"
                style={{ color: swara.color }}
              >
                {swara.name}
              </div>

              <p className="text-xs text-[#4A3A3A]">Tap to Play</p>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
}
