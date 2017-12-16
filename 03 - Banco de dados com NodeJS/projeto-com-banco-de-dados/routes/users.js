const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/UsersController');

router.post('/login', UsersController.login);
router.post('/', UsersController.createUser);
router.delete('/', UsersController.deleteUser);
router.get('/', UsersController.verifyAuth,
  UsersController.returnUser)

module.exports = {
  router: router,
  path: '/users'
};
