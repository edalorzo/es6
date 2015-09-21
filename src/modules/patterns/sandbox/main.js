

/**
 * Also notice that imorting has nothing to do with loading.
 * Loading these files is an entirely differnt problem.
 * We can safely assume they have been loaded by they time they will be imported
 */

$(document).ready(function(){

	//this is the import feature
	Sandbox('FruitService', function(box){

		var fruitService = new box.FruitService();
		var fruits = fruitService.getFruits();
		var fruitsUl = $("#fruits");
		
		for(var i =0; i < fruits.length; i++) {
			fruitsUl.append($('<li>').text(fruits[i].name));
		}

		//this is the import feature
		Sandbox('TeamService', function(box){

			var teamService = new box.TeamService();
			var teams = teamService.getTeams();

			var teamsUL = $("#teams");
			for(i =0; i < teams.length; i++) {
				teamsUL.append($('<li>').text(teams[i].name));
			}

		});

		Sandbox(function(box){
			console.log(box.TeamService, box.FruitService);
		});

		//no trace of TeamService here

	});

});