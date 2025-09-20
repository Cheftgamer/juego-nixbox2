let participantes = [];
let puntos = [];

let colores = ['rojo oscuro', 'azul oscuro', 'verde oscuro', 'amarillo oscuro', 'morado oscuro', 'gris oscuro'];
let coloresDict = {'rojo oscuro': 'dark red', 'azul oscuro': 'dark blue', 'verde oscuro': 'dark green', 'amarillo oscuro': 'dark yellow', 'morado oscuro': 'dark purple', 'gris oscuro': 'dark gray'};
let animales = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊'];
let animalesDict = {'🐶': 'dog', '🐱': 'cat', '🐭': 'mouse', '🐹': 'hamster', '🐰': 'rabbit', '🦊': 'fox'};
let emociones = ['😀', '😢', '😡', '😱', '😴', '😍'];
let emocionesDict = {'😀': 'happy', '😢': 'sad', '😡': 'angry', '😱': 'surprised', '😴': 'sleepy', '😍': 'in love'};
let cartas = [];
let cartasVolteadas = [];
let turnoActual = 0;
let paresEncontrados = 0;
let ultimoPar = false;
let juegoMemoriaIniciado = false;
let rondaActual = 0;
let maxRondas = 3;
let colorActual = '';
let animalActual = '';
let emocionActual = '';
let rondaAnimales = 0;
let rondaEmociones = 0;
let errores = [];
let adminAction = '';
let timer = 60;
let timerInterval;

// Event listener para el botón de iniciar juego
document.getElementById('iniciar-juego').addEventListener('click', iniciarJuego);

// Event listener para el botón Panel Admin principal
document.getElementById('panel-admin').addEventListener('click', () => {
    adminAction = 'panel-admin';
    document.getElementById('reglas-screen').style.display = 'none';
    document.getElementById('login-screen').style.display = 'block';
});

// Event listeners para todos los botones Panel Admin en los juegos
document.querySelectorAll('.panel-admin-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        adminAction = 'panel-admin';
        // Ocultar la pantalla actual
        document.querySelectorAll('[id$="-screen"]').forEach(screen => {
            screen.style.display = 'none';
        });
        document.getElementById('login-screen').style.display = 'block';
    });
});

// Event listeners para las funciones del panel de administrador
document.getElementById('ver-respuestas').addEventListener('click', () => {
    mostrarRespuestasInteractivas();
});

document.getElementById('ocultar-respuestas').addEventListener('click', () => {
    document.getElementById('respuestas-interactivas').style.display = 'none';
});

document.getElementById('ir-juego').addEventListener('click', () => {
    const selected = document.getElementById('cambiar-juego-select').value;
    if (selected) {
        document.getElementById('admin-screen').style.display = 'none';
        document.getElementById(selected).style.display = 'block';
    } else {
        alert('Por favor selecciona un juego');
    }
});

document.getElementById('resetear-puntos').addEventListener('click', () => {
    if (confirm('¿Estás seguro de que quieres resetear todos los puntos?')) {
        puntos.fill(0);
        errores.fill(0);
        alert('Puntos reseteados correctamente');
        actualizarTodasLasTablas();
    }
});

document.getElementById('cambiar-puntos-btn').addEventListener('click', () => {
    const index = parseInt(document.getElementById('cambiar-puntos-index').value);
    const valor = parseInt(document.getElementById('cambiar-puntos-valor').value);
    if (!isNaN(index) && index >= 0 && index < participantes.length && !isNaN(valor)) {
        puntos[index] = valor;
        alert(`Puntos de ${participantes[index]} cambiados a ${valor}`);
        actualizarTodasLasTablas();
        // Limpiar campos
        document.getElementById('cambiar-puntos-index').value = '';
        document.getElementById('cambiar-puntos-valor').value = '';
    } else {
        alert('Por favor ingresa valores válidos');
    }
});

