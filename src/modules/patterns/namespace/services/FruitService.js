
/**
  * Avoid overriding other's peoples namespaces
 */

 var INFORMATECH = INFORMATECH || {};
 INFORMATECH.services = INFORMATECH.services || {};

 INFORMATECH.services.FruitService = function(){};
 INFORMATECH.services.FruitService.prototype.getFruits = function(){
 	return [
 		{name: 'Apple'},
 		{name: 'Lemon'},
 		{name: 'Strawberry'},
 	];
 };

