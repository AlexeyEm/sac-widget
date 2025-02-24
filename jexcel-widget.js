class JExcelCustom extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Создаем контейнер для таблицы
    this.tableContainer = document.createElement("div");
    this.tableContainer.style.width = "100%";
    this.tableContainer.style.height = "100%";

    // Подключаем стили jExcel
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://bossanova.uk/jspreadsheet/v5/jspreadsheet.css";
    this.shadowRoot.appendChild(link);
	const link2 = document.createElement("link");
	link2.rel = "stylesheet";
    link2.href = "https://jsuites.net/v5/jsuites.css";
    this.shadowRoot.appendChild(link2);

    // Добавляем контейнер в shadow DOM
    this.shadowRoot.appendChild(this.tableContainer);
  }

  async connectedCallback() {
    // Загружаем скрипт jExcel, если он еще не загружен
    if (!window.jexcel) {
      await this.loadScript("https://bossanova.uk/jspreadsheet/v5/jspreadsheet.js");
	  await this.loadScript("https://jsuites.net/v5/jsuites.js");
    }

    // Инициализация jExcel
    this.jexcelInstance = jexcel(this.tableContainer, {
      data: [["", ""], ["", ""]], // Начальные данные
      columns: [
        { type: "text", title: "Column 1", width: 150 },
        { type: "text", title: "Column 2", width: 150 }
      ],
      allowInsertRow: true,
      allowInsertColumn: true,
      allowDeleteRow: true,
      allowDeleteColumn: true,
      copyCompatibility: true,
      selectionCopy: true
    });
  }

  // Метод для установки данных
  setData(data) {
    if (this.jexcelInstance) {
      this.jexcelInstance.setData(data.rows.map(row => row.values));
    }
  }

  // Метод для получения данных
  getData() {
    return this.jexcelInstance ? this.jexcelInstance.getData() : [];
  }

  // Обработчик событий изменения данных
  onDataChange(callback) {
    if (this.jexcelInstance) {
      this.jexcelInstance.onchange = (instance, cell, x, y, value) => {
        callback({ x, y, value });
      };
    }
    return this;
  }

  // Загрузка внешнего скрипта
  loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
}

// Регистрация веб-компонента
customElements.define("jexcel-custom", JExcelCustom);
