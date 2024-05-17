import { handleWheelEvent } from "./handlers/handle-wheel-event.js";
export function addTimeWheelSelector(inputTimeSelector) {
    inputTimeSelector.addEventListener("mouseenter", () => {
        inputTimeSelector.addEventListener("wheel", (event) => handleWheelEvent(event, inputTimeSelector));
    });
    inputTimeSelector.addEventListener('mouseleave', () => {
        inputTimeSelector.removeEventListener('wheel', (event) => handleWheelEvent(event, inputTimeSelector));
    });
}
