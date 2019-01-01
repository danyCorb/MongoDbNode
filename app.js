// app.js
const express = require('express');
const app = express();
const db = require('./db');

/**
 * Routes
 */

const ClubController = require('./clubs/ClubController');
app.use('/clubs', ClubController);

const IndividuController = require('./individus/IndividuController');
app.use('/individus', IndividuController);

const FacController = require('./facs/FacController');
app.use('/facs', FacController);

module.exports = app;