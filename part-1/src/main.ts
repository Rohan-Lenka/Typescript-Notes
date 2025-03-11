// 1) types
let a: number = 12
let str: string = "string"
let b: number = 1.2
// a = "str" // error 
// a = 13 // no error

const c = 13 // called literal type in ts meaning this c has a literal type of 4
// or write like this -> const c: 13 = 13


// 2) type inference
let num1 = 11 // ts automatically assigns type number to num1
let num2: number // doesnt hold any val currently but it is a number type // num3 = "string" -> error

let num3; // any type -> it can be anything
// same as doing ->
let y = undefined // or let y = null // this means no val assigned to y // so it can be anything
y = "hello"
y = null
y = 12 // as any type, so no error what so ever if u try to assign any type of value


// 3) Array
const arr1: number[] = [2, 3, 4] // if u declare an array using const, literal type is not done to arrays // i.e u can push, pop, etc // IMP
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

const any = JSON.parse("asddasdsa") // in case of JSON.parse and fetch() and axios


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