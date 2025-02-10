class AgGridCustom extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `<div>Hello, AG Grid!</div>`;

        this.gridDiv = document.createElement('div');
        this.gridDiv.style.height = "300px";
        this.gridDiv.style.width = "100%";
        this.shadowRoot.appendChild(this.gridDiv);

        // Grid Options
        this.gridOptions = {
            rowData: [
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
            defaultColDef: {
                flex: 1,
            },
        };
    }

    connectedCallback() {
        if (!window.agGrid || !window.agGrid.createGrid) {
            console.error("AG Grid is not loaded!");
            return;
        }

        this.gridApi = window.agGrid.createGrid(this.gridDiv, this.gridOptions);
    }

    render() {
        this.gridDiv.innerHTML = "<h3>AG Grid Custom Widget</h3>";
    }
}
customElements.define('ag-grid-custom', AgGridCustom);
