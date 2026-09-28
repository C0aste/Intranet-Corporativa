let _autoRefresh = false;

const menuItems = [
  {
    title: "Sistemas",
    icon: "../images/intranet/sistemas.png",
    items: [
      { text: "Página Inicial", href: "dashboard.html" },
      { text: "Indicadores", href: "indicadores.html" },
    ],
  },

  {
    title: "Informatica/TI/Sistemas",
    icon: "../images/intranet/operacional.png",
    items: [
      // SUBMENU MANUAIS
      {
        text: "Manuais",
        submenu: [
          {
            text: "Movimentação de Ativos",
            href: "../manuais/MANUAL - MOVIMENTACAO DE ATIVO.pdf",
          }
        ],
      },
    ],
  },

  {
    title: "Departamento Pessoal",
    icon: "../images/intranet/pessoal.png",
    items: [
      { text: "Todas as notícias", href: "noticias.html" },
    ],
  },

  {
    title: "LGPD",
    icon: "../images/intranet/lgpd.png",
    items: [
      { text: "Todas as notícias", href: "noticias.html" },
    ],
  },
];

function renderMenu() {
  const menu = document.getElementById("menu");
  menu.innerHTML = "";

  menuItems.forEach((group, index) => {
    const container = document.createElement("div");

    container.className =
      "mb-2 overflow-hidden rounded-3xl border border-white/40 bg-white/40 backdrop-blur-md";

    const header = document.createElement("button");

    header.className =
      "flex w-full items-center justify-between px-5 py-4 transition hover:bg-white/50";

    header.innerHTML = `
      <div class="flex items-center gap-3">
        <img src="${group.icon}" class="w-7 h-7">
        <span class="font-medium">${group.title}</span>
      </div>

      <svg id="arrow-${index}"
           class="w-4 h-4 transition-transform duration-300"
           viewBox="0 0 20 20"
           fill="currentColor">

        <path fill-rule="evenodd"
              d="M6.23 7.21a.75.75 0 011.06.02L10 10.17l2.71-2.94a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.02-1.06z"
              clip-rule="evenodd"/>
      </svg>
    `;

    const body = document.createElement("div");

    body.className = "hidden px-3 pb-3 space-y-1";

    group.items.forEach((item, itemIndex) => {

      // ==========================================
      // ITEM NORMAL
      // ==========================================
      if (item.href) {
        const link = document.createElement("a");

        link.href = item.href;
        link.textContent = item.text;

        link.className =
          "block rounded-2xl px-4 py-3 text-sm text-zinc-600 transition hover:bg-white hover:text-zinc-900";

        body.appendChild(link);
      }

      // ==========================================
      // ITEM COM SUBMENU
      // ==========================================
      else if (item.submenu) {

        const submenuContainer = document.createElement("div");

        submenuContainer.className =
          "rounded-2xl overflow-hidden";

        const submenuButton = document.createElement("button");

        submenuButton.className =
          "flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm text-zinc-600 transition hover:bg-white hover:text-zinc-900";

        submenuButton.innerHTML = `
          <span class="flex items-center gap-2">
            <span>📚</span>
            <span>${item.text}</span>
          </span>

          <svg id="submenu-arrow-${index}-${itemIndex}"
               class="w-4 h-4 transition-transform duration-300"
               viewBox="0 0 20 20"
               fill="currentColor">

            <path fill-rule="evenodd"
                  d="M6.23 7.21a.75.75 0 011.06.02L10 10.17l2.71-2.94a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd"/>
          </svg>
        `;

        const submenu = document.createElement("div");

        submenu.className =
          "hidden ml-4 mt-1 space-y-1 border-l border-zinc-300/50 pl-2";

        item.submenu.forEach((subitem) => {

          const sublink = document.createElement("a");

          sublink.href = subitem.href;
          sublink.textContent = subitem.text;

          // Abre o PDF em uma nova aba
          sublink.target = "_blank";
          sublink.rel = "noopener noreferrer";

          sublink.className =
            "block rounded-xl px-4 py-2.5 text-sm text-zinc-500 transition hover:bg-white hover:text-zinc-900";

          submenu.appendChild(sublink);
        });

        submenuButton.onclick = () => {
          submenu.classList.toggle("hidden");

          document
            .getElementById(`submenu-arrow-${index}-${itemIndex}`)
            .classList.toggle("rotate-180");
        };

        submenuContainer.appendChild(submenuButton);
        submenuContainer.appendChild(submenu);

        body.appendChild(submenuContainer);
      }
    });

    // ==========================================
    // ABRIR/FECHAR GRUPO PRINCIPAL
    // ==========================================
    header.onclick = () => {
      body.classList.toggle("hidden");

      document
        .getElementById(`arrow-${index}`)
        .classList.toggle("rotate-180");
    };

    container.append(header, body);

    menu.appendChild(container);
  });
}

