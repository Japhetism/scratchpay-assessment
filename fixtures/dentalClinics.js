const fetch = require('node-fetch');

// Get dental clinics from dental clinics 
exports.getDentalClinics = async () => {
    
    const url = process.env.DENTAL_CLINICS_URL;
    const method = { method: "Get" };
    
    const dentalClinics = await fetch(url, method)
    .then(res => res.json())
    .then((json) => {
        return json
    })

    return dentalClinics;

}