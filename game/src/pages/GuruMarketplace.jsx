import { useNavigate, useParams } from "react-router-dom";

const guru1 = new URL("../assets/images/guru_pics/guru1.jpeg", import.meta.url).href;
const guru2 = new URL("../assets/images/guru_pics/guru2.jpeg", import.meta.url).href;
const guru3 = new URL("../assets/images/guru_pics/guru3.jpeg", import.meta.url).href;

export default function GuruMarketplace() {
  const { instrumentName } = useParams();
  const navigate = useNavigate();

  // Fix capitalization
  const fixedName =
    instrumentName.charAt(0).toUpperCase() + instrumentName.slice(1).toLowerCase();

  const gurus = [
    {
      id: 1,
      name: "Guru Aarav",
      experience: "15 years • Classical",
      price: "₹499",
      rating: 5,
      image: guru1,
      teaches: ["Tabla", "Flute", "Veena", "Dholak"],
    },
    {
      id: 2,
      name: "Guru Meera",
      experience: "10 years • Performer",
      price: "₹399",
      rating: 4,
      image: guru2,
      teaches: ["Tabla", "Flute", "Veena", "Dholak"],
    },
    {
      id: 3,
      name: "Guru Devika",
      experience: "12 years • Scholar",
      price: "₹450",
      rating: 5,
      image: guru3,
      teaches: ["Tabla", "Flute", "Veena", "Dholak"],
    },
  ];

  const filteredGurus = gurus.filter((g) => g.teaches.includes(fixedName));

  const handleSelectGuru = (id) => {
    navigate(`/instrument/${fixedName}/purchase/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#FFF8EB] p-6">
      <h1 className="text-3xl font-bold text-center text-[#8B1E23]">
        Choose Your Guru for {fixedName}
      </h1>

      {filteredGurus.length === 0 ? (
        <p className="text-center mt-10 text-xl text-red-600">
          No gurus available for this instrument.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 max-w-5xl mx-auto">
          {filteredGurus.map((guru) => (
            <div
              key={guru.id}
              className="bg-white rounded-xl shadow-md p-4 text-center"
            >
              <img
                src={guru.image}
                className="mx-auto rounded-full object-cover shadow"
                style={{
                  width: "160px",
                  height: "160px",
                }}
              />

              <h2 className="text-xl font-semibold text-[#8B1E23] mt-3">
                {guru.name}
              </h2>

              <p className="text-gray-700 mt-1 text-sm">{guru.experience}</p>

              <p className="mt-2 text-md font-semibold">{guru.price}</p>

              <button
                className="mt-3 bg-[#8B1E23] text-white px-4 py-2 rounded-lg hover:scale-105 transition"
                onClick={() => handleSelectGuru(guru.id)}
              >
                Select Guru →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
