'use strict';

var _require = require('../models'),
    User = _require.User,
    Task = _require.Task,
    sequelize = _require.sequelize;

var ctrl = module.exports;

ctrl.createTask = function (request, response, next) {
    var userId = request.params.userId;
    var description = request.body.description;


    User.findById(userId).then(function (user) {
        if (user) {
            return Task.create({
                user_id: user.id,
                description: description
            });
        } else {
            response.status(404).send('Usuário não encontrado.');
        }
    }).then(function (task) {
        if (task) {
            response.status(201).json(task);
        }
    }).catch(function (error) {
        console.error(error);
        next(error);
    });
};
//# sourceMappingURL=TasksController.js.map