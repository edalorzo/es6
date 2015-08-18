
/**
 * Class Expressions 
 */

const MyClass = class Me {
	getClassName() {
		return Me.name;
	}
};

let inst = new MyClass();
console.log(inst.getClassName());
console.log(Me.name); //RefereceError: Me is not defined