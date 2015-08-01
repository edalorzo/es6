/*---------------------------------------
 * Basic Arrow Functions
 *-------------------------------------*/

function foo(x,y) {
	return x + y;
}

let bar = (x,y) => x + y;

//function arities

let f0 = () => 12;
let f1 = x => x * 2;
let f2 = (x,y) => {
	let z = x * 2 + y;
	y++;
	x *= 3;
	return (x + y + x);
};;