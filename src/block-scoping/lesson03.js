/*---------------------------
 * ES6 let declarations
 *--------------------------*/

 let a = 2;
 if( a > 1) {
 	let b = a * 3;
 	console.log(b); //6

 	for(let i = a; i <= b; i++) {
 		let j = i + 10;
 		console.log(j);
 	}
 	// 12 13 14 15 16

 	let c = a + b;
 	console.log(c); //8
 }

/*-------------------------------------------------------
 * Quick quiz
 *
 * Which variable(s) exist only inside the if statement,
 * and which variable(s) exist only iside the for loop.
 *------------------------------------------------------*/