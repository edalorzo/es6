/*---------------------------------------------
 * Functional Programming: filter, map, reduce
 *---------------------------------------------*/

let words = ['water','rotor','bear','ocean','kayak','apple','level'];
let numbers = [0,1,2,3,4,5,6,7,8,9];

let squares = numbers.map(x => x * x);
let palyndromes = words.filter(word => word.split('').reverse().join('') === word);
let sumOfSquares = numbers.map(x => x * x).reduce((x,y) => x+ y, 0);

let sumOfSquaresOfOdds = numbers.filter(x => x % 2 !== 0)
                                .map(x => x * x)
                                .reduce((x,y) => x + y);

console.log(squares);
console.log(sumOfSquares);
console.log(sumOfSquaresOfOdds);