const manutencao = {
  CD: false,
  GD: false,
  CR: false
};


function le_sessao() {
  const chave = JSON.parse(localStorage.getItem("chave"));

  if (!chave) {
    window.open("index.php", "_self");
    return;
  }

  const codUsuario = chave.dados[0].CODUSUARIO;
  const envio = "codusuario=" + codUsuario;

  $("#usuario").html(chave.dados[0].NOME);

  function carregarAppsManuais() {

    const extras = [
      { nome: "SAP", cod: "http://portalsap.novario.com.br:7070" },
      { nome: "People Starsoft", cod: "https://rhportal.novario.com.br/login" },
      { nome: "StarSoft", cod: "http://172.19.45.18" },
      { nome: "MDesk", cod: "https://mdesk.novario.com.br" },
      { nome: "HELP DP", cod: "https://helpdp.novario.com.br" },
      { nome: "SAC", cod: "https://sac.novario.com.br" },
      { nome: "NRnet", cod: "http://nrnet.novario.com.br:8084/" },
      { nome: "Help Desk", cod: "https://helpdesk.novario.com.br/" },
      {
        nome: "Planner",
        cod: "http://tasks.office.com/novario.com.br/pt-PT/Home/Planner/#/plantaskboard?groupId=5c30ca9b-324b-44ed-af40-2d19910107fc&planId=1lozlMq_gUuuP8fONZXssWQAHaGE",
      },
      {
        nome: "Legnet",
        cod: "https://www.legnet.com.br/legnet/login.php?_gl=1*qyunnk*_gcl_au*MTIyMzIwNTkxOS4xNzY4MjE2NDk1*_ga*MTkwOTMyNTg1NS4xNzYwMzU3OTQx*_ga_ZM9S7XX8WC*czE3NjkxODg4MTgkbzEyJGcwJHQxNzY5MTg4ODE4JGo2MCRsMCRoMA",
      },
    ];

    extras.forEach((extra) => {

      $("#quadroapps").append(`
        <div class="group bg-white/60 backdrop-blur-xl
                    border border-gray-200/60
                    rounded-2xl
                    shadow-[0_6px_20px_rgba(0,0,0,.08)]
                    hover:shadow-[0_10px_30px_rgba(0,0,0,.12)]
                    transition-all duration-300
                    hover:-translate-y-1 hover:scale-[1.02]">

          <a target="_blank"
             href="${extra.cod}"
             class="flex flex-col items-center text-center p-5">

            <img
              class="w-12 h-12 object-contain mb-3 transition-transform duration-300 group-hover:scale-110"
              src="apps/${extra.nome}.png">

            <span class="text-sm font-medium text-gray-700 tracking-tight">
              ${extra.nome}
            </span>

          </a>

        </div>
      `);

    });

  }

  $.post(
    "https://novariosg.ddns.net:8086/api/ca/apps/",
    envio,
    function (resposta) {

      $("#quadroapps").empty();
      $("#quadroappsmobile").empty();

      if (resposta.result == "200") {

        let apps = "";

        resposta.dados.forEach((item) => {

          if (!item.Imagem || item.Imagem.trim() === "")
            return;

          const acesso =
            item.SISTEMA === "AP"
              ? item.Acesso + "/menu.php"
              : item.Acesso + "/painel.php";

          const link = manutencao[item.SISTEMA]
            ? "error.php"
            : `https://novariosg.ddns.net:8086/${acesso}`;

          apps += `
            <div class="group bg-white/60 backdrop-blur-xl
                        border border-gray-200/60
                        rounded-2xl
                        shadow-[0_6px_20px_rgba(0,0,0,.08)]
                        hover:shadow-[0_12px_35px_rgba(0,0,0,.12)]
                        transition-all duration-300
                        hover:-translate-y-1 hover:scale-[1.02]">

              <a target="_blank"
                 href="${link}"
                 class="flex flex-col items-center text-center p-5">

                <img
                  class="w-12 h-12 object-contain mb-3 transition-transform duration-300 group-hover:scale-110"
                  src="http://${item.Imagem}">

                <span class="text-sm font-medium text-gray-700 tracking-tight">
                  ${item.DESCRICAO}
                </span>

              </a>

            </div>
          `;

        });

        $("#quadroapps").append(apps);

      }

      carregarAppsManuais();

    }

  ).fail(function () {

    $("#quadroapps").empty();

    carregarAppsManuais();

  });

  $.post(
    "https://novariosg.ddns.net:8086/api/ca/apps/geral/",
    function (resposta) {

      if (resposta.result != "200")
        return;

      let html = "";

      resposta.dados.forEach((item) => {

        html += `
          <a onclick="abrirExemplo('${item.SISTEMA}')"
             class="block py-2 px-4 text-gray-800 hover:bg-gray-100">

            ${item.DESCRICAO}

          </a>
        `;

      });

      $("#hubapps").html(html);

    }
  );

  carregarApps();

  le_noticias("");

  le_campanhas("");

  if (!_autoRefresh) {

    _autoRefresh = true;

    setInterval(function () {

      console.log("🔄 Atualizando dashboard...");

      le_sessao();

    }, 3600000);

  }

}
function carregarApps() {
  $.post(
    "https://novariosg.ddns.net:8086/api/ca/apps/buscaorigem/",
    function (resposta) {
      if (resposta.result == 200) {
        // Mapa de origem → IDs dos menus (desktop + mobile)
        let mapa = {
          global: ["menu-global", "menu-global-mobile"],
          ti: ["menu-ti", "menu-ti-mobile"],
          operacional: ["menu-operacional", "menu-operacional-mobile"],
          juridico: ["menu-juridico", "menu-juridico-mobile"],
          qualidade: ["menu-qualidade", "menu-qualidade-mobile"],
          sesmt: ["menu-sesmt", "menu-sesmt-mobile"],
          dp: ["menu-dp", "menu-dp-mobile"],
          departamentopessoal: ["menu-dp", "menu-dp-mobile"],
          marketing: ["menu-marketing", "menu-marketing-mobile"],
          treinamento: ["menu-treinamento", "menu-treinamento-mobile"],
          comercial: ["menu-comercial", "menu-comercial-mobile"],
          lgpd: ["menu-lgpd", "menu-lgpd-mobile"],
        };

        // Limpa todos os menus antes de injetar
        Object.values(mapa).forEach(([desktopId, mobileId]) => {
          $(`#${desktopId}`).empty();
          $(`#${mobileId}`).empty();
        });
        // ✅ Adiciona manualmente apps fixos no menu DP (desktop + mobile)
        const appsFixosDP = [
          {
            nome: "Call Center",
            sistema: "http://callcenter.novario.com.br/",
          },
        ];

        appsFixosDP.forEach((app) => {
          const linkHTML = `
            <a target="_blank" href="${app.sistema}"
              class="block px-3 py-2 rounded-lg text-sm text-gray-700 
                      hover:bg-gray-100/70 hover:backdrop-blur 
                      transition-all duration-200">
              ${app.nome}
            </a>
          `;

          $("#menu-dp").append(linkHTML);
          $("#menu-dp-mobile").append(linkHTML);
        });
        // ✅ Adiciona manualmente SAP e People no menu-global (desktop + mobile)
        const appsFixos = [
          { nome: "SAP", sistema: "http://portalsap.novario.com.br:7070" },
          {
            nome: "People StarSoft",
            sistema: "https://rhportal.novario.com.br/login",
          },
          { nome: "StarSoft", sistema: "http://172.19.45.18" },
          {
            nome: "Planner",
            sistema:
              "tasks.office.com/novario.com.br/pt-PT/Home/Planner/#/plantaskboard?groupId=5c30ca9b-324b-44ed-af40-2d19910107fc&planId=1lozlMq_gUuuP8fONZXssWQAHaGE",
          },
          {
            nome: "Legnet",
            sistema:
              "https://www.legnet.com.br/legnet/login.php?_gl=1*qyunnk*_gcl_au*MTIyMzIwNTkxOS4xNzY4MjE2NDk1*_ga*MTkwOTMyNTg1NS4xNzYwMzU3OTQx*_ga_ZM9S7XX8WC*czE3NjkxODg4MTgkbzEyJGcwJHQxNzY5MTg4ODE4JGo2MCRsMCRoMA",
          },
        ];

        appsFixos.forEach((app) => {
          const linkHTML = `
          <a target="_blank" href="${app.sistema}"
            class="block px-3 py-2 rounded-lg text-sm text-gray-700 
                    hover:bg-gray-100/70 hover:backdrop-blur 
                    transition-all duration-200">
            ${app.nome}
          </a>
        `;

          $("#menu-global").append(linkHTML);
          $("#menu-global-mobile").append(linkHTML);
        });

        // ✅ Adiciona manualmente SAP e People no menu-global (desktop + mobile)
        const appsFixosOperacional = [
          { nome: "MDesk", sistema: "http://mdesk.novario.com.br:9090" },
        ];

        appsFixosOperacional.forEach((app) => {
          const linkHTML = `
          <a target="_blank" href="${app.sistema}"
            class="block px-3 py-2 rounded-lg text-sm text-gray-700 
                    hover:bg-gray-100/70 hover:backdrop-blur 
                    transition-all duration-200">
            ${app.nome}
          </a>
        `;

          $("#menu-operacional").append(linkHTML);
          $("#menu-operacional-mobile").append(linkHTML);
        });

        // ✅ Adiciona apps vindos da API
        resposta.dados.forEach((item) => {
          let origem = item.ORIGEM.toLowerCase();
          let destino = mapa[origem];

          if (destino) {
            const [desktopId, mobileId] = destino;
            const link = `
              <div onclick="abrirExemplo('${item.SISTEMA}')"
                  class="block px-3 py-2 rounded-lg text-sm text-gray-700
                          hover:bg-gray-100/70 hover:backdrop-blur
                          transition-all duration-200 cursor-pointer">
                ${item.NMAPP}
              </div>
            `;
            $(`#${desktopId}`).append(link);
            $(`#${mobileId}`).append(link);
          }
        });
      } else {
        console.warn("Nenhuma aplicação encontrada.");
      }
    },
  );
}

