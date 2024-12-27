const { DataTypes } = require("sequelize");
const sequelize = require("../db.connection.js");

const CART_ITEM_SCHEMA = sequelize.define("CartItem", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

CART_ITEM_SCHEMA.prototype.toJSON = function (){
  const values = Object.assign({}, this.get());

  delete values.createdAt;
  delete values.updatedAt;
  return values
}


module.exports = CART_ITEM_SCHEMA;