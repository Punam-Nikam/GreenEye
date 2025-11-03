import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function PlantInfo() {
  const { plantName } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/plant-info?plant=${plantName}`)
      .then((res) => setData(res.data))
      .catch(() => setData({ info: "Failed to load plant info" }));
  }, [plantName]);

  return (
    <div>
      <button onClick={() => navigate("/")}>⬅ Back</button>
      <h2>{plantName} — Information</h2>
      <p>{data?.info}</p>
    </div>
  );
}

export default PlantInfo;
