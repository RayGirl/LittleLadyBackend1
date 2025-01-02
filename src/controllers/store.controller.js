const ExpressAsyncHandler = require("express-async-handler");
const DB = require("../models");
const ErrorResponse = require("../utils/error_response");

const ADD_STORE = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Store']
          #swagger.description = 'Create store' */

    /*	#swagger.parameters['obj'] = {
              in: 'body',
              description: 'Store',
              required: true,
              schema: { 
                      store_name: "string",
                      store_city: "string",
                      store_address: "string",
                      store_state: "string",
                      store_postal_code: "string",
                      store_country: "string",
                      store_phone_number: "string",
               }
      } */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const { store_name, store_city, store_address,store_state,store_postal_code,store_country,store_phone_number  } = req.body;

    if(!store_name || !store_city || !store_address || !store_state || !store_postal_code || !store_country || !store_phone_number){
        throw new ErrorResponse(400, "All fields are mandatory");
    }

    const store = await DB.STORE.create({
        store_name,
        store_city,
        store_address, 
        store_state,
        store_postal_code,
        store_country,
        store_phone_number
    });

    res.status(201).json({
        success: true,
        message: "Store created successfully.",
        data: {
            store,
        },
    });
});

const GET_ONE_STORE = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Store']
          #swagger.description = 'Get one store by id' */

    /*	#swagger.parameters['obj'] = {
              in: 'path',
              description: 'The Store ID.',
              required: true,
              name: 'store_id'
      } */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const { store_id } = req.params;
    const store = await DB.STORE.findByPk(store_id);
    if (!store) {
        throw new ErrorResponse(404, "Store not found.");
    }
    res.status(200).json({ success: true, data: { store } });
});

const GET_ALL_STORES = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Store']
          #swagger.description = 'Get all stores' */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const stores = await DB.STORE.findAll();

    res.status(200).json({ success: true, data: { stores } });
});

const UPDATE_STORE = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Store']
          #swagger.description = 'Update store.' */

    /*	#swagger.parameters['obj'] = 
     
              {
              in: 'body',
              description: 'Update store.',
              required: true,
              schema: { 
                      store_name: "string",
                      store_city: "string",
                      store_address: "string",
                      store_state: "string",
                      store_postal_code: "string",
                      store_country: "string",
                      store_phone_number: "string",
               }
                      }
       */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const { store_id } = req.params;

    const store = await DB.STORE.findByPk(store_id);

    if (!store) {
        throw new ErrorResponse(404, "Store not found.");
    }

    const update_response = await store.update(req.body);

    res.status(200).json({
        success: true,
        data: {
            role: update_response,
        },
    });
});

const DELETE_STORE = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Store']
          #swagger.description = 'Delete store by id' */

    /*	#swagger.parameters['obj'] = {
              in: 'path',
              description: 'The Store ID.',
              required: true,
              name: 'store_id'
      } */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const { store_id } = req.params;
    await DB.STORE.destroy({
        where: { id: store_id }
    });


    res.status(200).json({ success: true });
});

module.exports = {
    ADD_STORE,
    GET_ONE_STORE,
    GET_ALL_STORES,
    UPDATE_STORE,
    DELETE_STORE
};
