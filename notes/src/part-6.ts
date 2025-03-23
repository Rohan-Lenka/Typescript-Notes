// 1) import export in ts 
// similar to js 

// 2) node modules
// genrally all popular node_modules are re-written in ts 
// but if it is not like ex -> lodash

// import lodash from "lodash"  // will show error coz it isn't writen in ts
// hover over the error msg to see an instruction -> npm i --save-dev @types/lodash
// What this will do is install the types for lodash written by some other people. 2 things can happen ->
// i) command successfully gets executed 
// ii) command doesn't get executed coz there is no ts version of this module written by other people
//     In this case if u still wanna use this module, u have to write ur own declaration ts file for this module         
