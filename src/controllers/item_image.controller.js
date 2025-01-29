const ExpressAsyncHandler = require("express-async-handler");
const DB = require("../models");
const ErrorResponse = require("../utils/error_response");
const upload = require("../utils/file_upload.utils");
const multer = require("multer");
const { BACKEND_BASEURL } = require("../config/url.config");
const fsp = require("fs/promises");
const path = require("path");

const ADD_ITEM_IMAGE = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Item Image']
          #swagger.description = 'Add Item Images' */

    /*
    #swagger.consumes = ['multipart/form-data']
    #swagger.parameters['item_image'] = {
        in: 'formData',
        type: 'array',
        required:true,
        description:'Item Image upload',
        collectionFormat: 'multi',
        items: {type: 'file'}
    }
     */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const item_id = req.params.item_id;
    const item = await DB.ITEM.findByPk(item_id);
    if (!item) {
        throw new ErrorResponse(404, "Invalid item")
    }
    upload.array("item_image",5)(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ success: false, message: err })
        } else if (err) {
            return res.status(500).json({ success: false, message: err })
        }

        
        const files = req.files;
        
        if(!files){
            return res.status(400).json({success: false, message:"No files uploaded"})
        }
        for (let file of files) {
            try {
                const file_path = BACKEND_BASEURL + "/media/uploads/" + file.filename;
                await DB.ITEM_IMAGE.create({
                    item_id,
                    image_url: file_path,
                })
            } catch (err) {
                for(let file_ of files){
                    await fsp.unlink(file_.path);
                }
                return res.status(500).json({ success: false, message: err });
            }
        }
        res.status(201).json({
            success: true,
            message: "Image(s) added successfully"
        })
    });

});

const DELETE_ITEM_IMAGE = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Item Image']
          #swagger.description = 'Delete item image by id' */

    /*	#swagger.parameters['obj'] = {
              in: 'path',
              description: 'The Item Image ID.',
              required: true,
              name: 'item_image_id'
      } */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const { item_image_id } = req.params;
    const item_image = await DB.ITEM_IMAGE.findByPk(item_image_id);
    if (!item_image) {
        throw new ErrorResponse(404, "Invalid item image")
    }
    const old_file_name = path.basename(item_image.image_url);
    const old_file_path = path.resolve("public/media/uploads/", old_file_name)

    const result = await DB.ITEM_IMAGE.destroy({
        where: { id: item_image_id }
    });

    if (result == 1) {
        try {
            await fsp.unlink(old_file_path);
        } catch (err) {
            return res.status(200).json({ success: true });
        }
    }

    res.status(200).json({ success: true });
});

const UPDATE_ITEM_IMAGE = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Item Image']
          #swagger.description = 'Update Item Image' */

    /*
    #swagger.consumes = ['multipart/form-data']
    #swagger.parameters['item_image'] = {
        in: 'formData',
        type: 'file',
        required:true,
        description:'Item Image update'
    }
     */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const { item_image_id } = req.params;
    const item_image = await DB.ITEM_IMAGE.findByPk(item_image_id);
    if (!item_image) {
        throw new ErrorResponse(404, "Invalid item image")
    }
    upload.single("item_image")(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ success: false, message: err })
        } else if (err) {
            return res.status(500).json({ success: false, message: err })
        }

        const file = req.file;
        const file_path = BACKEND_BASEURL + "/media/uploads/" + file.filename;
        const old_file_name = path.basename(item_image.image_url);
        const old_file_path = path.resolve("public/media/uploads/", old_file_name)
        try {
            await item_image.update({
                image_url: file_path,
            })
        } catch (err) {
            return res.status(500).json({ success: false, message: err });
        }
        try {
            await fsp.unlink(old_file_path);
        } catch (err) {
            return res.status(201).json({
                success: true,
                message: "Image updated successfully"
            })
        }

        res.status(201).json({
            success: true,
            message: "Image updated successfully"
        })
    });

});


module.exports = {
    ADD_ITEM_IMAGE,
    DELETE_ITEM_IMAGE,
    UPDATE_ITEM_IMAGE
};
