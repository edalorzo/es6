

function foo(input){
	return new Promise(
		(resolve, reject) => {
			setTimeout(() => {
				console.log('foo');
				resolve(input + 'Hello');
			}, 5000);
		}
	);
}

function bar(input){
	return new Promise(
		(resolve, reject) => {
			setTimeout(() => {
				console.log('bar');
				resolve(input + ' World');
			}, 1000)
		}
	);
}

/**
 * Avoid prematurely invoking functions.
 */
let chain = Promise.resolve('Hi there!\n')
				.then(foo) 
				.then(bar) 
				//.then(res => console.log('Result : %s', res))
				//.catch(err => console.log('Error found'))
				;

console.log('Run to completion');