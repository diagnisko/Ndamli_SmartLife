import { db } from "../config/db.js";
import { DataTypes } from "sequelize";

const Pharmacy = db.define("Pharmacy", {
  name: DataTypes.STRING,
  location: DataTypes.STRING,
  lat: DataTypes.FLOAT,
  lng: DataTypes.FLOAT,
  phone: DataTypes.STRING
});

await db.sync();

await Pharmacy.bulkCreate([
  {
    name: "Pharmacie Atlantique",
    location: "Mamelles",
    lat: 14.7378,
    lng: -17.5082,
    phone: "338602424"
  },
  {
    name: "Pharmacie Medina",
    location: "Medina Dakar",
    lat: 14.6937,
    lng: -17.4467,
    phone: "338215678"
  },
  {
    name: "Pharmacie Almadies",
    location: "Almadies",
    lat: 14.7566,
    lng: -17.5152,
    phone: "338370568"
  }
]);

console.log("Pharmacies added");
process.exit();