const { DataTypes } = require("sequelize");
const sequelize = require("../db.connection.js");

const ITEM_IMAGE_SCHEMA = sequelize.define("ItemImage", {
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
});

ITEM_IMAGE_SCHEMA.prototype.toJSON = function (){
  const values = Object.assign({}, this.get());

  delete values.createdAt;
  delete values.updatedAt;
  return values
}


module.exports = ITEM_IMAGE_SCHEMA;