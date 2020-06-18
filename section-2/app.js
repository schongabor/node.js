const Logger = require("./logger");
const path = require("path");
const os = require("os");
const fs = require("fs");

//path module 

var pathObj = path.parse(__filename);
console.log(pathObj);

//OS module

var totalMemory = os.totalmem();
var freeMemory = os.freemem();
var osPlatform = os.platform();
var osHostname = os.hostname();
var osUptime = os.uptime();
var osUserInfo = os.userInfo();

console.log("There is " + freeMemory + " memory free from " + totalMemory)

//using template string (ES6 feature)

console.log(`Total Memory: ${totalMemory}`);
console.log(`Platform: ${osPlatform}`);
console.log(`Host name: ${osHostname}`);
console.log(`Uptime: ${osUptime}`);
console.log(`User info: ${osUserInfo}`);

//filesystem module

//sync method is not recommanded:
const filesInDir = fs.readdirSync("./");
console.log(`Files in the directory: ${filesInDir}`);

//async method:

fs.readdir("./", (err, results) => {
    if (err) console.log("Error: ", err);
    else console.log("Result(s): ", results);
});

//events module
const logger = new Logger();

//Register a listener - it should be always before the emit
logger.on("messageLogged", (eventArguments) => {
    console.log("Listener called, event arguments are: ");
    console.log(eventArguments)
});

logger.log("message");

//HTTP module