document.getElementById('cambiar-respuestas').addEventListener('click', () => {
    // Función visual que simula cambio de respuesta
    const mensajes = [
        'Respuesta visual cambiada temporalmente',
        'Simulación de respuesta incorrecta activada',
        'Efecto visual aplicado (no afecta el juego)'
    ];
    const mensaje = mensajes[Math.floor(Math.random() * mensajes.length)];
    alert(mensaje);
    
    // Efecto visual temporal
    document.body.style.filter = 'hue-rotate(45deg)';
    setTimeout(() => {
        document.body.style.filter = 'none';
    }, 2000);
});
document.getElementById('admin-volver').addEventListener('click', () => {
    document.getElementById('admin-screen').style.display = 'none';
    document.getElementById('reglas-screen').style.display = 'block';
});
document.getElementById('login-btn').addEventListener('click', () => {
    const usuario = document.getElementById('login-usuario').value;
    const clave = document.getElementById('login-clave').value;
    if (usuario === 'Cheft_gamer68' && clave === 'nixbox top') {
        document.getElementById('login-screen').style.display = 'none';
        if (adminAction === 'ver-respuestas') {
            document.getElementById('respuestas-interactivas').style.display = 'block';
        } else if (adminAction === 'resetear-puntos') {
            puntos.fill(0);
            errores.fill(0);
            alert('Puntos reseteados');
            document.getElementById('admin-screen').style.display = 'block';
        } else if (adminAction === 'cambiar-puntos') {
            const index = parseInt(document.getElementById('cambiar-puntos-index').value);
            const valor = parseInt(document.getElementById('cambiar-puntos-valor').value);
            if (!isNaN(index) && index >= 0 && index < participantes.length && !isNaN(valor)) {
                puntos[index] = valor;
                alert('Puntos cambiados');
            }
            document.getElementById('admin-screen').style.display = 'block';
        } else if (adminAction === 'cambiar-juego') {
            const selected = document.getElementById('cambiar-juego-select').value;
            if (selected) {
                document.getElementById(selected).style.display = 'block';
            }
        } else if (adminAction === 'cambiar-respuestas') {
            alert('Respuesta cambiada visualmente');
            document.getElementById('admin-screen').style.display = 'block';
        } else {
            document.getElementById('admin-screen').style.display = 'block';
        }
        adminAction = '';
    } else {
        alert('Credenciales incorrectas');
    }
});
document.getElementById('login-volver').addEventListener('click', () => {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('reglas-screen').style.display = 'block';
});

// Event listeners para el juego (se ejecutan después de iniciar)
function setupGameListeners() {
    document.getElementById('agregar-participante').addEventListener('click', agregarParticipante);
    document.getElementById('inicio').addEventListener('click', girarRuleta);
}

function iniciarJuego() {
    const reglasScreen = document.getElementById('reglas-screen');
    const juegoScreen = document.getElementById('juego-screen');
    
    // Aplicar efecto de fade out a la pantalla de reglas
    reglasScreen.classList.add('fade-out');
    
    setTimeout(() => {
        reglasScreen.style.display = 'none';
        juegoScreen.style.display = 'block';
        juegoScreen.classList.add('fade-in');
        
        // Configurar los event listeners del juego
        setupGameListeners();
        
        // Inicializar la UI del juego
        actualizarUI();
    }, 500);
}

function agregarParticipante() {
    const input = document.getElementById('input-nombre');
    const nombre = input.value.trim();
    if (nombre && participantes.length < 10) {
        participantes.push(nombre);
        puntos.push(0);
        errores.push(0);
        input.value = '';
        actualizarUI();
    } else if (participantes.length >= 10) {
        alert('Máximo 10 participantes.');
    }
}

