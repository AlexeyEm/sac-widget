class AgGridCustom extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.gridDiv = document.createElement('div');
        this.gridDiv.id = "myGrid";
        this.gridDiv.style.height = "300px";
        this.gridDiv.style.width = "100%";
        this.shadowRoot.appendChild(this.gridDiv);
    }

    async connectedCallback() {
        // Загружаем AG Grid, если он отсутствует
        if (!window.agGrid) {
            console.log("Loading AG Grid...");
            await this.loadScript("https://cdn.jsdelivr.net/npm/ag-grid-community/dist/ag-grid-community.min.js");
        }

        if (window.agGrid) {
            this.initGrid();
        } else {
            console.error("Failed to load AG Grid!");
        }

        // Сообщаем SAC, что виджет загружен
        window.parent.postMessage({ type: "sap.zen.dsh.registerCustomWidget", name: "com.example.aggrid" }, "*");
    }

    loadScript(url) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    initGrid() {
        const gridOptions = {
            rowData: [
                { make: "Tesla", model: "Model Y", price: 64950, electric: true },
                { make: "Ford", model: "F-Series", price: 33850, electric: false },
                { make: "Toyota", model: "Corolla", price: 29600, electric: false }
            ],
            columnDefs: [
                { field: "make" },
                { field: "model" },
                { field: "price" },
                { field: "electric" }
            ],
            defaultColDef: {
                flex: 1
            }
        };

        this.gridApi = agGrid.createGrid(this.gridDiv, gridOptions);
    }
}

customElements.define('ag-grid-custom', AgGridCustom);
