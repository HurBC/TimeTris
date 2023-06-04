function Mejoras() {
    var Aleatorie = random([1, 2, 3]);
    var intervalID = null;
    var posCopy = null;
    var linCopy = lineas_hechas;
    var scorCopy = Score;
    copyScor = scorCopy;
    var levCopy = Level;

    if (Aleatorie === 1) {
        var NameUpgrade = 'Mas puntaje'
        x = NameUpgrade;
        if (ScoreSumn === 1) {
            ScoreSumn++;
            console.log(ScoreSumn);
        } else {
            ScoreSumn = ScoreSumn + 2;
            console.log(ScoreSumn);
        }
    }
    if (Aleatorie === 2) {
        var NameUpgrade = 'inverted controls';
        x = NameUpgrade;
        invControls = true;
    
        // Cancelar el intervalo anterior, si existe
        if (intervalID !== null) {
            clearInterval(intervalID);
        }
    
        intervalID = setInterval(function () {
            var NameUpgrade = 'Normal controls';
            x = NameUpgrade;
            invControls = false;
            clearInterval(intervalID);
        }, 10000);
    }
    if (Aleatorie === 3) {
        var NameUpgrade = generarCaracteresAleatorios(4);
        x = NameUpgrade;

        what = true;

        if (intervalID !== null) {
            clearInterval(intervalID);
        }

        intervalID = setInterval(function () {
            if (what === true) {
                lineas_hechas = linCopy;
                Level = levCopy;
                Score = scorCopy;
                what = false;
                clearInterval(intervalID)
            }
        }, 10000)

        setInterval(function () {
            if (what === true) {
                posCopy = tetrimino.posición
                Level = generarCaracteresAleatorios(4);
                lineas_hechas = generarCaracteresAleatorios(4);
                Score = generarCaracteresAleatorios(4);
                tetrimino = new Tetrimino();
                tetrimino.posición = posCopy
                colorChoiced = random([0,1,2,3,4,5,6])
                crearMapeoBaseTetriminos();
                tetrimino.moverDerecha();
                tetrimino.moverDerecha();
                tetrimino.moverIzquierda();
                tetrimino.moverIzquierda();
            }
        }, 50)
    }
}

function generarCaracteresAleatorios(cantidad) {
    const caracteres = "!@#$%^&*()-_+=[]{}|;:,.<>?";
    let resultado = "";
    for (let i = 0; i < cantidad; i++) {
        const indiceAzar = Math.floor(random(caracteres.length));
        const caracterAzar = caracteres.charAt(indiceAzar);
        resultado += caracterAzar;
    }
    return resultado;
}

function backToNormality() {
    ScoreSumn = 1;
    lineas_hechas = 0;
    Score = 0;
    Level = 1;
    SubirNivel = 5;
    start = false;
    PopUp = true;
    musicPlayed = false;
    Music.stop();
    Music2.stop();
    Music3.stop()
    colorChoiced = 7;
    crearMapeoBaseTetriminos();
    hold = undefined;
    caida = 600;
    caidaDiv = 2;
    colorChoiced = 7
    holded = true;
    cooldown = false;
    PopUp = true;
    invControls = false;
}