const mongoose = require('mongoose');
const { Schema } = mongoose;

const tagSchema = new Schema({
  name:  {  
    type: String, 
    minlength: [3, 'Panjang nama tag minimal 3 karakter'],
    maxlength: [20, 'Panjang nama tag minimal 20 karakter'],
    required: [true, 'Nama tag harus diisi'] 
  }, // String is shorthand for {type: String}
});

module.exports = mongoose.model('tag', tagSchema);