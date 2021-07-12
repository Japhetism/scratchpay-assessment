const { response } = require("express");

// Express automatically knows that this entire function is an error handling middleware by specifiying 4 parameters
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || process.env.HTTP_INTERNAL_SERVER_ERROR_STATUS_CODE;
    err.status = err.status || process.env.ERROR_STATUS;
    responseData = err.data || null;

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        responseData,
        responseCode: process.env.ERROR_RESPONSE_CODE
    })
}