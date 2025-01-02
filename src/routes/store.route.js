const express = require("express");
const STORE_CONTROLLER = require("../controllers/store.controller");
const VALIDATE_TOKEN = require("../middlewares/validate_token.middleware");
const router = express.Router();


router.post("/store", STORE_CONTROLLER.ADD_STORE);
router.get("/store", [VALIDATE_TOKEN], STORE_CONTROLLER.GET_ALL_STORES);
router.patch("/store/:store_id", [VALIDATE_TOKEN], STORE_CONTROLLER.UPDATE_STORE);
router.get("/store/:store_id", [VALIDATE_TOKEN], STORE_CONTROLLER.GET_ONE_STORE);
router.delete("/store/:store_id", [VALIDATE_TOKEN], STORE_CONTROLLER.DELETE_STORE);

module.exports = router;