$(document).ready(function(){
	
	//some sort of import
	var FruitService = INFORMATECH.services.FruitService;

	var fruitService = new FruitService();
	var fruits = fruitService.getFruits();

	var fruitsUl = $("#fruits");
	for(var i =0; i < fruits.length; i++) {
		fruitsUl.append($('<li>').text(fruits[i].name));
	}

	//some sort of import
	var TeamService = INFORMATECH.services.TeamService;
	var teamService = new TeamService();
	var teams = teamService.getTeams();

	var teamsUL = $("#teams");
	for(i =0; i < teams.length; i++) {
		teamsUL.append($('<li>').text(teams[i].name));
	}

});