import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Play from "./pages/Play";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-[#FFFDF8]">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/play" element={<Play />} />
      </Routes>

    </div>
  );
}

export default App;
