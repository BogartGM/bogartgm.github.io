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
              class="form-control border-0 bg-light"
              placeholder="Nombre"
              value="${values.computerName}"
              disabled
            />
            <label for="computer-name">Nombre computadora</label>
          </div>
        </div>
        <div class="col-md-2">
          <div class="form-floating">
            <input
              id="rent-price"
              type="string"
              class="form-control border-0 bg-light"
              placeholder="Precio"
              value="${values.rentPrice}"
              disabled
            />
            <label for="rent-price">Precio/Hora</label>
          </div>
        </div>
        <div class="col-md-2">
          <div class="form-floating">
            <input
              id="tiempo-pedido"
              class="form-control border-0 bg-light"
              type="string"
              value="${values.tiempoPedido}"
              disabled
            />
            <label for="tiempo-pedido">Tiempo pedido</label>
          </div>
        </div>
        <div class="col-md-2">
          <div class="form-floating">
            <input
              id="tiempo-restante"
              class="form-control border-0 bg-light"
              type="string"
              value="${values.tiempoPedido}"
              disabled
            />
            <label for="tiempo-restante">Tiempo transcurrido</label>
          </div>
        </div>
        <div class="col-md-2">
          <div class="form-floating">
            <input
              id="cobrar"
              class="form-control border-0 bg-light"
              type="string"
              value="$0"
              disabled
            />
            <label for="cobrar">Cobrar</label>
          </div>
        </div>
        <div class="col-md d-flex align-items-center bg-warning p-0">
          <div id="pause-button" class="text-center text-light w-100 h-100">
            Pausar
          </div>
        </div>
        <div class="col-md d-flex align-items-center bg-danger rounded-end-2 p-0">
          <div id="stop-button" class="text-center text-light w-100 h-100">
            Detener
          </div>
        </div>
      </div>
    </div>
  `;
    return template.content.firstElementChild;
}
export function startCountdown(element, tiempoPedido, rentPrice, onStop) {
    var _a;
    const tiempoRestanteInput = element.querySelector('#tiempo-restante');
    const cobrarInput = element.querySelector('#cobrar');
    const pauseButton = element.querySelector('#pause-button');
    const stopButton = element.querySelector('#stop-button');
    let tiempoRestante = { totalSeconds: 0 }; // Comienza en 0
    let tiempoPedidoTotalSeconds = parseTime(tiempoPedido).totalSeconds;
    let intervalId;
    let isPaused = false;
    const rentPricePerMinute = parseFloat(rentPrice.replace('$', '')) / 60;
    // Restablecer el valor inicial del tiempo restante a 0
    tiempoRestanteInput.value = formatTime(0);
    const updateTimer = () => {
        if (tiempoRestante.totalSeconds < tiempoPedidoTotalSeconds) { // Termina en el tiempo pedido
            tiempoRestante.totalSeconds++;
            tiempoRestanteInput.value = formatTime(tiempoRestante.totalSeconds);
            updateCobrar(tiempoRestante.totalSeconds);
        }
        else {
            clearInterval(intervalId);
            updateCobrar(tiempoPedidoTotalSeconds); // Update cobrar for full duration
            stopTimer();
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
