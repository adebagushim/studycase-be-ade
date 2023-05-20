const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        minlength: [3, 'Panjang nama harus 3 - 255 karakter'],
        maxlength: [255, 'Panjang nama harus 3 - 255 karakter'],
        required: [true, 'Nama harus diisi']
    },

    username: {
        type: String,
        minlength: [3, 'Panjang nama harus 3 - 10 karakter'],
        maxlength: [10, 'Panjang nama harus 3 - 10 karakter'],
        required: [true, 'Nama harus diisi']
    },

    email: {
        type: String,
        required: [true, 'Email harus diisi']
    },
    
    password: {
        type: String,
        required: [true, 'Password harus diisi']
    },
    
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user' 
    },

    token: [String]

}, {timestamps: true});

userSchema.path('email').validate(function(value){
    const EMAIL_RE = /\S+@\S+\.\S+/;
    return EMAIL_RE.test(value);
}, attr => `${attr.value} harus merupakan email yang valid!`);

userSchema.path('email').validate(async function(value){
    try{
        const count = await this.model('User').count({email: value});
        return !count
    } catch(err){
        throw err
    }
}, attr => `${attr.value} sudah terdaftar`);


module.exports = mongoose.model('User', userSchema);