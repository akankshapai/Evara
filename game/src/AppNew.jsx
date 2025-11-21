import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";   // ← ADD THIS
import Character from "./pages/Character";
import Hall from "./pages/Hall";
import Instrument from "./pages/Instrument";
import GuruMarketplace from "./pages/GuruMarketplace";
import PurchasePlan from "./pages/PurchasePlan";
import Room from "./pages/Room";
import Landmark from "./pages/Landmark";
import Level from "./pages/Level";
import Leaderboard from "./pages/Leaderboard";

export default function AppNew() {
  return (
    <Routes>

      {/* Landing Page (Neon Homepage) */}
      <Route path="/" element={<Home />} />

      {/* Character Selection */}
      <Route path="/character" element={<Character />} />

      {/* Instrument Hall */}
      <Route path="/hall" element={<Hall />} />

      {/* Instrument Overview */}
      <Route path="/instrument/:instrumentName" element={<Instrument />} />

      {/* Guru Marketplace */}
      <Route
        path="/instrument/:instrumentName/gurus"
        element={<GuruMarketplace />}
      />

      {/* Purchase Plan */}
      <Route
        path="/instrument/:instrumentName/purchase/:guruId"
        element={<PurchasePlan />}
      />

      {/* Room (Levels Page) */}
      <Route
        path="/instrument/:instrumentName/room"
        element={<Room />}
      />

      {/* Landmark (Lesson Page) */}
      <Route
        path="/instrument/:instrumentName/level/:levelNumber/landmark"
        element={<Landmark />}
      />

      {/* Level Page */}
      <Route
        path="/instrument/:instrumentName/level/:levelNumber"
        element={<Level />}
      />

      {/* Leaderboard */}
      <Route path="/leaderboard" element={<Leaderboard />} />

    </Routes>
  );
}
