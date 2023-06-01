const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderItemSchema = new Schema({
    
    name: {
        type: String,
        minlength: [5, 'Panjang nama minimal 5 karakter'],
        required: [true, 'Nama product harus diisi']
    },

    price: {
        type: Number,
        required: [true, 'Harga item harus diisi']
    },

    qty: {
        type: Number,
        required: [true, 'Kuantitas harus diisi']
    },

    product: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    },

    order: {
        type: Schema.Types.ObjectId,
        ref: 'order'
    }

}, { toJSON: { getters: true }}); 

module.exports = mongoose.model('OrderItem', orderItemSchema);