import { DataTypes } from "sequelize";
import { db } from "../config/db.js";

const Expense = db.define("Expense", {
  userId: DataTypes.INTEGER,
  amount: DataTypes.FLOAT,
  category: DataTypes.STRING,
  date: DataTypes.DATE
});

export default Expense;