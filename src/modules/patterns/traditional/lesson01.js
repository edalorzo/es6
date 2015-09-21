

//namespace feature
INFORMATECH.namespace('services');
INFORMATECH.services.FruitService = function(){ };
INFORMATECH.services.FruitService.prototype = (function(){

	//privacy members
	var fruits = [
 		{name: 'Apple'},
 		{name: 'Lemon'},
 		{name: 'Strawberry'},
 	];

 	//public interface
 	return {
 		getFruits: function() {
 			return fruits;
 		}
 	};
}());