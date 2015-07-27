/*-----------------------
 * Destructuring 
 **---------------------*/

 function foo() {
 	return [1,2,3];
 }

  function bar() {
 	return {
 		x: 4,
 		y: 5,
 		z: 6
 	};
 }

 let o = {};

 [o.a, o.b, o.c] = foo();
 ({x: o.x, y: o.y, z: o.z} = bar());

 console.log('%j', o);