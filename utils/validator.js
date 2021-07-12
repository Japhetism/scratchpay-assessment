const Joi = require('joi');

exports.validateClinicQueryParams = (req) => {
    const schema = Joi.object().keys({
        name: Joi.string().alphanum().min(2),
        state: Joi.string().min(2),
        availabilityFrom: Joi.string().pattern(new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')),
        availabilityTo: Joi.string().pattern(new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')),
        currentPage: Joi.number().integer().min(1),
        pageSize: Joi.number().integer().min(1)
    }).with('availabilityTo', ['availabilityFrom']);
    
    const result = schema.validate(req.query)

    return result;
}