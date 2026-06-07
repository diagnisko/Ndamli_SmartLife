const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "secretkey";

function getUserId(req) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    return jwt.verify(token, SECRET).id;
  } catch { return null; }
}

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  db.query(
    "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
    [name, email, hashed],
    (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") return res.status(400).json({ msg: "Cet email est déjà utilisé." });
        return res.status(500).json({ msg: "Erreur serveur lors de l'inscription." });
      }
      res.json({ msg: "Compte créé avec succès" });
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ msg: "Erreur serveur." });
    if (!results.length) return res.status(404).json({ msg: "Email introuvable." });
    const user = results[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(400).json({ msg: "Mot de passe incorrect." });
    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "7d" });
    const { password_hash, ...safeUser } = user;
    res.json({ token, user: safeUser });
  });
};

exports.getProfile = (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ msg: "Non autorisé" });
  db.query("SELECT id, name, email, role, avatar, created_at FROM users WHERE id = ?", [userId], (err, results) => {
    if (err || !results.length) return res.status(404).json({ msg: "Utilisateur introuvable" });
    res.json(results[0]);
  });
};

exports.updateProfile = (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ msg: "Non autorisé" });
  const { name, avatar } = req.body;
  db.query(
    "UPDATE users SET name = COALESCE(?, name), avatar = COALESCE(?, avatar) WHERE id = ?",
    [name || null, avatar || null, userId],
    (err) => {
      if (err) return res.status(500).json({ msg: "Erreur mise à jour" });
      db.query("SELECT id, name, email, role, avatar, created_at FROM users WHERE id = ?", [userId], (e, r) => {
        res.json({ msg: "Profil mis à jour", user: r[0] });
      });
    }
  );
};
