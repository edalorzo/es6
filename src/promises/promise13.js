/**
 * Other utility functions: Promise.all 
 */


let promises = [
	Promise.resolve('one'),
	Promise.resolve('two'),
	Promise.resolve('three'),
	//Promise.reject('failed-three'),
	Promise.resolve('four'),
	Promise.resolve('five')
];


let all = Promise.all(promises);

all.then(res => console.log(res))
   .catch(err => console.log(err));