// ======================
// NOTÍCIAS
// ======================

function le_noticias(busca = "") {
  $.post(
    "https://novariosg.ddns.net:8086/api/in/v1/noticias/",
    { busca: busca },
    function (resposta) {
      if (resposta.result != "200") return;

      let html = "";

      resposta.dados.forEach((item) => {
        html += `
        <div onclick="verNoticia(${item.IDNOTICIA})"
          class="group flex gap-4 p-4 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">

          <!-- IMAGE -->
          <div class="relative shrink-0">
            <img
              src="../../nrnoticias/noticias/${item.IDNOTICIA}.png"
              class="w-32 h-28 rounded-2xl object-cover">

            <!-- subtle overlay -->
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/10 to-transparent opacity-60 group-hover:opacity-40 transition"></div>
          </div>

          <!-- CONTENT -->
          <div class="flex flex-col justify-between min-w-0">

            <div>
              <h3 class="text-[15px] font-semibold text-zinc-900 leading-snug group-hover:text-black transition line-clamp-2">
                ${item.TITULO}
              </h3>

              <p class="text-sm text-zinc-500 mt-1 line-clamp-2">
                ${item.RESUMO}
              </p>
            </div>

            <div class="flex items-center justify-between mt-3">

              <p class="text-[11px] text-zinc-400 tracking-wide">
                ${formatDataBR(item.PUBLICADOEM)}
              </p>

              <div class="opacity-0 group-hover:opacity-100 transition text-xs text-emerald-600 font-medium">
                Ler →
              </div>

            </div>

          </div>

        </div>
        `;
      });

      $("#Qnoticias").html(html);
    },
  );
}

