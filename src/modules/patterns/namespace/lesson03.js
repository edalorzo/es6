'use strict';

//global namespace
var INFORMATECH = {};

//constructors
INFORMATECH.Parent = function() {};
INFORMATECH.Child = function() {};

//functions
INFORMATECH.welcome = function(){
	$('#hello').text('Hello from Original Parent');
};

//varaibles
INFORMATECH.some_var = 1;


//object containers
INFORMATECH.module1 = {};
INFORMATECH.module1.data = {a: 1, b: 2};

INFORMATECH.module2 = {};

//tests
console.log(window.INFORMATECH.Parent === INFORMATECH.Parent);
console.log(window.INFORMATECH.Child === INFORMATECH.Child);
console.log(window.INFORMATECH.some_var === INFORMATECH.some_var);
console.log(window.INFORMATECH.module1 === INFORMATECH.module1);
console.log(window.INFORMATECH.module1.data === INFORMATECH.module1.data);
console.log(window.INFORMATECH.module2 === INFORMATECH.module2);