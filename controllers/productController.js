const HttpError = require('../interface/httpError');
const Product = require('../models/product');
const { DATA_NOT_FOUND_CODE, GENERAL_ERROR_CODE } = require('../constant/errorCode');
const { BAD_REQUEST, ERROR_SERVER } = require('../constant/errorHttp');
const { DATA_NOT_FOUND_MESSAGE, GENERAL_ERROR_MESSAGE } = require('../constant/errorMessage');
const { number, generalMessage } = require('../constant/app');


const byId = async (req, res, next) => {
    const id = req.params.pid;
    try {
        const dataProduct = await Product.findById(id);
        req.data = dataProduct;
        next();
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, ERROR_SERVER);
        return next(err)
    }

}

const all = async (req, res, next) => {
    try {
        let { skip = 0, limit = 10} = req.query;
        let data = await Product
        .find()
        .skip(parseInt(skip))
        .limit(parseInt(limit));
        if (data && data.length === number.ZERO) {
            const error = new HttpError(DATA_NOT_FOUND_MESSAGE, DATA_NOT_FOUND_CODE, BAD_REQUEST);
            return next(error);
        }
        req.data = data;
        next();
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, ERROR_SERVER);
        return next(err)
    }
}

const create = async (req, res, next) => {
    const { name, description, price, image_url } = req.body;
    try {
        const payloadProduct = new Product({ name, description, price, image_url })
        const data = await payloadProduct.save();
        req.data = data;
        next();
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER)
        return next(err);
    }
}

async function update(req, res, next) {
    const id = req.params.pid;
    const { name, description, price, image_url } = req.body;
    try {
        let data = await Product.findByIdAndUpdate(id, { name, description, price, image_url }, {
            new: true
        });
        req.data = data;
        next();
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER);
        return next(err);
    }
}

const destroy = async (req, res, next) => {
    const productId = req.params.pid;
    try {
        await Product.findByIdAndRemove(productId);
        req.data = true;
        next();
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER)
        return next(err)
    }
}

module.exports = {
    byId,
    all,
    create,
    update,
    destroy
}