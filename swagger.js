const swaggerAutogen = require("swagger-autogen")();
require("dotenv").config();

let host;
let schemes;
switch(process.env.NODE_ENV){
  case("development"):
    host = "localhost:5000";
    schemes = ["http", "https"]
    break
  case("production"):
    host = "littleladybackend.onrender.com";
    schemes = ["https", "http"]
    break
  default:
    host = "localhost:5000";
    schemes = ["http", "https"]
    break
}

const doc = {
    info: {
        title: "Little Lady Application",
        description: "Little Lady Application API Swagger documentation",
        version: "1.0.0",
    },
    host,
    schemes,
    basePath: "/api",
    consumes: ["application/json", "multipart/form-data"],
    produces: ["application/json", "multipart/form-data"],
    securityDefinitions: {
        apiKeyAuth: {
            type: "apiKey",
            in: "header", // can be "header", "query" or "cookie"
            name: "Authorization", // name of the header, query parameter or cookie
            description: "Authorization Bearer token",
        },
    },
};

const outputFile = "./swagger-output.json";

const routes = [
    "./src/routes/role.route",
    "./src/routes/user.route",
    "./src/routes/auth.route",
    "./src/routes/item.route",
    "./src/routes/item_image.route",
    "./src/routes/item_category.route",
    "./src/routes/store.route",
    "./src/routes/cart.route",
]

swaggerAutogen(outputFile, routes, doc);