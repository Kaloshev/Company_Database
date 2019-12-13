errHandler = (err, req, res, next) => {
    var errorObj = {
        status: err.status,
        error: {
            message: err.message
        }
    };
    res.status(err.status).json(errorObj);
};

module.exports = {
    errHandler
}