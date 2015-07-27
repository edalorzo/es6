/**********************************
 * Default parameter values
 *********************************/

 function foo(x = 11, y = 31) {
 	//console.log('%j', arguments);
 	console.log(x + y);
 }

 foo(); 			//42
 foo(5, 6);			//11
 foo(0, 42);		//42

 foo(5);			//36
 foo(5, undefined);	//36 <-`undefined if missing`
 foo(5, null);		//5 <- `null coercion to 0`

 foo(undefined, 6); //17 <-`undefined if missing`
 foo(null, 6);		//6 <- `null coercion to 0`