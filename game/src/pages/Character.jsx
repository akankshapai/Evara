import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Avatar Imports
const avatar1 = new URL("../assets/images/avatars/avatar1.jpeg", import.meta.url).href;
const avatar2 = new URL("../assets/images/avatars/avatar2.jpeg", import.meta.url).href;
const avatar3 = new URL("../assets/images/avatars/avatar3.jpeg", import.meta.url).href;
const avatar4 = new URL("../assets/images/avatars/avatar4.jpeg", import.meta.url).href;
const avatar5 = new URL("../assets/images/avatars/avatar5.jpeg", import.meta.url).href;
const avatar6 = new URL("../assets/images/avatars/avatar6.jpeg", import.meta.url).href;

export default function Character() {
  const navigate = useNavigate();

  const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [username, setUsername] = useState("");

  const handleContinue = () => {
    if (!selectedAvatar || username.trim() === "") {
      alert("Please select an avatar and enter a username.");
      return;
    }

    localStorage.setItem("characterAvatar", selectedAvatar);
    localStorage.setItem("characterName", username);
    navigate("/hall");
  };

  return (
    <div className="min-h-screen bg-[#FDEFE3] flex justify-center items-center p-8 relative">

      {/* Container Card */}
      <div className="bg-[#FFF8F0] border border-[#E6D8C8] shadow-xl rounded-3xl p-12 w-full max-w-3xl">

        {/* Title */}
        <h1
          className="text-4xl font-serif text-center text-[#7B2E22] mb-12 drop-shadow-sm"
          style={{ fontFamily: "Merriweather, serif" }}
        >
          Choose Your Character
        </h1>

        {/* Avatar Grid */}
        <div className="grid grid-cols-3 gap-10 justify-items-center mb-14">
          {avatars.map((src, index) => (
            <div
              key={index}
              onClick={() => setSelectedAvatar(src)}
              className={`
                w-[150px] h-[150px] rounded-full overflow-hidden cursor-pointer 
                shadow-md bg-white flex items-center justify-center transition-all 
                hover:shadow-xl hover:-translate-y-1
                ${
                  selectedAvatar === src
                    ? "ring-4 ring-[#B45A2E] scale-110"
                    : "ring-2 ring-transparent"
                }
              `}
            >
              <img src={src} alt="avatar" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Username */}
        <input
          type="text"
          placeholder="Enter your username"
          className="px-4 py-3 w-72 mx-auto block border border-[#D8C6B1] rounded-xl text-lg 
                     shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B45A2E] mb-10"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleContinue}
          className="bg-[#B45A2E] text-white px-10 py-3 rounded-xl text-lg font-serif 
                     shadow-md hover:shadow-xl hover:scale-105 transition mx-auto block"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