// ======================
// CAMPANHAS / CARROSSEL
// ======================

let campanhas = [];
let slideAtual = 0;
let intervaloCarousel;

// ======================
// LER CAMPANHAS
// ======================

function le_campanhas(busca = "") {
  $.post(
    "https://novariosg.ddns.net:8086/api/in/v1/campanhas/",
    "busca=" + busca,
    function (resposta) {
      if (resposta.result != "200") return;

      campanhas = resposta.dados;

      renderCarousel();

      iniciarCarousel();
    },
  );
}

// ======================
// RENDER CARROSSEL
// ======================

function renderCarousel() {
  let slides = "";
  let dots = "";

  campanhas.forEach((item, index) => {
    slides += `
      <div
        onclick="verCampanha(${item.IDNOTICIA})"
        class="slide absolute inset-0 transition-all duration-700 ease-out
        ${index === 0 ? "opacity-100 scale-100 z-10" : "opacity-0 scale-[1.02] z-0"}">

        <!-- IMAGE -->
        <img
          src="../../nrnoticias/noticias/campanha/${item.IDNOTICIA}.png"
          class="w-full h-full object-cover">

        <!-- APPLE STYLE OVERLAY -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

        <!-- subtle green atmospheric glow -->
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,128,83,0.18),transparent_60%)]"></div>

        <!-- CONTENT -->
        <div class="absolute bottom-0 left-0 right-0 p-8">

          <div class="max-w-2xl backdrop-blur-md bg-black/10 border border-white/10 rounded-2xl p-5">

            <h1 class="text-3xl md:text-4xl font-semibold text-white leading-tight">
              ${item.TITULO}
            </h1>

            <p class="text-white/80 mt-2 text-sm md:text-base line-clamp-2">
              ${item.RESUMO}
            </p>

          </div>

        </div>

      </div>
    `;

    dots += `
      <button
        onclick="irParaSlide(${index})"
        class="dot transition-all duration-300 rounded-full
        ${
          index === 0
            ? "w-6 h-2 bg-white"
            : "w-2 h-2 bg-white/40 hover:bg-white/70"
        }">
      </button>
    `;
  });

  $("#carouselCampanhas").html(slides);
  $("#carouselDots").html(dots);
}

