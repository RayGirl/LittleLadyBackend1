const ExpressAsyncHandler = require("express-async-handler");
const DB = require("../models");
const ErrorResponse = require("../utils/error_response");

const ADD_CART_ITEM = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Cart']
          #swagger.description = 'Add item to cart' */

    /*	#swagger.parameters['obj'] = {
              in: 'body',
              description: 'Add item to cart',
              required: true,
              schema: { 
                    item_id:"1",
                    quantity: "1"
               }
      } */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const user_id = req.user.id;
    const { item_id, quantity } = req.body;
    if (!item_id || !quantity || !user_id) {
        throw new ErrorResponse(400, "All fields are required");
    }

    const item = await DB.ITEM.findByPk(item_id,{
        attributes:["total_in_stock"],
    })

    const [cart, isJustCreated] = await DB.CART_ITEM.findOrCreate({
        where: { user_id, item_id },
        defaults: {
            user_id,
            quantity: quantity > item.total_in_stock ? item.total_in_stock : quantity,
            item_id
        }
    });

    if(!isJustCreated){
        cart.update({
            quantity:(+cart.quantity)+(+quantity) > item.total_in_stock ? item.total_in_stock : (+cart.quantity)+(+quantity)
        })
    }

    res.status(201).json({
        success: true,
        message: "Item Added to cart successfully."
    });
});

const GET_ALL_CART_ITEM = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Cart']
          #swagger.description = 'Get all cart items for the entire app.' */

    /*	#swagger.parameters['obj'] = {
             in: 'query',
             description: 'User id.',
             required: false,
             name: 'user_id'
     } */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const { user_id, order_status, order_id } = req.query;

    const where = {};
    const allowed_keys = ["user_id", "order_id"];
    for (const key of Object.keys(req.query)) {
        if (allowed_keys.includes(key)) {
            where[key] = req.query[key];
        }
    }

    if (order_status) {
        if(order_status === "pending_order"){
            where["order_id"] = null
        }
    }

    const cart = await DB.CART_ITEM.findAll({
        where,
        include:[
            {model:DB.ITEM,
            attributes:["title", "slug", "price", "total_in_stock"],
            // include:[
            //     {model:DB.}
            // ]
            }
        ]
    });

    res.status(200).json({ success: true, data: { cart } });
});

const UPDATE_CART_ITEM = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Cart']
          #swagger.description = 'Update cart item.' */

    /*	#swagger.parameters['obj'] = 
     
              {
              in: 'body',
              description: 'Update cart item.',
              required: true,
              schema: { 
                    order_id: "0",
                    quantity: "0"
               }}
       */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const { cart_item_id } = req.params;

    const cart = await DB.CART_ITEM.findByPk(cart_item_id);

    if (!cart) {
        throw new ErrorResponse(404, "Cart item not found.");
    }

    const update_response = await cart.update(req.body);

    res.status(200).json({
        success: true,
        data: {
            cart_item: update_response,
        },
    });
});

const DELETE_CART_ITEM = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Cart']
          #swagger.description = 'Delete cart item' */

    /*	#swagger.parameters['obj'] = {
              in: 'path',
              description: 'The Cart item ID.',
              required: true,
              name: 'cart_item_id'
      } */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const { cart_item_id } = req.params;
    await DB.CART_ITEM.destroy({
        where: { id: cart_item_id }
    });


    res.status(200).json({ success: true });
});

module.exports = {
    ADD_CART_ITEM,
    GET_ALL_CART_ITEM,
    UPDATE_CART_ITEM,
    DELETE_CART_ITEM,
};
