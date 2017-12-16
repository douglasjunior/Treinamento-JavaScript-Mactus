const jwt = require('../utils/jwt');

const ctrl = module.exports;

ctrl.createUser = function (request, response) {

};

ctrl.deleteUser = function (request, response) {

};

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

ctrl.returnUser = function (request, response) {
    response.status(200).json({
        name: "Douglas"
    })
}