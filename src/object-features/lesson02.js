/*---------------------------------------
 * Simplified Method Definition
 *-------------------------------------*/

 let obj1 = {
 	foo: function(text) {
 		console.log(text);
 	}
 };

 //same as

 let obj2 = {
 	foo(text) {
 		console.log(text);
 	}
 };


 obj1.foo('Hello World!');
 obj2.foo('Good-bye World!');