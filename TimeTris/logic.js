//variables
var world = [];
var score = 0;
var shapeChosse = '';
var level = 1;
var speed = 100;

const shapes = {
    T: [
        [0, 4],
        [0, 5],
        [0, 6],
        [1, 5],
        false
    ],
    L: [
        [0, 1],
        [1, 1],
        [2, 1],
        [2, 2],
        false
    ],
    O: [
        [0, 2],
        [0, 3],
        [1, 2],
        [1, 3],
        false
    ],
    I: [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        false
    ],
    S: [
        [2, 5],
        [2, 6],
        [1, 6],
        [1, 7],
        false
    ],
    Z: [
        [0, 7],
        [0, 8],
        [1, 8],
        [1, 9],
        false
    ],
    J: [
        [0, 10],
        [1, 10],
        [2, 10],
        [2, 9],
        false
    ]
}


//functions
function createWorld() {
    for (var i = 0; i < 23; i++) {
        world[i] = [];
            for (var j = 0; j < 11; j++) {
                world[i][j] = 0;
            }
    }
}

function displayWorld() {
    var output = '';
    for(var i = 0; i < world.length; i++) {
        output += "\n <div class='row'>\n";
        for(var j = 0; j < world[i].length; j++) {
            if (world[i][j] == 0) {
                output += "<div class='block'></div>";
            }
            if (world[i][j] == 1) {
                output += "<div class='tblock'></div>";
            }
            if (world[i][j] == 2) {
                output += "<div class='lblock'></div>";
            }
            if (world[i][j] == 3) {
                output += "<div class='iblock'></div>";
            }
            if (world[i][j] == 4) {
                output += "<div class='oblock'></div>";
            }
            if (world[i][j] == 5) {
                output += "<div class='sblock'></div>";
            }
            if (world[i][j] == 6) {
                output += "<div class='zblock'></div>";
            }
            if (world[i][j] == 7) {
                output += "<div class='jblock'></div>";
            }
        }
        output += "\n </div>";
    }
    document.getElementById('game').innerHTML = output;
}

function displayBlock(shape) {
    var blockMap = {
        "T": 1,
        "L": 2,
        "I": 3,
        "O": 4,
        "S": 5,
        "Z": 6,
        "J": 7
    };

    var value = blockMap[shape];

    if (value) {
        for (var i = 0; i < shapes[shape].length - 1; i++) {
            var x = shapes[shape][i][0];
            var y = shapes[shape][i][1];
            if (world[x][y] == 0) {
                world[x][y] = value;
            }
        }
        displayWorld();
    }
}


function moveToLeft(shape) {
    if (shapes.hasOwnProperty(shape) && shapes[shape][4] === true) {
        var blocks = shapes[shape];
        var canMoveLeft = true;

        if (canMoveLeft) {
            for (var i = 0; i < blocks.length - 1; i++) {
                var x = blocks[i][0];
                var y = blocks[i][1];
                if (blocks[i][1] > 0) {
                    world[x][y] = 0;
                    blocks[i][1] -= 1;
                    displayBlock(shape);
                } else {
                    break;
                }
            }
        }
    }
}

function moveToRight(shape) {
    if (shapes.hasOwnProperty(shape) && shapes[shape][4] === true) {
        var blocks = shapes[shape];
        var canMoveRight = true;

        for (var i = 0; i < blocks.length - 1; i++) {
            var x = blocks[i][0];
            var y = blocks[i][1];

            // Verificar si hay colisión en el lado derecho
            if (y === 10) {
                canMoveRight = false;
                break;
            }
        }

        if (canMoveRight) {
            for (var i = 0; i < blocks.length - 1; i++) {
                var x = blocks[i][0];
                var y = blocks[i][1];

                world[x][y] = 0;
                blocks[i][1] += 1;
            }

            displayBlock(shape);
        }
    }
}

function moveToBottom(shape) {
    if (shapes.hasOwnProperty(shape) && shapes[shape][4] === true) {
        var blocks = shapes[shape];
        var canMoveBottom = true;

        for (var i = 0; i < blocks.length - 1; i++) {
            var x = blocks[i][0];
            var y = blocks[i][1];

            if (x === 22) {
                canMoveBottom = false;
                shapes[shape][4] = false;
                shapeSelect();
                break;
            }
        }

        if (canMoveBottom) {
            for (var i = 0; i < blocks.length - 1; i++) {
                var x = blocks[i][0];
                var y = blocks[i][1];

                world[x][y] = 0;
                blocks[i][0] += 1;
                displayBlock(shape);
            }
        }
    }
}

function shapeSelect() {
    const shapeKeys = Object.keys(shapes);
    const randomKey = shapeKeys[Math.floor(Math.random() * shapeKeys.length)];
    const shapeC = shapes[randomKey];
    shapeC[4] = true;
    shapeChosse = randomKey
    displayBlock(randomKey);
}


createWorld();
displayWorld();

setInterval(function() {
    moveToBottom(shapeChosse);
}, speed);

//controls
document.onkeydown = function(e) {
    console.log(e.code);
    if (e.code == 'KeyT') {
        shapeSelect();
    }
    if (e.code == 'ArrowLeft') {
        moveToLeft(shapeChosse);
    }
    if (e.code == 'ArrowRight') {
        moveToRight(shapeChosse);
    }
}