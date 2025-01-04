const express = require("express");
const ITEM_IMAGE_CONTROLLER = require("../controllers/item_image.controller");
const VALIDATE_TOKEN = require("../middlewares/validate_token.middleware");
const router = express.Router();


router.put("/item-image/:item_image_id", ITEM_IMAGE_CONTROLLER.UPDATE_ITEM_IMAGE);
router.delete("/item-image/:item_image_id", ITEM_IMAGE_CONTROLLER.DELETE_ITEM_IMAGE);

module.exports = router;