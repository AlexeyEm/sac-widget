class TabulatorCustom extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Создаем контейнер для таблицы
        this.tableContainer = document.createElement('div');
        this.shadowRoot.appendChild(this.tableContainer);

        this.table = null; // Таблица будет создана позже
    }

    connectedCallback() {
        this.loadTabulator();
    }

    async loadTabulator() {
        if (!window.Tabulator) {
            // Загружаем библиотеку Tabulator, если она не загружена
            await this.loadScript("https://unpkg.com/tabulator-tables/dist/js/tabulator.min.js");
        }

        this.initTable();
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

    initTable() {
        if (!window.Tabulator) {
            console.error("Tabulator is not loaded!");
            return;
        }

        this.table = new Tabulator(this.tableContainer, {
            layout: "fitColumns",
            columns: [],
            data: [],
            autoColumns: true, // Автоматическое создание колонок по данным
            clipboard: "copy",
            clipboardPasteAction: "replace",
            selectable: true, // Позволяет выделять строки
            editable: true, // Редактируемые ячейки
        });
    }

    setData(dataString) {
        try {
            const data = JSON.parse(dataString);

            if (!Array.isArray(data.rows)) {
                console.error("Invalid data format: expected { rows: [...] }");
                return;
            }

            if (this.table) {
                this.table.setData(data.rows); // Обновление данных в таблице
            }
        } catch (error) {
            console.error("Failed to parse data:", error);
        }
    }
}

customElements.define("tabulator-custom", TabulatorCustom);
