const { Op } = require('sequelize');



function createPaginationObjectMiddleware(defaultSize=20, defaultPage=1){
    return function createPaginationObject(req, res, next){
        let { page, size } = req.query;
        page = !page ? defaultPage : parseInt(page);
        size = !size ? defaultSize : parseInt(size);
        const pagination = {};
        if (page >= 1 && size >= 1) {
            pagination.limit = size;
            pagination.offset = size * (page - 1);
        }
        req.pagination = pagination;
        req.page = page;
        req.size = size
        next();
    }
};

function createWhereObject(req, _res, next) {
    const { minPrice, maxPrice } = req.query;

    const where = {};

    if (maxPrice) where.price = {[Op.lte]: +maxPrice};
    if (minPrice) where.price = {[Op.gte]: +minPrice};
    if (maxPrice && minPrice) where.price ={[Op.between]: [+minPrice, +maxPrice]};

    req.where = where;

    return next();
};

function validateQueries(req, _res, next) {
    let { page, size, maxLat, minLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    const errors = {};

    if (page <= 0) errors.page = "Page must be greater than or equal to 1";
    if (size <= 0) errors.size = "Size must be greater than or equal to 1";
    if (minPrice < 0) errors.minPrice = "Minimum price must be greater than or equal to 0";
    if (maxPrice < 0) errors.maxPrice = "Maximum price must be greater than or equal to 0";


    if ((Object.keys(errors)).length) {
        const err = new Error("Bad Request");
        err.status = 400;
        err.errors = errors
        return next(err)
    }

    return next();
}



module.exports = { validateQueries, createPaginationObjectMiddleware, createWhereObject };