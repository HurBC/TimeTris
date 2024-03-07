class Update {

    static message = document.querySelector('.message_update');

    static getRandomMethod() {
        if (level === 2) {
            this.theUpSideDown();
        }
        else {

            let choice = Math.floor(Math.random() * (5 - 1 + 1)) + 1;

            switch (choice) {
                case 1:
                    this.iLikeSpeed();
                    break;
                case 2:
                    this.theUpSideDown();
                    break;
                case 3:
                    this.stopTime();
                    break;
                case 4:
                    if (level > 3){
                        this.CHAOS();
                    }
                    else {
                        this.getRandomMethod();
                    }
                    break;
            }
        }
    }

    static iLikeSpeed() {
        let originalValue = Variables.limitSpeed[0];

        this.message.innerHTML = "<h1>I Like Speed</h1>";

        this.message.classList.add("update_activate");
        this.message.classList.remove("update_disable");
    
        Variables.limitSpeed[0] = 14;

        setTimeout(() => {
            Variables.limitSpeed[0] = originalValue;

            this.message.innerHTML = ""

            this.message.classList.remove("update_activate");
            this.message.classList.add("update_disable");
        }, 10000);
    }
    
    static theUpSideDown() {
        let html = document.querySelector('html');

        html.style.filter = "invert(100%)";
        html.style.transform = "rotate(-180deg)";

        this.message.innerHTML = "<h1>The Upside Down</h1>";

        this.message.classList.add("update_activate");
        this.message.classList.remove("update_disable");


        setTimeout(() => {
            html.style.filter = "invert(0)";
            html.style.transform = "rotate(0deg)";

            this.message.innerHTML = ""

            this.message.classList.remove("update_activate");
            this.message.classList.add("update_disable");
        }, 10000);
    }

    static stopTime() {
        let html = document.querySelector('html');
        let body = document.querySelector('body');

        html.classList.add("time_stop");

        body.style.background = "black";

        this.message.innerHTML = "<h1>Stopped Time</h1>";

        this.message.classList.add("update_activate");
        this.message.classList.remove("update_disable");

        console.log(actualMusic);

        actualMusic.volume = 0.25;

        stopMusic.play();

        Variables.timeSTOP = true;


        setTimeout(() => {
            html.classList.remove("time_stop");


            actualMusic.volume = 1;

            Variables.timeSTOP = false;

            method.changeBackground();

            this.message.innerHTML = ""

            this.message.classList.remove("update_activate");
            this.message.classList.add("update_disable");
        }, 10000);
    }

    static CHAOS() {
        let originalValues = [linesMade, level, score, "<h1>TimeTris</h1>", actualColor]
        let isChaos = true;
        let positionPiece;
    
        this.message.innerHTML = "<h1>CH$=S</h1>";

        this.message.classList.add("update_activate");
        this.message.classList.remove("update_disable");

        actualMusic.volume = 0;
    
        setTimeout(() => {
            isChaos = false;
            linesMade = originalValues[0];
            level = originalValues[1];
            score = originalValues[2];
            document.querySelector(".tittle_box").innerHTML = originalValues[3];
            actualColor = originalValues[4];

            method.changeBackground();
            createBaseMap();

            actualMusic.volume = 1;

            this.message.innerHTML = ""

            this.message.classList.remove("update_activate");
            this.message.classList.add("update_disable");

            actualMusic.volume = 1;
        }, 7000)
    
        let intervalID = setInterval(() => {
            if (isChaos) {
                positionPiece = piece.position;
                linesMade = this.aleatorieCharacteres(4);
                level = this.aleatorieCharacteres(4);
                score = this.aleatorieCharacteres(4);
                document.querySelector(".tittle_box").innerHTML = this.aleatorieCharacteres(8);
                actualColor = Math.floor(Math.random() * (8 - 0 + 1)) + 0;
                piece = new Piece();
                piece.position = positionPiece;

                method.changeBackground();
                createBaseMap();

                piece.MoveRight()
                piece.MoveRight()
                piece.MoveLeft()
                piece.MoveLeft()

            } else {
                clearInterval(intervalID);
            }
        }, 50);
    }

    static aleatorieCharacteres(count) {
        const char = "!@#$%^&*()-_+=[]{}|;:,.<>?";
        let result = "";

        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(random(char.length));
            const randomChar = char[randomIndex];

            result += randomChar;
        }

        return result;
    }
    
}