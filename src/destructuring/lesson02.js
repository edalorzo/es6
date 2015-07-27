/*-----------------------
 * Destructuring 
 **---------------------*/

 function foo() {
 	return [1,2,3];
 }

 let [a,b,c] = foo();
 console.log(a, b, c);

 function bar() {
 	return {
 		x: 4,
 		y: 5,
 		z: 6
 	};
 }

 
 //let {x: x, y:y, z:z} = bar();
 let {x, y, z} = bar();
 console.log(x, y, z);