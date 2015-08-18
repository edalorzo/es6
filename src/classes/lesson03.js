/**
 * Static Methods vs Instance Methods
 */

class Foo {

	constructor(prop) {
		this.prop = prop;
	}

	static staticMethod(){
		return 'classy';
	}

	prototypeMethod() {
		return 'prototypical';
	}
	
}



let foo = new Foo(123);
console.log(Foo == Foo.prototype.constructor);
console.log(Foo.staticMethod());
console.log(foo.prototypeMethod());
