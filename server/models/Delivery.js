import { DataTypes } from "sequelize";
import { db } from "../config/db.js";

const Delivery = db.define("Delivery", {
  userId: DataTypes.INTEGER,
  pharmacyId: DataTypes.INTEGER,
  address: DataTypes.STRING,
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending"
  }
});

export default Delivery;