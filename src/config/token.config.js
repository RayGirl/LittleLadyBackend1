const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    AUTH_TOKEN_SECRET: process.env.AUTH_TOKEN_SECRET
}