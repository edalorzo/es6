

//namespace feature
INFORMATECH.namespace('services');
INFORMATECH.services.FruitService = (function(){

	//privacy members
	var fruits = [
 		{name: 'Apple'},
 		{name: 'Lemon'},
 		{name: 'Strawberry'},
 		{name: 'Tangerine'}
 	];

 	//constructor
	function FruitService(){}
	FruitService.prototype.getFruits = function(){
		return fruits;
	};

	return FruitService;

}());