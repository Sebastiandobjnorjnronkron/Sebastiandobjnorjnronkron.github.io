const juegos = [
  {
    id: 1,
    nombre: "Juego 1",
    categoria: "Aventura",
    favorito: false,
    imagen: "https://via.placeholder.com/100?text=Juego+1",
  },
  {
    id: 2,
    nombre: "Juego 2",
    categoria: "Acción",
    favorito: false,
    imagen: "https://via.placeholder.com/100?text=Juego+2",
  },
  {
    id: 3,
    nombre: "Juego 3",
    categoria: "Puzzle",
    favorito: false,
    imagen: "https://via.placeholder.com/100?text=Juego+3",
  },
];

const juegoLista = document.getElementById("juego-lista");

function mostrarJuegos() {
  juegoLista.innerHTML = ""; // Limpiar el contenedor
  juegos.forEach((juego) => {
    const div = document.createElement("div");
    div.className = "juego";

    // Añadir HTML para cada juego
    div.innerHTML = `
            <h3>${juego.nombre} <span onclick="toggleFavorito(${juego.id})">${
      juego.favorito ? "⭐" : "☆"
    }</span></h3>
            <img src="${juego.imagen}" alt="${juego.nombre}">
            <p>Categoría: ${juego.categoria}</p>
            <button onclick="verDetalles(${juego.id})">Ver Detalles</button>
        `;

    juegoLista.appendChild(div);
  });
}

mostrarJuegos(); // Mostrar los juegos

function verDetalles(id) {
  const juego = juegos.find((j) => j.id === id);
  const detalleDiv = document.getElementById("detalle");
  detalleDiv.innerHTML = `<p>${juego.nombre} - ${juego.categoria}</p>`;
  const jugarBtn = document.getElementById("jugar");
  jugarBtn.style.display = "none"; // Oculta el botón "Jugar"
  document.getElementById("iniciar-juego").style.display = "block"; // Muestra el botón "Iniciar Juego"
  juegoArea.style.display = "none"; // Oculta el área de juego
}

function iniciarJuego() {
  const personaje = document.getElementById("personaje");
  personaje.style.top = "150px";
  personaje.style.left = "175px"; // Centrar el personaje
  jugando = true;
  obstaculos = [];
  score = 0;
  crearObstaculos();
  juegoArea.style.display = "block"; // Muestra el área de juego
  document.getElementById("iniciar-juego").style.display = "none"; // Oculta el botón "Iniciar Juego"
  moverObstaculos();
}

function crearObstaculos() {
  const obstaculo = document.createElement("div");
  obstaculo.className = "obstaculo";
  obstaculo.style.width = "30px";
  obstaculo.style.height = "30px";
  obstaculo.style.position = "absolute";
  obstaculo.style.background = "blue";
  obstaculo.style.left = Math.random() * (juegoAreaWidth - 30) + "px";
  obstaculo.style.top = "0px";
  juegoArea.appendChild(obstaculo);
  obstaculos.push(obstaculo);
}

function moverObstaculos() {
  if (!jugando) return;

  obstaculos.forEach((obstaculo) => {
    let top = parseInt(window.getComputedStyle(obstaculo).top);
    obstaculo.style.top = top + 5 + "px"; // Mover el obstáculo hacia abajo

    // Si el obstáculo sale del área de juego, se elimina
    if (top > juegoAreaHeight) {
      obstaculo.remove();
      score++;
      crearObstaculos(); // Crear un nuevo obstáculo
    }
  });

  comprobarColisiones();
  requestAnimationFrame(moverObstaculos); // Continuar el movimiento
}

function comprobarColisiones() {
  const personaje = document.getElementById("personaje");
  const personajeRect = personaje.getBoundingClientRect();

  obstaculos.forEach((obstaculo) => {
    const obstaculoRect = obstaculo.getBoundingClientRect();
    if (
      personajeRect.x < obstaculoRect.x + obstaculoRect.width &&
      personajeRect.x + personajeRect.width > obstaculoRect.x &&
      personajeRect.y < obstaculoRect.y + obstaculoRect.height &&
      personajeRect.y + personajeRect.height > obstaculoRect.y
    ) {
      alert("¡Has chocado con un obstáculo!");
      jugando = false;
      juegoArea.style.display = "none";
      document.getElementById("iniciar-juego").style.display = "block"; // Muestra el botón para reiniciar
    }
  });
}

document
  .getElementById("iniciar-juego")
  .addEventListener("click", iniciarJuego);

document.addEventListener("keydown", (e) => {
  const personaje = document.getElementById("personaje");
  let top = parseInt(window.getComputedStyle(personaje).top);
  let left = parseInt(window.getComputedStyle(personaje).left);

  switch (e.key) {
    case "ArrowUp":
      if (top > 0) personaje.style.top = top - 10 + "px";
      break;
    case "ArrowDown":
      if (top < juegoAreaHeight - 50) personaje.style.top = top + 10 + "px";
      break;
    case "ArrowLeft":
      if (left > 0) personaje.style.left = left - 10 + "px";
      break;
    case "ArrowRight":
      if (left < juegoAreaWidth - 50) personaje.style.left = left + 10 + "px";
      break;
    default:
      break;
  }

  comprobarColisiones();
});

inputText.addEventListener("input", () => {
  textoEscrito.innerText = inputText.value;
});

filterInput.addEventListener("input", () => {
  const filterValue = filterInput.value.toLowerCase();
  juegoLista.innerHTML = "";
  juegos
    .filter((juego) => juego.categoria.toLowerCase().includes(filterValue))
    .forEach((juego) => {
      const div = document.createElement("div");
      div.className = "juego";
      div.innerHTML = `
            <h3>${juego.nombre} <span onclick="toggleFavorito(${juego.id})">${
        juego.favorito ? "⭐" : "☆"
      }</span></h3>
            <p>Categoría: ${juego.categoria}</p>
            <button onclick="verDetalles(${juego.id})">Ver Detalles</button>
        `;
      juegoLista.appendChild(div);
    });
});

document.getElementById("form-registro").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  console.log("Registro de desarrollador:", Object.fromEntries(formData));
  alert("Juego registrado!");
  e.target.reset();
});

mostrarJuegos();
