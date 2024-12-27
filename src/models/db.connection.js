const { Sequelize } = require("sequelize");
const {
  DB_NAME,
  DB_DIALECT,
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_PORT,
} = require("../config/db.config.js");

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  pool: {
    max: 5,
    min: 0,
    acquire: 300000,
    idle: 100000,
  },
  define:{
    freezeTableName:true,
    underscored:true,
  }
});

(async function () {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;