function actualizarUI() {
    const nombresContainer = document.getElementById('nombres-container');
    const ruleta = document.getElementById('ruleta');

    nombresContainer.innerHTML = '';
    const svg = ruleta.querySelector('svg');
    svg.innerHTML = '';

    participantes.forEach((nombre, index) => {
        // Mostrar nombres en lista
        const li = document.createElement('li');
        li.textContent = nombre;
        nombresContainer.appendChild(li);

        // Segmentos de ruleta
        const angulo = 360 / participantes.length;
        const anguloInicio = index * angulo;
        const anguloFin = (index + 1) * angulo;
        const x1 = 150 + 150 * Math.cos(anguloInicio * Math.PI / 180);
        const y1 = 150 + 150 * Math.sin(anguloInicio * Math.PI / 180);
        const x2 = 150 + 150 * Math.cos(anguloFin * Math.PI / 180);
        const y2 = 150 + 150 * Math.sin(anguloFin * Math.PI / 180);
        const largeArc = angulo > 180 ? 1 : 0;

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', `M 150 150 L ${x1} ${y1} A 150 150 0 ${largeArc} 1 ${x2} ${y2} Z`);
        path.setAttribute('fill', `hsl(${index * angulo}, 80%, 60%)`);
        svg.appendChild(path);

        // Text
        const anguloMedio = (anguloInicio + anguloFin) / 2;
        const tx = 150 + 100 * Math.cos(anguloMedio * Math.PI / 180);
        const ty = 150 + 100 * Math.sin(anguloMedio * Math.PI / 180);
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('id', `text-${index}`);
        text.setAttribute('x', tx);
        text.setAttribute('y', ty);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.setAttribute('fill', 'white');
        text.setAttribute('font-size', '12');
        text.setAttribute('transform', `rotate(${anguloMedio}, ${tx}, ${ty})`);
        text.textContent = nombre;
        svg.appendChild(text);
    });
}

function girarRuleta() {
    if (participantes.length === 0) {
        alert('Agrega al menos un participante.');
        return;
    }

    const ruleta = document.getElementById('ruleta');
    const giros = Math.random() * 360 + 360 * 5; // Múltiples giros
    const duracion = 3000; // 3 segundos

    const flecha = document.getElementById('flecha');
    ruleta.style.transition = `transform ${duracion}ms ease-out`;
    ruleta.style.transform = `rotate(${giros}deg)`;
    flecha.classList.add('pulse');

    setTimeout(() => {
        const anguloFinal = giros % 360;
        const segmentoAngulo = 360 / participantes.length;
        const indiceGanador = Math.floor((360 - anguloFinal) / segmentoAngulo) % participantes.length;
        document.getElementById('resultado').innerHTML = `<h2>¡${participantes[indiceGanador]} inicia el juego de memoria!</h2>`;
        flecha.classList.remove('pulse');
        // Iniciar juego de memoria
        setTimeout(() => iniciarMemoria(indiceGanador), 2000); // Esperar 2 segundos para mostrar el mensaje
    }, duracion);
}

function startTimer(nextTurnFunction, timerId, gameType) {
    timer = 60;
    const timerValueElement = document.getElementById(timerId);
    if (timerValueElement) {
        timerValueElement.textContent = timer;
    }
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timer--;
        if (timerValueElement) {
            timerValueElement.textContent = timer;
        }
        if (timer < 0) {
            clearInterval(timerInterval);
            nextTurnFunction(gameType);
        }
    }, 1000);
}

function finalizarJuego() {
    if (participantes.length === 0) {
        alert('No hay participantes.');
        return;
    }

    let maxPuntos = -1;
    let ganadores = [];

    participantes.forEach((nombre, index) => {
        if (puntos[index] > maxPuntos) {
            maxPuntos = puntos[index];
            ganadores = [nombre];
        } else if (puntos[index] === maxPuntos) {
            ganadores.push(nombre);
        }
    });

    const resultado = ganadores.length === 1 ? `El ganador es ${ganadores[0]} con ${maxPuntos} puntos.` : `Empate entre: ${ganadores.join(', ')} con ${maxPuntos} puntos.`;
    document.getElementById('resultado').textContent = resultado;
}

function iniciarMemoria(indiceInicio) {
    turnoActual = indiceInicio;
    juegoMemoriaIniciado = true;
    paresEncontrados = 0;
    ultimoPar = false;
    cartasVolteadas = [];

    // Ocultar juego-screen, mostrar memoria-screen
    document.getElementById('juego-screen').style.display = 'none';
    document.getElementById('memoria-screen').style.display = 'block';

    // Generar cartas
    generarCartas();
    actualizarTurno('memoria');
    startTimer(cambiarTurno, 'timer-value-memoria', 'memoria');
}

function generarCartas() {
    cartas = [];
    colores.forEach(color => {
        cartas.push(color, color); // dos de cada
    });
    // Mezclar
    cartas = cartas.sort(() => Math.random() - 0.5);

    const container = document.getElementById('cartas-container');
    container.innerHTML = '';
    cartas.forEach((color, index) => {
        const carta = document.createElement('div');
        carta.classList.add('carta');
        carta.dataset.color = color;
        carta.dataset.index = index;
        carta.addEventListener('click', () => voltearCarta(carta));
        container.appendChild(carta);
    });
}

