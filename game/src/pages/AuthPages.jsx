// src/pages/AuthPages.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

/* ============================================================
   ROLE SELECTION
   ============================================================ */
export function RoleSelection() {
  const navigate = useNavigate();

  function chooseRole(role) {
    localStorage.setItem("chosenRole", role);

    if (role === "guru") navigate("/guru/login");
    else navigate("/signup");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50">
      <div className="p-8 bg-white shadow rounded-2xl w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Choose your role</h1>

        <button
          onClick={() => chooseRole("guru")}
          className="w-full py-3 mb-4 rounded-lg bg-amber-400 hover:opacity-95"
        >
          🪕 I am Guru
        </button>

        <button
          onClick={() => chooseRole("shishya")}
          className="w-full py-3 rounded-lg bg-indigo-600 text-white hover:opacity-95"
        >
          🎼 I am Shishya
        </button>

        <div className="mt-6 text-center text-sm">
          <Link to="/login" className="underline">
            Already have an account? Student Login
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SIGNUP PAGE
   ============================================================ */
export function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const role = localStorage.getItem("chosenRole") || "shishya";

  async function handleSignup(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) return alert(error.message);

    navigate("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50">
      <form
        className="bg-white p-6 rounded-xl shadow w-full max-w-md"
        onSubmit={handleSignup}
      >
        <h2 className="text-xl font-semibold mb-4">Sign up as {role}</h2>

        <input
          className="w-full p-2 border rounded mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 border rounded mb-4"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full p-3 bg-indigo-600 text-white rounded-lg">
          Sign up
        </button>
      </form>
    </div>
  );
}

/* ============================================================
   LOGIN (GURU & STUDENT)
   ============================================================ */
export function Login({ mode = "student" }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isGuru = mode === "guru";

  const ui = isGuru
    ? {
        icon: "🪕",
        heading: "Guru Login",
        bg: "bg-indigo-50",
        primary: "bg-amber-400",
        emailPlaceholder: "Guru Email",
        passPlaceholder: "Guru Password",
        buttonText: "Log in as Guru",
      }
    : {
        icon: "🎧",
        heading: "Student Login",
        bg: "bg-amber-50",
        primary: "bg-indigo-600 text-white",
        emailPlaceholder: "Student Email",
        passPlaceholder: "Password",
        buttonText: "Log in",
      };

  async function handleLogin(e) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return alert(error.message);

    if (isGuru) navigate("/guru/dashboard");
    else navigate("/shishya/home");
  }

  return (
    <div className={`min-h-screen flex items-center justify-center ${ui.bg}`}>
      <form
        className="bg-white p-6 rounded-xl shadow w-full max-w-md"
        onSubmit={handleLogin}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="text-3xl">{ui.icon}</div>
          <h2 className="text-xl font-semibold">{ui.heading}</h2>
        </div>

        <input
          className="w-full p-2 border rounded mb-3"
          placeholder={ui.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 border rounded mb-3"
          placeholder={ui.passPlaceholder}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={`w-full p-3 rounded-lg ${ui.primary}`}>
          {ui.buttonText}
        </button>

        <div className="text-center mt-4">
          <Link to="/signup" className="underline">
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
}

/* ============================================================
   ROUTE WRAPPERS
   ============================================================ */
export const StudentLogin = (props) => <Login mode="student" {...props} />;
export const GuruLogin = (props) => <Login mode="guru" {...props} />;
