const Order = require('../models/order');
const OrderItem = require('../models/order-item');
const DeliveryAddress = require("../models/deliveryAddress");
const Cart = require('../models/cart');
const HttpError = require('../interface/httpError');
const { DATA_NOT_FOUND_CODE, GENERAL_ERROR_CODE } = require('../constant/errorCode');
const { BAD_REQUEST, ERROR_SERVER } = require('../constant/errorHttp');
const { DATA_NOT_FOUND_MESSAGE, GENERAL_ERROR_MESSAGE } = require('../constant/errorMessage');
const { Types } = require('mongoose');

const create = async(req, res, next) => {
    try {
        let {delivery_fee, delivery_address} = req.body;
        let items = await Cart.find({user: req.user._id}).populate('product');
        if(!items){
            return res.json({
                error: 1,
                message: 'Theres no item in your cart'
            })
        }
        let address = await DeliveryAddress.findById(delivery_address);
        let order = new Order({
            _id: new Types.ObjectId(),
            status: 'waiting_payment',
            delivery_fee: delivery_fee,
            delivery_address: {
                provinsi: address.provinsi,
                kabupaten: address.kabupaten,
                kecamatan: address.kecamatan,
                kelurahan: address.kelurahan,
                detail: address.detail
            },
            user: req.user._id
        });
        let orderItems = await OrderItem.insertMany(items.map(item => ({
            ...item,
            name: item.product.name,
            qty: parseInt(item.qty),
            price: parseInt(item.product.price),
            order: order._id,
            product: item.product._id
        })));
        orderItems.forEach(item => order.order_items.push(item));
        order.save();
        await Cart.deleteMany({user: req.user._id});
        return res.json(order);
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER)
        return next(err)
    }
}

const index = async(req, res, next) => {
    try {
        let {skip = 0, limit = 10} = req.query;
        let count = await Order.find({user: req.user._id}).countDocuments();
        let orders = await Order
            .find({user: req.user._id})
            .skip(parseInt(skip))
            .limit(parseInt(limit))
            .populate('order_items')
            .sort('-createdAt');
        return res.json({
            data: orders.map(order => order.toJSON({virtuals: true})),
            count
        })
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER)
        return next(err)
    }
}

module.exports = {
    create,
    index
}