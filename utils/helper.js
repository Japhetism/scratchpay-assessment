const { calculateLimitAndOffset, paginate } = require('paginate-info');
const States = require('../fixtures/states');

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

exports.filterBy = (doc, req) => {
    const {query: { name, state } } = req;
    const filters = {name, stateName: state}
    console.log(filters)
    doc = doc.filter(function(item) {
        for (let key in filters) {
            // if (item[key] != filters[key]) {
            //    return false;
            // }
            return true
        }
    })
    return this.paginate(doc, req)
}

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

exports.getStateName = (stateCode) => {
    if(stateCode) {
        return States.getStates().filter(state => state.code === stateCode)[0].name;
    }
}

exports.getStateCode = (stateName) => {
    if(stateName) {
        return States.getStates().filter(state => state.name === stateName)[0].code;
    }
}