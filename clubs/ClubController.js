const express = require('express');
const router = express.Router();
const MainController = require('../MainController')
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const ENTITY_NAME = "club";
const ENTITY_NAME_PLURAL = "clubs";
const FIELDS = ["nom", "president", "date_creation", "eleves"];

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use('/', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// CREATE
router.post('/', function (req, response) {
  MainController.create(ENTITY_NAME, req, response);
});

// GET ONE BY ID
router.get('/:id', function (req, response) {
  MainController.select(ENTITY_NAME, req, response);
});

// DELETE BY ID
router.delete('/:id', function (req, response) {
  MainController.delet(ENTITY_NAME, req, response);
});

// UPDATE ONE BY ID
router.put('/:id', function (req, response) {
  MainController.update(ENTITY_NAME, req, response);
});

// GETS ALL
router.get('/', function (req, response) {
  MainController.selectAll(ENTITY_NAME, req, response);
});

module.exports = router;