const {DataTypes} = require("sequelize");
const sequelize = require("../db.connection");

const USER_SCHEMA = sequelize.define("User", {
    uuid:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    first_name:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    last_name:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    email_address:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone_number:{
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    email_verified:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
})

USER_SCHEMA.prototype.toJSON = function (){
    const values = Object.assign({}, this.get());
  
    delete values.password;
    delete values.createdAt;
    delete values.updatedAt;
    return values
  }
  
  module.exports = USER_SCHEMA