import { useState, useRef, useEffect } from "react";
import { Bell, X, Pill, MapPin, Wallet, CheckCheck, Clock4 } from "lucide-react";
import API from "../services/api";
import { loadReminders, getUpcomingReminders } from "../services/reminderService";

const initialNotifs = [
  { id: 1, icon: Pill, color: "#dbeafe", iconColor: "#1d4ed8", title: "Paracétamol disponible", desc: "Pharmacie du Point E — 0.8 km", time: "Il y a 5 min", read: false },
  { id: 2, icon: MapPin, color: "#dcfce7", iconColor: "#15803d", title: "Pharmacie proche ouverte", desc: "Pharmacie Yoff vient d'ouvrir", time: "Il y a 20 min", read: false },
  { id: 3, icon: Wallet, color: "#ffedd5", iconColor: "#c2410c", title: "Dépense enregistrée", desc: "Transport — 300 FCFA ajouté", time: "Il y a 1h", read: false },
];

export default function NotifDropdown() {
  const [open, setOpen] = useState(false);
  const [notifs, setNotifs] = useState(initialNotifs);
  const [reminders, setReminders] = useState(() => loadReminders());
  const ref = useRef();

  const unread = notifs.filter(n => !n.read).length + reminders.filter(r => !r.done && new Date(r.dateTime).getTime() - Date.now() <= 24 * 60 * 60 * 1000 && new Date(r.dateTime).getTime() > Date.now()).length;

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.get("/reminders", { headers: { Authorization: `Bearer ${token}` } })
        .then(res => setReminders(res.data))
        .catch(() => setReminders(loadReminders()));
    } else {
      setReminders(loadReminders());
    }

    function refreshReminders() {
      setReminders(loadReminders());
    }
    window.addEventListener("storage", refreshReminders);
    window.addEventListener("remindersUpdated", refreshReminders);
    return () => {
      window.removeEventListener("storage", refreshReminders);
      window.removeEventListener("remindersUpdated", refreshReminders);
    };
  }, []);

  function markAll() {
    setNotifs(notifs.map(n => ({ ...n, read: true })));
  }

  function dismiss(id) {
    setNotifs(notifs.filter(n => n.id !== id));
  }

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button className="notif-btn" onClick={() => setOpen(!open)}>
        <Bell size={18} />
        {unread > 0 && <span className="notif-badge">{unread}</span>}
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 10px)", right: 0,
          width: 320, background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: 14, boxShadow: "0 8px 32px rgba(0,0,0,0.15)", zIndex: 999,
          overflow: "hidden"
        }}>
          {/* Header */}
          <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text)" }}>
              Notifications {unread > 0 && <span style={{ background: "var(--primary)", color: "white", borderRadius: 9999, padding: "1px 7px", fontSize: "0.7rem", marginLeft: 6 }}>{unread}</span>}
            </span>
            {unread > 0 && (
              <button onClick={markAll} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--primary)", fontSize: "0.78rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                <CheckCheck size={13} /> Tout lire
              </button>
            )}
          </div>

          {/* Rappels à venir */}
          {reminders.length > 0 && (
            <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)", background: "#f8fafc" }}>
              <div style={{ fontWeight: 700, marginBottom: 6, color: "var(--text)" }}>Rappels à venir</div>
              {getUpcomingReminders(reminders).slice(0, 2).map(rem => (
                <div key={rem.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 12, background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Clock4 size={16} color="#c2410c" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.8rem", fontWeight: 700 }}>{rem.title}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text3)" }}>{new Date(rem.dateTime).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" })}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Liste */}
          {notifs.length === 0 ? (
            <div style={{ padding: "24px", textAlign: "center", color: "var(--text3)", fontSize: "0.85rem" }}>
              Aucune notification
            </div>
          ) : notifs.map(n => {
            const Icon = n.icon;
            return (
              <div key={n.id} style={{
                display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 16px",
                borderBottom: "1px solid var(--border)",
                background: n.read ? "transparent" : "rgba(26,122,60,0.04)",
                transition: "background 0.2s"
              }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: n.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={16} color={n.iconColor} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: "0.82rem", color: "var(--text)", marginBottom: 2 }}>{n.title}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text2)" }}>{n.desc}</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text3)", marginTop: 3 }}>{n.time}</div>
                </div>
                <button onClick={() => dismiss(n.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text3)", padding: 2 }}>
                  <X size={13} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
