//variables
var world = []
var score = 100;
var level = 2;

//piezas
var t = [
    [0, 10],
    [0, 11],
    [0, 12],
    [1, 11],
    false
]

var l = [
    [2],
    [2],
    [2,2],
    false
]

var allPieces = [t, l]

//bucle
for(var i = 0; i < 41; i++){
    world[i] = [];
    for(var j = 0; j < 23; j++){
        world[i][j] = 0;
    }
}

//display
function displayWorld(){
    var output = '';
    for(var i = 0; i < world.length; i++){
        output += "\n <div class='row'>\n";
        for(let j = 0; j < world[i].length; j++){
            if(world[i][j] == 0){
                output += "<div class='block'></div>";
            }
            if(world[i][j] == 1){
                output += "<div class='tblock'></div>";
            }
            if(world[i][j] == 2){
                output += "<div class='lblock'></div>";
            }
        }
        output += "\n </div>";
    }
    document.getElementById('game').innerHTML = output;
}

function displayTBlock(){
    for(var i = 0; i < t.length - 1; i++){
        var x = t[i][0];
        var y = t[i][1];
        world[x][y] = 1;
    }
    displayWorld();
}

function moveLeft(){
    if(t[4] == true){
        for(var i = 0; i < t.length - 1; i++){
            if(t[i][1] == 0){
                break;
            }
            var x = t[i][0];
            var y = t[i][1];
            world[x][y] = 0;
            t[i][1]--;
            displayTBlock();
        }
    }
}

function moveRight() {
    if (t[4] == true) {
        for (var i = 0; i < t.length; i++) {
            var x = t[i][0];
            var y = t[i][1];
            world[x][y] = 0;
            t[i][1]++;
            displayTBlock();
            if(t[2][1] == 22){
                break;
            }
        }
    }
}

function moveBlocks(){
    if(t[4] == true){
        for(var i = 0; i < t.length - 1; i++){
            if(t[0][0] == 39){
                t[4] = false;
            }
            var x = t[i][0];
            var y = t[i][1];
            world[x][y] = 0;
            t[i][0]++;
            displayTBlock();
        }
    }
}

function dispalyScore(){
    document.getElementById('score').innerHTML = score;
}

function displayLevel(){
    document.getElementById('level').innerHTML = level;
}

//call
function startGame(){
    displayWorld();
    dispalyScore();
    displayLevel();
}

startGame();
setInterval(moveBlocks, 500);

//Game
document.onkeydown = function(e){
    if(e.key == 's'){
        t[4] = true;
        displayTBlock();
    }
    if(e.key == ' '){
        setInterval(moveTest, 100);
    }
    if(e.key == 'a'){
        moveLeft();
    }
    if(e.key == 'd'){
        moveRight();
    }
}