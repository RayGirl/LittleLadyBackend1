const { DataTypes } = require("sequelize");
const sequelize = require("../db.connection.js");

const GUEST_CART_ITEM_SCHEMA = sequelize.define("GuestCartItem", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  session_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
});

GUEST_CART_ITEM_SCHEMA.prototype.toJSON = function (){
  const values = Object.assign({}, this.get());

  delete values.createdAt;
  delete values.updatedAt;
  return values
}


module.exports = GUEST_CART_ITEM_SCHEMA;