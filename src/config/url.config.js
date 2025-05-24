const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    BACKEND_BASEURL: process.env.NODE_ENV == "development" ? "http://localhost:5000" : process.env.BACKEND_BASEURL,
    FRONTEND_BASEURL: process.env.NODE_ENV == "development" ? "http://localhost:3000" : process.env.BACKEND_BASEURL,
} 