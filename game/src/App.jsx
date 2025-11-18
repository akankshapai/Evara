import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Character from "./pages/Character";
import Hall from "./pages/Hall";
import Room from "./pages/Room";
import Level from "./pages/Level";
import Upload from "./pages/Upload";
import Leaderboard from "./pages/Leaderboard";
import Result from "./pages/Result";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character" element={<Character />} />
        <Route path="/hall/:instrument" element={<Hall />} />
        <Route path="/room/:instrument" element={<Room />} />
        <Route path="/level/:instrument/:levelId" element={<Level />} />
        <Route path="/upload/:instrument/:levelId" element={<Upload />} />
        <Route path="/leaderboard/:instrument" element={<Leaderboard />} />
        <Route path="/result/:instrument/:levelId" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}
