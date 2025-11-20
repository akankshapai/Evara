import { useNavigate } from "react-router-dom";

export default function Hall() {
  const navigate = useNavigate();
  const character = localStorage.getItem("character");

  return (
    <div>
      <h1>Hall</h1>
      <h2>Your Character: {character}</h2>
      <h1 className="text-gold text-4xl">Tailwind Working</h1>


      <button onClick={() => navigate("/room/tabla")}>Tabla Room</button>
      <button onClick={() => navigate("/room/flute")}>Flute Room</button>
      <button onClick={() => navigate("/room/veena")}>Veena Room</button>
      <button onClick={() => navigate("/room/violin")}>Violin Room</button>
    </div>
  );
}
