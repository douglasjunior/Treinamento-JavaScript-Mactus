const moment = require('moment');
import express, { Request, Response } from 'express';

const jwt = require('../utils/jwt');
const { User, Task, sequelize } = require('../models');

const ctrl = module.exports;

/**
 * @param {Request} request 
 * @param {Response} response 
 * @param {function} next 
 */
ctrl.createUser = function (request, response, next) {
    const { name, username, password, birthday } = request.body;
    User.create({
        name,
        username,
        password,
        birthday: moment(birthday, 'YYYY-MM-DD', true).toDate()
    }).then(function (user) {
        response.status(201).json(user);
    }).catch(function (error) {
        console.error(error);
        next(error);
    })
};

ctrl.returnUserById = function (request, response, next) {
    const { userId } = request.params;
    User.findById(userId, {
        include: [{
            model: Task,
            required: false,
        }]
    }).then(function (user) {
        if (user) {
            response.status(200).json(user);
        } else {
            response.status(404).send('Usuário não encontrado.');
        }
    }).catch(function (error) {
        console.error(error);
        next(error);
    });
}

ctrl.updateUser = function (request, response, next) {
    const { userId } = request.params;
    const { name, password, birthday } = request.body;
    User.update({
        name,
        password,
        birthday: moment(birthday, 'YYYY-MM-DD', true).toDate()
    }, {
            where: {
                id: userId
            }
        }
    ).then(function (recordsCount) {
        if (recordsCount[0] > 0) {
            response.status(204).send();
        } else {
            response.status(404).send('Usuário não encontrado');
        }
    }).catch(function (error) {
        console.error(error);
        next(error);
    })
}

ctrl.deleteUser = function (request, response, next) {
    const { userId } = request.params;

    sequelize.transaction(async function (transaction) {
        await Task.destroy({
            where: {
                user_id: userId
            },
            transaction
        });

        const recordsCount = await User.destroy({
            where: {
                id: userId
            },
            transaction
        });

        testandoLog(recordsCount);

        if (recordsCount > 0) {
            response.status(204).send();
        } else {
            response.status(404).send('Usuário não encontrado');
            return transaction.rollback();
        }

    }).catch(function (error) {
        console.error(error);
        next(error);
    })
};

function testandoLog(text) {
    console.log(text)
}

ctrl.login = function (request, response) {
    const { username, password } = request.body;

    if (username === "admin" && password === "123456") {
        const loggedUser = {
            name: "Douglas",
            username: "admin",
            accessType: "admin",
        }
        const token = jwt.createToken(loggedUser);
        response.status(200).json({
            token: token
        })
    } else {
        response.status(401).send("Usuário ou senha inválidos.");
    }
};

ctrl.verifyAuth = function (request, response, next) {
    const token = request.headers['x-access-token'] ||
        request.cookies['x-access-token'];
    try {
        const payload = jwt.decodeToken(token);
        if (payload) {
            request.payload = payload;
            next();
            return;
        }
    } catch (ex) {
        console.error(ex);
    }
    response.status(400).send("Permissão negada.");
}

ctrl.returnUser = function (request, response, next) {
    User.findAll({
        attributes: {
            exclude: ['password']
        }
    }).then(function (users) {
        response.status(200).json(users);
    }).catch(function (error) {
        console.error(error);
        next(error);
    })
}

ctrl.countUsers = function (request, response, next) {
    User.findAll({
        attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'count_users']]
    }).then(function (countUsers) {
        response.status(200).json(countUsers[0]);
    }).catch(function (error) {
        console.error(error);
        next(error);
    })
}