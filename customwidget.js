class AgGridCustom extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 400px;
          border: 1px solid #ddd;
        }
      </style>
      <div id="gridContainer"></div>
    `;
  }

  connectedCallback() {
    console.log("AG Grid Custom Widget loaded.");
  }

  setData(data) {
    console.log("Received data:", data);
  }
}

customElements.define("ag-grid-custom", AgGridCustom);
