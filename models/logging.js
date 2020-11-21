const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LoggingShema = new Schema({
    path:String,
    method:String,
    ttl:String,
    response:Number
});
const Logging = mongoose.model("logging",LoggingShema);

module.exports = Logging
