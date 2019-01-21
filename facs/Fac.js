// Fac.js
var mongoose = require('mongoose');  
mongoose.set('useCreateIndex', true);
var FacSchema = new mongoose.Schema({ 
    nom: String,
    budget: Number,
    disciplines: Array,
    clubs: Array,
    eleves:Array,
    profs:Array,
    nb_machine_cafe:Number,
    addresse:Object,
    directeur:Object
});
FacSchema.index({ nom:1 })
mongoose.model('Fac', FacSchema, 'facs');

module.exports = {
  model: mongoose.model('Fac'),
  schema: FacSchema,
}