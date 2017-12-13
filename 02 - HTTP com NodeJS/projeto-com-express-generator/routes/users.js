var express = require('express');
var router = express.Router();

const UsersController = require('../controllers/UsersController');

router.post('/', UsersController.createUser);
router.delete('/', UsersController.deleteUser);

module.exports = {
  router: router,
  path: '/users'
};
