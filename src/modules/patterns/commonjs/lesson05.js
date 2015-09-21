

console.log('Module being evaluated');

var count = 0;
module.exports = function(){
	console.log('Function invoked ' + (++count) + ' times');
};