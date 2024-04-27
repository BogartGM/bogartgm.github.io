// Importing functions from external files
import { createProductCard } from "./create-product-card.js";
import { removeAttributeFromElementById } from "./utils.js";

/**
 * Initializes the functionality to load and process an Excel file.
 * @param {HTMLInputElement} inputExcel - The file input element. It must be a file input type.
 * @param {HTMLElement} inputDropZone - The drop zone area for files.
 */
export function initExcelInputs(inputExcel, inputDropZone) {
  inputExcel.addEventListener("change", (e) =>
    handleFileChange(e.target.files)
  );
  initializeDropZone(inputDropZone);
}

/**
 * Callback function for the file change event. This function is triggered when a file is selected using a file input.
 * It reads the selected file and loads it as an ArrayBuffer using FileReader. Once the file is loaded, it calls the
 * handleFileLoad function to further process the file.
 *
 * @param {FileList} fileList - The list of files selected by the user. Typically obtained from the 'change' event of a file input.
 */
function handleFileChange(fileList) {
  const file = fileList[0]; // Get the first file from the list
  if (file) {
    const reader = new FileReader(); // Create a new FileReader object
    reader.onload = handleFileLoad; // Set the onload event handler to handleFileLoad function
    reader.readAsArrayBuffer(file); // Read the file as an ArrayBuffer
  }
}

/**
 * Function to handle file loading and processing. This function is called when a file has been successfully loaded.
 * It processes the file content, converts it to a JSON object, creates product cards from the data, and appends them to the DOM.
 * Finally, it performs actions such as hiding drop zone and enabling search bar after the product cards are inserted.
 *
 * @param {Event} file - The file event containing the loaded file data.
 */
function handleFileLoad(file) {
  const data = new Uint8Array(file.target.result); // Get the file data as an Uint8Array
  const workbook = XLSX.read(data, { type: "array" }); // Read the file as an Excel workbook
  const sheetName = workbook.SheetNames[0]; // Get the name of the first sheet
  const worksheet = workbook.Sheets[sheetName]; // Get the first sheet

  // Convert spreadsheet content to JSON object
  const productsData = XLSX.utils.sheet_to_json(worksheet, { raw: true });

  /* Each time the file is loaded, the dropzone is cleared and the reload dataset is added to the div.products. 
  This dataset is used by the createProductCard function so that in the event of adding a new file, it reloads the product cards and the search
  input references the new elements. */
  const productsDiv = document.getElementById("products-container");
  if (productsDiv) {
    productsDiv.innerHTML = "";
    document.getElementById("search-bar").dataset.recargar = true;
  }

  // Create product cards and append them to the DOM
  productsData.forEach((product) => {
    createProductCard(product, "products-container");
  });

  removeAttributeFromElementById("search-bar", "disabled");
}

/*
 *************** Functions to add the necessary listeners to the dropzone:
/**
 * Initializes the drop zone functionality. Attaches event listeners to the drop zone element
 * to handle file dropping, dragging over, dragging leaving, mouse over, and mouse out events.
 *
 * @param {HTMLElement} inputDropZone - The drop zone element to be initialized.
 */
function initializeDropZone(inputDropZone) {
  inputDropZone.addEventListener("click", () => handleInputDropZoneClick());
  inputDropZone.addEventListener("drop", handleDrop);
  inputDropZone.addEventListener("dragover", handleDragOver);
  inputDropZone.addEventListener("dragleave", handleDragLeave);
  inputDropZone.addEventListener("mouseover", handleMouseOver);
  inputDropZone.addEventListener("mouseout", handleMouseOut);
}

/**
 * Handles the click event on the drop zone. Opens a file input dialog when clicked.
 */
function handleInputDropZoneClick() {
  const fileInput = document.createElement("input");
  fileInput.setAttribute("type", "file");
  fileInput.setAttribute("multiple", "false");
  fileInput.setAttribute("style", "display: none");
  fileInput.setAttribute("accept", ".xlsx, .ods");
  fileInput.addEventListener("change", (e) => handleFileChange(e.target.files));
  document.body.appendChild(fileInput);
  fileInput.click();
  document.body.removeChild(fileInput);
}

/**
 * Handles the drop event on the drop zone. Prevents the default behavior, removes the 'active' class,
 * and triggers the file change handler to process the dropped files.
 *
 * @param {DragEvent} e - The drop event object.
 */
function handleDrop(e) {
  e.preventDefault();
  this.classList.remove("active");
  const file = e.dataTransfer.files;
  handleFileChange(file);
}

/**
 * Handles the drag over event on the drop zone. Prevents the default behavior and adds the 'active' class.
 *
 * @param {DragEvent} e - The drag over event object.
 */
function handleDragOver(e) {
  e.preventDefault();
  this.classList.add("active");
}

/**
 * Handles the drag leave event on the drop zone. Removes the 'active' class.
 */
function handleDragLeave() {
  this.classList.remove("active");
}

/**
 * Handles the mouse over event on the drop zone. Adds the 'active' class.
 */
function handleMouseOver() {
  this.classList.add("active");
}

/**
 * Handles the mouse out event on the drop zone. Removes the 'active' class.
 */
function handleMouseOut() {
  this.classList.remove("active");
}
