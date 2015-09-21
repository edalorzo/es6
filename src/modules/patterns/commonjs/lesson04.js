
function FooService(){
}

FooService.prototype.serviceOne = function(){
	console.log('Doing service One');
};

FooService.prototype.serviceTwo = function() {
	console.log('Doing service Two');
};

FooService.prototype.serviceThree = function() {
	console.log('Doing service Three');
};

module.exports = FooService;