// Item.js
var mongoose = require('mongoose');  
var ItemSchema = new mongoose.Schema({ 
    label : String,
    image : String,
    description: String,
});
mongoose.model('Item', ItemSchema);

module.exports = {
  model: mongoose.model('Item'),
  schema: ItemSchema,
}