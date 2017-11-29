
var soma = function (num1, num2) {
    return num1 + num2;
}

var multiplciacao = function (num1, num2) {
    return num1 * num2;
}

function executar(operacao) {
    console.log("Retorno:", operacao(3, 5));
}

executar(soma);
executar(multiplciacao);

var animais = [
    { especie: 'cachorro', raca: 'pincher' },
    { especie: 'cachorro', raca: 'pitbull' },
    { especie: 'gato', raca: 'siames' },
]

console.log('animais', animais);

// var cachorros = [];
// for (var i = 0; i < animais.length; i++) {
//     var animal = animais[i];
//     if (animal.especie === 'cachorro') {
//         cachorros.push(animal);
//     }
// }

var isCachorro = animal => animal.especie === 'cachorro';

var cachorros = animais.filter(isCachorro);

console.log('cachorros', cachorros);

var racas = animais.map(function (animal) {
    return animal.raca;
});

console.log('racas', racas);

var racasCachorro = animais
    .filter(isCachorro)
    .map(cachorro => cachorro.raca);

console.log('racasCachorro', racasCachorro);

