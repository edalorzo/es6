/*-----------------------
 * Destructuring 
 **---------------------*/

 function bar() {
 	return {
 		x: 4,
 		y: 5,
 		z: 6
 	};
 }

 let which = "x";
 let o = {};

 ({[which]: o[which] } = bar());

 console.log(o.x);
