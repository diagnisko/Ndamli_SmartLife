const db = require("../config/db");
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "secretkey";

function getUserId(req) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return null;
    return jwt.verify(token, SECRET).id;
  } catch {
    return null;
  }
}

exports.getReminders = (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ msg: "Non autorisé" });
  db.query(
    "SELECT id, title, category, notes, date_time AS dateTime, done, sent, created_at FROM reminders WHERE user_id = ? ORDER BY date_time ASC",
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ msg: "Erreur serveur" });
      res.json(results);
    }
  );
};

exports.addReminder = (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ msg: "Non autorisé" });
  const { title, category, notes, dateTime } = req.body;
  if (!title || !dateTime) return res.status(400).json({ msg: "Titre et date/heure requis" });

  db.query(
    "INSERT INTO reminders (user_id, title, category, notes, date_time) VALUES (?, ?, ?, ?, ?)",
    [userId, title, category || "Autre", notes || "", dateTime],
    (err, result) => {
      if (err) return res.status(500).json({ msg: "Erreur serveur" });
      db.query(
        "SELECT id, title, category, notes, date_time AS dateTime, done, sent, created_at FROM reminders WHERE id = ?",
        [result.insertId],
        (err2, rows) => {
          if (err2 || !rows.length) return res.status(500).json({ msg: "Erreur lecture" });
          res.json(rows[0]);
        }
      );
    }
  );
};

exports.updateReminder = (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ msg: "Non autorisé" });
  const { id } = req.params;
  const { title, category, notes, dateTime, done, sent } = req.body;
  db.query(
    "UPDATE reminders SET title = COALESCE(?, title), category = COALESCE(?, category), notes = COALESCE(?, notes), date_time = COALESCE(?, date_time), done = COALESCE(?, done), sent = COALESCE(?, sent) WHERE id = ? AND user_id = ?",
    [title || null, category || null, notes || null, dateTime || null, done != null ? done : null, sent != null ? sent : null, id, userId],
    (err) => {
      if (err) return res.status(500).json({ msg: "Erreur serveur" });
      db.query(
        "SELECT id, title, category, notes, date_time AS dateTime, done, sent, created_at FROM reminders WHERE id = ? AND user_id = ?",
        [id, userId],
        (err2, rows) => {
          if (err2 || !rows.length) return res.status(404).json({ msg: "Rappel introuvable" });
          res.json(rows[0]);
        }
      );
    }
  );
};

exports.deleteReminder = (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ msg: "Non autorisé" });
  db.query(
    "DELETE FROM reminders WHERE id = ? AND user_id = ?",
    [req.params.id, userId],
    (err, result) => {
      if (err) return res.status(500).json({ msg: "Erreur serveur" });
      if (result.affectedRows === 0) return res.status(404).json({ msg: "Rappel introuvable" });
      res.json({ msg: "Rappel supprimé" });
    }
  );
};
