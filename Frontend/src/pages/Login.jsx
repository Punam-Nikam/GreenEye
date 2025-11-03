import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // ✅ Store dummy login info
    localStorage.setItem("greeneye_user", email);
    navigate("/main");
  };

  return (
    <div className="login-container">
      {/* ✅ (Your design remains same) */}
      <div className="logo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="40" height="40">
          <path
            fill="#4caf50"
            d="M576 96C576 204.1 499.4 294.3 397.6 315.4C389.7 257.3 363.6 205 325.1 164.5C365.2 104 433.9 64 512 64L544 64C561.7 64 576 78.3 576 96zM64 160C64 142.3 78.3 128 96 128L128 128C251.7 128 352 228.3 352 352L352 544C352 561.7 337.7 576 320 576C302.3 576 288 561.7 288 544L288 384C164.3 384 64 283.7 64 160z"
          />
        </svg>
        <h1>GreenEye</h1>
      </div>

      <h2>Welcome</h2>
      <p>Login to your account</p>

      <form onSubmit={handleLogin}>
        <div className="input-group">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label>Email Address</label>
        </div>

        <div className="input-group">
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <label>Password</label>
        </div>

        <a href="#" className="forgot-password">Forgot Password?</a>
        <button type="submit" className="login-button">Secure Login</button>
      </form>
    </div>
  );
};

export default Login;
