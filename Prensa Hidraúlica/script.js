const API_SENSOR_URL = "https://jsonplaceholder.typicode.com/todos/1";
const API_FALHA_URL = "https://api.inexistente.com/prensa-h5";
const FATOR_PRESSAO = 42;
const PRESSAO_MAXIMA = 100;
const LIMITE_CRITICO = 70;

const displayPressao = document.getElementById("displayPressao");
const loadingSpinner = document.getElementById("loadingSpinner");
const loadingText = document.getElementById("loadingText");
const alertaErro = document.getElementById("alertaErro");
const mensagemErro = document.getElementById("mensagemErro");
const barraPressao = document.getElementById("barraPressao");
const percentualPressao = document.getElementById("percentualPressao");
const statusBadge = document.getElementById("statusBadge");
const btnSincronizar = document.getElementById("btnSincronizar");
const btnFalha = document.getElementById("btnFalha");
const sensorDot = document.querySelector(".sensor-dot");
const progressContainer = document.querySelector(".pressure-progress");

function prepararInterface() {
  loadingSpinner.classList.remove("d-none");
  loadingText.textContent = "Sincronizando dados do sensor...";
  alertaErro.classList.add("d-none");

  displayPressao.classList.add("syncing");
  displayPressao.classList.remove("online", "critical", "offline");

  statusBadge.className = "badge rounded-pill text-bg-warning";
  statusBadge.textContent = "PENDENTE";

  sensorDot.classList.remove("online", "offline");
  btnSincronizar.disabled = true;
  btnFalha.disabled = true;
}

function calcularPercentual(pressao) {
  return Math.min(Math.round((pressao / PRESSAO_MAXIMA) * 100), 100);
}

function atualizarBarra(pressao) {
  const percentual = calcularPercentual(pressao);

  barraPressao.style.width = `${percentual}%`;
  barraPressao.classList.remove("bg-success", "bg-warning", "bg-danger");
  progressContainer.setAttribute("aria-valuenow", String(percentual));
  percentualPressao.textContent = `${percentual}%`;

  if (pressao >= LIMITE_CRITICO) {
    barraPressao.classList.add("bg-danger");
    return "CRITICO";
  }

  if (pressao >= 50) {
    barraPressao.classList.add("bg-warning");
    return "ATENCAO";
  }

  barraPressao.classList.add("bg-success");
  return "ONLINE";
}

function atualizarSucesso(pressao) {
  const statusOperacional = atualizarBarra(pressao);

  displayPressao.textContent = `${pressao.toFixed(1)} BAR`;
  displayPressao.classList.remove("syncing", "offline");
  displayPressao.classList.add(statusOperacional === "CRITICO" ? "critical" : "online");

  statusBadge.textContent = statusOperacional;
  statusBadge.className = statusOperacional === "CRITICO"
    ? "badge rounded-pill text-bg-danger"
    : statusOperacional === "ATENCAO"
      ? "badge rounded-pill text-bg-warning"
      : "badge rounded-pill text-bg-success";

  sensorDot.classList.add("online");
  sensorDot.classList.remove("offline");
  loadingText.textContent = "Sensor sincronizado com sucesso";
}

function atualizarErro(erro) {
  displayPressao.textContent = "OFFLINE";
  displayPressao.classList.remove("syncing", "online", "critical");
  displayPressao.classList.add("offline");

  barraPressao.style.width = "100%";
  barraPressao.classList.remove("bg-success", "bg-warning");
  barraPressao.classList.add("bg-danger");
  progressContainer.setAttribute("aria-valuenow", "100");
  percentualPressao.textContent = "ERRO";

  statusBadge.className = "badge rounded-pill text-bg-danger";
  statusBadge.textContent = "OFFLINE";

  sensorDot.classList.remove("online");
  sensorDot.classList.add("offline");

  mensagemErro.textContent = erro.message;
  alertaErro.classList.remove("d-none");
  loadingText.textContent = "Comunicacao interrompida";
}

async function buscarComTimeout(url) {
  const controlador = new AbortController();
  const timeoutId = setTimeout(() => controlador.abort(), 6000);

  try {
    return await fetch(url, { signal: controlador.signal });
  } finally {
    clearTimeout(timeoutId);
  }
}

async function monitorarPressao(url = API_SENSOR_URL) {
  prepararInterface();

  try {
    const resposta = await buscarComTimeout(url);

    if (!resposta.ok) {
      throw new Error(`Servidor respondeu com status ${resposta.status}. Acione a manutencao.`);
    }

    const dados = await resposta.json();
    const pressao = Number(dados.id) * FATOR_PRESSAO;

    if (!Number.isFinite(pressao)) {
      throw new Error("Leitura invalida recebida do sensor.");
    }

    atualizarSucesso(pressao);
  } catch (erro) {
    const mensagem = erro.name === "AbortError"
      ? "Tempo limite excedido. Verifique a rede da prensa."
      : `Falha ao acessar o sensor: ${erro.message}`;

    atualizarErro(new Error(mensagem));
  } finally {
    loadingSpinner.classList.add("d-none");
    displayPressao.classList.remove("syncing");
    btnSincronizar.disabled = false;
    btnFalha.disabled = false;
  }
}

btnSincronizar.addEventListener("click", () => monitorarPressao());
btnFalha.addEventListener("click", () => monitorarPressao(API_FALHA_URL));

monitorarPressao();
