const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/UsersController');

router.post('/login', UsersController.login);
router.post('/', UsersController.createUser);
router.delete('/:userId', UsersController.deleteUser);
router.get('/', UsersController.returnUser);
router.get('/:userId', UsersController.returnUserById);
router.put('/:userId', UsersController.updateUser);
router.options('/count', UsersController.countUsers);

module.exports = {
    router: router,
    path: '/users'
};
