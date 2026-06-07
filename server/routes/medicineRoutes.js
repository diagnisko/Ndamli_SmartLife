const express = require("express");
const router = express.Router();
const medicamentController = require("../controllers/medicamentController");

// GET
router.get("/", medicamentController.getMedicaments);

// POST
router.post("/", medicamentController.addMedicament);

module.exports = router;