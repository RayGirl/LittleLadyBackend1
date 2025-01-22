const express = require("express");
const USER_CONTROLLER = require("../controllers/user.controller");
const VALIDATE_TOKEN = require("../middlewares/validate_token.middleware");
const router = express.Router();

router.post("/user", USER_CONTROLLER.CREATE_USER);
router.get("/user", USER_CONTROLLER.GET_USERS);
router.get("/user/:user_uuid", USER_CONTROLLER.GET_ONE_USER);
router.patch("/user/:user_uuid", USER_CONTROLLER.UPDATE_USER);
router.delete("/user/:user_uuid", USER_CONTROLLER.DELETE_USER);
router.patch("/user/:user_uuid/change-password", USER_CONTROLLER.CHANGE_PASSWORD);
router.post("/user/:user_id/address", USER_CONTROLLER.ADD_USER_ADDRESS);
router.get("/user/:user_id/address", USER_CONTROLLER.GET_USER_ADDRESS);
router.patch("/user/:user_id/address", USER_CONTROLLER.UPDATE_USER_ADDRESS);
// router.get("/user/cart", [VALIDATE_TOKEN], USER_CONTROLLER.GET_USER_CART);

module.exports = router;