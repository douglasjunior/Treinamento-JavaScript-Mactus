const http = require('http');
const port = 3000;

const server = http.createServer(function(request, response) {

    response.setHeader('content-type', 'application/json; charset=utf-8');
    response.writeHead(201);

    const pessoa = {
        nome: "Douglas Junior",
        anoNascimento: 1989
    };
    const body = JSON.stringify(pessoa);
    response.write(body);
    response.end();  

});

server.listen(port, function() {
    console.log("Servidor iniciado na porta: " + port);
});
