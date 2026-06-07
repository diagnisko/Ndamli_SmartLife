import { useState } from "react";
import { Bus, MapPin, Clock, Wallet, Navigation, ChevronDown, ChevronUp, Search, ArrowRight, Phone } from "lucide-react";

// Données réelles transport Dakar
const LIGNES = [
  { id: 1, nom: "Car Rapide", couleur: "#f59e0b", icon: "🚐", description: "Minibus jaune et bleu, couvre tout Dakar", prix: "100-200 FCFA", frequence: "Toutes les 5-10 min", zones: ["Plateau", "Médina", "Pikine", "Guédiawaye", "Parcelles"] },
  { id: 2, nom: "Dakar Dem Dikk", couleur: "#1a7a3c", icon: "🚌", description: "Bus climatisés, lignes principales", prix: "200-500 FCFA", frequence: "Toutes les 15-20 min", zones: ["Plateau", "Liberté", "Point E", "Mermoz", "Yoff", "Aéroport"] },
  { id: 3, nom: "Tata Bus", couleur: "#3b82f6", icon: "🚍", description: "Minibus bleu, quartiers périphériques", prix: "150-300 FCFA", frequence: "Toutes les 10-15 min", zones: ["Thiaroye", "Rufisque", "Bargny", "Diamniadio"] },
  { id: 4, nom: "BRT (Bus Rapid Transit)", couleur: "#f97316", icon: "🚎", description: "Bus articulé express, voie dédiée Guédiawaye-Plateau", prix: "400-500 FCFA", frequence: "Toutes les 5-8 min", zones: ["Guédiawaye", "Parcelles", "Liberté", "Fann", "Plateau"] },
  { id: 5, nom: "Taxi Clando", couleur: "#8b5cf6", icon: "🚕", description: "Taxi partagé, trajet fixe", prix: "200-500 FCFA", frequence: "Disponible en permanence", zones: ["Toute la ville"] },
  { id: 6, nom: "Taxi Compteur", couleur: "#ef4444", icon: "🚖", description: "Taxi individuel avec compteur", prix: "1 000-5 000 FCFA", frequence: "Sur demande", zones: ["Toute la ville"] },
  { id: 7, nom: "Yango / InDriver", couleur: "#0ea5e9", icon: "📱", description: "VTC via application mobile", prix: "800-3 000 FCFA", frequence: "Sur demande (app)", zones: ["Grand Dakar"] },
  { id: 8, nom: "TER (Train Express)", couleur: "#dc2626", icon: "🚆", description: "Train rapide Dakar-AIBD", prix: "1 500-2 500 FCFA", frequence: "Toutes les 30 min", zones: ["Dakar", "Diamniadio", "AIBD"] },
  { id: 9, nom: "Pirogue / Ferry", couleur: "#0891b2", icon: "⛵", description: "Transport maritime Dakar-Gorée-Ziguinchor", prix: "5 000-15 000 FCFA", frequence: "Plusieurs fois/jour", zones: ["Dakar", "Gorée", "Ziguinchor"] },
];

// Itinéraires populaires Dakar
const ITINERAIRES = [
  { de: "Plateau", vers: "Pikine", duree: "45-60 min", prix: "100 FCFA", transport: "Car Rapide", conseils: "Prendre à la gare routière de Petersen. Éviter 7h-9h et 17h-19h.", etapes: ["Gare Petersen", "Médina", "HLM", "Thiaroye", "Pikine"] },
  { de: "Guédiawaye", vers: "Plateau", duree: "25-35 min", prix: "400-500 FCFA", transport: "BRT", conseils: "Le BRT est le plus rapide sur cet axe. Voie dédiée, pas de bouchons.", etapes: ["Guédiawaye", "Parcelles", "Liberté", "Fann", "Plateau"] },
  { de: "Liberté 6", vers: "Plateau", duree: "20-35 min", prix: "200 FCFA", transport: "DDD Ligne 7", conseils: "Arrêt devant Auchan Liberté. Bus climatisé confortable.", etapes: ["Liberté 6", "Point E", "Fann", "Université", "Plateau"] },
  { de: "Yoff", vers: "Plateau", duree: "30-50 min", prix: "150 FCFA", transport: "DDD / Car Rapide", conseils: "DDD plus rapide mais moins fréquent. Car rapide toutes les 5 min.", etapes: ["Yoff", "Ouakam", "Mermoz", "Fann", "Plateau"] },
  { de: "Dakar", vers: "Aéroport AIBD", duree: "25-35 min", prix: "2 500 FCFA", transport: "TER", conseils: "Le TER est le plus rapide et confortable. Départ gare de Dakar.", etapes: ["Gare Dakar", "Diamniadio", "AIBD"] },
  { de: "Plateau", vers: "Rufisque", duree: "60-90 min", prix: "150 FCFA", transport: "Tata Bus", conseils: "Départ gare de Petersen. Tata direct Rufisque.", etapes: ["Petersen", "Thiaroye", "Keur Massar", "Rufisque"] },
  { de: "Médina", vers: "Parcelles Assainies", duree: "25-40 min", prix: "100 FCFA", transport: "Car Rapide", conseils: "Car rapide direct depuis Médina marché.", etapes: ["Médina", "HLM", "Cambérène", "Parcelles"] },
];

