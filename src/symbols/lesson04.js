
//Special symbols


let fruits = ['lemon','apple','grape','mango'];

let iter1 = fruits[Symbol.iterator]();

console.log(iter1.next().value); //lemon
console.log(iter1.next().value); //apple
console.log(iter1.next().value); //grape
console.log(iter1.next().value); //mango
console.log();

let name = 'Jules Verne';

let iter2 = name[Symbol.iterator]();

console.log(iter2.next().value); //J
console.log(iter2.next().value); //u
console.log(iter2.next().value); //l
console.log(iter2.next().value); //e
console.log(iter2.next().value); //s
