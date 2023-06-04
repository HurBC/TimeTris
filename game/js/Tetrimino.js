class Tetrimino {
    constructor(nombre = random(["Z", "S", "J", "L", "T", "O", "I"])) {
        this.nombre = nombre;
        let base = tetriminosBase[nombre];
        this.color = base.color;
        this.mapa = [];
        for (const pmino of base.mapa) {
            this.mapa.push(pmino.copy());
        }
        this.posición = createVector(int(tablero.columnas / 2), -1);
    }

    moverDerecha() {
        this.posición.x++;
        if (this.movimientoErroneo) {
            this.moverIzquierda();
        }
    }

    moverIzquierda() {
        this.posición.x--;
        if (this.movimientoErroneo) {
            this.moverDerecha();
        }
    }

    moverAbajo() {
        this.posición.y++;
        if (this.movimientoErroneo) {
            this.moverArriba();
            if (tetrimino == this) {
                tablero.almacenarMino = this;
                tetrimino = new Tetrimino();
            }
            return false
        }
        return true
    }

    moverArriba() {
        this.posición.y--;
    }

    ponerEnElFondo(){
        this.posición = this.espectro.posición
        this.moverAbajo()
        Score = Score + (ScoreSumn * 10);
    }

    girar() {
        for (const pmino of this.mapa) {
                pmino.set(pmino.y, -pmino.x);
        }
        if (this.movimientoErroneo) {
            this.desgirar();
        }
    }

    desgirar() {
        for (const pmino of this.mapa) {
            pmino.set(-pmino.y, pmino.x);
        }
    }

    get movimientoErroneo() {
        let salióDelTablero = !this.estáDentroDelTablero;
        return salióDelTablero || this.colisiónConMinosAlmacenados;
    }

    get colisiónConMinosAlmacenados() {
        for (const pmino of this.mapaTablero) {
            if (tablero.minosAlmacenados[pmino.x][pmino.y]) {
                return true;
            }
        }
        return false;
    }

    get estáDentroDelTablero() {
        for (const pmino of this.mapaTablero) {
            if (pmino.x < 0) {
                //Evita salida por izquierda
                return false;
            }
            if (pmino.x >= tablero.columnas) {
                //Evita salida por derecha
                return false;
            }
            if (pmino.y >= tablero.filas) {
                //Evita salida por abajo
                return false;
            }
        }
        return true;
    }

    get mapaTablero() {
        let retorno = [];
        for (const pmino of this.mapa) {
            let copy = pmino.copy().add(this.posición);
            retorno.push(copy);
        }
        return retorno;
    }
    get mapaCanvas() {
        let retorno = [];
        for (const pmino of this.mapa) {
            let copy = pmino.copy().add(this.posición);
            retorno.push(tablero.coordenada(copy.x, copy.y));
        }
        return retorno;
    }

    /* 
    Esta función se encargará del procesamiento lógico del dibujado de
    este objeto
    */
    dibujar() {
        push();
        fill(this.color);
        for (const pmino of this.mapaCanvas) {
            Tetrimino.dibujarMino(pmino);
        }
        pop();
        if (tetrimino == this) {
            this.dibujarEspectro();
        }
    }

    dibujarEspectro() {
        this.espectro = new Tetrimino(this.nombre);
        this.espectro.posición = this.posición.copy()
        for (let i = 0; i < this.mapa.length; i++) {
            this.espectro.mapa[i] = this.mapa[i].copy()
        }
        while (this.espectro.moverAbajo());
        push()
        drawingContext.globalAlpha = 0.3
        this.espectro.dibujar();
        pop()
    }

    static dibujarMino(pmino) {
        rect(pmino.x, pmino.y, tablero.lado_celda);
    }
}

function crearMapeoBaseTetriminos() {
    //Muy importante, no le pondan let, var, ni const de prefijo
    let Colors = [
        ["#853400", "#c06500", "#ff9800", "#ffcc50", "#ffff89", "#ee8b00", "#ffb12c"],
        ["#7f0000", "#bd0003", "#ff0000", "#ff6c3e", "#ffa372", "#ed0000", "#dd3a1e"],
        ["#003785", "#1465bb", "#2196f3", "#81c9fa", "#b9ffff", "#0089e4", "#4fafff"],
        ["#003400", "#006414", "#009929", "#5ccb5f", "#98ff96", "#008a1c", "#33b242"],
        ["#1b004b", "#4c007d", "#7f00b2", "#bc4ed8", "#f988ff", "#7100a4", "#9a2bcc"],
        ["#879200", "#c1c700", "#ffff00", "#ffff6a", "#ffffa2", "#eef000", "#ffff39"],
        ["#7f0000", "#bd0003", "#ff0000", "#ff6c3e", "#ffa372", "#ed0000", "#dd3a1e"],
        ["#306230", "#8bac0f", "#9bbc0f", "#306230", "#8bac0f", "#9bbc0f", "#306230"],
    ]
    let colorChoicedTetrimino = colorChoiced
    tetriminosBase = {
        Z: {
            color: Colors[colorChoicedTetrimino][0],
            mapa: [
                createVector(),
                createVector(-1, -1),
                createVector(0, -1),
                createVector(1, 0),
            ],
        },
        S: {
            color: Colors[colorChoicedTetrimino][1],
            mapa: [
                createVector(),
                createVector(1, -1),
                createVector(0, -1),
                createVector(-1, 0),
            ],
        },
        J: {
            color: Colors[colorChoicedTetrimino][2],
            mapa: [
                createVector(),
                createVector(-1, 0),
                createVector(-1, -1),
                createVector(1, 0),
            ],
        },
        L: {
            color: Colors[colorChoicedTetrimino][3],
            mapa: [
                createVector(),
                createVector(-1, 0),
                createVector(1, -1),
                createVector(1, 0),
            ],
        },
        T: {
            color: Colors[colorChoicedTetrimino][4],
            mapa: [
                createVector(),
                createVector(-1, 0),
                createVector(1, 0),
                createVector(0, -1),
            ],
        },
        O: {
            color: Colors[colorChoicedTetrimino][5],
            mapa: [
                createVector(),
                createVector(0, -1),
                createVector(1, -1),
                createVector(1, 0),
            ],
        },
        I: {
            color: Colors[colorChoicedTetrimino][6],
            mapa: [
                createVector(),
                createVector(-1, 0),
                createVector(1, 0),
                createVector(2, 0),
            ],
        },
    };
}