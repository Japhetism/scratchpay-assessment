const DentalClinics = require('../fixtures/dentalClinics');
const VetClinics = require('../fixtures/vetClinics');

exports.find = async () => {

    const vetClinics = await VetClinics.getVetClinics();
    const dentalClinics = await DentalClinics.getDentalClinics();

    const clinics = [...dentalClinics, ...vetClinics];

    return clinics;
}