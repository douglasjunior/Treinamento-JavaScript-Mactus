const animal = {
    talk: function() {
        console.log("Says " + this.sound);
    }
}

const dog = {
    sound: "Woof",
}

Object.setPrototypeOf(dog, animal);

dog.talk();

const pitbull = {
    walk: function() {
        console.log("Walking");
    }
}

Object.setPrototypeOf(pitbull, dog);

animal.talk = function() {
    console.log("SAYS " + this.sound.toUpperCase());
}

pitbull.walk();
pitbull.talk();