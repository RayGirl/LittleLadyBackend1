const { DataTypes } = require("sequelize");
const sequelize = require("../db.connection.js");

const SHIPPING_METHOD_SCHEMA = sequelize.define("ShippingMethod", {
  method: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  note: {
    type: DataTypes.STRING,
    allowNull: true
  },
  method_information: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(19,5),
    allowNull: false
  },
});

SHIPPING_METHOD_SCHEMA.prototype.toJSON = function (){
  const values = Object.assign({}, this.get());

  delete values.createdAt;
  delete values.updatedAt;
  return values
}


module.exports = SHIPPING_METHOD_SCHEMA;