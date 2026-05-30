const chaveLocal = "iotSentinelProSensores";
const cardsSensores = document.getElementById("cardsSensores");
const nomeSensor = document.getElementById("nomeSensor");
const tipoSensor = document.getElementById("tipoSensor");
const valorSensor = document.getElementById("valorSensor");
const previewNome = document.getElementById("previewNome");
const filtroResumo = document.getElementById("filtroResumo");
const totalSensores = document.getElementById("totalSensores");
const totalNormal = document.getElementById("totalNormal");
const totalCritico = document.getElementById("totalCritico");
const contextoGrafico = document.getElementById("graficoMedias");

let sensores = [];
let filtroAtual = "TODOS";
let graficoMedias;

class Sensor {
  constructor(nome, tipo, valor) {
    this.nome = nome;
    this.tipo = tipo;
    this.valor = Number(valor);
    this.criadoEm = new Date().toLocaleString("pt-BR");
  }

  status() {
    if (this.tipo === "TEMPERATURA") {
      return this.valor > 50 ? "CRÍTICO" : "NORMAL";
    }

    if (this.tipo === "PRESSAO") {
      return this.valor > 100 ? "CRÍTICO" : "NORMAL";
    }

    if (this.tipo === "UMIDADE") {
      return this.valor < 30 || this.valor > 80 ? "CRÍTICO" : "NORMAL";
    }

    return "NORMAL";
  }

  unidade() {
    const unidades = {
      TEMPERATURA: "°C",
      PRESSAO: "Bar",
      UMIDADE: "%",
    };

    return unidades[this.tipo] || "";
  }

  icone() {
    const icones = {
      TEMPERATURA: "T",
      PRESSAO: "P",
      UMIDADE: "U",
    };

    return icones[this.tipo] || "S";
  }
}

function salvarLocalStorage() {
  localStorage.setItem(chaveLocal, JSON.stringify(sensores));
}

function carregarLocalStorage() {
  const dadosSalvos = JSON.parse(localStorage.getItem(chaveLocal)) || [];
  sensores = dadosSalvos.map(
    (item) => new Sensor(item.nome, item.tipo, item.valor),
  );
}

function limparFormulario() {
  nomeSensor.value = "";
  valorSensor.value = "";
  previewNome.textContent = "Aguardando cadastro...";
}

function corrigirNome() {
  nomeSensor.value = nomeSensor.value.trim().toUpperCase();
}

function corrigirTipo() {
  tipoSensor.value = tipoSensor.value.trim().toUpperCase();
}

function corrigirValor() {
  valorSensor.value = valorSensor.value.trim();
}

function preVisualizarNome() {
  const texto = nomeSensor.value.trim().toUpperCase();
  previewNome.textContent = texto
    ? `Sensor em edicao: ${texto}`
    : "Aguardando cadastro...";
}

function adicionarSensor() {
  const nome = nomeSensor.value.trim().toUpperCase();
  const tipo = tipoSensor.value.trim().toUpperCase();
  const valor = valorSensor.value.trim();

  if (!nome || !valor) {
    alert("Preencha o nome e o valor medido antes de cadastrar.");
    return;
  }

  const sensor = new Sensor(nome, tipo, valor);
  sensores.push(sensor);
  salvarLocalStorage();
  limparFormulario();
  atualizarPainel();
}

function calcularMediaPorTipo(tipo) {
  const sensoresDoTipo = sensores.filter((sensor) => sensor.tipo === tipo);

  if (sensoresDoTipo.length === 0) {
    return 0;
  }

  const soma = sensoresDoTipo.reduce((total, sensor) => total + sensor.valor, 0);
  return Number((soma / sensoresDoTipo.length).toFixed(2));
}

function atualizarResumo() {
  const criticos = sensores.filter((sensor) => sensor.status() === "CRÍTICO");
  const normais = sensores.filter((sensor) => sensor.status() === "NORMAL");

  totalSensores.textContent = sensores.length;
  totalNormal.textContent = normais.length;
  totalCritico.textContent = criticos.length;
}

function montarCard(sensor) {
  const status = sensor.status();
  const critico = status === "CRÍTICO";

  return `
    <article class="sensor-card ${critico ? "critico" : ""}">
      <div class="sensor-head">
        <div class="sensor-icon">${sensor.icone()}</div>
        <div>
          <h4>${sensor.nome}</h4>
          <p>${sensor.tipo} - ${sensor.criadoEm}</p>
        </div>
      </div>
      <div class="sensor-value">
        <strong>${sensor.valor}${sensor.unidade()}</strong>
        <span class="badge ${critico ? "critico" : ""}">${status}</span>
      </div>
    </article>
  `;
}

function renderizarCards() {
  cardsSensores.innerHTML = "";

  const listaFiltrada =
    filtroAtual === "TODOS"
      ? sensores
      : sensores.filter((sensor) => sensor.tipo === filtroAtual);

  if (listaFiltrada.length === 0) {
    cardsSensores.innerHTML =
      '<p class="empty">Nenhum sensor cadastrado para esta categoria.</p>';
    return;
  }

  listaFiltrada.forEach((sensor) => {
    cardsSensores.innerHTML += montarCard(sensor);
  });
}

function montarGrafico() {
  const medias = [
    calcularMediaPorTipo("TEMPERATURA"),
    calcularMediaPorTipo("PRESSAO"),
    calcularMediaPorTipo("UMIDADE"),
  ];

  if (!graficoMedias) {
    graficoMedias = new Chart(contextoGrafico, {
      type: "bar",
      data: {
        labels: ["Temperatura", "Pressao", "Umidade"],
        datasets: [
          {
            label: "Media operacional",
            data: medias,
            backgroundColor: ["#f97316", "#2563eb", "#14b8a6"],
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    return;
  }

  graficoMedias.data.datasets[0].data = medias;
  graficoMedias.update();
}

function atualizarPainel() {
  atualizarResumo();
  renderizarCards();
  montarGrafico();
}

function filtrarCategoria(categoria) {
  filtroAtual = categoria.trim().toUpperCase();
  filtroResumo.textContent =
    filtroAtual === "TODOS" ? "Todos os dispositivos" : `Filtro: ${filtroAtual}`;
  renderizarCards();
}

function alternarTema() {
  document.body.classList.toggle("dark");
}

function limparSensores() {
  sensores = [];
  salvarLocalStorage();
  atualizarPainel();
}

function carregarExemplos() {
  sensores = [
    new Sensor("TERMOPAR TIPO K - FORNO 01", "TEMPERATURA", 450),
    new Sensor("PRESSAO DIFERENCIAL - TUBULACAO A2", "PRESSAO", 120),
    new Sensor("HIGROMETRO DIGITAL - ALMOXARIFADO", "UMIDADE", 25),
    new Sensor("SENSOR AMBIENTE - SALA DE COMPRESSORES", "TEMPERATURA", 38),
    new Sensor("HIGROMETRO - AREA DE EMBALAGEM", "UMIDADE", 62),
  ];

  salvarLocalStorage();
  atualizarPainel();
}

carregarLocalStorage();

if (sensores.length === 0) {
  carregarExemplos();
} else {
  atualizarPainel();
}
