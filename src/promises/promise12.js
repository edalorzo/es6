/**
 * Two ways to propagate errors/exceptions
 */

/*
let chain = Promise.resolve('Two')
			.then(val => {
				if(val == 'One') {
					return Promise.resolve('Two');
				}
				return Promise.reject('Invalid input');
			});
*/

let chain = Promise.resolve('Two')
			.then(val => {
				if(val == 'One') {
					return 'Two';
				}
				throw Error('Failure');
			});



chain
	.then(res => console.log('Worked: %s', res))
	.catch(err => console.log('Failure: %s', err));