// set doc variables
const gameTitleHeader =  document.getElementById("title-header");
const introSection = document.getElementById("intro-name-stats");
const initialStatPointsText = document.getElementById("initial-stat-points");
const nameInput = document.getElementById("name");
const attackInput = document.getElementById("attack");
const defenseInput = document.getElementById("defense");
const speedInput = document.getElementById("speed");
const nameSetSection = document.getElementById("name-set");
const nameOutput = document.getElementById("name-output");
const nameSetInputSection = document.getElementById("name-set-input");
const textBox = document.getElementById("text-box");
const gameContainer = document.getElementById("game-container");
const btn1 = document.getElementById("btn-1");
const btn2 = document.getElementById("btn-2");
const btn3 = document.getElementById("btn-3");
const mainEl = document.querySelector("main");

// game variables init
let health = 100;
let xp = 0;
let initialStatPoints = 10;
let attack = 0;
let defense = 0;
let speed = 0;
let weaponsInventory = [];
let armorInventory = [];
let playerName = "";

// inventory options data structures
const weapons = [
    {
        name: "Spatula",
        attackModifier: 2,
        hitCount: 1,
        description: "A rusty old spatula to spank your enemies."
    },
    {
        name: "Whisk",
        attackModifier: 4,
        hitCount: 1,
        description: "A whisk to the beat the nuts of those who dare to attack you."
    },
    {
        name: "Hand Mixer",
        attackModifier: 2,
        hitCount: Math.floor(Math.random() * 3),
        description: "A hand mixer, for when a whisk is not enough. May hit up to 3 times."
    },
    {
        name: "Rolling Pin",
        attackModifier: 7,
        hitCount: 1,
        description: "A wooden rolling pin the size of a baseball bat."
    },
    {
        name: "Kitchen Knife",
        attackModifier: 10,
        hitCount: Math.floor(Math.random() * 2),
        description: "A sharp kitchen knife. Handle with care."
    }
];

const armors = [
    {
        name: "Apron",
        defenseModifier: 2,
        speedModifier: 0,
        description: "A dirty apron. Protects user against dirt."
    },
    {
        name: "Baker Outfit",
        defenseModifier: 5,
        speedModifier: 2,
        description: "The full baker getup. Wearing it fills you with excitement."
    },
    {
        name: "Biker Helmet",
        defenseModifier: 7,
        speedModifier: 0,
        description: "A cool bike helmet. Protects your coconut from attacks with a stick."
    }

]

/*
const locations = [
    {
        name: "Welcome Screen",
        buttonText: ["Continue", "Continue", "Continue"],
        buttonFunctions: [toBackground1, toBackground1, toBackground1],
        text: `Welcome, <span class="bold">${playerName}</span>...`
    },
    {
        name: "Background 1",
        buttonText: ["Continue", "Continue", "Continue"],
        buttonFunctions: [toBackground2, toBackground2, toBackground2],
        text: "You are a fugitive cookie, seeking shelter from the evils of the Dark Cookie Lord."
    },
    {
        name: "Background 2",
        buttonText: ["Continue", "Continue", "Continue"],
        buttonFunctions: [toBackground3, toBackground3, toBackground3],
        text: "Venture out into the world to gather what you need to defeat the Dark Cookie Lord."
    },
    {
        name: "Background 3",
        buttonText: ["Continue", "Continue", "Continue"],
        buttonFunctions: [toBackground4, toBackground4, toBackground4],
        text: "You are now at Baker Village, where you'll find all the resources you need."
    },
    {
        name: "Background 4",
        buttonText: ["Continue", "Continue", "Continue"],
        buttonFunctions: [toMainMenu, toMainMenu, toMainMenu],
        text: "But you don't have any money. See what you can do to survive."
    },
    {
        name: "Main Menu",
        buttonText: ["North Market", "South Market", "Leave Town"],
        buttonFunctions: [toNorthMarket, toSouthMarket, leaveTown],
        text: "What will you do?"
    }
    
]
*/

// set button variables
const startBtn = document.getElementById("start-game-btn");
const introBackBtn = document.getElementById("intro-back-btn");
const setStatsBtn = document.getElementById("set-stats-btn");
const setNameBtn = document.getElementById("set-name-btn");

// game functions
function startGame() {
    gameTitleHeader.style.display = "none";
    mainEl.style.display = "block";
}

function setName() {
    console.log("Set Name Clicked...")
    playerName = checkStringInputValidity(nameInput.value);
    if (playerName) {
        // console.log(playerName);
        nameOutput.innerHTML = `Hello <span class="bold">${playerName}</span>`;
        nameOutput.style.display = "block";
        nameSetInputSection.style.display = "none";
        setNameBtn.style.display = "none";
        attackInput.disabled = false;
        defenseInput.disabled = false;
        speedInput.disabled = false;
        introBackBtn.style.display = "block";
        setStatsBtn.style.display = "block";
    }
}

function checkStringInputValidity(name) {
    let regExp = /[a-z]/i;
    if (name === "" || !regExp.test(name)) {
        alert("Please enter a valid name. Use characters [a-z] and between 1 and 10 characters");
    } else {
       return name.charAt(0).toUpperCase() + name.slice(1);
    }
}

function backToNameSet() {
    nameOutput.innerHTML = ``;
    nameOutput.style.display = "none";
    nameSetInputSection.style.display = "flex";
    setNameBtn.style.display = "block";
    attackInput.disabled = true;
    defenseInput.disabled = true;
    speedInput.disabled = true;
    introBackBtn.style.display = "none";
    setStatsBtn.style.display = "none";
}

function setStats() {
    if (parseInt(attackInput.value) + parseInt(defenseInput.value) + parseInt(speedInput.value) > 10) {
        alert("Your stat distribution is greater than available points (10). Try again.");
    } else if (parseInt(attackInput.value) + parseInt(defenseInput.value) + parseInt(speedInput.value) < 10){
        alert("Your stat distribution is less than available points (10). Please use all points.");
    } else {
        attack = attackInput.value;
        defense = defenseInput.value;
        speed = speedInput.value;
        // console.log(attack, defense, speed);
        introSection.style.display = "none";
        gameContainer.style.display = "flex";
        gameStart();
    }
}


/*

// for typewriter effect

let i = 0;
let typewriterSpeed = 100;
function messageTypewriter(message) {
    if (i < message.length) {
        textBox.innerHTML += message.charAt(i);
        i++;
        setTimeout(messageTypewriter, typewriterSpeed, message);
    }
}


function resetTypeWriter() {
    textBox.innerHTML = ``;
    i = 0;
}
*/

function update(location) {

}

function gameStart() {
    textBox.innerHTML = `Welcome, <span class="bold">${playerName}</span>...`;
}

function backgroundStory() {
    setTimeout(resetTypeWriter, 3000);
    
}

// initialize buttons
startBtn.addEventListener("click", startGame);
setNameBtn.addEventListener("click", setName);
introBackBtn.addEventListener("click", backToNameSet);
setStatsBtn.addEventListener("click", setStats);