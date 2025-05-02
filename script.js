const rollBtn = document.querySelector('.roll');
<<<<<<< HEAD
const diceBox1 = document.getElementById('diceBox1');
const diceBox2 = document.getElementById('diceBox2');
const diceBox3 = document.getElementById('diceBox3');
const diceBox4 = document.getElementById('diceBox4');
const diceBox5 = document.getElementById('diceBox5');
const diceBox6 = document.getElementById('diceBox6');

const playerDiceBox = [diceBox1, diceBox2, diceBox3, diceBox4, diceBox5, diceBox6]
=======
const dice1 = document.getElementById('dice1');
const dice2 = document.getElementById('dice2');
const dice3 = document.getElementById('dice3');
const dice4 = document.getElementById('dice4');
const dice5 = document.getElementById('dice5');
const dice6 = document.getElementById('dice6');

const player = [dice1, dice2, dice3, dice4, dice5, dice6]
>>>>>>> 8ac50f5e485fc2fc1c2b90c2e447338981d53fe2
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

<<<<<<< HEAD
function animateRoll(diceBox, dice) {
    console.log(diceBox, dice)
    let bounceArray = dice.getBounces(3);
=======
function animateRoll(screenDie, n) {
    console.log(screenDie, n)
    let bounceArray = Dice.getBounceArray(lastDice, n, 3);
>>>>>>> 8ac50f5e485fc2fc1c2b90c2e447338981d53fe2
    //let bounceArray = Dice.getBounceArray(lastDice, n, 3);
    // console.log(bounceArray, n );
    rollDiceTransition(diceBox, bounceArray[0]);
    setTimeout(() => rollDiceTransition(diceBox, bounceArray[1]), 500);
    setTimeout(() => rollDiceTransition(diceBox, bounceArray[2]), 1000);
    setTimeout(() => rollDiceTransition(diceBox, dice), 1500);
    lastDice = dice;
}

<<<<<<< HEAD
function animateRollsArray(DiceBox, currentDice) {

    console.log(DiceBox)
    if (DiceBox.length != currentDice.length) console.log("array length problem");

    DiceBox.forEach((die, i) => {
=======
function animateRollsArray(screenDice, currentDice) {

    console.log(screenDice)
    if (screenDice.length != currentDice.length) console.log("array length problem");

    screenDice.forEach((die, i) => {
>>>>>>> 8ac50f5e485fc2fc1c2b90c2e447338981d53fe2
        animateRoll(die, currentDice[i]);
    });
}

// roll dice button
function rollRandom() {
<<<<<<< HEAD
    animateRollsArray(playerDiceBox, currentDice);
=======
    animateRollsArray(player, currentDice);
>>>>>>> 8ac50f5e485fc2fc1c2b90c2e447338981d53fe2
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