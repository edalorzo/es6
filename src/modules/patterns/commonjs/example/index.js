
var FruitService = require('./services/FruitService'),
	TeamService = require('./services/TeamService');


var fruitService = new FruitService();
var teamService = new TeamService();

var fruits = fruitService.getFruits();
var teams = teamService.getTeams();

console.log(fruits);
console.log(teams);