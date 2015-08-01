/*---------------------------------------------
 * Leverage destructural features
 *---------------------------------------------*/

let pairs = [[1,2],[3,4],[5,6],[7,8],[9,0]];
let singles = pairs.map(([x,y]) => x + y);

console.log(singles);

let fruits = [
	{name: 'Lemon', calories: 17},
	{name: 'Apple', calories: 95},
	{name: 'Banana', calories: 105},
	{name: 'Pineapple', calories: 452}
];

let highInCals = fruits.filter(({calories}) => calories > 100);
console.log(highInCals);

