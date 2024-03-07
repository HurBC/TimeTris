class Variables{
    static colors = [
        ["#9f0c71", "#2db9a3", "#f3f42b", "#f98b4f", "#ff4963", "#ff3f6d", "#d8d645"],
        ["#B2E6F6", "#9BDDF4", "#7AD1F2", "#5FC8F1", "#42BEF0", "#2FB9EF", "#1AAEEC"],
        ["#FF7852", "#FFA180", "#FFBEAF", "#FFD5D1", "#FFE8EB", "#FFF6F5", "#FFFAFA"],
        ["#ea0c84", "#4bd5c0", "#f5f13a", "#ef723c", "#e31741", "#e03154", "#cce038"],
        ["#FF4136", "#FF725C", "#FFA39E", "#FFC3B5", "#FFDCD6", "#FFB5A1", "#FF9683"],
        ["#FF764E", "#FF9A6C", "#FFB78C", "#FFD2AC", "#FFE8C9", "#FFFBF0", "#FFFDF9"],
        ["#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff"],
        ["#000", "#000", "#000", "#000", "#000", "#000", "#000"]
    ];

    static shapes = ["Z", "S", "J", "L", "T", "O", "I"];

    static backgroundColors = [
        '#0026e9',
        '#F8E9D6',
        '#008f6f',
        '#ff00aa',
        '#f37600',
        '#ffff20',
        '#000',
        '#fff',
    ]

    static limitSpeed = [70, 100, 150, 250];

    static columnsRows = [10, 20];

    static start = false;

    static timeSTOP = false;

    static showPlayer = true;

    static isPieceHold = true;

    static hold = null;

    static globalScores = playersData.players;

    static clearIsReady = false;

    static clearScore = 1000 * level;

    static gameTittle = document.querySelector(".tittle_box");

    /* Methods */
    changeBackground() {
        let body = document.querySelector("body");

        body.style.background = Variables.backgroundColors[actualColor];
    }

    showMessage(message) {
        var box = document.querySelector(".box");
        var msg = document.querySelector(".text");
        var players = document.querySelector(".score");
        var tittle = document.querySelector(".tittle_box");

        if (message === false){
            box.classList.add('MessageOut');
            box.classList.remove('Message');

            tittle.classList.add('hide_tittle');
            tittle.classList.remove('show_tittle');

            players.style.right = -500 + "px";

            msg.innerHTML = "";
        }
        else {
            msg.innerHTML = "Pause, press S to continue";

            box.classList.add('Message');
            box.classList.remove('MessageOut');

            tittle.classList.remove('hide_tittle');
            tittle.classList.add('show_tittle');

            players.style.right = 0 + "px";
        }
    }

    showBestPlayers() {
        if (Variables.showPlayer === true) {
            var list = document.querySelector(".list");
    
            let sortedPlayers = Variables.globalScores.sort((a, b) => b.score - a.score);
    
            for (const player of sortedPlayers) {
                list.innerHTML += `<li>${player.name}: ${player.score}</li>`;
            }
    
            Variables.showPlayer = false;
        }
    }
    
    
    holdPiece() {
        if (Variables.isPieceHold) {
            if (Variables.hold == null) {
                Variables.hold = piece;
                piece = new Piece();

                Variables.isPieceHold = false;
            }
            else {
                let newHoldPiece = piece;
                piece = Variables.hold;
                piece.position = createVector(int(board.columns / 2), -1);
                Variables.hold = newHoldPiece;
                Variables.isPieceHold = false;
            }
        }
    }

    levelUp() {
        if (linesMade >= linesToUpLevel) {
            level++;
            actualColor++;
    
            linesToUpLevel *= 1.8;

            this.changeMusic();
            
            createBaseMap();

            method.changeBackground();
    
            Update.getRandomMethod();

            fall = fall / splitFall;
        }
    }

    changeMusic() {
        switch(level){
            case 2:
                actualMusic.pause();

                actualMusic = music[4];

                actualMusic.play();
                break;
            case 3:
                actualMusic.pause();

                actualMusic = music[5];

                actualMusic.play();
                break;
            case 4:
                actualMusic.pause();

                actualMusic = music[0];

                actualMusic.play();
                break;
            case 5:
                actualMusic.pause();

                actualMusic = music[3];

                actualMusic.play();
                break;
            case 6:
                actualMusic.pause();

                actualMusic = music[6];

                actualMusic.play();
                break;
            case 7:
                actualMusic.pause();

                actualMusic = music[8];

                actualMusic.play();
                break;
            case 8:
                actualMusic.pause();

                actualMusic = music[7];

                actualMusic.play();
                break;
        }
    }

    startGame() {
        Variables.start = true;
    }
}