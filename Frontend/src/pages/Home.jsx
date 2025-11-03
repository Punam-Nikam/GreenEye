import React from "react";
import { useNavigate } from "react-router-dom";
import PotatoImg from "../assets/potato.png";
import CropImg from "../assets/crop.jpg";
import "./home.css";

export default function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/main"); // Go to Main Page
  };

  return (
    <div className="home-hero">
      <div className="home-left">
        <div className="brand">
          <span className="brand-icon">🌱</span>
          <span className="brand-name">GreenEye</span>
        </div>

        <h1 className="home-title">GreenEye..</h1>
        <p className="home-sub">Crop disease detection</p>

        <p className="home-desc">
          Crop diseases devastate harvests and threaten global food security.
          Our platform offers essential resources for early identification, management,
          and prevention of plant illnesses. Explore our tools to protect crop yields and support farmers.
        </p>
        
        {/* ✅ Two buttons – Login & Start */}
        <button className="cta" onClick={() => navigate("/login")}>Login</button>
        <button className="cta" onClick={() => navigate("/main")}>Skip & Start</button>
      </div>

      <div className="home-right">
        <div className="hero-card large">
          <img src={CropImg} alt="small" />
          


        </div>
        <div className="hero-card small">
        <img src={PotatoImg} alt="hero" />
        </div>
      </div>
    </div>
  );
}
