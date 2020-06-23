const { func } = require("joi");

 function log(req, res, next) {
     console.log("Logging...");
     next() //calls the next middleware
 }

 module.exports = log;