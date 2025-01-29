const { DataTypes } = require("sequelize");
const sequelize = require("../db.connection.js");

const ITEM_SCHEMA = sequelize.define("Item", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(19,5),
    allowNull: false,
  },
  max_age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  min_age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  in_stock: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  total_in_stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pick_up_available: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  price_filter: { //low or high
    type: DataTypes.STRING, 
    allowNull: false,
  },
  is_archived:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  ready_in: { //Time taken for the item to be ready (Will be ready in?)
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

ITEM_SCHEMA.prototype.toJSON = function (){
  const values = Object.assign({}, this.get());

  delete values.createdAt;
  delete values.updatedAt;
  return values
}


module.exports = ITEM_SCHEMA;