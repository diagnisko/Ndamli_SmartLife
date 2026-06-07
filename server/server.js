const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");

dotenv.config();

const path = require("path");
const fs = require("fs");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/pharmacies", require("./routes/pharmacyRoutes"));
app.use("/api/medicaments", require("./routes/medicineRoutes"));
app.use("/api/expenses", require("./routes/expenseRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));
app.use("/api/diagnostic", require("./routes/diagnosticRoutes"));
app.use("/api/reminders", require("./routes/reminderRoutes"));
app.use("/api/delivery", require("./routes/deliveryRoutes"));

const createPharmaciesTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS pharmacies (
      id INT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      location VARCHAR(255),
      phone VARCHAR(100),
      lat DOUBLE,
      lng DOUBLE,
      distance_km FLOAT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;
  db.query(sql, (err) => {
    if (err) console.error("❌ Erreur création table pharmacies:", err);
    else console.log("✅ Table pharmacies prête");
  });
};

const seedPharmaciesTable = () => {
  const sql = `SELECT COUNT(*) AS count FROM pharmacies`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Erreur vérification table pharmacies:", err);
      return;
    }
    if (results[0].count > 0) {
      console.log("✅ Table pharmacies déjà remplie");
      return;
    }

    try {
      const geojsonPath = path.join(__dirname, "data", "pharmacies.geojson");
      const raw = fs.readFileSync(geojsonPath, "utf-8");
      const data = JSON.parse(raw);
      const features = (data.features || []).filter(f => f.geometry && f.geometry.coordinates);
      if (features.length === 0) return;

      const values = [];
      const placeholders = features.map((feature, index) => {
        const props = feature.properties || {};
        const coords = feature.geometry.coordinates || [0, 0];
        values.push(
          index + 1,
          props.name || `Pharmacie ${index + 1}`,
          props["addr:street"] || props["addr:city"] || "Dakar",
          props.phone || props["contact:phone"] || "",
          coords[0] || 0,
          coords[1] || 0,
          0
        );
        return "(?,?,?,?,?,?,?)";
      }).join(",");

      const insertSql = `INSERT INTO pharmacies (id, name, location, phone, lng, lat, distance_km) VALUES ${placeholders}`;
      db.query(insertSql, values, (insertErr) => {
        if (insertErr) {
          console.error("❌ Erreur insertion pharmacies:", insertErr);
        } else {
          console.log(`✅ ${features.length} pharmacies importées en base`);
        }
      });
    } catch (seedErr) {
      console.error("❌ Erreur seed pharmacies:", seedErr);
    }
  });
};

const createMedicamentsTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS medicaments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(255),
      price FLOAT DEFAULT 0,
      availability TINYINT(1) DEFAULT 0,
      stock INT DEFAULT 0,
      pharmacy_id INT,
      last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_pharmacy (pharmacy_id)
    )
  `;
  db.query(sql, (err) => {
    if (err) console.error("❌ Erreur création table medicaments:", err);
    else {
      console.log("✅ Table medicaments prête");
      db.query("ALTER TABLE medicaments ADD COLUMN IF NOT EXISTS stock INT DEFAULT 0", (alterErr) => {
        if (alterErr) console.error("❌ Erreur ajout colonne stock:", alterErr);
      });
    }
  });
};

const createRemindersTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS reminders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL,
      notes TEXT,
      date_time DATETIME NOT NULL,
      done TINYINT(1) DEFAULT 0,
      sent TINYINT(1) DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_user (user_id)
    )
  `;
  db.query(sql, (err) => {
    if (err) console.error("❌ Erreur création table reminders:", err);
    else console.log("✅ Table reminders prête");
  });
};

createPharmaciesTable();
createMedicamentsTable();
createRemindersTable();
seedPharmaciesTable();

app.get("/", (req, res) => res.json({ message: "🚀 Ndamli SmartLife API OK" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
