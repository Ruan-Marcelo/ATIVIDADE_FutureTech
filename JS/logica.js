// Função para processar madeira e criar um produto final
function processarMadeira(material){
    let produtoFinal = "Cadeira de " + material;
    return produtoFinal;
}
console.log(processarMadeira("Ferro"));

// Função para somar valor a com valor b
function soma(a, b){
    return a + b;
}
console.log(soma(5, 3));

function somar(v1, v2){
    return v1 + v2;
}

console.log("Pedido 1:", somar(10, 20));
console.log("Pedido 2:", somar(15, 25));
console.log("Pedido 3:", somar(20, 30));

function realParaDolar(valorReal, cotacaoDolar){
    var total = valorReal * cotacaoDolar;
    return total;
}
console.log(realParaDolar(7.89, 5.08));

// chamar function

function saudacao(){
    console.log("Olá, seja bem-vindo!");
}
saudacao();

function calcularMedia(n1, n2){
    var media = (n1 + n2) / 2;
}

var minhaMedia = calcularMedia(8, 6);
console.log("A média é: " + minhaMedia);