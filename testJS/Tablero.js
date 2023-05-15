class Tablero {
    constructor(){
        this.columnas = 10;
        this.filas = 20;
        this.ladoCelda = 25;
        this.ancho = this.columnas * this.ladoCelda;
        this.alto = this.filas * this.ladoCelda;
        this.position = createVector(
            MARGEN_TABLERO,
            MARGEN_TABLERO + this.ladoCelda
        );

        this.minosAlmacenados = [];
        for (let fila = 0; fila < this.filas; fila++) {
            this.minosAlmacenados[fila] = [];
            for (let columna = 0; columna < this.columnas; columna++) {
                this.minosAlmacenados[fila].push(" ");
            }
        }
    }

    set almacenarMino(tetrimino) {
        for (const pmino of tetrimino.mapaTablero) {
            this.minosAlmacenados[pmino.x][pmino.y] = tetrimino.nombre
        }
    }

    coordenada(x,y){
        return createVector(x,y).mult(this.ladoCelda).add(this.position)
    }

    /* Procesamiento Logico del dibujo del tablero*/
    dibujar() {
        push()
        noStroke()
        for (let columna = 0; columna < this.columnas; columna++) {
            for (let fila = 0; fila < this.filas; fila++) {
                if ((columna+fila)%2 == 0) {
                    fill("Black")
                }else {
                    fill("#003")
                }
                let c = this.coordenada(columna, fila);
                rect(c.x, c.y, this.ladoCelda)
            }
        }
        pop()
        this.dibujarMinosAlmacenados()
    }

    dibujarMinosAlmacenados() {
        push()
        for (let columna = 0; columna < this.columnas; columna++) {
            for (let fila = 0; fila < this.filas; fila++) {
                if (this.minosAlmacenados[columna][fila]) {
                    Tetrimino.dibujarMino(this.coordenada(columna, fila))
                }
            }
        }
        pop()
    }
}