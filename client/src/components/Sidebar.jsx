import { useState } from "react";

const items = [
  { icon: "🏠", label: "Accueil" },
  { icon: "💊", label: "Médicaments" },
  { icon: "🏥", label: "Pharmacies" },
  { icon: "💰", label: "Dépenses" },
  { icon: "🍲", label: "Santé" },
  { icon: "🚕", label: "Transport" },
  { icon: "🤖", label: "Assistant IA" },
];

export default function Sidebar() {
  const [active, setActive] = useState("Accueil");

  return (
    <div className="sidebar">
      <div className="sidebar-logo">🌿 Ndamli SmartLife</div>
      {items.map((item) => (
        <div
          key={item.label}
          className={`sidebar-item ${active === item.label ? "active" : ""}`}
          onClick={() => setActive(item.label)}
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </div>
      ))}

      <div style={{ marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid #065f46" }}>
        <div className="sidebar-item" style={{ color: "#fca5a5" }}
          onClick={() => { localStorage.clear(); window.location.href = "/login"; }}>
          <span>🚪</span>
          <span>Déconnexion</span>
        </div>
      </div>
    </div>
  );
}
