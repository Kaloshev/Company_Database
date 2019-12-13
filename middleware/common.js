logger = (req, res, next) => {
    console.log(`Logged ${req.url} - ${req.method} --- ${new Date()}`);
    next();
};

wrongRoute = (req, res, next) => {
    var error = new Error("Not found. Please try with another route!");
    error.status = 404;
    next(error);
};

module.exports = {
    logger,
    wrongRoute,
}