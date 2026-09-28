const SIDEBAR_WIDTH = 360;

let sidebarOpen = false;

document.addEventListener("DOMContentLoaded", initializeApp);

function initializeApp() {
    initializeUser();
    initializeSidebar();
    initializeButtons();

    renderMenu();
    renderNews();
    renderCarousel();
    startCarousel();
}

function initializeUser() {
    const username = document.getElementById("username");

    if (username) {
        username.textContent = DEMO_USER.name;
    }

    updateGreeting();
}

function updateGreeting() {
    const greeting = document.getElementById("greeting");

    if (!greeting) {
        return;
    }

    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
        greeting.textContent = "Bom dia,";
        return;
    }

    if (hour >= 12 && hour < 18) {
        greeting.textContent = "Boa tarde,";
        return;
    }

    greeting.textContent = "Boa noite,";
}

function initializeSidebar() {
    const openButton = document.getElementById("openSidebar");
    const closeButton = document.getElementById("closeSidebar");
    const overlay = document.getElementById("sidebarOverlay");

    openButton.addEventListener("click", openSidebar);
    closeButton.addEventListener("click", closeSidebar);
    overlay.addEventListener("click", closeSidebar);

    window.addEventListener("resize", handleWindowResize);
}

function initializeButtons() {
    document
        .getElementById("previousSlide")
        .addEventListener("click", () => changeSlide(-1));

    document
        .getElementById("nextSlide")
        .addEventListener("click", () => changeSlide(1));

    document
        .getElementById("openApps")
        .addEventListener("click", openApps);

    document
        .getElementById("openNotice")
        .addEventListener("click", openNotice);

    document
        .getElementById("logoutButton")
        .addEventListener("click", logout);
}

function openSidebar() {
    sidebarOpen = true;

    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");

    sidebar.classList.remove("-translate-x-full");

    if (window.innerWidth < 1024) {
        overlay.classList.remove("hidden");
        return;
    }

    document.getElementById("mainContent").style.marginLeft =
        `${SIDEBAR_WIDTH}px`;
}

function closeSidebar() {
    sidebarOpen = false;

    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");

    sidebar.classList.add("-translate-x-full");
    overlay.classList.add("hidden");

    document.getElementById("mainContent").style.marginLeft = "0";
}

function handleWindowResize() {
    const main = document.getElementById("mainContent");

    if (window.innerWidth < 1024) {
        main.style.marginLeft = "0";
        return;
    }

    if (sidebarOpen) {
        main.style.marginLeft = `${SIDEBAR_WIDTH}px`;
    }
}

function openApps() {
    const apps = DEMO_APPS.map((app) => `
        <div class="group rounded-2xl border border-gray-200/60 bg-white/60 shadow-[0_6px_20px_rgba(0,0,0,.08)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_12px_35px_rgba(0,0,0,.12)]">

            <a
                href="${app.url}"
                class="flex flex-col items-center p-5 text-center">

                <div class="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-xl">
                    ▦
                </div>

                <span class="text-sm font-medium tracking-tight text-gray-700">
                    ${app.name}
                </span>

                <span class="mt-1 text-[11px] text-gray-400">
                    ${app.description}
                </span>

            </a>

        </div>
    `).join("");

    const container = document.getElementById("appsDrawer");

    container.innerHTML = `
        <div
            id="appsOverlay"
            class="fixed inset-0 z-[80] hidden bg-black/40 backdrop-blur-sm"
            onclick="closeApps()">
        </div>

        <aside
            id="appsPanel"
            class="fixed left-0 top-0 z-[90] h-screen w-full -translate-x-full overflow-y-auto border-r border-white/40 bg-white/80 p-8 shadow-[40px_0_120px_rgba(0,0,0,.10)] backdrop-blur-2xl transition-transform duration-300 md:w-[80%] lg:w-[70%] xl:w-[60%]">

            <div class="relative z-10">

                <div class="mb-6 flex items-center justify-between">

                    <h2 class="text-xl font-semibold tracking-tight">
                        Meus Aplicativos
                    </h2>

                    <button
                        type="button"
                        onclick="closeApps()"
                        class="flex h-9 w-9 items-center justify-center rounded-full bg-white/60 text-gray-500 transition hover:bg-white">

                        ×
                    </button>

                </div>

                <div class="grid grid-cols-2 gap-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    ${apps}
                </div>

            </div>

        </aside>
    `;

    requestAnimationFrame(() => {
        document
            .getElementById("appsPanel")
            .classList.remove("-translate-x-full");

        document
            .getElementById("appsOverlay")
            .classList.remove("hidden");
    });
}

function closeApps() {
    const panel = document.getElementById("appsPanel");
    const overlay = document.getElementById("appsOverlay");

    if (!panel) {
        return;
    }

    panel.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
}

function openNotice() {
    openModal(`
        <div class="w-full max-w-lg rounded-[28px] bg-white p-8 shadow-[0_30px_90px_rgba(0,0,0,.25)]">

            <div class="mb-6 flex items-center justify-between">

                <h2 class="text-xl font-semibold">
                    Atualização cadastral
                </h2>

                <button
                    type="button"
                    onclick="closeModal()"
                    class="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200">

                    ×
                </button>

            </div>

            <p class="text-sm leading-relaxed text-zinc-600">
                Mantenha suas informações pessoais e profissionais atualizadas.
                Esta tela representa uma funcionalidade da intranet corporativa.
            </p>

            <button
                type="button"
                onclick="closeModal()"
                class="mt-6 w-full rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700">

                Entendi
            </button>

        </div>
    `);
}

function logout() {
    console.log("Logout executado.");

    window.location.href = "#";
}
