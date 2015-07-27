/**********************************
 * Default values expressions
 *********************************/
let w = 1, z = 2;

function foo(x = w + 1, y = x + 1, z = z + 1){
	console.log(x, y, z);
}

foo(); //RerefenceError?