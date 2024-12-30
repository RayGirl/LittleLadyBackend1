const DB = require("../models");

async function generateSocialUsername(name){

    let username;
    do{
    let clean_name = name.toLowerCase().replace(/ /g, "_");
    let random_int = Math.random().toString(36).substring(2, 7).toLowerCase();
    username=`${clean_name}_${random_int}`;
    } while (await DB.USER.findOne({where:{username}}));
    return username
}

module.exports = generateSocialUsername;