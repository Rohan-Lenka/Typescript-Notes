// 1) Union 
let id: number | string | Date // can be number or string or Date 
id = 22
id = "223344"
id = new Date()
// id = true // error

type Todo = {
    name1: string
    description?: string // means string | undefined // hover over description to see type
}
type Person = {
    name2: string
    isMale: boolean
}
type PersonOrTodo = Person | Todo // union of two custom types is possible
// this means PersonOrTodo can be Person or Todo or BOTH 
// example -> 
const ob: PersonOrTodo = {
    name1: "rohan",
    name2: "sohan",
    isMale: true
} // this is both 

// more useful use cases ->
let status: "complete" | "in-complete" | "ongoing"
status = "complete"
status = "in-complete"
status = "ongoing"
// status = "random" // error

/// NOTE -> union not possible in case of interfaces


// 2) Intersection 
type fruit = {
    fruitName : string
    fruitColor: string
}
type veggie = {
    veggieName: string
    veggieColor: string
}
const tomato: veggie & fruit = {  // should be both veggie and fruit type at the same time 
    fruitName: "tomato",
    veggieName: "tomato",
    fruitColor: "red",
    veggieColor: "red",
} // should have properties of both veggie and fruit

// NOTE -> intersection possible in case of interfaces
interface Animal {
    name: string
    legs: number
} 
interface Mammal {
    gender: "male" | "female"
}
interface Lion extends Animal, Mammal {
    // leave empty or add some more properties. Ex -> 
    isWildAnimal: boolean
}
const lion: Lion = {
    name: "babbar sher",
    legs: 4,
    gender: "male",
    isWildAnimal: true
}

// NOTE -> intersection not useful in case of primitive types // will show error
// Ex -> 
type custom = number & string // this has a type of never // hover over custom  
// const a: custom = 12 // variables with never type will always show error when assigned any value

// Q -> 
type Type1 = {
    name: string
    id: number
}
type Type2 = Type1 & {color: string, id: string}
// uncomment to see error ->
// const a1: Type1 & Type2 = {
//     name: "rohan",
//     color: "red",
//     id: 12  // id cant be both number and string // never type is assigned to id 
// }


// 3) redaonly 
// prevents manipulation of any property of an object after declaration  
type country = {
    readonly name: string
    population: string
}
const india: country = {
    name: "India",
    population: "1.1B"
}
// india.name = "China" // error because can only assign value at the time of declaration 

// In case of arrays
type NumberArray = readonly number[]
let nums: NumberArray = [1, 2, 3, 4]  // or -> const nums: readonly number[] = [1, 2, 3, 4]
// nums.push(5) 
// nums.pop()
// nums[2] = 13 // all error // coz can't modify array after declaration

// IMP ->
// type MyNumber = readonly number
// let num: readonly number = 12 // both error // coz readonly is only permissible on arrays or custom types


// 4) keyof and typeof
// keyof -> defines that a variable is a key of some custom type 
type hello = {
    name: string
    age :number
    isTrue?: boolean
}
// function getValue1(key: string, ob: hello) {
//      return (ob[key])
// }
// const val1 = getValue1("age", { name: "rohan", age: 20 })
// u think this will work but it shows error 

function getValue2(key: keyof hello, ob: hello) {
    return (ob[key])
}
const val2 = getValue2("age", { name: "rohan", age: 20 })  // hover over val2 to see its type. As it is a key of hello,  
                                                           // it can hold types of either of the properties of hello
// typeof -> extracts the type of any variable and assigns it to another variable -> little different from the typeof keyword in js 
// use-1
const person = { name: "Rohan", age: 20, isMale: true }
const people: (typeof person)[] = []  // we can just extract the type of person variable using typeof // less code
people.push(person)
people.push( {name: "Sohan", age: 20, isMale: true} )
people.push( {name: "Mohan", age: 21, isMale: true} )

// use-2
function greet(name: string) {
    console.log("Hi " + name)
}
type greetType = typeof greet // we can extract the type of greet function for debugging purposes
// type greetReturnType = typeof greet("John") // eror // can't do complex stuff with typeof 



// 5) index types



// 6) as const and enum
const a = 12 // this is same as doing let a = 12 as const // using as const key word
// mainly used as -> 
const arr1 = [1, 2, 3] as const  // arr1 has become a readonly array 
// These readonly arrays can be used as enums 
// Ex ->
type skills = "novice"| "avg" | "expert"
type Player1 = {
    skill: skills
}
// In the above case lets say we wanna use forEach loop for skills type but there's no way to do that coz type is not an array 
// Solution -> write the skill type as an enum   
const skillEnum = ["novice", "avg", "expert"]
type Player2 = {
    skill: (typeof skillEnum)[number]  // IMP
}
skillEnum.forEach(skill => console.log(skill))  // now can use forEach 

// same for objects too -> 
const obj = {
    name: "Rohan",
    adress: {
        street: "MainSt",
        streetNo: 123,
    }
} as const // whole obj has become readonly // hover over obj to see 


// 7) Tuple 
// What if I want an array whose index=0 should be string, index=1 should be number, index=2 should be boolean
// NOTE -> using any[] would wrong 
// Solution -> 
type Tuple = [string, number, boolean]
const ids: Tuple = ["123", 99, true]  // anything else error 
ids.pop()
ids.push(12) // these are still possible // to avoid these too, use readonly on top
console.log(ids)
// IMP -> this is very useful while using React -> useState() returns Tuple of 2 things -> [state, setState] -> [<state type>, <function type>]