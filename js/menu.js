const MENU_ITEMS = [
    {
        title: "Sistemas",
        icon: "assets/images/icons/sistemas.png",
        items: [
            {
                text: "Página Inicial",
                href: "#",
            },
            {
                text: "Indicadores",
                href: "#",
            },
        ],
    },
    {
        title: "Recursos Humanos",
        icon: "assets/images/icons/pessoas.png",
        items: [
            {
                text: "Comunicados",
                href: "#",
            },
            {
                text: "Documentos",
                href: "#",
            },
        ],
    },
    {
        title: "Tecnologia",
        icon: "assets/images/icons/tecnologia.png",
        items: [
            {
                text: "Manuais",
                submenu: [
                    {
                        text: "Manual do Sistema",
                        href: "#",
                    },
                    {
                        text: "Manual do Usuário",
                        href: "#",
                    },
                ],
            },
            {
                text: "Suporte",
                href: "#",
            },
        ],
    },
    {
        title: "Qualidade",
        icon: "assets/images/icons/qualidade.png",
        items: [
            {
                text: "Procedimentos",
                href: "#",
            },
            {
                text: "Documentos",
                href: "#",
            },
        ],
    },
];

function renderMenu() {
    const menu = document.getElementById("mainMenu");

    if (!menu) {
        return;
    }

    menu.innerHTML = "";

    MENU_ITEMS.forEach((group, index) => {
        menu.appendChild(createMenuGroup(group, index));
    });
}

function createMenuGroup(group, groupIndex) {
    const container = document.createElement("div");

    container.className =
        "overflow-hidden rounded-3xl border border-white/40 bg-white/40 backdrop-blur-md";

    const header = document.createElement("button");

    header.type = "button";
    header.className =
        "flex w-full items-center justify-between px-5 py-4 transition hover:bg-white/50";

    header.innerHTML = `
        <div class="flex items-center gap-3">
            <img
                src="${group.icon}"
                alt=""
                class="h-7 w-7">

            <span class="font-medium">
                ${group.title}
            </span>
        </div>

        <span
            id="menu-arrow-${groupIndex}"
            class="transition-transform duration-300">
            ↓
        </span>
    `;

    const body = document.createElement("div");

    body.className = "hidden space-y-1 px-3 pb-3";

    group.items.forEach((item, itemIndex) => {
        body.appendChild(
            item.submenu
                ? createSubmenu(item, groupIndex, itemIndex)
                : createMenuLink(item)
        );
    });

    header.addEventListener("click", () => {
        body.classList.toggle("hidden");

        document
            .getElementById(`menu-arrow-${groupIndex}`)
            .classList.toggle("rotate-180");
    });

    container.append(header, body);

    return container;
}

function createMenuLink(item) {
    const link = document.createElement("a");

    link.href = item.href;
    link.textContent = item.text;

    link.className =
        "block rounded-2xl px-4 py-3 text-sm text-zinc-600 transition hover:bg-white hover:text-zinc-900";

    return link;
}

function createSubmenu(item, groupIndex, itemIndex) {
    const container = document.createElement("div");
    const button = document.createElement("button");
    const submenu = document.createElement("div");

    container.className = "overflow-hidden rounded-2xl";

    button.type = "button";
    button.className =
        "flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm text-zinc-600 transition hover:bg-white hover:text-zinc-900";

    button.innerHTML = `
        <span class="flex items-center gap-2">
            <span>📚</span>
            <span>${item.text}</span>
        </span>

        <span
            id="submenu-arrow-${groupIndex}-${itemIndex}"
            class="transition-transform duration-300">
            ↓
        </span>
    `;

    submenu.className =
        "ml-4 mt-1 hidden space-y-1 border-l border-zinc-300/50 pl-2";

    item.submenu.forEach((subitem) => {
        const link = document.createElement("a");

        link.href = subitem.href;
        link.textContent = subitem.text;

        link.className =
            "block rounded-xl px-4 py-2.5 text-sm text-zinc-500 transition hover:bg-white hover:text-zinc-900";

        submenu.appendChild(link);
    });

    button.addEventListener("click", () => {
        submenu.classList.toggle("hidden");

        document
            .getElementById(`submenu-arrow-${groupIndex}-${itemIndex}`)
            .classList.toggle("rotate-180");
    });

    container.append(button, submenu);

    return container;
}
