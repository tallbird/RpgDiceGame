// need a JSON of skills / supports
class Dice {
    constructor(skill, resourceLayout = ['A', 'A', 'D', 'D', 'U', 'U'], number = 1, locked = false) {
        this.skill = skill;
        this.resourceLayout = resourceLayout;
        this.number = number;
        this.prevRolls = [6, 5]
        this.locked = locked;
    }

    rollDice() {
        this.number = Dice.randomDice();
        return this.number
    }

    getBounces(numOfBounces) {
        return Dice.getBounceArray(this.prevRolls[this.prevRolls.length - 1], this.number, numOfBounces)
    }

    
    // pick a number from set. Default 1-6 can pass in [array of numbers] e.g [1,2,4]
    static randomDice(set = [1, 2, 3, 4, 5, 6]) {
        const random = Math.ceil(Math.random() * set.length);
        //    console.log(set, random, set[random-1]);
        return set[random - 1];
    }

    // generates a set excluding a single number to exclude   eg setExclude(4)  >> [1,2,3,  5,6]
    static setExclude(exclude) {
        return [1, 2, 3, 4, 5, 6].filter(v => v != exclude);
    }

    // generates a set excluding numbers   eg setExcludeArray([1,2,3])  >> [       4,5,6]
    static setExcludeArray(excludeArray) {
        return [1, 2, 3, 4, 5, 6].filter(v => !(excludeArray.includes(v)));
    }

    static getBounceArray(prevNumber, finalNumber, numOfBounces) {
        let bounces = [Dice.randomDice(Dice.setExcludeArray([prevNumber, finalNumber]))];
        for (let i = 0; i < numOfBounces - 1; i++) {
            bounces.push(Dice.randomDice(Dice.setExcludeArray([prevNumber, finalNumber, bounces[bounces.length - 1]])));
        }
        // console.log(bounces);
        return bounces;
    }
}

//acts pool
//offensive / defensive / utility