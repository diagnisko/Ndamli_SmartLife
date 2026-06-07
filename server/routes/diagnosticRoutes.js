const express = require("express");
const router = express.Router();
const c = require("../controllers/diagnosticController");

router.post("/", c.diagnose);
router.get("/history", c.getHistory);

module.exports = router;
