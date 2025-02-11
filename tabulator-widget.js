class TabulatorCustom extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Создаем контейнер для таблицы
        this.tableContainer = document.createElement('div');
        this.tableContainer.style.width = "100%";
        this.tableContainer.style.height = "400px"; // Минимальная высота
        this.shadowRoot.appendChild(this.tableContainer);

        this.table = null;
    }

    connectedCallback() {
        if (!document.querySelector("link[href*='tabulator.min.css']")) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "https://unpkg.com/tabulator-tables/dist/css/tabulator.min.css";
            document.head.appendChild(link);
        }
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

        if (!this.tableContainer || !(this.tableContainer instanceof HTMLElement)) {
            console.error("Tabulator container is not a valid HTML element.");
            return;
        }

        const columns = [
    	 	{title:"Name", field:"name", width:150},
    	 	{title:"Age", field:"age", hozAlign:"left", formatter:"progress"},
    	 	{title:"Favourite Color", field:"col"},
    	 	{title:"Date Of Birth", field:"dob", sorter:"date", hozAlign:"center"},
     	];
        var tabledata = [
         	{id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
         	{id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
         	{id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
         	{id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
         	{id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
         ];

        // Инициализация таблицы только после проверки наличия контейнера
        this.table = new Tabulator(this.tableContainer, {
            layout: "fitColumns",
            columns: columns,
            data: tabledata,
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
