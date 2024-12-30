const express = require("express");
const AUTH_CONTROLLER = require("../controllers/auth.controller");
const router = express.Router();


router.post("/auth/login", AUTH_CONTROLLER.NATIVE_LOGIN);
router.post("/auth/google", AUTH_CONTROLLER.GOOGLE_LOGIN);
router.post("/auth/verify-email", AUTH_CONTROLLER.VERIFY_EMAIL);
router.post("/auth/forgot-password", AUTH_CONTROLLER.FORGOT_PASSWORD);
router.post("/auth/verify-email/send", AUTH_CONTROLLER.SEND_VERIRICATION_EMAIL);
router.post("/auth/forgot-password/send", AUTH_CONTROLLER.SEND_FORGOT_PASSWORD_EMAIL);

module.exports = router;