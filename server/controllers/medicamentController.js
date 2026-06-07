const db = require("../config/db");

exports.getMedicaments = (req, res) => {
  const { pharmacy_id, name, available, in_stock } = req.query;
  let sql = `SELECT m.*, p.name AS pharmacy_name FROM medicaments m LEFT JOIN pharmacies p ON m.pharmacy_id = p.id`;
  const conditions = [];
  const params = [];

  if (pharmacy_id) {
    conditions.push("m.pharmacy_id = ?");
    params.push(pharmacy_id);
  }

  if (name) {
    conditions.push("(m.name LIKE ? OR m.category LIKE ? OR p.name LIKE ?)");
    params.push(`%${name}%`, `%${name}%`, `%${name}%`);
  }

  if (available === "1" || available === "true") {
    conditions.push("m.availability = 1");
  }

  if (in_stock === "1" || in_stock === "true") {
    conditions.push("m.stock > 0");
  }

  if (conditions.length) {
    sql += " WHERE " + conditions.join(" AND ");
  }

  sql += " ORDER BY m.stock DESC, m.name ASC";

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.addMedicament = (req, res) => {
  const { name, price, availability, stock, category, pharmacy_id } = req.body;
  const availabilityValue = availability === true || availability === "1" || availability === 1 || availability === "true" ? 1 : 0;
  const stockValue = Number(stock || 0);

  db.query(
    "INSERT INTO medicaments (name, category, price, availability, stock, pharmacy_id) VALUES (?, ?, ?, ?, ?, ?)",
    [name, category || null, price || 0, availabilityValue, stockValue, pharmacy_id || null],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ msg: "Medicament ajouté" });
    }
  );
};
