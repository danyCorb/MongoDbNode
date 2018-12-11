// Club.js
var mongoose = require('mongoose');  
var ClubSchema = new mongoose.Schema({ 
  nom: String,
  president: Object,
  date_creation: Date,
  eleves: Array
});
mongoose.model('Club', ClubSchema, 'clubs');

module.exports = {
  model: mongoose.model('Club'),
  schema: ClubSchema,
}