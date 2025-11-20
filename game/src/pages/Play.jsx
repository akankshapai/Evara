import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Play() {
  const navigate = useNavigate();

  const swaras = [
    { name: "Sa", audio: "/audio/flute1.wav", color: "#8B1E23" },
    { name: "Re", audio: "/audio/flute2.wav", color: "#9A3412" },
    { name: "Ga", audio: "/audio/flute3.wav", color: "#7C2D12" },
    { name: "Ma", audio: "/audio/violin1.wav", color: "#8B5E34" },
    { name: "Pa", audio: "/audio/violin2.wav", color: "#4A3A3A" },
    { name: "Dha", audio: "/audio/tabla1.wav", color: "#8B4C39" },
    { name: "Ni", audio: "/audio/tabla2.wav", color: "#6B2F2F" },
  ];

  const [sequence, setSequence] = useState([]);
  const [userIndex, setUserIndex] = useState(0);
  const [isPlayingSeq, setIsPlayingSeq] = useState(false);
  const [activeSwara, setActiveSwara] = useState(null);

  const [wrongFlash, setWrongFlash] = useState(false);
  const [message, setMessage] = useState("Click Start to Begin");
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [countdown, setCountdown] = useState(null);

  // 🔥 STREAK
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [streakAnim, setStreakAnim] = useState(false);

  // AUDIO
  const errorSound = "/audio/tabla3.wav";
  const startSound = "/audio/start.wav";
  const fireSound = "/audio/fire.wav";

  function playSound(swara) {
    const audio = new Audio(swara.audio);
    audio.play();
  }

  // ⭐ Start Game
  function startGame() {
  // full reset
  setGameOver(false);
  setGameStarted(false);
  setSequence([]); 
  setUserIndex(0);
  setLevel(1);
  setStreak(0);

  setCountdown(3);

  new Audio(startSound).play();

  let count = 3;

  const timer = setInterval(() => {
    new Audio(startSound).play();
    count--;
    setCountdown(count);

    if (count === 0) {
      clearInterval(timer);
      setCountdown(null);

      // ⭐ WAIT FOR STATE TO RESET, THEN START LEVEL 1 ⭐
      setTimeout(() => {
        setGameStarted(true);
        // → generate FIRST BEAT ONLY!
        const first = swaras[Math.floor(Math.random() * swaras.length)];
        setSequence([first]);
        playSequence([first]);
      }, 200);
    }
  }, 1000);
}


  // ⭐ Generate next level
  function nextLevel() {
    const randomSwara = swaras[Math.floor(Math.random() * swaras.length)];
    const newSeq = [...sequence, randomSwara];

    setSequence(newSeq);
    setMessage(`Repeat the sequence...`);
    playSequence(newSeq);
  }

  // ⭐ Play sequence
  async function playSequence(seq) {
    setIsPlayingSeq(true);

    for (const swara of seq) {
      setActiveSwara(swara.name);
      playSound(swara);
      await new Promise((res) => setTimeout(res, 600));

      setActiveSwara(null);
      await new Promise((res) => setTimeout(res, 200));
    }

    setIsPlayingSeq(false);
  }

  // ⭐ User click
  function handleUserClick(swara) {
  if (!gameStarted || isPlayingSeq || gameOver) return;

  // visual + audio feedback for the tile press
  setActiveSwara(swara.name);
  setTimeout(() => setActiveSwara(null), 200);
  playSound(swara);

  // defensive: if sequence or expected item missing, ignore
  if (!sequence || !sequence[userIndex]) return;

  const correct = swara.name === sequence[userIndex].name;

  if (!correct) {
    // wrong -> immediate stop
    wrongAnswer();
    return;
  }

  // correct tile pressed
  // if this was the final tile of the current level -> level completed
  if (userIndex + 1 === sequence.length) {
    // Completed the level — update streak ONCE here
    setStreak((prev) => {
      const newStreak = prev + 1;

      // play fire sound and animate (only on full-level completion)
      try { new Audio(fireSound).play(); } catch (e) {}
      setStreakAnim(true);
      setTimeout(() => setStreakAnim(false), 400);

      // update best streak (and persist if you want)
      setBestStreak((b) => {
        const bestNow = Math.max(b, newStreak);
        try { localStorage.setItem("bestStreak", String(bestNow)); } catch (e) {}
        return bestNow;
      });

      return newStreak;
    });

    // prepare next level
    setTimeout(() => {
      setLevel((prev) => prev + 1);
      setUserIndex(0);
      nextLevel();
    }, 600);

  } else {
    // not end of level, just advance userIndex
    setUserIndex((prev) => prev + 1);
  }
}

  // ⭐ Wrong Answer
  function wrongAnswer() {
    new Audio(errorSound).play();
    setWrongFlash(true);
    setMessage("❌ Wrong! Game Over.");
    setGameOver(true);
    setStreak(0);

    setTimeout(() => setWrongFlash(false), 500);
  }

  function quitGame() {
    navigate("/");
  }

  return (
    <div
      className={`min-h-screen px-6 py-12 bg-gradient-to-br from-[#FFF7E9] to-[#F4E6C9]
      transition-all ${wrongFlash ? "animate-shake bg-red-100" : ""}`}
    >
      <h1 className="text-center text-4xl font-serif font-bold text-[#8B1E23] mb-2">
        Swara Memory Game
      </h1>

      {/* 🔥 STREAK DISPLAY */}
      <div
        className={`text-center text-lg text-[#8B1E23] font-semibold mb-2 ${
          streakAnim ? "streak-animate" : ""
        }`}
      >
        🔥 Streak: {streak} &nbsp;&nbsp;|&nbsp;&nbsp; 🌟 Best: {bestStreak}
      </div>

      <p className="text-center text-lg text-[#4A3A3A] mb-6">{message}</p>

      {countdown !== null && (
        <div className="text-center text-5xl text-[#8B1E23] font-serif my-4 animate-pulse">
          Starting in {countdown}…
        </div>
      )}

      {/* GRID */}
      <div className="w-full flex justify-center mt-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 max-w-5xl w-full">
          {swaras.map((swara) => (
            <div
              key={swara.name}
              onClick={() => handleUserClick(swara)}
              className={`
                cursor-pointer p-6 rounded-xl bg-[#FFFDF8]
                border border-[#E7D8C5] shadow-sm text-center 
                hover:shadow-lg hover:-translate-y-1 transition-all
                ${activeSwara === swara.name ? "ring-4 ring-[#D4A017]" : ""}
                ${wrongFlash ? "bg-red-200" : ""}
                ${!gameStarted || gameOver ? "opacity-50 pointer-events-none" : ""}
              `}
            >
              <div
                className="text-3xl font-serif font-bold mb-1"
                style={{ color: swara.color }}
              >
                {swara.name}
              </div>
              <p className="text-sm text-[#4A3A3A]">Tap</p>
            </div>
          ))}
        </div>
      </div>

      {/* BUTTONS */}
      <div className="mt-14 flex justify-center gap-10">
        <button
          onClick={quitGame}
          className="bg-[#8B1E23] text-white text-xl px-10 py-4 rounded-2xl shadow hover:bg-[#6f171b]"
        >
          Quit
        </button>

        <button
          onClick={startGame}
          className="bg-[#D4A017] text-white text-xl px-10 py-4 rounded-2xl shadow hover:bg-[#b78c10]"
        >
          {gameOver ? "Play Again" : gameStarted ? "Restart" : "Start Game"}
        </button>
      </div>
    </div>
  );
}
