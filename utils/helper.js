const { calculateLimitAndOffset, paginate } = require('paginate-info');

exports.paginate = (doc, req) => {
    const { query: { currentPage, pageSize } } = req;
    const { limit, offset } = calculateLimitAndOffset(currentPage, pageSize ? pageSize : process.env.DEFAULT_PAGE_SIZE);
    const count = doc.length;
    const paginatedData = doc.slice(offset, offset + limit);
    const paginationInfo = paginate(currentPage, count, paginatedData, limit);
    return {
        responseData: paginatedData,
        metaData: paginationInfo
    }
}