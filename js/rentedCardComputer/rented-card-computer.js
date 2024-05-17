export function createHtml(values) {
    const template = document.createElement('template');
    template.innerHTML = `
    <div class="container border rounded-2">
      <div class="row">
        <div class="col-md-2">
          <div class="form-floating">
            <input
              id="computer-name"
              type="text"
              class="form-control border-0"
              placeholder="Nombre"
              value="${values.computerName}"
            />
            <label for="computer-name"> Nombre computadora </label>
          </div>
        </div>
        <div class="col-md-2">
          <div class="form-floating">
            <input
              id="rent-price"
              type="string"
              class="form-control border-0"
              placeholder="Precio"
              value="${values.rentPrice}"
            />
            <label for="rent-price"> Precio/Hora </label>
          </div>
        </div>
        <div class="col-md-2">
          <div class="form-floating">
            <input
              id="tiempo-pedido"
              class="form-control border-0"
              type="string"
              value="${values.tiempoPedido}"
            />
            <label for="tiempo-pedido">Tiempo pedido</label>
          </div>
        </div>
        <div class="col-md-2">
          <div class="form-floating">
            <input
              id="tiempo-transcurrido"
              class="form-control border-0"
              type="string"
              value="00:00:00"
            />
            <label for="tiempo-transcurrido">Tiempo transcurrido</label>
          </div>
        </div>
        <div class="col-md-2">
          <div class="form-floating">
            <input
              id="cobrar"
              class="form-control border-0"
              type="string"
              value="$0"
            />
            <label for="cobrar">Cobrar</label>
          </div>
        </div>
        <div class="col-md d-flex align-items-center bg-warning">
          <div id="pause-button" class="text-center text-light bg-warning w-100">
            Pausar
          </div>
        </div>
        <div class="col-md d-flex align-items-center bg-danger rounded-end-2">
          <div id="stop-button" class="text-center text-light bg-danger w-100">
            Detener
          </div>
        </div>
      </div>
    </div>
  `;
    return template.content.firstElementChild;
}
export function startCountdown(element, tiempoPedido, rentPrice, onStop) {
    const tiempoRestanteInput = element.querySelector('#tiempo-restante');
    const tiempoTranscurridoInput = element.querySelector('#tiempo-transcurrido');
    const cobrarInput = element.querySelector('#cobrar');
    const pauseButton = element.querySelector('#pause-button');
    const stopButton = element.querySelector('#stop-button');
    let tiempoRestante = parseTime(tiempoPedido);
    let tiempoPedidoTotalSeconds = tiempoRestante.totalSeconds;
    let tiempoTranscurridoTotalSeconds = 0;
    let intervalId;
    let isPaused = false;
    const rentPricePerMinute = parseFloat(rentPrice.replace('$', '')) / 60;
    const updateTimer = () => {
        if (tiempoRestante.totalSeconds > 0) {
            tiempoRestante.totalSeconds--;
            tiempoRestanteInput.value = formatTime(tiempoRestante.totalSeconds);
            tiempoTranscurridoTotalSeconds++;
            tiempoTranscurridoInput.value = formatTime(tiempoTranscurridoTotalSeconds);
            updateCobrar(tiempoTranscurridoTotalSeconds);
        }
        else {
            clearInterval(intervalId);
            updateCobrar(tiempoPedidoTotalSeconds); // Update cobrar for full duration
        }
    };
    const updateCobrar = (transcurridoSeconds) => {
        const transcurridoMinutes = transcurridoSeconds / 60;
        const cobrarAmount = transcurridoMinutes * rentPricePerMinute;
        cobrarInput.value = `$${cobrarAmount.toFixed(2)}`;
    };
    const startTimer = () => {
        intervalId = setInterval(updateTimer, 1000);
    };
    const pauseTimer = () => {
        if (intervalId !== undefined) {
            clearInterval(intervalId);
            intervalId = undefined;
        }
    };
    const stopTimer = () => {
        pauseTimer();
        onStop();
    };
    pauseButton.addEventListener('click', () => {
        var _a, _b, _c, _d;
        if (isPaused) {
            startTimer();
            (_a = pauseButton.parentElement) === null || _a === void 0 ? void 0 : _a.classList.remove("bg-success");
            (_b = pauseButton.parentElement) === null || _b === void 0 ? void 0 : _b.classList.add("bg-warning");
            pauseButton.textContent = 'Pausar';
        }
        else {
            pauseTimer();
            (_c = pauseButton.parentElement) === null || _c === void 0 ? void 0 : _c.classList.add("bg-success");
            (_d = pauseButton.parentElement) === null || _d === void 0 ? void 0 : _d.classList.remove("bg-warning");
            pauseButton.textContent = 'Reanudar';
        }
        isPaused = !isPaused;
    });
    stopButton.addEventListener('click', stopTimer);
    startTimer();
}
function parseTime(time) {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return { totalSeconds: hours * 3600 + minutes * 60 + seconds };
}
function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
// Ejemplo de uso
const formValues = {
    computerName: "Computadora 1",
    rentPrice: "$10",
    tiempoPedido: "01:00:00"
};
const node = createHtml(formValues);
document.body.appendChild(node); // Agregar el nodo al cuerpo del documento
const onStop = () => {
    console.log('El temporizador se ha detenido.');
};
if (formValues.tiempoPedido === '00:00:00') {
    const tiempoPedidoInput = node.querySelector('#tiempo-pedido');
    tiempoPedidoInput.value = 'Libre';
    const tiempoTranscurridoInput = node.querySelector('#tiempo-transcurrido');
    tiempoTranscurridoInput.value = 'Tiempo transcurrido';
    let tiempoTranscurridoTotalSeconds = 0;
    const intervalId = setInterval(() => {
        tiempoTranscurridoTotalSeconds++;
        tiempoTranscurridoInput.value = formatTime(tiempoTranscurridoTotalSeconds);
        updateCobrar(tiempoTranscurridoTotalSeconds);
    }, 1000);
    const stopButton = node.querySelector('#stop-button');
    stopButton.addEventListener('click', () => {
        clearInterval(intervalId);
        onStop();
    });
}
else {
    startCountdown(node, formValues.tiempoPedido, formValues.rentPrice, onStop);
}
function updateCobrar(transcurridoSeconds) {
    const rentPricePerMinute = parseFloat(formValues.rentPrice.replace('$', '')) / 60;
    const transcurridoMinutes = transcurridoSeconds / 60;
    const cobrarAmount = transcurridoMinutes * rentPricePerMinute;
    const cobrarInput = node.querySelector('#cobrar');
    cobrarInput.value = `$${cobrarAmount.toFixed(2)}`;
}
