/*-----------------------
 * Destructuring 
 **---------------------*/

 function foo() {
 	return [1,2,3];
 }

 let tmp = foo();
 let a = tmp[0], b = tmp[1], c = tmp[2];

 console.log(a, b, c);

 function bar() {
 	return {
 		x: 4,
 		y: 5,
 		z: 6
 	};
 }

 let data = bar();
 let x = data.x, y = data.y, z = data.z;

 console.log(x, y, z);