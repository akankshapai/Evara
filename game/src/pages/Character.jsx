import { useNavigate } from "react-router-dom";

export default function Character() {
  const navigate = useNavigate();

  const handleSelect = (charName) => {
    localStorage.setItem("character", charName);  // save character
    navigate("/hall");  // go to hall
  };

  return (
    <div>
      <h1>Select Your Character</h1>

      <button onClick={() => handleSelect("warrior")}>
        Warrior
      </button>

      <button onClick={() => handleSelect("mage")}>
        Mage
      </button>

      <button onClick={() => handleSelect("musician")}>
        Musician
      </button>
    </div>
  );
}
