let emergenciaAtivada = false;
let tempoPerigo = 0;

// Função chamada ao clicar no botão Entrar
function entrarSistema() {
    const nomeOperador = document.getElementById("nomeOperador").value.trim();

    validarAcesso(nomeOperador);
}

// Valida o nome do operador usando if/else
function validarAcesso(nome) {
    const mensagemAcesso = document.getElementById("mensagemAcesso");
    const painelControle = document.getElementById("painelControle");

    if (nome === "") {
        mensagemAcesso.textContent = "Erro: informe o nome do operador.";
        mensagemAcesso.className = "erro";
        painelControle.classList.add("oculto");
    } else {
        mensagemAcesso.textContent = `Acesso liberado. Bem-vindo, ${nome}!`;
        mensagemAcesso.className = "sucesso";
        painelControle.classList.remove("oculto");

        gerarListaMaquinas();
    }
}

// Gera 5 máquinas no select usando laço for
function gerarListaMaquinas() {
    const listaMaquinas = document.getElementById("listaMaquinas");

    listaMaquinas.innerHTML = "";

    const maquinas = ["Prensa", "Torno", "CNC", "Esteira", "Compressor"];

    for (let i = 0; i < maquinas.length; i++) {
        const opcao = document.createElement("option");
        opcao.value = maquinas[i];
        opcao.textContent = `${maquinas[i]} ${i + 1}`;
        listaMaquinas.appendChild(opcao);
    }

    mostrarStatusMaquina();
}

// Mostra o status da máquina selecionada
function mostrarStatusMaquina() {
    if (emergenciaAtivada) {
        return;
    }

    const maquinaSelecionada = document.getElementById("listaMaquinas").value;
    const status = verificarStatus(maquinaSelecionada);

    document.getElementById("statusMaquina").textContent = status;
}

// Verifica o status usando switch
function verificarStatus(maquina) {
    switch (maquina) {
        case "Prensa":
            return "Prensa em operação normal.";

        case "Torno":
            return "Torno com manutenção necessária.";

        case "CNC":
            return "CNC em alta produtividade.";

        case "Esteira":
            return "Esteira desligada temporariamente.";

        case "Compressor":
            return "Compressor em modo de espera.";

        default:
            return "Máquina não identificada.";
    }
}

// Simula o sensor térmico
function monitorarSensor() {
    if (emergenciaAtivada) {
        return;
    }

    const temperatura = Math.floor(Math.random() * 101);
    const visorTemperatura = document.getElementById("temperatura");
    const statusSensor = document.getElementById("statusSensor");

    visorTemperatura.textContent = temperatura;

    statusSensor.className = "";

    if (temperatura < 50) {
        statusSensor.textContent = "Normal";
        statusSensor.classList.add("normal");
        tempoPerigo = 0;
    } else if (temperatura >= 50 && temperatura <= 80) {
        statusSensor.textContent = "Alerta";
        statusSensor.classList.add("alerta");
        tempoPerigo = 0;
    } else {
        statusSensor.textContent = "PERIGO - SUPERAQUECIMENTO";
        statusSensor.classList.add("perigo");

        verificarEmergencia(temperatura);
    }
}

// Desafio extra: botão/parada de emergência automática
function verificarEmergencia(temperatura) {
    if (temperatura > 95) {
        tempoPerigo += 2;

        if (tempoPerigo >= 6) {
            emergenciaAtivada = true;

            alert("PARADA DE EMERGÊNCIA ATIVADA!");

            document.getElementById("statusMaquina").textContent =
                "Sistema bloqueado por emergência.";

            document.getElementById("statusSensor").textContent =
                "PAINEL BLOQUEADO - REINICIE A PÁGINA";

            document.getElementById("statusSensor").className = "perigo";
            document.getElementById("listaMaquinas").disabled = true;
        }
    } else {
        tempoPerigo = 0;
    }
}

// Atualiza o sensor automaticamente a cada 2 segundos
setInterval(monitorarSensor, 2000);