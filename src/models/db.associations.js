const ITEM_SCHEMA = require("./schemas/item.schema");
const ITEM_CATEGORY_SCHEMA = require("./schemas/item_category.schema");
const ITEM_IMAGE_SCHEMA = require("./schemas/item_image.schema");
const ROLE_SCHEMA = require("./schemas/role.schema");
const STORE_SCHEMA = require("./schemas/store.schema");
const USER_SCHEMA = require("./schemas/user.schema");
const USER_ADDRESS_SCHEMA = require("./schemas/user_address.schema");
const CART_ITEM_SCHEMA = require("./schemas/cart_item.schema");
const ORDER_SCHEMA = require("./schemas/order.schema");

// User Relationship
USER_SCHEMA.belongsTo(ROLE_SCHEMA, {foreignKey: {name: "role_id"}, onDelete:"NO ACTION"})
USER_SCHEMA.hasOne(USER_ADDRESS_SCHEMA);
USER_SCHEMA.hasMany(ITEM_SCHEMA);
USER_SCHEMA.hasMany(ORDER_SCHEMA);

// User Address Relationship
USER_ADDRESS_SCHEMA.belongsTo(USER_SCHEMA, {foreignKey:{name:"user_id"}, onDelete:"NO ACTION"})
USER_SCHEMA.hasMany(CART_ITEM_SCHEMA);

// Item Relationship
ITEM_SCHEMA.belongsTo(USER_SCHEMA, {foreignKey: {name:"user_id"}, onDelete:"NO ACTION"});
ITEM_SCHEMA.belongsTo(ITEM_CATEGORY_SCHEMA, {foreignKey:{name:"category_id"}, onDelete:"NO ACTION"});
ITEM_SCHEMA.belongsTo(STORE_SCHEMA, {foreignKey:{name:"store_id"}, onDelete: "NO ACTION"});
ITEM_SCHEMA.hasMany(ITEM_IMAGE_SCHEMA)

// Item Image Relationship
ITEM_IMAGE_SCHEMA.belongsTo(ITEM_SCHEMA, {foreignKey:{name:"item_id"}, onDelete:"NO ACTION"});

// Cart Relationship
CART_ITEM_SCHEMA.belongsTo(USER_SCHEMA, {foreignKey:{name:"user_id"}, onDelete:"CASCADE"});
CART_ITEM_SCHEMA.belongsTo(ITEM_SCHEMA, {foreignKey:{name:"item_id"}, onDelete:"CASCADE"});
CART_ITEM_SCHEMA.belongsTo(ORDER_SCHEMA, {foreignKey:{name:"order_id"}, onDelete:"SET NULL"});

// Order Relationship
ORDER_SCHEMA.hasMany(CART_ITEM_SCHEMA);
ORDER_SCHEMA.belongsTo(USER_SCHEMA, {foreignKey:{name:"user_id"}, onDelete:"NO ACTION"});