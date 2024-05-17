let wheelTimeout = null;
export function handleWheelEvent(event, element) {
    event.preventDefault();
    // Si el temporizador está activo, cancelamos el nuevo evento
    if (wheelTimeout !== null) {
        return;
    }
    const step = event.deltaY < 0 ? 1 : -1;
    const currentValue = parseInt(element.value, 10);
    const minValue = parseInt(element.min, 10);
    const maxValue = parseInt(element.max, 10);
    let newValue = currentValue + step;
    // Validar el nuevo valor para que esté dentro de los límites
    if (newValue < minValue) {
        newValue = maxValue;
    }
    else if (newValue > maxValue) {
        newValue = minValue;
    }
    element.value = String(newValue).padStart(2, '0');
    // Configurar el temporizador para evitar múltiples eventos
    wheelTimeout = window.setTimeout(() => {
        wheelTimeout = null;
    }, 100); // 100ms de debounce, ajusta según sea necesario
}
