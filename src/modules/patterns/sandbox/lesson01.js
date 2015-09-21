
/*
 * In the sandbox pattern there is not a global variable
 * but a global function 
 */

 new Sandbox(function(box){
 	//your code goes here
 });

 //with the use of a constructor pattern we
 //simplify usage

 Sandbox(['ajax','event'], function(box){
 	//your code goes here
 });

//use all available modules
Sandbox('*', function(box){
	//your code goes here
});

Sandbox(function(box){
	//your code goes here
});

Sandbox('dom','event', function(box){
	//work with dom and event

	Sandbox(['ajax'],function(box){
		//this box is not the same as the outside box
		//..
		//work with ajax here
	});

	//no trace of ajax here
});