function voltearCarta(carta) {
    if (cartasVolteadas.length >= 2 || carta.classList.contains('volteada') || carta.classList.contains('encontrada')) return;

    carta.classList.add('volteada', carta.dataset.color);
    carta.textContent = carta.dataset.color; // Make text visible
    cartasVolteadas.push(carta);

    if (cartasVolteadas.length === 2) {
        setTimeout(verificarPareja, 1000);
    }
}

function verificarPareja() {
    const [c1, c2] = cartasVolteadas;
    if (c1.dataset.color === c2.dataset.color) {
        // Par encontrado
        c1.classList.add('encontrada');
        c2.classList.add('encontrada');
        puntos[turnoActual] += 1;
        if (ultimoPar) {
            puntos[turnoActual] += 3; // bono
        }
        ultimoPar = true;
        paresEncontrados += 1;
        actualizarPuntos('memoria');
        if (paresEncontrados === colores.length) {
            finalizarMemoria();
        }
        // Turno extra, no cambiar
    } else {
        // No coincide
        c1.classList.remove('volteada', c1.dataset.color);
        c2.classList.remove('volteada', c2.dataset.color);
        c1.textContent = ''; // Hide text again
        c2.textContent = ''; // Hide text again
        ultimoPar = false;
        cambiarTurno('memoria');
    }
    cartasVolteadas = [];
}

function cambiarTurno(game) {
    turnoActual = (turnoActual + 1) % participantes.length;
    actualizarTurno(game);
    startTimer(cambiarTurno, `timer-value-${game}`, game);
}

function actualizarTurno(game) {
    const turnoInfo = document.getElementById(`turno-info-${game}`);
    if(turnoInfo) {
        turnoInfo.innerHTML = `<h2>Turno de: ${participantes[turnoActual]}</h2>`;
    }
    actualizarPuntos(game);
}

function actualizarPuntos(game) {
    const container = document.getElementById(`puntos-${game}-container`);
    if(container) {
        container.innerHTML = '';
        participantes.forEach((nombre, index) => {
            const div = document.createElement('div');
            div.textContent = `${nombre}: ${puntos[index]}`;
            container.appendChild(div);
        });
    }
}

function finalizarMemoria() {
    clearInterval(timerInterval);
    let maxPuntos = Math.max(...puntos);
    let ganadores = participantes.filter((_, index) => puntos[index] === maxPuntos);
    const resultado = ganadores.length === 1 ? `El ganador del juego de memoria es ${ganadores[0]} con ${maxPuntos} puntos.` : `Empate en el juego de memoria entre: ${ganadores.join(', ')} con ${maxPuntos} puntos.`;
    document.getElementById('resultado-memoria').innerHTML = `<h2>${resultado}</h2>`;
    // Iniciar siguiente juego
    setTimeout(() => iniciarMemoriaAnimales(), 3000);
}

function iniciarMemoriaAnimales() {
    turnoActual = 0;
    paresEncontrados = 0;
    ultimoPar = false;
    cartasVolteadas = [];
    document.getElementById('memoria-screen').style.display = 'none';
    document.getElementById('memoria-animales-screen').style.display = 'block';
    generarCartasAnimales();
    actualizarTurno('memoria-animales');
    startTimer(cambiarTurno, 'timer-value-memoria-animales', 'memoria-animales');
}

function generarCartasAnimales() {
    cartas = [];
    animales.forEach(animal => {
        cartas.push(animal, animal);
    });
    cartas = cartas.sort(() => Math.random() - 0.5);
    const container = document.getElementById('cartas-animales-container');
    container.innerHTML = '';
    cartas.forEach((animal, index) => {
        const carta = document.createElement('div');
        carta.classList.add('carta-animal');
        carta.dataset.animal = animal;
        carta.dataset.index = index;
        carta.addEventListener('click', () => voltearCartaAnimal(carta));
        container.appendChild(carta);
    });
}

