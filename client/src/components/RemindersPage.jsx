import { useEffect, useMemo, useRef, useState } from "react";
import { Plus, Bell, Clock4, CalendarDays, CheckCircle2, Trash2, AlertCircle } from "lucide-react";
import API from "../services/api";
import {
  loadReminders,
  saveReminders,
  formatDateTime,
  ensureNotificationPermission,
  notifyReminder,
  getUpcomingReminders
} from "../services/reminderService";

const categories = ["Prise de médicament", "Renouvellement d'ordonnance", "Rappel de contrôle", "Autre"];

export default function RemindersPage() {
  const [reminders, setReminders] = useState([]);
  const remindersRef = useRef([]);
  const [form, setForm] = useState({ title: "", category: categories[0], dateTime: "", notes: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [permissionGranted, setPermissionGranted] = useState(false);
  const token = localStorage.getItem("token");
  const hasAuth = Boolean(token);
  const config = hasAuth ? { headers: { Authorization: `Bearer ${token}` } } : undefined;

  useEffect(() => {
    remindersRef.current = reminders;
  }, [reminders]);

  useEffect(() => {
    async function loadData() {
      if (hasAuth) {
        try {
          const res = await API.get("/reminders", config);
          setReminders(res.data);
          return;
        } catch {
          // fallback local
        }
      }
      setReminders(loadReminders());
    }

    loadData();
    setPermissionGranted(Notification.permission === "granted");

    const interval = setInterval(() => {
      const current = remindersRef.current;
      const now = Date.now();
      const updated = current.map(rem => {
        if (rem.done || rem.sent) return rem;
        const due = new Date(rem.dateTime).getTime();
        if (due > 0 && due <= now + 1000) {
          notifyReminder(rem);
          return { ...rem, sent: true, lastSentAt: new Date().toISOString() };
        }
        return rem;
      });
      if (JSON.stringify(updated) !== JSON.stringify(current)) {
        saveReminders(updated);
        setReminders(updated);
      }
    }, 15000);

    function refreshFromStorage() {
      setReminders(loadReminders());
    }

    window.addEventListener("storage", refreshFromStorage);
    window.addEventListener("remindersUpdated", refreshFromStorage);
    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", refreshFromStorage);
      window.removeEventListener("remindersUpdated", refreshFromStorage);
    };
  }, []);

  const upcoming = useMemo(() => getUpcomingReminders(reminders), [reminders]);
  const nextReminder = upcoming[0];

  async function handleSave() {
    setError("");
    if (!form.title.trim() || !form.dateTime) {
      setError("Donne un titre et une date/heure pour le rappel.");
      return;
    }

    const reminderPayload = {
      title: form.title.trim(),
      category: form.category,
      notes: form.notes.trim(),
      dateTime: form.dateTime,
      done: false,
      sent: false,
    };

    if (hasAuth) {
      try {
        const res = await API.post("/reminders", reminderPayload, config);
        setReminders(prev => [res.data, ...prev]);
        setSuccess("Rappel ajouté avec succès !");
        setForm({ title: "", category: categories[0], dateTime: "", notes: "" });
        setTimeout(() => setSuccess(""), 2400);
        return;
      } catch {
        // fallback local
      }
    }

    const newReminder = {
      id: Date.now(),
      ...reminderPayload,
      createdAt: new Date().toISOString(),
    };
    const next = saveReminders([newReminder, ...reminders]);
    setReminders(next);
    setForm({ title: "", category: categories[0], dateTime: "", notes: "" });
    setSuccess("Rappel ajouté avec succès !");
    setTimeout(() => setSuccess(""), 2400);
  }

  async function handleToggle(reminder) {
    const nextState = !reminder.done;
    if (hasAuth) {
      try {
        const res = await API.put(`/reminders/${reminder.id}`, { done: nextState }, config);
        setReminders(prev => prev.map(r => (r.id === reminder.id ? res.data : r)));
        return;
      } catch {
        // fallback local
      }
    }
    const next = saveReminders(reminders.map(r => r.id === reminder.id ? { ...r, done: !r.done } : r));
    setReminders(next);
  }

  async function handleDelete(reminder) {
    if (hasAuth) {
      try {
        await API.delete(`/reminders/${reminder.id}`, config);
        setReminders(prev => prev.filter(r => r.id !== reminder.id));
        return;
      } catch {
        // fallback local
      }
    }
    const next = saveReminders(reminders.filter(r => r.id !== reminder.id));
    setReminders(next);
  }

  function requestNotifications() {
    if (ensureNotificationPermission()) setPermissionGranted(true);
    else if (Notification.permission === "denied") {
      setError("Autorisation de notifications refusée. Active-les dans les paramètres du navigateur.");
    }
  }

  return (
    <div>
      <div className="section-box" style={{ marginBottom: 16 }}>
        <div className="section-header">
          <div className="section-title">🔔 Rappels de santé</div>
          <button className="btn-sm btn-sm-primary" onClick={requestNotifications} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Bell size={14} /> {permissionGranted ? "Notifications activées" : "Activer notifications"}
          </button>
        </div>
        <p style={{ color: "var(--text2)", marginBottom: 14, lineHeight: 1.6 }}>
          Planifie des rappels de prise de médicaments, renouvellement d’ordonnance ou consultation. Reçois une alerte lorsque l’heure arrive.
        </p>

        {error && <div className="error-box">{error}</div>}
        {success && <div className="success-box">{success}</div>}

        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr", marginBottom: 18 }}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 16 }}>
            <div style={{ fontSize: "0.82rem", fontWeight: 700, marginBottom: 6 }}>Prochain rappel</div>
            {nextReminder ? (
              <div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{nextReminder.title}</div>
                <div style={{ color: "var(--text2)", fontSize: "0.85rem" }}>{formatDateTime(nextReminder.dateTime)}</div>
                <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <span className="tag tag-green">{nextReminder.category}</span>
                  {nextReminder.notes && <span className="tag tag-blue">Notes</span>}
                </div>
              </div>
            ) : (
              <div className="empty-state">Aucun rappel planifié. Ajoute ton premier rappel.</div>
            )}
          </div>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 16 }}>
            <div style={{ fontSize: "0.82rem", fontWeight: 700, marginBottom: 6 }}>Rappels programmés</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span className="tag tag-green">{reminders.filter(r => !r.done).length} à venir</span>
              <span className="tag tag-red">{reminders.filter(r => r.done).length} complétés</span>
              <span className="tag tag-yellow">{reminders.filter(r => r.sent).length} notifs envoyées</span>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gap: 14, marginBottom: 16 }}>
          <div className="form-group">
            <label className="form-label">Titre du rappel</label>
            <input className="input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Ex: Prendre le Paracétamol" />
          </div>
          <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
            <div className="form-group">
              <label className="form-label">Catégorie</label>
              <select className="input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                {categories.map(cat => <option key={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Date et heure</label>
              <input className="input" type="datetime-local" value={form.dateTime} onChange={e => setForm({ ...form, dateTime: e.target.value })} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Notes</label>
            <textarea className="input" rows={3} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Informations supplémentaires" />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
            <button type="button" className="btn-outline" onClick={() => setForm({ title: "", category: categories[0], dateTime: "", notes: "" })}>
              Annuler
            </button>
            <button type="button" className="btn-primary" onClick={handleSave}>
              <Plus size={14} /> Ajouter le rappel
            </button>
          </div>
        </div>
      </div>

      <div className="section-box">
        <div className="section-header">
          <div className="section-title">Mes rappels</div>
          <span style={{ color: "var(--text2)", fontSize: "0.85rem" }}>{reminders.length} rappel{reminders.length > 1 ? "s" : ""}</span>
        </div>

        {reminders.length === 0 && <div className="empty-state">Aucun rappel enregistré pour le moment.</div>}

        {reminders.map(reminder => (
          <div key={reminder.id} className="transaction-item" style={{ alignItems: "flex-start", padding: "16px", borderRadius: 14 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>{reminder.title}</div>
                  <div style={{ fontSize: "0.84rem", color: "var(--text2)" }}>{formatDateTime(reminder.dateTime)}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                  <span className={`tag ${reminder.done ? "tag-green" : "tag-yellow"}`}>{reminder.done ? "Complété" : "À venir"}</span>
                  {reminder.sent && <span className="tag tag-blue">Notification envoyée</span>}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span className="tag tag-blue">{reminder.category}</span>
                {reminder.notes && <span className="tag tag-gray">{reminder.notes}</span>}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginLeft: 12 }}>
              <button className="btn-sm btn-sm-primary" onClick={() => handleToggle(reminder)} style={{ minWidth: 110 }}>
                {reminder.done ? <CheckCircle2 size={14} /> : <Clock4 size={14} />}
                {reminder.done ? "Marquer non fait" : "Marquer fait"}
              </button>
              <button className="btn-sm btn-sm-danger" onClick={() => handleDelete(reminder)} style={{ minWidth: 110 }}>
                <Trash2 size={14} /> Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
