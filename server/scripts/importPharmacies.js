import fs from "fs";
import mongoose from "mongoose";
import Pharmacy from "../models/Pharmacy.js";

await mongoose.connect("mongodb://127.0.0.1:27017/ndamli");

// lire fichier
const raw = JSON.parse(
  fs.readFileSync("./data/pharmacies.geojson")
);

// transformer données
const pharmacies = raw.features.map((f) => ({
  name: f.properties.name || "Pharmacie inconnue",
  lat: f.geometry.coordinates[1],
  lng: f.geometry.coordinates[0],
  phone: f.properties.phone || "Non disponible"
}));

// supprimer anciennes données (optionnel)
await Pharmacy.deleteMany();

// insert
await Pharmacy.insertMany(pharmacies);

console.log("✅ Pharmacies importées !");
process.exit();