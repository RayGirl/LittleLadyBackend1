const expressAsyncHandler = require("express-async-handler")

function ALLOWED_ROLE (roles) {
    return expressAsyncHandler(async function(req, res, next){
        if(!req.user.role_id || !roles.includes(req.user.role_id)){
            return res.status(403).json({success:false, message:"Access denied."});
        }
        next();
    })
};

module.exports = ALLOWED_ROLE;