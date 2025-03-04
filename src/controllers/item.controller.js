const ExpressAsyncHandler = require("express-async-handler");
const DB = require("../models");
const ErrorResponse = require("../utils/error_response");
const { default: slugify } = require("slugify");
const { getPagingData, getPagination } = require("../helper/paginate");

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
                    price: "0.0",
                    in_stock: false,
                    max_age: "1",
                    min_age: '1',
                    total_in_stock: "0",
                    pick_up_available: true,
                    price_filter: "low | high",
                    ready_in:"0",
                    store_id: "0",
                    category_id: "0"
               }
      } */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const user_id = req.user.id;
    const { title, description, max_age, min_age, price, in_stock, total_in_stock, pick_up_available, price_filter, ready_in, store_id, category_id } = req.body;

    if (!title || !description || !max_age || !min_age || !price || !in_stock || !total_in_stock || !pick_up_available || !ready_in || !price_filter || !store_id || !category_id || !user_id) {
        throw new ErrorResponse(400, "All fields are mandatory")
    }

    let slug;

    slug = slugify(title);
    
    const title_exist = await DB.ITEM.findOne({
        where:{slug}
    })

    if(title_exist){
        slug += "-"+ crypto.randomUUID().split("-")[0]
    }

    const item = await DB.ITEM.create({
        title, slug, max_age, min_age, description, price, in_stock, total_in_stock, pick_up_available, ready_in, price_filter, user_id, store_id, category_id
    });

    res.status(201).json({
        success: true,
        message: "Item added successfully",
        data:{
            item_id: item.id
        }
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
    const item = await DB.ITEM.findByPk(item_id, {
        include: {
            model: DB.ITEM_IMAGE,
        }
    });
    if (!item) {
        throw new ErrorResponse(404, "Item not found.");
    }
    res.status(200).json({ success: true, data: { item } });
});

const GET_ITEMS = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Item']
          #swagger.description = 'Get all items' */


    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const { slug, page, size, user_id, category_id, price_filter, in_stock} = req.query;
    if(slug){
        const item = await DB.ITEM.findOne({
            where:{slug},
            include:{
                model: DB.ITEM_IMAGE,
                separate: true,
                order: [["createdAt", "DESC"]]
            }
        })

        return res.status(200).json({success: true, data:{item}});
    }

    const {limit, offset} = getPagination(page, size);

    const where = {is_archived: false};
    const allowed_keys = ["user_id", "category_id", "in_stock"];

    for(const key of Object.keys(req.query)){
        if(allowed_keys.includes(key)){
            where[key] = req.query[key];
        }
    }

    if(req.query.is_archived){
        if(req.query.is_archived === "show_all"){
            delete where.is_archived
        }else{
            where.is_archived = req.query.is_archived
        }
    }

    let order = [["createdAt", "DESC"]]

    if(req.query.price_filter){
        order = [["price", req.query.price_filter.toLowerCase() === "asc" ? "ASC" : "DESC"]]
    }

    const items = await DB.ITEM.findAndCountAll({
        limit,
        offset,
        where,
        order,
        include: [{
            model: DB.ITEM_IMAGE,
            limit: 1,
            // separate: true,
            order: [["createdAt", "DESC"]]
        },
        {
            model: DB.ITEM_CATEGORY,
            attributes: ["name"]
        }]
    });

    const items_res = getPagingData(items, page, limit);
    const {total_items, data, total_pages, current_page} = items_res;

    res.status(200).json({ success: true, data: { items: data, total_items, total_pages, current_page } });
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
                    price: "0.0",
                    in_stock: false,
                    max_age: "1",
                    min_age: '1',
                    total_in_stock: "0",
                    pick_up_available: true,
                    price_filter: "low | high",
                    ready_in:"0",
                    store_id: "0",
                    category_id: "0"
               }}
       */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const { item_slug } = req.params;
    const item = await DB.ITEM.findOne({where:{slug:item_slug}});

    if (!item) {
        throw new ErrorResponse(404, "Item not found.");
    }

    await item.update(req.body);

    res.status(200).json({
        success: true,
        message: "Update successful"
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
    DELETE_ITEM,
};
