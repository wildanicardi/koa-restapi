const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LoggingShema = new Schema({
    path:String,
    method:String,
    ttl:String,
    response:Number
},{ timestamps: true });
const Logging = mongoose.model("logging",LoggingShema);

module.exports = Logging
