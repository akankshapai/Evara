// Evara/game/src/pages/MusicalMatch.jsx
import React, { useRef, useState } from "react";
import { users as dummyUsers } from "../data/dummyUsers";

const STORAGE_KEY = "connections";

export default function MusicalMatch() {
  const [cards, setCards] = useState(dummyUsers.slice()); // copy
  const [drag, setDrag] = useState(null);
  const [swipeAnim, setSwipeAnim] = useState(null);
  const topRef = useRef(null);

  // layout constants
  const cornerRadius = 28;
  const cardWidth = 360;
  const cardHeight = 540;

  // save to localStorage (no duplicates)
  const saveConnection = (user) => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      if (!saved.some((u) => u.username === user.username)) {
        saved.push(user);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
      }
    } catch (e) {
      console.error("saveConnection error", e);
    }
  };

  const popTop = (shouldSave) => {
    const top = cards[cards.length - 1];
    if (!top) return;
    if (shouldSave) saveConnection(top);
    setCards((prev) => prev.slice(0, prev.length - 1));
  };

  // pointer handlers
  const handlePointerDown = (e) => {
    if (cards.length === 0) return;
    if (swipeAnim?.active) return;
    const p = e.nativeEvent;
    try { e.currentTarget.setPointerCapture(p.pointerId); } catch {}
    setDrag({
      pointerId: p.pointerId,
      startX: p.clientX,
      startY: p.clientY,
      x: 0,
      y: 0,
      active: true,
    });
  };

  const handlePointerMove = (e) => {
    if (!drag?.active) return;
    const p = e.nativeEvent;
    if (p.pointerId !== drag.pointerId) return;
    setDrag((d) => ({ ...d, x: p.clientX - d.startX, y: p.clientY - d.startY }));
  };

  const handlePointerUp = () => {
    if (!drag) return;
    const threshold = 120;
    if (drag.x > threshold) {
      setSwipeAnim({ dir: "right", active: true });
      setTimeout(() => { popTop(true); setSwipeAnim(null); setDrag(null); }, 360);
    } else if (drag.x < -threshold) {
      setSwipeAnim({ dir: "left", active: true });
      setTimeout(() => { popTop(false); setSwipeAnim(null); setDrag(null); }, 360);
    } else {
      setDrag(null);
    }
  };

  const onTopTransitionEnd = () => {
    if (!swipeAnim?.active) return;
    if (swipeAnim.dir === "right") popTop(true);
    else popTop(false);
    setSwipeAnim(null);
    setDrag(null);
  };

  // debug log (remove when stable)
  console.log("loaded dummy users:", dummyUsers.length, "cards state:", cards.length);

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#FFF8EB] p-6">
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-serif text-[#8B1E23]">Musical Match</h1>
          <button
            onClick={() => { setCards(dummyUsers.slice()); localStorage.removeItem(STORAGE_KEY); }}
            className="text-sm bg-white px-3 py-1 rounded-md shadow-sm border text-[#8B1E23]"
          >
            Reset deck
          </button>
        </div>

        <p className="text-sm text-[#4A3A3A] mb-4">Swipe right to connect · Swipe left to skip</p>

        {/* container that clips rounded corners */}
        <div
          className="relative mx-auto"
          style={{ width: "100%", maxWidth: cardWidth, height: cardHeight + 30, borderRadius: cornerRadius, padding: 12, boxSizing: "border-box" }}
        >
          {cards.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-white rounded-lg border-2 border-dashed">
              <div className="text-center">
                <h2 className="text-xl text-[#8B1E23]">No more learners</h2>
                <p className="text-sm text-[#4A3A3A]">You’ve reviewed all available practice partners.</p>
              </div>
            </div>
          )}

          {cards.map((user, idx) => {
            const isTop = idx === cards.length - 1;
            const offset = (cards.length - 1 - idx) * 8;

            const stackedStyle = {
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "100%",
              height: cardHeight,
              transform: `translate(-50%, -50%) translateY(${offset}px)`,
              zIndex: 1000 + idx,
              background: "#fff",
              borderRadius: cornerRadius,
              overflow: "hidden",
              boxShadow: "0 12px 28px rgba(0,0,0,0.06)",
            };

            let topStyle = {
              ...stackedStyle,
              zIndex: 3000,
              background: "#EFE4D1",
              border: "1px solid #D7C5A7",
              boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
              transform: "translate(-50%, -50%)",
              transition: "transform 300ms cubic-bezier(.22,.9,.3,1)",
            };

            if (isTop && drag?.active) {
              topStyle.transform = `translate(calc(-50% + ${drag.x}px), calc(-50% + ${drag.y}px)) rotate(${drag.x / 18}deg)`;
              topStyle.transition = "none";
            }

            if (isTop && swipeAnim?.active) {
              const off = 1000;
              const x = swipeAnim.dir === "right" ? off : -off;
              const rot = swipeAnim.dir === "right" ? 30 : -30;
              topStyle.transform = `translate(calc(-50% + ${x}px), -50%) rotate(${rot}deg)`;
              topStyle.transition = "transform 350ms cubic-bezier(.22,.9,.3,1)";
            }

            return (
              <article
                key={`${user.username}-${idx}`}
                ref={isTop ? topRef : null}
                onPointerDown={isTop ? handlePointerDown : undefined}
                onPointerMove={isTop ? handlePointerMove : undefined}
                onPointerUp={isTop ? handlePointerUp : undefined}
                onPointerCancel={isTop ? handlePointerUp : undefined}
                onTransitionEnd={isTop ? onTopTransitionEnd : undefined}
                style={isTop ? topStyle : stackedStyle}
                className="p-6"
              >
                {/* top-left avatar */}
                <div style={{ position: "absolute", top: 16, left: 16, width: 80, height: 80, borderRadius: 16, overflow: "hidden", background: "#fff", boxShadow: "0 6px 14px rgba(0,0,0,0.07)", border: "1px solid rgba(0,0,0,0.06)", pointerEvents: "none", zIndex: 4000 }}>
                  <img src={user.avatar} alt={user.username} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => (e.currentTarget.src = "/avatars/default.png")} />
                </div>

                {/* content that fills card */}
                <div style={{ height: "100%", paddingLeft: 112, paddingRight: 18, paddingTop: 18, paddingBottom: 18, boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h3 className="text-2xl font-semibold text-[#8B1E23]">{user.username}</h3>
                    <p className="text-sm text-[#4A3A3A] mt-1">{user.instrument} · Level {user.level}</p>
                    <p className="text-sm text-[#4A3A3A]">{user.city}</p>
                  </div>

                  <div style={{ flex: 1, overflowY: "auto", marginTop: 12 }}>
                    <span className="inline-block bg-[#FFF9F0] text-[#8B1E23] text-xs px-3 py-1 rounded-full border border-[#E7D8C5]">Looking for practice partner</span>
                    <p className="mt-3 text-sm text-[#4A3A3A]">Open to collaborate on practice sessions, exchanges, and feedback.</p>
                  </div>

                  <div>
                    <ul className="list-disc ml-5 mt-2 text-sm text-[#4A3A3A]">
                      <li>Instrument: {user.instrument}</li>
                      <li>Level: {user.level} — {user.level === 1 ? "Beginner" : user.level === 2 ? "Intermediate" : "Advanced"}</li>
                      <li>City: {user.city}</li>
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
 
