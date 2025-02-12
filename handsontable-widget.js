class HandsontableCustom extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        // Создаем контейнер для таблицы
        this.tableContainer = document.createElement("div");
        this.tableContainer.style.width = "100%";
        this.tableContainer.style.height = "100%";
        this.shadowRoot.appendChild(this.tableContainer);

        // Подключаем стили
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://cdn.jsdelivr.net/npm/handsontable/dist/handsontable.full.min.css";
        this.shadowRoot.appendChild(link);
    }

    async connectedCallback() {
        if (!window.Handsontable) {
            await this.loadScript("https://cdn.jsdelivr.net/npm/handsontable/dist/handsontable.full.min.js");
        }

        this.hot = new Handsontable(this.tableContainer, {
            data: [["", ""], ["", ""]],
            rowHeaders: true,
            colHeaders: true,
            filters: true,
            dropdownMenu: true,
            contextMenu: true,
            manualColumnResize: true,
            manualRowResize: true
        });
    }

    setData(data) {
        if (this.hot) {
            this.hot.loadData(JSON.parse(data));
        }
    }

    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
}

customElements.define("handsontable-custom", HandsontableCustom);
