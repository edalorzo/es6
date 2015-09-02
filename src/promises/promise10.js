
/**
 * Basic Error Propagation
 */

Promise.reject(Error('Bad news'))
	.then(step2 => console.log('This is never run'))
	.then(step3 => console.log('This is also never run'))
	.catch(err => console.log('Something failed along the way: '+ err));

