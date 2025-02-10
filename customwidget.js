class AgGridCustom extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `<div>Hello, AG Grid!</div>`;

        this.gridDiv = document.createElement('div');
        this.gridDiv.style.height = "300px";
        this.gridDiv.style.width = "100%";
        this.shadowRoot.appendChild(this.gridDiv);

        this.gridOptions = {
            columnDefs: [],
            rowData: []
        };
    }

    setData(data) {
        if (!window.agGrid || !window.agGrid.createGrid) {
            console.error("AG Grid is not loaded!");
            return;
        }

        this.gridOptions.columnDefs = Object.keys(data[0] || {}).map(key => ({ field: key }));
        this.gridOptions.rowData = data;

        if (this.gridApi) {
            this.gridApi.setGridOption('rowData', data);
        } else {
            this.gridApi = window.agGrid.createGrid(this.gridDiv, this.gridOptions);
        }
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.gridDiv.innerHTML = "<h3>AG Grid Custom Widget</h3>";
    }
}
customElements.define('ag-grid-custom', AgGridCustom);
