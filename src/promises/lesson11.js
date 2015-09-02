/**
 * Exceptions thrown within an promise are not 
 * propagated, handled by caught and after that
 * back to normal execution.
 */

function rejectWith(val) {
	return new Promise((resolve, reject) => {
		//console.log('In promise constructor');
		throw new Error(val);
	});
}

rejectWith('Hello')
	.then(res => console.log('Success'))
	.catch(err => console.log('My error is: ' + err))
	.then(a => console.log('Back to normal'))
	;


/*
function foo(val) {
	throw new Error(val);
}

try {
	foo('Failure');
}catch(error) {
	console.log('An error happened: '+ error);
}
*/

console.log('Run to completion');