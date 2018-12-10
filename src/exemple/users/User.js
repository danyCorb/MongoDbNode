// User.js
var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({ 
    name : String,
    password : String,
});
mongoose.model('User', UserSchema);

module.exports = {
  model: mongoose.model('User'),
  schema: UserSchema,
}