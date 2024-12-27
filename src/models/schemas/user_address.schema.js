const {DataTypes} = require("sequelize");
const sequelize = require("../db.connection");

const USER_ADDRESS_SCHEMA = sequelize.define("UserAddress", {
    apt_details:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    address:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    city:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    state:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    postal_code:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    country:{
        type: DataTypes.STRING,
        allowNull: false,
    },
})

USER_ADDRESS_SCHEMA.prototype.toJSON = function (){
    const values = Object.assign({}, this.get());

    delete values.createdAt;
    delete values.updatedAt;
    return values
  }
  
  module.exports = USER_ADDRESS_SCHEMA;