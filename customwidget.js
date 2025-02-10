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
}
customElements.define('ag-grid-custom', AgGridCustom);
