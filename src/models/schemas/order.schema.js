const { DataTypes } = require("sequelize");
const sequelize = require("../db.connection.js");

const ORDER_SCHEMA = sequelize.define("Order", {
    order_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    contact_phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    contact_email_address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    apt_details: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    postal_code: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    session_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    delivery_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    discount_code: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    order_total_price: {
        type: DataTypes.DECIMAL(19,5),
        allowNull: false,
    },
    order_status:{
        type: DataTypes.STRING, 
        defaultValue: "pending", //pending, processing, shipped, delivered
        allowNull: false
    },
    payment_status:{
        type: DataTypes.STRING, 
        defaultValue: "pending", //pending, received.
        allowNull: false
    }
});

ORDER_SCHEMA.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());

    delete values.createdAt;
    delete values.updatedAt;
    return values
}


module.exports = ORDER_SCHEMA;