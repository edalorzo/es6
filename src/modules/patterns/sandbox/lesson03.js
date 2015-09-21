
/**
 * The Sandbox constructor
 */

 function Sandbox() {

 		//turning arguments into an array
 	var args = Array.prototype.slice.call(arguments),
 		//the last argument is the callback
 		callback = args.pop(),
 		//modules can be passed as array or individual params
 		modules = (args[0] && typeof args[0] === 'string' ? args : args[0]);

 	//make sure the function is called as a constructor
 	if(!(this instanceof Sandbox)){
 		return new Sandbox(modules, callback);
 	}

 	this.a = 1;
 	this.b = 2;

 	//now add modules to the core `this` object
 	//no modules or '*' means all modules
 	if(!modules || modules === '*'){
 		modules =  [];
 		for(var name in Sandbox.modules) {
 			if(Sandbox.modules.hasOwnProperty(name)){
 				modules.push(name);
 			}
 		}
 	}

 	for(var i = 0; i < modules.length; i++) {
 		Sandbox.modules[modules[i]](this);
 	}

 	callback(this);
 }

 Sandbox.prototype =  {
 	name: 'Informatech',
 	version: '1.0',
 	getName: function() {
 		return this.name;
 	}
 };