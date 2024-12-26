const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info:{
        title: "Little Lady Application",
        description: "Little Lady Application API Swagger documentation",
        version: "1.0.0",
    },
    host:'localhost:5000'
};

const outputFile = "./swagger-output.json";

const routes = []

swaggerAutogen(outputFile, routes, doc);