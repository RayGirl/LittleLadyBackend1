const express = require("express");
const ROLE_CONTROLLER = require("../controllers/role.controller");
const VALIDATE_TOKEN = require("../middlewares/validate_token.middleware");
const router = express.Router();


router.post("/role", ROLE_CONTROLLER.CREATE_ROLE);
router.get("/role", ROLE_CONTROLLER.GET_ALL_ROLES);
router.put("/role/:role_id", [VALIDATE_TOKEN], ROLE_CONTROLLER.UPDATE_ROLE);
router.get("/role/:role_id", [VALIDATE_TOKEN], ROLE_CONTROLLER.GET_ONE_ROLE);
router.delete("/role/:role_id", [VALIDATE_TOKEN], ROLE_CONTROLLER.DELETE_ROLE);

module.exports = router;