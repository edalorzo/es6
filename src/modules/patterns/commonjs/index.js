
/**
 * CommonJS modules use exports to expose things and require to import
 * They are synchronous by nature.
 * Modules are evaluated only once and they are singletons.
 * What you expose in `module.exports` is what you get in `require`
 */

//lesson01
var lesson01 = require('./lesson01');
console.log(lesson01.bar);

//lesson02
var lesson02 = require('./lesson02');
lesson02.serviceOne();
lesson02.serviceTwo();
lesson02.serviceThree();

//lesson03
var lesson03 = require('./lesson03');
lesson03.serviceOne();
lesson03.serviceTwo();
lesson03.serviceThree();

//lesson04
var FooService = require('./lesson04');
var fooService = new FooService();
fooService.serviceOne();
fooService.serviceTwo();
fooService.serviceThree();

//lesson04
var f1 = require('./lesson05');
var f2 = require('./lesson05');

console.log(f1 === f2);
f1();
f2();


