const express = require("express");
const ITEM_CATEGORY_CONTROLLER = require("../controllers/item_category.controller");
const VALIDATE_TOKEN = require("../middlewares/validate_token.middleware");
const router = express.Router();


router.post("/item-category", ITEM_CATEGORY_CONTROLLER.ADD_ITEM_CATEGORY);
router.get("/item-category", ITEM_CATEGORY_CONTROLLER.GET_ALL_ITEM_CATEGORY);
router.put("/item-category/:item_category_id", ITEM_CATEGORY_CONTROLLER.UPDATE_ITEM_CATEGORY);
router.delete("/item-category/:item_category_id", ITEM_CATEGORY_CONTROLLER.DELETE_ITEM_CATEGORY);

module.exports = router;