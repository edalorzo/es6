

//symbols are a new primitive type

let sym = Symbol('MySymbol');

console.log(typeof sym);
console.log(sym instanceof Symbol);
console.log(sym.toString());

//this is similar to primitive string
console.log();

let str = 'Hello World';
console.log(typeof str);
console.log(str instanceof String);
