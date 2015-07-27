

{

	foo();

	function foo () {
		console.log('Hello world');
	}

}

//foo();
//var something = 1;

var a = 9;
var something = "a";

if(a < 10) {
	console.log("I got here");
	if(something) {
		console.log("I got here as well");
		function bar () {
			console.log("1");
		}
	} else {
		function bar () {
			console.log("2");
		}
	}
}

bar(); //??