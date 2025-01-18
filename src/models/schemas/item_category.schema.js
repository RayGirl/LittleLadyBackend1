const { DataTypes } = require("sequelize");
const sequelize = require("../db.connection.js");

const ITEM_CATEGORY_SCHEMA = sequelize.define("ItemCategory", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  category_slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

ITEM_CATEGORY_SCHEMA.prototype.toJSON = function (){
  const values = Object.assign({}, this.get());

  delete values.createdAt;
  delete values.updatedAt;
  return values
}


module.exports = ITEM_CATEGORY_SCHEMA;