const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    
    name: {
        type: String,
        minlength: [3, 'Panjang nama product minimal 3 karakter'],
        maxlength: [20, 'Panjang nama product maximal 20 karakter'],
        required: [true, 'Nama product harus diisi']
    },

    description: {
        type: String,
        maxlenght: [1000, 'Panjang deskripsi maximal 1000 karakter']
    },

    price: {
        type: Number,
        default: 0
    },

    image_url: String,

    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },

    tags: {
        type: Schema.Types.ObjectId,
        ref: 'tag'
    }

}, { timestamps: true }); 

module.exports = mongoose.model('Product', productSchema);