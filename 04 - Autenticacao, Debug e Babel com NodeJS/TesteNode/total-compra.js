const totalCompra = function (compra) {
    if (!compra.items) return 0;
    // let total = 0;
    // for (i in compra.items) {
    //     total += compra.items[i].valor * (compra.items[i].quantidade || 1);
    // }
    // return total;

    return compra.items.reduce(function(total, item) {
        return total + item.valor * (item.quantidade || 1);
    }, 0);
}

module.exports = totalCompra;