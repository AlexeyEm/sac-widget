class AgGridCustom extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.gridDiv = document.createElement('div');
        this.gridDiv.id = "myGrid"; // ID для создания Grid
        this.gridDiv.style.height = "300px";
        this.gridDiv.style.width = "100%";
        this.shadowRoot.appendChild(this.gridDiv);
    }

    setData(data) {
        if (!window.agGrid || !window.agGrid.createGrid) {
            console.error("AG Grid is not loaded!");
            return;
        }

        const gridOptions = {
            // Data to be displayed
            rowData: [
                { make: "Tesla", model: "Model Y", price: 64950, electric: true },
                { make: "Ford", model: "F-Series", price: 33850, electric: false },
                { make: "Toyota", model: "Corolla", price: 29600, electric: false },
                { make: "Mercedes", model: "EQA", price: 48890, electric: true },
                { make: "Fiat", model: "500", price: 15774, electric: false },
                { make: "Nissan", model: "Juke", price: 20675, electric: false },
            ],
            // Columns to be displayed (Should match rowData properties)
            columnDefs: [
                { field: "make" },
                { field: "model" },
                { field: "price" },
                { field: "electric" },
            ],
            defaultColDef: {
                flex: 1,
            },
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
