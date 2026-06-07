const mysql = require("mysql2");

// First connection without database to create it
const initialDb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // XAMPP = vide par défaut
});

initialDb.connect((err) => {
  if (err) {
    console.error("❌ Initial DB connection error:", err);
    return;
  }
  
  // Create database if not exists
  initialDb.query("CREATE DATABASE IF NOT EXISTS Ndamli", (err) => {
    if (err) {
      console.error("❌ Error creating database:", err);
    } else {
      console.log("✅ Database Ndamli ready");
    }
    initialDb.end();
  });
});

// Main connection with database
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