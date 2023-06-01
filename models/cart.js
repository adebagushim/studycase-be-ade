const mongoose = require('mongoose');
const { Schema } = mongoose;
const { dbHost, appPort, product } = require('../config')

const cartSchema = new Schema({ 
    name: {
        type: String,
        minlength: [3, 'Panjang nama cart minimal 3 karakter'],
        required: [true, 'Nama harus diisi']
    },

    price: {
        type: Number,
        required: [true, 'qty harus diisi']
    },

    price: {
        type: Number,
        default: 0
    },

    image: {
        type: String,
        get: (data) => `${dbHost}:${appPort}/${product}`  + data
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    product: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    }

}, { toJSON: { getters: true }}); 

module.exports = mongoose.model('cart', cartSchema);