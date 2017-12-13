var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    const pessoa = {};
    pessoa.nome.trim();
    res.status(200).send("Olá express");
});

module.exports = {
    router: router,
    path: '/'
};
