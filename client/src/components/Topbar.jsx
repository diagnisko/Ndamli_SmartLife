export default function Topbar({ user = {} }) {
  return (
    <div className="topbar">
      <input placeholder="🔍 Rechercher médicament, pharmacie..." />
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>🇸🇳 Sénégal</span>
        <div style={{
          background: "#d1fae5",
          color: "#065f46",
          borderRadius: "9999px",
          padding: "0.3rem 0.75rem",
          fontWeight: 600,
          fontSize: "0.875rem"
        }}>
          👤 {user.name || "Utilisateur"}
        </div>
      </div>
    </div>
  );
}
