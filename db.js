const mongoose=require("mongoose");
const dotenv = require('dotenv')

const connection =mongoose.connect(process.env.mongoDB);

module.exports={connection}