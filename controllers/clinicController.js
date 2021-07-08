const DentalClinics = require('../fixtures/dentalClinics');
const VetClinics = require('../fixtures/vetClinics');

exports.getClinics = async (req, res, next) => {
    
    const vetClinics = await VetClinics.getVetClinics();
    const dentalClinics = await DentalClinics.getDentalClinics();

    try {
        res.status(process.env.HTTP_OK_STATUS_CODE).json({
            status: process.env.SUCCESS_STATUS,
            data: dentalClinics
        })
    } catch (error) {
        next(error);
    }
}