// Conseils pratiques
const CONSEILS = [
  { icon: "⏰", titre: "Heures de pointe", texte: "Évitez 7h-9h et 17h-19h. Trafic très dense sur les axes Pikine-Plateau et Liberté-Plateau." },
  { icon: "💰", titre: "Négocier le taxi", texte: "Toujours négocier le prix AVANT de monter dans un taxi clando. Demandez le prix, ne montez pas sans accord." },
  { icon: "📱", titre: "Apps recommandées", texte: "Yango et InDriver pour les VTC. Waze pour la navigation. DDD a une app officielle pour les horaires." },
  { icon: "🔒", titre: "Sécurité", texte: "Préférez les taxis officiels (jaunes) la nuit. Partagez votre trajet avec un proche via WhatsApp." },
  { icon: "🌧️", titre: "Saison des pluies", texte: "Juillet-Septembre : prévoir 2x plus de temps. Certaines routes inondées. Préférez le TER ou DDD." },
  { icon: "💡", titre: "Astuce économie", texte: "Le car rapide est 3x moins cher que le taxi. Pour les longues distances, le TER est rapide et confortable." },
];

const CONTACTS = [
  { nom: "Dakar Dem Dikk", tel: "+221 33 867 10 10", icon: "🚌" },
  { nom: "TER Sénégal", tel: "+221 33 869 00 00", icon: "🚆" },
  { nom: "Ferry Gorée", tel: "+221 33 821 68 90", icon: "⛵" },
  { nom: "Urgences", tel: "18", icon: "🚨" },
];

