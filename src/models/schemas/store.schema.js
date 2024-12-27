const { DataTypes } = require("sequelize");
const sequelize = require("../db.connection");

const STORE_SCHEMA = sequelize.define("Store", {
    store_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    store_city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    store_address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    store_state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    store_postal_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    store_country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    store_phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

STORE_SCHEMA.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());

    delete values.createdAt;
    delete values.updatedAt;
    return values
};

module.exports = STORE_SCHEMA;