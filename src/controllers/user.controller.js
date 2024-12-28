const ExpressAsyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/error_response");
const DB = require("../models");
const bcryptjs = require("bcryptjs");

const CREATE_USER = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['User']
        #swagger.description = 'Endpoint to register a new user' */

    /*	#swagger.parameters['obj'] = {
              in: 'body',
              description: 'User information.',
              required: true,
              schema: { 
                      username: "string",
                      email_address: "string",
                      password:"string",
                      role_id:1
               }
      } */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const { username, email_address, password, role_id } = req.body;

    if (!username || !email_address || !password || !role_id) {
        throw new ErrorResponse(400, "All fields are required")
    }

    const email_exist = await DB.USER.findOne({
        where: { email_address },
    });

    if (email_exist) {
        throw new ErrorResponse(400, "Email has been used");
    }

    const username_exist = await DB.USER.findOne({
        where: { username },
    });

    if (username_exist) {
        throw new ErrorResponse(400, "Username has been used");
    }

    const hashed_password = await bcryptjs.hash(password, 10);

    const user = await DB.USER.create({
        username,
        email_address,
        password: hashed_password
    });

    res.status(201).json({
        success: true,
        data: { user }
    })
})

const GET_ONE_USER = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['User']
        #swagger.description = 'Get one user by uuid' */

    /*	#swagger.parameters['obj'] = {
              in: 'path',
              description: 'The User UUID.',
              required: true,
              name: 'user_uuid'
      } */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const { user_uuid } = req.params;

    const user = await DB.USER.findOne({
        where: { uuid: user_uuid },
        include: [
            { model: DB.USER_ADDRESS },
            { model: DB.ROLE, attributes: ["name"] },
        ]
    });

    if (!user) throw new ErrorResponse(404, "User not found");

    res.status(200).json({ success: true, data: { user } });
});

const GET_USERS = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['User']
        #swagger.description = 'Get multiple users' */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const user = await DB.USER.findAll();

    res.status(200).json({ success: true, data: { user } });
});

const UPDATE_USER = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['User']
        #swagger.description = 'Update user' */

    /*	#swagger.parameters['obj'] = 
              {
              in: 'body',
              description: 'User information.',
              required: true,
              schema: { 
                      username: "string",
                      first_name: "string",
                      last_name: "string",
                      phone_number: "string"
               }}
      } */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const { user_uuid } = req.params;
    const { username, first_name, last_name, phone_number } = req.body;

    const user = await DB.USER.findOne({
        where: { uuid: user_uuid },
    });

    if (!user) {
        throw new ErrorResponse(404, "Unable to update user");
    }

    await user.update({ first_name, last_name, username, phone_number });

    res.status(200).json({ success: true });

});

const DELETE_USER = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['User']
        #swagger.description = 'Delete one user by uuid' */

    /*	#swagger.parameters['obj'] = {
              in: 'path',
              description: 'The User UUID.',
              required: true,
              name: 'user_uuid'
      } */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const { user_uuid } = req.params;

    await DB.USER.destroy({ where: { uuid: user_uuid } });

    res.status(200).json({ success: true })
})

module.exports = {
    CREATE_USER,
    GET_ONE_USER,
    GET_USERS,
    UPDATE_USER,
    DELETE_USER,
}