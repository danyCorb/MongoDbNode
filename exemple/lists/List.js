// List.js
const mongoose = require('mongoose');
const UserSchema = require('../users/User').schema;
const ItemSchema = require('../items/Item').schema;

const ListSchema = new mongoose.Schema({ 
    name : String,
    user : UserSchema,
    items: {
      type: [ItemSchema],
      default: undefined,
    },
});
mongoose.model('List', ListSchema);

module.exports = {
  model: mongoose.model('List'),
  schema: ListSchema,
}