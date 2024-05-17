var _a;
import { Elements } from "./dom-elements.js";
import { anadirTarjetaRentado } from "./rentedCardComputer/anadirTarjetaRentado.js";
import { addTimeWheelSelector } from "./timeWheelSelector/add-time-wheel-selector.js";
addTimeWheelSelector(Elements.inputHourSelector);
addTimeWheelSelector(Elements.inputMinuteSelector);
addTimeWheelSelector(Elements.inputRentPrice);
(_a = Elements.btnRentar) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => anadirTarjetaRentado());
