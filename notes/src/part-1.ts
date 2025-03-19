// 1) types
let a: number = 12
let str: string = "string"
let bool: boolean = true // can be true/false only, don't write 0/1
let b: number = 1.2
// a = "str" // error 
// a = 13 // no error

const c = 13 // called literal type in ts meaning this c has a literal type of 4
// or write like this -> const c: 13 = 13
// const c: number = 12 // also OK

// 2) type inference
let num1 = 11 // ts automatically assigns type number to num1
let num2: number // doesnt hold any val currently but it is a number type // num2 = "string" -> error

let num3; // any type -> it can be anything
// same as doing ->
let y = undefined // or let y = null // this means no val assigned to y // so it can be anything
y = "hello"
y = null
y = 12 // as any type, so no error what so ever if u try to assign any type of value


// 3) Array
const arr1: number[] = [2, 3, 4] // if u declare an array using const, literal type is not done to arrays // i.e u can push, pop, etc // IMP
const Arr: any[] = [1, "2", true] 
const arr2 = ["hi", "bye"] // type inference 
// arr1.push("hi") // error
arr1.push(5.5) // no error 
const arr3:[1, 3, 5] = [1, 3, 5] // this is how u give literal type as an array in ts // now, arr3.push(4) will show error 
arr3.pop() // but pop still works // IMP


// 4) Any type
let w: any = 33
w = "hi"
w = new Date()
// const w: any or const w   ->   error coz const variables cant be of any type 
// bad practice to assign any type -> basically means doing js -> lose all benefits of ts

// const any = JSON.parse("asddasdsa") // in case of JSON.parse and fetch() and axios


// 5) Objects // V-IMP
const person = {
  name: "Rohan",
  age: 20,
}
// person.isMale = true // error
// sol ->
const person1: {name: string, age: number, isMale?: boolean} = {   // the comma can be replaced by ; or a new line
  name: "Rohan",                           // this means isMale key is optional, u can add it later 
  age: 20
}
person1.isMale = true // no error
// this type of object declaration is complex and unconventional so use interfaces


// 6) Custom types & Interface 
type Fruit = {   // basically means creating my own type // always use Pascal Case convention for this 
  name: string
  size: number
  color: string
  isFresh?: boolean
}
const f: Fruit = {
  name: "Apple",
  size: 10,
  color: "red",
}

type MyNumber = number
const n1: MyNumber = 12

interface Person {  // same as custom type but interface can only be made as an object type // interface MyNumber = number // error
  name: string
  age: number
  isMale: boolean
  friends?: string[]
  address?: {   // nesting can be done
    home: string
    street: {
      stNo: number
      stName: string
    }
  }
}
const person2: Person = {
  name: "Rohan",
  age: 20,
  isMale: true,
  friends: ["a1", "a2", "a3"]
}


// 7) Functions in ts 
function print(word: string) {
  console.log(word)
}
// for return type functions ->
function sum(a: number, b: number) {
  return a + b   // ts automatically knows that the return type is number 
}
// OR u can do ->
function sum1(a: number, b: number): number {    // explicitly mention its return type // Avoid doing this
  return a + b
}
// passing objects to functions ->
function printPerson(person: {name: string, age: number}) {
  console.log(person.name);
}
printPerson(person2) // in the function we mentioned that we need an ob whose type should look like {name: string, age: number}
                     // but person2 type is interface Person which doesnt match with the function's requirement 
                     // So why doesnt it throw error ?
                     // {name: string, age: number} means that the function only needs these keys(properties) of the object that is passed to it
                     // as long as the passed object has ATLEAST these properties, it will not throw error

// const person3: {name: string} = {name: "mohan"}
// printPerson(person3) // will throw error

// IMP 
// printPerson({name: "Mohan", age: 12, age2: 23}) // has ATLEAST those properties // still throw error
                                                   // Reason -> u cant explicitly pass such objects // this is a ts feature to prevent typos 


// 8) void type 
// void means function returns literally nothing
function printContent(content: string) {   // hover over the word function to see the return type void 
  console.log(content)
}
const rtVal = printContent("asda")
console.log(rtVal)   // rtVal is printed as undefined // that doesnt mean void is same as undefined // IMP
function random(): undefined {   // return type is undefined not void  
  return 
}


// 9) Optional Parameters
// in js we have seen that many times inside functions we may pass some parameters which we may or may not need
// in ts it is done like this ->
function func(name: string, age: number, isTrue?: boolean) {
  console.log(name + age + isTrue)
} 
func("rohan", 20) // prints rohan20undefined -> undefined coz isTrue parameter is not sent while calling the function


// 10) Rest Parameters
function restFn(a: number, b: number, ...restArgs: number[]) {  // we know the rest patrameters are actually structured as an array 
  console.log(a + " " + b + " " + restArgs)                     // inside the function, so give type as an array. Eg- string[]
}
restFn(1, 2, 10, 11, 22)


// 11) functions as variables & passing functions inside functions in ts 
function f1(a: number, b: number, callback: (a: number, b: number) => number) {
  console.log(callback(a, b))
}
f1(12, 22, (a: number, b: number) => a + b)
// define function type using arrow syntax -> 
// (param1: type1, paarm2: type2, ...) => <return type>

// or define custom type -> 
type JoinStringsFn = (s1: string, s2: string) => string 
function f2(s1: string, s2: string, cb: JoinStringsFn) {
  console.log(cb(s1, s2))
}
f2("hello", "earth", (s1: string, s2: string) => s1 + s2)