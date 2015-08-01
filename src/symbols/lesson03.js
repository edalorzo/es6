
// Symbols as object properties

const MY_KEY = Symbol();

let obj1 = {
	[MY_KEY]: 'Julio Verne'
};

console.log(obj1[MY_KEY]); //Julio Verne


const FOO = Symbol();
let obj2 = {
	[FOO]() {
		console.log('Hello from Obj2.FOO()');
	}
}


obj2[FOO]();

//see differente between
// Object.keys(obj1);
// Reflect.ownKeys(obj1);
