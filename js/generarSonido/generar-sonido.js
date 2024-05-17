let sound = null;
// Función para reproducir un sonido en bucle
export function playSoundLoop(audioSrc) {
    if (!sound) {
        sound = new Audio(audioSrc);
        sound.loop = true;
        sound.play();
    }
    else {
        sound.src = audioSrc;
        sound.loop = true;
        sound.currentTime = 0; // Reinicia la reproducción desde el inicio
        sound.play();
    }
}
// Función para detener el sonido
export function stopSound() {
    if (sound) {
        sound.pause();
        sound.currentTime = 0;
        sound = null; // Limpiar el objeto de sonido para que al reproducir de nuevo inicie desde el principio
    }
}
