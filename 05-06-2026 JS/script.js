/*
  Projeto Pratico: Arsenal Arcano de Midgard
  Autoria: Ruan - Curso Superior de Tecnologia em Analise e Desenvolvimento de Sistemas
*/

class Item {
  constructor(id, nome, preco, categoria, quantidade, imagem) {
    this.id = id;
    this.nome = nome;
    this.preco = preco;
    this.categoria = categoria;
    this.quantidade = quantidade;
    this.imagem = imagem;
  }

  calcularSubtotal() {
    return this.preco * this.quantidade;
  }
}

const inventarioOriginal = [
  new Item(1, "Machado Leviata", 500, "Armas", 1, "2.jpg"),
  new Item(2, "Escudo do Guardiao", 180, "Defesas", 4, "3.jpg"),
  new Item(3, "Pedra de Cura de Midgard", 50, "Poções", 10, "4.jpg"),
  new Item(4, "Hidromel Runico Azul", 75, "Poções", 2, "5.jpg")
];

let mochilaAtual = [...inventarioOriginal];
let proximoId = inventarioOriginal.length + 1;
let larguraJanela = window.innerWidth;

const mochilaExibicao = document.getElementById("mochilaExibicao");
const formularioItem = document.getElementById("formularioItem");
const painelJanela = document.getElementById("painelJanela");
const mensagemSistema = document.getElementById("mensagemSistema");
const botaoDesconto = document.getElementById("botaoDesconto");
const botaoFiltro = document.getElementById("botaoFiltro");
const botaoRestaurar = document.getElementById("botaoRestaurar");
const botaoOuro = document.getElementById("botaoOuro");

function formatarOuro(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).replace("R$", "ouro");
}

function atualizarMensagem(texto, erro = false) {
  mensagemSistema.textContent = texto;
  mensagemSistema.classList.toggle("erro", erro);
}

function atualizarPainelJanela() {
  larguraJanela = window.innerWidth;
  const alturaJanela = window.innerHeight;
  painelJanela.textContent = `Janela: ${larguraJanela}px x ${alturaJanela}px`;
}

function desenharMochilaNaTela(arrayItens) {
  mochilaExibicao.innerHTML = "";

  arrayItens.forEach((item) => {
    const cardItem = document.createElement("article");
    cardItem.classList.add("card-item");

    // Regra de escassez: itens com menos de 3 unidades ficam em estado critico.
    if (item.quantidade < 3) {
      cardItem.classList.add("critico");
    }

    const alertaEstoque = item.quantidade < 3 ? "<span class=\"alerta-estoque\">ACABANDO!</span>" : "";

    cardItem.innerHTML = `
      ${alertaEstoque}
      <img src="${item.imagem}" alt="${item.nome}">
      <div class="conteudo-card">
        <h3>${item.nome}</h3>
        <dl class="detalhes-item">
          <div><dt>Categoria</dt><dd>${item.categoria}</dd></div>
          <div><dt>Preco</dt><dd>${formatarOuro(item.preco)}</dd></div>
          <div><dt>Quantidade</dt><dd>${item.quantidade}</dd></div>
          <div><dt>Subtotal</dt><dd>${formatarOuro(item.calcularSubtotal())}</dd></div>
        </dl>
      </div>
    `;

    mochilaExibicao.appendChild(cardItem);
  });
}

formularioItem.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = document.getElementById("nomeItem").value.trim();
  const preco = Number(document.getElementById("precoItem").value);
  const categoria = document.getElementById("categoriaItem").value;
  const quantidade = Number(document.getElementById("quantidadeItem").value);
  const imagem = document.getElementById("imagemItem").value;

  const novoItem = new Item(proximoId, nome, preco, categoria, quantidade, imagem);
  proximoId += 1;
  mochilaAtual.push(novoItem);

  desenharMochilaNaTela(mochilaAtual);
  atualizarMensagem(`${nome} foi guardado na mochila.`);
  formularioItem.reset();
});

botaoDesconto.addEventListener("click", () => {
  mochilaAtual = mochilaAtual.map((item) => {
    return new Item(item.id, item.nome, item.preco * 0.9, item.categoria, item.quantidade, item.imagem);
  });

  desenharMochilaNaTela(mochilaAtual);
  atualizarMensagem("Benção de Brok aplicada: todos os precos exibidos receberam 10% de desconto.");
});

botaoFiltro.addEventListener("click", () => {
  const pocoes = mochilaAtual.filter((item) => item.categoria === "Poções");

  desenharMochilaNaTela(pocoes);
  atualizarMensagem("Visao de Mimir ativa: exibindo apenas itens da categoria Poções.");
});

botaoRestaurar.addEventListener("click", () => {
  desenharMochilaNaTela(mochilaAtual);
  atualizarMensagem("Todos os itens do arsenal estao visiveis.");
});

botaoOuro.addEventListener("click", () => {
  let totalOuro = 0;

  if (mochilaAtual.length > 0 && larguraJanela > 480) {
    for (let i = 0; i < mochilaAtual.length; i++) {
      totalOuro += mochilaAtual[i].calcularSubtotal();
    }

    atualizarMensagem(`Valor patrimonial total do arsenal: ${formatarOuro(totalOuro)}.`);
  } else {
    atualizarMensagem("Erro: Tela muito pequena para abrir o baú!", true);
  }
});

window.onresize = atualizarPainelJanela;

atualizarPainelJanela();
desenharMochilaNaTela(mochilaAtual);
