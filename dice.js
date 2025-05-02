// need a JSON of skills / supports
class Dice {
    constructor(skill, resourceLayout = [ 'D', 'D', 'A', 'A', 'U', 'U'], number = 1, locked = false) {
        this.skill = skill;
        this.resourceLayout = resourceLayout;
        this.number = number;
        this.prevRolls = [6, 5]  // this should be initialised to a random number on game start?, or this.number needs to be randomised?
        this.locked = locked;
    }

    toggleLocked() {
        this.locked = !this.locked
    }

    rollDice() {
        this.prevRolls.push(this.number)
        // console.log(this.prevRolls)
        this.number = Dice.randomDice();
        return this.number
    }

    getResource(){
        return this.resourceLayout[this.number -1]
    }
    

    getBounces(numOfBounces) {
        let bounces = [Dice.randomDice(Dice.setExcludeArray([this.prevRolls[this.prevRolls.length - 1]]))]
        for (let i = 0; i < numOfBounces - 2; i++) {
            bounces.push(Dice.randomDice(Dice.setExcludeArray([this.number, bounces[bounces.length - 1]])));
        }
        bounces.push(this.number)
        return bounces
    }

    
    // pick a number from set. Default 1-6 can pass in [array of numbers] e.g [1,2,4]
    static randomDice(set = [1, 2, 3, 4, 5, 6]) {
        const random = Math.ceil(Math.random() * set.length);
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
}