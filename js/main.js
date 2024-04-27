// Importing functions from external files
import { initExcelInputs } from "./excel-file-handler.js";
import { search } from "./search-bar.js";

// DOM elements
const inputExcel = document.getElementById("file-input"); // Get the Excel file input
const inputDropZone = document.getElementById("dropzone"); // Get the drop zone for Excel file
const inputSearchBar = document.getElementById("search-bar"); // Get the search bar input

// Initializing Excel input
initExcelInputs(inputExcel, inputDropZone); // Initialize Excel file upload functionality

// Initializing search bar
search(inputSearchBar); // Initialize search functionality in the search bar
