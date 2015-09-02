
/**
 * Promise motivating example
 */

let promise = loadImage('demo.png');

promise.then(img => console.log('Image loaded: ' + img));
promise.catch(err => console.log('Error happened: ' + err));


let count = 0;
function loadImage(url) {
	let promise = new Promise((resolve, reject) => {
		setTimeout(() => {
			count++;
			if(count === 2) {
				reject('Failed to load image');
			} else {
				resolve(url);
			}
		}, 500);

	});
	return promise;
}