function mostrarSlide(index) {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");

  slides.forEach((slide, i) => {
    slide.classList.toggle("opacity-100", i === index);
    slide.classList.toggle("z-10", i === index);
    slide.classList.toggle("opacity-0", i !== index);
    slide.classList.toggle("scale-100", i === index);
    slide.classList.toggle("scale-[1.02]", i !== index);
  });

  dots.forEach((dot, i) => {
    if (i === index) {
      dot.className =
        "dot w-6 h-2 bg-white rounded-full transition-all duration-300";
    } else {
      dot.className =
        "dot w-2 h-2 bg-white/40 hover:bg-white/70 rounded-full transition-all duration-300";
    }
  });

  slideAtual = index;
}

function iniciarCarousel() {
  clearInterval(intervaloCarousel);

  intervaloCarousel = setInterval(() => {
    let next = slideAtual + 1;

    if (next >= campanhas.length) next = 0;

    mostrarSlide(next);
  }, 6000);
}
// ======================
// TROCAR SLIDE
// ======================

function atualizarSlides() {
  $(".slide").removeClass("opacity-100 z-10").addClass("opacity-0 z-0");

  $(".slide")
    .eq(slideAtual)
    .removeClass("opacity-0 z-0")
    .addClass("opacity-100 z-10");

  $(".dot").removeClass("bg-white w-6").addClass("bg-white/50 w-2.5");

  $(".dot")
    .eq(slideAtual)
    .removeClass("bg-white/50 w-2.5")
    .addClass("bg-white w-6");
}

