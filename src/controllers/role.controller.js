const ExpressAsyncHandler = require("express-async-handler");
const DB = require("../models");
const ErrorResponse = require("../utils/error_response");

const CREATE_ROLE = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Role']
          #swagger.description = 'Create role' */

    /*	#swagger.parameters['obj'] = {
              in: 'body',
              description: 'Role name.',
              required: true,
              schema: { 
                      name: "string",
               }
      } */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const { name } = req.body;

    const role_exist = await DB.ROLE.findOne({
        where:{name}
    })

    if(role_exist){
        throw new ErrorResponse(400, "Role already exist");
    }

    const role = await DB.ROLE.create({
        name:name.toLowerCase(),
    });

    res.status(201).json({
        success: true,
        message: "Role created successfully.",
        data: {
            role,
        },
    });
});

const GET_ONE_ROLE = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Role']
          #swagger.description = 'Get one role by id' */

    /*	#swagger.parameters['obj'] = {
              in: 'path',
              description: 'The Role ID.',
              required: true,
              name: 'role_id'
      } */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const { role_id } = req.params;
    const role = await DB.ROLE.findByPk(role_id);
    if (!role) {
        throw new ErrorResponse(404, "Role not found.");
    }
    res.status(200).json({ success: true, data: { role } });
});

const GET_ALL_ROLES = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Role']
          #swagger.description = 'Get all roles' */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const roles = await DB.ROLE.findAll();

    res.status(200).json({ success: true, data: { roles } });
});

const UPDATE_ROLE = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Role']
          #swagger.description = 'Update role name.' */

    /*	#swagger.parameters['obj'] = 
     
              {
              in: 'body',
              description: 'Role name.',
              required: true,
              schema: { 
                      name: "string",
               }}
       */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const { role_id } = req.params;
    const { name } = req.body;
    const role = await DB.ROLE.findByPk(role_id);

    if (!role) {
        throw new ErrorResponse(404, "Role not found.");
    }

    const update_response = await role.update({ name });

    res.status(200).json({
        success: true,
        data: {
            role: update_response,
        },
    });
});

const DELETE_ROLE = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Role']
          #swagger.description = 'Delete role by id' */

    /*	#swagger.parameters['obj'] = {
              in: 'path',
              description: 'The Role ID.',
              required: true,
              name: 'role_id'
      } */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const { role_id } = req.params;
    await DB.ROLE.destroy({
        where: { id: role_id }
    });


    res.status(200).json({ success: true });
});

module.exports = {
    CREATE_ROLE,
    GET_ONE_ROLE,
    GET_ALL_ROLES,
    UPDATE_ROLE,
    DELETE_ROLE
};
