import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("greeneye_user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">GreenEye</h2>
      <div className="nav-links">
        <a href="/main">Home</a>
        <a href="/about">About</a>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
}
