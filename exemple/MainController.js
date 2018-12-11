const fs = require('fs');
const mongoDbClient = require('./db');
const ObjectID = require('mongodb').ObjectID;

const User = require('./users/User').model;
const Item = require('./items/Item').model;
const List = require('./lists/List').model;

const models = {
  "user":User,
  "item":Item,
  "list":List,
}

// CREATE
function create(entityName, entityNamePlural, filePath, request, response, fields){
  models[entityName].create(request.body, (err, obj) => {
      if (err) return response.status(500).send("There was a problem adding the information to the database." + err);
      response.status(200).send(obj);
  });
}

// SELECT ONE BY ID
function select(entityName, entityNamePlural, filePath, request, response){
  models[entityName].findById(request.params.id, (err, obj) => {
    if (err) return response.status(500).send("There was a problem finding the object.");
    if (!obj) return response.status(404).send("No object found.");
    response.status(200).send(obj);
  });
}

// DELETE ONE BY ID
function delet(entityName, entityNamePlural, filePath, request, response){
  models[entityName].findByIdAndRemove(request.params.id, (err, obj) => {
    if (err) return response.status(500).send("There was a problem deleting the object.");
    response.status(200).send(`${entityName} with id  ${obj._id} was deleted.`);
  });
}

//  UPDATE ONE BY ID
function update(entityName, entityNamePlural, filePath, request, response, fields){
  models[entityName].findByIdAndUpdate(request.params.id, request.body, {new: true}, (err, obj) => {
    if (err) return response.status(500).send("There was a problem updating the object.");
    response.status(200).send(obj);
  });
}

// SELECT ALL BY ID
function selectAll(entityName, entityNamePlural, filePath, request, response){
  models[entityName].find({}, (err, objects) => {
    if (err) return response.status(500).send("There was a problem finding the objects.");
    response.status(200).send(objects);
  });
}

module.exports = {create, select, delet, update, selectAll}