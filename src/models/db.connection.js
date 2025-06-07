const { Sequelize } = require("sequelize");
const {
  DB_NAME,
  DB_DIALECT,
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_PORT,
} = require("../config/db.config.js");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  define: {
    freezeTableName: true,
    underscored: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

sequelize
  .sync({ alter: true })
  .then(() => console.log("✅ Database synchronized"))
  .catch((err) => console.error("❌ Sync failed:", err));

module.exports = sequelize;
