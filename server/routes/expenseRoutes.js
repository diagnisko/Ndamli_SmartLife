const express = require("express");
const router = express.Router();
const c = require("../controllers/expenseController");

router.get("/", c.getExpenses);
router.post("/", c.addExpense);
router.delete("/:id", c.deleteExpense);

module.exports = router;
