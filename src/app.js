// app.js
const express = require('express');
const app = express();
const db = require('./db');

/**
 * Routes
 */

const ItemController = require('./items/ItemController');
app.use('/items', ItemController);

const UserController = require('./users/UserController');
app.use('/users', UserController);

const ListController = require('./lists/ListController');
app.use('/lists', ListController);

module.exports = app;