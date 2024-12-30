const ExpressAsyncHandler = require("express-async-handler");
const DB = require("../models");
const ErrorResponse = require("../utils/error_response");

const ADD_ITEM = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Item']
          #swagger.description = 'Create Item' */

    /*	#swagger.parameters['obj'] = {
              in: 'body',
              description: 'Add a product/item.',
              required: true,
              schema: { 
                    title: "string",
                    description: "string",
                    price: 0.0,
                    in_stock: false,
                    total_in_stock: 0,
                    pick_up_available: true,
                    ready_in:0,
               }
      } */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const { user_uuid } = req.user;
    const { title, description, price, in_stock, total_in_stock, pick_up_available, ready_in } = req.body;

    if (!title || !description || !price || !in_stock || !total_in_stock || !pick_up_available || !ready_in) {
        throw new ErrorResponse(400, "All fields are mandatory")
    }

    await DB.ITEM.create({
        title, description, price, in_stock, total_in_stock, pick_up_available, ready_in
    });

    res.status(201).json({
        success: true
    });
});

const GET_ONE_ITEM = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Item']
          #swagger.description = 'Get one item by id' */

    /*	#swagger.parameters['obj'] = {
              in: 'path',
              description: 'The Item ID.',
              required: true,
              name: 'item_id'
      } */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const { item_id } = req.params;
    const item = await DB.ITEM.findByPk(item_id);
    if (!item) {
        throw new ErrorResponse(404, "Item not found.");
    }
    res.status(200).json({ success: true, data: { item } });
});

const GET_ITEMS = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Item']
          #swagger.description = 'Get all items' */
    
            /*	#swagger.parameters['obj'] = {
              in: 'query',
              description: 'Get all items that belongs to a user.',
              required: false,
              name: 'user_uuid'
      } */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const {user_uuid} = req.query;
    if(user_uuid){
        const items = await DB.ITEM.findAll({
            where:{user_uuid}
        });
        return res.status(200).json({ success: true, data: { items } });
    }
    const items = await DB.ITEM.findAll();

    res.status(200).json({ success: true, data: { items } });
});

const UPDATE_ITEM = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Item']
          #swagger.description = 'Update item.' */

    /*	#swagger.parameters['obj'] = 
     
              {
              in: 'body',
              description: 'Item update.',
              required: true,
              schema: { 
                    title: "string",
                    description: "string",
                    price: 0.0,
                    in_stock: false,
                    total_in_stock: 0,
                    pick_up_available: true,
                    ready_in:0,
               }}
       */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const { item_id } = req.params;
    const item = await DB.ITEM.findByPk(item_id);

    if (!item) {
        throw new ErrorResponse(404, "Item not found.");
    }

    const update_response = await item.update(req.body);

    res.status(200).json({
        success: true,
    });
});

const DELETE_ITEM = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Item']
          #swagger.description = 'Delete item by id' */

    /*	#swagger.parameters['obj'] = {
              in: 'path',
              description: 'The Item ID.',
              required: true,
              name: 'item_id'
      } */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const { item_id } = req.params;
    await DB.ITEM.destroy({
        where: { id: item_id }
    });


    res.status(200).json({ success: true });
});

module.exports = {
    ADD_ITEM,
    GET_ITEMS,
    GET_ONE_ITEM,
    UPDATE_ITEM,
    DELETE_ITEM
};
