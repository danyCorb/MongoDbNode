// Fac.js
var mongoose = require('mongoose');  
var FacSchema = new mongoose.Schema({ 
    nom: String,
    buget: Number,
    disciplines: Array,
    clubs: Array,
    eleves:Array,
    profs:Array,
    nb_machine_cafe:Number,
    addresse:Object,
    directeur:Object
});
mongoose.model('Fac', FacSchema);

module.exports = {
  model: mongoose.model('Fac'),
  schema: FacSchema,
}