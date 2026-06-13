const STORAGE_KEY = "cinematchDragonBallFilmes";

class Filme {
  constructor(titulo, personagem, categoria, minutos, capa, youtubeId, status, descricao) {
    this.id = crypto.randomUUID();
    this.titulo = titulo;
    this.personagem = personagem;
    this.categoria = categoria;
    this.minutos = Number(minutos);
    this.capa = capa;
    this.youtubeId = youtubeId;
    this.status = status;
    this.descricao = descricao;
    this.criadoEm = new Date().toISOString();
  }
}

const carregarFilmes = () => {
  const dados = localStorage.getItem(STORAGE_KEY);
  return dados ? JSON.parse(dados) : [];
};

const salvarFilmes = (filmes) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filmes));
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
      formData.get("personagem"),
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

  const imagem = document.createElement("img");
  imagem.src = filme.capa;
  imagem.alt = `Capa da obra ${filme.titulo}, com destaque para ${filme.personagem}`;
  imagem.loading = "lazy";

  const body = document.createElement("div");
  body.className = "card-body";

  const titulo = document.createElement("h2");
  titulo.textContent = filme.titulo;

  const tags = document.createElement("div");
  tags.className = "tags";

  [filme.personagem, filme.categoria, filme.status, `${filme.minutos} min`].forEach((texto) => {
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

configurarFormulario();
renderizarCatalogo();
