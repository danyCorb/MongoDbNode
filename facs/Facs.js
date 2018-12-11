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

//          "id": "",
//         "nom": "",
//         "budget": 0,
//         "disciplines": [],
//         "clubs":[],
//         "eleves":[],
//         "profs":[],
//         "nb_machine_cafe":0,
//         "addresse":{
//             "rue":"",
//             "numero":"",
//             "code_postal":0,
//             "ville":""            
//         },
//         "directeur":{
//             "nom": "",
//             "prenom": "",   
//             "age": 0,
//             "sexe": "",
//             "salaire":0
//         }