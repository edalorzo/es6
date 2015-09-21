$(document).ready(function(){
	//welcome();
	//INFORMATECH.welcome();

	//declaring dependencies
	var FruitService = INFORMATECH.services.FruitService,
		TeamService = INFORMATECH.services.TeamService;

	var fruitService = new FruitService();
	var teamService = new TeamService();

	var fruits = fruitService.getFruits();
	var teams = teamService.getTeams();

	var fruitsUl = $("#fruits");
	for(var i =0; i < fruits.length; i++) {
		fruitsUl.append($('<li>').text(fruits[i].name));
	}

	var teamsUL = $("#teams");
	for(i =0; i < teams.length; i++) {
		teamsUL.append($('<li>').text(teams[i].name));
	}


});