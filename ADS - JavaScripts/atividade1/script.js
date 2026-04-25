function processarDados() {
  let nome = document.getElementById("nome").value;
  let nota1 = Number(document.getElementById("nota1").value);
  let nota2 = Number(document.getElementById("nota2").value);

  let media = (nota1 + nota2) / 2;

  let resultado = document.getElementById("resultado");

  resultado.innerHTML = `Olá ${nome}, sua média é ${media.toFixed(2)}`;

  console.log("Cálculo realizado com sucesso");

  if (media < 7) {
    resultado.style.color = "#ff4d4d";
  } else {
    resultado.style.color = "#00ff88";
  }
}