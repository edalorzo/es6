
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

module.exports = FruitService;