import { useState } from "react";
import API from "../services/api";

export default function ChatBox() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!msg.trim()) return;
    const userMsg = msg;
    setChat((prev) => [...prev, { user: userMsg, bot: null }]);
    setMsg("");
    setLoading(true);
    try {
      const res = await API.post("/chat", { message: userMsg });
      setChat((prev) => prev.map((c, i) => i === prev.length - 1 ? { ...c, bot: res.data.reply } : c));
    } catch {
      setChat((prev) => prev.map((c, i) => i === prev.length - 1 ? { ...c, bot: "❌ Erreur de connexion." } : c));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ height: "400px", display: "flex", flexDirection: "column" }}>
      <div className="card-title">🤖 Assistant IA</div>

      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "0.75rem" }}>
        {chat.length === 0 && (
          <div style={{ color: "#9ca3af", fontSize: "0.8rem", textAlign: "center", marginTop: "1rem" }}>
            Pose une question sur ta santé, tes médicaments...
          </div>
        )}
        {chat.map((c, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <div className="chat-bubble-user">{c.user}</div>
            {c.bot && <div className="chat-bubble-bot">{c.bot}</div>}
          </div>
        ))}
        {loading && <div className="chat-bubble-bot">⏳ En cours...</div>}
      </div>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          className="input"
          placeholder="Écris ta question..."
          style={{ flex: 1 }}
        />
        <button onClick={send} className="btn-primary">Envoyer</button>
      </div>
    </div>
  );
}
