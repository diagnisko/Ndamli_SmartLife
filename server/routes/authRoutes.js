const express = require("express");
const router = express.Router();
const c = require("../controllers/authController");

router.post("/register", c.register);
router.post("/login", c.login);
router.get("/profile", c.getProfile);
router.put("/profile", c.updateProfile);

module.exports = router;
