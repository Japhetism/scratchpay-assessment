const { calculateLimitAndOffset, paginate } = require('paginate-info');

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
    doc = doc.filter(function(item) {
        for (let key in filters) {
            if (item[key] != filters[key]) {
               return false;
            }
            return true
        }
    })
    return this.paginate(doc, req)
}