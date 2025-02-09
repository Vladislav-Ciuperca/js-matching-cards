
let arrayEmojis = [
    "&#128190",
    "&#128190",
    "&#128640",
    "&#128640",
    "&#128642",
    "&#128642",
    "&#128641",
    "&#128641",
]

let shuffledEmojis = []

let blockedElements = []

let clickIndex = 0
let toMatchImage = ""
let tempIndex = 0
let score
// let squares = document.getElementsByClassName("square");
let playBtn = document.getElementById("play");
let gameContainer = document.getElementById("game_container");

playBtn.addEventListener("click", function () {
    score = 0
    tempIndex = 0
    let toMatchImage = ""
    blockedElements = []
    shuffledEmojis = shuffleArray(arrayEmojis)

    gameContainer.innerHTML = ""
    for (let i = 0; i < shuffledEmojis.length; i++) {

        emoji = shuffledEmojis[i]

        gameContainer.innerHTML += `<div class="square flexed disabled">${emoji}</div>`


        let squares = document.getElementsByClassName("square");


        [...squares].forEach((singleSquare, x) => {
            setTimeout(() => {
                singleSquare.innerHTML = ""
                singleSquare.classList.remove("disabled")
            }, 1000);
            singleSquare.addEventListener("click", function () {
                singleSquare.classList.add("disabled")
                singleSquare.innerHTML = shuffledEmojis[x]
                clickIndex++

                //-----// al primo click //-----//
                if (clickIndex == 1) {
                    toMatchImage = shuffledEmojis[x]
                    tempIndex = x
                }
                //-----// al secondo click //-----//
                else if (clickIndex == 2) {
                    [...squares].forEach(element => {
                        element.classList.add("disabled")
                    });
                    //-----// se matchano //-----//
                    if (shuffledEmojis[x] == toMatchImage) {
                        score++
                        clickIndex = 0;
                        [...squares].forEach(element => {
                            element.classList.remove("disabled")
                        });
                        // mi salvo gli elementi da mantenere disattivati
                        blockedElements.push(x )
                        blockedElements.push(tempIndex )

                        console.log(blockedElements);
                    }
                    // se non matchano
                    else {
                        clickIndex = 0
                        setTimeout(() => {
                            singleSquare.innerHTML = ""
                            squares[tempIndex].innerHTML = "";
                            [...squares].forEach(element => {
                                element.classList.remove("disabled")
                            });
                        }, 500);
                    }


                    blockedElements.forEach(debug => {
                        console.log(squares[debug]);

                        squares[debug].classList.add("disabled")
                    });

                }

                if (score == (arrayEmojis.length / 2)) {
                    console.log("HAI VINTO");

                }

            })
        });

    }

});


// algpritmo fisher-yates per mescolare array
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // Indice casuale tra 0 e i
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Scambia gli elementi
    }
    return arr;
}