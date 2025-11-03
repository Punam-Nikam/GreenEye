import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <button onClick={() => navigate("/")}>⬅ Back</button>
      <h2>Plant: {state.plant}</h2>
      <h3>Disease: {state.disease}</h3>
      <p>Solution: {state.solution}</p>
    </div>
  );
}

export default Result;
