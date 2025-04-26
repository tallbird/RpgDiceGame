const rollBtn = document.querySelector('.roll');

let lastDice = 1

// pick a number from set. Default 1-6 can pass in [array of numbers] e.g [1,2,4]
const randomDice = (set = [1,2,3,4,5,6]) => {
    const random = Math.ceil(Math.random() * set.length);
//    console.log(set, random, set[random-1]);
    return set[random-1];
}

// generates a set excluding a single number to exclude   eg setExclude(4)  >> [1,2,3,  5,6]
const setExclude = (exclude) => {
    return [1,2,3,4,5,6].filter(v => v!= exclude)
}

// generates a set excluding numbers   eg setExcludeArray([1,2,3])  >> [       4,5,6]
const setExcludeArray = (excludeArray) => {
    return [1,2,3,4,5,6].filter(v => !(excludeArray.includes(v)))
}

// Animation 

 const rollDiceTransition = (screenDie, number) => {
    const transforms = [
        'rotateX(0deg) rotateY(0deg)',
        'rotateX(-90deg) rotateY(0deg)',
        'rotateX(0deg) rotateY(90deg)',
        'rotateX(0deg) rotateY(-90deg)',
        'rotateX(90deg) rotateY(0deg)',
        'rotateX(180deg) rotateY(0deg)'
    ]
    screenDie.style.transform = (transforms[number-1])

}

const getBounceArray = (n,numOfBounces) => {
    let bounces = [randomDice(setExcludeArray([lastDice, n]))]
    for(let i=0; i<numOfBounces-1; i++){
        bounces.push(randomDice(setExcludeArray([lastDice, n, bounces[bounces.length -1]])))
    }
    // console.log(bounces);
    return bounces
}

const animateRollingTo  = (screenDie, n) => {
    
    let bounceArray = getBounceArray(n, 3)
    console.log(bounceArray, n );
    
    rollDiceTransition(screenDie, bounceArray[0])
    setTimeout(() => rollDiceTransition(screenDie, bounceArray[1]), 500)
    setTimeout(() => rollDiceTransition(screenDie, bounceArray[2]), 1000)
    setTimeout(() => rollDiceTransition(screenDie, n), 1500)
    lastDice = n
}

const animateRollingToArray = (screenDice, rolls) => {
    if (screenDice.length != rolls.length) console.log("array length problem");
    
    screenDice.forEach((die, i) => {
        animateRollingTo(die, rolls[i])
    });
}

// roll dice button
function rollRandom() {
    random = randomDice();
    //random = randomDice(setExcludeArray([2, 4]))
    //console.log(random);
    // get an array of all divs with class=dice
    getDiceClass = document.querySelectorAll('[class^=dice]');

    //pass in array of active dice (eg. player or npcs), pass in arrays of sides of dice to be included in the roll eg. randomDice(setExcludeArray([2, 4]))
    animateRollingToArray(getDiceClass, [randomDice(), randomDice(), randomDice(), randomDice(), randomDice(), randomDice()]);

    return random;
}
