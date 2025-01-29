const express = require("express");
const ITEM_CONTROLLER = require("../controllers/item.controller");
const VALIDATE_TOKEN = require("../middlewares/validate_token.middleware");
const router = express.Router();


router.post("/item", [VALIDATE_TOKEN], ITEM_CONTROLLER.ADD_ITEM);
router.get("/item", ITEM_CONTROLLER.GET_ITEMS);
router.put("/item/:item_slug", [VALIDATE_TOKEN], ITEM_CONTROLLER.UPDATE_ITEM);
router.get("/item/:item_id", [VALIDATE_TOKEN], ITEM_CONTROLLER.GET_ONE_ITEM);
router.delete("/item/:item_id", [VALIDATE_TOKEN], ITEM_CONTROLLER.DELETE_ITEM);

module.exports = router;