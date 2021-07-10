const DentalClinics = require('../fixtures/dentalClinics');
const VetClinics = require('../fixtures/vetClinics');
const Helper = require('../utils/helper');

exports.find = async (req) => {
    const vetClinics = await VetClinics.getVetClinics();
    const dentalClinics = await DentalClinics.getDentalClinics();

    const clinics = Helper.filterBy([...dentalClinics, ...vetClinics], req);
    
    return clinics;
}