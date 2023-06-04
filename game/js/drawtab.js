const MARGEN_TABLERO = 110
let regulador_velocidad_teclas = 0
let regulador_de_caida = 0
let lineas_hechas = 0
let Score = 0
let ScoreSumn = 1;
let Level = 2;
let SubirNivel = 5
let ColorsBack = [
    [`linear-gradient(152deg, #008eea 0%, #0026e9 35%, #25f4e9 100%)`],
    [`linear-gradient(152deg, #008f21 0%, #008f6f 35%, #219900 100%)`],
    [`linear-gradient(152deg, #ffff89 0%, #ffcc50 35%, #ff9800 100%)`],
    [`linear-gradient(152deg, #d30000 0%, #f37600 35%, #ff0080 100%)`],
    [`linear-gradient(152deg, #f4f500 0%, #ffff20 35%, #74f400 100%)`],
    [`linear-gradient(152deg, #7600a9 0%, #a80083 35%, #2700b3 100%)`],
    [`linear-gradient(152deg, #00f4f5 0%, #0076f4 35%, #00ff80 100%)`],
    [`#0f380f`],
]
let colorChoiced = 7
let start = false
let Music;
let Music2;
let Music3;
let musicPlayed = false;
let Blib;
let SpaceSound;
let ClearLineSound;
let levelUpTimer = 0;
let hold;
let holded = true;
let cooldown = false
const levelUpDuration = 3000;
let caida = 600;
let caidaDiv = 2;
let ColumasFilas = [10, 20];
let myFont;
let PopUp = true
let background = true;
let backToPast;

/* 
Generación de fondo dinámico
*/
let angulo_fondo = Math.random() * 360
let tono_fondo = Math.random() * 

function cambiarFondo() {
    
}
setInterval(() => {
    if(background) {
        colorSelected = colorChoiced
        document.body.style.background = ColorsBack[colorSelected]
        angulo_fondo += Math.random()
        tono_fondo += Math.random()
    }
}, 20);

/* 
Dificultad, hacer caer las piezas cada determinada cantidad de tiempo,
simulando una especie de gravedad, esto se hace fácilmente con un setInterval
*/
setInterval(() => {
    if (start === true) {
        if (millis() - regulador_de_caida < caida) {
            return
        }
        regulador_de_caida = millis()
        tetrimino.moverAbajo()
    }
}, 0);

function preload() {
    myFont = loadFont('../font/Tetris.ttf');
    soundFormats('mp3', 'wav');
    Music = loadSound('sound/TetrisClassic.mp3');
    Music2 = loadSound('sound/TetrisMusic2.mp3');
    Music3 = loadSound('sound/NightCall.wav')
    Blib = loadSound('sound/blipSelect.wav');
    SpaceSound = loadSound('sound/space.wav');
    ClearLineSound = loadSound('sound/ClearLine.wav');
}

/* 
La función setup es nativa de p5.js
y sirve para ajustar las propiedades iniciales de nuestros objetos 
y variables
*/
function setup() {
    createCanvas(windowWidth, windowHeight); //crea un canvas
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
    textFont(myFont);
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
    dibujarHold()
    tablero.dibujar()
    tetrimino.dibujar()
    keyEventsTetris()
    dibujarPopUp()
    if (levelUpTimer > 0) {
        fill(255, 0, 0)
        rect(50, 50, 200, 100)

        fill(255)
        textSize(40)
        textAlign(CENTER, CENTER)
        text("Level UP", 150, 100);
        Mejoras();
    }
    if (lineas_hechas >= SubirNivel) {
        Level++;
        if (Level % 2 == 0) {
            caida = caida / caidaDiv;
        }
        SubirNivel *= 1.8;
        changeMusic();
        if (Level >= 3) {
            changeColorback();
            crearMapeoBaseTetriminos();
        }
        levelUpTimer = levelUpDuration
    }
    if (levelUpTimer > 0) {
        levelUpTimer -= deltaTime;
        if (levelUpTimer < 0) {
            levelUpTimer = 0
        }
    }
    if (keyIsPressed && key === 's') {
        startGame();
    }
    if (!background) {
        backToPast = createVideo('../images/backToPast.mp4')
    
        backToPast.size(windowWidth, windowHeight * 2);
        backToPast.loop();
        backToPast.style('position', 'fixed');
        backToPast.style('top', '0');
        backToPast.style('left', '0');
        backToPast.style('z-index', '-1');
        backToPast.style('object-fit', 'cover');
    }
}

