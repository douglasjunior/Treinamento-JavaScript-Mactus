const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const app = express();

app.use(function (request, response, next) {
    const token = request.headers['authorization'];
    if (token) {
        // usuário autenticado
        next();
    } else {
        response.status(401).send("Usuário não autenticado.");
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

let USUARIO_ID = 3;

const USUARIOS = [
    { id: 1, nome: "Douglas" },
    { id: 2, nome: "José" },
];

app.get('/', function (request, response) {
    response.status(200).send("Olá Express!");
});

app.get('/usuarios/consulta', function (request, response, next) {
    request.check({
        nome: {
            in: "query",
            isLength: {
                options: {
                    min: 0, max: 40
                }
            },
            errorMessage: "Informe o nome do usuário até 40 caracteres."
        },
    });
    request.getValidationResult()
        .then((result) => {
            if (result.isEmpty()) {
                next();
            } else {
                response.status(400).json(result.array());
            }
        }).catch(next);
}, function (request, response) {
    // const nome = request.query.nome;
    // const idade = request.query.idade;
    // const data = request.query.data;
    let { nome, } = request.query;
    if (nome) {
        const usuariosFiltrados = USUARIOS.filter(function (usuario) {
            return usuario.nome
                .toLowerCase().indexOf(nome.toLowerCase()) >= 0;
        });
        response.status(200).json(usuariosFiltrados);
    } else {
        response.status(200).json(USUARIOS);
    }
});

app.get('/usuarios/:idUsuario', function (request, response) {
    const { idUsuario } = request.params;
    const usuario = USUARIOS.find(function (usuario) {
        return usuario.id === parseInt(idUsuario);
    });
    if (usuario) {
        response.status(200).json(usuario);
    } else {
        response.status(404).send("Usuário não encontrado");
    }
});

app.post("/usuarios", function (request, response, next) {
    request.check({
        nome: {
            in: "body",
            notEmpty: true,
            errorMessage: "Informe o nome do usuário."
        },
        anoNascimento: {
            in: "body",
            isInt: {
                options: {
                    min: 1900, max: 2000
                }
            },
            errorMessage: "O ano de nascimento deve estar entre 1900 e 2000."
        }
    });
    request.getValidationResult()
        .then((result) => {
            if (result.isEmpty()) {
                next();
            } else {
                response.status(400).json(result.array());
            }
        }).catch(next);
}, function (request, response) {
    // let usuario = "";
    // request.on('data', function (chunk) {
    //     usuario += chunk
    // });
    // request.on('end', function () {
    //     console.log('Usuários recebido:', usuario);
    //     response.status(201).send();
    // });
    const usuario = {
        id: USUARIO_ID++,
        nome: request.body.nome,
        anoNascimento: request.body.anoNascimento
    };
    USUARIOS.push(usuario);
    response.status(201).send();
});

app.delete('/usuarios/:idUsuario', function (request, response) {
    const { idUsuario } = request.params;

    const usuarioIndex = USUARIOS.findIndex((usuario) => {
        return usuario.id === parseInt(idUsuario);
    })
    if (usuarioIndex >= 0) {
        USUARIOS.splice(usuarioIndex, 1);
        response.status(204).send();
    } else {
        response.status(404).send('Usuário não encontrado.');
    }
})

app.put('/usuarios/:idUsuario', function (request, response) {
    const { idUsuario } = request.params;
    const usuario = USUARIOS.find(function (usuario) {
        return usuario.id === parseInt(idUsuario);
    });
    if (usuario) {
        usuario.nome = request.body.nome;
        usuario.anoNascimento = request.body.anoNascimento;

        response.status(200).json(usuario);
    } else {
        response.status(404).send("Usuário não encontrado");
    }
})

app.use(function (request, response) {
    response.status(404).send("Rota não encontrada.");
});

app.listen(3000, function () {
    console.log("Servidor iniciado com sucesso.");
});