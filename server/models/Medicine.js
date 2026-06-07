import { DataTypes } from "sequelize";
import { db } from "../config/db.js";

const Medicine = db.define("Medicine", {
  name: DataTypes.STRING,
  price: DataTypes.FLOAT,
  availability: DataTypes.BOOLEAN,
  pharmacyId: DataTypes.INTEGER
});

export default Medicine;