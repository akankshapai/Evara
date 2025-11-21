// src/App.jsx
import React from "react";
 // if your Home is inside App.jsx you can skip this import
import Play from "./pages/Play";                 // for Play.js
import MusicalMatch from "./pages/MusicalMatch"; // for MusicalMatch.jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import {
  RoleSelection,
  Signup,
  StudentLogin,
  GuruLogin,
} from "./pages/AuthPages";

/* ------------------- Placeholder Guru Dashboard ------------------- */
function GuruDashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-amber-50 p-8">
      <div className="bg-white p-8 rounded-2xl shadow w-full max-w-3xl">
        <h1 className="text-2xl font-semibold mb-4">Guru Dashboard (placeholder)</h1>
        <p className="mb-6">
          This is the landing page for users with role <strong>guru</strong>.
        </p>
        <Link to="/" className="text-indigo-600 underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

/* ------------------- Placeholder Shishya Home ------------------- */
function ShishyaHome() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-indigo-50 p-8">
      <div className="bg-white p-8 rounded-2xl shadow w-full max-w-3xl">
        <h1 className="text-2xl font-semibold mb-4">Shishya Home (placeholder)</h1>
        <p className="mb-6">
          This is the landing page for users with role <strong>shishya</strong>.
        </p>
        <Link to="/" className="text-indigo-600 underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

/* ------------------- Home Page ------------------- */
function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-indigo-50 p-8">
      <div className="bg-white p-8 rounded-2xl shadow w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold mb-4">Saraswati Archives</h1>
        <p className="mb-6 text-gray-700">Hackathon music-learning platform — frontend demo UI.</p>

        {/* MAIN MENU BUTTONS */}
        <div className="flex flex-col gap-4 mt-6">

          <Link 
            to="/match"
            className="px-6 py-3 rounded-lg bg-green-600 text-white hover:opacity-90"
          >
            🎼 Musical Match
          </Link>

          <Link
            to="/play"
            className="px-6 py-3 rounded-lg bg-indigo-600 text-white hover:opacity-90"
          >
            🎧 Play Game
          </Link>

          <Link 
            to="/choose-role"
            className="px-6 py-3 rounded-lg bg-amber-400 hover:opacity-90"
          >
            Choose Role & Sign Up
          </Link>

          <Link
            to="/login"
            className="px-6 py-3 rounded-lg bg-gray-800 text-white hover:opacity-90"
          >
            Log in
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Frontend: Musical Match, Play Game, Auth Flow + Dashboards.</p>
        </div>
      </div>
    </div>
  );
}


/* ------------------- App Component with Routing ------------------- */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public landing */}
        <Route path="/play" element={<Play />} />
<Route path="/" element={<Home />} />
<Route path="/play" element={<Play />} />
<Route path="/match" element={<MusicalMatch />} />

<Route path="/choose-role" element={<RoleSelection />} />
<Route path="/signup" element={<Signup />} />
<Route path="/login" element={<StudentLogin />} />
<Route path="/guru/login" element={<GuruLogin />} />

<Route path="/guru/dashboard" element={<GuruDashboard />} />
<Route path="/shishya/home" element={<ShishyaHome />} />


      </Routes>
    </BrowserRouter>
  );
}