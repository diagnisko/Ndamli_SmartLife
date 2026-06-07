import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useApp } from "../context/AppContext";

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Email et mot de passe requis."); return; }
    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      login(res.data.token);
    } catch (err) {
      setError(err?.response?.data?.msg || "Connexion impossible.");
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
        <h1 className="auth-title">Connexion</h1>
        <p className="auth-subtitle">Connecte-toi à ta plateforme santé</p>
        {error && <div className="error-box">{error}</div>}
        <label className="form-label">Email</label>
        <input className="input" value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="ousmane@gmail.com" />
        <label className="form-label">Mot de passe</label>
        <input className="input" value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="••••••••" />
        <button type="submit" disabled={loading} className="btn-primary">{loading ? "Connexion..." : "Se connecter"}</button>
        <button type="button" onClick={() => navigate("/register")} className="btn-outline">Créer un compte</button>
      </form>
    </div>
  );
}
