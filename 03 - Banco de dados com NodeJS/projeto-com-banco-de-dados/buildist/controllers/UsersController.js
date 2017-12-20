'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var moment = require('moment');


var jwt = require('../utils/jwt');

var _require = require('../models'),
    User = _require.User,
    Task = _require.Task,
    sequelize = _require.sequelize;

var ctrl = module.exports;

/**
 * @param {Request} request 
 * @param {Response} response 
 * @param {function} next 
 */
ctrl.createUser = function (request, response, next) {
    var _request$body = request.body,
        name = _request$body.name,
        username = _request$body.username,
        password = _request$body.password,
        birthday = _request$body.birthday;

    User.create({
        name: name,
        username: username,
        password: password,
        birthday: moment(birthday, 'YYYY-MM-DD', true).toDate()
    }).then(function (user) {
        response.status(201).json(user);
    }).catch(function (error) {
        console.error(error);
        next(error);
    });
};

ctrl.returnUserById = function (request, response, next) {
    var userId = request.params.userId;

    User.findById(userId, {
        include: [{
            model: Task,
            required: false
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
};

ctrl.updateUser = function (request, response, next) {
    var userId = request.params.userId;
    var _request$body2 = request.body,
        name = _request$body2.name,
        password = _request$body2.password,
        birthday = _request$body2.birthday;

    User.update({
        name: name,
        password: password,
        birthday: moment(birthday, 'YYYY-MM-DD', true).toDate()
    }, {
        where: {
            id: userId
        }
    }).then(function (recordsCount) {
        if (recordsCount[0] > 0) {
            response.status(204).send();
        } else {
            response.status(404).send('Usuário não encontrado');
        }
    }).catch(function (error) {
        console.error(error);
        next(error);
    });
};

ctrl.deleteUser = function (request, response, next) {
    var userId = request.params.userId;


    sequelize.transaction(function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(transaction) {
            var recordsCount;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return Task.destroy({
                                where: {
                                    user_id: userId
                                },
                                transaction: transaction
                            });

                        case 2:
                            _context.next = 4;
                            return User.destroy({
                                where: {
                                    id: userId
                                },
                                transaction: transaction
                            });

                        case 4:
                            recordsCount = _context.sent;


                            testandoLog(recordsCount);

                            if (!(recordsCount > 0)) {
                                _context.next = 10;
                                break;
                            }

                            response.status(204).send();
                            _context.next = 12;
                            break;

                        case 10:
                            response.status(404).send('Usuário não encontrado');
                            return _context.abrupt('return', transaction.rollback());

                        case 12:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        return function (_x) {
            return _ref.apply(this, arguments);
        };
    }()).catch(function (error) {
        console.error(error);
        next(error);
    });
};

function testandoLog(text) {
    console.log(text);
}

ctrl.login = function (request, response) {
    var _request$body3 = request.body,
        username = _request$body3.username,
        password = _request$body3.password;


    if (username === "admin" && password === "123456") {
        var loggedUser = {
            name: "Douglas",
            username: "admin",
            accessType: "admin"
        };
        var token = jwt.createToken(loggedUser);
        response.status(200).json({
            token: token
        });
    } else {
        response.status(401).send("Usuário ou senha inválidos.");
    }
};

ctrl.verifyAuth = function (request, response, next) {
    var token = request.headers['x-access-token'] || request.cookies['x-access-token'];
    try {
        var payload = jwt.decodeToken(token);
        if (payload) {
            request.payload = payload;
            next();
            return;
        }
    } catch (ex) {
        console.error(ex);
    }
    response.status(400).send("Permissão negada.");
};

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
    });
};

ctrl.countUsers = function (request, response, next) {
    User.findAll({
        attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'count_users']]
    }).then(function (countUsers) {
        response.status(200).json(countUsers[0]);
    }).catch(function (error) {
        console.error(error);
        next(error);
    });
};
//# sourceMappingURL=UsersController.js.map