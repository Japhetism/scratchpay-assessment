const Clinics = require('../fixtures/clinics');
const Helper = require('../utils/helper');
const ClinicProviders = require('../constants/clinicProviders');

exports.find = async (req) => {
    
    // Get clinics from cache
    let clinics = Helper.getCache('clinics');
    
    // Get clinics from the two endpoints (dental and vet) if clinics cache does not exist
    if (!clinics) {
        
        const vetClinics = await Clinics.getVetClinics();
        const dentalClinics = await Clinics.getDentalClinics();

        // Serialize clinics (dental and vet) to have the same entities and concatenated them as a single payload 
        clinics = [...Helper.serializeClinics(dentalClinics, ClinicProviders.DENTAL_CLINIC), ...Helper.serializeClinics(vetClinics, ClinicProviders.VET_CLINIC)];

        // Cache clinics
        Helper.setCache('clinics', clinics);
    }

    return Helper.filterBy(clinics, req);

}