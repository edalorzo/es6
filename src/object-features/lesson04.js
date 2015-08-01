/*---------------------------------------
 * Getters and Setters
 *-------------------------------------*/


 let obj1 = {};
 Object.defineProperties(obj1,{
 	foo: {
 		get: function(){
 			console.log('GET foo');
 			return 123;
 		},
 		set: function(value) {
 			console.log('SET foo to: ' + value);
 			//do nothing for the time being...
 		}
 	}
 });

 let res1 = obj1.foo;
 obj1.foo = 'What?';

 //same as

 let obj2 = {
 	get foo() {
 		console.log('GET foo');
 		return 123;
 	},
 	set foo(value){
 		console.log('SET foo to: ' + value);
 		//do nothing for the time being...
 	}
 };


let res2 = obj2.foo;
obj2.foo = 'When?';