export default function TransportPage() {
  const [tab, setTab] = useState("itineraires");
  const [depart, setDepart] = useState("");
  const [arrivee, setArrivee] = useState("");
  const [resultats, setResultats] = useState([]);
  const [searched, setSearched] = useState(false);
  const [expanded, setExpanded] = useState(null);

  function rechercher(e) {
    e.preventDefault();
    if (!depart.trim() || !arrivee.trim()) return;
    const dep = depart.toLowerCase();
    const arr = arrivee.toLowerCase();
    const found = ITINERAIRES.filter(it =>
      it.de.toLowerCase().includes(dep) || it.vers.toLowerCase().includes(arr) ||
      dep.includes(it.de.toLowerCase()) || arr.includes(it.vers.toLowerCase())
    );
    setResultats(found.length > 0 ? found : ITINERAIRES.slice(0, 2));
    setSearched(true);
  }

  const tabs = [
    { id: "itineraires", label: "Itinéraires", icon: Navigation },
    { id: "lignes",      label: "Lignes",      icon: Bus },
    { id: "conseils",    label: "Conseils",    icon: Clock },
    { id: "contacts",    label: "Contacts",    icon: Phone },
  ];

  return (
    <div>
      {/* Header */}
      <div className="section-box" style={{ marginBottom: 16, background: "linear-gradient(135deg, #1a7a3c 0%, #065f46 100%)", border: "none" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <div style={{ width: 44, height: 44, background: "rgba(255,255,255,0.2)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Bus size={24} color="white" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "white" }}>Transport Dakar</div>
            <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.75)" }}>Tous les moyens de transport au Sénégal</div>
          </div>
        </div>
        {/* Stats rapides */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginTop: 12 }}>
          {[["8", "Moyens de transport"], ["150", "FCFA min"], ["25 min", "TER Dakar-AIBD"], ["24/7", "Disponibilité"]].map(([val, label]) => (
            <div key={label} style={{ background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>
              <div style={{ fontWeight: 800, fontSize: "1rem", color: "white" }}>{val}</div>
              <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.75)", marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setTab(id)} style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "8px 16px", borderRadius: 10, border: "1.5px solid",
            borderColor: tab === id ? "var(--primary)" : "var(--border)",
            background: tab === id ? "var(--primary)" : "var(--surface)",
            color: tab === id ? "white" : "var(--text2)",
            cursor: "pointer", fontWeight: 600, fontSize: "0.82rem",
            whiteSpace: "nowrap", transition: "all 0.15s"
          }}>
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      {/* ── ITINÉRAIRES ── */}
      {tab === "itineraires" && (
        <div>
          <div className="section-box" style={{ marginBottom: 16 }}>
            <div className="section-title" style={{ marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
              <Navigation size={16} color="var(--primary)" /> Calculer un itinéraire
            </div>
            <form onSubmit={rechercher}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <div>
                  <label className="form-label">📍 Départ</label>
                  <input className="input" placeholder="Ex: Plateau, Médina..." value={depart} onChange={e => setDepart(e.target.value)} />
                </div>
                <div>
                  <label className="form-label">🏁 Arrivée</label>
                  <input className="input" placeholder="Ex: Pikine, Yoff..." value={arrivee} onChange={e => setArrivee(e.target.value)} />
                </div>
              </div>
              <button type="submit" className="btn-primary" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <Search size={15} /> Trouver un itinéraire
              </button>
            </form>
          </div>

          {/* Résultats recherche */}
          {searched && (
            <div className="section-box" style={{ marginBottom: 16 }}>
              <div className="section-title" style={{ marginBottom: 14 }}>
                {resultats.length} itinéraire{resultats.length > 1 ? "s" : ""} trouvé{resultats.length > 1 ? "s" : ""}
              </div>
              {resultats.map((it, i) => (
                <div key={i} style={{ border: "1.5px solid var(--border)", borderRadius: 12, marginBottom: 12, overflow: "hidden" }}>
                  <div style={{ padding: "14px 16px", cursor: "pointer", background: expanded === i ? "var(--primary-light)" : "var(--surface)" }}
                    onClick={() => setExpanded(expanded === i ? null : i)}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text)" }}>
                          {it.de} <ArrowRight size={14} style={{ verticalAlign: "middle", color: "var(--primary)" }} /> {it.vers}
                        </div>
                      </div>
                      {expanded === i ? <ChevronUp size={16} color="var(--text3)" /> : <ChevronDown size={16} color="var(--text3)" />}
                    </div>
                    <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
                      <span style={{ fontSize: "0.78rem", color: "var(--text2)", display: "flex", alignItems: "center", gap: 4 }}>
                        <Clock size={12} /> {it.duree}
                      </span>
                      <span style={{ fontSize: "0.78rem", color: "var(--primary)", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                        <Wallet size={12} /> {it.prix}
                      </span>
                      <span style={{ fontSize: "0.78rem", color: "var(--text2)", display: "flex", alignItems: "center", gap: 4 }}>
                        <Bus size={12} /> {it.transport}
                      </span>
                    </div>
                  </div>
                  {expanded === i && (
                    <div style={{ padding: "14px 16px", borderTop: "1px solid var(--border)", background: "var(--input-bg)" }}>
                      {/* Étapes */}
                      <div style={{ marginBottom: 12 }}>
                        <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text3)", marginBottom: 8 }}>ÉTAPES DU TRAJET</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 0, flexWrap: "wrap" }}>
                          {it.etapes.map((e, j) => (
                            <div key={j} style={{ display: "flex", alignItems: "center" }}>
                              <div style={{
                                padding: "4px 10px", borderRadius: 20, fontSize: "0.75rem", fontWeight: 600,
                                background: j === 0 ? "var(--primary)" : j === it.etapes.length - 1 ? "#ef4444" : "var(--border)",
                                color: j === 0 || j === it.etapes.length - 1 ? "white" : "var(--text)"
                              }}>{e}</div>
                              {j < it.etapes.length - 1 && <ArrowRight size={12} color="var(--text3)" style={{ margin: "0 4px" }} />}
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Conseils */}
                      <div style={{ padding: "10px 12px", background: "#fffbeb", borderRadius: 8, border: "1px solid #fde68a", fontSize: "0.8rem", color: "#92400e" }}>
                        💡 {it.conseils}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Itinéraires populaires */}
          <div className="section-box">
            <div className="section-title" style={{ marginBottom: 14 }}>🔥 Trajets populaires</div>
            {ITINERAIRES.map((it, i) => (
              <div key={i} className="transaction-item" style={{ cursor: "pointer" }}
                onClick={() => { setDepart(it.de); setArrivee(it.vers); setResultats([it]); setSearched(true); setTab("itineraires"); }}>
                <div className="tx-icon" style={{ background: "#dcfce7" }}><Bus size={15} color="#15803d" /></div>
                <div className="tx-info">
                  <div className="tx-name">{it.de} → {it.vers}</div>
                  <div className="tx-cat">{it.transport} • {it.duree}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700, color: "var(--primary)", fontSize: "0.85rem" }}>{it.prix}</div>
                  <div className="tx-date">{it.etapes.length} arrêts</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── LIGNES ── */}
      {tab === "lignes" && (
        <div>
          {LIGNES.map((ligne, i) => (
            <div key={i} className="section-box" style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: ligne.couleur + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", flexShrink: 0 }}>
                  {ligne.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text)" }}>{ligne.nom}</div>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: ligne.couleur }} />
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text2)", marginBottom: 8 }}>{ligne.description}</div>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
                    <span style={{ fontSize: "0.78rem", display: "flex", alignItems: "center", gap: 4, color: "var(--primary)", fontWeight: 700 }}>
                      <Wallet size={12} /> {ligne.prix}
                    </span>
                    <span style={{ fontSize: "0.78rem", display: "flex", alignItems: "center", gap: 4, color: "var(--text2)" }}>
                      <Clock size={12} /> {ligne.frequence}
                    </span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {ligne.zones.map(z => (
                      <span key={z} style={{ background: ligne.couleur + "22", color: ligne.couleur, borderRadius: 20, padding: "2px 8px", fontSize: "0.72rem", fontWeight: 600 }}>
                        {z}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── CONSEILS ── */}
      {tab === "conseils" && (
        <div>
          {CONSEILS.map((c, i) => (
            <div key={i} className="section-box" style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ fontSize: "1.8rem", flexShrink: 0 }}>{c.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text)", marginBottom: 6 }}>{c.titre}</div>
                  <div style={{ fontSize: "0.82rem", color: "var(--text2)", lineHeight: 1.6 }}>{c.texte}</div>
                </div>
              </div>
            </div>
          ))}

          {/* Comparatif prix */}
          <div className="section-box">
            <div className="section-title" style={{ marginBottom: 14 }}>💰 Comparatif des prix</div>
            {[
              { transport: "Car Rapide",    prix: 100,  max: 200,  color: "#f59e0b" },
              { transport: "Tata Bus",       prix: 150,  max: 300,  color: "#3b82f6" },
              { transport: "BRT",            prix: 400,  max: 500,  color: "#f97316" },
              { transport: "DDD",            prix: 200,  max: 500,  color: "#1a7a3c" },
              { transport: "Taxi Clando",    prix: 200,  max: 500,  color: "#8b5cf6" },
              { transport: "TER",            prix: 1500, max: 2500, color: "#dc2626" },
              { transport: "Taxi Compteur",  prix: 1000, max: 5000, color: "#ef4444" },
              { transport: "Yango/InDriver", prix: 800,  max: 3000, color: "#0ea5e9" },
            ].map((t, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, color: "var(--text)" }}>{t.transport}</span>
                  <span style={{ color: t.color, fontWeight: 700 }}>{t.prix} - {t.max} FCFA</span>
                </div>
                <div style={{ height: 6, background: "var(--border)", borderRadius: 3 }}>
                  <div style={{ height: "100%", width: `${Math.min((t.max / 5000) * 100, 100)}%`, background: t.color, borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── CONTACTS ── */}
      {tab === "contacts" && (
        <div>
          <div className="section-box" style={{ marginBottom: 16 }}>
            <div className="section-title" style={{ marginBottom: 14 }}>📞 Contacts utiles</div>
            {CONTACTS.map((c, i) => (
              <div key={i} className="transaction-item">
                <div className="tx-icon" style={{ background: "#dcfce7", fontSize: "1.1rem" }}>{c.icon}</div>
                <div className="tx-info">
                  <div className="tx-name">{c.nom}</div>
                  <div className="tx-cat">{c.tel}</div>
                </div>
                <a href={`tel:${c.tel}`} style={{
                  display: "flex", alignItems: "center", gap: 6,
                  background: "var(--primary)", color: "white",
                  padding: "6px 14px", borderRadius: 20, fontSize: "0.78rem",
                  fontWeight: 600, textDecoration: "none"
                }}>
                  <Phone size={12} /> Appeler
                </a>
              </div>
            ))}
          </div>

          {/* Apps */}
          <div className="section-box">
            <div className="section-title" style={{ marginBottom: 14 }}>📱 Applications recommandées</div>
            {[
              { nom: "Yango", desc: "VTC rapide et fiable à Dakar", color: "#ef4444", icon: "🚗" },
              { nom: "InDriver", desc: "Négociez le prix de votre course", color: "#1a7a3c", icon: "🚕" },
              { nom: "Waze", desc: "Navigation GPS avec trafic en temps réel", color: "#3b82f6", icon: "🗺️" },
              { nom: "DDD App", desc: "Horaires officiels Dakar Dem Dikk", color: "#1a7a3c", icon: "🚌" },
            ].map((app, i) => (
              <div key={i} className="transaction-item">
                <div className="tx-icon" style={{ background: app.color + "22", fontSize: "1.1rem" }}>{app.icon}</div>
                <div className="tx-info">
                  <div className="tx-name">{app.nom}</div>
                  <div className="tx-cat">{app.desc}</div>
                </div>
                <span className="tag tag-green">Gratuit</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
