import { Elements } from "./dom-elements.js";
import { anadirTarjetaRentado } from "./rentedCardComputer/anadirTarjetaRentado.js";
import { addTimeWheelSelector } from "./timeWheelSelector/add-time-wheel-selector.js";

addTimeWheelSelector(Elements.inputHourSelector);
addTimeWheelSelector(Elements.inputMinuteSelector);
addTimeWheelSelector(Elements.inputRentPrice);
Elements.btnRentar?.addEventListener("click", () => anadirTarjetaRentado());