const STORAGE_KEY = "catalogoFilmesDragonBall";
const SEED_VERSION_KEY = "catalogoFilmesDragonBallSeedV1";

class Filme {
  constructor(titulo, destaque, categoria, minutos, capa, youtubeId, status, descricao) {
    this.id = crypto.randomUUID();
    this.titulo = titulo;
    this.destaque = destaque;
    this.categoria = categoria;
    this.minutos = Number(minutos);
    this.capa = capa;
    this.youtubeId = youtubeId;
    this.status = status;
    this.descricao = descricao;
    this.criadoEm = new Date().toISOString();
  }
}

const filmesIniciais = [
  {
    id: "dragon-ball-super-hero",
    titulo: "Dragon Ball Super: Broly",
    destaque: "Broly",
    categoria: "Filme",
    minutos: 100,
    capa: "https://dba.bn-ent.net/character/images/broly-dbs/portrait.png",
    youtubeId: "Y9qRbQRne20",
    status: "Assistido",
    descricao: "Filme com batalhas saiyajin e visual de Dragon Ball Super.",
    criadoEm: "2026-06-13T00:00:00.000Z",
  },
  {
    id: "dragon-ball-z-battle-of-gods",
    titulo: "Dragon Ball Z: Battle of Gods",
    destaque: "Vegeta",
    categoria: "Filme",
    minutos: 85,
    capa: "https://dba.bn-ent.net/character/images/vegeta-SSGSS/portrait.png",
    youtubeId: "Y9qRbQRne20",
    status: "Assistido",
    descricao: "Filme com deuses, humor e lutas marcantes.",
    criadoEm: "2026-06-13T00:00:00.000Z",
  },
  {
    id: "dragon-ball-z-resurrection-f",
    titulo: "Dragon Ball Z: Resurrection F",
    destaque: "Vilao classico",
    categoria: "Filme",
    minutos: 94,
    capa: "https://m.media-amazon.com/images/S/pv-target-images/2268f9d1ace9169972f860402f793cc0b04fb673363557aeeed3ce5cff62b793._SX1080_FMjpg_.jpg",
    youtubeId: "Y9qRbQRne20",
    status: "Na lista",
    descricao:
      "Um inimigo marcante retorna com um exercito poderoso, elevando a tensao e o ritmo das batalhas.",
    criadoEm: "2026-06-13T00:00:00.000Z",
  },
];

const carregarFilmes = () => {
  const dados = localStorage.getItem(STORAGE_KEY);
  return dados ? JSON.parse(dados) : [];
};

const salvarFilmes = (filmes) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filmes));
};

const iniciarCatalogo = () => {
  if (!localStorage.getItem(SEED_VERSION_KEY)) {
    const filmes = carregarFilmes();
    const filmesSemExemplosAntigos = filmes.filter(
      (filme) => !filmesIniciais.some((exemplo) => exemplo.id === filme.id),
    );

    salvarFilmes([...filmesIniciais, ...filmesSemExemplosAntigos]);
    localStorage.setItem(SEED_VERSION_KEY, "true");
  }
};

const limparYoutubeId = (valor) => {
  const texto = valor.trim();

  if (texto.includes("youtube.com") || texto.includes("youtu.be")) {
    try {
      const url = new URL(texto);
      return url.searchParams.get("v") || url.pathname.split("/").filter(Boolean).pop() || texto;
    } catch {
      return texto;
    }
  }

  return texto;
};

const configurarFormulario = () => {
  const form = document.getElementById("movieForm");
  const feedback = document.getElementById("feedback");

  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const filme = new Filme(
      formData.get("titulo").trim(),
      formData.get("destaque"),
      formData.get("categoria"),
      formData.get("minutos"),
      formData.get("capa").trim(),
      limparYoutubeId(formData.get("youtubeId")),
      formData.get("status"),
      formData.get("descricao").trim(),
    );

    const filmes = carregarFilmes();
    filmes.push(filme);
    salvarFilmes(filmes);

    form.reset();
    feedback.textContent = `${filme.titulo} foi salvo no catalogo.`;
  });
};

const criarCard = (filme) => {
  const article = document.createElement("article");
  article.className = "card";
  const destaque = filme.destaque || filme.personagem || "Dragon Ball";

  const imagem = document.createElement("img");
  imagem.src = filme.capa;
  imagem.alt = `Imagem de capa da obra ${filme.titulo}, categoria ${filme.categoria}`;
  imagem.loading = "lazy";

  const body = document.createElement("div");
  body.className = "card-body";

  const titulo = document.createElement("h2");
  titulo.textContent = filme.titulo;

  const tags = document.createElement("div");
  tags.className = "tags";

  [destaque, filme.categoria, filme.status, `${filme.minutos} min`].forEach((texto) => {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = texto;
    tags.appendChild(tag);
  });

  const descricao = document.createElement("p");
  descricao.textContent = filme.descricao;

  const trailer = document.createElement("div");
  trailer.className = "trailer";

  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube.com/embed/${filme.youtubeId}`;
  iframe.title = `Trailer de ${filme.titulo}`;
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.allowFullscreen = true;
  iframe.loading = "lazy";

  trailer.appendChild(iframe);
  body.append(titulo, tags, descricao, trailer);
  article.append(imagem, body);

  return article;
};

const renderizarCatalogo = () => {
  const catalogo = document.getElementById("catalogo");
  const emptyState = document.getElementById("emptyState");
  const totalObras = document.getElementById("totalObras");
  const totalMinutos = document.getElementById("totalMinutos");
  const totalAssistidos = document.getElementById("totalAssistidos");

  if (!catalogo) return;

  const filmes = carregarFilmes();
  const minutosAssistidos = filmes.reduce((total, filme) => total + Number(filme.minutos || 0), 0);
  const assistidos = filmes.filter((filme) => filme.status === "Assistido").length;

  totalObras.textContent = filmes.length;
  totalMinutos.textContent = minutosAssistidos;
  totalAssistidos.textContent = assistidos;

  catalogo.innerHTML = "";

  filmes.forEach((filme) => {
    catalogo.appendChild(criarCard(filme));
  });

  emptyState.style.display = filmes.length === 0 ? "block" : "none";
};

iniciarCatalogo();
configurarFormulario();
renderizarCatalogo();
