const MARGEN_TABLERO = 110
let regulador_velocidad_teclas = 0
let regulador_de_caida = 0
let lineas_hechas = 0
let Score = 0
let Level = 1
let SubirNivel = 5
let ColorsBack = [
    [`linear-gradient(152deg, #008eea 0%, #0026e9 35%, #25f4e9 100%)`],
    [`linear-gradient(152deg, #008f21 0%, #008f6f 35%, #219900 100%)`],
    [`linear-gradient(152deg, #ffff89 0%, #ffcc50 35%, #ff9800 100%)`],
    [`linear-gradient(152deg, #d30000 0%, #f37600 35%, #ff0080 100%)`],
    [`linear-gradient(152deg, #f4f500 0%, #ffff20 35%, #74f400 100%)`],
    [`linear-gradient(152deg, #7600a9 0%, #a80083 35%, #2700b3 100%)`],
    [`linear-gradient(152deg, #00f4f5 0%, #0076f4 35%, #00ff80 100%)`],
]
let colorChoiced = 0
let pause = false

/* 
Generación de fondo dinámico
*/
let angulo_fondo = Math.random() * 360
let tono_fondo = Math.random() * 360
setInterval(() => {
    colorSelected = colorChoiced
    document.body.style.background = ColorsBack[colorSelected]
    angulo_fondo += Math.random()
    tono_fondo += Math.random()
}, 20);

/* 
Dificultad, hacer caer las piezas cada determinada cantidad de tiempo,
simulando una especie de gravedad, esto se hace fácilmente con un setInterval
*/
setInterval(() => {
    if (millis() - regulador_de_caida < 300) {
        return
    }
    regulador_de_caida = millis()
    if (pause === false) {
        tetrimino.moverAbajo()
    }
}, 0);


/* 
La función setup es nativa de p5.js
y sirve para ajustar las propiedades iniciales de nuestros objetos 
y variables
*/
function setup() {
    createCanvas(900, 600) //crea un canvas
    /* 
    VARIABLES GLOBALES
    es importante que no le pongan let, ni var, ni const a las siguientes 
    variables. Para que puedan ser identificadas como globales
    */
    tablero = new Tablero()
    crearMapeoBaseTetriminos()
    tetrimino = new Tetrimino()
    resizeCanvas(
        tablero.ancho + 2 * MARGEN_TABLERO,
        tablero.alto + 2 * MARGEN_TABLERO + 2*tablero.lado_celda
    )
}

function changeColorback() {
    colorChoiced = random([0,1,2,3,4,5,6])
}

/* 
La función draw es nativa de p5.js
y sirve para dar instrucciones precisas de dibujo sobre el canvas
*/
function draw() {
    clear()
    dibuajarPuntajeScoreLevel()
    tablero.dibujar()
    tetrimino.dibujar()
    keyEventsTetris()
}

function dibuajarPuntajeScoreLevel() {
    push()
    textSize(20)
    strokeWeight(2)
    stroke("black")
    fill("white")
    text(
        "Líneas: \n" + lineas_hechas,
        tablero.posición.x - tablero.lado_celda * 3.5,
        tablero.posición.y + tablero.lado_celda
    )
    pop()
    push()
    textSize(20)
    strokeWeight(2)
    stroke("black")
    fill("white")
    text(
        "Score: \n" + Score,
        tablero.posición.x - tablero.lado_celda * 3.5,
        tablero.posición.y + tablero.lado_celda * 3.5
    )
    pop()
    push()
    if (lineas_hechas >= SubirNivel) {
        Level++
        SubirNivel *= 1.8
        changeColorback()
        crearMapeoBaseTetriminos()
    }
    textSize(20)
    strokeWeight(2)
    stroke("black")
    fill("white")
    text(
        "Level: \n" + Level,
        tablero.posición.x - tablero.lado_celda * 3.5,
        tablero.posición.y + tablero.lado_celda * 6
    )
    pop()
}

let límite_regulador_velocidad_teclas = 60

function keyEventsTetris() {
    if (millis() - regulador_velocidad_teclas < límite_regulador_velocidad_teclas) {
        return
    }
    límite_regulador_velocidad_teclas = 60
    regulador_velocidad_teclas = millis()

    if (keyIsDown(RIGHT_ARROW)) {
        tetrimino.moverDerecha()
        regulador_de_caida = millis()
    }
    if (keyIsDown(LEFT_ARROW)) {
        tetrimino.moverIzquierda()
        regulador_de_caida = millis()
    }
    if (keyIsDown(DOWN_ARROW)) {
        tetrimino.moverAbajo()
        regulador_de_caida = millis()
        Score += 1;
    }
    if (keyIsDown(UP_ARROW)) {
        límite_regulador_velocidad_teclas = 150
        tetrimino.girar()
        regulador_de_caida = millis()
    }
    if (keyIsDown(32)) {
        límite_regulador_velocidad_teclas = 150
        tetrimino.ponerEnElFondo()
        regulador_de_caida = millis()
    }
    if (keyIsDown(ESCAPE)) {
        if (pause == false) {
            pause = true
        } else if (pause == true) {
            pause = false
        }
    }
}