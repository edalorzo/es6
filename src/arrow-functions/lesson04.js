/*---------------------------------------------
 * Traditional class-like declarations
 *---------------------------------------------*/

function FruitService() {
	this.fruits = [];
}

FruitService.prototype.addFruit = function(fruit) {
	this.fruits.push(fruit);
};

FruitService.prototype.findAll = function() {
	return this.fruits;
};

FruitService.prototype.findByCalories = function(calories) {
	return this.fruits.filter(function(fruit){
		return fruit.calories >= calories;
	});
};


var fs = new FruitService();

fs.addFruit({name: 'Lemon', calories: 17});
fs.addFruit({name: 'Apple', calories: 95});
fs.addFruit({name: 'Banana', calories: 105});
fs.addFruit({name: 'Pineapple', calories: 452});

var res = fs.findByCalories(100);
console.log(res);