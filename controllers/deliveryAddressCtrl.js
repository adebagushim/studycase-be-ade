const HttpError = require('../interface/httpError');
const DeliveryAddress = require("../models/deliveryAddress");
const { DATA_NOT_FOUND_CODE, GENERAL_ERROR_CODE } = require('../constant/errorCode');
const { BAD_REQUEST, ERROR_SERVER } = require('../constant/errorHttp');
const { DATA_NOT_FOUND_MESSAGE, GENERAL_ERROR_MESSAGE } = require('../constant/errorMessage');
const { number, generalMessage } = require('../constant/app');
const User = require('../models/user');


const byId = async (req, res, next) => {
    const id = req.params.pid;
    try {
        const address = await DeliveryAddress.findById(id);
        req.data = address;
        next();
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, ERROR_SERVER);
        return next(err)
    }

}

const all = async (req, res, next) => {
    try {
        const data = await DeliveryAddress.find().populate('user');
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
    try {
        let payload = req.body;
        if(payload.user){
            let user = 
            await User
            .findOne({name: {$regex: payload.user, $options: 'i'}});
            if(user){
                payload = {...payload, user: user._id};
            } else {
                delete payload.user;
            }
        }
        let address = new DeliveryAddress({...payload});
        const data = await address.save();
        req.data = data;
        next();
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER)
        return next(err);
    }
}

const update = async (req, res, next) => {
    const id = req.params.pid;
    const payload = req.body;
    try {
        let data = await DeliveryAddress.findByIdAndUpdate(id, {...payload}, {
            new: true
        });
        req.data = data;
        next();
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER)
        return next(err)
    }

}

const destroy = async (req, res, next) => {
    const Id = req.params.pid;
    try {
        await DeliveryAddress.findByIdAndRemove(Id);
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