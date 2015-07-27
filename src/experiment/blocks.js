var a = 2;

(function IIFE(){
	var a = 3;
	console.log(a); //3
})();

console.log(a); //2

{
	let b = 20;
	console.log(b); //20
}
//console.log(b); //??



function foo(a) {
	if(a === 10) {
		let b = a + 10;
		a = b * 2;
	}
	//b is not accesible here
	return a + 1;
}


var fruits = ['lemon','grape','apple'];

for(let i = 0; i < fruits.length; i++) {
	console.log(fruits[i]);
}
//console.log("i=%s",i);

var funcs = [];

for(let i = 0; i < 5; i++) {
	funcs.push(
		function() {
			console.log(i);
		}
	);
}

funcs[3](); //??