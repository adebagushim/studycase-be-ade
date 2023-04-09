const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlenght: 50
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 1000,
        max: 100000000
    },
    image_url: String
});

module.exports = mongoose.model('Product', productSchema);