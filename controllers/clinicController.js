const Clinics = require('../utils/clinics');
const Validator = require('../utils/validator');
const AppError = require('../utils/appError');

// Clinic controller for get clinics route
exports.getClinics = async (req, res, next) => {
    
    const validation = Validator.validateClinicQueryParams(req);
    
    if (validation.error) {
        const error = validation.error ? validation.error.details[0].message : null;
        const err = new AppError(process.env.HTTP_BAD_REQUEST_STATUS_CODE, process.env.ERROR_STATUS, error);
        return next(err)
    }

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