// lista emoji
const arrayEmojis = [
    "&#128190","&#128640","&#128642","&#128641","&#128509","&#128051",
    "&#128012","&#128013","&#128022","&#128029","&#128039","&#128060",
    "&#129430","&#129437","&#129453","&#127843","&#127790","&#127789",
    "&#127828","&#127829","&#127874","&#127865","&#127867","&#127794",
    "&#127757","&#127774","&#127918","&#127936","&#127921","&#127928",
    "&#128081","&#128293","&#128123","&#128169","&#128681"
];

// elementi principali
const menu = document.getElementById("menu_container");
const notify = document.getElementById("notify");
const playBtn = document.getElementById("play");
const gridContainer = document.getElementById("grid_container");
const gameContainer = document.getElementById("game_container");
const hideMenuBtn = document.getElementById("hide_menu_btn");
const showMenuBtn = document.getElementById("show_menu");

let selectedDiff = null;
let flipped = [];
let lock = false;

// scelta difficoltà
document.querySelectorAll(".diff").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".diff").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedDiff = btn.classList.contains("ez") ? "easy" : btn.classList.contains("md") ? "medium" : "hard";
    });
});

// bottone play
playBtn.addEventListener("click", () => {
    if (!selectedDiff) {
        notify.classList.add("shake");
        setTimeout(() => notify.classList.remove("shake"), 500);
        return;
    }
    menu.classList.add("hide_menu");
    hideMenuBtn.classList.remove("shrink");

    // genera griglia
    generateGrid(selectedDiff);
    gridContainer.classList.remove("disappear");
    gridContainer.classList.add(selectedDiff === "easy" ? "grow_grid_small" :
                                 selectedDiff === "medium" ? "grow_grid_medium" : "grow_grid_large");
});

// mostra menu di nuovo
showMenuBtn.addEventListener("click", () => {
    gridContainer.classList.add("disappear");
    menu.classList.remove("hide_menu");
    hideMenuBtn.classList.add("shrink");
});

// genera il gioco
function generateGrid(level) {
    gameContainer.innerHTML = ""; // reset
    let size = level === "easy" ? 4 : level === "medium" ? 6 : 8;
    let totalCards = size * size;

    // pesca emoji a coppie
    let pool = shuffle(arrayEmojis).slice(0, totalCards/2);
    let cards = shuffle([...pool, ...pool]);

    // crea righe
    for (let i=0; i<size; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        for (let j=0; j<size; j++) {
            const idx = i*size + j;
            const square = document.createElement("div");
            square.classList.add("square");

            square.addEventListener("click", () => flipCard(square, cards[idx]));
            row.appendChild(square);
        }
        gameContainer.appendChild(row);
    }
}

// gira carta
function flipCard(square, emoji) {
    if (lock || square.classList.contains("disabled")) return;

    square.innerHTML = emoji;
    square.classList.add("grow","appear");
    flipped.push(square);

    if (flipped.length === 2) {
        lock = true;
        let [a, b] = flipped;
        if (a.innerHTML === b.innerHTML) {
            a.classList.add("disabled");
            b.classList.add("disabled");
            resetFlip();
        } else {
            setTimeout(() => {
                a.innerHTML = "";
                b.innerHTML = "";
                a.classList.remove("appear","grow");
                b.classList.remove("appear","grow");
                resetFlip();
            }, 800);
        }
    }
}

// reset array girate
function resetFlip() {
    flipped = [];
    lock = false;
}

// shuffle array
function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}
