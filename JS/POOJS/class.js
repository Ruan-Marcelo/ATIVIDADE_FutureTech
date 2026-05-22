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
outroCarro.buzinar(); // Output: Buzinando...

