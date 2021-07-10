const Clinics = require('../utils/clinics');

exports.getClinics = async (req, res, next) => {
    try {
        res.status(process.env.HTTP_OK_STATUS_CODE).json({
            status: process.env.SUCCESS_STATUS,
            responseData: await Clinics.find(req),
            message: process.env.SUCCESS_MESSAGE,
            responseCode: process.env.SUCCESS_RESPONSE_CODE
        })
    } catch (error) {
        next(error);
    }
}