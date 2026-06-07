import mongoose from "mongoose";
import Pharmacy from "../models/Pharmacy.js";

await mongoose.connect("mongodb://127.0.0.1:27017/ndamli");

const pharmacies = [
  {
    name: "Pharmacie Atlantique Mamelle",
    location: "Mamelles, Dakar",
    lat: 14.7378,
    lng: -17.5082,
    phone: "+221338602424"
  },
  {
    name: "Pharmacie Golf",
    location: "Almadies, Dakar",
    lat: 14.7566,
    lng: -17.5152,
    phone: "+221338370568"
  },
  {
    name: "Pharmacie Madiba",
    location: "Sicap Liberté 5",
    lat: 14.7167,
    lng: -17.4675,
    phone: "+221338251414"
  },
  {
    name: "Pharmacie Ouakam",
    location: "Ouakam, Dakar",
    lat: 14.7400,
    lng: -17.4900,
    phone: "+221338201500"
  },
  {
    name: "Pharmacie HLM Grand Yoff",
    location: "Grand Yoff",
    lat: 14.7441,
    lng: -17.4370,
    phone: "+221338274329"
  }
];

await Pharmacy.insertMany(pharmacies);

console.log("Pharmacies seed OK");
process.exit();