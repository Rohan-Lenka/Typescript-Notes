// OOPS & CLASSES IN TS

// 1) members, constructors, visibility modifiers & methods

class Animal {

    name: string  //  called members of the class 
    legs: number
    region: string
    // ts will complain that these members are not initialized if constructor is not there

    constructor(name: string, legs: number, region: string) {
        this.name = name
        this.legs = legs
        this.region = region
    }

}
// this looks like a lots of code & redundant data
// to fix this we can use visibility modifiers

class Coder {

    constructor(
        public readonly name: string,  // readonly -> can read, no modification possible
        public music: string,  // public -> can be accessed from anywhere 
        private age: number,  // private -> can be accessed from within the class only
        protected lang: string = 'typescript'  // protected -> can be accessed from within the class + derived classes 
    ) {
        this.name = name;
        this.age = age;
        this.music = music;
        this.lang = lang;
        // all these respective data members will get automaticaly initialized
    }

    public getAge() {
        return this.age
    }

}

const rohan = new Coder("Rohan", "rock", 21, "c++")
const john = new Coder("John", "soft", 30) // lang will be typescript which is the default 

console.log(john.getAge())

// 2) Derived classes

class Webdev extends Coder {
    
    constructor(
        // child class members 
        public readonly role: "backend" | "frontend",
        // the parent class members should not be provided with a visibility modifier in the child class 
        name: string,
        music: string,
        age: number
    ) {
        super(name, music, age)  // super() must always be called first
        this.role = role
    }

    getLang() {
        return this.lang // ok coz lang is protected 
    }

}

// 3) interfaces

interface Musician {
    name: string
    instrument: string
    play: (action: string) => string
}

class Guitarist implements Musician {
    
    name: string
    instrument: string

    constructor(
        name: string,
        instrument: string
    ) {
        this.name = name
        this.instrument = instrument
    }

    play(action: string) {
        return `${this.name} ${action} ${this.instrument}`
    } 

}

const peter = new Guitarist('Peter', 'Guitar')
console.log(peter.play("plays"))

// 4) static 

class People {

    static cnt: number = 0  
    // static members belong to the class and can't be passed on to an class object 
    // all class objects share the same static member
    public readonly id: number

    // same with static methods 
    public static getCnt() {
        return People.cnt
    }

    constructor(
        public name: string,
    ) {
        this.id = ++People.cnt
        this.name = name
    }

}

const james = new People('James')
const george = new People('George')
const amy = new People('Amy')

// console.log(amy.cnt)  // error
// console.log(amy.getCnt())  // error

console.log(People.getCnt())

// 5) getters and setters
// -> they work as methods but used as members

class Band {

    private members: string[]

    constructor() {
        this.members = []
    }

    public get data() {   
        return this.members
    }
    // getters are used for getting data
    // getters must return a value else error

    public set data(members: string[]) {
        this.members = members
        return 
    }
    // setters are used for settign data
    // they cant return any value else error

}

const band = new Band()
band.data = ['#1', '#2', '#3']  // using a setter here
console.log(band.data)  // using getter here 