
 /*-------------------------------------------------------------
  * ES5 vs ES6 Block-scoped functions
  *-----------------------------------------------------------*/

  var something = "hello world";

  if(something) {
  	function foo() {
  		console.log( "1" );
  	}
  } else {
  	function foo() {
  		console.log( "2" );
  	}
  }

  foo(); //??