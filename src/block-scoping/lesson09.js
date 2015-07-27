/*---------------------------
 * block-scoped functions
 *--------------------------*/

 {
 	foo() //works!

 	function foo() {
 		//..
 	}
 }

 foo();


 /*-------------------------------------------------------------
  * Although it compiles just fine, notice the generated code
  * to realize the last invocation is out of scope. Run it to
  * see the runtime error occurring.
  * 
  * Also notice that the function definition is hoisted!
  -------------------------------------------------------------*/