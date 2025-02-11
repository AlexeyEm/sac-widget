class TabulatorCustom extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Создаём контейнер для таблицы
        this.gridDiv = document.createElement('div');
        this.gridDiv.style.height = "400px";
        this.gridDiv.style.width = "100%";
        this.shadowRoot.appendChild(this.gridDiv);

        // Инициализируем пустую таблицу
        this.table = null;
        this.data = [];
    }

    async connectedCallback() {
        // Загружаем Tabulator, если он ещё не загружен
        if (!window.Tabulator) {
            await this.loadScript("https://cdnjs.cloudflare.com/ajax/libs/tabulator/5.4.4/js/tabulator.min.js");
        }
        this.initGrid();
    }

    // Функция для загрузки JS-библиотеки
    loadScript(url) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // Инициализация таблицы
    initGrid() {
        this.table = new Tabulator(this.gridDiv, {
            data: this.data, // Используем текущие данные
            layout: "fitColumns",
            columns: [
                { title: "ID", field: "id", sorter: "number", editor: "input" },
                { title: "Name", field: "name", sorter: "string", editor: "input" },
                { title: "Age", field: "age", sorter: "number", editor: "input" }
            ],
            clipboard: "copy",
            clipboardPasteAction: "replace" // Позволяет вставку из Excel
        });
    }

    // Метод SAC: установка данных в таблицу
    setData(data) {
        this.data = data;
        if (this.table) {
            this.table.setData(this.data);
        }
    }

    // Автоматически обновляем данные, если свойство `data` изменяется в SAC
    static get observedAttributes() {
        return ["data"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "data") {
            try {
                this.setData(JSON.parse(newValue));
            } catch (error) {
                console.error("Ошибка при разборе данных:", error);
            }
        }
    }
}

customElements.define('tabulator-custom', TabulatorCustom);
