const { DataTypes } = require("sequelize");
const sequelize = require("../db.connection.js");

const ROLE_SCHEMA = sequelize.define("Role", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
});

ROLE_SCHEMA.prototype.toJSON = function (){
  const values = Object.assign({}, this.get());

  delete values.createdAt;
  delete values.updatedAt;
  return values
}


module.exports = ROLE_SCHEMA;