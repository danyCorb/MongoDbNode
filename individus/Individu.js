// Individu.js
var mongoose = require('mongoose');  
var IndividuSchema = new mongoose.Schema({ 
  nom:String,
  prenom:String,
  age:Number,
  nb_cafe:Number,
  sexe:String,
  matiere:String,
  salaire:Number,
  type:String
});
mongoose.model('Individu', IndividuSchema, 'individus');

module.exports = {
  model: mongoose.model('Individu'),
  schema: IndividuSchema,
}