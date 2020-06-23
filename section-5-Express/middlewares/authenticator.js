function authenticator(req, res, next) {
    console.log("Authenticating...");
    next() //calls the next middleware
}

module.exports = authenticator;