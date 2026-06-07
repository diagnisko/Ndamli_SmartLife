import { useEffect, useState } from "react";
import { Search, Pill, CheckCircle, XCircle } from "lucide-react";
import API from "../services/api";

export default function MedicamentsPage() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/medicaments").then(r => setData(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filtered = data.filter(m =>
    m.name?.toLowerCase().includes(search.toLowerCase()) ||
    m.category?.toLowerCase().includes(search.toLowerCase()) ||
    m.pharmacy_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="section-box">
        <div className="section-header">
          <div className="section-title">💊 Médicaments disponibles</div>
          <span style={{ fontSize: "0.8rem", color: "var(--text2)" }}>{filtered.length} résultats</span>
        </div>
        <div style={{ marginBottom: 16 }}>
          <input className="input" placeholder="🔍 Rechercher un médicament ou une pharmacie..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {loading && <div className="empty-state">Chargement...</div>}
        {!loading && filtered.length === 0 && <div className="empty-state">Aucun médicament trouvé.</div>}
        {filtered.map((med, i) => (
          <div key={i} className="transaction-item">
            <div className="tx-icon" style={{ background: "#dbeafe" }}><Pill size={16} color="#1d4ed8" /></div>
            <div className="tx-info">
              <div className="tx-name">{med.name}</div>
              <div className="tx-cat">{med.category || "Médicament"}</div>
              <div style={{ marginTop: 6, fontSize: "0.82rem", color: "var(--text3)" }}>
                {med.pharmacy_name ? `Pharmacie : ${med.pharmacy_name}` : `Pharmacie ID : ${med.pharmacy_id || "-"}`}
              </div>
            </div>
            <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
              <span style={{ fontWeight: 700, color: "var(--primary)" }}>{Number(med.price || 0).toLocaleString("fr-FR")} FCFA</span>
              <span className={`tag ${med.availability ? "tag-green" : "tag-red"}`} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                {med.availability ? <CheckCircle size={11} /> : <XCircle size={11} />}
                {med.availability ? "Disponible" : "Indisponible"}
              </span>
              <span className={`tag ${med.stock > 0 ? "tag-green" : "tag-red"}`} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                {med.stock > 0 ? `${med.stock} en stock` : "Stock épuisé"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
