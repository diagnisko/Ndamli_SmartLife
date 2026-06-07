import { useEffect, useState } from "react";
import API from "../services/api";

export default function Pharmacies() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/pharmacies").then((res) => setData(res.data)).catch(() => {});
  }, []);

  return (
    <div className="card">
      <div className="card-title">🏥 Pharmacies</div>
      {data.length === 0 ? (
        <div style={{ color: "#9ca3af", fontSize: "0.8rem" }}>Aucune pharmacie trouvée.</div>
      ) : (
        data.map((ph) => (
          <div key={ph._id || ph.id} className="list-item">
            <div style={{ fontWeight: 600 }}>{ph.name}</div>
            <div style={{ color: "#6b7280", fontSize: "0.8rem" }}>{ph.location}</div>
            {ph.phone && <div style={{ color: "#059669", fontSize: "0.8rem" }}>📞 {ph.phone}</div>}
          </div>
        ))
      )}
    </div>
  );
}
