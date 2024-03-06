function selectRandomPhrase(archivo) {
    fetch(archivo)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al leer el archivo.');
            }
            return response.text();
        })
        .then(data => {
            let lineas = data.split('\n');
            let lineaAleatoria = lineas[Math.floor(Math.random() * lineas.length)];

            putPhraseInBox('frase', lineaAleatoria);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function putPhraseInBox(elementId, frase) {
    let box = document.getElementById(elementId);
    box.innerHTML = frase; // Corregir aquí
}

document.body.addEventListener('click', (e) => {
    console.log("Clic en el cuerpo de la página.");
    selectRandomPhrase('/frases.txt');
});
