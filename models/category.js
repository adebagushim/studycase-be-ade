const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  name:  { 
    type: String, 
    minlength: [3, 'Panjang nama kategori minimal 3 karakter'],
    maxlength: [20, 'Panjang nama kategori minimal 20 karakter'],
    required: [true, 'Nama kategori harus diisi'] 
  }, // String is shorthand for {type: String}
});

module.exports = mongoose.model('category', categorySchema);