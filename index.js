const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const swaggerUI = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");
const errorHandler = require("./src/middlewares/error_handler");


dotenv.config();

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

const routes = require("./src/routes");

app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use(routes);
app.use(errorHandler);


app.listen(process.env.PORT || 5000, ()=>{
    process.env.NODE_ENV === "development" && console.log(`Server running on port ${process.env.PORT || 5000}`)
})