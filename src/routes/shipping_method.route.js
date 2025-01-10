const express = require("express");
const SHIPPING_METHOD_CONTROLLER = require("../controllers/shipping_method.controller");
const VALIDATE_TOKEN = require("../middlewares/validate_token.middleware");
const router = express.Router();


router.post("/shipping-method", SHIPPING_METHOD_CONTROLLER.ADD_SHIPPING_METHOD);
router.get("/shipping-method", [VALIDATE_TOKEN], SHIPPING_METHOD_CONTROLLER.GET_SHIPPING_METHODS);
router.put("/shipping-method/:shipping_method", [VALIDATE_TOKEN], SHIPPING_METHOD_CONTROLLER.UPDATE_SHIPPING_METHOD);
router.delete("/shipping-method/:shipping_method", [VALIDATE_TOKEN], SHIPPING_METHOD_CONTROLLER.DELETE_SHIPPING_METHOD);

module.exports = router;