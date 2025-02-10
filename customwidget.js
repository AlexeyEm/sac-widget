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
            rowData: data,
            columnDefs: Object.keys(data[0] || {}).map(key => ({ field: key })),
            defaultColDef: { flex: 1 }
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
