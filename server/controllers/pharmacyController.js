const db = require("../config/db");

exports.getPharmacies = (req, res) => {
  const search = req.query.search ? `%${req.query.search}%` : "%";
  db.query(
    "SELECT * FROM pharmacies WHERE name LIKE ? OR location LIKE ? ORDER BY distance_km ASC",
    [search, search],
    (err, results) => {
      if (err) return res.status(500).json({ msg: "Erreur serveur" });
      res.json(results);
    }
  );
};

exports.addPharmacy = (req, res) => {
  const { name, location, phone, distance_km } = req.body;
  if (!name) return res.status(400).json({ msg: "Nom requis" });
  db.query(
    "INSERT INTO pharmacies (name, location, phone, distance_km) VALUES (?, ?, ?, ?)",
    [name, location || "", phone || "", distance_km || 0],
    (err, result) => {
      if (err) return res.status(500).json({ msg: "Erreur serveur" });
      res.json({ msg: "Pharmacie ajoutée", id: result.insertId });
    }
  );
};
