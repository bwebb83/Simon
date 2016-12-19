(function () {
    "use strict";

    //-----------------------------------------game rule variables
    var counter=0;
    var simonArray = [];
    var playerArray = [];
    var levelCount = 1;
    var press = 0;

    //---------------------------------secret game code

    var kcode = [65, 66, 66, 65];
    var typed = [];

//pushing keypresses to typed array
    $(document).keydown(function (event) {
        typed.push(event.keyCode);
        console.log(typed);


//
        if (typed.toString().indexOf(kcode) >= 0) {
            $(hid).css("opacity", "1");
            typed = [];
        }


    });

    //-------------------------------------------spin stop and gone functionality
    var spinning = function(){
        var angle = 0;
        setInterval(function(){
            angle+=3;
            $("#board").rotate(angle);
        },50);
    };

    var stop = function(){$("#board").stopRotate()};


    var gone = function () {
        $(red).add(blue).add(green).add(yellow).addClass("invisible")
    };

    //------------------------------------------game button variables
    var red = document.getElementById("squareRed");
    var blue = document.getElementById("squareBlue");
    var green = document.getElementById("squareGreen");
    var yellow = document.getElementById("squareYellow");
    var normal = document.getElementById("normalGame");
    var blind = document.getElementById("blindGame");
    var spin = document.getElementById("spinGame");
    var lvl = document.getElementById("roundNum");
    var hid = document.getElementById("hidden");

    //------------------------------------------ Sound files
    var greenBoop = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
    var yellowBoop = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
    var blueBoop = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
    var redBoop = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
    var cheer = new Audio("http://soundbible.com/mp3/Kids%20Cheering-SoundBible.com-681813822.mp3");
    var boo = new Audio("music/kirby.mp3");
    boo.volume=.7;


    //------------------------------------------pad color change and tone
    function redPad() {
        $(red).css("background-color", "lightcoral");
        setTimeout(function () {
            $(red).css("background-color", "red");
        }, 200);
        redBoop.play();
    }

    function bluePad() {
        $(blue).css("background-color", "lightblue");
        setTimeout(function () {
            $(blue).css("background-color", "blue");
        }, 200);
        blueBoop.play();
    }

    function greenPad() {
        $(green).css("background-color", "lightgreen");
        setTimeout(function () {
            $(green).css("background-color", "green");
        }, 200);
        greenBoop.play();
    }

    function yellowPad() {
        $(yellow).css("background-color", "lightgoldenrodyellow");
        setTimeout(function () {
            $(yellow).css("background-color", "yellow");
        }, 200);
        yellowBoop.play();
    }

    //--------------------------------------color button functionality
    $(red).on("mousedown", function () {
        redPad();
        playerArray.push(1);
        checkArray();

    });

    $(blue).on("mousedown", function () {
        bluePad();
        playerArray.push(2);
        checkArray();
    });

    $(green).on("mousedown", function () {
        greenPad();
        playerArray.push(3);
        checkArray();
    });

    $(yellow).on("mousedown", function () {
        yellowPad();
        playerArray.push(4);
        checkArray();
    });

    //---------------------------------------random number to create simonArray
    function simonRandom() {
        for (var i = 0; i < 20; i++) {
            simonArray.push(Math.floor(Math.random() * 4) + 1);
        }
    }

    //----------------------------------------resets playerArray every round
    function roundReset() {
        press = 0;
        playerArray = [];
    }

    //----------------------------------------resets game on press of mode button
    function gameReset() {
        roundReset();
        var back = function () {
            $(red).add(blue).add(green).add(yellow).removeClass("invisible")
        };
        back();
        stop();
        levelCount = 1;
        $(lvl).text("Round: 01");
        simonArray=[];
        simonRandom();
    }

    //--------------------------------------------updates the lvl counter
    function lvlUpdate() {
        if (levelCount < 10) {
            $(lvl).text("Round: 0" + levelCount);
        } else {
            $(lvl).text("Round: " + levelCount);
        }
    }

    //--------------------------------------based on populated array, these are the buttons that will be pressed
    function simonPlays() {
        setTimeout(function () {
            if (simonArray[press] === 1) {
                redPad();
            } else if (simonArray[press] === 2) {
                bluePad();
            } else if (simonArray[press] === 3) {
                greenPad();
            } else if (simonArray[press] === 4) {
                yellowPad();
            }
            press++;
            if (press < levelCount) {
                simonPlays();
            }
        }, 700)
    }

    //---------------------------------------checking simon and player arrays


    function checkArray() {
        if(playerArray.length < levelCount){
            if (playerArray[counter] === simonArray[counter]){
                counter++;
            }else{
                $(lvl).text("XX");
                boo.play();
            }
        }
        if(playerArray.length=== levelCount){
            if (playerArray[counter] === simonArray[counter]){
                nextRound();
            }else{
                $(lvl).text("XX");
                boo.play();
            }
        }
    }

    //----------------------------------------moving on to next round
    function nextRound() {
        if (levelCount < 20) {
            counter=0;
            levelCount++;
            lvlUpdate();
            roundReset();
            simonPlays();
        }
        else if (playerArray.length === levelCount && levelCount === 20) {
            $(lvl).text("Holy crap you did it!");
            cheer.play();

        }
    }

    //-------------------------------------------normal game initialization
    $(normal).on("click", function () {
        gameReset();
        simonPlays();
    });

    //-------------------------------------------blind game initialization
    $(blind).on("click", function () {
        gameReset();
        redPad();
        setTimeout(bluePad, 600);
        setTimeout(yellowPad, 1200);
        setTimeout(greenPad, 1800);
        setTimeout(gone, 2400);
        setTimeout(simonPlays, 2800);
    });


//-------------------------------------------------spinning game initialization
    $(spin).on("click", function(){
        gameReset();
        spinning();
        simonPlays();
    });

    //-------------------------------------------secret mode initialization

    $(hid).on("click", function(){
        gameReset();
        redPad();
        setTimeout(bluePad, 600);
        setTimeout(yellowPad, 1200);
        setTimeout(greenPad, 1800);
        setTimeout(gone, 2400);
        setTimeout(spinning,2800);
        setTimeout(simonPlays, 3200);
    })
})();