const ITEM_SCHEMA = require("./schemas/item.schema");
const ITEM_CATEGORY_SCHEMA = require("./schemas/item_category.schema");
const ITEM_IMAGE_SCHEMA = require("./schemas/item_image.schema");
const ROLE_SCHEMA = require("./schemas/role.schema");
const STORE_SCHEMA = require("./schemas/store.schema");
const USER_SCHEMA = require("./schemas/user.schema");
const USER_ADDRESS_SCHEMA = require("./schemas/user_address.schema");
const CART_ITEM_SCHEMA = require("./schemas/cart_item.schema");
const ORDER_SCHEMA = require("./schemas/order.schema");
const SOCIAL_LOGIN_SCHEMA = require("./schemas/social_login.schema");
const SHIPPING_METHOD_SCHEMA = require("./schemas/shipping_method.schema");

// User Relationship
USER_SCHEMA.belongsTo(ROLE_SCHEMA, {foreignKey: {name: "role_id"}, onDelete:"NO ACTION"})
USER_SCHEMA.hasOne(USER_ADDRESS_SCHEMA, {foreignKey:{name:"user_id"}, onDelete:"CASCADE"});
USER_SCHEMA.hasMany(ITEM_SCHEMA, {foreignKey: {name:"user_id", allowNull:true}, onDelete:"SET NULL"});
USER_SCHEMA.hasMany(ORDER_SCHEMA, {foreignKey:{name:"user_id", allowNull:true}, onDelete:"SET NULL"});
USER_SCHEMA.hasMany(CART_ITEM_SCHEMA, {foreignKey:{name:"user_id"}, onDelete:"CASCADE"});

// User Address Relationship
USER_ADDRESS_SCHEMA.belongsTo(USER_SCHEMA, {foreignKey:{name:"user_id"}, onDelete:"CASCADE"})

// Item Relationship
ITEM_SCHEMA.belongsTo(USER_SCHEMA, {foreignKey: {name:"user_id", allowNull:true}, onDelete:"SET NULL"});
ITEM_SCHEMA.belongsTo(ITEM_CATEGORY_SCHEMA, {foreignKey:{name:"category_id", allowNull:true}, onDelete:"SET NULL"});
ITEM_SCHEMA.belongsTo(STORE_SCHEMA, {foreignKey:{name:"store_id", allowNull:true}, onDelete: "SET NULL"});
ITEM_SCHEMA.hasMany(ITEM_IMAGE_SCHEMA, {foreignKey:{name:"item_id"}, onDelete:"CASCADE"})

// Item Image Relationship
ITEM_IMAGE_SCHEMA.belongsTo(ITEM_SCHEMA, {foreignKey:{name:"item_id"}, onDelete:"CASCADE"});

// Cart Relationship
CART_ITEM_SCHEMA.belongsTo(USER_SCHEMA, {foreignKey:{name:"user_id"}, onDelete:"CASCADE"});
CART_ITEM_SCHEMA.belongsTo(ITEM_SCHEMA, {foreignKey:{name:"item_id"}, onDelete:"CASCADE"});
CART_ITEM_SCHEMA.belongsTo(ORDER_SCHEMA, {foreignKey:{name:"order_id"}, onDelete:"SET NULL"});

// Order Relationship
ORDER_SCHEMA.hasMany(CART_ITEM_SCHEMA, {foreignKey:{name:"order_id"}, onDelete:"SET NULL"});
ORDER_SCHEMA.belongsTo(USER_SCHEMA, {foreignKey:{name:"user_id", allowNull:true}, onDelete:"SET NULL"});
ORDER_SCHEMA.belongsTo(SHIPPING_METHOD_SCHEMA, {foreignKey:{name:"shippingmethod_id", allowNull:true}, onDelete:"SET NULL"});

// Social login relationship
SOCIAL_LOGIN_SCHEMA.belongsTo(USER_SCHEMA, {foreignKey:{name:"user_id"}, onDelete:"CASCADE"});