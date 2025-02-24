// Функция для динамической загрузки скриптов
function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Загрузка зависимостей
Promise.all([
  loadScript('https://bossanova.uk/jspreadsheet/v5/jspreadsheet.js'),
  loadScript('https://jsuites.net/v5/jsuites.js')
]).then(() => {
  // Определение веб-компонента
  class JspreadsheetWidget extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v5/jspreadsheet.css">
        <link rel="stylesheet" href="https://jsuites.net/v5/jsuites.css">
        <div id="spreadsheet"></div>
      `;
    }

    connectedCallback() {
      if (typeof jspreadsheet === 'undefined') {
        console.error('Jspreadsheet is not loaded');
        return;
      }
      const spreadsheetDiv = this.shadowRoot.querySelector('#spreadsheet');
      jspreadsheet(spreadsheetDiv, {
        worksheets: [{
          data: [['', '']],
          columns: [{ type: 'text', title: 'Column 1', width: 200 }]
        }]
      });
    }
  }

  // Регистрация компонента
  customElements.define('com-example-jspreadsheet-widget', JspreadsheetWidget);
}).catch(error => {
  console.error('Failed to load scripts:', error);
});
