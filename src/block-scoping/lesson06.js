 /*---------------------------
 * let + for
 *--------------------------*/

 var funcs = [];

 for(let i = 0; i < 5; i++) {
 	let j = i;
 	funcs.push(
 		function() {
 			console.log( j );
 		}
 	);
 }

 funcs[3](); //3

 