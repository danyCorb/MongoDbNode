const express = require('express');
const router = express.Router();
const MainController = require('../MainController')
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const ENTITY_NAME = "user";
const ENTITY_NAME_PLURAL = "users";
const ENTITY_FILE_PATH = "users/users.json";
const FIELDS = ["name", "password"];

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
  MainController.create(ENTITY_NAME, ENTITY_NAME_PLURAL, ENTITY_FILE_PATH, req, response, FIELDS);
});

// GET ONE BY ID
router.get('/:id', function (req, response) {
  MainController.select(ENTITY_NAME, ENTITY_NAME_PLURAL, ENTITY_FILE_PATH, req, response);
});

// DELETE BY ID
router.delete('/:id', function (req, response) {
  MainController.delet(ENTITY_NAME, ENTITY_NAME_PLURAL, ENTITY_FILE_PATH, req, response);
});

// UPDATE ONE BY ID
router.put('/:id', function (req, response) {
  MainController.update(ENTITY_NAME, ENTITY_NAME_PLURAL, ENTITY_FILE_PATH, req, response, FIELDS);
});

// GETS ALL
router.get('/', function (req, response) {
  MainController.selectAll(ENTITY_NAME, ENTITY_NAME_PLURAL, ENTITY_FILE_PATH, req, response);
});

module.exports = router;