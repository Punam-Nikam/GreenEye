import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar"; // ✅ your created navbar
import "./main.css";

const plants = [
  { name: "Rice", img: require("../assets/backgrounds/rice.jpg") },
  { name: "Wheat", img: require("../assets/backgrounds/wheat.jpg") },
  { name: "Tomato", img: require("../assets/backgrounds/tomato.jpg") },
  { name: "Potato", img: require("../assets/backgrounds/potato.jpg") },
];

export default function Main() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [selectedPlant, setSelectedPlant] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Redirect to login if user is not logged in
 useEffect(() => {
  const user = localStorage.getItem("greeneye_user");
  if (!user) {
    navigate("/login");
  }
}, [navigate]);

  const onFileChange = (e) => {
    setFile(e.target.files && e.target.files[0]);
    setError("");
  };

  const onClickAnalyzePlant = (plantName) => {
    setSelectedPlant(plantName);
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const onClickView = (plantName) => {
    navigate("/result", { state: { plantName } });
  };

  const onUploadAndAnalyze = async () => {
    setError("");
    if (!file) {
      setError("Please choose an image first.");
      return;
    }
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);
      if (selectedPlant) formData.append("plant", selectedPlant);

      const res = await axios.post("http://localhost:5000/detect", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/result", { state: { result: res.data } });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to analyze image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ Navbar added here */}
      <Navbar />

      {/* ✅ Your original code remains exactly the same below */}
      <div className="main-container">
        <header className="main-header">
          <h1>🌱 GreenEye Dashboard</h1>
          <p>Select a plant type, View info, or Analyze an uploaded image</p>
        </header>

        <section className="plant-section">
          {plants.map((p) => (
            <div className="plant-card" key={p.name}>
              <div className="plant-image-wrap">
                <img src={p.img} alt={p.name} className="plant-image" />
              </div>
              <h3 className="plant-name">{p.name}</h3>

              <div style={{ display: "flex", gap: 8 }}>
                <button className="analyze-btn" onClick={() => onClickView(p.name)}>
                  View
                </button>
                <button className="analyze-btn" onClick={() => onClickAnalyzePlant(p.name)}>
                  Analyze
                </button>
              </div>
            </div>
          ))}
        </section>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={onFileChange}
        />

        <div className="upload-box">
          <div
            className="upload-area"
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          >
            <div style={{ textAlign: "center", pointerEvents: "none" }}>
              <div style={{ fontSize: 36 }}>☁️⬆️</div>
              <div>{file ? file.name : "Choose file or click Analyze"}</div>
              {selectedPlant && (
                <div style={{ marginTop: 6, fontSize: 12 }}>
                  Selected plant: {selectedPlant}
                </div>
              )}
            </div>
          </div>

          <button className="upload-btn" onClick={onUploadAndAnalyze} disabled={loading}>
            {loading ? "Analyzing..." : "Upload & Analyze"}
          </button>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </>
  );
}
