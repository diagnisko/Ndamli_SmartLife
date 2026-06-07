const db = require("../config/db");
const jwt = require("jsonwebtoken");

function getUserId(req) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    return decoded.id;
  } catch { return null; }
}

exports.getExpenses = (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ msg: "Non autorisé" });
  db.query("SELECT * FROM expenses WHERE user_id = ? ORDER BY created_at DESC", [userId], (err, results) => {
    if (err) return res.status(500).json({ msg: "Erreur serveur" });
    res.json(results);
  });
};

exports.addExpense = (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ msg: "Non autorisé" });
  const { amount, category, description, expense_date } = req.body;
  if (!amount) return res.status(400).json({ msg: "Montant requis" });
  db.query(
    "INSERT INTO expenses (user_id, amount, category, description, expense_date) VALUES (?, ?, ?, ?, ?)",
    [userId, amount, category || "Autres", description || "", expense_date || new Date().toISOString().split("T")[0]],
    (err, result) => {
      if (err) return res.status(500).json({ msg: "Erreur serveur" });
      res.json({ msg: "Dépense ajoutée", id: result.insertId });
    }
  );
};

exports.deleteExpense = (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ msg: "Non autorisé" });
  db.query("DELETE FROM expenses WHERE id = ? AND user_id = ?", [req.params.id, userId], (err) => {
    if (err) return res.status(500).json({ msg: "Erreur serveur" });
    res.json({ msg: "Dépense supprimée" });
  });
};
