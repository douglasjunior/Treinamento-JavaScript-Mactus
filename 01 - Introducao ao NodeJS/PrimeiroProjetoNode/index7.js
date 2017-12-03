const animal = {
    talk: function() {
        console.log("Says " + this.sound);
    }
}

const dog = {
    sound: "Woof",
    walkAndTalk: function() {
        console.log("Walking");
        this.talk();
    }
}

Object.setPrototypeOf(dog, animal);

dog.talk();
dog.walkAndTalk();

console.log(dog.__proto__);
console.log(dog.__proto__ === animal);
