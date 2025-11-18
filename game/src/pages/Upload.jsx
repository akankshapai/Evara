import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../supabase";

export default function Upload() {
  const { instrument, levelId } = useParams();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  async function handleUpload() {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setUploading(true);

    // Unique filename
    const fileName = `${instrument}_${levelId}_${Date.now()}.${file.name.split(".").pop()}`;

    // Upload file
    const { error } = await supabase.storage
      .from("uploads")
      .upload(fileName, file);

    if (error) {
      console.error("Upload error:", error);
      alert("Upload failed.");
      setUploading(false);
      return;
    }

    // Public URL
    const { data: publicUrlData } = supabase.storage
      .from("uploads")
      .getPublicUrl(fileName);

    const videoUrl = publicUrlData.publicUrl;

    // Stars earned (3–5)
    const stars = Math.floor(Math.random() * 3) + 3;

    // User
    const user = localStorage.getItem("character") || "guest";

    // Insert into leaderboard
    await supabase.from("leaderboard").insert({
      user: user,
      instrument: instrument,
      level: Number(levelId),
      stars: stars,
      url: videoUrl,
    });

    // Mark level completed
    localStorage.setItem(`${instrument}_level_${levelId}`, "completed");

    setUploading(false);

    // Redirect to result screen with stars
    navigate(`/result/${instrument}/${levelId}`, {
      state: { stars: stars }
    });
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Upload your performance</h1>
      <p>Instrument: {instrument}</p>
      <p>Level: {levelId}</p>

      <br />

      <input
        type="file"
        accept="video/*,audio/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload & Submit"}
      </button>
    </div>
  );
}
