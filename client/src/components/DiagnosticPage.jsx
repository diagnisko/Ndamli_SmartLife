import { useState, useEffect, useRef } from "react";
import {
  Stethoscope, Search, History, AlertTriangle, CheckCircle,
  Info, Pill, Clock, ChevronDown, ChevronUp, Mic, MicOff,
  Volume2, VolumeX
} from "lucide-react";
import API from "../services/api";
import { useVoice, useSpeech } from "../hooks/useVoice";

const QUICK_SYMPTOMS = [
  "Fièvre + frissons", "Mal de tête", "Douleur abdominale",
  "Toux sèche", "Fatigue intense", "Nausée + vomissement",
  "Dama feebar", "Sama bopp dafay metti", "Douleur dos",
  "Démangeaisons peau", "Tension artérielle", "Insomnie"
];

const VOICE_LANGS = [
  { code: "fr-FR", label: "🇫🇷 Français" },
  { code: "en-US", label: "🇺🇸 English" },
];

function ScoreBar({ score }) {
  const color = score >= 70 ? "#ef4444" : score >= 50 ? "#f59e0b" : "#22c55e";
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text2)", marginBottom: 4 }}>
        <span>Score de risque</span>
        <span style={{ fontWeight: 700, color }}>{score}/100</span>
      </div>
      <div style={{ height: 6, background: "var(--border)", borderRadius: 3 }}>
        <div style={{ height: "100%", width: `${score}%`, background: color, borderRadius: 3, transition: "width 0.8s ease" }} />
      </div>
    </div>
  );
}

