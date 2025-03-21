// 1) Pick and Omit
type Animal = {
    name: string
    legs: number
    country: string
    tail: {
        color: string
        length: number
    }
    wing: {
        canFly: boolean
        feathersCount: number
    }
}
// i) Pick -> picks certain properties from a type 
type Human = Pick<Animal, "name" | "legs" | "country">
// ii) Omit -> omits certain properties from a type 
type Bird = Omit<Animal, "tail" | "country"> 
// hover over each of them 


// 2) Partial and Required
type User = {
    name: string
    phone?: number
    address: {
        streetName: string 
        streetNo?: number
        streetLandmark: {
            name?: string
        }
    } 
}
type User1 = Partial<User>  // makes all properties optional  
type User2 = Required<User>  // makes all those properties which wrere optional before, now required 
// NOTE -> these dont affect the properties which are nested inside

// Q -> What if we want a type which is same as User but has the phone property required instead of optional. Solution ->
type User3 = Required<Pick<User, "phone">> & Omit<User, "phone">
// type User3 = Required<Pick<User, "phone">> & User  // also fine coz -> 
// NOTE -> the required properties override the optional properties

// Q -> What if we want a type which is same as User but has the name property optional instead of required. Solution ->
type User4 = Partial<Pick<User, "name">> & User // this is actually wrong coz when u do & User, 
// it again overrides the optional name property and makes it required
type User5 = Partial<Pick<User, "name">> & Omit<User, "name">  // this is correct 

// Q1 -> We can write a custom type which can do these above required pick and partial pick -> 
type RequiredPick<T, Key extends keyof T> = Required<Pick<T, Key>> & T
type PartialPick<T, Key extends keyof T> = Partial<Pick<T, Key>> & Omit<T, Key> // IMP

type User6 = RequiredPick<User, "phone">
type User7 = PartialPick<User, "name">


// 3) ReturnType and Parameters
function compare(a: string, b: string) {
    return a.length < b.length
}

type RetType = ReturnType<typeof compare>  // extracts the function's return type without invoking the function 
type Params = Parameters<typeof compare>  // extracts the function's parameters' type without invoking the function
type Param1 = Parameters<typeof compare>[0]  // 1st param
type Param2 = Parameters<typeof compare>[1]  // 2nd param 
// type Param3 = Parameters<typeof compare>[2]  // error  