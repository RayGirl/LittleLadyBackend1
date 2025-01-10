const express = require("express");

const router = express.Router();

const api_prefix = "/api"

router.use(api_prefix, require("./role.route"));
router.use(api_prefix, require("./user.route"));
router.use(api_prefix, require("./auth.route"));
router.use(api_prefix, require("./item.route"));
router.use(api_prefix, require("./store.route"));
router.use(api_prefix, require("./item_image.route"));
router.use(api_prefix, require("./item_category.route"));
router.use(api_prefix, require("./cart.route"));
router.use(api_prefix, require("./order.route"));
router.use(api_prefix, require("./shipping_method.route"));

module.exports = router;