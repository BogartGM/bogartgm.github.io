let usedIndexes = []; // Registro de índices utilizados

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

            // Verificar si se han utilizado todos los índices, en cuyo caso, restablecer el registro
            if (usedIndexes.length === lineas.length) {
                usedIndexes = [];
            }

            let index;
            do {
                index = Math.floor(Math.random() * lineas.length);
            } while (usedIndexes.includes(index)); // Evitar índices repetidos

            usedIndexes.push(index); // Registrar el nuevo índice utilizado

            let lineaAleatoria = lineas[index];
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
