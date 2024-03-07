class Board {
    constructor() {
      this.columns = Variables.columnsRows[0];
      this.rows = Variables.columnsRows[1];
      this.cellSize = 25;
      this.width = this.columns * this.cellSize;
      this.height = this.rows * this.cellSize;
      this.position = createVector(
        MARGIN_PADDING[0],
        MARGIN_PADDING[0] + 2 * this.cellSize
      );
      this.storedPieces = [];
      for (let row = 0; row < this.rows; row++) {
        this.storedPieces[row] = [];
        for (let col = 0; col < this.columns; col++) {
          this.storedPieces[row].push("");
        }
      }
    }
  
    set storePiece(piece) {
      for (const P of piece.boardMap) {
        if (P.y < 0) {
          document.getElementById("inputScore").value = score;
          document.getElementById("inputLevel").value = level;
          document.getElementById("inputLines").value = linesMade;
          document.getElementById("submitInfo").click();
          break;
        }
        this.storedPieces[P.x][P.y] = piece.name;

        Variables.isPieceHold = true;
      }
      this.searchHorizontalLinesToClear();
    }

    searchAllLines() {
      let lines = [];

      for (let row = 0; row < this.rows; row++) {
        let haveContent = false;

        for (let col = 0; col < this.columns; col++) {
          if (this.storedPieces[col][row]) {
            haveContent = true;

            break;
          }
        }

        if (haveContent) {
          lines.push(row);
        }
      }

      this.clearHorizontalLines(lines);
    }
  
    searchHorizontalLinesToClear() {
      let lines = [];
      for (let row = this.rows; row >= 0; row--) {
        let add = true;
        for (let col = 0; col < this.columns; col++) {
          if (!this.storedPieces[col][row]) {
            add = false;
            break;
          }
        }
        if (add) {
          lines.push(row);
          score += scoreSum;
        }
      }
      this.clearHorizontalLines(lines);
    }
  
    clearHorizontalLines(lines) {
      linesMade += lines.length;
      for (const line of lines) {
        for (let row = line; row >= 0; row--) {
          for (let col = 0; col < this.columns; col++) {
            if (row == 0) {
              this.storedPieces[col][row] = "";
              continue;
            }
            this.storedPieces[col][row] = this.storedPieces[col][row - 1];
          }
        }
      }
    }
  
    coordinates(x, y) {
      return createVector(x, y).mult(this.cellSize).add(this.position);
    }
  
    drawSelf() {
      push();
      noStroke();
      for (let col = 0; col < this.columns; col++) {
        for (let row = 0; row < this.rows; row++) {
            switch(level) {
                case 7:
                    fill("black");
                    break;
                case 8:
                    fill("white");

                    Variables.gameTittle.innerHTML = "<h1>The END is here</h1>"
                    Variables.gameTittle.style.color = "black";
                    break;
                default:
                    fill("#090404");
            }

          let c = this.coordinates(col, row);
          rect(c.x, c.y, this.cellSize);
        }
      }
      pop();
      this.drawStoredPieces();
    }
  
    drawStoredPieces() {
      push();
      for (let col = 0; col < this.columns; col++) {
        for (let row = 0; row < this.rows; row++) {
          let pieceName = this.storedPieces[col][row];
          if (pieceName) {
            fill(basePiece[pieceName].color);
            Piece.drawPiece(this.coordinates(col, row));
          }
        }
      }
      pop();
    }
  }
  