const DB = require("../models");

async function generateSocialUsername(name){

    let username;
    do{
    let clean_name = name.toLowerCase().replace(/ /g, "_");
    let random_int = Math.floor(Math.random() * 90000) + 100000;
    username=`${clean_name}_${random_int}`;
    } while (await DB.USER.findOne({where:{username}}));
    return username
}

module.exports = generateSocialUsername;