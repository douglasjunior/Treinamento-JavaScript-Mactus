"use strict";

var JWT = require('jsonwebtoken');

var JWT_KEY = "TGjv?.hY5NAJ(yfjX'v-~P7zstCL8vg/";

var jwt = module.exports;

jwt.createToken = function (payload) {
    return JWT.sign(payload, JWT_KEY);
};

jwt.decodeToken = function (token) {
    return JWT.verify(token, JWT_KEY);
};
//# sourceMappingURL=jwt.js.map