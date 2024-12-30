const sequelize = require("./db.connection");

const DB = {};

// DB TABLES
DB.ROLE = require("./schemas/role.schema");
DB.USER = require("./schemas/user.schema");
DB.USER_ADDRESS = require("./schemas/user_address.schema");
DB.ITEM = require("./schemas/item.schema");
DB.CART_ITEM = require("./schemas/cart_item.schema");
DB.ITEM_CATEGORY = require("./schemas/item_category.schema");
DB.ITEM_IMAGE = require("./schemas/item_image.schema");
DB.ORDER = require("./schemas/order.schema");
DB.SHIPPING_METHOD = require("./schemas/shipping_method.schema");
DB.STORE = require("./schemas/store.schema");
DB.SOCIAL_LOGIN = require("./schemas/social_login.schema");

// DB RELATIONSHIPS/ASSOCIATIONS
require("./db.associations");

// (async function (){
//   await sequelize.sync();
//   console.log("Synced db.");
// })()

// (async function () {
//   await sequelize.sync({ force: true });
//   console.log("Force synced db.");
// }());

// (async function () {
//   await sequelize.drop();
//   console.log("Drop db.");
// })();

module.exports = DB;