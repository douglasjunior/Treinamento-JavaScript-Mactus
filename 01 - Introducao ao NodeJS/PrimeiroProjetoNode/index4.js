const dog = {
    sound: "Woof",
    talk: function(obs) {
        console.log("Says " + this.sound);
        console.log("Obs:", obs);
    }
}

dog.talk("Teste 1");

const dogTalk = dog.talk.bind(dog, "Teste bind");

dogTalk("Teste 2");

console.log(dog.talk === dogTalk);