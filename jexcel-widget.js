class JspreadsheetWidget extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.css">
      <link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css">
      <div id="spreadsheet"></div>
    `;
    this.spreadsheetInstance = null;
  }

  // Подключение виджета
  connectedCallback() {
    this.initializeSpreadsheet();
  }

  // Инициализация Jspreadsheet
  initializeSpreadsheet() {
    const spreadsheetDiv = this.shadowRoot.querySelector('#spreadsheet');
    const data = JSON.parse(this.getAttribute('data') || '[]');
    const columns = JSON.parse(this.getAttribute('columns') || '[]');

    this.spreadsheetInstance = jspreadsheet(spreadsheetDiv, {
      worksheets: [{
        data: data.length ? data : [['', '']],
        columns: columns.length ? columns : [
          { type: 'text', title: 'Column 1', width: 200 },
          { type: 'text', title: 'Column 2', width: 200 }
        ]
      }],
      onchange: () => {
        this.dispatchEvent(new CustomEvent('onChange', {
          detail: this.getData()
        }));
      }
    });
  }

  // Метод для установки данных
  setData(data) {
    if (this.spreadsheetInstance) {
      const parsedData = JSON.parse(data);
      this.spreadsheetInstance[0].setData(parsedData);
    }
  }

  // Метод для получения данных
  getData() {
    if (this.spreadsheetInstance) {
      const data = this.spreadsheetInstance[0].getData();
      return JSON.stringify(data);
    }
    return '[]';
  }

  // Обработка изменений атрибутов
  static get observedAttributes() {
    return ['data', 'columns'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this.spreadsheetInstance && oldValue !== newValue) {
      if (name === 'data') {
        this.setData(newValue);
      } else if (name === 'columns') {
        this.spreadsheetInstance[0].setConfig({ columns: JSON.parse(newValue) });
      }
    }
  }
}

// Регистрация веб-компонента
customElements.define('com-example-jspreadsheet-widget', JspreadsheetWidget);
