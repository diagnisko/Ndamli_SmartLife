const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // XAMPP = vide par défaut
  database: "Ndamli"
});

db.connect((err) => {
  if (err) {
    console.error("❌ DB error:", err);
  } else {
    console.log("✅ MySQL connecté");
  }
});

module.exports = db;