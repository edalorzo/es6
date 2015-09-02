
/**
 * Convenience functions for resolve and reject
 */

 //Resolving
let p1 = new Promise((resolve, reject) => {
	resolve('the long way');
});

let p2 = Promise.resolve('the short way');

//Rejection
let p3 = new Promise((resolve, reject) => {
	reject('long rejection');
});

let p4 = Promise.reject('short rejection');