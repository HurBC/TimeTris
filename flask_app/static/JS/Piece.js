class Piece {
    constructor(name = random(Variables.shapes)) {
        let base = basePiece[name];

        this.name = name;
        this.color = base.color;
        this.map = [];
        this.position = createVector(board.columns / 2, -1);

        for (const P of base.map) {
            this.map.push(P.copy());
        }
    }

    /* Getters */
    get isColliding() {
        let isOutOfBoard = !this.isInOfBoard;

        return isOutOfBoard || this.isCollidingWithStoredPieces;
    }

    get isCollidingWithStoredPieces() {
        for (const P of this.boardMap) {

            if (board.storedPieces[P.x][P.y]) {

                return true;
            }
        }

        return false;
    
    }

    get isInOfBoard() {
        for (const P of this.boardMap) {
            if (P.x < 0) { return false; }
            else if (P.x >= board.columns) { return false; }
            else if (P.y >= board.rows) { return false; }
        }

        return true;
    }

    get boardMap() {
        let back = [];

        for (const P of this.map) {
            let copy = P.copy().add(this.position);

            back.push(copy);
        }

        return back;
    }

    get canvasMap() {
        let back = [];

        for (const P of this.map) {
            let copy = P.copy().add(this.position);

            back.push(board.coordinates(copy.x, copy.y));
        }

        return back;
    }

    /* Methods */

    MoveRight() {
        this.position.x++;

        if (this.isColliding) {

            this.MoveLeft();
        }
    }

    MoveLeft() {
        this.position.x--;

        if (this.isColliding) {
            this.MoveRight();
        }
    }

    MoveDown() {
        this.position.y++;

        if (this.isColliding) {
            this.position.y--;

            if (piece == this){
                board.storePiece = this;

                piece = new Piece();
            }

            return false
        }

        return true;
    }

    hardDrop() {
        this.position = this.spectrum.position;
        this.MoveDown();
        
        score += 100;
    }

    Spin() {
        for (const P of this.map) {
            P.set(P.y, -P.x);
        }

        if (this.isColliding) { this.Untwist(); }
    }

    Untwist() {
        for (const P of this.map) {
            P.set(-P.y, P.x);
        }
    }

    drawSelf() {
        push();
        fill(this.color);

        for (const P of this.canvasMap) { Piece.drawPiece(P); }

        pop();

        if (piece == this) { this.drawSpectrum(); }
    }

    drawSpectrum() {
        this.spectrum = new Piece(this.name);
        this.spectrum.position = this.position.copy();

        for (let i = 0; i < this.map.length; i++) {
            this.spectrum.map[i] = this.map[i].copy();
        }

        while (this.spectrum.MoveDown());
        push();
        drawingContext.globalAlpha = 0.3;
        this.spectrum.drawSelf();
        pop();
    }

    /* Static methods  */
    static drawPiece(piece) {
        rect(piece.x, piece.y, board.cellSize);
        push();
        noStroke();
        fill(255, 255, 255, 80);
        beginShape();
        vertex(piece.x, piece.y);
        vertex(piece.x + board.lado_celda, piece.y);
        vertex(piece.x + board.lado_celda, piece.y + board.lado_celda);
        endShape(CLOSE);
        beginShape();
        fill(0, 0, 0, 80);
        vertex(piece.x, piece.y);
        vertex(piece.x, piece.y + board.lado_celda);
        vertex(piece.x + board.lado_celda, piece.y + board.lado_celda);
        endShape(CLOSE);
        pop();
    }
}

function createBaseMap() {
    let colors = Variables.colors;

    let color = actualColor;

    basePiece = {
        Z: {
            color: colors[color][0],
            map: [
                createVector(),
                createVector(-1, -1),
                createVector(0, -1),
                createVector(1, 0),
            ]
        },
        S: {
            color: colors[color][1],
            map: [
                createVector(),
                createVector(1, -1),
                createVector(0, -1),
                createVector(-1, 0),
            ],
        },
        J: {
            color: colors[color][2],
            map: [
                createVector(),
                createVector(-1, 0),
                createVector(-1, -1),
                createVector(1, 0),
            ],
        },
        L: {
            color: colors[color][3],
            map: [
                createVector(),
                createVector(-1, 0),
                createVector(1, -1),
                createVector(1, 0),
            ],
        },
        T: {
            color: colors[color][4],
            map: [
                createVector(),
                createVector(-1, 0),
                createVector(1, 0),
                createVector(0, -1),
            ],
        },
        O: {
            color: colors[color][5],
            map: [
                createVector(),
                createVector(0, -1),
                createVector(1, -1),
                createVector(1, 0),
            ],
        },
        I: {
            color: colors[color][6],
            map: [
                createVector(),
                createVector(0, -1),
                createVector(0, 1),
                createVector(0, 2),
            ],
        }
    };
}
