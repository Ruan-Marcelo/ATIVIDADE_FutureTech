function exibirSaudacao() {
  const nome = document.getElementById("InputNome").value;
  const mensagem = document.getElementById("mensagemSaudacao");
  mensagem.textContent = `Olá, ${nome}!`;
}

function calcularSoma() {
  const numero1 = parseFloat(document.getElementById("InputNumero1").value);
  const numero2 = parseFloat(document.getElementById("InputNumero2").value);
  const resultado = numero1 + numero2;
  const mensagem = document.getElementById("mensagemSoma");
  mensagem.textContent = `A soma de ${numero1} e ${numero2} é: ${resultado}`;
}