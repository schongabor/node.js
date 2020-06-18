const EventEmitter = require("events");

var url = "http://mylogger.io/log";

class Logger extends EventEmitter {

    log(message) {
        //Send an HTTP request
        console.log(message);
    
        //Raise an event - it will iterate through all the registered events and calls them synchronously
        this.emit("messageLogged", {
            id: 1,
            url: "http://..."
        });
    }
}

module.exports = Logger;
 