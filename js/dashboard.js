let currentSlide = 0;
let carouselInterval = null;

function renderNews() {
    const container = document.getElementById("newsList");

    if (!container) {
        return;
    }

    container.innerHTML = DEMO_NEWS.map((news) => `
        <article
            class="group flex cursor-pointer gap-4 rounded-3xl border border-white/40 bg-white/60 p-4 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            onclick="openNews(${news.id})">

            <div class="relative shrink-0">
                <img
                    src="${news.image}"
                    alt="${news.title}"
                    class="h-28 w-32 rounded-2xl object-cover">

                <div class="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/10 to-transparent"></div>
            </div>

            <div class="flex min-w-0 flex-col justify-between">

                <div>
                    <h3 class="line-clamp-2 text-[15px] font-semibold leading-snug text-zinc-900">
                        ${news.title}
                    </h3>

                    <p class="mt-1 line-clamp-2 text-sm text-zinc-500">
                        ${news.summary}
                    </p>
                </div>

                <div class="mt-3 flex items-center justify-between">

                    <span class="text-[11px] tracking-wide text-zinc-400">
                        ${news.date}
                    </span>

                    <span class="text-xs font-medium text-emerald-600">
                        Ler →
                    </span>

                </div>

            </div>

        </article>
    `).join("");
}

function renderCarousel() {
    const carousel = document.getElementById("campaignCarousel");
    const dots = document.getElementById("carouselDots");

    if (!carousel || !dots) {
        return;
    }

    carousel.innerHTML = DEMO_CAMPAIGNS.map((campaign, index) => `
        <div
            class="campaign-slide absolute inset-0 transition-all duration-700 ease-out ${
                index === 0
                    ? "z-10 scale-100 opacity-100"
                    : "z-0 scale-[1.02] opacity-0"
            }"
            onclick="openCampaign(${campaign.id})">

            <img
                src="${campaign.image}"
                alt="${campaign.title}"
                class="h-full w-full object-cover">

            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

            <div class="absolute bottom-0 left-0 right-0 p-8">

                <div class="max-w-2xl rounded-2xl border border-white/10 bg-black/10 p-5 backdrop-blur-md">

                    <h1 class="text-3xl font-semibold leading-tight text-white md:text-4xl">
                        ${campaign.title}
                    </h1>

                    <p class="mt-2 line-clamp-2 text-sm text-white/80 md:text-base">
                        ${campaign.summary}
                    </p>

                </div>

            </div>

        </div>
    `).join("");

    dots.innerHTML = DEMO_CAMPAIGNS.map((_, index) => `
        <button
            type="button"
            onclick="goToSlide(${index})"
            class="carousel-dot rounded-full transition-all duration-300 ${
                index === 0
                    ? "h-2 w-6 bg-white"
                    : "h-2 w-2 bg-white/40"
            }">
        </button>
    `).join("");
}

function updateCarousel() {
    const slides = document.querySelectorAll(".campaign-slide");
    const dots = document.querySelectorAll(".carousel-dot");

    slides.forEach((slide, index) => {
        const active = index === currentSlide;

        slide.classList.toggle("opacity-100", active);
        slide.classList.toggle("opacity-0", !active);
        slide.classList.toggle("scale-100", active);
        slide.classList.toggle("scale-[1.02]", !active);
        slide.classList.toggle("z-10", active);
        slide.classList.toggle("z-0", !active);
    });

    dots.forEach((dot, index) => {
        const active = index === currentSlide;

        dot.className = active
            ? "carousel-dot h-2 w-6 rounded-full bg-white transition-all duration-300"
            : "carousel-dot h-2 w-2 rounded-full bg-white/40 transition-all duration-300";
    });
}

function changeSlide(direction) {
    if (!DEMO_CAMPAIGNS.length) {
        return;
    }

    currentSlide += direction;

    if (currentSlide >= DEMO_CAMPAIGNS.length) {
        currentSlide = 0;
    }

    if (currentSlide < 0) {
        currentSlide = DEMO_CAMPAIGNS.length - 1;
    }

    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function startCarousel() {
    clearInterval(carouselInterval);

    carouselInterval = setInterval(() => {
        changeSlide(1);
    }, 6000);
}

function openNews(id) {
    const news = DEMO_NEWS.find((item) => item.id === id);

    if (!news) {
        return;
    }

    openModal(`
        <div class="w-full max-w-4xl overflow-hidden rounded-[28px] bg-white shadow-[0_30px_90px_rgba(0,0,0,.25)]">

            <div class="flex items-center justify-between border-b border-zinc-200 px-6 py-4">

                <span class="text-sm font-medium text-zinc-700">
                    Notícia
                </span>

                <button
                    type="button"
                    onclick="closeModal()"
                    class="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 transition hover:bg-zinc-200">

                    ×
                </button>

            </div>

            <div class="max-h-[80vh] space-y-6 overflow-y-auto p-8">

                <h1 class="text-center text-3xl font-semibold text-zinc-900">
                    ${news.title}
                </h1>

                <p class="mx-auto max-w-2xl text-center text-zinc-600">
                    ${news.summary}
                </p>

                <p class="text-center text-xs text-zinc-400">
                    Publicado em ${news.date}
                </p>

                <div class="flex justify-center">
                    <img
                        src="${news.image}"
                        alt="${news.title}"
                        class="w-full max-w-[620px] rounded-xl shadow-md">
                </div>

                <p class="mx-auto max-w-3xl text-[15px] leading-relaxed text-zinc-700">
                    Esta é uma notícia de demonstração utilizada na versão pública do projeto.
                </p>

            </div>

        </div>
    `);
}

function openCampaign(id) {
    const campaign = DEMO_CAMPAIGNS.find((item) => item.id === id);

    if (!campaign) {
        return;
    }

    openModal(`
        <div class="w-full max-w-4xl overflow-hidden rounded-[28px] bg-white shadow-[0_30px_90px_rgba(0,0,0,.25)]">

            <div class="flex items-center justify-between border-b border-zinc-200 px-6 py-4">

                <span class="text-sm font-medium text-zinc-700">
                    Campanha
                </span>

                <button
                    type="button"
                    onclick="closeModal()"
                    class="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 transition hover:bg-zinc-200">

                    ×
                </button>

            </div>

            <div class="max-h-[80vh] space-y-6 overflow-y-auto p-8">

                <h1 class="text-center text-3xl font-semibold text-zinc-900">
                    ${campaign.title}
                </h1>

                <p class="mx-auto max-w-2xl text-center text-zinc-600">
                    ${campaign.summary}
                </p>

                <div class="flex justify-center">
                    <img
                        src="${campaign.image}"
                        alt="${campaign.title}"
                        class="w-full max-w-[600px] rounded-xl shadow-md">
                </div>

            </div>

        </div>
    `);
}

function openModal(content) {
    const container = document.getElementById("modalContainer");

    container.innerHTML = `
        <div
            class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-6 backdrop-blur-sm"
            onclick="handleModalClick(event)">

            ${content}

        </div>
    `;
}

function handleModalClick(event) {
    if (event.target === event.currentTarget) {
        closeModal();
    }
}

function closeModal() {
    document.getElementById("modalContainer").innerHTML = "";
}
