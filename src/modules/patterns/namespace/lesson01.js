'use strict';

/*
 * In the browser window is the global namespace
 */

//constructors
function Parent() {}
function Child() {}

//functions
function welcome(){
	$('#hello').text('Hello from Original Parent');
}

//varaibles
var some_var = 1;


//object containers
var module1 = {};
module1.data = {a: 1, b: 2};

var module2 = {};

//tests
console.log(window.Parent === Parent);
console.log(window.Child === Child);
console.log(window.some_var === some_var);
console.log(window.module1 === module1);
console.log(window.module1.data === module1.data);
console.log(window.module2 === module2);