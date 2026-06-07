import { useEffect, useState } from "react";
import { MapPin, Phone } from "lucide-react";
import API from "../services/api";

export default function PharmaciesPanel({ onNavigate }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/pharmacies").then(r => setData(r.data.slice(0, 3))).catch(() => {});
  }, []);

  return (
    <div className="panel-section">
      <div className="panel-header">
        <div className="panel-title">Pharmacies proches</div>
        <button className="panel-link" onClick={() => onNavigate?.("Pharmacies proches")}>Voir tout</button>
      </div>
      {data.map((ph, i) => (
        <div key={i} className="pharmacy-item">
          <div className="ph-icon"><MapPin size={15} color="var(--primary)" /></div>
          <div className="ph-info">
            <div className="ph-name">{ph.name}</div>
            <div className="ph-dist">
              {ph.distance_km ? `${ph.distance_km} km` : ph.location}
              {ph.is_open !== undefined && <span className={ph.is_open ? " ph-open" : " ph-closed"}> • {ph.is_open ? "Ouvert" : "Fermé"}</span>}
            </div>
          </div>
          {ph.phone && <a href={`tel:${ph.phone}`} className="ph-call" title={ph.phone}><Phone size={13} color="var(--primary)" /></a>}
        </div>
      ))}
    </div>
  );
}
