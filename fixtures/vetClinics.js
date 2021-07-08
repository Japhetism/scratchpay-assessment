const fetch = require('node-fetch');

exports.getVetClinics = () => {
    
    const url = process.env.VET_CLINICS_URL;
    const method = { method: "Get" };
    
    const vetClinics = fetch(url, method)
    .then(res => res.json())
    .then((json) => {
        return json
    })

    return vetClinics;
}