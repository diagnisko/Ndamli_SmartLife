import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Pill, MapPin, Utensils, Bus, Stethoscope } from "lucide-react";
import API from "../services/api";

const SUGGESTIONS = [
  { icon: Stethoscope, text: "Dama feebar, sama bopp dafay metti", label: "Fièvre + tête" },
  { icon: Pill,        text: "Où trouver du paracétamol ?",         label: "Médicament" },
  { icon: MapPin,      text: "Pharmacie proche ouverte",             label: "Pharmacie" },
  { icon: Utensils,    text: "Conseils alimentation saine",          label: "Nutrition" },
  { icon: Bus,         text: "Transport Dakar conseils",             label: "Transport" },
];

// Rendu simple du markdown (gras, listes)
function renderText(text) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    // Gras **texte**
    const parts = line.split(/\*\*(.*?)\*\*/g);
    const rendered = parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p);
    // Ligne vide
    if (!line.trim()) return <div key={i} style={{ height: 6 }} />;
    // Puce
    if (line.startsWith("•")) return <div key={i} style={{ paddingLeft: 8, marginBottom: 2 }}>{rendered}</div>;
    // Numérotée
    if (/^\d+\./.test(line)) return <div key={i} style={{ paddingLeft: 8, marginBottom: 2 }}>{rendered}</div>;
    return <div key={i}>{rendered}</div>;
  });
}

const initial = [
  {
    type: "bot",
    text: "Bonjour ! 👋 Je suis l'Assistant Ndamli SmartLife.\n\nJe peux t'aider avec :\n• 🩺 Tes symptômes et maladies\n• 💊 Les médicaments disponibles\n• 🏥 Les pharmacies proches\n• 🚌 Le transport à Dakar\n• 🥗 L'alimentation saine\n\nComment puis-je t'aider aujourd'hui ?",
    time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
  }
];

export default function ChatPanel() {
  const [messages, setMessages] = useState(initial);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(text) {
    const msg = text || input;
    if (!msg.trim() || loading) return;
    const time = new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    setMessages(prev => [...prev, { type: "user", text: msg, time }]);
    setInput("");
    setShowSuggestions(false);
    setLoading(true);
    try {
      const res = await API.post("/chat", { message: msg }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setMessages(prev => [...prev, { type: "bot", text: res.data.reply, time }]);
    } catch {
      setMessages(prev => [...prev, { type: "bot", text: "❌ Erreur de connexion. Vérifie que le serveur tourne.", time }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  return (
    <div className="panel-section" style={{ display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div className="panel-header">
        <div className="panel-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, background: "var(--primary-light)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Bot size={16} color="var(--primary)" />
          </div>
          Assistant Intelligent
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.72rem", color: "#22c55e", fontWeight: 600 }}>
          <div style={{ width: 7, height: 7, background: "#22c55e", borderRadius: "50%", animation: "pulse 2s infinite" }}></div>
          En ligne
        </div>
      </div>

      {/* Messages */}
      <div className="chat-messages" style={{ height: 220 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: m.type === "user" ? "flex-end" : "flex-start", gap: 2 }}>
            {m.type === "bot" && (
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
                <div style={{ width: 20, height: 20, background: "var(--primary-light)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Bot size={11} color="var(--primary)" />
                </div>
                <span style={{ fontSize: "0.68rem", color: "var(--text3)", fontWeight: 600 }}>Ndamli AI</span>
              </div>
            )}
            <div className={m.type === "user" ? "msg-user" : "msg-bot"} style={{ fontSize: "0.8rem", lineHeight: 1.5 }}>
              {renderText(m.text)}
            </div>
            <div className="msg-time">{m.time}</div>
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 20, height: 20, background: "var(--primary-light)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Bot size={11} color="var(--primary)" />
            </div>
            <div className="msg-bot" style={{ display: "flex", gap: 4, alignItems: "center", padding: "8px 14px" }}>
              {[0,1,2].map(i => (
                <div key={i} style={{ width: 6, height: 6, background: "var(--primary)", borderRadius: "50%", animation: `bounce 1s ${i * 0.2}s infinite` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions rapides */}
      {showSuggestions && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
          {SUGGESTIONS.map((s, i) => {
            const Icon = s.icon;
            return (
              <button key={i} onClick={() => send(s.text)} style={{
                display: "flex", alignItems: "center", gap: 4,
                background: "var(--input-bg)", border: "1px solid var(--border)",
                borderRadius: 20, padding: "4px 10px", fontSize: "0.72rem",
                cursor: "pointer", color: "var(--text2)", fontWeight: 500,
                transition: "all 0.15s", whiteSpace: "nowrap"
              }}
              onMouseEnter={e => { e.target.style.borderColor = "var(--primary)"; e.target.style.color = "var(--primary)"; }}
              onMouseLeave={e => { e.target.style.borderColor = "var(--border)"; e.target.style.color = "var(--text2)"; }}
              >
                <Icon size={11} /> {s.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Input */}
      <div className="chat-input-row">
        <input
          ref={inputRef}
          className="chat-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Écris en français ou en Wolof..."
          style={{ fontSize: "0.82rem" }}
        />
        <button
          className="chat-send-btn"
          onClick={() => send()}
          disabled={!input.trim() || loading}
          style={{ opacity: !input.trim() || loading ? 0.5 : 1 }}
        >
          <Send size={14} />
        </button>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
