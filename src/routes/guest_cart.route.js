const express = require("express");
const GUEST_CART_ITEM_CONTROLLER = require("../controllers/guest_cart.controller");
const router = express.Router();


router.post("/guest-cart-item", GUEST_CART_ITEM_CONTROLLER.ADD_GUEST_CART_ITEM);
router.get("/guest-cart-item", GUEST_CART_ITEM_CONTROLLER.GET_GUEST_CART_ITEMS);
router.put("/guest-cart-item/:guest_cart_item_id", GUEST_CART_ITEM_CONTROLLER.UPDATE_GUEST_CART_ITEM);
router.delete("/guest-cart-item/:guest_cart_item_id", GUEST_CART_ITEM_CONTROLLER.DELETE_GUEST_CART_ITEM);

module.exports = router;