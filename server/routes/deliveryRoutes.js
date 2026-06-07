const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/", (req, res) => {
  const { name, address, medicine, phone } = req.body;
  db.query(
    "INSERT INTO deliveries (name, address, medicine, phone) VALUES (?, ?, ?, ?)",
    [name, address, medicine, phone],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Erreur création commande", error: err.message });
      res.json({ message: "Commande créée", id: result.insertId });
    }
  );
});

module.exports = router;
