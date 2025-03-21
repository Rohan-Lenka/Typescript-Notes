// GENERICS // V.IMP
// syntax -> <any name, generally given T>


// 1) Why generics 
// let us consider a function which returns the second element of an array no matter which type is it 
const arr1 = [1, 2, 3]
const arr2 = ["1", "2", "3"]
const arr3 = [true, false]

// case 1 -> u can manually type all the types the aray can be in the function 
function getSecond1(array: (number | string | boolean)[]) {
    return array[1];
} 
const ret1 = getSecond1(arr1)
// problem -> code becomes long + constantly update the array type in the function from time to time

// case 2 -> make array type as any[]
function getSecond2(array: any[]) {
    return array[1];
} 
const ret2 = getSecond2(arr1)
// problem -> the return value becomes any type // hover over ret2

// Solution -> use generics 
function getSecond<T>(array: T[]) {
    return array[1]
}
const retNumber = getSecond(arr1)  // same as getSecond<number>(arr1) // but ts is smart enough to know the generic from the passed array
const retString = getSecond(arr2)
// Under the hood -> T basically extracts the type of the array when it is passed in the function, and assigns this type to the return value 
// One more ex -> 
const arr4 = [1, "2", new Date()]
const retOfArr4 = getSecond(arr4)


// 2) Set, Map
const st = new Set<number>()
st.add(234)
// st.add(true) // error 

const mp = new Map()  // by default it is <any, any>  // same with Set, <any>
const mpp = new Map<string, number>()
mpp.set("word1", 12)

const mpp2 = new Map([["word2", 23], ["word3", 23]])  // passing default values in the constructor 
// mpp2 is automatically set to hold <string, number> 
// same with Set


// 3) generics in types
type Entity<T> = {
    data: T
    isLivingBeing: boolean
}
type Person = Entity< {name: string, age: number} >
type Book = Entity< {title: string, pages: number} >
// In this way u can reuse a type to make other types // Ex -> Person, Book types from Entity type 


// 4) default value & extends keyword in generics
type User<T extends object = {name: string, age: number}> = {
    data: T
} 
// i) extends means the generic cant be anything like string or number or etc... It can only be an object type // write object not Object
// type r = User<number>  // error here

// ii) <T = //any type> gives the generic a default type // when the generic is not specified the default type takes over
const ob1: User = {  // no generic passed, so default type is used
    data: {
        name: "Rohan",
        age: 20
    }
}
const ob2: User< {isMale: boolean, balance: number} > = {  // If generic is mentioned, then it just overrides the default type 
    data: {
        isMale: false,
        balance: 1000
    }
}


// 5) Array
const nums: number[] = [1, 2, 3, 4]  // same as ->
const nums1: Array<number> = [1, 2, 3]
type Flowers = Entity<Array<string>>  // Nesting of generics also possible 
// same as type Flower = Entity<string[]>


// generics in DOM manipulation 
const input = document.querySelector(".text-input")  // here u can hover over input to see that type is Element 
// console.log(input?.value) // error coz the simplest html element type is Element and it doesnt have any value property 

// Solution -> use generic to specify 
const inpt = document.querySelector<HTMLInputElement>(".text-input")
console.log(inpt?.value)  // ? because inpt can be null too if no HTML element exists with a class of text-input 