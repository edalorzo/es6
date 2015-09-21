

/**
 * Also notice that imorting has nothing to do with loading.
 * Loading these files is an entirely differnt problem.
 * We can safely assume they have been loaded by they time they will be imported
 */

$(document).ready(function(){

	//this is the import feature
	Sandbox('FruitService', function(FruitService){

		var fruitService = new FruitService();
		var fruits = fruitService.getFruits();
		var fruitsUl = $("#fruits");
		
		for(var i =0; i < fruits.length; i++) {
			fruitsUl.append($('<li>').text(fruits[i].name));
		}

		//this is the import feature
		Sandbox('TeamService', function(TeamService){

			var teamService = new TeamService();
			var teams = teamService.getTeams();

			var teamsUL = $("#teams");
			for(i =0; i < teams.length; i++) {
				teamsUL.append($('<li>').text(teams[i].name));
			}

		});

		Sandbox(['TeamService','FruitService'], function(TeamService, FruitService){
			console.log(TeamService, FruitService);
		});

		//no trace of TeamService here

	});

});