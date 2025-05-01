const rollBtn = document.querySelector('.roll');
const dice1 = document.getElementById('dice1');
const dice2 = document.getElementById('dice2');
const dice3 = document.getElementById('dice3');
const dice4 = document.getElementById('dice4');
const dice5 = document.getElementById('dice5');
const dice6 = document.getElementById('dice6');

const player = [dice1, dice2, dice3, dice4, dice5, dice6]
let lastDice = 1
let dicePool = [new Dice('bite'), new Dice('dice1'), new Dice('dice2'), new Dice('dice3'), new Dice('dice4'), new Dice('dice5')]
let currentDice = dicePool
//let statuses = [randomDice(), randomDice(), randomDice(), randomDice(), randomDice(), randomDice()]

// Animation 
function rollDiceTransition(screenDie, number) {
    const transforms = [
        'rotateX(0deg) rotateY(0deg)',
        'rotateX(-90deg) rotateY(0deg)',
        'rotateX(0deg) rotateY(90deg)',
        'rotateX(0deg) rotateY(-90deg)',
        'rotateX(90deg) rotateY(0deg)',
        'rotateX(180deg) rotateY(0deg)'
    ];
    screenDie.style.transform = (transforms[number - 1]);

}

function animateRoll(screenDie, n) {
    console.log(screenDie, n)
    let bounceArray = Dice.getBounceArray(lastDice, n, 3);
    //let bounceArray = Dice.getBounceArray(lastDice, n, 3);
    // console.log(bounceArray, n );
    rollDiceTransition(screenDie, bounceArray[0]);
    setTimeout(() => rollDiceTransition(screenDie, bounceArray[1]), 500);
    setTimeout(() => rollDiceTransition(screenDie, bounceArray[2]), 1000);
    setTimeout(() => rollDiceTransition(screenDie, n), 1500);
    lastDice = n;
}

function animateRollsArray(screenDice, currentDice) {

    console.log(screenDice)
    if (screenDice.length != currentDice.length) console.log("array length problem");

    screenDice.forEach((die, i) => {
        animateRoll(die, currentDice[i]);
    });
}

// roll dice button
function rollRandom() {
    animateRollsArray(player, currentDice);
}

// toggle border animation on/off on dice click
document.querySelectorAll('.skillImg').forEach( item => {
    item.onclick = function toggleAnimation() {
        let border = this.parentElement.children[0]
        if (border.style.animationPlayState == "running" || border.style.animationPlayState == "") {
            border.style.animationPlayState = "paused";
        } else {
            border.style.animationPlayState = "running";
        }
    }
});