/**
 * Creates a product card with its classes for each element, content, and structure in the DOM.
 * Then inserts this created product card as a child of the element whose id was passed as a parameter of the function (containerProductId).
 * The other parameter (productJson) contains the data needed to create the product card.
 * 
 * @param {object} productJson - The JSON object containing the data for creating the product card.
 * @param {string} containerProductId - The id of the container element where the product card will be appended.
 */
export function createProductCard(productJson, containerProductId) {
  // Creating DOM elements for the product card
  const cardDiv = document.createElement("div");
  const productNameDiv = document.createElement("div");
  const inputGroupDiv = document.createElement("div");
  const productNameSpan = document.createElement("span");
  const quantityInput = document.createElement("input");
  const addButton = document.createElement("button");
  const rowTable = document.createElement("div");
  const qualityEDiv = createQualityTable("CALIDAD E", productJson["MARCA"], productJson["P UNI"]);
  const qualityADiv = createQualityTable("CALIDAD A", productJson["MARCA_1"], productJson["P UNI_1"]);

  // Adding classes and attributes
  cardDiv.classList.add("card", "p-2", "product");
  productNameDiv.classList.add("form", "mb-1");
  inputGroupDiv.classList.add("input-group", "input-group-sm");
  productNameSpan.classList.add("input-group-text", "col-8", "search");
  quantityInput.setAttribute("type", "number");
  quantityInput.setAttribute("placeholder", "1");
  quantityInput.classList.add("form-control", "col-2");
  addButton.classList.add("btn", "btn-success", "col-2");
  rowTable.classList.add("row");

  // Setting content
  productNameSpan.textContent = productJson["PRODUCTO"];
  addButton.textContent = "+";

  // Structuring the DOM
  inputGroupDiv.appendChild(productNameSpan);
  inputGroupDiv.appendChild(quantityInput);
  inputGroupDiv.appendChild(addButton);
  productNameDiv.appendChild(inputGroupDiv);
  rowTable.appendChild(qualityEDiv);
  rowTable.appendChild(qualityADiv);
  cardDiv.appendChild(productNameDiv);
  cardDiv.appendChild(rowTable);

  // Adding the card to the document
  document.getElementById(containerProductId).appendChild(cardDiv);
}



/**
 * Creates a quality table where the content depends on the provided parameters: title, name, and price.
 * 
 * @param {string} title - The title of the quality table.
 * @param {string} name - The name of the product.
 * @param {string} price - The price of the product.
 * @returns {HTMLDivElementement} - The created quality table.
 */
function createQualityTable(title, name, price) {
  // Creating DOM elements for the quality table
  const svgPen = createSVG("http://www.w3.org/2000/svg", "16", "16", "0 0 16 16", "path", "d", "M13.646 1.146a.5.5 0 0 1 .708 0l1 1a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.36.146h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .146-.354l10-10zM13 2l1 1-10 10h-2v-2l10-10 1 1v1h1v-2h-2");
  const svgPen2 = createSVG("http://www.w3.org/2000/svg", "16", "16", "0 0 16 16", "path", "d", "M13.646 1.146a.5.5 0 0 1 .708 0l1 1a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.36.146h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .146-.354l10-10zM13 2l1 1-10 10h-2v-2l10-10 1 1v1h1v-2h-2");
  const qualityDiv = document.createElement("div");
  const qualityTable = document.createElement("div");
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  const trHead = document.createElement("tr");
  const th1 = document.createElement("th");
  const th2 = document.createElement("th");
  const thInput = document.createElement("input");
  const trBody = document.createElement("tr");
  const trBody2 = document.createElement("tr");
  const tdName = document.createElement("td");
  const tdPrice = document.createElement("td");
  const tdButton = document.createElement("td");
  const tdButton2 = document.createElement("td");
  const buttonPen = document.createElement("button");
  const buttonPen2 = document.createElement("button");

  // Adding classes and attributes
  qualityDiv.classList.add("col-md-6");
  qualityTable.classList.add("table-responsive");
  table.classList.add("table");
  thInput.classList.add("form-check-input", "bg-success");
  thInput.type = "checkbox";
  thInput.setAttribute("checked", "true");
  tdName.dataset.originalName = name;
  tdName.classList.add("search");
  tdName.style.width = "90%";
  tdName.style.overflowWrap = "break-word";
  tdPrice.dataset.originalPrice = price;
  tdPrice.classList.add("price", "search");
  tdPrice.style.width = "90%";
  tdPrice.style.overflowWrap = "break-word";
  tdButton.style.width = "10%";
  tdButton2.style.width = "10%";
  buttonPen.classList.add("btn");
  buttonPen2.classList.add("btn");

  // Setting content
  th1.textContent = title;
  tdName.textContent = name;
  tdPrice.textContent = price;

  // Adding events
  tdButton.addEventListener("click", function() {
    handleButtonClick(tdName);
  });
  tdButton2.addEventListener("click", function() {
    handleButtonClick(tdPrice);
  });
  tdName.addEventListener("keydown", function(event) {
    handleTdKeyDown(tdName, event);
  });
  tdName.addEventListener("input", function() {
    handleTdInput(tdName);
  });
  tdName.addEventListener("focusout", function() {
    handleFocusOut(tdName);
  });
  tdPrice.addEventListener("keydown", function(event) {
    handleTdKeyDown(tdPrice, event);
  });
  tdPrice.addEventListener("input", function() {
    handleTdInput(tdPrice);
  });
  tdPrice.addEventListener("focusout", function() {
    handleFocusOut(tdPrice);
  });

  // Structuring the DOM
  buttonPen.appendChild(svgPen);
  buttonPen2.appendChild(svgPen2);
  tdButton.appendChild(buttonPen);
  tdButton2.appendChild(buttonPen2);
  trHead.appendChild(th1);
  th2.appendChild(thInput);
  trHead.appendChild(th2)
  trBody.appendChild(tdName);
  trBody.appendChild(tdButton);
  trBody2.appendChild(tdPrice);
  trBody2.appendChild(tdButton2);
  thead.appendChild(trHead);
  tbody.appendChild(trBody);
  tbody.appendChild(trBody2);
  table.appendChild(thead);
  table.appendChild(tbody);
  qualityTable.appendChild(table);
  qualityDiv.appendChild(qualityTable);

  // Function to create SVG elements
  function createSVG(namespace, width, height, viewBox, element, attribute, value) {
    const svg = document.createElementNS(namespace, "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("viewBox", viewBox);
    const path = document.createElementNS(namespace, element);
    path.setAttribute(attribute, value);
    svg.appendChild(path);
    return svg;
  }

  // Function to handle click event on buttons
  function handleButtonClick(tdElement) {
    tdElement.setAttribute('contenteditable', 'true');
    tdElement.focus();

    const range = document.createRange();
    range.selectNodeContents(tdElement);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  // Function to handle keydown event on td elements
  function handleTdKeyDown(tdElement, event) {
    if (event.key === 'Enter') {
      tdElement.setAttribute('contenteditable', 'false');

      const selection = window.getSelection();
      selection.removeAllRanges();

      if (!tdElement.textContent) {
        tdElement.textContent = Object.values(tdElement.dataset)[0];
      }
    }
  }

  // Function to handle focusout event on td elements
  function handleFocusOut(tdElement) {
    tdElement.setAttribute('contenteditable', 'false');
  }

  // Function to handle input event on td elements
  function handleTdInput() {
    const selection = window.getSelection();
    if (!selection.isCollapsed) {
      selection.removeAllRanges();
    }
  }

  return qualityDiv;
}
