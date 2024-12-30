const ExpressAsyncHandler = require("express-async-handler");
const DB = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET, AUTH_TOKEN_SECRET } = require("../config/token.config");
const MAILER = require("../utils/mailer.utils");
const ErrorResponse = require("../utils/error_response");
const { default: axios } = require("axios");
const generateSocialUsername = require("../helper/generate_social_username.helper");

const NATIVE_LOGIN = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Authentication']
       #swagger.description = 'Login.' */

    /*	#swagger.parameters['obj'] = 
     
              {
              in: 'body',
              description: 'Login information.',
              required: true,
              schema: { 
                      username_OR_email_address: "string",
                      password: "string"
               }}
       */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const { username_OR_email_address, password } = req.body;

    if (!username_OR_email_address || !password) {
        throw new ErrorResponse(400, "Either username or email and Password is required.")
    }

    let user;

    const is_email = username_OR_email_address.includes("@");

    if (is_email) {
        user = await DB.USER.findOne({
            where: { email_address: username_OR_email_address },
        });
    } else {
        user = await DB.USER.findOne({
            where: { username: username_OR_email_address },
        });
    }

    if (!user) {
        throw new ErrorResponse("Invalid credentials.");
    }

    if (user && (await bcryptjs.compare(password, user.password))) {
        const access_token = jwt.sign(
            {
                user: {
                    user_uuid: user.uuid,
                    role_id: user.role_id,
                },
            },
            ACCESS_TOKEN_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user,
            },
            token: access_token,
        });
        return;
    } else {
        res
            .status(401)
            .json({ success: false, message: "Email or password is not valid" });
        return;
    }

})

