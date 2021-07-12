const Joi = require('joi');

exports.validateClinicQueryParams = (req) => {
    const schema = Joi.object().keys({
        name: Joi.string().min(2),
        state: Joi.string().min(2),
        avalabilityFrom: Joi.string(),
        avalabilityTo: Joi.string(),
        currentPage: Joi.number().integer().min(1),
        pageSize: Joi.number().integer().min(1)
    })
    
    const result = schema.validate(req.query)

    return result;
}