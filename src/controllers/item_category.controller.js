const ExpressAsyncHandler = require("express-async-handler");
const DB = require("../models");
const ErrorResponse = require("../utils/error_response");

const ADD_ITEM_CATEGORY = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Item Category']
          #swagger.description = 'Add Category' */

    /*	#swagger.parameters['obj'] = {
              in: 'body',
              description: 'Category name.',
              required: true,
              schema: { 
                      name: "string",
               }
      } */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const { name } = req.body;


    await DB.ITEM_CATEGORY.create({
        name,
    });

    res.status(201).json({
        success: true,
        message: "Category added successfully.",
    });
});

const GET_ALL_ITEM_CATEGORY = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Item Category']
          #swagger.description = 'Get all categories' */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const categories = await DB.ITEM_CATEGORY.findAll();

    res.status(200).json({ success: true, data: { categories } });
});

const UPDATE_ITEM_CATEGORY = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Item Category']
          #swagger.description = 'Update item category name.' */

    /*	#swagger.parameters['obj'] = 
     
              {
              in: 'body',
              description: 'Item Category name.',
              required: true,
              schema: { 
                      name: "string",
               }}
       */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const { item_category_id } = req.params;
    const { name } = req.body;
    const category = await DB.ITEM_CATEGORY.findByPk(item_category_id);

    if (!category) {
        throw new ErrorResponse(404, "Category not found.");
    }

    await category.update({ name });

    res.status(200).json({
        success: true,
        message:"Category updated successfully",
    });
});

const DELETE_ITEM_CATEGORY = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Item Category']
          #swagger.description = 'Delete category by id' */

    /*	#swagger.parameters['obj'] = {
              in: 'path',
              description: 'The category ID.',
              required: true,
              name: 'item_category_id'
      } */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const { item_category_id } = req.params;
    await DB.ITEM_CATEGORY.destroy({
        where: { id: item_category_id }
    });


    res.status(200).json({ success: true });
});

module.exports = {
    ADD_ITEM_CATEGORY,
    GET_ALL_ITEM_CATEGORY,
    UPDATE_ITEM_CATEGORY,
    DELETE_ITEM_CATEGORY
};
