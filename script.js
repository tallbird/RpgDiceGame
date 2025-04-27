const rollBtn = document.querySelector('.roll');

let lastDice = 1
let currentDice = []
let statuses = [randomDice(), randomDice(), randomDice(), randomDice(), randomDice(), randomDice()]

// pick a number from set. Default 1-6 can pass in [array of numbers] e.g [1,2,4]
function randomDice(set = [1, 2, 3, 4, 5, 6]) {
    const random = Math.ceil(Math.random() * set.length);
    //    console.log(set, random, set[random-1]);
    return set[random - 1];
}

// generates a set excluding a single number to exclude   eg setExclude(4)  >> [1,2,3,  5,6]
function setExclude(exclude) {
    return [1, 2, 3, 4, 5, 6].filter(v => v != exclude);
}

// generates a set excluding numbers   eg setExcludeArray([1,2,3])  >> [       4,5,6]
function setExcludeArray(excludeArray) {
    return [1, 2, 3, 4, 5, 6].filter(v => !(excludeArray.includes(v)));
}

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

function getBounceArray(n, numOfBounces) {
    let bounces = [randomDice(setExcludeArray([lastDice, n]))];
    for (let i = 0; i < numOfBounces - 1; i++) {
        bounces.push(randomDice(setExcludeArray([lastDice, n, bounces[bounces.length - 1]])));
    }
    // console.log(bounces);
    return bounces;
}

function animateRollingTo(screenDie, n) {

    let bounceArray = getBounceArray(n, 3);
    // console.log(bounceArray, n );
    rollDiceTransition(screenDie, bounceArray[0]);
    setTimeout(() => rollDiceTransition(screenDie, bounceArray[1]), 500);
    setTimeout(() => rollDiceTransition(screenDie, bounceArray[2]), 1000);
    setTimeout(() => rollDiceTransition(screenDie, n), 1500);
    lastDice = n;
}

function animateRollingToArray(screenDice, rolls) {
    if (screenDice.length != rolls.length) console.log("array length problem");
    // convert screenDice from a nodelist to an array of strings
    let moo = Array.prototype.map.call(screenDice, (item) => item.id);

    // strip the letters from the strings, leaving an array of number strings
    moo.forEach((el, i, arr) => {
        arr[i] = el.replace(/^[a-zA-Z0]+/, "");
    });
    //convert strings to integers
    var blah = moo.map(Number);

    console.log(blah);
    console.log(rolls);

    // for each unlocked dice rolled, overwrite currentDice with the number rolled  ***** this needs changing!
    moo.forEach((i) => { currentDice[i - 1] = rolls[i - 1]; });

    //currentDice = rolls
    console.log(currentDice);
    screenDice.forEach((die, i) => {
        animateRollingTo(die, rolls[i]);
    });
}

// roll dice button
function rollRandom() {
    random = randomDice();
    //random = randomDice(setExcludeArray([2, 4]))
    //console.log(random);

    // get an array of all divs with class=dice
    getDiceClass = document.querySelectorAll('[id^=dice]');

    // ** need to iterate over these to see if any are locked and then pass the new nodelist into animateRollingToArray

    //pass in array of active dice (eg. player or npcs), pass in arrays of sides of dice to be included in the roll eg. randomDice(setExcludeArray([2, 4]))
    animateRollingToArray(getDiceClass, statuses);

    return random;
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