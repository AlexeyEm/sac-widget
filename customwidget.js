class AgGridCustom extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `<div>Hello, AG Grid!</div>`;
    }
}
customElements.define('ag-grid-custom', AgGridCustom);