// ======================
// NEXT / PREV
// ======================

function mudarSlide(direcao) {
  slideAtual += direcao;

  if (slideAtual >= campanhas.length) slideAtual = 0;
  if (slideAtual < 0) slideAtual = campanhas.length - 1;

  atualizarSlides();
}

// ======================
// IR PARA SLIDE
// ======================

function irParaSlide(index) {
  slideAtual = index;

  atualizarSlides();
}

// ======================
// AUTO PLAY
// ======================

function iniciarCarousel() {
  clearInterval(intervaloCarousel);

  intervaloCarousel = setInterval(() => {
    mudarSlide(1);
  }, 6000);
}

function verNoticia(x) {
  $("#capsulaform").empty();

  $.post(
    "https://novariosg.ddns.net:8086/api/in/v1/noticias/busca/",
    "busca=" + x,
    function (resposta) {
      if (resposta.result == "200") {
        const item = resposta.dados[0];

        let Vform = `
          <div id="formTabela" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">

            <!-- modal white (iOS sheet) -->
            <div class="w-full max-w-4xl max-h-[90vh] flex flex-col bg-white rounded-[28px] shadow-[0_30px_90px_rgba(0,0,0,0.25)] overflow-hidden">

              <!-- header -->
              <div class="flex items-center justify-between px-6 py-4 border-b border-zinc-200 bg-white">

                <div class="flex items-center gap-2">
                  <div class="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <span class="text-sm font-medium text-zinc-700">Notícia</span>
                </div>

                <button onclick="$('#formTabela').remove();"
                  class="w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200
                         flex items-center justify-center transition">
                  ✕
                </button>
              </div>

              <!-- content -->
              <div class="p-8 overflow-y-auto flex-1 space-y-6">

                <h1 class="text-3xl md:text-4xl font-semibold text-zinc-900 text-center leading-tight">
                  ${item.TITULO}
                </h1>

                <p class="text-center text-zinc-600 max-w-2xl mx-auto">
                  ${item.RESUMO}
                </p>

                <p class="text-center text-xs text-zinc-400">
                  Publicado em ${item.PUBLICADOEM}
                </p>

                <div class="flex justify-center">
                  <img src="../../nrnoticias/noticias/${item.IDNOTICIA}.png"
                    class="rounded-xl shadow-md w-full max-w-[620px] object-cover">
                </div>

                <div class="text-zinc-800 text-[15px] leading-relaxed text-justify max-w-3xl mx-auto">
                  ${item.NOTICIA}
                </div>

              </div>
            </div>
          </div>
        `;

        $("#capsulaform").html(Vform);
      }
    },
  );
}

function verCampanha(x) {
  $("#capsulaform").empty();

  $.post(
    "https://novariosg.ddns.net:8086/api/in/v1/campanhas/busca/",
    "busca=" + x,
    function (resposta) {
      if (resposta.result == "200") {
        const item = resposta.dados[0];

        let Vform = `
          <div id="formTabela" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">

            <div class="w-full max-w-4xl max-h-[90vh] flex flex-col bg-white rounded-[28px] shadow-[0_30px_90px_rgba(0,0,0,0.25)] overflow-hidden">

              <!-- header -->
              <div class="flex justify-between items-center px-6 py-4 border-b border-zinc-200 bg-white">

                <span class="text-sm font-medium text-zinc-700">Campanha</span>

                <button onclick="$('#formTabela').remove();"
                  class="w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center">
                  ✕
                </button>

              </div>

              <!-- content -->
              <div class="p-8 space-y-6 overflow-y-auto flex-1">

                <h1 class="text-4xl font-semibold text-center text-zinc-900">
                  ${item.TITULO}
                </h1>

                <p class="text-center text-zinc-600 max-w-2xl mx-auto">
                  ${item.RESUMO}
                </p>

                <p class="text-center text-xs text-zinc-400">
                  Publicado em ${item.PUBLICADOEM}
                </p>

                <div class="flex justify-center">
                  <img src="../../nrnoticias/noticias/campanha/${item.IDNOTICIA}.png"
                    class="rounded-xl shadow-md w-full max-w-[600px] object-cover">
                </div>

                <div class="text-zinc-800 text-[15px] leading-relaxed text-justify max-w-3xl mx-auto">
                  ${item.NOTICIA}
                </div>

              </div>
            </div>
          </div>
        `;

        $("#capsulaform").html(Vform);
      }
    },
  );
}

