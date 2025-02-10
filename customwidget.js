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

    async waitForAGGrid() {
        return new Promise(resolve => {
            const checkInterval = setInterval(() => {
                if (window.agGrid?.createGrid) {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 100);
            setTimeout(() => clearInterval(checkInterval), 5000); // Таймаут 5 сек
        });
    }

    async setData(data) {
        await this.waitForAGGrid();  // Ждём загрузки AG Grid

        if (!window.agGrid || !window.agGrid.createGrid) {
            console.error("AG Grid is still not loaded!");
            return;
        }

        const gridOptions = {
            rowData: data || [
                { make: "Tesla", model: "Model Y", price: 64950, electric: true },
                { make: "Ford", model: "F-Series", price: 33850, electric: false },
                { make: "Toyota", model: "Corolla", price: 29600, electric: false },
                { make: "Mercedes", model: "EQA", price: 48890, electric: true },
                { make: "Fiat", model: "500", price: 15774, electric: false },
                { make: "Nissan", model: "Juke", price: 20675, electric: false },
            ],
            columnDefs: [
                { field: "make" },
                { field: "model" },
                { field: "price" },
                { field: "electric" },
            ],
            defaultColDef: { flex: 1 },
        };

        this.gridApi = agGrid.createGrid(this.gridDiv, gridOptions);
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.gridDiv.innerHTML = "<h3>AG Grid Custom Widget</h3>";
    }
}

customElements.define('ag-grid-custom', AgGridCustom);
