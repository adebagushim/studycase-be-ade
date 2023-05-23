const mongoose = require('mongoose');
const { Schema } = mongoose;

const deliveryAddressSchema = new Schema({
    alamat: {
        type: String,
        maxlength: [255, 'Panjang alamat maksimal 255 karakter'],
        required: [true, 'Alamat harus diisi']
    },

    kelurahan: {
        type: String,
        maxlength: [255, 'Panjang kelurahan maksimal 255 karakter'],
        required: [true, 'Kelurahan harus diisi']
    },
    
    kecamatan: {
        type: String,
        maxlength: [255, 'Panjang kecamatan maksimal 255 karakter'],
        required: [true, 'Kecamatan harus diisi']
    },
    
    kabupaten: {
        type: String,
        maxlength: [255, 'Panjang kabupaten maksimal 255 karakter'],
        required: [true, 'Kabupaten harus diisi']
    },

    provinsi: {
        type: String,
        maxlength: [255, 'Panjang provinsi maksimal 255 karakter'],
        required: [true, 'Kabupaten harus diisi']
    },

    detail: {
        type: String,
        maxlength: [1000, 'Panjang detail maksimal 1000 karakter'],
        required: [true, 'Kabupaten harus diisi']
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});


module.exports = mongoose.model('DeliveryAddress', deliveryAddressSchema);