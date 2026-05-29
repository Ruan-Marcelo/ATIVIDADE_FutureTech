function validar(){
    const nome = document.getElementById('nome').value;
    const msg = document.getElementById('resultado');

    if(nome === '' || nome === null){
        msg.innerHTML = 'Campo nome é obrigatório!';
        msg.style.color = 'red';
    }
    else{
        msg.innerHTML = `Olá, ${nome}! Seja bem-vindo(a)!`;
        msg.style.color = 'green';
    }
}
function escolherCor(){
    let inputCor = document.getElementById('cor').value;

    let cor = inputCor.toLowerCase().trim();

    switch(cor){
        case 'red':
            document.body.style.backgroundColor = 'red';
            break;
        case 'green':
            document.body.style.backgroundColor = 'green';
            break;
        case 'blue':
            document.body.style.backgroundColor = 'blue';
            break;
        case 'black':
            document.body.style.backgroundColor = 'black';
            document.body.style.color = 'white';
            break;
        default:
            alert('Cor não reconhecida! Tente vermelho, verde ou azul.');
    }
}