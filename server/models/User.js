import { DataTypes } from "sequelize";
import { db } from "../config/db.js";

const User = db.define("User", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  language: { type: DataTypes.STRING, defaultValue: "fr" }
});

export default User;