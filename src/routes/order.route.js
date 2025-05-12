const express = require("express");
const ORDER_CONTROLLER = require("../controllers/order.controller");
const VALIDATE_TOKEN = require("../middlewares/validate_token.middleware");
const router = express.Router();


router.post("/order", [VALIDATE_TOKEN], ORDER_CONTROLLER.ADD_ORDER);
router.post("/order/guest", ORDER_CONTROLLER.ADD_GUEST_ORDER);
router.get("/order", [VALIDATE_TOKEN], ORDER_CONTROLLER.GET_ALL_ORDERS);
router.get("/order/single", [VALIDATE_TOKEN], ORDER_CONTROLLER.GET_ORDER);
router.put("/order/:order_id", [VALIDATE_TOKEN], ORDER_CONTROLLER.UPDATE_ORDER);
router.delete("/order/:order_id", [VALIDATE_TOKEN], ORDER_CONTROLLER.DELETE_ORDER);

module.exports = router;