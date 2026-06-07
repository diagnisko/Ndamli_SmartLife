const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const db = require("../config/db");

const geojsonPath = path.join(__dirname, "../data/pharmacies.geojson");

function loadPharmacies() {
  const raw = fs.readFileSync(geojsonPath, "utf-8");
  const data = JSON.parse(raw);
  return data.features
    .filter(f => f.geometry && f.geometry.coordinates && f.properties.name)
    .map((f, i) => ({
      id: i + 1,
      name: f.properties.name || "Pharmacie",
      phone: f.properties.phone || f.properties["contact:phone"] || null,
      location: f.properties["addr:street"] || f.properties["addr:city"] || "Dakar",
      opening_hours: f.properties.opening_hours || null,
      dispensing: f.properties.dispensing !== "no",
      lng: f.geometry.coordinates[0],
      lat: f.geometry.coordinates[1],
      available_med_count: 0,
      stocked_med_count: 0,
      total_stock: 0,
    }));
}

router.get("/", (req, res) => {
  const { search, lat, lng } = req.query;
  const filters = [];
  const params = [];

  if (search) {
    const q = `%${search}%`;
    filters.push("(p.name LIKE ? OR p.location LIKE ? OR m.name LIKE ? OR m.category LIKE ?)");
    params.push(q, q, q, q);
  }

  let sql = `
    SELECT p.id, p.name, p.location, p.phone, p.lat, p.lng,
      SUM(CASE WHEN m.availability = 1 THEN 1 ELSE 0 END) AS available_med_count,
      SUM(CASE WHEN m.stock > 0 THEN 1 ELSE 0 END) AS stocked_med_count,
      SUM(IFNULL(m.stock, 0)) AS total_stock
    FROM pharmacies p
    LEFT JOIN medicaments m ON m.pharmacy_id = p.id
  `;

  if (filters.length) {
    sql += " WHERE " + filters.join(" AND ");
  }

  sql += " GROUP BY p.id ORDER BY p.name ASC";

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("Erreur récupération pharmacies en base:", err);
      try {
        let pharmacies = loadPharmacies();
        if (search) {
          const q = search.toLowerCase();
          pharmacies = pharmacies.filter(p =>
            p.name.toLowerCase().includes(q) || (p.location && p.location.toLowerCase().includes(q))
          );
        }
        if (lat && lng) {
          const userLat = parseFloat(lat);
          const userLng = parseFloat(lng);
          pharmacies = pharmacies.map(p => {
            if (p.lat == null || p.lng == null) return p;
            const R = 6371;
            const dLat = ((p.lat - userLat) * Math.PI) / 180;
            const dLng = ((p.lng - userLng) * Math.PI) / 180;
            const a = Math.sin(dLat / 2) ** 2 + Math.cos((userLat * Math.PI) / 180) * Math.cos((p.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
            const dist = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return { ...p, distance_km: Math.round(dist * 10) / 10 };
          }).sort((a, b) => (a.distance_km || Infinity) - (b.distance_km || Infinity));
        }
        return res.json(pharmacies.slice(0, 100));
      } catch (fallbackErr) {
        return res.status(500).json({ msg: "Erreur chargement pharmacies", error: fallbackErr.message });
      }
    }

    const geoData = loadPharmacies().reduce((acc, p) => {
      acc[p.id] = p;
      return acc;
    }, {});

    const pharmacies = results.map(p => ({
      ...p,
      lat: p.lat == null && geoData[p.id] ? geoData[p.id].lat : p.lat,
      lng: p.lng == null && geoData[p.id] ? geoData[p.id].lng : p.lng,
      available_med_count: Number(p.available_med_count || 0),
      stocked_med_count: Number(p.stocked_med_count || 0),
      total_stock: Number(p.total_stock || 0)
    }));

    if (lat && lng) {
      const userLat = parseFloat(lat);
      const userLng = parseFloat(lng);
      pharmacies.forEach(p => {
        if (p.lat == null || p.lng == null) {
          p.distance_km = null;
          return;
        }
        const R = 6371;
        const dLat = ((p.lat - userLat) * Math.PI) / 180;
        const dLng = ((p.lng - userLng) * Math.PI) / 180;
        const a = Math.sin(dLat / 2) ** 2 + Math.cos((userLat * Math.PI) / 180) * Math.cos((p.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
        const dist = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        p.distance_km = Math.round(dist * 10) / 10;
      });
      pharmacies.sort((a, b) => (a.distance_km ?? Infinity) - (b.distance_km ?? Infinity));
    }

    res.json(pharmacies.slice(0, 100));
  });
});

router.get("/:id/medicaments", (req, res) => {
  const pharmacyId = req.params.id;
  db.query(
    `SELECT m.*, p.name AS pharmacy_name
     FROM medicaments m
     LEFT JOIN pharmacies p ON m.pharmacy_id = p.id
     WHERE m.pharmacy_id = ?
     ORDER BY m.stock DESC, m.name ASC`,
    [pharmacyId],
    (err, results) => {
      if (err) return res.status(500).json({ msg: "Erreur récupération des médicaments", error: err });
      res.json(results);
    }
  );
});

module.exports = router;
