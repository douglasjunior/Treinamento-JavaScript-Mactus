const { User, Task, sequelize } = require('../models');

const ctrl = module.exports;

ctrl.createTask = function (request, response, next) {
    const { userId } = request.params;
    const { description } = request.body;

    User.findById(userId)
        .then(function (user) {
            if (user) {
                return Task.create({
                    user_id: user.id,
                    description
                })
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
        })
}