import { useEffect, useState } from "react";
import { Wallet, MapPin, Pill, Search, TrendingUp, Bus, ShoppingCart, Package, Bell, CheckCircle2 } from "lucide-react";
import API from "../services/api";
import { loadReminders, getUpcomingReminders, formatDateTime } from "../services/reminderService";

const token = () => localStorage.getItem("token");

export default function HomePage({ onNavigate }) {
  const [expenses, setExpenses] = useState([]);
  const [pharmacies, setPharmacies] = useState([]);
  const [medicaments, setMedicaments] = useState([]);
  const [nextReminder, setNextReminder] = useState(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const tokenValue = token();
  const authConfig = tokenValue ? { headers: { Authorization: `Bearer ${tokenValue}` } } : undefined;

  useEffect(() => {
    API.get("/expenses", authConfig).then(r => setExpenses(r.data)).catch(() => {});
    API.get("/pharmacies").then(r => setPharmacies(r.data)).catch(() => {});
    API.get("/medicaments").then(r => setMedicaments(r.data)).catch(() => {});

    if (tokenValue) {
      API.get("/reminders", authConfig)
        .then(r => setNextReminder(getUpcomingReminders(r.data)[0]))
        .catch(() => setNextReminder(getUpcomingReminders(loadReminders())[0]));
    } else {
      setNextReminder(getUpcomingReminders(loadReminders())[0]);
    }
  }, []);

  const totalExpenses = expenses.reduce((s, e) => s + Number(e.amount), 0);
  const recentExpenses = expenses.slice(0, 4);

  const catColors = { Transport: "#1a7a3c", Nourriture: "#f59e0b", Santé: "#3b82f6", Autres: "#8b5cf6" };
  const catIcons = {
    Transport: <Bus size={16} />,
    Santé: <Pill size={16} />,
    Nourriture: <ShoppingCart size={16} />,
    Médicaments: <Pill size={16} />,
    Autres: <Package size={16} />
  };

  return (
    <div>
      {/* Hero */}
      <div className="hero">
        <div>
          <h1>Bonjour, {user.name || "Ousmane"} ! 👋</h1>
          <p>Tout ce qu'il vous faut, au même endroit.</p>
        </div>
        <div className="weather">
          <div className="temp">☀️ 28°C</div>
          <div>Dakar, Sénégal</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <div className="quick-card" onClick={() => onNavigate("Médicaments")}>
          <div className="qc-icon qc-green">🔍</div>
          <span>Rechercher médicament</span>
        </div>
        <div className="quick-card" onClick={() => onNavigate("Dépenses")}>
          <div className="qc-icon qc-blue">💼</div>
          <span>Ajouter dépense</span>
        </div>
        <div className="quick-card" onClick={() => onNavigate("Diagnostic")} style={{ color: "#ea580c" }}>
          <div className="qc-icon qc-orange">🩺</div>
          <span>Diagnostic santé</span>
        </div>
        <div className="quick-card" style={{ color: "#7c3aed" }}>
          <div className="qc-icon qc-purple">🚌</div>
          <span>Meilleur transport</span>
        </div>
        <div className="quick-card" onClick={() => onNavigate("Rappels")} style={{ color: "#f97316" }}>
          <div className="qc-icon qc-orange">⏰</div>
          <span>Voir mes rappels</span>
        </div>
      </div>

        <div className="stat-cards">
        <div className="stat-card">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="sc-label">Dépenses du mois</div>
            <div className="sc-icon sc-green-bg"><Wallet size={18} color="#1a7a3c" /></div>
          </div>
          <div><span className="sc-value">{totalExpenses.toLocaleString("fr-FR")}</span><span className="sc-unit">FCFA</span></div>
          <div className="sc-sub green">+12% depuis le mois dernier</div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: "62%" }}></div></div>
        </div>
        <div className="stat-card" onClick={() => onNavigate("Pharmacies proches")} style={{ cursor: "pointer" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="sc-label">Pharmacies proches</div>
            <div className="sc-icon sc-blue-bg"><MapPin size={18} color="#1d4ed8" /></div>
          </div>
          <div><span className="sc-value">{pharmacies.length || 24}</span></div>
          <div className="sc-sub">Dans un rayon de 5km</div>
        </div>
        <div className="stat-card">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="sc-label">Médicaments dispo.</div>
            <div className="sc-icon sc-orange-bg"><Pill size={18} color="#c2410c" /></div>
          </div>
          <div><span className="sc-value">{medicaments.filter(m => m.availability).length || 158}</span></div>
          <div className="sc-sub">Disponibles aujourd'hui</div>
        </div>
      </div>

      <div className="section-box" style={{ marginBottom: 16 }}>
        <div className="section-header">
          <div className="section-title">Prochain rappel</div>
          <button className="see-all" onClick={() => onNavigate("Rappels")}>Voir tout</button>
        </div>
        {nextReminder ? (
          <div className="transaction-item" style={{ padding: 18, borderRadius: 16 }}>
            <div className="tx-icon" style={{ background: "#ffedd5" }}><Clock4 size={18} color="#c2410c" /></div>
            <div className="tx-info">
              <div className="tx-name">{nextReminder.title}</div>
              <div className="tx-cat">{formatDateTime(nextReminder.dateTime)} • {nextReminder.category}</div>
            </div>
            <button className="btn-sm btn-sm-primary" onClick={() => onNavigate("Rappels")}>Voir</button>
          </div>
        ) : (
          <div className="empty-state">Aucun rappel programmé. Ajoute en un dans la page Rappels.</div>
        )}
      </div>

      {/* Chart */}
      <div className="section-box">
        <div className="section-header">
          <div className="section-title">Aperçu de vos dépenses</div>
          <button className="period-btn">Ce mois ▾</button>
        </div>
        <div className="chart-area">
          <div className="line-chart">
            <svg viewBox="0 0 400 140" className="chart-svg">
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1a7a3c" stopOpacity="0.15"/>
                  <stop offset="100%" stopColor="#1a7a3c" stopOpacity="0"/>
                </linearGradient>
              </defs>
              {[20,50,80,110].map(y => <line key={y} x1="30" y1={y} x2="390" y2={y} stroke="var(--border)" strokeWidth="1"/>)}
              {[["50k",20],["40k",50],["30k",80],["10k",110]].map(([l,y]) => <text key={l} x="0" y={y+4} fontSize="9" fill="var(--text3)">{l}</text>)}
              {[["1 Mai",40],["8 Mai",110],["15 Mai",180],["22 Mai",250],["29 Mai",330]].map(([l,x]) => <text key={l} x={x} y="135" fontSize="9" fill="var(--text3)">{l}</text>)}
              <path d="M40,100 L110,85 L180,70 L250,55 L330,60 L390,58 L390,120 L40,120 Z" fill="url(#grad)"/>
              <polyline points="40,100 110,85 180,70 250,55 330,60 390,58" fill="none" stroke="#1a7a3c" strokeWidth="2.5" strokeLinejoin="round"/>
              <circle cx="250" cy="55" r="5" fill="#1a7a3c"/>
              <rect x="210" y="30" width="80" height="28" rx="6" fill="var(--surface)" stroke="var(--border)" strokeWidth="1"/>
              <text x="250" y="43" fontSize="9" fill="var(--text3)" textAnchor="middle">22 Mai</text>
              <text x="250" y="54" fontSize="9" fill="var(--text)" textAnchor="middle" fontWeight="700">32 000 FCFA</text>
            </svg>
          </div>
          <div className="donut-area">
            <svg viewBox="0 0 120 120" className="donut-svg">
              <circle cx="60" cy="60" r="45" fill="none" stroke="#1a7a3c" strokeWidth="18" strokeDasharray="113 170" strokeDashoffset="0"/>
              <circle cx="60" cy="60" r="45" fill="none" stroke="#f59e0b" strokeWidth="18" strokeDasharray="85 198" strokeDashoffset="-113"/>
              <circle cx="60" cy="60" r="45" fill="none" stroke="#3b82f6" strokeWidth="18" strokeDasharray="42 241" strokeDashoffset="-198"/>
              <circle cx="60" cy="60" r="45" fill="none" stroke="#8b5cf6" strokeWidth="18" strokeDasharray="42 241" strokeDashoffset="-240"/>
              <text x="60" y="56" textAnchor="middle" fontSize="11" fontWeight="800" fill="var(--text)">45 500</text>
              <text x="60" y="68" textAnchor="middle" fontSize="9" fill="var(--text3)">FCFA</text>
            </svg>
            <div className="donut-legend">
              {[["#1a7a3c","Transport","40%"],["#f59e0b","Nourriture","30%"],["#3b82f6","Santé","15%"],["#8b5cf6","Autres","15%"]].map(([c,l,p]) => (
                <div key={l} className="legend-item">
                  <div className="legend-dot" style={{ background: c }}></div>
                  <span>{l}</span>
                  <span style={{ marginLeft: "auto", fontWeight: 600, paddingLeft: 8 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Transactions récentes */}
      <div className="section-box">
        <div className="section-header">
          <div className="section-title">Transactions récentes</div>
          <button className="see-all" onClick={() => onNavigate("Dépenses")}>Voir tout</button>
        </div>
        {recentExpenses.length === 0 ? (
          <div className="empty-state">Aucune dépense enregistrée. <span style={{ color: "var(--primary)", cursor: "pointer" }} onClick={() => onNavigate("Dépenses")}>Ajouter une dépense →</span></div>
        ) : recentExpenses.map((exp, i) => (
          <div key={i} className="transaction-item">
            <div className="tx-icon" style={{ background: exp.category === "Transport" ? "#dcfce7" : exp.category === "Santé" ? "#dbeafe" : "#ffedd5" }}>
              {catIcons[exp.category] || "📦"}
            </div>
            <div className="tx-info">
              <div className="tx-name">{exp.description || exp.category}</div>
              <div className="tx-cat">{exp.category}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="tx-amount">-{Number(exp.amount).toLocaleString("fr-FR")} FCFA</div>
              <div className="tx-date">{exp.expense_date ? new Date(exp.expense_date).toLocaleDateString("fr-FR") : ""}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
