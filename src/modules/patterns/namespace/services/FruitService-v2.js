
/**
  * Avoid overriding other's peoples namespaces
 */

 INFORMATECH.services = INFORMATECH.namespace('services');

 INFORMATECH.services.FruitService = function(){};
 INFORMATECH.services.FruitService.prototype.getFruits = function(){
 	return [
 		{name: 'Apple'},
 		{name: 'Lemon'},
 		{name: 'Strawberry'},
 	];
 };

