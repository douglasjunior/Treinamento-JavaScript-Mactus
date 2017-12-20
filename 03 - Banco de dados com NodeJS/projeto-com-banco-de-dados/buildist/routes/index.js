'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.status(200).send("Olá express");
});

module.exports = {
    router: router,
    path: '/'
};
//# sourceMappingURL=index.js.map