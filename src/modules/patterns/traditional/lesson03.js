
(function(exports){

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

	exports.FruitService = FruitService;

}(INFORMATECH.namespace('services')));