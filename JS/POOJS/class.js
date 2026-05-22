class Carro{
    contructor(marca, modelo, ano){
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
    }
    buzinar(){
        console.log("Buzinando...");
    }
}

const meuCarro = new Carro("Toyota", "Corolla", 2020);
console.log(meuCarro.marca); // Output: Toyota

const outroCarro = new Carro("Honda", "Civic", 2019);
console.log(outroCarro.modelo); // Output: Civic

meuCarro.buzinar(); // Output: Buzinando...
outroCarro.buzinar(); // Output: Buzinando..
console.log(meuCarro.ano); // Output: 2020
console.log(outroCarro.ano); // Output: 2019
console.groupCollapsed("Informações do Carro");
console.log(`Marca: ${meuCarro.marca}`);
console.log(`Modelo: ${meuCarro.modelo}`);
console.log(`Ano: ${meuCarro.ano}`);
console.groupEnd();

const carros = [meuCarro, outroCarro];
carros.forEach(carro => {
    console.log(`Marca: ${carro.marca}, Modelo: ${carro.modelo}, Ano: ${carro.ano}`);
});

