const express = require("express");

const router = express.Router();

const api_prefix = "/api"

router.use(api_prefix, require("./user.route"));
router.use(api_prefix, require("./role.route"));

module.exports = router;