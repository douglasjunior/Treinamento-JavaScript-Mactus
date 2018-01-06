const totalCompra = require('./total-compra');

describe('Testes da função de compra', function () {
    test('Testando compra vazia.', function () {
        expect(totalCompra({})).toBe(0);
    })

    test('Testando compra com itens.', function () {
        expect(totalCompra({
            items: [
                { nome: 'Coca-cola', valor: 7 },
                { nome: 'Amendoim Japones', valor: 5 }
            ]
        })).toBe(12);
    })

    test('Testando compra com itens e quantidade.', function () {
        expect(totalCompra({
            items: [
                { nome: 'Coca-cola', valor: 7, quantidade: 2 },
                { nome: 'Amendoim Japones', valor: 5 }
            ]
        })).toBe(19);
    })
})