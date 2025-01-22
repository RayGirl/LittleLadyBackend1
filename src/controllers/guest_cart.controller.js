const ExpressAsyncHandler = require("express-async-handler");
const DB = require("../models");
const ErrorResponse = require("../utils/error_response");

const ADD_GUEST_CART_ITEM = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Guest Cart']
          #swagger.description = 'Add item to Guest cart' */

    /*	#swagger.parameters['obj'] = {
              in: 'body',
              description: 'Add item to Guest cart',
              required: true,
              schema: { 
                    item_id:"1",
                    quantity: "1",
                    session_id: "uuid",
                    order_id: "uuid"
               }
      } */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const { item_id, quantity, session_id, order_id } = req.body;
    if(!item_id || !quantity || !session_id){
        throw new ErrorResponse(400, "All fields are required");
    }

    await DB.GUEST_CART_ITEM.create({
        session_id,
        quantity,
        item_id,
        order_id: order_id || null
    });

    res.status(201).json({
        success: true,
        message: "Item Added to cart successfully."
    });
});

const GET_GUEST_CART_ITEMS = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Guest Cart']
          #swagger.description = 'Get all guest cart items for the entire app.' */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const {session_id, order_id} = req.query;

    const where = {};
    const allowed_keys = ["session_id", "order_id"];
    for(const key of Object.keys(req.query)){
        if(allowed_keys.includes(key)){
            where[key] = req.query[key];
        }
    }

    const carts = await DB.GUEST_CART_ITEM.findAll({
        where
    });

    res.status(200).json({ success: true, data: {guest_carts: carts } });
});

const UPDATE_GUEST_CART_ITEM = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Guest Cart']
          #swagger.description = 'Update guest cart item.' */

    /*	#swagger.parameters['obj'] = 
     
              {
              in: 'body',
              description: 'Update cart item.',
              required: true,
              schema: { 
                    quantity: "1",
                    order_id: "1"
               }}
       */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const { guest_cart_item_id } = req.params;
    
    const cart = await DB.GUEST_CART_ITEM.findByPk(guest_cart_item_id);

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

const DELETE_GUEST_CART_ITEM = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Guest Cart']
          #swagger.description = 'Delete guest cart item' */

    /*	#swagger.parameters['obj'] = {
              in: 'path',
              description: 'The guest Cart item ID.',
              required: true,
              name: 'guest_cart_item_id'
      } */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const { guest_cart_item_id } = req.params;
    await DB.GUEST_CART_ITEM.destroy({
        where: { id: guest_cart_item_id }
    });


    res.status(200).json({ success: true });
});

module.exports = {
    ADD_GUEST_CART_ITEM,
    GET_GUEST_CART_ITEMS,
    UPDATE_GUEST_CART_ITEM,
    DELETE_GUEST_CART_ITEM
};
