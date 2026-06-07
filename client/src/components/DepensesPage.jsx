import { useEffect, useState } from "react";
import { Plus, Trash2, Wallet, Bus, ShoppingCart, Pill, Package } from "lucide-react";
import API from "../services/api";

const categories = ["Transport", "Santé", "Nourriture", "Médicaments", "Autres"];
const catIconsEl = {
  Transport: <Bus size={16} color="#15803d" />,
  Santé: <Pill size={16} color="#1d4ed8" />,
  Nourriture: <ShoppingCart size={16} color="#c2410c" />,
  Médicaments: <Pill size={16} color="#1d4ed8" />,
  Autres: <Package size={16} color="#6b7280" />
};
const catColors = { Transport: "#dcfce7", Santé: "#dbeafe", Nourriture: "#ffedd5", Médicaments: "#dbeafe", Autres: "#f3f4f6" };
const token = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

export default function DepensesPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ amount: "", category: "Transport", description: "", expense_date: new Date().toISOString().split("T")[0] });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function load() {
    setLoading(true);
    API.get("/expenses", { headers: token() }).then(r => setData(r.data)).catch(() => {}).finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  async function handleAdd(e) {
    e.preventDefault();
    setError("");
    if (!form.amount) { setError("Montant requis"); return; }
    setSaving(true);
    try {
      await API.post("/expenses", form, { headers: token() });
      setShowModal(false);
      setForm({ amount: "", category: "Transport", description: "", expense_date: new Date().toISOString().split("T")[0] });
      load();
    } catch { setError("Erreur lors de l'ajout."); }
    finally { setSaving(false); }
  }

  async function handleDelete(id) {
    if (!confirm("Supprimer cette dépense ?")) return;
    await API.delete(`/expenses/${id}`, { headers: token() });
    load();
  }

  const total = data.reduce((s, e) => s + Number(e.amount), 0);

  return (
    <div>
      <div className="section-box">
        <div className="section-header">
          <div className="section-title">💰 Mes dépenses</div>
          <button className="btn-sm btn-sm-primary" onClick={() => setShowModal(true)} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Plus size={14} /> Ajouter
          </button>
        </div>

        {/* Total */}
        <div style={{ background: "var(--primary-light)", borderRadius: 10, padding: "12px 16px", marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 600, color: "var(--text2)", fontSize: "0.875rem" }}>Total ce mois</span>
          <span style={{ fontWeight: 800, fontSize: "1.3rem", color: "var(--primary)" }}>{total.toLocaleString("fr-FR")} FCFA</span>
        </div>

        {loading && <div className="empty-state">Chargement...</div>}
        {!loading && data.length === 0 && <div className="empty-state">Aucune dépense. Cliquez sur "+ Ajouter" pour commencer.</div>}
        {data.map((exp) => (
          <div key={exp.id} className="transaction-item">
            <div className="tx-icon" style={{ background: catColors[exp.category] || "#f3f4f6" }}>{catIconsEl[exp.category] || <Package size={16} />}</div>
            <div className="tx-info">
              <div className="tx-name">{exp.description || exp.category}</div>
              <div className="tx-cat">{exp.category} • {exp.expense_date ? new Date(exp.expense_date).toLocaleDateString("fr-FR") : ""}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ textAlign: "right" }}>
                <div className="tx-amount">-{Number(exp.amount).toLocaleString("fr-FR")} FCFA</div>
              </div>
              <button className="btn-danger" onClick={() => handleDelete(exp.id)} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal ajout */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">➕ Nouvelle dépense</div>
            {error && <div className="error-box">{error}</div>}
            <form onSubmit={handleAdd}>
              <div className="form-group">
                <label className="form-label">Montant (FCFA)</label>
                <input className="input" type="number" placeholder="ex: 1500" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Catégorie</label>
                <select className="input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <input className="input" placeholder="ex: Car rapide Liberté → Pikine" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Date</label>
                <input className="input" type="date" value={form.expense_date} onChange={e => setForm({ ...form, expense_date: e.target.value })} />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-outline" style={{ marginBottom: 0 }} onClick={() => setShowModal(false)}>Annuler</button>
                <button type="submit" className="btn-primary" style={{ marginBottom: 0 }} disabled={saving}>{saving ? "Enregistrement..." : "Enregistrer"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
