const path = require("path");
const fs = require("fs");
const hbs = require("handlebars");
const nodemailer = require("nodemailer");
const { EMAIL_HOST, EMAIL_AUTH_TYPE, EMAIL_PASSWORD, EMAIL_PORT, EMAIL_SECURE, EMAIL_USERNAME } = require("../config/mailer.config");

module.exports = {
    /**
     * @param {Object}
     */
    send: async function({to_email, context, email_subject, template_name, mail_from}){
        const template_path = path.resolve("src/views", template_name);

        const template = fs.readFileSync(template_path, "utf8");
        const compiled_template = hbs.compile(template);
        const html = compiled_template(context);

        const transporter = nodemailer.createTransport({
            host:EMAIL_HOST,
            port: 465,
            secure: true,
            auth:{
                user:EMAIL_USERNAME,
                pass: EMAIL_PASSWORD
            }
        })

        const hbsOptions = {
            viewEngine:{
                extName:".hbs"
            }
        }

        await new Promise((resolve, reject)=>{
            transporter.verify(function(error, success){
                if(error){
                    reject(error);
                }else{
                    console.log("Server is ready to send message");
                    resolve(success);
                }
            })
        });

        const mail_options = {
            from: mail_from ? mail_from : EMAIL_USERNAME,
            to: to_email,
            subject:email_subject,
            html
        }

        await new Promise((resolve, reject)=>{
            transporter.sendMail(mail_options, (error, info)=>{
                if(error){
                    reject(error);
                }else{
                    resolve(info)
                }
            })
        })
    }
}