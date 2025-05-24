const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const {ACCESS_TOKEN_SECRET} = require("../config/token.config");

const VALIDATE_TOKEN = expressAsyncHandler(async (req, res, next) => {
    console.log("Print i got here")
    let token;
    let auth_header = req.headers.authorization || req.headers.Authorization;
    if(auth_header && auth_header.startsWith("Bearer")){
        token = auth_header.split(" ")[1];

        console.log("Token extracted:", token);

        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded)=>{
            if(err){
                res.status(401).json({success:false,message:"Unauthorized request"});
                return;
            }
            req.user = decoded.user;
            next();
        });
    }
    if(!token){
        res.status(401).json({success:false, message:"Authorization error"});
        return;
    }
});

module.exports = VALIDATE_TOKEN;