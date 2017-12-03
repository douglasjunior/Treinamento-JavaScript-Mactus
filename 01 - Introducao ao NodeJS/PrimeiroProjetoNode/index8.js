'use strict'

const animal = {
    talk: function () {
        console.log('Says ' + this.sound);
    }
}

// const dog = Object.create(animal, {
//     sound: {
//         value: 'Woof',
//         writable: true
//     }
// });

const dog = Object.create(animal);
dog.sound = 'Woof';

dog.talk(); // Says Woof