function voltearCartaAnimal(carta) {
    if (cartasVolteadas.length >= 2 || carta.classList.contains('volteada') || carta.classList.contains('encontrada')) return;
    carta.classList.add('volteada');
    carta.textContent = carta.dataset.animal;
    cartasVolteadas.push(carta);
    if (cartasVolteadas.length === 2) {
        setTimeout(verificarParejaAnimal, 1000);
    }
}

function verificarParejaAnimal() {
    const [c1, c2] = cartasVolteadas;
    if (c1.dataset.animal === c2.dataset.animal) {
        c1.classList.add('encontrada');
        c2.classList.add('encontrada');
        puntos[turnoActual] += 1;
        if (ultimoPar) {
            puntos[turnoActual] += 3;
        }
        ultimoPar = true;
        paresEncontrados += 1;
        actualizarPuntos('memoria-animales');
        if (paresEncontrados === animales.length) {
            finalizarMemoriaAnimales();
        }
    } else {
        c1.classList.remove('volteada');
        c1.textContent = '';
        c2.classList.remove('volteada');
        c2.textContent = '';
        ultimoPar = false;
        cambiarTurno('memoria-animales');
    }
    cartasVolteadas = [];
}

function finalizarMemoriaAnimales() {
    clearInterval(timerInterval);
    let maxPuntos = Math.max(...puntos);
    let ganadores = participantes.filter((_, index) => puntos[index] === maxPuntos);
    const resultado = ganadores.length === 1 ? `Fin del juego de memoria de animales. El líder es ${ganadores[0]} con ${maxPuntos} puntos.` : `Fin del juego de memoria de animales. Líderes: ${ganadores.join(', ')} con ${maxPuntos} puntos.`;
    document.getElementById('resultado-animales').innerHTML = `<h2>${resultado}</h2>`;
    setTimeout(() => iniciarMemoriaEmociones(), 3000);
}

function iniciarMemoriaEmociones() {
    turnoActual = 0;
    paresEncontrados = 0;
    ultimoPar = false;
    cartasVolteadas = [];
    document.getElementById('memoria-animales-screen').style.display = 'none';
    document.getElementById('memoria-emociones-screen').style.display = 'block';
    generarCartasEmociones();
    actualizarTurno('memoria-emociones');
    startTimer(cambiarTurno, 'timer-value-memoria-emociones', 'memoria-emociones');
}

function generarCartasEmociones() {
    cartas = [];
    emociones.forEach(emocion => {
        cartas.push(emocion, emocion);
    });
    cartas = cartas.sort(() => Math.random() - 0.5);
    const container = document.getElementById('cartas-emociones-container');
    container.innerHTML = '';
    cartas.forEach((emocion, index) => {
        const carta = document.createElement('div');
        carta.classList.add('carta-emocion');
        carta.dataset.emocion = emocion;
        carta.dataset.index = index;
        carta.addEventListener('click', () => voltearCartaEmocion(carta));
        container.appendChild(carta);
    });
}

function voltearCartaEmocion(carta) {
    if (cartasVolteadas.length >= 2 || carta.classList.contains('volteada') || carta.classList.contains('encontrada')) return;
    carta.classList.add('volteada');
    carta.textContent = carta.dataset.emocion;
    cartasVolteadas.push(carta);
    if (cartasVolteadas.length === 2) {
        setTimeout(verificarParejaEmocion, 1000);
    }
}

function verificarParejaEmocion() {
    const [c1, c2] = cartasVolteadas;
    if (c1.dataset.emocion === c2.dataset.emocion) {
        c1.classList.add('encontrada');
        c2.classList.add('encontrada');
        puntos[turnoActual] += 1;
        if (ultimoPar) {
            puntos[turnoActual] += 3;
        }
        ultimoPar = true;
        paresEncontrados += 1;
        actualizarPuntos('memoria-emociones');
        if (paresEncontrados === emociones.length) {
            finalizarMemoriaEmociones();
        }
    } else {
        c1.classList.remove('volteada');
        c1.textContent = '';
        c2.classList.remove('volteada');
        c2.textContent = '';
        ultimoPar = false;
        cambiarTurno('memoria-emociones');
    }
    cartasVolteadas = [];
}

