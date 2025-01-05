const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    DB_NAME: process.env.NODE_ENV == "development" ? "littleladydb" : process.env.DB_NAME, 
    DB_USERNAME: process.env.NODE_ENV == "development" ? "root" : process.env.DB_USERNAME, 
    DB_PASSWORD: process.env.NODE_ENV == "development" ? "" : process.env.DB_PASSWORD,
    DB_HOST: process.env.NODE_ENV == "development" ? "localhost" : process.env.DB_HOST,
    DB_PORT: process.env.NODE_ENV == "development" ? 3306 : process.env.DB_PORT,
    DB_DIALECT: process.env.DB_DIALECT
}