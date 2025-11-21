import { useNavigate, useParams } from "react-router-dom";

const guru1 = new URL("../assets/images/guru_pics/guru1.jpeg", import.meta.url).href;
const guru2 = new URL("../assets/images/guru_pics/guru2.jpeg", import.meta.url).href;
const guru3 = new URL("../assets/images/guru_pics/guru3.jpeg", import.meta.url).href;

export default function PurchasePlan() {
  const { instrumentName, guruId } = useParams();
  const navigate = useNavigate();

  const fixedName =
    instrumentName.charAt(0).toUpperCase() + instrumentName.slice(1).toLowerCase();

  const guruInfo = {
    1: {
      name: "Guru Aarav",
      price: "₹499",
      experience: "15 years",
      image: guru1,
    },
    2: {
      name: "Guru Meera",
      price: "₹399",
      experience: "10 years",
      image: guru2,
    },
    3: {
      name: "Guru Devika",
      price: "₹450",
      experience: "12 years",
      image: guru3,
    },
  };

  const guru = guruInfo[guruId];

  const handlePurchase = () => {
    alert("Purchase successful! (UI only)");
    navigate(`/instrument/${fixedName}/room`);
  };

  return (
    <div className="min-h-screen bg-[#FFF8EB] p-6">
      <h1 className="text-3xl font-bold text-center text-[#8B1E23]">
        Purchase Plan
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow-xl mt-10 max-w-lg mx-auto">

        {/* IMAGE FIXED TO 160px × 160px */}
        <img
          src={guru.image}
          className="rounded-full mx-auto object-cover shadow"
          style={{
            width: "160px",
            height: "160px",
          }}
        />

        <h2 className="text-2xl font-semibold text-[#8B1E23] text-center mt-4">
          {guru.name}
        </h2>

        <p className="text-center text-gray-700 mt-1">
          {guru.experience} of classical training
        </p>

        <p className="text-center text-gray-900 font-medium mt-1">
          Instrument: <span className="text-[#8B1E23]">{fixedName}</span>
        </p>

        <p className="text-center text-[#8B1E23] font-bold mt-4 text-2xl">
          {guru.price}
        </p>

        <h3 className="text-xl font-semibold text-[#8B1E23] mt-6">
          What’s Included
        </h3>

        <ul className="mt-4 space-y-3 text-gray-700">
          <li className="bg-[#FFF1D6] p-3 rounded-lg shadow">✔ Full course</li>
          <li className="bg-[#FFF1D6] p-3 rounded-lg shadow">✔ Step-by-step training</li>
          <li className="bg-[#FFF1D6] p-3 rounded-lg shadow">✔ Feedback (placeholder)</li>
          <li className="bg-[#FFF1D6] p-3 rounded-lg shadow">✔ Practice challenges</li>
        </ul>

        <button
          onClick={handlePurchase}
          className="mt-8 w-full bg-[#8B1E23] text-white py-3 rounded-xl shadow-md hover:scale-105 transition"
        >
          Purchase →
        </button>
      </div>
    </div>
  );
}
