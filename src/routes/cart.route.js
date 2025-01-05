const express = require("express");
const CART_ITEM_CONTROLLER = require("../controllers/cart.controller");
const VALIDATE_TOKEN = require("../middlewares/validate_token.middleware");
const router = express.Router();


router.post("/cart-item", [VALIDATE_TOKEN], CART_ITEM_CONTROLLER.ADD_CART_ITEM);
router.get("/cart-item", CART_ITEM_CONTROLLER.GET_ALL_CART_ITEM);
router.put("/cart-item/:cart_item_id", CART_ITEM_CONTROLLER.UPDATE_CART_ITEM);
router.delete("/cart-item/:cart_item_id", CART_ITEM_CONTROLLER.DELETE_CART_ITEM);

module.exports = router;