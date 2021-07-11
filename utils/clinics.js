const DentalClinics = require('../fixtures/dentalClinics');
const VetClinics = require('../fixtures/vetClinics');
const Helper = require('../utils/helper');
const ClinicProviders = require('../constants/clinicProviders');

exports.find = async (req) => {
    const vetClinics = await VetClinics.getVetClinics();
    const dentalClinics = await DentalClinics.getDentalClinics();

    const clinics = Helper.filterBy([...Helper.serializeClinics(dentalClinics, ClinicProviders.DENTAL_CLINIC), ...Helper.serializeClinics(vetClinics, ClinicProviders.VET_CLINIC)], req);
    
    return clinics;
}