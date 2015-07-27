/*---------------------------------
 * Spread/Rest
 --------------------------------*/

function foo(x,y,z) {
	console.log(x, y, z);
}

let fruits = ['lemon','apple','grape'];
foo(...fruits);
