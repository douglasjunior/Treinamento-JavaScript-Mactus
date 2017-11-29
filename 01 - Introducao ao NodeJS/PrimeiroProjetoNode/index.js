const Formatter = require('./Fomatter');

console.log("Olá Node");

// var pessoa = {
//     nome: "Nome",
//     profissao: "Programador"
// }

class Pessoa {
    
}

function Pessoa () {
    this.nome = '';
}

var pessoa = new Pessoa();

pessoa.nome

console.log("Pessoa:", pessoa);

var dataAtual = new Date();

console.log("Data atual:", Formatter.dateToString(dataAtual));
