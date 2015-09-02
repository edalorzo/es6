

let p = new Promise( (resolve, reject) => {
	//promise constructor executes synchronously
	console.log('Within promise constructor');
	resolve('Hello World');
	//reject('Good-bye World');
});

//promise callbacks execute asynchronously
p.then(res => console.log('Promise answer is: ' + res));
p.catch(err => console.log('Error happened: ' + err));

//run to completion
console.log('End of program');