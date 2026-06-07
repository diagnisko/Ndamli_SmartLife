const Medicine = db.define("Medicine", {
  name: DataTypes.STRING,
  price: DataTypes.FLOAT,
  stock: DataTypes.INTEGER,
  pharmacyId: DataTypes.INTEGER
});