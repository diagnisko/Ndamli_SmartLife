import { useEffect, useState } from "react";
import API from "../services/api";

export default function Expenses() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/expenses").then((res) => setData(res.data)).catch(() => {});
  }, []);

  return (
    <div className="card">
      <div className="card-title">💰 Dépenses</div>
      {data.length === 0 ? (
        <div style={{ color: "#9ca3af", fontSize: "0.8rem" }}>Aucune dépense enregistrée.</div>
      ) : (
        data.map((exp) => (
          <div key={exp._id || exp.id} className="list-item" style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{exp.category}</span>
            <span style={{ fontWeight: 600, color: "#f59e0b" }}>{exp.amount} FCFA</span>
          </div>
        ))
      )}
    </div>
  );
}
