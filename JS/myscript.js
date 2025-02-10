
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

let timeoutGeneral = 500;
let clickIndex = 0
let toMatchImage = ""
let tempIndex = 0
let score
let squaresNum
let rootNum
// let squares = document.getElementsByClassName("square");
let playBtn = document.getElementById("play");
let notify = document.getElementById("notify");
let diffBtns = document.getElementsByClassName("diff")
let gameContainer = document.getElementById("game_container");

let diffLevels = {
    "easy": 16,
    "medium": 25,
    "hard": 36,
};

//-----// click sulla difficiolat //-----//
[...diffBtns].forEach(selectDiff => {
    selectDiff.addEventListener("click", function () {
        squaresNum = diffLevels[selectDiff.innerHTML];
        rootNum = Math.sqrt(squaresNum);
        [...diffBtns].forEach(element => {
            element.classList.remove("active")
        });
        selectDiff.classList.add("active")
    })
});

// click playbtn
/////////////////////////////////////////////////////////////////////////////
playBtn.addEventListener("click", function () {
    /////////////////////////////////////////////////////////////////////////////
    if (!squaresNum) {
        notify.innerHTML = "SELEZIOAN UNA DIFFICOLTURA"
    }
    else {


        score = 0
        tempIndex = 0
        let toMatchImage = ""
        blockedElements = []
        shuffledEmojis = shuffleArray(arrayEmojis)

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

            console.log(end);

            function getSquare() {
                if (start < end) {

                    targetRow.innerHTML += `<div class="square flexed disabled">i</div>`

                    start++
                    console.log(start);

                }
                setTimeout(getSquare, timeoutGeneral)
            }
            getSquare()
        }


        for (let x = 0; x < rootNum; x++) {
            setTimeout(() => {
                getGameGrid(x, x + rootNum, rootNum)
            }, x * timeoutGeneral);
        }







        // for (let i = 0; i < shuffledEmojis.length; i++) {

        //     emoji = shuffledEmojis[i]

        //     /////////////////////////////////////////////////////////////////////////////
        //     // gameContainer.innerHTML += `<div class="square flexed disabled">${emoji}</div>`
        //     /////////////////////////////////////////////////////////////////////////////


        //     let squares = document.getElementsByClassName("square");


        //     [...squares].forEach((singleSquare, x) => {
        //         setTimeout(() => {
        //             singleSquare.innerHTML = ""
        //             singleSquare.classList.remove("disabled")
        //         }, 1000);
        //         singleSquare.addEventListener("click", function () {
        //             singleSquare.classList.add("disabled")
        //             singleSquare.innerHTML = shuffledEmojis[x]
        //             clickIndex++

        //             //-----// al primo click //-----//
        //             if (clickIndex == 1) {
        //                 toMatchImage = shuffledEmojis[x]
        //                 tempIndex = x
        //             }
        //             //-----// al secondo click //-----//
        //             else if (clickIndex == 2) {
        //                 [...squares].forEach(element => {
        //                     element.classList.add("disabled")
        //                 });
        //                 //-----// se matchano //-----//
        //                 if (shuffledEmojis[x] == toMatchImage) {
        //                     score++
        //                     clickIndex = 0;
        //                     [...squares].forEach(element => {
        //                         element.classList.remove("disabled")
        //                     });
        //                     // mi salvo gli elementi da mantenere disattivati
        //                     blockedElements.push(x)
        //                     blockedElements.push(tempIndex)

        //                     console.log(blockedElements);
        //                 }
        //                 // se non matchano
        //                 else {
        //                     clickIndex = 0
        //                     setTimeout(() => {
        //                         singleSquare.innerHTML = ""
        //                         squares[tempIndex].innerHTML = "";
        //                         [...squares].forEach(element => {
        //                             element.classList.remove("disabled")
        //                         });
        //                     }, 500);
        //                 }


        //                 blockedElements.forEach(debug => {
        //                     console.log(squares[debug]);

        //                     squares[debug].classList.add("disabled")
        //                 });

        //             }

        //             if (score == (arrayEmojis.length / 2)) {
        //                 console.log("HAI VINTO");

        //             }

        //         })
        //     });

        // }
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