function abrirExemplo(x) {
  $("#capsulaform").load("formapp.php");
  setTimeout(() => {
    alimentaApp(x);
  }, 100);
}

function alimentaApp(x) {
  let envio = "sistema=" + x;
  $.post(
    "https://novariosg.ddns.net:8086/api/ca/apps/buscapp/",
    envio,
    function (resposta) {
      if (resposta.result == "200") {
        resposta["dados"].forEach((item) => {
          let infoApp = `
					<div class="flex items-center gap-4 p-4 rounded-xl bg-white shadow-sm 
						hover:shadow-md transition-all duration-300 ease-out 
						transform hover:-translate-y-1 hover:scale-[1.02]">
						
						<!-- Imagem -->
						<div class="overflow-hidden rounded-lg">
							<img src="apps/${item.CODAPP}.png" 
								alt="App ${item.NMAPP}" 
								class="w-14 h-14 rounded-lg object-cover 
									transform hover:scale-110 transition duration-500 ease-in-out" />
						</div>

						<!-- Texto -->
						<div class="flex flex-col">
							<p class="text-lg font-semibold text-gray-800 
								group-hover:text-indigo-600 transition-colors duration-300">
								${item.NMAPP}
							</p>
							<span class="text-sm text-gray-500">Aplicação corporativa</span>
						</div>
					</div>
				`;
          let descricaoApp = `
          <p class="text-gray-700 text-sm">
            ${item.DESCRICAO}</p>`;

          $("#descricaoApp").html(descricaoApp);
          $("#infoApp").html(infoApp);
          var chave = JSON.parse(sessionStorage.getItem("chave"));
          var CODAPP = "";

          appenv =
            "codusuario=" +
            chave["dados"][0]["CODUSUARIO"] +
            "&sistema=" +
            item.SISTEMA;
          $.post(
            "https://novariosg.ddns.net:8086/api/ca/apps/busca/",
            appenv,
            function (resposta) {
              if (resposta.result == 200) {
                resposta["dados"].forEach((itemapp) => {
                  if (itemapp.SISTEMA == item.SISTEMA) {
                    $("#alertaAcesso").addClass("hidden");
                    $("#btnAcessar").removeClass("hidden");

                    CODAPP =
                      itemapp.CODAPP != "NRFACILITY"
                        ? itemapp.CODAPP
                        : itemapp.CODAPP + "/painel.php";

                    $("#btnAcesso")
                      .html(`<a target="_blank" href="https://novariosg.ddns.net:8086/${CODAPP}">
							              <button
							                  id="btnAcessar"
							                  class="px-4 py-2 rounded-xl bg-green-600 text-white text-sm hover:bg-green-700 transition"
							                  type="button"
							                >
							                  Acessar
							                </button></a>`);
                  }
                });
              } else {
                $("#descAcesso").html(
                  `<span class="font-medium">Você não tem permissão para essa Aplicação</span> <p>Por favor, entre em contato com o <b> setor ${item.ORIGEM} </b> para solicitar acesso.</p>`,
                );
                $("#btnAcessar").addClass("hidden");
                $("#alertaAcesso").removeClass("hidden");
              }
            },
          );
        });
      }
    },
  );
}

function formatDataBR(data) {
  const d = new Date(data);

  const dataBR = d.toLocaleDateString("pt-BR");

  const horaMin = d.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${dataBR} ${horaMin}`;
}
