
let arrayEmojis = [
    "&#128190",//floppy
    "&#128640",//spaceShip
    "&#128642",//trenino ciuf ciuf
    "&#128641",//copter
    "&#128509",//liberty
    "&#128051",//fat fish
    "&#128012",//gipsy slug
    "&#128013",//snake
    "&#128022",//bacon
    "&#128029",//bee :3
    "&#128039",//pengwing
    "&#128060",//panda
    "&#129430",//T-WEX
    "&#129437",//shifu
    "&#129453",//seal
    "&#127843",//shu shi
    "&#127790",//taco
    "&#127789",//dog hot
]

let playingEmojis = []
let shuffledEmojis = []
let gameCache = []

let blockedElements = []

let timeoutGeneral = 75;
let clickIndex = 0
let toMatchImage = ""
let tempIndex = 0
let score
let squaresNum
let rootNum
let allSquares
// let squares = document.getElementsByClassName("square");
let playBtn = document.getElementById("play");
let notify = document.getElementById("notify");
let diffBtns = document.getElementsByClassName("diff")
let gameContainer = document.getElementById("game_container");
let menuContainer = document.getElementById("menu_container");
let showMenu = document.getElementById("show_menu");

let diffLevels = {
    "easy": 16,
    "medium": 25,
    "hard": 36,
};

let activationTime = {
    "easy": 300,
    "medium": 330,
    "hard": 450,
}

let growingSquares = [];

//-----// click sulla difficiolat //-----//
[...diffBtns].forEach(selectDiff => {
    selectDiff.addEventListener("click", function () {
        squaresNum = diffLevels[selectDiff.innerHTML];
        animationTimer = activationTime[selectDiff.innerHTML]
        rootNum = Math.sqrt(squaresNum);
        [...diffBtns].forEach(element => {
            element.classList.remove("active")
        });
        selectDiff.classList.add("active")
    })
});

