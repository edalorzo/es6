/**
 * Chaining promises
 */

let p1, p2;

p1 = Promise.resolve();
p2 = p1.then(() => console.log());

console.log('p1 and p2 are different objects? ' + (p1 !== p2));

let chain = Promise.resolve('Hello')
				.then(r1 => r1 + ' World\n')
				.then(r2 => r2 + 'How are you?\n')
				.then(r3 => r3 + 'Doing fine, thanks')
				//.then(res => console.log(res))
				;

chain.then(console.log);
