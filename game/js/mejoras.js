function Mejoras() {
    var Aleatorie = 2;

    if (Aleatorie === 1) {
        var NameUpgrade = 'Mas puntaje'
        displayRectUpgrade(NameUpgrade);
        if (ScoreSumn === 1) {
            ScoreSumn++;
            console.log(ScoreSumn);
        } else {
            ScoreSumn = ScoreSumn + 2;
            console.log(ScoreSumn);
        }
    }
    if (Aleatorie === 2 && Level > 2) {
        var NameUpgrade = 'B2Past'
        displayRectUpgrade(NameUpgrade);
        start = false;
        background = false;

        setTimeout(function() {
            start = true;
            background = true
        }, 3000)
    }
}

function backToNormality() {
    ScoreSumn = 1;
}