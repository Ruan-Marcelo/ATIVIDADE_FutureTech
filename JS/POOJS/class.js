// class Carro{
//     contructor(marca, modelo, ano){
//         this.marca = marca;
//         this.modelo = modelo;
//         this.ano = ano;
//     }
//     buzinar(){
//         return "Buzinando...";
//     }
// }

// const meuCarro = new Carro("Toyota", "Corolla", 2020);
// console.log(meuCarro.marca); // Output: Toyota

// const outroCarro = new Carro("Honda", "Civic", 2019);
// console.log(outroCarro.modelo); // Output: Civic

// console.log(meuCarro.buzinar()); // Output: Buzinando...
// console.log(outroCarro.buzinar()); // Output: Buzinando..
// console.log(meuCarro.ano); // Output: 2020
// console.log(outroCarro.ano); // Output: 2019
// console.groupCollapsed("Informações do Carro");
// console.log(`Marca: ${meuCarro.marca}`);
// console.log(`Modelo: ${meuCarro.modelo}`);
// console.log(`Ano: ${meuCarro.ano}`);
// console.groupEnd();

// const carros = [meuCarro, outroCarro];
// carros.forEach(carro => {
//     console.log(`Marca: ${carro.marca}, Modelo: ${carro.modelo}, Ano: ${carro.ano}`);
// });

// const carro = [
//     { marca: "Toyota", modelo: "Corolla", ano: 2020 },
//     { 
//         marca: "Honda", 
//         modelo: "Civic",
//          ano: 2019,
//         buzina: function() {
//             return "Buzinando...";
//         },
//         apresentar: function() {
//             return `Este é um ${this.marca} ${this.modelo} do ano ${this.ano}.`;
//         }           
//     }

// ]

class Carro{
    constructor(marca, modelo, ano ) {
        this.marca = marca;
        this.modelo = modelo;
        this. ano = ano;
    }
    buzinar(){
        return "Bi bi!"
    }
}


const uno = new Carro("Fiat", "Uno", 2001)
const corsa = new Carro("Chevrolet", "Corsa", 2012)

console.log(uno.marca);
console.log(corsa.modelo);

corsa.ano = 2013;
console.log(corsa.ano);

const carro = {
    marca: "Ford",
    modelo: "Ka",
    ano: "2015",

    buzina: function(){
        console.log("Bi bi!");
    },

    apresentar: function(){
        return "A marca é " + this.marca + "e o modelo é " + this.modelo;
    }
};

console.log(carro.ano);

const campoDinamico = "marca";
console.log(carro[campoDinamico]);

carro.buzina();
console.log(carro.apresentar());