function finalizarMemoriaEmociones() {
    clearInterval(timerInterval);
    let maxPuntos = Math.max(...puntos);
    let ganadores = participantes.filter((_, index) => puntos[index] === maxPuntos);
    const resultado = ganadores.length === 1 ? `Fin del juego de memoria de emociones. El líder es ${ganadores[0]} con ${maxPuntos} puntos.` : `Fin del juego de memoria de emociones. Líderes: ${ganadores.join(', ')} con ${maxPuntos} puntos.`;
    document.getElementById('resultado-emociones').innerHTML = `<h2>${resultado}</h2>`;
    setTimeout(() => iniciarJuegoColores(), 3000);
}

function iniciarJuegoColores() {
    rondaActual = 0;
    turnoActual = 0;
    document.getElementById('memoria-emociones-screen').style.display = 'none';
    document.getElementById('colores-screen').style.display = 'block';
    actualizarTurno('colores');
    actualizarRonda();
    mostrarColorAleatorio();
    document.getElementById('verificar-color').addEventListener('click', verificarRespuesta);
    startTimer(cambiarTurno, 'timer-value-colores', 'colores');
}

function mostrarColorAleatorio() {
    const coloresKeys = Object.keys(coloresDict);
    colorActual = coloresKeys[Math.floor(Math.random() * coloresKeys.length)];
    const div = document.getElementById('color-a-adivinar');
    div.className = '';
    div.classList.add(colorActual);
    document.getElementById('input-color').value = '';
    document.getElementById('mensaje-color').textContent = '';
}

function verificarRespuesta() {
    clearInterval(timerInterval);
    const input = document.getElementById('input-color').value.trim();
    const partes = input.split('/').map(p => p.trim().toLowerCase());
    if (partes.length !== 2) {
        document.getElementById('mensaje-color').textContent = 'Formato incorrecto. Usa "ingles / español"';
        return;
    }
    const [ingles, espanol] = partes;
    if (ingles === coloresDict[colorActual].toLowerCase() && espanol === colorActual.toLowerCase()) {
        document.getElementById('mensaje-color').textContent = '¡Correcto! +1 punto';
        puntos[turnoActual] += 1;
        actualizarPuntos('colores');
        setTimeout(mostrarColorAleatorio, 1000);
    } else {
        document.getElementById('mensaje-color').textContent = `Incorrecto. La respuesta correcta es: ${coloresDict[colorActual]} / ${colorActual}. Turno siguiente.`;
        errores[turnoActual] += 1;
        cambiarTurno('colores');
    }
}

function actualizarRonda() {
    document.getElementById('ronda-actual').textContent = rondaActual + 1;
}

function finalizarJuegoColores() {
    clearInterval(timerInterval);
    let maxPuntos = Math.max(...puntos);
    let ganadores = participantes.filter((_, index) => puntos[index] === maxPuntos);
    const resultado = ganadores.length === 1 ? `Fin del juego de colores. El líder es ${ganadores[0]} con ${maxPuntos} puntos.` : `Fin del juego de colores. Líderes: ${ganadores.join(', ')} con ${maxPuntos} puntos.`;
    document.getElementById('resultado-colores').innerHTML = `<h2>${resultado}</h2>`;
    // Iniciar siguiente juego
    setTimeout(() => iniciarJuegoAnimales(), 3000);
}

function iniciarJuegoAnimales() {
    rondaAnimales = 0;
    turnoActual = 0;
    document.getElementById('colores-screen').style.display = 'none';
    document.getElementById('animales-screen').style.display = 'block';
    actualizarTurno('animales');
    actualizarRondaAnimales();
    mostrarAnimalAleatorio();
    document.getElementById('verificar-animal').addEventListener('click', verificarRespuestaAnimal);
    startTimer(cambiarTurno, 'timer-value-animales', 'animales');
}

function mostrarAnimalAleatorio() {
    const animalesKeys = Object.keys(animalesDict);
    animalActual = animalesKeys[Math.floor(Math.random() * animalesKeys.length)];
    const div = document.getElementById('animal-a-adivinar');
    div.textContent = animalActual;
    document.getElementById('input-animal').value = '';
    document.getElementById('mensaje-animal').textContent = '';
}

