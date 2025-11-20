import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-[#FAF4E9] border-b border-[#E7D8C5] py-4 px-6 flex items-center justify-between relative z-50">

      <h1 className="text-2xl font-serif text-[#8B1E23]">Saraswathi Archives</h1>

      <div className="flex gap-6 text-[#3A2F2F] font-medium">
        <Link to="/" className="hover:text-[#8B1E23] transition">Home</Link>
        <Link to="/learn" className="hover:text-[#8B1E23] transition">Learn</Link>
        <Link to="/play" className="hover:text-[#8B1E23] transition">Play</Link>
        <Link to="/practice" className="hover:text-[#8B1E23] transition">Practice</Link>
        <Link to="/profile" className="hover:text-[#8B1E23] transition">Profile</Link>
      </div>

    </nav>
  );
}