export default function DiagnosticPage() {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showMeds, setShowMeds] = useState(false);
  const [voiceError, setVoiceError] = useState("");
  const [voiceLang, setVoiceLang] = useState("fr-FR");
  const [autoSpeak, setAutoSpeak] = useState(true);
  const interimRef = useRef("");

  const { speaking, speak, stop: stopSpeech } = useSpeech();

  const { listening, transcript, supported, start, stop } = useVoice({
    onResult: (text) => {
      setSymptoms(prev => {
        const base = prev.replace(interimRef.current, "").trim();
        interimRef.current = "";
        return base ? `${base} ${text}` : text;
      });
      setVoiceError("");
    },
    onError: (msg) => setVoiceError(msg),
  });

  // Afficher transcript intermédiaire en temps réel
  useEffect(() => {
    if (listening && transcript) {
      setSymptoms(prev => {
        const base = prev.replace(interimRef.current, "").trim();
        interimRef.current = transcript;
        return base ? `${base} ${transcript}` : transcript;
      });
    }
  }, [transcript, listening]);

  // Nettoyer quand on arrête
  useEffect(() => {
    if (!listening) {
      setSymptoms(prev => prev.replace(interimRef.current, "").trim());
      interimRef.current = "";
    }
  }, [listening]);

  function toggleVoice() {
    if (listening) { stop(); return; }
    setVoiceError("");
    start(voiceLang);
  }

  // Construire le texte vocal du résultat
  function buildVoiceText(r) {
    const meds = r.medications_list?.join(", ") || r.medications || "";
    return [
      `Résultat du diagnostic.`,
      `Maladie probable : ${r.probable_disease}.`,
      `Sévérité : ${r.severity}.`,
      `Conseils : ${r.advice}`,
      r.urgency ? r.urgency.replace(/[🚨⚠️💡🏥]/g, "") : "",
      meds ? `Médicaments suggérés : ${meds}.` : "",
      `Ce diagnostic est indicatif. Consultez un médecin pour confirmation.`
    ].filter(Boolean).join(" ");
  }

  async function handleDiagnose(e) {
    e?.preventDefault();
    const text = symptoms.replace(interimRef.current, "").trim();
    if (!text) return;
    if (listening) stop();
    stopSpeech();
    setLoading(true);
    setResult(null);

    try {
      const res = await API.post("/diagnostic", { symptoms: text }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setResult(res.data);

      // Réponse vocale automatique
      if (autoSpeak && res.data) {
        setTimeout(() => speak(buildVoiceText(res.data), voiceLang), 400);
      }
    } catch {
      const errResult = { probable_disease: "Erreur serveur", severity: "Inconnu", score: 0, advice: "Impossible de contacter le serveur.", medications: "" };
      setResult(errResult);
      if (autoSpeak) setTimeout(() => speak("Erreur de connexion au serveur. Vérifiez votre connexion.", voiceLang), 400);
    } finally {
      setLoading(false);
    }
  }

  async function loadHistory() {
    try {
      const res = await API.get("/diagnostic/history", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setHistory(res.data);
      setShowHistory(true);
    } catch {}
  }

  const severityConfig = {
    "Léger":   { cls: "diag-low",      badge: "badge-low",      Icon: CheckCircle,   color: "#15803d" },
    "Modéré":  { cls: "diag-moderate", badge: "badge-moderate", Icon: Info,          color: "#a16207" },
    "Élevé":   { cls: "diag-high",     badge: "badge-high",     Icon: AlertTriangle, color: "#b91c1c" },
    "Inconnu": { cls: "diag-low",      badge: "badge-low",      Icon: Info,          color: "#6b7280" },
  };

  return (
    <div>
      {/* ── FORMULAIRE ── */}
      <div className="section-box" style={{ marginBottom: 16 }}>
        <div className="section-header" style={{ marginBottom: 12 }}>
          <div className="section-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Stethoscope size={18} color="var(--primary)" />
            Diagnostic intelligent
          </div>
          <button className="see-all" onClick={loadHistory} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <History size={13} /> Historique
          </button>
        </div>

        <p style={{ fontSize: "0.82rem", color: "var(--text2)", marginBottom: 14, lineHeight: 1.5 }}>
          Décris tes symptômes en <strong>français</strong> ou en <strong>Wolof</strong> — par écrit ou à la <strong>voix 🎤</strong>. L'IA te répondra aussi à voix haute.
        </p>

        {/* Suggestions rapides */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: "0.72rem", color: "var(--text3)", marginBottom: 8, fontWeight: 600, letterSpacing: "0.05em" }}>SYMPTÔMES FRÉQUENTS</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {QUICK_SYMPTOMS.map(s => (
              <button key={s} onClick={() => setSymptoms(p => p ? `${p}, ${s}` : s)} style={{
                background: "var(--input-bg)", border: "1px solid var(--border)",
                borderRadius: 20, padding: "4px 10px", fontSize: "0.72rem",
                cursor: "pointer", color: "var(--text2)", fontWeight: 500, transition: "all 0.15s"
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.color = "var(--primary)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text2)"; }}
              >{s}</button>
            ))}
          </div>
        </div>

        {/* Options vocales */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.75rem", color: "var(--text3)", fontWeight: 600 }}>LANGUE VOCALE :</span>
          {VOICE_LANGS.map(l => (
            <button key={l.code} onClick={() => setVoiceLang(l.code)} style={{
              padding: "4px 12px", borderRadius: 20, fontSize: "0.75rem", fontWeight: 600,
              border: "1.5px solid", cursor: "pointer", transition: "all 0.15s",
              borderColor: voiceLang === l.code ? "var(--primary)" : "var(--border)",
              background: voiceLang === l.code ? "var(--primary-light)" : "var(--input-bg)",
              color: voiceLang === l.code ? "var(--primary)" : "var(--text2)",
            }}>{l.label}</button>
          ))}

          {/* Toggle réponse vocale auto */}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: "0.75rem", color: "var(--text2)" }}>Réponse vocale</span>
            <button onClick={() => setAutoSpeak(!autoSpeak)} style={{
              width: 40, height: 22, borderRadius: 11, border: "none", cursor: "pointer",
              background: autoSpeak ? "var(--primary)" : "var(--border)", position: "relative", transition: "background 0.2s"
            }}>
              <div style={{
                width: 16, height: 16, background: "white", borderRadius: "50%",
                position: "absolute", top: 3, left: autoSpeak ? 21 : 3, transition: "left 0.2s"
              }} />
            </button>
          </div>
        </div>

        <form onSubmit={handleDiagnose}>
          <div className="form-group" style={{ position: "relative" }}>
            <label className="form-label">Décris tes symptômes</label>
            <textarea
              className="input"
              rows={4}
              style={{
                resize: "vertical", lineHeight: 1.6, paddingRight: 52,
                borderColor: listening ? "#ef4444" : undefined,
                boxShadow: listening ? "0 0 0 3px rgba(239,68,68,0.15)" : undefined,
                transition: "all 0.2s"
              }}
              placeholder="Ex: Dama feebar, sama bopp dafay metti, je me sens fatigué depuis 2 jours avec des frissons..."
              value={symptoms}
              onChange={e => setSymptoms(e.target.value)}
            />

            {/* Bouton micro */}
            {supported && (
              <button type="button" onClick={toggleVoice} title={listening ? "Arrêter" : "Parler"} style={{
                position: "absolute", right: 10, bottom: 10,
                width: 38, height: 38, borderRadius: "50%", border: "none",
                background: listening ? "#ef4444" : "var(--primary)",
                color: "white", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: listening ? "0 0 0 8px rgba(239,68,68,0.2)" : "0 2px 8px rgba(26,122,60,0.35)",
                animation: listening ? "pulse-mic 1.2s infinite" : "none",
                transition: "all 0.2s"
              }}>
                {listening ? <MicOff size={16} /> : <Mic size={16} />}
              </button>
            )}
          </div>

          {/* Indicateur écoute */}
          {listening && (
            <div style={{
              display: "flex", alignItems: "center", gap: 10, marginBottom: 12,
              padding: "10px 14px", background: "#fef2f2", borderRadius: 10,
              border: "1px solid #fca5a5"
            }}>
              <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
                {[0,1,2,3,4].map(i => (
                  <div key={i} style={{
                    width: 3, background: "#ef4444", borderRadius: 2,
                    animation: `wave 0.8s ${i * 0.12}s infinite ease-in-out`, height: 18
                  }} />
                ))}
              </div>
              <span style={{ fontSize: "0.82rem", color: "#dc2626", fontWeight: 600 }}>🎤 Écoute en cours... Parle maintenant</span>
              <button type="button" onClick={stop} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "#dc2626", fontWeight: 700, fontSize: "0.8rem" }}>
                Arrêter
              </button>
            </div>
          )}

          {voiceError && <div className="error-box" style={{ marginBottom: 12 }}>{voiceError}</div>}

          {!supported && (
            <div style={{ fontSize: "0.75rem", color: "var(--text3)", marginBottom: 12, padding: "6px 10px", background: "var(--input-bg)", borderRadius: 8 }}>
              💡 Reconnaissance vocale disponible sur Chrome et Edge uniquement.
            </div>
          )}

          <button type="submit" className="btn-primary"
            disabled={loading || !symptoms.trim()}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {loading
              ? <><span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>⏳</span> Analyse en cours...</>
              : <><Search size={15} /> Analyser mes symptômes</>
            }
          </button>
        </form>
      </div>

      {/* ── RÉSULTAT ── */}
      {result && (() => {
        const cfg = severityConfig[result.severity] || severityConfig["Inconnu"];
        const { Icon: SevIcon } = cfg;
        const medsList = result.medications_list || (result.medications ? result.medications.split(", ") : []);
        return (
          <div className={`section-box ${cfg.cls}`} style={{ marginBottom: 16 }}>
            {/* Header résultat */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <SevIcon size={18} color={cfg.color} />
                  <div className="diag-disease">{result.probable_disease}</div>
                </div>
                <span className={`diag-badge ${cfg.badge}`}>Sévérité : {result.severity}</span>
              </div>

              {/* Contrôles vocaux du résultat */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button
                  onClick={() => speaking ? stopSpeech() : speak(buildVoiceText(result), voiceLang)}
                  title={speaking ? "Arrêter la lecture" : "Lire à voix haute"}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "6px 12px", borderRadius: 20, border: "1.5px solid",
                    borderColor: speaking ? "#ef4444" : "var(--primary)",
                    background: speaking ? "#fef2f2" : "var(--primary-light)",
                    color: speaking ? "#dc2626" : "var(--primary)",
                    cursor: "pointer", fontSize: "0.75rem", fontWeight: 600, transition: "all 0.2s"
                  }}
                >
                  {speaking ? <><VolumeX size={13} /> Arrêter</> : <><Volume2 size={13} /> Écouter</>}
                </button>
                <div style={{ fontSize: "0.72rem", color: "var(--text3)", display: "flex", alignItems: "center", gap: 4 }}>
                  <Clock size={12} />
                  {new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>

            {/* Indicateur lecture vocale */}
            {speaking && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, padding: "8px 12px", background: "rgba(26,122,60,0.08)", borderRadius: 8 }}>
                <div style={{ display: "flex", gap: 3 }}>
                  {[0,1,2,3].map(i => (
                    <div key={i} style={{ width: 3, background: "var(--primary)", borderRadius: 2, animation: `wave 0.6s ${i*0.1}s infinite`, height: 14 }} />
                  ))}
                </div>
                <span style={{ fontSize: "0.78rem", color: "var(--primary)", fontWeight: 600 }}>🔊 L'IA lit le diagnostic...</span>
              </div>
            )}

            <ScoreBar score={result.score} />

            <div style={{ marginTop: 14, padding: "12px", background: "rgba(255,255,255,0.5)", borderRadius: 10 }}>
              <div style={{ fontWeight: 700, fontSize: "0.82rem", marginBottom: 6, color: "var(--text)" }}>💡 Conseils</div>
              <div style={{ fontSize: "0.82rem", color: "var(--text)", lineHeight: 1.6 }}>{result.advice}</div>
            </div>

            {result.urgency && (
              <div style={{ marginTop: 10, padding: "8px 12px", background: "rgba(0,0,0,0.05)", borderRadius: 8, fontSize: "0.8rem", fontWeight: 600, color: "var(--text)" }}>
                {result.urgency}
              </div>
            )}

            {medsList.length > 0 && (
              <div style={{ marginTop: 12 }}>
                <button onClick={() => setShowMeds(!showMeds)} style={{
                  display: "flex", alignItems: "center", gap: 6, background: "none", border: "none",
                  cursor: "pointer", fontWeight: 700, fontSize: "0.82rem", color: "var(--text)", padding: 0
                }}>
                  <Pill size={14} color="var(--primary)" />
                  Médicaments suggérés
                  {showMeds ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </button>
                {showMeds && (
                  <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
                    {medsList.map((m, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", background: "rgba(255,255,255,0.6)", borderRadius: 8, fontSize: "0.8rem" }}>
                        <div style={{ width: 6, height: 6, background: "var(--primary)", borderRadius: "50%", flexShrink: 0 }} />
                        {m}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {result.alternatives?.length > 0 && (
              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: "0.72rem", color: "var(--text3)", fontWeight: 600, marginBottom: 6 }}>AUTRES POSSIBILITÉS</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {result.alternatives.map((a, i) => (
                    <div key={i} style={{ background: "rgba(255,255,255,0.5)", borderRadius: 8, padding: "4px 10px", fontSize: "0.75rem" }}>
                      {a.disease} <span style={{ color: "var(--text3)" }}>({a.severity})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginTop: 14, fontSize: "0.72rem", color: "var(--text3)", fontStyle: "italic", borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 10 }}>
              ⚠️ Ce diagnostic est indicatif uniquement. Consultez toujours un professionnel de santé.
            </div>
          </div>
        );
      })()}

      {/* ── HISTORIQUE ── */}
      {showHistory && (
        <div className="section-box">
          <div className="section-header">
            <div className="section-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <History size={16} color="var(--primary)" /> Historique
            </div>
            <button className="see-all" onClick={() => setShowHistory(false)}>Fermer</button>
          </div>
          {history.length === 0 && <div className="empty-state">Aucun diagnostic enregistré.</div>}
          {history.map((h, i) => (
            <div key={i} className="transaction-item">
              <div className="tx-icon" style={{ background: "#dbeafe" }}><Stethoscope size={15} color="#1d4ed8" /></div>
              <div className="tx-info">
                <div className="tx-name">{h.probable_disease}</div>
                <div className="tx-cat">{h.symptoms?.slice(0, 50)}...</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <span className={`tag ${h.severity === "Léger" ? "tag-green" : h.severity === "Élevé" ? "tag-red" : "tag-orange"}`}>{h.severity}</span>
                <div className="tx-date">{new Date(h.created_at).toLocaleDateString("fr-FR")}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse-mic {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.5); }
          50% { box-shadow: 0 0 0 12px rgba(239,68,68,0); }
        }
        @keyframes wave {
          0%, 100% { transform: scaleY(0.3); }
          50% { transform: scaleY(1.4); }
        }
      `}</style>
    </div>
  );

  function buildVoiceText(r) {
    const meds = r.medications_list?.join(", ") || r.medications || "";
    return [
      `Résultat du diagnostic.`,
      `Maladie probable : ${r.probable_disease}.`,
      `Niveau de sévérité : ${r.severity}.`,
      `Conseils : ${r.advice}`,
      r.urgency ? r.urgency.replace(/[🚨⚠️💡🏥]/g, "").trim() : "",
      meds ? `Médicaments suggérés : ${meds}.` : "",
      `Rappel : ce diagnostic est indicatif. Consultez un médecin pour confirmation.`
    ].filter(Boolean).join(" ");
  }
}
