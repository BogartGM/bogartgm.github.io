var _a;
import { Elements } from "./dom-elements.js";
import { stopSound } from "../js/generarSonido/generar-sonido.js";
import { anadirTarjetaRentado } from "./rentedCardComputer/anadirTarjetaRentado.js";
import { addTimeWheelSelector } from "./timeWheelSelector/add-time-wheel-selector.js";
addTimeWheelSelector(Elements.inputHourSelector);
addTimeWheelSelector(Elements.inputMinuteSelector);
addTimeWheelSelector(Elements.inputRentPrice);
(_a = Elements.btnRentar) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => anadirTarjetaRentado());
(_a = Elements.btnPanico) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => stopSound());

let modal = document.getElementById("exampleModal");
modal.addEventListener('hidden.bs.modal', function () {
  // Aquí puedes agregar el código que deseas ejecutar cuando se cierra el modal
  stopSound();
});