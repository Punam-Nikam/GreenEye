import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
      });

      if (res.data?.success) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        setError(res.data?.message || "Registration failed");
      }
    } catch (err) {
      setError(
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleRegister}>
        <h2>Create Account</h2>

        <div className="input-group">
          <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
          <label>Name</label>
        </div>

        <div className="input-group">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <label>Email</label>
        </div>

        <div className="input-group">
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          <label>Password</label>
        </div>

        <button type="submit" className="login-button">Register</button>

        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

        <div className="signup-link">
          Already have an account?{" "}
          <a href="/login" onClick={() => navigate("/login")}>Login</a>
        </div>
      </form>
    </div>
  );
}
