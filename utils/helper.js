const { calculateLimitAndOffset, paginate } = require('paginate-info');
const States = require('../fixtures/states');
const StateConstant = require('../constants/state');
const NodeCache = require( "node-cache" );
const myCache = new NodeCache( { stdTTL: process.env.CACHE_TTL } );

// Paginate the clinics payload with default page size of 10
exports.paginate = (doc, req) => {
    const { query: { currentPage, pageSize } } = req;
    const { limit, offset } = calculateLimitAndOffset(currentPage, pageSize ? pageSize : process.env.DEFAULT_PAGE_SIZE);
    const count = doc.length;
    const paginatedData = doc.slice(offset, offset + limit);
    const paginationInfo = paginate(currentPage, count, paginatedData, limit);
    return {
        ...paginationInfo,
        items: paginatedData
    }
}

// Filter the clinics based on the query params
exports.filterBy = (doc, req) => {
    const {query: { name, state, availabilityFrom, availabilityTo } } = req;
    const filteredDoc = doc
        .filter(item => name ? item.name.toLowerCase() === name.toLowerCase() : item)
        .filter(item => state && state.length > StateConstant.STATE_CODE_LENGTH ? item.state.toLowerCase() === state.toLowerCase() : item)
        .filter(item => state && state.length == StateConstant.STATE_CODE_LENGTH ? item.stateCode.toLowerCase() === state.toLowerCase() : item)
        .filter(item => availabilityFrom ? item.availability.from >= availabilityFrom : item)
        .filter(item => availabilityFrom && availabilityTo ? item.availability.from >= availabilityFrom && item.availability.to <= availabilityTo : item)
    
        return this.paginate(filteredDoc, req)
}

// Serialize the default clinic payload to a uniform payload
exports.serializeClinics = (doc, clinicProvider) => {
    return doc.map(item => { 
        
        return {
            provider: clinicProvider,
            name: item.name || item.clinicName,
            state: item.stateName || this.getStateName(item.stateCode),
            stateCode: this.getStateCode(item.stateName) || item.stateCode,
            availability: item.availability || item.opening
        } 
    })
}

// Get state name for a given state code
exports.getStateName = (stateCode) => {
    if(stateCode) {
        return States.getStates().filter(state => state.code === stateCode)[0].name;
    }
}

// Get state code for a given state name
exports.getStateCode = (stateName) => {
    if(stateName) {
        return States.getStates().filter(state => state.name === stateName)[0].code;
    }
}

// Cache payload to increase response time
exports.setCache = (type, doc) => {
    return success = myCache.set(type, doc);
}

// Retrieve the cached payload
exports.getCache = (type) => {
    return value = myCache.get(type);
}