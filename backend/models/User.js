const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true,min:4},
  phone:{type:Number,required:true,maxLength:10}
});

module.exports = mongoose.model('User', userSchema);