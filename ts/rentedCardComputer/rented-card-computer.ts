import { FormValues } from "../interfaces/formValues";

export function createHtml(values: FormValues): HTMLElement {
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
        <div class="col-md d-flex align-items-center bg-warning">
          <div id="pause-button" class="text-center text-light w-100">
            Pausar
          </div>
        </div>
        <div class="col-md d-flex align-items-center bg-danger rounded-end-2">
          <div id="stop-button" class="text-center text-light w-100">
            Detener
          </div>
        </div>
      </div>
    </div>
  `;

  return template.content.firstElementChild as HTMLElement;
}

export function startCountdown(element: HTMLElement, tiempoPedido: string, rentPrice: string, onStop: () => void) {
  const tiempoRestanteInput = element.querySelector('#tiempo-restante') as HTMLInputElement;
  const cobrarInput = element.querySelector('#cobrar') as HTMLInputElement;
  const pauseButton = element.querySelector('#pause-button') as HTMLElement;
  const stopButton = element.querySelector('#stop-button') as HTMLElement;

  let tiempoRestante = { totalSeconds: 0 }; // Comienza en 0
  let tiempoPedidoTotalSeconds = parseTime(tiempoPedido).totalSeconds;
  let intervalId: number | undefined;
  let isPaused = false;
  const rentPricePerMinute = 60 / parseFloat(rentPrice.replace('$', ''));

  // Restablecer el valor inicial del tiempo restante a 0
  tiempoRestanteInput.value = formatTime(0);

  const updateTimer = () => {
    if (tiempoRestante.totalSeconds < tiempoPedidoTotalSeconds) { // Termina en el tiempo pedido
      tiempoRestante.totalSeconds++;
      tiempoRestanteInput.value = formatTime(tiempoRestante.totalSeconds);
      updateCobrar(tiempoRestante.totalSeconds);
    } else {
      clearInterval(intervalId);
      updateCobrar(tiempoPedidoTotalSeconds); // Update cobrar for full duration
      stopTimer();
    }
  };

  const updateCobrar = (transcurridoSeconds: number) => {
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

  pauseButton.parentElement?.addEventListener('click', () => {
    if (isPaused) {
      startTimer();
      pauseButton.parentElement?.classList.remove("bg-success");
      pauseButton.parentElement?.classList.add("bg-warning");
      pauseButton.textContent = 'Pausar';
    } else {
      pauseTimer();
      pauseButton.parentElement?.classList.add("bg-success");
      pauseButton.parentElement?.classList.remove("bg-warning");
      pauseButton.textContent = 'Reanudar';
    }
    isPaused = !isPaused;
  });
  
  pauseButton.addEventListener('click', () => {
    if (isPaused) {
      startTimer();
      pauseButton.parentElement?.classList.remove("bg-success");
      pauseButton.parentElement?.classList.add("bg-warning");
      pauseButton.textContent = 'Pausar';
    } else {
      pauseTimer();
      pauseButton.parentElement?.classList.add("bg-success");
      pauseButton.parentElement?.classList.remove("bg-warning");
      pauseButton.textContent = 'Reanudar';
    }
    isPaused = !isPaused;
  });

  stopButton.addEventListener('click', stopTimer);

  startTimer();
}

function parseTime(time: string): { totalSeconds: number } {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return { totalSeconds: hours * 3600 + minutes * 60 + seconds };
}

function formatTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