function dibuajarPuntajeScoreLevel() {
    fill(0, 0, 0, 0);
    rect(0, 170, 100, 80);
    push();
    textSize(20);
    strokeWeight(2);
    stroke("black");
    fill("white");
    textAlign(LEFT, TOP); // Ajuste agregado

    text(
        "Líneas: \n" + lineas_hechas,
        tablero.posición.x - tablero.ancho / 2 + 60, // Ajuste agregado
        tablero.posición.y + tablero.lado_celda / 2.5// Ajuste agregado
    );
    pop();

    fill(0, 0, 0, 0);
    rect(0, tablero.posición.y + tablero.lado_celda * 3, 100, 80);
    push();
    textSize(20);
    strokeWeight(2);
    stroke("black");
    fill("white");
    textAlign(LEFT, TOP); // Ajuste agregado

    text(
        "Score: \n" + Score,
        tablero.posición.x - tablero.ancho / 2 + 60, // Ajuste agregado
        tablero.posición.y + tablero.lado_celda * 3.5 // Ajuste agregado
    );
    pop();

    fill(0, 0, 0, 0);
    rect(0, tablero.posición.y + tablero.lado_celda * 6, 100, 80);
    push();
    textSize(20);
    strokeWeight(2);
    stroke("black");
    fill("white");
    textAlign(LEFT, TOP); // Ajuste agregado
    text(
        "Level: \n" + Level,
        tablero.posición.x - tablero.ancho / 2 + 60, // Ajuste agregado
        tablero.posición.y + tablero.lado_celda * 6.5// Ajuste agregado
    );
    pop();
}

function displayRectUpgrade(x) {
    fill(255)
    textSize(35)
    textAlign(CENTER, CENTER)
    text(x, 260, 200);
}

function dibujarHold() {
    // ...
    if (hold) {
        push();
        translate(-100, tablero.posición.y + tablero.lado_celda * 9 + 40);
        scale(0.5); // Escala la pieza para que quepa en el espacio del hold
        hold.posición = createVector(int(tablero.columnas / 2), -1);
        hold.dibujar();
        pop();
    } else {
        pop();
    }
    // ...
}

function dibujarPopUp() {
    if (!start && PopUp) {
        fill(0, 0, 0, 50);
        rect(0, windowHeight / 2.4, windowWidth, 100);
        fill(255, 255, 255);
        textSize(30);
        textAlign(CENTER, CENTER);
        text('Presiona la tecla S \n para jugar', 260, 450);
    } else {
        text('')
    }
}

function changeMusic() {
    if (Level === 3) {
        Music.stop()
        Music2.play()
    }
    if (Level === 5) {
        Music2.stop()
        Music3.play()
    }
}

function startGame() {
    start = true
    PopUp = false
    if (!musicPlayed) {
        Music.loop()
        musicPlayed = true
    }
}

function Holder() {
    if (holded) {
        if (!hold) {
            hold = tetrimino
            console.log(hold)
            tetrimino = new Tetrimino()
            holded = false
        } else {
            newHold = tetrimino
            tetrimino = hold
            tetrimino.posición = createVector(int(tablero.columnas / 2), -1);
            hold = newHold
            holded = false
        }
    }
}

function resetCooldown() {
    cooldown = false
}

let límite_regulador_velocidad_teclas = 60

function keyEventsTetris() {
    if (millis() - regulador_velocidad_teclas < límite_regulador_velocidad_teclas) {
        return
    }
    límite_regulador_velocidad_teclas = 60
    regulador_velocidad_teclas = millis()
    if ( start === true) {
        if (keyIsDown(RIGHT_ARROW)) {
            tetrimino.moverDerecha()
            regulador_de_caida = millis()
            if (Level < 3) {
                Blib.play()
            }
        }
        if (keyIsDown(LEFT_ARROW)) {
            tetrimino.moverIzquierda()
            regulador_de_caida = millis()
            if (Level < 3) {
                Blib.play()
            }
        }
        if (keyIsDown(DOWN_ARROW)) {
            tetrimino.moverAbajo()
            regulador_de_caida = millis()
            Score = Score + ScoreSumn;
            if (Level < 3) {
                Blib.play()
            }
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
            if (Level < 3) {
                SpaceSound.play()
            }
        }
        if (keyIsDown(67) && !cooldown) {
            Holder()
            cooldown = true
            setTimeout(resetCooldown, 500)
        }
    }

}