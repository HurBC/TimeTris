/* Constants */
const MARGIN_PADDING = [110, 200];
const DISPLAY_GLOBAL_WIDTH = 200;

/* Variables */
let linesMade = 0;
let level = 1;
let actualColor = 0;
let linesToUpLevel = 7;
let score = 0;
let scoreSum = 40 * level;
let keySpeedRegulator = 0;
let limitKeySpeedRegulator;
let fallRegulator = 0;
let pause = false;
let fall = 600;
let splitFall = 1.7;

/* Music Variables */
let music = [];
let actualMusic;
let stopMusic;
let chaosMusic;

/* Pieces Movement */
setInterval(() => {
    if (Variables.start && Variables.timeSTOP === false) {
        if (millis() - fallRegulator < fall) { return }

        fallRegulator = millis()

        piece.MoveDown();
    }
}, 0);

/* Setup function */
function setup() {

    /* Canvas Creation */
    createCanvas(900, 600);
    
    /* Global Variables */
    board = new Board();

    createBaseMap();

    piece  = new Piece();
    method = new Variables();

    resizeCanvas(
        board.width + 2 * MARGIN_PADDING[0],
        board.height + 2 * MARGIN_PADDING[0] + 2*board.cellSize
    )

    method.changeBackground();
    music[0] = document.getElementById('hotLine');
    music[1] = document.getElementById('iLikeToSleep');
    music[2] = document.getElementById('Angels');
    music[3] = document.getElementById('theCircus');
    music[4] = document.getElementById('voyager');
    music[5] = document.getElementById('Dance');
    music[6] = document.getElementById('FUNKY');
    music[7] = document.getElementById('END');
    music[8] = document.getElementById('CountDOWN');
    stopMusic = document.getElementById('STOP');
    chaosMusic = document.getElementById('Chaos');
}

/* Draw function */
function draw() {
    clear()
    drawStats();
    drawHoldPieceBox();
    method.showBestPlayers();
    board.drawSelf();
    piece.drawSelf();
    displayClear()
    keyEvents()
    method.levelUp();
  
}

function drawHoldPieceBox() {
    if (Variables.hold != null) {
        push();
        translate(-100, board.position.y + board.cellSize * 11 + 40);
        scale(0.5);
        Variables.hold.position = createVector(int(board.columns / 2), -1);
        Variables.hold.drawSelf();
        pop();
    }
}

function displayClear() {
    Variables.clearIsReady = (score >= 1000) ? true : false;

    let clearText = (Variables.clearIsReady) ? "Ready" : "Off";

    fill(0, 0, 0, 0);
    rect(0, board.position.y + board.cellSize * 10.5, 100, 80);
    push();
    textSize(20);
    strokeWeight(2);
    stroke("black");
    fill("white");
    textAlign(LEFT, TOP);
    text(
        "Clear: \n" + clearText,
        board.position.x - board.width / 2 + 23,
        board.position.y + board.cellSize * 10.55 + 20
    );
    pop();

    return clearText;
}

function drawStats() {
    // Lines
    fill(0, 0, 0, 0);
    rect(0, 160, 100, 80);
    push();
    textSize(20);
    strokeWeight(2);
    stroke("black");
    fill("white");
    textAlign(LEFT, TOP);
    text(
        "Lines: \n" + linesMade,
        board.position.x - board.width / 2 + 23,
        board.position.y - board.cellSize / 2.55 + 20
    );
    pop();

    // Score
    fill(0, 0, 0, 0);
    rect(0, board.position.y + board.cellSize * 3.5, 100, 80);
    push();
    textSize(20);
    strokeWeight(2);
    stroke("black");
    fill("white");
    textAlign(LEFT, TOP);
    text(
        "Score: \n" + score,
        board.position.x - board.width / 2 + 23,
        board.position.y + board.cellSize * 3.5 + 10
    );
    pop();

    // Level
    fill(0, 0, 0, 0);
    rect(0, board.position.y + board.cellSize * 7, 100, 80);
    push();
    textSize(20);
    strokeWeight(2);
    stroke("black");
    fill("white");
    textAlign(LEFT, TOP);
    text(
        "Level: \n" + level,
        board.position.x - board.width / 2 + 23,
        board.position.y + board.cellSize * 6.55 + 20
    );
    pop();
}

function keyPressed() {
    if (keyCode === 83 && Variables.start == false) {
        method.showMessage(false);
        method.startGame();
        userStartAudio().then(function() {
            actualMusic = music[2];

            actualMusic.play();
        });
    }
    else if (keyCode == 27) {
        Variables.start = false;
        method.showMessage(true);
    }
    else if (keyCode == 67 && Variables.start != false) {
        method.holdPiece();
    }
    else if (keyCode == 88) {
        if (displayClear() == "Ready") {
            score -= Variables.clearScore;

            board.searchAllLines();
        }
    }
}

function keyEvents() {
    if (millis() - keySpeedRegulator < limitKeySpeedRegulator) {
        return
    }
    limitKeySpeedRegulator = Variables.limitSpeed[0];
    keySpeedRegulator = millis();

    if (Variables.start) {

        switch(true) {
            case keyIsDown(RIGHT_ARROW):

                piece.MoveRight();

                fallRegulator = millis();

                break;
            case keyIsDown(LEFT_ARROW):

                piece.MoveLeft();
                
                fallRegulator = millis();

                break;
            case keyIsDown(DOWN_ARROW):

                limitKeySpeedRegulator = Variables.limitSpeed[1];

                piece.MoveDown();

                fallRegulator = millis();

                break;
            case keyIsDown(UP_ARROW):
                limitKeySpeedRegulator = Variables.limitSpeed[2];

                piece.Spin();

                fallRegulator = millis();

                break;
            case keyIsDown(32):
                limitKeySpeedRegulator = Variables.limitSpeed[3];

                piece.hardDrop();

                fallRegulator = millis();
                
                break;
            default:
                break;
        }
    }
}
