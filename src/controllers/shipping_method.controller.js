const ExpressAsyncHandler = require("express-async-handler");
const DB = require("../models");
const ErrorResponse = require("../utils/error_response");

const ADD_SHIPPING_METHOD = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Shipping Method']
          #swagger.description = 'Create shipping method' */

    /*	#swagger.parameters['obj'] = {
              in: 'body',
              description: 'Shipping method.',
              required: true,
              schema: { 
                      method: "string",
                      note: "string",
                      method_information: "string",
                      price: 0,
               }
      } */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const { method, note, method_information, price } = req.body;

    if(!method || !note || !method_information || !price){
        throw new ErrorResponse(400,"All fields are required");
    }

    await DB.SHIPPING_METHOD.create({
        method, note, method_information, price
    });

    res.status(201).json({
        success: true,
        message: "Shipping method added successfully."
    });
});

const GET_SHIPPING_METHODS = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Shipping Method']
          #swagger.description = 'Get Shipping Methods' */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const shipping_method = await DB.SHIPPING_METHOD.findAll();

    res.status(200).json({ success: true, data: { shipping_method } });
});

const UPDATE_SHIPPING_METHOD = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Shipping Method']
          #swagger.description = 'Update shipping method.' */

    /*	#swagger.parameters['obj'] = 
     
              {
              in: 'body',
              description: 'Update shipping method.',
              required: true,
              schema: { 
                      method: "string",
                      note: "string",
                      method_information: "string",
                      price: 0,
               }
                      
               }
       */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const { shipping_method_id } = req.params;
    const shipping_method = await DB.SHIPPING_METHOD.findByPk(shipping_method_id);

    if (!shipping_method) {
        throw new ErrorResponse(404, "Shipping method not found.");
    }

    await shipping_method.update(req.body);

    res.status(200).json({
        success: true,
        message: "Shipping method updated successfully"
    });
});

const DELETE_SHIPPING_METHOD = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Shipping Method']
          #swagger.description = 'Delete shipping method' */

    /*	#swagger.parameters['obj'] = {
              in: 'path',
              description: 'The Shipping method ID.',
              required: true,
              name: 'shipping_method_id'
      } */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const { shipping_method_id } = req.params;
    await DB.SHIPPING_METHOD.destroy({
        where: { id: shipping_method_id }
    });


    res.status(200).json({ success: true });
});

module.exports = {
    ADD_SHIPPING_METHOD,
    GET_SHIPPING_METHODS,
    UPDATE_SHIPPING_METHOD,
    DELETE_SHIPPING_METHOD
};
