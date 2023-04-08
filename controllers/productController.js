const HttpError = require('../interface/httpError');
const Product = require('../models/product');
const { DATA_NOT_FOUND_CODE, GENERAL_ERROR_CODE } = require('../constant/errorCode');
const { BAD_REQUEST, ERROR_SERVER } = require('../constant/errorHttp');
const { DATA_NOT_FOUND_MESSAGE, GENERAL_ERROR_MESSAGE } = require('../constant/errorMessage');
const { number, generalMessage } = require('../constant/app');


const create = async (req, res, next) => {

    try {
        const payloadProduct = new Product({
            name: req.body.name,
            image: req.body.image

        })
        const data = await payloadProduct.save();
        req.data = data;
        next();
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER)
        return next(err);
    }
}

module.exports = {
    create
}