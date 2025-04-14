const ExpressAsyncHandler = require("express-async-handler");
const DB = require("../models");
const ErrorResponse = require("../utils/error_response");
const generateOrderNumber = require("../helper/generate_order_number");


const ADD_ORDER = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Order']
          #swagger.description = "Add order for user" */

    /*	#swagger.parameters['obj'] = {
              in: 'body',
              description: "Add order for user",
              required: true,
              schema: { 
                    order_number:"string",
                    first_name: "string",
                    last_name: "string",
                    contact_phone_number: "string",
                    contact_email_address: "string",
                    apt_details: "string",
                    address: "string",
                    city: "string",
                    state: "string",
                    postal_code: "optional",
                    country: "string",
                    delivery_type: "string",
                    discount_code: "optional",
                    order_total_price: "string",
                    shippingmethod_id: "string",
                    store_id: "string",
                    user_id: "string"
                }
      } */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const user_id = req.user.id;
    const { apt_details, first_name, last_name, contact_phone_number, contact_email_address, address, city, state, postal_code, country, delivery_type, discount_code, order_total_price, shippingmethod_id } = req.body;
    if (!delivery_type || !order_total_price) {
        throw new ErrorResponse(400, "All fields are required");
    }

    let order_number = await generateOrderNumber();

    const order = await DB.ORDER.create({...req.body, order_number, user_id});

    await DB.CART_ITEM.update(
        {order_id: order.id},
        {where:{user_id, order_id:null}}
    )

    res.status(201).json({
        success: true,
        message: "Order created successfully.",
        data: {
            order_number
        }
    });
});

const ADD_GUEST_ORDER = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Order']
          #swagger.description = "Add guest order" */

    /*	#swagger.parameters['obj'] = {
              in: 'body',
              description: "Add guest order",
              required: true,
              schema: { 
                    order_number:"string",
                    first_name: "string",
                    last_name: "string",
                    contact_phone_number: "string",
                    contact_email_address: "string",
                    address: "string",
                    city: "string",
                    state: "string",
                    postal_code: "optional",
                    country: "string",
                    delivery_type: "string",
                    discount_code: "optional",
                    order_total_price: "string",
                    shippingmethod_id: "string",
                    session_id: "string"
                }
      } */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    
    const { order_number, first_name, last_name, contact_phone_number, contact_email_address, address, city, state, postal_code, country, delivery_type, discount_code, order_total_price, shippingmethod_id, session_id } = req.body;
    if (!order_id || !first_name || !last_name || !contact_phone_number || !contact_email_address || !address || !city || !state || !country || !delivery_type || !order_total_price || !shippingmethod_id || !session_id) {
        throw new ErrorResponse(400, "All fields are required");
    }

    order_details = {
        order_number, first_name, last_name, contact_phone_number, contact_email_address, address, city, state, postal_code, country, delivery_type, discount_code, order_total_price, shippingmethod_id, session_id
    }

    const order = await DB.ORDER.create(order_details);

    await DB.GUEST_CART_ITEM.update(
        {order_id: order.id},
        {where:{session_id, order_id:null}}
    )

    res.status(201).json({
        success: true,
        message: "Order created successfully."
    });
});

const GET_ALL_ORDERS = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Order']
          #swagger.description = 'Get all orders for the entire app or for a particular user.' */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */
    
    const {user_id} = req.query
    if(user_id){
        const orders = await DB.ORDER.findAll({
            where:{user_id}
        });
        return res.status(200).json({ success: true, data: { orders } });
    }
    const orders = await DB.ORDER.findAll();

    res.status(200).json({ success: true, data: { orders } });
});

const UPDATE_ORDER = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Order']
          #swagger.description = 'Update order.' */

    /*	#swagger.parameters['obj'] = {
              in: 'path',
              description: 'The original (DB) ID of the order, not the generated order ID.',
              required: true,
              name: 'order_id'
      } */

    /*	#swagger.parameters['obj'] = 
     
              {
              in: 'body',
              description: 'Update order.',
              required: true,
              schema: { 
                    first_name: "string",
                    last_name: "string",
                    contact_phone_number: "string",
                    contact_email_address: "string",
                    address: "string",
                    city: "string",
                    state: "string",
                    postal_code: "optional",
                    country: "string",
                    delivery_type: "string",
                    order_total_price: "string",
                    order_status: "pending | processing | shipped | delivered",
                    payment_status: "pending | received",
                    shippingmethod_id: "string",
                    user_id: "string"
                }
        
                }
       */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const { order_id } = req.params;
    
    const order = await DB.ORDER.findByPk(order_id);

    if (!order) {
        throw new ErrorResponse(404, "Order item not found.");
    }

    if(order.order_status == "shipped"){
        throw new ErrorResponse(500, "Cannot update a shipped item.")
    }

    await order.update(req.body);

    res.status(200).json({
        success: true,
        message: "Order updated successfully."
    });
});

const DELETE_ORDER = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Order']
          #swagger.description = 'Delete order' */

    /*	#swagger.parameters['obj'] = {
              in: 'path',
              description: 'The order ID.',
              required: true,
              name: 'order_id'
      } */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const { order_id } = req.params;
    await DB.ORDER.destroy({
        where: { id: order_id }
    });


    res.status(200).json({ success: true });
});

const GET_ORDER = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Order']
          #swagger.description = 'Get One order by the generated order number' */

    /*	#swagger.parameters['obj'] = {
              in: 'query',
              description: 'The generated order number.',
              required: false,
              name: 'order_number'
      } */

    /*	#swagger.parameters['obj'] = {
              in: 'query',
              description: 'The DB order ID.',
              required: false,
              name: 'order_id'
      } */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const { order_number } = req.query;
    const { order_id } = req.query;

    const order_by_order_number = await DB.ORDER.findOne({
        where: { order_number },
        include:[
            {model: DB.USER},
            {model: DB.CART_ITEM}
        ]
    });
    const order_by_order_id = await DB.ORDER.findByPk(order_id);

    if(order_by_order_number){
        return res.status(200).json({success: true, order:order_by_order_number})
    }
    if(order_by_order_id){
        return res.status(200).json({success: true, order:order_by_order_id})
    }

    throw new ErrorResponse(404, "Order not found.");
});

module.exports = {
    ADD_ORDER,
    GET_ALL_ORDERS,
    UPDATE_ORDER,
    DELETE_ORDER,
    GET_ORDER,
    ADD_GUEST_ORDER
};
