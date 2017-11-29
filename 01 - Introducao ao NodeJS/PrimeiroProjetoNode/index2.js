const fs = require("fs");

function onDirRead(err, dirs) {
    if (err) {
        console.error("Erro:", err);
    } else {
        console.log("Diretórios encontrados: ", dirs);
    }
}

fs.readdir('c:\\projetos\\', onDirRead);

function onFileRead(err, buffer) {
    if (err) {
        console.error("Erro:", err);
    } else {
        console.log("Arquivo lido: ", buffer);
        const packageJson = JSON.parse(buffer);
        console.log("Package.json: ", packageJson.name);
    }
}

fs.readFile('./package.json', { encoding: 'utf8' }, onFileRead);