// click playbtn
/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
function newGame() {
    setTimeout(() => {
        showMenu.classList.add("show")
        showMenu.classList.remove("shrink")
    }, 100);
    setInterval(() => {
        showMenu.classList.add("animate_show")
        setTimeout(() => {
            showMenu.classList.remove("animate_show")
            setTimeout(() => {
                showMenu.classList.add("animate_show")
                setTimeout(() => {
                    showMenu.classList.remove("animate_show")
                }, 100);
            }, 100);
        }, 100);
    }, 5000);
    menuContainer.classList.add("hide_menu")
    console.log("Asasd");
    gameContainer.classList.add("grow")
    if (!squaresNum) {
        notify.innerHTML = "SELEZIOAN UNA DIFFICOLTURA"
    }
    else {
        clickIndex = 0
        gameCache = [];
        playingEmojis = [];
        //creo una logica che ad ogni partita, in base alla difficolta , sceglie degli emoji casuali dalla lista
        for (let y = 0; y < (squaresNum / 2);) {
            let emojiPicker = Math.floor(Math.random() * arrayEmojis.length)
            if (!gameCache.includes(emojiPicker)) {
                gameCache.push(emojiPicker)
                playingEmojis.push(arrayEmojis[emojiPicker])
                playingEmojis.push(arrayEmojis[emojiPicker])
                y++
            }
        }

        shuffledEmojis = shuffleArray(playingEmojis)
        console.log(shuffledEmojis);
        [...diffBtns].forEach(element => {
            element.classList.add("disabled")
        });
        playBtn.classList.add("disabled")
        setTimeout(() => {
            playBtn.classList.remove("disabled");
            [...diffBtns].forEach(element => {
                element.classList.remove("disabled")
            });
        }, animationTimer * 7);
        /////////////////////////////////////////////////////////////////////////////

        growingSquares = []
        allSquares = []
        score = 0
        tempIndex = 0
        let toMatchImage = ""
        blockedElements = []

        gameContainer.innerHTML = ""

        gameContainer.style.width = `calc(400px + (400px * 0.${squaresNum} * 2))`

        // creo un numero di raws pari alla RQ del totali sei SQ
        for (let i = 0; i < rootNum; i++) {
            gameContainer.innerHTML += `<div class="row"></div>`
        }

        // creo la fuzione che popola ogni singola row una alla votla
        function getGameGrid(rowIndex, start, root) {
            let rows = document.getElementsByClassName("row")
            let targetRow = rows[rowIndex]

            let end = start + root



            //-----// qua creo la griglia di gioco //-----//
            function getSquare() {
                if (start < end) {
                    //-----// qua creo le caselle //-----//
                    targetRow.innerHTML += `<div class="square flexed disabled" 
                    style="width: calc(100% / ${rootNum} - 10px);">${shuffledEmojis[start - 1]}</div>`
                    growingSquares.push(start)
                    start++


                    //-----// qua animo gli squares //-----//
                    allSquares = document.getElementsByClassName("square")
                    setTimeout(() => {
                        for (let n = 0; n < growingSquares.length; n++) {
                            setTimeout(() => {
                                allSquares[growingSquares[n] - 1].classList.add("grow")
                            }, animationTimer)
                        }
                    }, timeoutGeneral);

                }
                setTimeout(getSquare, timeoutGeneral)
            }
            getSquare()

        }

        setTimeout(() => {
            [...allSquares].forEach(element => {
                element.classList.add("appear")
            });
        }, 1100 + (squaresNum * 10));


        setTimeout(() => {
            [...allSquares].forEach(element => {
                element.classList.remove("appear")
            });
        }, 3000);

        //////////////////=====//////////////////
        // Funzione playGame che contiene la logica di gioco
        function playGame(singleImage, x) {
            singleImage.classList.add("disabled", "appear");
            singleImage.innerHTML = shuffledEmojis[x];
            clickIndex++;

            if (clickIndex == 1) {
                toMatchImage = shuffledEmojis[x];
                tempIndex = x;
            } else if (clickIndex == 2) {
                if (shuffledEmojis[x] == toMatchImage) {
                    score++;
                    console.log(score);

                    clickIndex = 0;
                    setTimeout(() => {
                        singleImage.classList.add("pulse");
                        allSquares[tempIndex].classList.add("pulse");
                    }, 100);
                    setTimeout(() => {
                        singleImage.classList.remove("pulse");
                        allSquares[tempIndex].classList.remove("pulse");
                    }, 400);

                    blockedElements.push(x);
                    blockedElements.push(tempIndex);
                    console.log(blockedElements);
                } else {
                    [...allSquares].forEach(element => {
                        element.classList.add("disabled");
                    });
                    setTimeout(() => {
                        singleImage.classList.remove("appear");
                        allSquares[tempIndex].classList.remove("appear");
                    }, 500);
                    setTimeout(() => {
                        [...allSquares].forEach(element => {
                            element.classList.remove("disabled", "pulse");
                        });
                        blockedElements.forEach(element => {
                            allSquares[element].classList.add("disabled");
                        });
                        allSquares[tempIndex].classList.remove("disabled");
                        singleImage.innerHTML = "";
                        allSquares[tempIndex].innerHTML = "";
                        clickIndex = 0;
                    }, 600);
                }

                if (score == (squaresNum / 2)) {
                    console.log("you won");
                    gameContainer.innerHTML += `
                <div id="subliminal">
                    <h1>ASSUMETEMI !!</h1>
                </div>
                <div id="win_mess" class="disappear">
                    <div>VOLEVO DIRE</div>
                    <div>HAI WINTO</div>
                    <button id="replay">
                        <div>GIOCA ANCORA</div>
                    </button>
                </div>`;
                    let subliminal = document.getElementById("subliminal");
                    let winMsg = document.getElementById("win_mess");
                    let replay = document.getElementById("replay");
                    setTimeout(() => {
                        subliminal.classList.add("grow");
                    }, 50);
                    setTimeout(() => {
                        subliminal.classList.add("disappear");
                        winMsg.classList.remove("disappear");
                        setTimeout(() => {
                            winMsg.classList.add("grow");
                            replay.addEventListener("click", newGame)
                        }, 50);
                    }, 500);
                }
            }
        }

        // Modifica dell'event listener per richiamare playGame()
        setTimeout(() => {
            [...allSquares].forEach((singleImage, x) => {
                singleImage.classList.remove("disabled");
                singleImage.innerHTML = "";

                singleImage.addEventListener("click", function () {
                    playGame(singleImage, x);
                });
            });
        }, 3300);

        //////////////////////////////////////////////////////////////////
        for (let x = 0; x < rootNum; x++) {
            setTimeout(() => {
                getGameGrid(x, 1 + (x * rootNum), rootNum)
            }, x * timeoutGeneral);
        }

    }

};
playBtn.addEventListener("click", function () {
    if (!squaresNum) {
        notify.innerHTML = "SELEZIOAN UNA DIFFICOLTURA"
    } else {
        newGame()
    }
})

