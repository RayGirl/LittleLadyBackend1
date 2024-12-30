const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Little Lady Application",
        description: "Little Lady Application API Swagger documentation",
        version: "1.0.0",
    },
    host: 'localhost:5000',
    basePath: "/api",
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
]

swaggerAutogen(outputFile, routes, doc);