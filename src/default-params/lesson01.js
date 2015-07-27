/**********************************
 * Default parameter values
 *********************************/

 function foo(x, y) {
 	x = x || 11;
 	y = y || 31;
 	console.log(x + y);
 }
 

 foo(); 		// 42
 foo(5,6);		// 11
 foo(5);		// 36
 foo(null, 6) 	// 17

 foo(0, 42); 	//53 <-- Opps, not 42!

 function bar(x, y) {
 	x = (x === undefined) ? 11 : x;
 	y = (y === undefined) ? 31 : y;
 	console.log(x + y);
 }

 bar(0, 42);		// 42
 bar(undefined, 6)	// 17

 function baz(x,y) {
 	x = (0 in arguments) ? x : 11;
 	y = (1 in arguments) ? y : 31;
 	console.log(x + y);
 }

 baz(5);			//36
 baz(5, undefined); //NaN