let usedIndexes = []; // Registro de índices utilizados

function selectRandomPhrase(archivo, keyPressedId) {
  fetch(archivo)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al leer el archivo.");
      }
      return response.text();
    })
    .then((data) => {
      let lineas = data.split("\n");

      // Verificar si se han utilizado todos los índices, en cuyo caso, restablecer el registro
      if (usedIndexes.length === lineas.length) {
        usedIndexes = [];
      }

      let index;
      console.log(keyPressedId);
      if (keyPressedId == "before") {
        if (usedIndexes.length > 1) {
          usedIndexes.pop(); // corregir
          index = usedIndexes[usedIndexes.length - 1];
        } else {
          return; // Corregir
        }
      } else if (keyPressedId == "next") {
        do {
          index = Math.floor(Math.random() * lineas.length);
        } while (usedIndexes.includes(index)); // Evitar índices repetidos

        usedIndexes.push(index); // Registrar el nuevo índice utilizado
      } else {
        console.log("Something went wrong!");
      }

      let lineaAleatoria = lineas[index];
      let box = document.getElementById("frase");
      box.innerHTML = lineaAleatoria; // Corregir aquí
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// document.body.addEventListener('click', (e) => {
//     console.log("Clic en el cuerpo de la página.");
//     selectRandomPhrase('/frases.txt');
// });

document.getElementById("before").addEventListener("click", (e) => {
  selectRandomPhrase("/frases.txt", e.currentTarget.id);
});

document.getElementById("next").addEventListener("click", (e) => {
  selectRandomPhrase("/frases.txt", e.currentTarget.id);
});

document.addEventListener("DOMContentLoaded", (e) => {
  selectRandomPhrase("/frases.txt", "next");

  var trigger = document.getElementById("explotar");
  var explosion = document.getElementById("explosion");
  var overlay = document.getElementById("overlay");
  var isAnimating = false;

  trigger.addEventListener("click", function() {
    if (!isAnimating) {
      isAnimating = true;
      overlay.style.display = "block";
      gsap.to(explosion, {
        duration: 1,
        scale: 10,
        opacity: 0,
        ease: "power4.inOut",
        onComplete: function() {
          overlay.style.display = "none";
          // Restablecer la imagen a su tamaño original y opacidad
          gsap.set(explosion, { scale: 1, opacity: 1 });
          isAnimating = false;
          if (explosion.getAttribute("src") == "./assets/pichi.png") {
            explosion.setAttribute("src", "./assets/Lorenzo.png");
          } else {
            explosion.setAttribute("src", "./assets/pichi.png");
          }
          explosion.attributes.src = ""
        }
      });
    }
  });
});
