function Person(name) {
    this.name = name;
    this.walk = function() {
        console.log("Walking");
    }
}
Person.prototype.sayMyName = function() {
    console.log("My name is " + this.name);
}

function customNew(constructor, name) {
    const obj = {};
    Object.setPrototypeOf(obj, constructor.prototype);
    constructor.apply(obj, [name]);
    return obj;
}

const myPerson = new Person("Douglas");
const myPerson2 = customNew(Person, "João");

myPerson.sayMyName();
myPerson2.sayMyName();

console.log(myPerson.walk === myPerson2.walk);
console.log(myPerson.sayMyName === myPerson2.sayMyName);