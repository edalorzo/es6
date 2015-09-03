/**
 * Other utility functions: Promise.all 
 */


let promises = [
	Promise.resolve('one'),
	Promise.resolve('two'),
	Promise.resolve('three'),
	Promise.reject('failed-three'),
	Promise.resolve('four'),
	Promise.resolve('five')
];

let all = promises.map(
			p => p.then(
				value => {return {state: 'fulfilled', value: value}; },
				reason => {return {state: 'rejected', reason: reason}; }
			)
		);

Promise.all(all).then(console.log);
