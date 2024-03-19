// initialize variables

// with querySelector
const startButton = document.querySelector("#start-button");
const titleScreen = document.querySelector("#title-screen");
const gameContainer = document.querySelector("#game-container");

// with getElementById
const playerImg = document.getElementById("player-img");
const enemyImg = document.getElementById("enemy-img");

let hasGameStarted = false;

// initialize buttons
startButton.onclick = startGame;

// show start game button
function showStartGameButton() {
    startButton.style.display = "block";
}

setTimeout(showStartGameButton, 3000);

// start game. hide title screen, show game.
function startGame() {
    if (hasGameStarted) {
        console.log("Game has already started");
        // no need to hide title screen and show game container
    } else {
        hasGameStarted = true;
        titleScreen.style.display = "none";
        gameContainer.style.display = "block";
        console.log("You have started the game!");
    }
    // then reset everything
    // set stats
}

