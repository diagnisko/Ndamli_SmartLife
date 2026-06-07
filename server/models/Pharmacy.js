const mongoose = require("mongoose");

const pharmacySchema = new mongoose.Schema({
  name: String,
  location: String,
  phone: String
});

module.exports = mongoose.model("Pharmacy", pharmacySchema);