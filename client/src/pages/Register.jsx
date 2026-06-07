import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useApp } from "../context/AppContext";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useApp();

  function validateEmailAddress(value) {
    return /^\S+@\S+\.\S+$/.test(value);
  }

  function passwordStrength(pw) {
    let score = 0;
    if (!pw) return { score: 0, label: "", color: "#e5e7eb", width: 0 };
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    const labels = ["Très faible", "Faible", "Moyen", "Fort", "Excellent"];
    const colors = ["#ef4444", "#f97316", "#f59e0b", "#10b981", "#059669"];
    return { score, label: labels[score], color: colors[score], width: (score / 4) * 100 };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    // validation par champ
    const errors = { name: "", email: "", password: "", confirmPassword: "" };
    if (!name) errors.name = "Nom requis.";
    if (!email) errors.email = "Email requis.";
    else if (!validateEmailAddress(email)) errors.email = "Email invalide.";
    if (!password) errors.password = "Mot de passe requis.";
    else if (password.length < 6) errors.password = "Doit contenir au moins 6 caractères.";
    if (!confirmPassword) errors.confirmPassword = "Confirmation requise.";
    else if (password !== confirmPassword) errors.confirmPassword = "Les mots de passe ne correspondent pas.";
    setFieldErrors(errors);
    if (errors.name || errors.email || errors.password || errors.confirmPassword) return;
    setLoading(true);
    try {
      await API.post("/auth/register", { name, email, password });
      // Auto-login après inscription
      try {
        const res = await API.post("/auth/login", { email, password });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        login(res.data.token);
        navigate("/");
      } catch (le) {
        // Si login automatique échoue, rediriger vers login
        navigate("/login");
      }
    } catch (err) {
      setError(err?.response?.data?.msg || "Inscription impossible.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-card">
        <div className="auth-logo">
          <img src="/logo.png" alt="Ndamli SmartLife" style={{ width: 90, height: 90, objectFit: "contain" }} />
        </div>
        <h1 className="auth-title">Créer un compte</h1>
        <p className="auth-subtitle">Rejoins Ndamli SmartLife</p>
        {error && <div className="error-box">{error}</div>}
        <label className="form-label">Nom complet</label>
        <input className="input" value={name} onChange={e => { setName(e.target.value); setFieldErrors(prev => ({ ...prev, name: "" })); }} type="text" placeholder="Ousmane Diop" />
        {fieldErrors.name && <div className="field-error">{fieldErrors.name}</div>}
        <label className="form-label">Email</label>
        <input className="input" value={email} onChange={e => { setEmail(e.target.value); setFieldErrors(prev => ({ ...prev, email: "" })); }} type="email" placeholder="ousmane@gmail.com" />
        {fieldErrors.email && <div className="field-error">{fieldErrors.email}</div>}
        <label className="form-label">Mot de passe</label>
        <input className="input" value={password} onChange={e => { setPassword(e.target.value); setFieldErrors(prev => ({ ...prev, password: "" })); }} type="password" placeholder="••••••••" />
        {/* Indicateur de force */}
        <div style={{ marginTop: 8 }}>
          <div style={{ height: 6, background: "#eef2f7", borderRadius: 6, overflow: "hidden" }}>
            <div style={{ width: `${passwordStrength(password).width}%`, height: 6, background: passwordStrength(password).color, transition: "width 120ms" }} />
          </div>
          <div style={{ fontSize: 12, color: "#6b7280", marginTop: 6 }}>{password ? passwordStrength(password).label : ""}</div>
        </div>
        {fieldErrors.password && <div className="field-error">{fieldErrors.password}</div>}
        <label className="form-label">Confirmer le mot de passe</label>
        <input className="input" value={confirmPassword} onChange={e => { setConfirmPassword(e.target.value); setFieldErrors(prev => ({ ...prev, confirmPassword: "" })); }} type="password" placeholder="••••••••" />
        {fieldErrors.confirmPassword && <div className="field-error">{fieldErrors.confirmPassword}</div>}
        <button type="submit" disabled={loading} className="btn-primary">{loading ? "Création..." : "Créer mon compte"}</button>
        <button type="button" onClick={() => navigate("/login")} className="btn-outline">J'ai déjà un compte</button>
      </form>
    </div>
  );
}
