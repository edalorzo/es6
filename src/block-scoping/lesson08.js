/*---------------------------
 * const declarations
 *--------------------------*/

 {
 	const a = [1,2,3];
 	a.push( 4 );
 	console.log(a);
 	//a = 42; //TypeError!
 }

 //the reference is final, 
 //but referenced object isn't
 const foo = {};
 foo.prop = 123;
 console.log(foo.prop); //123


 //we can manually freezed 
 //the refrenced object
 const bar = Object.freeze({});
 bar.prop = 123; //TypeError
 