const GOOGLE_LOGIN = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Authentication']
       #swagger.description = 'Google Login.' */

    /*	#swagger.parameters['obj'] = 
              {
              in: 'body',
              description: 'Google access token.',
              required: true,
              schema: { 
                      google_access_token: "string",
               }}
       */

    /* #swagger.security = [{
              "apiKeyAuth": []
      }] */

    const { google_access_token } = req.body;

    if (!google_access_token) {
        throw new ErrorResponse(400, "Field is required.")
    }

    const google_user_info = await axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${google_access_token}`, {
            headers: {
                Authorization: `Bearer ${google_access_token}`,
                Accept: 'application/json'
            }
        })

    const social_login = await DB.SOCIAL_LOGIN.findOne({
        where: {
            provider_name: "google",
            provider_id: google_user_info.data.id
        }
    })

    let new_social_user;
    let account_with_email_in_db;
    if (!social_login) {
        const account_with_email_exist = await DB.USER.findOne({
            where: { email_address: google_user_info.data.email }
        })
        account_with_email_in_db = account_with_email_exist;
        if (!account_with_email_exist) {
            const unique_username = await generateSocialUsername(google_user_info.data.name);

            new_social_user = await DB.USER.create({
                email_address: google_user_info.data.email,
                email_verified: true,
                first_name: google_user_info.data.given_name,
                last_name: google_user_info.data.family_name || null,
                username: unique_username,
                password: "social_login",
                role_id: 1
            });

            await DB.SOCIAL_LOGIN.create({
                provider_name: "google",
                provider_id: google_user_info.data.id,
                user_id: new_social_user.id
            });

            const mail_options = {
                to_email: google_user_info.data.email,
                context: {
                    name: google_user_info.data.name
                },
                email_subject: "Thank you for choosing Little Lady",
                template_name: "registration_successful.hbs",
                mail_from: ""
            }
            MAILER.send(mail_options)
        } else {
            await account_with_email_exist.update({
                email_verified: true
            })
            await DB.SOCIAL_LOGIN.create({
                provider_name: "google",
                provider_id: google_user_info.data.id,
                user_id: account_with_email_exist.id
            });
        }
    }


    let social_user;

    if (new_social_user) {
        social_user = new_social_user;
    } else if (account_with_email_in_db) {
        social_user = await DB.USER.findByPk(account_with_email_in_db.id)
    } else {
        social_user = await DB.USER.findByPk(social_login.user_id);
    }


    if (!social_user) {
        throw new ErrorResponse(400, "Invalid request");
    }

    const access_token = jwt.sign(
        {
            user: {
                user_uuid: social_user.uuid,
                role_id: social_user.role_id,
            },
        },
        ACCESS_TOKEN_SECRET,
        { expiresIn: "7d" }
    );

    res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
            user: social_user,
        },
        token: access_token,
    });


})

const SEND_VERIRICATION_EMAIL = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Authentication']
        #swagger.description = 'Send email verification link to user.' */

    /*	#swagger.parameters['obj'] = 
       
                {
                in: 'body',
                description: 'Email verification link.',
                required: true,
                schema: { 
                        email_address: "string",
                 }}
         */

    const { email_address } = req.body;

    if (!email_address) {
        throw new ErrorResponse(400, "All fields are mandatory.");
    }

    const user = await DB.USER.findOne({ where: { email_address } });
    if (!user) {
        return res.status(200).json({ success: true });
    }

    if (user.email_verified) {
        return res.status(200).json({ success: true, message: "email already verified" });
    }

    const token = jwt.sign(
        { uuid: user.uuid },
        AUTH_TOKEN_SECRET,
        { expiresIn: "10m" }
    );

    const link = `${process.env.FRONTEND_BASEURL}/auth/verify-email/${token}`;

    const mail_options = {
        to_email: user.email_address,
        context: {
            link,
            name: user.first_name
        },
        email_subject: "Little Lady Email Verification",
        template_name: "email_verification.hbs",
        mail_from: ""
    }

    await MAILER.send(mail_options);

    res.status(200).json({ success: true });

})

const VERIFY_EMAIL = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Authentication']
          #swagger.description = 'Confirm User's email address.' */

    /*	#swagger.parameters['obj'] = 
       
                {
                in: 'body',
                description: 'Confirm email token.',
                required: true,
                schema: { 
                        token: "string",
                 }}
         */

    const { token } = req.body;

    const token_data = jwt.verify(token, AUTH_TOKEN_SECRET);

    const user = await DB.USER.findOne({ where: { uuid: token_data.uuid } })

    if (!user) {
        throw new ErrorResponse(400, "Invalid request");
    }

    await user.update({
        email_verified: true
    })

    res.status(200).json({ success: true });

})

const SEND_FORGOT_PASSWORD_EMAIL = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Authentication']
        #swagger.description = 'Send forgot password link to user.' */

    /*	#swagger.parameters['obj'] = 
       
                {
                in: 'body',
                description: 'Forgot Password Email verification link.',
                required: true,
                schema: { 
                        email_address: "string",
                 }}
         */

    const { email_address } = req.body;

    if (!email_address) {
        throw new ErrorResponse(400, "All fields are mandatory.");
    }

    const user = await DB.USER.findOne({ where: { email_address } });
    if (!user) {
        return res.status(200).json({ success: true });
    }

    const token = jwt.sign(
        { uuid: user.uuid },
        AUTH_TOKEN_SECRET,
        { expiresIn: "10m" }
    );

    const link = `${process.env.FRONTEND_BASEURL}/auth/forgot-password/${token}`;

    const mail_options = {
        to_email: user.email_address,
        context: {
            link,
            name: user.first_name
        },
        email_subject: "Password Reset - Little Lady",
        template_name: "forgot_password.hbs",
        mail_from: ""
    }

    await MAILER.send(mail_options);

    res.status(200).json({ success: true });

})

const FORGOT_PASSWORD = ExpressAsyncHandler(async (req, res) => {
    /* 	#swagger.tags = ['Authentication']
          #swagger.description = 'Forgot Password.' */

    /*	#swagger.parameters['obj'] = 
        {
        in: 'body',
        description: 'Forgot Password.',
        required: true,
        schema: { 
                token: "string",
                password: "string",
            }}
    */

    const { token, password } = req.body;

    if (!token || !password) {
        throw new ErrorResponse(400, "All fields are mandatory")
    }

    const token_data = jwt.verify(token, AUTH_TOKEN_SECRET);

    const user = await DB.USER.findOne({ where: { uuid: token_data.uuid } })

    if (!user) {
        throw new ErrorResponse(400, "Invalid request");
    }

    const hashed_password = await bcryptjs.hash(password, 10);

    await user.update({
        password: hashed_password
    })

    res.status(200).json({ success: true });


});

module.exports = {
    NATIVE_LOGIN,
    SEND_VERIRICATION_EMAIL,
    VERIFY_EMAIL,
    SEND_FORGOT_PASSWORD_EMAIL,
    FORGOT_PASSWORD,
    GOOGLE_LOGIN,
}