showMenu.addEventListener("click", function () {
    showMenu.classList.add("shrink")
    menuContainer.classList.remove("hide_menu")

})

// algpritmo fisher-yates per mescolare array
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // Indice casuale tra 0 e i
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Scambia gli elementi
    }
    return arr;
}




























//         ///////////////////////////////////////
//         setTimeout(() => {
//             [...allSquares].forEach((element, x) => {
//                 element.classList.remove("appear")
//                 setTimeout(() => {
//                     element.innerHTML = ""
//                 }, 500);
//                 //-----// qua logica di gioco //-----//
//                 setTimeout(() => {
//                     element.classList.remove("disabled")
// ///////////////////////=====////////////////////
//                     element.addEventListener("click", function () {
//                         element.classList.add("appear", "disabled")
//                         element.innerHTML = shuffledEmojis[x]
//                         clickIndex++

//                         //-----// al primo click //-----//
//                         if (clickIndex == 1) {
//                             toMatchImage = shuffledEmojis[x]
//                             tempIndex = x

//                         }
//                         //-----// al secondo click //-----//
//                         else if (clickIndex == 2) {

//                             // [...allSquares].forEach(element => {
//                             //     element.classList.add("disabled")
//                             // });
//                             //-----// se matchano //-----//
//                             if (shuffledEmojis[x] == toMatchImage) {
//                                 score++
//                                 clickIndex = 0;
//                                 // [...allSquares].forEach(element => {
//                                 //     element.classList.remove("disabled")
//                                 // });
//                                 // mi salvo gli elementi da mantenere disattivati
//                                 blockedElements.push(x)
//                                 blockedElements.push(tempIndex)
//                             }
//                             // se non matchano
//                             else {
//                                 clickIndex = 0;
//                                 [...allSquares].forEach(element => {
//                                     element.classList.add("disabled")
//                                 });
//                                 setTimeout(() => {
//                                     [...allSquares].forEach(element => {
//                                         element.classList.remove("disabled")
//                                     });
//                                     element.classList.remove("appear")
//                                     allSquares[tempIndex].classList.remove("appear")
//                                     setTimeout(() => {
//                                         element.innerHTML = ""
//                                         allSquares[tempIndex].innerHTML = "";

//                                         blockedElements.forEach(debug => {
//                                             console.log(allSquares[debug]);
//                                             allSquares[debug].classList.add("disabled")

//                                         });
//                                     }, 500);

//                                 }, 500);
//                             }


//                             // blockedElements.forEach(debug => {
//                             //     console.log(allSquares[debug]);
//                             //     allSquares[debug].classList.add("disabled")

//                             // });

//                         }

//                         if (score == (arrayEmojis.length / 2)) {
//                             console.log("HAI VINTO");

//                         }

//                     })

//                 })

//             }, 500);
//         }, 3000)

////////////////////////////////////