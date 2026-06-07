import { useState, useRef } from "react";
import { User, Camera, Mail, Shield, Save, LogOut, Upload } from "lucide-react";
import API from "../services/api";
import { useApp } from "../context/AppContext";

export default function ProfilPage() {
  const { logout } = useApp();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "{}"));
  const [name, setName] = useState(user.name || "");
  const [avatar, setAvatar] = useState(user.avatar || null);
  const [weight, setWeight] = useState(user.weight || "");
  const [bloodPressure, setBloodPressure] = useState(user.bloodPressure || "");
  const [goal, setGoal] = useState(user.goal || "");
  const [logo, setLogo] = useState(localStorage.getItem("customLogo") || null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const avatarRef = useRef();
  const logoRef = useRef();

  function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { setError("Image trop grande (max 2MB)"); return; }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      setAvatar(result);
      // Mettre à jour localStorage immédiatement pour la topbar
      const current = JSON.parse(localStorage.getItem("user") || "{}");
      const updated = { ...current, avatar: result };
      localStorage.setItem("user", JSON.stringify(updated));
      window.dispatchEvent(new Event("profileUpdated"));
    };
    reader.readAsDataURL(file);
  }

  function handleLogoChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { setError("Logo trop grand (max 2MB)"); return; }
    const reader = new FileReader();
    reader.onload = () => {
      setLogo(reader.result);
      localStorage.setItem("customLogo", reader.result);
      window.dispatchEvent(new Event("logoChanged"));
    };
    reader.readAsDataURL(file);
  }

  async function handleSave(e) {
    e.preventDefault();
    setError(""); setSuccess("");
    setSaving(true);
    const current = JSON.parse(localStorage.getItem("user") || "{}");
    const localUpdated = { ...current, name, avatar, weight, bloodPressure, goal };
    localStorage.setItem("user", JSON.stringify(localUpdated));
    setUser(localUpdated);
    window.dispatchEvent(new Event("profileUpdated"));
    try {
      await API.put("/auth/profile", { name }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setSuccess("Profil mis à jour avec succès !");
    } catch {
      setSuccess("Profil sauvegardé localement.");
    } finally {
      setSaving(false);
    }
  }

  function resetLogo() {
    setLogo(null);
    localStorage.removeItem("customLogo");
    window.dispatchEvent(new Event("logoChanged"));
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>

      {/* Avatar card */}
      <div className="section-box" style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ position: "relative", display: "inline-block", marginBottom: 16 }}>
          <div style={{
            width: 100, height: 100, borderRadius: "50%",
            background: "var(--primary-light)",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden", border: "3px solid var(--primary)",
            margin: "0 auto"
          }}>
            {avatar
              ? <img src={avatar} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <User size={40} color="var(--primary)" />
            }
          </div>
          <button onClick={() => avatarRef.current.click()} style={{
            position: "absolute", bottom: 0, right: 0,
            width: 30, height: 30, borderRadius: "50%",
            background: "var(--primary)", border: "2px solid var(--surface)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer"
          }}>
            <Camera size={14} color="white" />
          </button>
          <input ref={avatarRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarChange} />
        </div>
        <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--text)" }}>{user.name}</div>
        <div style={{ fontSize: "0.8rem", color: "var(--text2)", marginTop: 4 }}>{user.email}</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap", margin: "12px 0" }}>
          <span className="tag tag-green" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <Shield size={10} /> {user.role || "Utilisateur"}
          </span>
          {user.weight && <span className="tag tag-blue">Poids: {user.weight} kg</span>}
          {user.bloodPressure && <span className="tag tag-blue">Tension: {user.bloodPressure}</span>}
        </div>
        {user.goal && <div style={{ color: "var(--text2)", fontSize: "0.85rem" }}>Objectif : {user.goal}</div>}
      </div>

      {/* Formulaire */}
      <div className="section-box" style={{ marginBottom: 20 }}>
        <div className="section-title" style={{ marginBottom: 16 }}>
          <User size={16} style={{ marginRight: 8, verticalAlign: "middle", color: "var(--primary)" }} />
          Informations personnelles
        </div>

        {error && <div className="error-box">{error}</div>}
        {success && <div className="success-box">{success}</div>}

        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">Nom complet</label>
            <input className="input" value={name} onChange={e => setName(e.target.value)} placeholder="Ton nom" />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <div style={{ position: "relative" }}>
              <Mail size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text3)" }} />
              <input className="input" value={user.email} disabled style={{ paddingLeft: 36, opacity: 0.6 }} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Poids cible (kg)</label>
            <input className="input" value={weight} onChange={e => setWeight(e.target.value)} placeholder="Ex: 72" />
          </div>
          <div className="form-group">
            <label className="form-label">Tension / pression</label>
            <input className="input" value={bloodPressure} onChange={e => setBloodPressure(e.target.value)} placeholder="Ex: 120/80" />
          </div>
          <div className="form-group">
            <label className="form-label">Objectif santé</label>
            <input className="input" value={goal} onChange={e => setGoal(e.target.value)} placeholder="Ex: Marcher 10 000 pas par jour" />
          </div>
          <button type="submit" className="btn-primary" disabled={saving} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <Save size={16} />
            {saving ? "Enregistrement..." : "Sauvegarder"}
          </button>
        </form>
      </div>

      {/* Logo personnalisé */}
      <div className="section-box" style={{ marginBottom: 20 }}>
        <div className="section-title" style={{ marginBottom: 8 }}>
          <Upload size={16} style={{ marginRight: 8, verticalAlign: "middle", color: "var(--primary)" }} />
          Logo de l'application
        </div>
        <p style={{ fontSize: "0.8rem", color: "var(--text2)", marginBottom: 16 }}>
          Personnalise le logo affiché dans la sidebar.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 12,
            border: "2px dashed var(--border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden", background: "var(--input-bg)"
          }}>
            <img src={logo || "/logo.png"} alt="logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button className="btn-sm btn-sm-primary" onClick={() => logoRef.current.click()} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Upload size={13} /> Changer le logo
            </button>
            {logo && (
              <button className="btn-sm btn-sm-outline" onClick={resetLogo} style={{ fontSize: "0.78rem" }}>
                Remettre le logo original
              </button>
            )}
          </div>
          <input ref={logoRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleLogoChange} />
        </div>
      </div>

      {/* Déconnexion */}
      <div className="section-box">
        <button onClick={logout} style={{
          width: "100%", background: "#fef2f2", border: "1.5px solid #fca5a5",
          color: "#dc2626", borderRadius: 10, padding: "11px",
          fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8
        }}>
          <LogOut size={16} /> Se déconnecter
        </button>
      </div>
    </div>
  );
}
