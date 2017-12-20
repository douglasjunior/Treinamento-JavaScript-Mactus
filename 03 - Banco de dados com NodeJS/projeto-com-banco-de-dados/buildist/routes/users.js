'use strict';

var express = require('express');
var router = express.Router();

var UsersController = require('../controllers/UsersController');
var TasksController = require('../controllers/TasksController');

router.post('/login', UsersController.login);

router.post('/', UsersController.createUser);
router.put('/:userId', UsersController.updateUser);
router.get('/:userId', UsersController.returnUserById);
router.delete('/:userId', UsersController.deleteUser);
router.get('/', UsersController.returnUser);
router.options('/count', UsersController.countUsers);

router.post('/:userId/task', TasksController.createTask);

module.exports = {
    router: router,
    path: '/users'
};
//# sourceMappingURL=users.js.map