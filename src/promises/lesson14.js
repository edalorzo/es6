
/**
 * Other utility functions: Promise.race 
 */

function async(text, time, success=true){
	return new Promise(
		(resolve, reject) => {
			setTimeout(()=> success ? resolve(text) : reject(text), time);
		}
	);
}


let promises = [
	async('five', 5000),
	async('four', 4000),
	async('three', 3000),
	async('two', 2000, false),
	async('one', 1000)
];

let first = Promise.race(promises);

first.then(res => console.log('Success: ' + res))
	 .catch(err => console.log('Error: ' + err));

