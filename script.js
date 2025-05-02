const rollBtn = document.querySelector('.roll');
const diceBox1 = document.getElementById('diceBox1');
const diceBox2 = document.getElementById('diceBox2');
const diceBox3 = document.getElementById('diceBox3');
const diceBox4 = document.getElementById('diceBox4');
const diceBox5 = document.getElementById('diceBox5');
const diceBox6 = document.getElementById('diceBox6');

const playerDiceBox = [diceBox1, diceBox2, diceBox3, diceBox4, diceBox5, diceBox6]
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

function animateRoll(diceBox, dice) {
    console.log(diceBox, dice)
    let bounceArray = dice.getBounces(3);
    //let bounceArray = Dice.getBounceArray(lastDice, n, 3);
    // console.log(bounceArray, n );
    rollDiceTransition(diceBox, bounceArray[0]);
    setTimeout(() => rollDiceTransition(diceBox, bounceArray[1]), 500);
    setTimeout(() => rollDiceTransition(diceBox, bounceArray[2]), 1000);
    setTimeout(() => rollDiceTransition(diceBox, dice), 1500);
    lastDice = dice;
}

function animateRollsArray(DiceBox, currentDice) {

    console.log(DiceBox)
    if (DiceBox.length != currentDice.length) console.log("array length problem");

    DiceBox.forEach((die, i) => {
        animateRoll(die, currentDice[i]);
    });
}

// roll dice button
function rollRandom() {
    animateRollsArray(playerDiceBox, currentDice);
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