function verificarRespuestaAnimal() {
    clearInterval(timerInterval);
    const input = document.getElementById('input-animal').value.trim();
    const partes = input.split('/').map(p => p.trim().toLowerCase());
    if (partes.length !== 2) {
        document.getElementById('mensaje-animal').textContent = 'Formato incorrecto. Usa "ingles / español"';
        return;
    }
    const [ingles, espanol] = partes;
    if (ingles === animalesDict[animalActual].toLowerCase() && espanol === animalActual.toLowerCase()) {
        document.getElementById('mensaje-animal').textContent = '¡Correcto! +1 punto';
        puntos[turnoActual] += 1;
        actualizarPuntos('animales');
        setTimeout(mostrarAnimalAleatorio, 1000);
    } else {
        document.getElementById('mensaje-animal').textContent = `Incorrecto. La respuesta correcta es: ${animalesDict[animalActual]} / ${animalActual}. Turno siguiente.`;
        errores[turnoActual] += 1;
        cambiarTurno('animales');
    }
}

function actualizarRondaAnimales() {
    document.getElementById('ronda-animales-actual').textContent = rondaAnimales + 1;
}

function finalizarJuegoAnimales() {
    clearInterval(timerInterval);
    let maxPuntos = Math.max(...puntos);
    let ganadores = participantes.filter((_, index) => puntos[index] === maxPuntos);
    const resultado = ganadores.length === 1 ? `Fin del juego de animales. El líder es ${ganadores[0]} con ${maxPuntos} puntos.` : `Fin del juego de animales. Líderes: ${ganadores.join(', ')} con ${maxPuntos} puntos.`;
    document.getElementById('resultado-animales-escritura').innerHTML = `<h2>${resultado}</h2>`;
    setTimeout(() => iniciarJuegoEmociones(), 3000);
}

function iniciarJuegoEmociones() {
    rondaEmociones = 0;
    turnoActual = 0;
    document.getElementById('animales-screen').style.display = 'none';
    document.getElementById('emociones-screen').style.display = 'block';
    actualizarTurno('emociones');
    actualizarRondaEmociones();
    mostrarEmocionAleatoria();
    document.getElementById('verificar-emocion').addEventListener('click', verificarRespuestaEmocion);
    startTimer(cambiarTurno, 'timer-value-emociones', 'emociones');
}

function mostrarEmocionAleatoria() {
    const emocionesKeys = Object.keys(emocionesDict);
    emocionActual = emocionesKeys[Math.floor(Math.random() * emocionesKeys.length)];
    const div = document.getElementById('emocion-a-adivinar');
    div.textContent = emocionActual;
    document.getElementById('input-emocion').value = '';
    document.getElementById('mensaje-emocion').textContent = '';
}

function verificarRespuestaEmocion() {
    clearInterval(timerInterval);
    const input = document.getElementById('input-emocion').value.trim();
    const partes = input.split('/').map(p => p.trim().toLowerCase());
    if (partes.length !== 2) {
        document.getElementById('mensaje-emocion').textContent = 'Formato incorrecto. Usa "ingles / español"';
        return;
    }
    const [ingles, espanol] = partes;
    if (ingles === emocionesDict[emocionActual].toLowerCase() && espanol === emocionActual.toLowerCase()) {
        document.getElementById('mensaje-emocion').textContent = '¡Correcto! +1 punto';
        puntos[turnoActual] += 1;
        actualizarPuntos('emociones');
        setTimeout(mostrarEmocionAleatoria, 1000);
    } else {
        document.getElementById('mensaje-mensaje-emocion').textContent = `Incorrecto. La respuesta correcta es: ${emocionesDict[emocionActual]} / ${emocionActual}. Turno siguiente.`;
        errores[turnoActual] += 1;
        cambiarTurno('emociones');
    }
}

function actualizarRondaEmociones() {
    document.getElementById('ronda-emociones-actual').textContent = rondaEmociones + 1;
}

