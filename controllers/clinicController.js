const Clinics = require('../utils/clinics');
const Helper = require('../utils/helper');

exports.getClinics = async (req, res, next) => {
    
    try {
        res.status(process.env.HTTP_OK_STATUS_CODE).json({
            status: process.env.SUCCESS_STATUS,
            data: Helper.paginate(await Clinics.find(), req)
        })
    } catch (error) {
        next(error);
    }
}