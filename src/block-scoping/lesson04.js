/*---------------------------
 * let + for
 *--------------------------*/

 var funcs = [];

 for(let i = 0; i < 5; i++) {
 	funcs.push(
 		function() {
 			console.log( i );
 		}
 	);
 }

 funcs[3](); //3

 