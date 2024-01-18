const document = global.document;
const ipcRenderer = (window as any).ipcRenderer;

// ================================== HTML =================================== //

function createPoint(fitch: string): HTMLDivElement {
    let container: HTMLDivElement, dot: HTMLDivElement;

    container = document.createElement("div");
    container.id = "fitch-include-mark";

    dot = document.createElement("div");
    dot.setAttribute("class", "pointer-active-mark");
    container.appendChild(dot);

    return container;
}

function createSwitcher(fitch: string): HTMLDivElement {
    let container: HTMLDivElement,
        handler: HTMLDivElement,
        toggle: HTMLDivElement;

    container = document.createElement("div");
    container.id = "switcher";

    handler = document.createElement("div");
    handler.setAttribute("class", "switch-handler");
    toggle = document.createElement("div");
    toggle.setAttribute("class", "switch-toggle");
    handler.appendChild(toggle);
    container.appendChild(handler);

    return container;
}
// Create search line

// Create fast-find table

function createPage(options: any): HTMLDivElement {
    let container: HTMLDivElement,
        box: HTMLDivElement,
        header: HTMLHeadingElement,
        header2: HTMLHeadingElement,
        // image: HTMLImageElement,
        span: HTMLSpanElement,
        switcher: HTMLDivElement,
        // point: HTMLDivElement,
        i: number;

    container = document.createElement("div");
    container.setAttribute("class", "settings-page");

    header = document.createElement("h1");
    header.innerHTML = "Appearance";
    container.appendChild(header);
    header2 = document.createElement("h2");
    header2.innerHTML = "App theme:";
    container.appendChild(header2);
    box = document.createElement("div");
    box.setAttribute("class", "theme");
    span = document.createElement("span");
    span.innerHTML = "Choose the theme mode you would like to use: ";
    switcher = createSwitcher(options.themeMode);
    switcher.setAttribute("class", "theme-mode-switcher");
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "dark") {
        switcher.classList.add("active");
    }
    box.appendChild(span);
    box.appendChild(switcher);
    container.appendChild(box);

    return container;
}

// =============================== FUNCTIONS ================================= //

function extendSource(source: any, defaults: any): any {
    let property: string;
    for (property in defaults) {
        if (source.hasOwnProperty(property) === false) {
            source[property] = defaults[property];
        }
    }
    return source;
}

// ================================== SHOW =================================== //

function revealSettings(options: any) {
    let settingsPageHTML: any,
        targetedElementBy = "id",
        targetElem: string;
    //find target element by
    if (options.target[0] === "#") {
        targetedElementBy = "id";
    } else if (options.target[0] === ".") {
        targetedElementBy = "class";
    }
    targetElem = options.target.substring(1);
    settingsPageHTML = createPage(options);

    // if (options.themeMode === "dark") {
    //     const themeModeSwitcher: HTMLDivElement | null = document.querySelector(
    //         ".theme-mode-switcher"
    //     );
    //     if (themeModeSwitcher) {
    //         themeModeSwitcher.classList.add("active");
    //     } else {
    //         console.log("ERROR, can't find the theme mode switcher");
    //     }
    // }

    if (targetedElementBy === "id") {
        const targetElement = document.getElementById(targetElem);
        if (targetElement) {
            removeAllChildren(targetElement);
            targetElement.appendChild(settingsPageHTML.cloneNode(true));
        }
    } else if (targetedElementBy === "class") {
        const elements = document.querySelectorAll(`.${targetElem}`);
        elements.forEach((element: Element) => {
            removeAllChildren(element as HTMLElement);
            (element as HTMLElement).appendChild(
                settingsPageHTML.cloneNode(true) as HTMLElement
            );
        });
    }

    function removeAllChildren(element: HTMLElement) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
}

// ================================= CLICKS ================================== //

function onClick() {
    document.addEventListener("click", function (e: MouseEvent | any) {
        e = e || window.event;
        let targetDomObject = e.target || e.srcElement;

        if (
            targetDomObject &&
            targetDomObject.closest(".theme-mode-switcher")
        ) {
            const currentTheme =
                document.documentElement.getAttribute("data-theme");
            const newTheme = currentTheme === "light" ? "dark" : "light";

            document.documentElement.setAttribute("data-theme", newTheme);
            const themeSwitcher = targetDomObject.closest(
                ".theme-mode-switcher"
            );

            if (themeSwitcher.classList.contains("active")) {
                // ipcRenderer.send("set-theme-mode", "light");
                themeSwitcher.classList.remove("active");
            } else {
                // ipcRenderer.send("set-theme-mode", "dark");
                themeSwitcher.classList.add("active");
            }
        }
    });
}

// ================================= EXPORT ================================== //

onClick();

export const render = function (options: Record<string, any>): boolean {
    if (options === undefined) {
        console.error("Option missing");
        return false;
    }

    const defaults = {
        themeMode: "dark",
    } as const;

    options = extendSource(options, defaults);
    const result = revealSettings(options);

    return result === undefined ? false : result;
};
