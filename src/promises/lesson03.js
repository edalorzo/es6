
let count = 0;

function loadImage(url, success, error) {
	setTimeout(() => {
		count++;
		if(count % 5 == 0) {
			if(error) {
				error('Failed to load image')
			}
		} else {
			if(success) {
				success(url);
			}
		}
	}, 500);
}


//Asynchronous functions typically do not return anything.

/*
let img = loadImage(
		'http://localhost/demo.png',
		res => console.log(res),
		err => console.log(err)
	);
*/


//catching of errors is different in asynchronous code

/*
try {
	let img = loadImage(
		'http://localhost/demo.png',
		res => console.log(res),
		err => console.log(err)
	);
} 
catch(err) {

}
*/
