
function foo(x,y,z) {
	console.log(x, y, z);
}

foo(...[1,2,3]);

let a = [4,5,6];
let b = [1,2,3, ...a, 7,8,9];

console.log(b);

function bar(x,y, ...z) {
	console.log(x,y,z);
}

bar(10,11,12,13,14,15);


function baz() {
	console.log('%j', arguments);
	var args = Array.prototype.slice.call(arguments);
	console.log(args);
}

baz('Hello');
baz('Hello','World');
baz('Hello','World',1,2,3);