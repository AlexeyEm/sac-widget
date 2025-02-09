(function () {
    let template = document.createElement("template");
    template.innerHTML = `
        <style>
            .ag-theme-alpine {
                height: 100%;
                width: 100%;
            }
        </style>
        <div id="gridContainer" class="ag-theme-alpine"></div>
    `;

    class AGGridWidget extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: "open" });
            this._shadowRoot.appendChild(template.content.cloneNode(true));

            this._gridContainer = this._shadowRoot.getElementById("gridContainer");

            this._gridOptions = {
                columnDefs: [
                    { headerName: "Column 1", field: "col1", editable: true },
                    { headerName: "Column 2", field: "col2", editable: true },
                    { headerName: "Column 3", field: "col3", editable: true }
                ],
                rowData: [
                    { col1: "Data 1", col2: "Data 2", col3: "Data 3" },
                    { col1: "Data 4", col2: "Data 5", col3: "Data 6" }
                ],
                defaultColDef: {
                    resizable: true,
                    sortable: true,
                    filter: true
                },
                enableRangeSelection: true,
                enableClipboard: true
            };
        }

        connectedCallback() {
            this._loadAGGrid();
        }

        async _loadAGGrid() {
            if (!window.agGrid) {
                await this._loadScript("https://cdn.jsdelivr.net/npm/ag-grid-community/dist/ag-grid-community.min.js");
            }
            new agGrid.Grid(this._gridContainer, this._gridOptions);
        }

        async _loadScript(url) {
            return new Promise((resolve, reject) => {
                const script = document.createElement("script");
                script.src = url;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        }

        setData(data) {
            if (data && Array.isArray(data)) {
                this._gridOptions.api.setRowData(data);
            }
        }

        getData() {
            let rowData = [];
            this._gridOptions.api.forEachNode(node => rowData.push(node.data));
            return rowData;
        }
    }

    customElements.define("ag-grid-widget", AGGridWidget);
})();
