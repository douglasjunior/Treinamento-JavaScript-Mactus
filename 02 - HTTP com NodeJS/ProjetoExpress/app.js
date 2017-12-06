const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const USUARIOS = [
    { id: 1, nome: "Douglas" },
    { id: 2, nome: "José" },
];

// app.use(function(request, response, next) {
//     if (usuarioEstaAutenticado) {
//         next();
//     } else {
//         response.send("Usuário não autenticado").status(401);
//     }
// });

app.get('/', function (request, response) {
    response.status(200).send("Olá Express!");
});

app.get('/usuarios/consulta', function (request, response) {
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

app.post("/usuarios", function (request, response) {
    // let usuario = "";
    // request.on('data', function (chunk) {
    //     usuario += chunk
    // });
    // request.on('end', function () {
    //     console.log('Usuários recebido:', usuario);
    //     response.status(201).send();
    // });
    const usuario = request.body;
    console.log('Usuários recebido:', usuario);
    response.status(201).send();
});

app.use(function (request, response) {
    response.status(404).send("Rota não encontrada.");
});

app.listen(3000, function () {
    console.log("Servidor iniciado com sucesso.");
});