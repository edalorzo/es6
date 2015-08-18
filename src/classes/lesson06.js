
/**
 * Calculated methods
 */
 
const m = 'myMethod';
class Foo {

	[m](){
		console.log('Hello from %s', m);
	}
}

let foo = new Foo();
foo.myMethod();