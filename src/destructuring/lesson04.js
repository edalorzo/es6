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

 let a, b, c, x, y, z;

 [a, b, c] = foo();
 ({x, y, z} = bar());

 console.log(a, b, c);
 console.log(x, y, z);

 /*-----------------------------------------
  * For the object destructuring,
  * we had to surround the expression betwen
  * parenthesis to avoid the expression to
  * be interpretad as a block {...}
  *-----------------------------------------*/


