import { useEffect, useState } from "react";
import API from "../services/api";

export default function Medicaments() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/medicaments").then((res) => setData(res.data)).catch(() => {});
  }, []);

  return (
    <div className="card">
      <div className="card-title">💊 Médicaments</div>
      {data.length === 0 ? (
        <div style={{ color: "#9ca3af", fontSize: "0.8rem" }}>Aucun médicament trouvé.</div>
      ) : (
        data.map((med) => (
          <div key={med._id || med.id} className="list-item">
            <div style={{ fontWeight: 600 }}>{med.name}</div>
            <div style={{ color: "#059669", fontSize: "0.8rem" }}>{med.price} FCFA</div>
          </div>
        ))
      )}
    </div>
  );
}
