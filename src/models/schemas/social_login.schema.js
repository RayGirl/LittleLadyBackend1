const { DataTypes } = require("sequelize");
const sequelize = require("../db.connection");

const SOCIAL_LOGIN_SCHEMA = sequelize.define("SocialLogin", {
    provider_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    provider_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

SOCIAL_LOGIN_SCHEMA.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());

    delete values.createdAt;
    delete values.updatedAt;
    return values
};

module.exports = SOCIAL_LOGIN_SCHEMA;