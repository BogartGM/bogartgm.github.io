import { Elements } from "../dom-elements.js";
import { playSoundLoop, stopSound } from "../generarSonido/generar-sonido.js";
import { createHtml, startCountdown } from "./rented-card-computer.js";
export function anadirTarjetaRentado() {
    // Ejemplo de uso
    console.log(Elements.inputRentPrice.value);
    const formValues = {
        computerName: `${Elements.inputComputerName.value}`,
        rentPrice: `$${Elements.inputRentPrice.value}`,
        tiempoPedido: `${Elements.inputHourSelector.value}:${Elements.inputMinuteSelector.value}:00`,
    };
    const node = createHtml(formValues);
    const onStop = () => {
        playSoundLoop("../../sound/levantarse.mp3");
        const template = document.createElement("template");
        template.innerHTML = `
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
    `;
        const modalidad = document.getElementById("exampleModal");
        const btnCerrar = modalidad.querySelectorAll(".cerrar");
        btnCerrar.forEach((btn) => { btn.addEventListener("click", stopSound); });
        const computadoraRentada = modalidad.querySelector("#computadora-rentada");
        const precioRentado = modalidad.querySelector("#precio-rentado");
        const tiempoPedidoRentado = modalidad.querySelector("#tiempo-pedido-rentado");
        const tiempoTransRentado = modalidad.querySelector("#tiempo-transcurrido-rentado");
        const cobrarRentado = modalidad.querySelector("#cobrar-rentado");
        if (computadoraRentada) {
            computadoraRentada.innerHTML = formValues.computerName;
        }
        if (precioRentado) {
            precioRentado.innerHTML = formValues.rentPrice;
        }
        if (tiempoPedidoRentado) {
            tiempoPedidoRentado.innerHTML = formValues.tiempoPedido;
        }
        if (tiempoTransRentado) {
            const tiempoTrans = node.querySelector("#tiempo-restante");
            tiempoTransRentado.innerHTML = tiempoTrans.value;
        }
        if (cobrarRentado) {
            const cobrar = node.querySelector("#cobrar");
            cobrarRentado.innerHTML = cobrar.value;
        }
        const botonModal = template.content.firstElementChild;
        document.body.appendChild(botonModal);
        botonModal.click();
        botonModal.remove();
        node.remove();
    };
    Elements.temporizadores.appendChild(node); // Agregar el nodo al cuerpo del documento
    startCountdown(node, formValues.tiempoPedido, formValues.rentPrice, onStop);
}
