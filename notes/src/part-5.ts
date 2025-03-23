// 1) Type Guard 
type Todo = {
    title: string
    property: "high" | "medium" | "low"
    isComplete: boolean
    description?: string
    dueDate: Date | string
}

function fn1(todo: Todo) {
    if(typeof todo.dueDate === "string") {
        console.log(todo.dueDate.length)  // we explicitly mentioned that only when todo.dueDate is string, enter this block // u will only find string methods here for todo.dueDate
    } else {
        console.log(todo.dueDate.getDate())  // todo.dueDate can only be Date | string // so if not string it will definately be Date 
    }
}

// NOTE -> typeof <ob.property> === "number" // this syntax is only possible for primitive types only like -> string, number, boolean, etc
// use instanceof for non-primitive types -> 
function fn2(todo: Todo) {
    if(todo.dueDate instanceof Date) {
        console.log(todo.dueDate.getHours())  
        return
    } 
    console.log(todo.dueDate.length)  // if this would have been a Date, the function would have returned in the above block  
}

const btn = document.querySelector<HTMLButtonElement>(".click-button")
// btn.addEventListener("click", () => console.log("clicked"))  // error coz btn can be null too // why null -> 
// when the class doesnt exist in the DOM but u are still trying to get it via querySelector  
btn?.addEventListener("click", () => console.log("clicked 2"))  // correct -> it only proceeds to add an eventListener iff btn isn't null 

// ! operator ->
// What if u know for certain that a button with a class exists with class name click-button & there's no way btn can be null ->
btn!.addEventListener("click", () => console.log("clicked 2"))  // forces ts that btn will always exist and can't be null
// avoid doing this coz it takes the benefits of ts away 

// switch case in ts ->
function fn3(todo: Todo) {
    switch(todo.property) {
        case "high": 
            console.log("hello 1")
            break
        case "medium": 
            console.log("hello 2")
            break
        case "low": 
            console.log("hello 3")
            break
        // case "random":  // error
    }
}


// 2) never and unknown type
// never -> it is not possible to be anything // u wont be able to get this point of code ever
// Ex -> 
function fn4(todo: Todo) {
    switch(todo.property) {
        case "high": 
            console.log("hello 1")
            break
        case "medium": 
            console.log("hello 2")
            break
        case "low": 
            console.log("hello 3")
            break
        default:
            console.log(todo.property)  // hover to see never type
        }
}
// unknown -> essentially means the type is unknown to ts 
// similar to any type coz the type can be anything BUT on unknown types u can't access any methods or properties
// on unknown types, we do type narrowing ->
function printDataLen(data: unknown) {
    if(data != null && 
        typeof data === "object" &&
        "name" in data &&  // means name shld be key in data object
        typeof data.name === "string" 
    ) {
        console.log(data.name.length)
    }
}


// 3) Tips for Debugging -> 

// i) If there is a really long and complex error msg, scroll down to the bottom of the error msg
// The actual error is generally present in the bottom line of ur error msg 

// ii) ctrl + click any type / method / object to know its definition. This can help to debug faster

// iii)
type User = {
    name: string
    house: {
        address: string
        plotNo: number
    }    
}

// @ts-ignore   // ignores the error and u can proceed with ur compilation without any prob // only use when converting code form js to ts
const user1: User = { name: "Rohan", house: { plotNo: 112233 } }  // shld have thrown error 
// better to use ->
// @ts-expect-error: // on the side describe ur error (this is a good practice) 
const user2: User = { name: "Rohan", house: { plotNo: 112233 } }  // shld have thrown error 