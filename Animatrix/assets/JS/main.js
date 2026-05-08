// CARREGAR JSON
async function carregarAnimes(){

    const resposta = await fetch("animes.json");

    animes = await resposta.json();

    renderizarCards();
}


// RENDERIZAR CARDS
function renderizarCards(){

    const catalogo = document.getElementById("catalogo");

    catalogo.innerHTML = "";

    animes.forEach((anime, index) => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `

            <img src="${anime.imagem}">

            <div class="info">

                <h2>${anime.nome}</h2>

                <p>⭐ ${anime.nota}</p>

                <p>${anime.genero}</p>

            </div>

        `;

        card.onclick = () => abrirModal(index);

        catalogo.appendChild(card);

    });

}



function abrirModal(index){

    const anime = animes[index];

    // PEGA IDADE
    const idadeUsuario = Number(
        document.getElementById("idadeUsuario").value
    );


    // VERIFICA CLASSIFICAÇÃO
    if(idadeUsuario < anime.censura){

        mostrarNotificacao(
            `🚫 Você não pode acessar "${anime.nome}". 
             Classificação indicativa: ${anime.censura}+`
        );

        return;
    }


    const modal = document.getElementById("modal");

    const conteudo = document.getElementById("conteudoModal");

    conteudo.innerHTML = `

        <h1>${anime.nome}</h1>

        <img src="${anime.imagem}">

        <p><strong>Gênero:</strong> ${anime.genero}</p>

        <p><strong>Nota:</strong> ${anime.nota}</p>

        <p><strong>Resumo:</strong> ${anime.resumo}</p>

        <p><strong>Curiosidade:</strong> ${anime.curiosidade}</p>

        <iframe
            src="${anime.video}"
            allowfullscreen>
        </iframe>

        <audio controls>
            <source src="${anime.musica}" type="audio/mpeg">
        </audio>

    `;

    modal.style.display = "flex";
}


// FECHAR MODAL
function fecharModal(){

    document.getElementById("modal").style.display = "none";
}

function mostrarNotificacao(texto){

    const notificacao = document.createElement("div");

    notificacao.className = "notificacao";

    notificacao.innerHTML = texto;

    document.body.appendChild(notificacao);


    setTimeout(() => {

        notificacao.classList.add("mostrar");

    }, 100);


    setTimeout(() => {

        notificacao.classList.remove("mostrar");

        setTimeout(() => {

            notificacao.remove();

        }, 500);

    }, 4000);

}

// INICIAR
carregarAnimes();