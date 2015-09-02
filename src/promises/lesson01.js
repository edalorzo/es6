
/**
 * Asynchronous code and 
 the run to completion rule
 */

setTimeout(() => {
	setTimeout(() => console.log("World"), 0);
	console.log("Hello");
}, 0);

console.log("Hi there!");