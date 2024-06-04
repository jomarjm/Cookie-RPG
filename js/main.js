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
let gold = 0;
let initialStatPoints = 10;
let attack = 0;
let defense = 0;
let speed = 0;
let weaponsInventory = [];
let armorInventory = [];
let playerName = "";
let level = 1;
let maxHealth = 100;
let maxXP = 100;

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

const locations = [
    {
        name: "Welcome Screen",
        buttonText: ["Continue", "Continue", "Continue"],
        buttonFunctions: [toBackground1, toBackground1, toBackground1],
        text: "" // `Welcome, <span class="bold">${playerName}</span>...`
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
        buttonFunctions: [toTownSquare, toTownSquare, toTownSquare],
        text: "But you don't have any money. See what you can do to survive."
    },
    {
        name: "Town Square",
        buttonText: ["North Market", "South Market", "Leave Town"],
        buttonFunctions: [toNorthMarket, toSouthMarket, leaveTown],
        text: "There's a road to the North Market and a road to the South Market. " +
              "The town gates are also here. What will you do?"
    },
    {
        name: "North Market",
        buttonText: ["Weapon Shop", "Armor Shop", "Town Square"],
        buttonFunctions: [toNorthMarket, toSouthMarket, toTownSquare],
        text: "There's a weapon shop and an armor shop in this part of town. What will you do?"
    },
    {
        name: "South Market",
        buttonText: ["Oven Inn", "Bar", "Town Square"],
        buttonFunctions: [toNorthMarket, toBar, toTownSquare],
        text: "There's an inn and a bar in this part of town. What will you do?"
    },
    {
        name: "The Fields",
        buttonText: ["Cookie Castle", "Fight Monsters", "Town Square"],
        buttonFunctions: [], // [toCookieCastle, fightMonsters, toTownSquare],
        text: "Ahhh... The Fields... Where the evil Dark Cookie Lord's evil cookie eating minions roam free. " +
              "The road to the Dark Lord's castle can be seen in the distance. What will you do?"
    },
    {
        name: "The Bar",
        buttonText: ["Get a Drink", "Talk to People", "Town Square"],
        buttonFunctions: [getDrink, talkToPeople, toTownSquare],
        text: "The Bar. Where all strange homies hang out."
    },
    
];

const barHomiePhrases = [
    "I came to this town riding on an ass... YO MAMA'S ASS!",
    "This town smells like ass... Nothing you'll find me complainging about though!",
    "Is that...?! ...oooooOOOOOOOOOOOOOOOOooooooooooohhhh!",
    "OOOOOOOOOOOOOOOOOOO",
    "You know what? I love myself. Even though I look like a BURNT chicken nugget, I still love myself!",
    "What battle scars? Oh, these! Yeah, no, those are bite marks. My wif-, I mean, my dog, yes, my dog! " +
    "Yeah, he bites real hard sometimes...",
    "One time I stuck my entire foot in my mouth",
    "Ain't none of these fuckos old enough to go to this damn club!",
    "When I came home drunk late last night, my wife asked me if I could tell the time. " +
    "I then turned around around to the clock and said, 'I'M NOT FUCKING DRUNK!'",
    "Casio keyboards are MUCH, MUCH easier to play than Yamahas, Nords, all those fancy ass keyboards.",
    "I always tell people in bands that they will make more money if they buy IEMs from me.",
    "I think... I may have autism...",
    "Fuck it... FORZA!",
    "Fuck it... TEKKEN!",
    "Fuck it... ANIMAL CROSSING!",
]

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

function levelUp() {
    xp = 0;
    level++;
    attack += Math.floor(Math.random() * 3);
    defense += Math.floor(Math.random() * 3);
    speed += Math.floor(Math.random() * 3);
    maxHealth += Math.floor(Math.random() * 15);
    maxXP += 20;
    // add text display
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
        update(locations[0]);
        // console.log(playerName);
        textBox.innerHTML = `Welcome, <span class="bold">${playerName}</span>...`;
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
    btn1.innerText = location.buttonText[0];
    btn2.innerText = location.buttonText[1];
    btn3.innerText = location.buttonText[2];
    btn1.onclick = location.buttonFunctions[0];
    btn2.onclick = location.buttonFunctions[1];
    btn3.onclick = location.buttonFunctions[2];
    textBox.innerHTML = location.text;
}

function toBackground1() {
    update(locations[1]);
}

function toBackground2() {
    update(locations[2]);
}

function toBackground3() {
    update(locations[3]);
}

function toBackground4() {
    update(locations[4]);
}

function toTownSquare() {
    update(locations[5]);
}

function toNorthMarket() {
    update(locations[6]);
}

function toSouthMarket() {
    update(locations[7]);
}

function leaveTown() {
    update(locations[8]);
}

function toBar() {
    update(locations[9]);
}



function talkToPeople() {
    textBox.innerHTML = barHomiePhrases[Math.floor(Math.random() * barHomiePhrases.length)];
}

function getDrink() {
    if (money >= 10) {
        money -= 10;
        // add money display here
        health += 20;
        // add health display change
    } else {
        textBox.innerHTML = "You haven't got the mons for a drink right now.";
    }
}

/*
function gameStart() {
    // textBox.innerHTML = `Welcome, <span class="bold">${playerName}</span>...`;
    update(locations[0]);
}
*/

/*
function backgroundStory() {
    setTimeout(resetTypeWriter, 3000);
    
}
*/

// initialize buttons
startBtn.addEventListener("click", startGame);
setNameBtn.addEventListener("click", setName);
introBackBtn.addEventListener("click", backToNameSet);
setStatsBtn.addEventListener("click", setStats);