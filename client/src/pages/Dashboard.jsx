import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import {
  Home, Pill, Wallet, Salad, Bus, Stethoscope, Bot, User, Bell,
  Search, Globe, LogOut, Moon, Sun, Sparkles, ChevronDown
} from "lucide-react";
import ChatPanel from "../components/ChatPanel";
import PharmaciesPanel from "../components/PharmaciesPanel";
import HomePage from "../components/HomePage";
import MedicamentsPage from "../components/MedicamentsPage";
import DepensesPage from "../components/DepensesPage";
import RemindersPage from "../components/RemindersPage";
import PharmaciesPage from "../components/PharmaciesPage";
import HealthNutritionPage from "../components/HealthNutritionPage";
import DiagnosticPage from "../components/DiagnosticPage";
import ProfilPage from "../components/ProfilPage";
import TransportPage from "../components/TransportPage";
import NotifDropdown from "../components/NotifDropdown";

const menuItems = [
  { icon: Home,        label: "Accueil" },
  { icon: Pill,        label: "Médicaments" },
  { icon: Wallet,      label: "Dépenses" },
  { icon: Bell,        label: "Rappels" },
  { icon: Salad,       label: "Santé & Alimentation" },
  { icon: Bus,         label: "Transport" },
  { icon: Stethoscope, label: "Diagnostic" },
  { icon: Bot,         label: "Assistant IA" },
  { icon: User,        label: "Profil" },
];

export default function Dashboard() {
  const { logout, darkMode, toggleDark } = useApp();
  const [active, setActive] = useState("Accueil");
  const [search, setSearch] = useState("");
  const [logo, setLogo] = useState(localStorage.getItem("customLogo") || "/logo.png");
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user") || "{}"));

  // Écouter les changements de logo et de profil
  useEffect(() => {
    function onLogoChange() {
      setLogo(localStorage.getItem("customLogo") || "/logo.png");
    }
    function onStorageChange() {
      setUser(JSON.parse(localStorage.getItem("user") || "{}"));
      setLogo(localStorage.getItem("customLogo") || "/logo.png");
    }
    function onProfileUpdate() {
      setUser(JSON.parse(localStorage.getItem("user") || "{}"));
    }
    window.addEventListener("logoChanged", onLogoChange);
    window.addEventListener("storage", onStorageChange);
    window.addEventListener("profileUpdated", onProfileUpdate);
    return () => {
      window.removeEventListener("logoChanged", onLogoChange);
      window.removeEventListener("storage", onStorageChange);
      window.removeEventListener("profileUpdated", onProfileUpdate);
    };
  }, []);

  function renderMain() {
    switch (active) {
      case "Médicaments":        return <MedicamentsPage />;
      case "Dépenses":           return <DepensesPage />;
      case "Rappels":            return <RemindersPage />;
      case "Santé & Alimentation": return <HealthNutritionPage />;
      case "Pharmacies proches": return <PharmaciesPage />;
      case "Transport":         return <TransportPage />;
      case "Diagnostic":         return <DiagnosticPage />;
      case "Profil":             return <ProfilPage />;
      default:                   return <HomePage onNavigate={setActive} />;
    }
  }

  return (
    <div className="app-layout">
      {/* ── SIDEBAR ── */}
      <div className="sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="Ndamli SmartLife" style={{ width: 44, height: 44, objectFit: "contain", borderRadius: 8 }} />
          <div className="sidebar-logo-text">
            <strong>Ndamli</strong>
            <span>SmartLife</span>
          </div>
        </div>

        <div className="sidebar-nav">
          {menuItems.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className={`sidebar-item ${active === label ? "active" : ""}`}
              onClick={() => setActive(label)}
            >
              <Icon size={18} strokeWidth={1.8} />
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="sidebar-premium">
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
            <Sparkles size={16} />
            <h4 style={{ margin: 0 }}>Passez Premium</h4>
          </div>
          <p>Plus de fonctionnalités pour une vie simplifiée.</p>
          <button className="btn-premium">Passer Premium</button>
        </div>

        <div className="sidebar-bottom">
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {darkMode ? <Moon size={15} /> : <Sun size={15} />}
            <span>Mode sombre</span>
          </div>
          <button className={`toggle ${darkMode ? "on" : ""}`} onClick={toggleDark} />
        </div>
      </div>

      {/* ── MAIN ── */}
      <div className="main-area">
        {/* Topbar */}
        <div className="topbar">
          <div className="search-bar">
            <Search size={15} color="var(--text3)" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher un médicament, une pharmacie..."
            />
          </div>
          <div className="topbar-right">
            <NotifDropdown />
            <div className="user-info" style={{ cursor: "default", gap: 4 }}>
              <Globe size={15} color="var(--text3)" />
              <span style={{ fontSize: "0.82rem", color: "var(--text2)", fontWeight: 500 }}>FR</span>
            </div>
            <div className="user-info" onClick={() => setActive("Profil")}>
              <div className="user-avatar" style={{ cursor: "pointer" }}>
                {user.avatar
                  ? <img src={user.avatar} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
                  : <User size={18} color="var(--primary)" />
                }
              </div>
              <div style={{ cursor: "pointer" }}>
                <div className="user-name">{user.name || "Utilisateur"}</div>
                <div className="user-badge">Premium</div>
              </div>
              <ChevronDown size={13} color="var(--text3)" />
            </div>
            <button onClick={logout} title="Déconnexion" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text3)", display: "flex", alignItems: "center" }}>
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="content-area">
          <div className="content-main">{renderMain()}</div>
          <div className="content-right">
            <ChatPanel />
            <PharmaciesPanel onNavigate={setActive} />
            <div className="food-card">
              <div className="food-info">
                <div className="food-title">Idées de repas sains</div>
                <div className="food-desc">Découvre des recettes locales saines et économiques.</div>
                <button className="food-btn" onClick={() => setActive("Santé & Alimentation")}>Voir les recettes</button>
              </div>
              <div className="food-img">🍲</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
