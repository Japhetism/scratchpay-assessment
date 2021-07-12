const DentalClinics = require('../fixtures/dentalClinics');
const VetClinics = require('../fixtures/vetClinics');
const Helper = require('../utils/helper');
const ClinicProviders = require('../constants/clinicProviders');

exports.find = async (req) => {
    
    let clinics = Helper.getCache('clinics');
    
    if (!clinics) {
        
        const vetClinics = await VetClinics.getVetClinics();
        const dentalClinics = await DentalClinics.getDentalClinics();

        clinics = [...Helper.serializeClinics(dentalClinics, ClinicProviders.DENTAL_CLINIC), ...Helper.serializeClinics(vetClinics, ClinicProviders.VET_CLINIC)];

        Helper.setCache('clinics', clinics);
    }

    return Helper.filterBy(clinics, req);

}