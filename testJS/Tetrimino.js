function crearBaseTetriminos() {
    tetriminosBase = {
        "Z": {
            color: "red",
            mapa: [
                createVector(),
                createVector(-1,-1),
                createVector(0, -1),
                createVector(1, 0)
            ]
        },
        "S": {
            color: "Green",
            mapa: [
                createVector(),
                createVector(1,-1),
                createVector(0, -1),
                createVector(-1, 0)
            ]
        },
        "J": {
            color: "Orange",
            mapa: [
                createVector(),
                createVector(-1, 0),
                createVector(-1, -1),
                createVector(1, 0)
            ]
        },
        "L": {
            color: "dodgerblue",
            mapa: [
                createVector(),
                createVector(-1, 0),
                createVector(1, -1),
                createVector(1, 0)
            ]
        },
        "T": {
            color: "Magenta",
            mapa: [
                createVector(),
                createVector(-1, 0),
                createVector(1, 0),
                createVector(0, -1)
            ]
        },
        "O": {
            color: "Yellow",
            mapa: [
                createVector(),
                createVector(0, -1),
                createVector(1, 0),
                createVector(1, -1)
            ]
        },
        "I": {
            color: "Cyan",
            mapa: [
                createVector(),
                createVector(-1, 0),
                createVector(1, 0),
                createVector(2, 0)
            ]
        }
    }
}

class Tetrimino {
    constructor(nombre = random(["Z","S","J","L","T","O","I"])) {
        this.nombre = nombre
        let base = tetriminosBase[nombre]
        this.color = base.color
        this.mapa = []
        for (const pmino of base.mapa) {
            this.mapa.push(pmino.copy())
        }
        this.position = createVector(int(tablero.columnas / 2), 0);
    }

    moverDerecha() {
        this.position.x++
        if (this.movimientoErroneo) {
            this.moverIzquierda()
        }
    }

    moverIzquierda() {
        this.position.x--
        if (this.movimientoErroneo) {
            this.moverDerecha()
        }
    }

    moverAbajo() {
        this.position.y++
        if (this.movimientoErroneo) {
            this.moverArriba()
            tablero.almacenarMino = this
            tetrimino = new Tetrimino
        }
    }

    moverArriba() {
        this.position.y--
    }

    girar() {
        for (const pmino of this.mapa) {
            pmino.set(pmino.y, -pmino.x)
        }
        if (this.movimientoErroneo) {
            this.desgirar()
        }
    }

    desgirar() {
        for (const pmino of this.mapa) {
            pmino.set(-pmino.y, pmino.x)
        }
    }

    get movimientoErroneo() {
        let salioDelTablero = !this.estaDentroDelTablero;
        return salioDelTablero
    }

    get estaDentroDelTablero() {
        for (const pmino of this.mapaTablero) {
            if (pmino.x<0) { //evita salida izquierda
                return false
            }
            if (pmino.x >= tablero.columnas) {//evita salida derecha
                return false
            }
            if (pmino.y >= tablero.filas) { //evita salida abajo
                return false
            }
        }
        return true
    }

    get mapaTablero() {
        let retorno = []
        for (const pmino of this.mapa) {
            let copy = pmino.copy().add(this.position)
            retorno.push(copy)
        }
        return retorno
    }

    get mapaCanvas() {
        let retorno = []
        for (const pmino of this.mapa) {
            let copy = pmino.copy().add(this.position)
            retorno.push(tablero.coordenada(copy.x, copy.y))
        }
        return retorno
    }

    /*Dibujado de tetrimino*/
    dibujar() {
        push()
        fill(this.color)
        for (const pmino of this.mapaCanvas) {
            Tetrimino.dibujarMino(pmino)
        }
        pop()
    }

    static dibujarMino(pmino) {
        rect(pmino.x, pmino.y, tablero.ladoCelda)
        push()
        noStroke()
        fill(255,255,255,100)
        beginShape()
        vertex(pmino.x, pmino.y)
        vertex(pmino.x + tablero.ladoCelda, pmino.y)
        vertex(pmino.x + tablero.ladoCelda, pmino.y + tablero.ladoCelda)
        endShape(CLOSE)
        beginShape()
        fill(0,0,0,80)
        vertex(pmino.x, pmino.y)
        vertex(pmino.x, pmino.y + tablero.ladoCelda)
        vertex(pmino.x + tablero.ladoCelda, pmino.y + tablero.ladoCelda)
        endShape(CLOSE)
        pop()
    }
}
