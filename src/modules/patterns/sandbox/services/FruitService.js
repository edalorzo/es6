

(function(modules){

	//privacy members
	var fruits = [
 		{name: 'Apple'},
 		{name: 'Lemon'},
 		{name: 'Strawberry'},
 		{name: 'Tangerine'}
 	];

 	//constructor
	function FruitService(){}

	//prototype
	FruitService.prototype.getFruits = function(){
		return fruits;
	};

	modules.FruitService = function(box){
		box.FruitService = FruitService;
	};

}(Sandbox.modules = Sandbox.modules || {}));