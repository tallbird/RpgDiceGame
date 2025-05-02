const rollBtn = document.querySelector('.roll');

const diceBoxNames = ['diceBox1', 'diceBox2', 'diceBox3', 'diceBox4', 'diceBox5', 'diceBox6']
playerDiceBox = diceBoxNames.map(diceBoxName => document.getElementById(diceBoxName)) 

let dicePool = [new Dice('bite'), new Dice('dice1'), new Dice('dice2'), new Dice('dice3'), new Dice('dice4'), new Dice('dice5')]
let currentDice = dicePool

let resourcePool = []

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
    // screenDie.style.transform = (transforms[number - 1]);

    const classNamesForTurns= [
        "turnToSide2", 
        "turnToSide3"
    ]

    if (number > 3){
        screenDie.classList.remove("turnToSide2")
        screenDie.classList.add("turnToSide3")
    }
    else {
        screenDie.classList.remove("turnToSide3")
        screenDie.classList.add("turnToSide2")
    }
}

function animateRoll(diceBox, dice) {
    let bounceArray = dice.getBounces(4);
    rollDiceTransition(diceBox, bounceArray[0]);
    setTimeout(() => rollDiceTransition(diceBox, bounceArray[1]), 500);
    setTimeout(() => rollDiceTransition(diceBox, bounceArray[2]), 1000);
    setTimeout(() => rollDiceTransition(diceBox, bounceArray[3]), 1500);
}

// roll dice button
function rollRandom() {
    console.log(playerDiceBox[0])
    currentDice.forEach((dice, i) => {
        if (currentDice[i].locked == false){
        dice.rollDice();
        animateRoll(playerDiceBox[i], dice);}
    });
    resourcePool = currentDice.map(d => d.getResource())
    console.log(resourcePool); 
}

// toggle border animation on/off on dice click
document.querySelectorAll('.skillImg').forEach( item => {
    item.onclick = function toggleLocked() {
        let diceDiv = this.parentElement.parentElement
        diceDiv.classList.toggle('locked');
        currentDice[diceDiv.classList[0]].toggleLocked()
        console.log(diceDiv.classList)
        console.log(diceDiv.style)
        let border = this.parentElement.children[0]
        if (diceDiv.classList.contains('locked')) {
            border.style.animationPlayState = "paused";
        } else {
            border.style.animationPlayState = "running";
        }
    }
});