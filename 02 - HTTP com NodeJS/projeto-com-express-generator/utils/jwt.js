const JWT = require('jsonwebtoken');

const JWT_KEY = "TGjv?.hY5NAJ(yfjX'v-~P7zstCL8vg/";

const jwt = module.exports;

jwt.createToken = function (payload) {
    return JWT.sign(payload, JWT_KEY);
}

jwt.decodeToken = function (token) {
    return JWT.verify(token, JWT_KEY);
}