class Animal {
    talk() {
        console.log("Says " + this.sound);
    }
}

class Dog extends Animal {
    constructor(name) {
        super();
        this.name = name;
        this.sound = "Woof";
    }
    sayDogsName() {
        console.log("Dogs name is " + this.name);
    }
}

const myDog = new Dog("Rex");
myDog.talk();
myDog.sayDogsName();