function finalizarJuegoEmociones() {
    clearInterval(timerInterval);
    let maxPuntos = Math.max(...puntos);
    let ganadores = participantes.filter((_, index) => puntos[index] === maxPuntos);
    const resultado = ganadores.length === 1 ? `Fin del juego de emociones. El líder es ${ganadores[0]} con ${maxPuntos} puntos.` : `Fin del juego de emociones. Líderes: ${ganadores.join(', ')} con ${maxPuntos} puntos.`;
    document.getElementById('resultado-emociones-escritura').innerHTML = `<h2>${resultado}</h2>`;
    setTimeout(() => mostrarFinal(), 3000);
}

function mostrarFinal() {
    document.getElementById('emociones-screen').style.display = 'none';
    document.getElementById('final-screen').style.display = 'block';
    const tbody = document.getElementById('tabla-body');
    tbody.innerHTML = '';
    participantes.forEach((nombre, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${nombre}</td><td>${puntos[index]}</td><td>${errores[index]}</td>`;
        tbody.appendChild(tr);
    });
}

function actualizarTodasLasTablas() {
    actualizarPuntos('memoria');
    actualizarPuntos('colores');
    actualizarPuntos('memoria-animales');
    actualizarPuntos('animales');
    actualizarPuntos('memoria-emociones');
    actualizarPuntos('emociones');
}

// Funciones para el panel de administrador interactivo
function mostrarRespuestasInteractivas() {
    const container = document.getElementById('respuestas-interactivas');
    container.style.display = 'block';
    
    // Llenar respuestas de colores
    const coloresGrid = document.getElementById('respuestas-colores-grid');
    coloresGrid.innerHTML = '';
    Object.entries(coloresDict).forEach(([esp, ing]) => {
        const item = document.createElement('div');
        item.className = 'respuesta-item color';
        item.style.backgroundColor = getColorValue(esp);
        item.textContent = `${esp} → ${ing}`;
        coloresGrid.appendChild(item);
    });
    
    // Llenar respuestas de animales
    const animalesGrid = document.getElementById('respuestas-animales-grid');
    animalesGrid.innerHTML = '';
    Object.entries(animalesDict).forEach(([emoji, ing]) => {
        const item = document.createElement('div');
        item.className = 'respuesta-item';
        item.innerHTML = `${emoji} → <strong>${ing}</strong>`;
        animalesGrid.appendChild(item);
    });
    
    // Llenar respuestas de emociones
    const emocionesGrid = document.getElementById('respuestas-emociones-grid');
    emocionesGrid.innerHTML = '';
    Object.entries(emocionesDict).forEach(([emoji, ing]) => {
        const item = document.createElement('div');
        item.className = 'respuesta-item';
        item.innerHTML = `${emoji} → <strong>${ing}</strong>`;
        emocionesGrid.appendChild(item);
    });

    const escrituraColoresGrid = document.getElementById('respuestas-escritura-colores-grid');
    escrituraColoresGrid.innerHTML = '';
    Object.entries(coloresDict).forEach(([esp, ing]) => {
        const item = document.createElement('div');
        item.className = 'respuesta-item';
        item.textContent = `${esp} / ${ing}`;
        escrituraColoresGrid.appendChild(item);
    });

    const escrituraAnimalesGrid = document.getElementById('respuestas-escritura-animales-grid');
    escrituraAnimalesGrid.innerHTML = '';
    Object.entries(animalesDict).forEach(([emoji, ing]) => {
        const item = document.createElement('div');
        item.className = 'respuesta-item';
        item.innerHTML = `${emoji} → ${ing}`;
        escrituraAnimalesGrid.appendChild(item);
    });

    const escrituraEmocionesGrid = document.getElementById('respuestas-escritura-emociones-grid');
    escrituraEmocionesGrid.innerHTML = '';
    Object.entries(emocionesDict).forEach(([emoji, ing]) => {
        const item = document.createElement('div');
        item.className = 'respuesta-item';
        item.innerHTML = `${emoji} → ${ing}`;
        escrituraEmocionesGrid.appendChild(item);
    });
}

function getColorValue(colorName) {
    const colorMap = {
        'rojo oscuro': 'darkred',
        'azul oscuro': 'darkblue',
        'verde oscuro': 'darkgreen',
        'amarillo oscuro': '#666600',
        'morado oscuro': 'purple',
        'gris oscuro': 'darkgray'
    };
    return colorMap[colorName] || '#ccc';
}

function actualizarTodasLasTablas() {
    // No longer needed
}